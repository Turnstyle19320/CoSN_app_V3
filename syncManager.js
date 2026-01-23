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
  let addToast = null;

  function generateCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  function saveSession(sessionMode, code) {
    sessionStorage.setItem('cosn_sync_session', JSON.stringify({ mode: sessionMode, code }));
  }

  function clearSession() {
    sessionStorage.removeItem('cosn_sync_session');
  }

  function getSavedSession() {
    const saved = sessionStorage.getItem('cosn_sync_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  }

  function safeDestroyPeer() {
    try {
      if (peer) peer.destroy();
    } catch (err) {
      console.warn('Peer destroy error:', err);
    }
    peer = null;
  }

  function broadcast(payload, excludeConn) {
    console.log('[SyncManager] Broadcasting to', connections.length, 'connections');
    connections.forEach(conn => {
      if (conn !== excludeConn && conn.open) {
        console.log('[SyncManager] Sending UPDATE to connection');
        conn.send({ type: 'UPDATE', payload });
      }
    });
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

  function startHostWithCode(code) {
    connections = [];
    roomCode = code;
    mode = 'host';
    isConnecting = true;
    hasError = false;
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
        clearSession();
        if (addToast) addToast('Reconnection timed out.', 'error');
        notifySessionUpdate();
      }
    }, 15000);

    peer.on('open', (id) => {
      connected = true;
      clearTimeout(connectionTimeout);
      mode = 'host';
      isConnecting = false;
      saveSession('host', code);
      if (addToast) addToast(`Session restored: ${code}`, 'success');
      notifySessionUpdate();
    });

    peer.on('connection', (conn) => {
      connections.push(conn);
      if (addToast) addToast('A contributor joined your session.', 'info');
      notifySessionUpdate();

      conn.on('data', (data) => {
        if (data.type === 'UPDATE' && onDataReceived) {
          onDataReceived(data.payload);
          broadcast(data.payload, conn);
        }
      });

      conn.on('open', () => {
        conn.send({ type: 'FULL_SYNC', payload: currentData });
      });

      conn.on('close', () => {
        connections = connections.filter(c => c !== conn);
        if (addToast) addToast('A peer disconnected.', 'info');
        notifySessionUpdate();
      });
    });

    peer.on('error', (err) => {
      clearTimeout(connectionTimeout);
      console.error('Peer Error:', err);
      clearSession();
      if (err.type === 'unavailable-id') {
        if (addToast) addToast('Session code conflict. Please host a new session.', 'error');
      } else {
        if (addToast) addToast('Could not restore session.', 'error');
      }
      isConnecting = false;
      hasError = true;
      mode = 'idle';
      roomCode = '';
      notifySessionUpdate();
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
        if (addToast) addToast('Connection timed out. The sync server may be unavailable.', 'error');
        notifySessionUpdate();
      }
    }, 15000);

    peer.on('open', (id) => {
      connected = true;
      clearTimeout(connectionTimeout);
      mode = 'host';
      isConnecting = false;
      saveSession('host', code);
      if (addToast) addToast(`Host session started: ${code}`, 'success');
      notifySessionUpdate();
    });

    peer.on('connection', (conn) => {
      connections.push(conn);
      if (addToast) addToast('A contributor joined your session.', 'info');
      notifySessionUpdate();

      conn.on('data', (data) => {
        console.log('[SyncManager HOST] Received data:', data.type);
        if (data.type === 'UPDATE' && onDataReceived) {
          console.log('[SyncManager HOST] Calling onDataReceived with payload');
          onDataReceived(data.payload);
          broadcast(data.payload, conn);
        }
      });

      conn.on('open', () => {
        conn.send({ type: 'FULL_SYNC', payload: currentData });
      });

      conn.on('close', () => {
        connections = connections.filter(c => c !== conn);
        if (addToast) addToast('A peer disconnected.', 'info');
        notifySessionUpdate();
      });
    });

    peer.on('error', (err) => {
      clearTimeout(connectionTimeout);
      console.error('Peer Error:', err);
      if (err.type === 'unavailable-id') {
        if (addToast) addToast('Connection conflict. Try hosting again.', 'error');
      } else {
        if (addToast) addToast('Sync service error.', 'error');
      }
      isConnecting = false;
      hasError = true;
      notifySessionUpdate();
    });
  }

  function joinRoom(code) {
    if (!code || code.length < 4) {
      if (addToast) addToast('Please enter a valid room code.', 'error');
      return;
    }
    const targetCode = code.trim().toUpperCase();
    safeDestroyPeer();
    hasError = false;
    isConnecting = true;
    notifySessionUpdate();

    peer = new Peer();

    peer.on('open', () => {
      const conn = peer.connect(`cosn-ai-host-${targetCode}`);

      conn.on('open', () => {
        connections = [conn];
        mode = 'client';
        roomCode = targetCode;
        isConnecting = false;
        saveSession('client', targetCode);
        if (addToast) addToast(`Successfully joined session: ${targetCode}`, 'success');
        notifySessionUpdate();
      });

      conn.on('data', (data) => {
        if ((data.type === 'FULL_SYNC' || data.type === 'UPDATE') && onDataReceived) {
          onDataReceived(data.payload);
        }
      });

      conn.on('close', () => {
        if (addToast) addToast('Host ended the session.', 'info');
        stopSync();
      });

      conn.on('error', () => {
        if (addToast) addToast('Connection failed.', 'error');
        stopSync();
      });
    });

    peer.on('error', () => {
      if (addToast) addToast('Could not find District Code.', 'error');
      stopSync();
    });
  }

  function stopSync() {
    safeDestroyPeer();
    connections = [];
    mode = 'idle';
    roomCode = '';
    isConnecting = false;
    hasError = false;
    clearSession();
    notifySessionUpdate();
  }

  function sendUpdate(data) {
    console.log('[SyncManager] Local update, mode:', mode, 'connections:', connections.length);
    currentData = data;
    if (mode !== 'idle' && connections.length > 0) {
      console.log('[SyncManager] Broadcasting local update');
      broadcast(data);
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
            <p class="text-xs text-slate-700">Host a district-wide session to aggregate responses from multiple leaders in real-time.</p>
            <button
              onclick="window.SyncManager.startHost()"
              class="w-full bg-teal-600 hover:bg-teal-700 text-white py-2.5 rounded-lg text-sm font-bold shadow-md transition-all active:scale-95 flex items-center justify-center"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071a10 10 0 0114.142 0M2.828 7.071a15 15 0 0121.214 0" /></svg>
              Host Session
            </button>
            <div class="relative">
              <div class="absolute inset-0 flex items-center pointer-events-none"><span class="w-full border-t"></span></div>
              <div class="relative flex justify-center text-[10px] uppercase font-bold"><span class="bg-white px-2 text-slate-600 tracking-tighter">Collaborator Access</span></div>
            </div>
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
        addToast = callbacks.addToast;
        onDashboardOpen = callbacks.onOpenDashboard;
      }

      // Auto-reconnect to saved session
      const saved = getSavedSession();
      if (saved) {
        if (addToast) addToast(`Reconnecting to session ${saved.code}...`, 'info');
        if (saved.mode === 'host') {
          startHostWithCode(saved.code);
        } else {
          joinRoom(saved.code);
        }
      }

      // Initial render
      render(containerId, onDashboardOpen);
    },
    startHost: function() {
      startHost();
    },
    joinRoom: function(code) {
      joinRoom(code);
    },
    joinFromInput,
    stopSync: function() {
      stopSync();
    },
    sendUpdate,
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
