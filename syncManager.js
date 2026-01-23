// Vanilla JS SyncManager - manages PeerJS connections and data sync
const SyncManager = (function() {
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

  return {
    init,
    startHost,
    joinRoom,
    stopSync,
    sendUpdate,
    setCurrentData,
    getState,
    setCallbacks: (callbacks) => {
      onDataReceived = callbacks.onDataReceived;
      onSessionUpdate = callbacks.onSessionUpdate;
      addToast = callbacks.addToast;
    }
  };
})();
