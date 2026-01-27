// Vanilla JS SyncManager - manages PeerJS connections and data sync
window.SyncManager = (function() {
  let peer = null;
  let connections = [];
  let mode = 'idle'; // 'idle', 'host', 'client'
  let roomCode = '';
  let currentData = {};
  let isConnecting = false;
  let hasError = false;

  // Callbacks
  let onDataReceived = null;
  let onSessionUpdate = null;
  let onLockChanged = null;
  let onJoiningSession = null;
  let addToast = null;

  // --- Reconnection state ---
  let reconnectAttempts = 0;
  const MAX_RECONNECT_ATTEMPTS = 5;
  let reconnectTimer = null;
  let lastSessionMode = null;
  let lastSessionCode = null;

  // --- Heartbeat state ---
  let heartbeatInterval = null;
  const HEARTBEAT_INTERVAL_MS = 5000;
  const HEARTBEAT_TIMEOUT_MS = 12000;
  let peerLastSeen = new Map(); // conn -> timestamp

  // --- Pending update queue ---
  let pendingUpdates = [];

  function generateCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  // --- Session persistence (localStorage for durability across crashes) ---
  function saveSession(sessionMode, code) {
    localStorage.setItem('cosn_sync_session', JSON.stringify({ mode: sessionMode, code }));
  }

  function clearSession() {
    localStorage.removeItem('cosn_sync_session');
  }

  function getSavedSession() {
    const saved = localStorage.getItem('cosn_sync_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  }

  // --- Migrate old sessionStorage key to localStorage (one-time) ---
  function migrateSessionStorage() {
    const old = sessionStorage.getItem('cosn_sync_session');
    if (old) {
      localStorage.setItem('cosn_sync_session', old);
      sessionStorage.removeItem('cosn_sync_session');
    }
  }

  function safeDestroyPeer() {
    try {
      if (peer) peer.destroy();
    } catch (err) {
      console.warn('Peer destroy error:', err);
    }
    peer = null;
  }

  // --- Message validation ---
  function isValidPayload(data) {
    if (!data || typeof data !== 'object') return false;
    if (typeof data.type !== 'string') return false;
    if (!['UPDATE', 'FULL_SYNC', 'HEARTBEAT', 'HEARTBEAT_ACK'].includes(data.type)) return false;
    if (data.type === 'HEARTBEAT' || data.type === 'HEARTBEAT_ACK') return true;
    if (data.payload === undefined || data.payload === null) return false;
    if (typeof data.payload !== 'object') return false;
    return true;
  }

  function safeSend(conn, message) {
    try {
      if (conn && conn.open) {
        conn.send(message);
        return true;
      }
    } catch (err) {
      console.warn('[SyncManager] safeSend failed:', err);
    }
    return false;
  }

  function broadcast(payload, excludeConn) {
    console.log('[SyncManager] Broadcasting to', connections.length, 'connections');
    connections.forEach(conn => {
      if (conn !== excludeConn) {
        safeSend(conn, { type: 'UPDATE', payload });
      }
    });
  }

  // --- Pending update queue: flush when connected ---
  function flushPendingUpdates() {
    if (mode === 'idle' || connections.length === 0) return;
    while (pendingUpdates.length > 0) {
      const data = pendingUpdates.shift();
      console.log('[SyncManager] Flushing queued update');
      broadcast(data);
    }
  }

  // --- Heartbeat ---
  function startHeartbeat() {
    stopHeartbeat();
    heartbeatInterval = setInterval(() => {
      const now = Date.now();
      connections.forEach(conn => {
        safeSend(conn, { type: 'HEARTBEAT' });
      });

      // Check for dead connections (host side only)
      if (mode === 'host') {
        const deadConns = [];
        connections.forEach(conn => {
          const lastSeen = peerLastSeen.get(conn) || 0;
          if (lastSeen > 0 && (now - lastSeen) > HEARTBEAT_TIMEOUT_MS) {
            deadConns.push(conn);
          }
        });
        deadConns.forEach(conn => {
          console.warn('[SyncManager] Removing dead connection (no heartbeat)');
          try { conn.close(); } catch(e) { /* ignore */ }
          connections = connections.filter(c => c !== conn);
          peerLastSeen.delete(conn);
        });
        if (deadConns.length > 0) {
          if (addToast) addToast(`${deadConns.length} peer(s) timed out.`, 'info');
          notifySessionUpdate();
        }
      }
    }, HEARTBEAT_INTERVAL_MS);
  }

  function stopHeartbeat() {
    if (heartbeatInterval) {
      clearInterval(heartbeatInterval);
      heartbeatInterval = null;
    }
    peerLastSeen.clear();
  }

  function handleHeartbeatMessage(conn, data) {
    if (data.type === 'HEARTBEAT') {
      safeSend(conn, { type: 'HEARTBEAT_ACK' });
      peerLastSeen.set(conn, Date.now());
      return true;
    }
    if (data.type === 'HEARTBEAT_ACK') {
      peerLastSeen.set(conn, Date.now());
      return true;
    }
    return false;
  }

  // --- Reconnection with exponential backoff ---
  function scheduleReconnect() {
    if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
      console.warn('[SyncManager] Max reconnect attempts reached');
      if (addToast) addToast('Could not reconnect after multiple attempts. Please rejoin manually.', 'error');
      hasError = true;
      isConnecting = false;
      notifySessionUpdate();
      return;
    }

    const delay = Math.min(1000 * Math.pow(2, reconnectAttempts), 15000);
    reconnectAttempts++;
    console.log(`[SyncManager] Reconnecting in ${delay}ms (attempt ${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})`);
    if (addToast) addToast(`Reconnecting... (attempt ${reconnectAttempts})`, 'info');

    reconnectTimer = setTimeout(() => {
      if (lastSessionMode === 'host' && lastSessionCode) {
        startHostWithCode(lastSessionCode);
      } else if (lastSessionMode === 'client' && lastSessionCode) {
        joinRoom(lastSessionCode);
      }
    }, delay);
  }

  function cancelReconnect() {
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }
    reconnectAttempts = 0;
  }

  function notifySessionUpdate() {
    if (onSessionUpdate) {
      const participants = mode === 'idle' ? 0 : connections.length + 1;
      onSessionUpdate({ mode, code: roomCode, participants, isConnecting });
    }
    // Re-render UI when session state changes
    if (renderContainer) {
      render(renderContainer, onDashboardOpen);
    }
  }

  // --- Wire up connection data handlers with validation ---
  function setupConnDataHandler(conn, isHost) {
    peerLastSeen.set(conn, Date.now());

    conn.on('data', (data) => {
      try {
        // Handle heartbeat messages first
        if (handleHeartbeatMessage(conn, data)) return;

        // Validate message
        if (!isValidPayload(data)) {
          console.warn('[SyncManager] Ignoring invalid message:', data);
          return;
        }

        if (isHost) {
          console.log('[SyncManager HOST] Received data:', data.type);
          if (data.type === 'UPDATE' && onDataReceived) {
            console.log('[SyncManager HOST] Calling onDataReceived with payload');
            onDataReceived(data.payload);
            broadcast(data.payload, conn);
          }
        } else {
          if (data.type === 'FULL_SYNC' && onDataReceived) {
            onDataReceived(data.payload, true);
          } else if (data.type === 'UPDATE' && onDataReceived) {
            onDataReceived(data.payload, false);
          }
          if (data.type === 'LOCK' && onLockChanged) {
            onLockChanged(data.locked);
          }
        }
      } catch (err) {
        console.error('[SyncManager] Error handling message:', err);
      }
    });
  }

  function startHostWithCode(code) {
    connections = [];
    roomCode = code;
    mode = 'host';
    isConnecting = true;
    hasError = false;
    lastSessionMode = 'host';
    lastSessionCode = code;
    safeDestroyPeer();
    notifySessionUpdate();

    let connectionTimeout;
    let connected = false;
    try {
      peer = new Peer(`cosn-ai-host-${code}`);
    } catch (err) {
      isConnecting = false;
      hasError = false;
      clearSession();
      if (addToast) addToast('Unable to reconnect session. Please host again.', 'error');
      notifySessionUpdate();
      return;
    }

    connectionTimeout = setTimeout(() => {
      if (!connected && peer) {
        isConnecting = false;
        hasError = true;
        // Don't clear session — let reconnect try again
        scheduleReconnect();
        notifySessionUpdate();
      }
    }, 15000);

    peer.on('open', (id) => {
      connected = true;
      clearTimeout(connectionTimeout);
      mode = 'host';
      isConnecting = false;
      reconnectAttempts = 0; // Reset on success
      saveSession('host', code);
      startHeartbeat();
      flushPendingUpdates();
      if (addToast) addToast(`Session restored: ${code}`, 'success');
      notifySessionUpdate();
    });

    peer.on('connection', (conn) => {
      connections.push(conn);
      if (addToast) addToast('A contributor joined your session.', 'info');
      notifySessionUpdate();

      setupConnDataHandler(conn, true);

      conn.on('open', () => {
        safeSend(conn, { type: 'FULL_SYNC', payload: currentData });
        flushPendingUpdates();
      });

      conn.on('close', () => {
        connections = connections.filter(c => c !== conn);
        peerLastSeen.delete(conn);
        if (addToast) addToast('A peer disconnected.', 'info');
        notifySessionUpdate();
      });

      conn.on('error', (err) => {
        console.warn('[SyncManager] Host-side connection error:', err);
        connections = connections.filter(c => c !== conn);
        peerLastSeen.delete(conn);
        notifySessionUpdate();
      });
    });

    peer.on('error', (err) => {
      clearTimeout(connectionTimeout);
      console.error('Peer Error:', err);
      if (err.type === 'unavailable-id') {
        clearSession();
        cancelReconnect();
        if (addToast) addToast('Session code conflict. Please host a new session.', 'error');
        isConnecting = false;
        hasError = true;
        mode = 'idle';
        roomCode = '';
        stopHeartbeat();
        notifySessionUpdate();
      } else {
        // Temporary error — try to reconnect
        isConnecting = false;
        hasError = true;
        stopHeartbeat();
        notifySessionUpdate();
        scheduleReconnect();
      }
    });

    peer.on('disconnected', () => {
      console.warn('[SyncManager] Peer disconnected from signaling server');
      // PeerJS lost connection to its signaling server but peer ID may still be reserved
      // Try to reconnect the peer object first
      if (peer && !peer.destroyed) {
        try {
          peer.reconnect();
        } catch (err) {
          console.warn('[SyncManager] peer.reconnect() failed:', err);
          scheduleReconnect();
        }
      }
    });
  }

  function startHost() {
    if (mode !== 'idle') return;
    const code = generateCode();
    connections = [];
    roomCode = code;
    mode = 'host';
    isConnecting = true;
    hasError = false;
    lastSessionMode = 'host';
    lastSessionCode = code;
    if (addToast) addToast('Starting host session...', 'info');
    safeDestroyPeer();
    notifySessionUpdate();

    let connectionTimeout;
    let connected = false;
    try {
      peer = new Peer(`cosn-ai-host-${code}`);
    } catch (err) {
      isConnecting = false;
      hasError = true;
      if (addToast) addToast('Unable to start session. Try again.', 'error');
      notifySessionUpdate();
      return;
    }

    connectionTimeout = setTimeout(() => {
      if (!connected && peer) {
        console.warn('PeerJS connection timeout');
        isConnecting = false;
        hasError = true;
        notifySessionUpdate();
        scheduleReconnect();
      }
    }, 15000);

    peer.on('open', (id) => {
      connected = true;
      clearTimeout(connectionTimeout);
      mode = 'host';
      isConnecting = false;
      reconnectAttempts = 0;
      saveSession('host', code);
      startHeartbeat();
      if (addToast) addToast(`Host session started: ${code}`, 'success');
      notifySessionUpdate();
    });

    peer.on('connection', (conn) => {
      connections.push(conn);
      if (addToast) addToast('A contributor joined your session.', 'info');
      notifySessionUpdate();

      setupConnDataHandler(conn, true);

      conn.on('open', () => {
        safeSend(conn, { type: 'FULL_SYNC', payload: currentData });
      });

      conn.on('close', () => {
        connections = connections.filter(c => c !== conn);
        peerLastSeen.delete(conn);
        if (addToast) addToast('A peer disconnected.', 'info');
        notifySessionUpdate();
      });

      conn.on('error', (err) => {
        console.warn('[SyncManager] Host-side connection error:', err);
        connections = connections.filter(c => c !== conn);
        peerLastSeen.delete(conn);
        notifySessionUpdate();
      });
    });

    peer.on('error', (err) => {
      clearTimeout(connectionTimeout);
      console.error('Peer Error:', err);
      if (err.type === 'unavailable-id') {
        clearSession();
        cancelReconnect();
        if (addToast) addToast('Connection conflict. Try hosting again.', 'error');
        isConnecting = false;
        hasError = true;
        mode = 'idle';
        roomCode = '';
        stopHeartbeat();
      } else {
        isConnecting = false;
        hasError = true;
        stopHeartbeat();
        scheduleReconnect();
        if (addToast) addToast('Sync service error. Reconnecting...', 'error');
      }
      notifySessionUpdate();
    });

    peer.on('disconnected', () => {
      console.warn('[SyncManager] Peer disconnected from signaling server');
      if (peer && !peer.destroyed) {
        try {
          peer.reconnect();
        } catch (err) {
          console.warn('[SyncManager] peer.reconnect() failed:', err);
          scheduleReconnect();
        }
      }
    });
  }

  function joinRoom(code) {
    if (!code || code.length < 4) {
      if (addToast) addToast('Please enter a valid room code.', 'error');
      return;
    }
    const targetCode = code.trim().toUpperCase();
    safeDestroyPeer();

    // Clear any stale data before joining — the host's FULL_SYNC will provide the truth
    pendingUpdates = [];
    currentData = {};
    if (onJoiningSession) onJoiningSession();

    hasError = false;
    isConnecting = true;
    lastSessionMode = 'client';
    lastSessionCode = targetCode;
    notifySessionUpdate();

    peer = new Peer();

    peer.on('open', () => {
      const conn = peer.connect(`cosn-ai-host-${targetCode}`);

      conn.on('open', () => {
        connections = [conn];
        mode = 'client';
        roomCode = targetCode;
        isConnecting = false;
        reconnectAttempts = 0;
        saveSession('client', targetCode);
        startHeartbeat();
        flushPendingUpdates();
        if (addToast) addToast(`Successfully joined session: ${targetCode}`, 'success');
        notifySessionUpdate();
      });

      setupConnDataHandler(conn, false);

      conn.on('close', () => {
        console.warn('[SyncManager] Connection to host closed');
        stopHeartbeat();
        connections = [];
        // Don't immediately kill session — try to reconnect
        if (!hasError) {
          isConnecting = true;
          notifySessionUpdate();
          scheduleReconnect();
        }
      });

      conn.on('error', (err) => {
        console.error('[SyncManager] Client connection error:', err);
        stopHeartbeat();
        connections = [];
        isConnecting = true;
        hasError = false;
        notifySessionUpdate();
        scheduleReconnect();
      });
    });

    peer.on('error', (err) => {
      console.error('[SyncManager] Client peer error:', err);
      stopHeartbeat();
      if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
        scheduleReconnect();
      } else {
        if (addToast) addToast('Could not find District Code.', 'error');
        stopSync();
      }
    });

    peer.on('disconnected', () => {
      console.warn('[SyncManager] Client peer disconnected from signaling');
      if (peer && !peer.destroyed) {
        try {
          peer.reconnect();
        } catch (err) {
          console.warn('[SyncManager] client peer.reconnect() failed:', err);
          scheduleReconnect();
        }
      }
    });
  }

  function stopSync() {
    cancelReconnect();
    stopHeartbeat();
    safeDestroyPeer();
    connections = [];
    mode = 'idle';
    roomCode = '';
    isConnecting = false;
    hasError = false;
    lastSessionMode = null;
    lastSessionCode = null;
    pendingUpdates = [];
    clearSession();
    notifySessionUpdate();
  }

  function sendUpdate(data) {
    console.log('[SyncManager] Local update, mode:', mode, 'connections:', connections.length);
    currentData = data;
    if (mode !== 'idle') {
      if (connections.length > 0) {
        console.log('[SyncManager] Broadcasting local update');
        broadcast(data);
      } else {
        // Queue the update for when connection is (re)established
        console.log('[SyncManager] No connections, queuing update');
        pendingUpdates.push(data);
      }
    }
  }

  function init() {
    const saved = getSavedSession();
    if (saved) {
      if (addToast) addToast(`Reconnecting to session ${saved.code}...`, 'info');
      if (saved.mode === 'host') {
        startHostWithCode(saved.code);
      } else {
        joinRoom(saved.code);
      }
    }
  }

  function broadcastLock(locked) {
    if (mode === 'host' && connections.length > 0) {
      connections.forEach(conn => {
        safeSend(conn, { type: 'LOCK', locked: !!locked });
      });
    }
  }

  function setCurrentData(data) {
    currentData = data;
  }

  function getState() {
    return { mode, roomCode, connections: connections.length, isConnecting, hasError };
  }

  // UI Rendering
  function render(containerId, onOpenDashboard) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const connectionLabel = hasError
      ? 'Session offline. Retry hosting to reconnect.'
      : isConnecting
      ? 'Connecting...'
      : 'Connected via WebRTC DataChannel';

    const participants = connections.length + 1;

    container.innerHTML = `
      <div class="bg-white rounded-xl shadow-lg border-2 border-slate-200">
        <div class="bg-slate-900 p-4 flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 rounded-full bg-teal-600 ${mode !== 'idle' ? 'animate-pulse' : ''}"></div>
            <h4 class="text-xs font-bold text-white uppercase tracking-widest">Collaboration Hub</h4>
          </div>
          ${mode !== 'idle' ? '<span class="text-[10px] bg-green-500 text-white px-2 py-0.5 rounded font-black uppercase">Live</span>' : ''}
        </div>

        <div class="p-5 space-y-4">
          ${mode === 'idle' ? `
            <p class="text-xs text-slate-700">Join a district-wide session to aggregate responses from multiple leaders in real-time.</p>
            <div class="flex space-x-2">
              <input
                type="text"
                id="sync-room-code-input"
                placeholder="Enter Code"
                class="flex-1 border-2 border-slate-200 rounded-lg px-3 py-2 text-sm uppercase font-mono focus:border-teal-600 outline-none transition-colors"
                onkeydown="if(event.key === 'Enter') window.SyncManager.joinFromInput()"
              />
              <button
                onclick="window.SyncManager.joinFromInput()"
                class="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-950 transition-all cursor-pointer"
              >
                Join
              </button>
            </div>
            <p class="text-[10px] text-slate-400 text-center">To host a session, use the Admin panel.</p>
          ` : `
            <div class="animate-fade-in">
              <div class="bg-slate-50 p-4 rounded-xl border-2 border-dashed border-teal-600/30 text-center mb-4">
                <p class="text-[10px] text-slate-600 uppercase font-black mb-1">Room Access Code</p>
                <p class="text-3xl font-black text-slate-900 tracking-[0.2em] font-mono">${roomCode}</p>
                <button
                  onclick="navigator.clipboard.writeText('${roomCode}'); window.SyncManager._addToast('Code copied!', 'success');"
                  class="mt-3 inline-flex items-center rounded-full border border-teal-200 bg-white px-3 py-1 text-[10px] font-black uppercase tracking-widest text-teal-700 hover:border-teal-300 hover:text-teal-800 transition-colors"
                >
                  Copy Code
                </button>
              </div>

              <div class="flex items-center justify-between text-xs mb-4">
                <span class="text-slate-700 font-medium">Active Participants:</span>
                <span class="font-black text-teal-600">${participants}</span>
              </div>

              <div class="space-y-2">
                <div class="h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div class="h-full w-full ${hasError ? 'bg-red-500' : 'bg-teal-600 animate-pulse'}"></div>
                </div>
                <p class="text-[10px] text-center italic ${hasError ? 'text-red-600' : 'text-slate-600'}">
                  ${connectionLabel}
                </p>
              </div>

              ${hasError ? `
                <div class="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[11px] text-red-700 mt-3">
                  We could not reach the sync service. Check your connection and retry hosting.
                </div>
                <button
                  onclick="window.SyncManager.startHost()"
                  class="w-full mt-3 bg-teal-600 text-white py-2.5 rounded-lg text-xs font-bold hover:bg-teal-700 transition-all"
                >
                  Retry Hosting
                </button>
              ` : ''}

              <button
                onclick="window.SyncManager._openDashboard()"
                class="w-full mt-4 bg-teal-600 text-white py-3 rounded-lg text-sm font-bold hover:bg-teal-700 transition-all shadow-md flex items-center justify-center"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" /></svg>
                View Session Dashboard
              </button>

              <button
                onclick="window.SyncManager.stopSync()"
                class="w-full mt-3 bg-red-50 text-red-600 py-2.5 rounded-lg text-xs font-bold hover:bg-red-100 transition-all border border-red-100"
              >
                Disconnect Session
              </button>
            </div>
          `}
        </div>
      </div>
    `;
  }

  let renderContainer = null;
  let onDashboardOpen = null;

  function joinFromInput() {
    const input = document.getElementById('sync-room-code-input');
    if (input) {
      joinRoom(input.value);
    }
  }

  return {
    init: function(containerId, callbacks) {
      renderContainer = containerId;
      if (callbacks) {
        onDataReceived = callbacks.onDataReceived;
        onSessionUpdate = callbacks.onSessionUpdate;
        onLockChanged = callbacks.onLockChanged;
        onJoiningSession = callbacks.onJoiningSession;
        addToast = callbacks.addToast;
        onDashboardOpen = callbacks.onOpenDashboard;
      }

      // Migrate old sessionStorage key if present
      migrateSessionStorage();

      // Auto-reconnect to saved session (host only — clients must rejoin manually
      // to avoid leaking stale local data into the host's session)
      const saved = getSavedSession();
      if (saved && saved.mode === 'host') {
        if (addToast) addToast(`Reconnecting to session ${saved.code}...`, 'info');
        startHostWithCode(saved.code);
      } else if (saved) {
        // Clear stale client session — user will need to rejoin
        clearSession();
      }

      // Initial render
      render(containerId, onDashboardOpen);
    },
    startHost: function() {
      startHost();
    },
    startHostWithCode: function(code) {
      startHostWithCode(code);
    },
    joinRoom: function(code) {
      joinRoom(code);
    },
    joinFromInput,
    getRoomCode: function() {
      return roomCode || null;
    },
    stopSync: function() {
      stopSync();
    },
    sendUpdate,
    broadcastLock,
    setCurrentData,
    getState,
    _addToast: function(msg, type) {
      if (addToast) addToast(msg, type);
    },
    _openDashboard: function() {
      if (onDashboardOpen) onDashboardOpen();
    },
    _render: function() {
      if (renderContainer) render(renderContainer, onDashboardOpen);
    }
  };
})();
