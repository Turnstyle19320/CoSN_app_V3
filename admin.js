// Admin Session Management Module
(function() {
  'use strict';

  // SHA-256 hash of 'admin'
  const PASSWORD_HASH = '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918';

  const SESSIONS_INDEX_KEY = 'cosn_sessions_index';
  const SESSION_PREFIX = 'cosn_session_';
  const AUTH_KEY = 'cosn_admin_auth';
  const LEGACY_DATA_KEY = 'ai_assessment_data';

  // ============================================
  // AUTH
  // ============================================

  async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  function isAuthenticated() {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  }

  function setAuthenticated() {
    sessionStorage.setItem(AUTH_KEY, 'true');
  }

  // ============================================
  // SESSION STORAGE
  // ============================================

  function getSessionsIndex() {
    try {
      return JSON.parse(localStorage.getItem(SESSIONS_INDEX_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveSessionsIndex(index) {
    localStorage.setItem(SESSIONS_INDEX_KEY, JSON.stringify(index));
  }

  function getSession(id) {
    try {
      return JSON.parse(localStorage.getItem(SESSION_PREFIX + id));
    } catch (e) {
      return null;
    }
  }

  function saveSession(session) {
    localStorage.setItem(SESSION_PREFIX + session.id, JSON.stringify(session));
    // Update index
    const index = getSessionsIndex();
    const existing = index.findIndex(s => s.id === session.id);
    const summary = {
      id: session.id,
      label: session.label,
      createdAt: session.createdAt,
      lastModified: session.lastModified,
      department: session.department,
      completionPercent: session.completionPercent
    };
    if (existing >= 0) {
      index[existing] = summary;
    } else {
      index.unshift(summary);
    }
    saveSessionsIndex(index);
  }

  function deleteSession(id) {
    localStorage.removeItem(SESSION_PREFIX + id);
    const index = getSessionsIndex().filter(s => s.id !== id);
    saveSessionsIndex(index);
  }

  function createNewSession(label) {
    const id = 's_' + Date.now();
    const now = new Date().toISOString();
    const session = {
      id: id,
      label: label || 'Untitled Session',
      createdAt: now,
      lastModified: now,
      department: null,
      answers: {},
      completionPercent: 0
    };
    saveSession(session);
    return session;
  }

  function calculateCompletionPercent(answers) {
    const totalSubdomains = DOMAINS.reduce((acc, d) =>
      acc + d.sections.reduce((sAcc, s) => sAcc + s.subdomains.length, 0), 0);
    const completed = Object.keys(answers).filter(k => !k.startsWith('notes:')).length;
    return Math.round((completed / totalSubdomains) * 100) || 0;
  }

  // ============================================
  // MIGRATION
  // ============================================

  function migrateIfNeeded() {
    const index = getSessionsIndex();
    if (index.length > 0) return; // Already have sessions

    const legacyData = localStorage.getItem(LEGACY_DATA_KEY);
    if (!legacyData) return; // No legacy data

    try {
      const answers = JSON.parse(legacyData);
      if (Object.keys(answers).length === 0) return;

      const session = createNewSession('Imported Session');
      session.answers = answers;
      session.completionPercent = calculateCompletionPercent(answers);
      saveSession(session);

      // Set as active session in app
      if (window.app && window.app.loadSession) {
        window.app.loadSession(session.id);
      }
    } catch (e) {
      console.error('[Admin] Migration failed:', e);
    }
  }

  // ============================================
  // EXPORT FUNCTIONS
  // ============================================

  function exportSessionCsv(session) {
    const answers = session.answers || {};
    const rows = DOMAINS.flatMap(domain =>
      domain.sections.flatMap(section =>
        section.subdomains.map(sub => ({
          domainId: domain.id,
          domainTitle: domain.title,
          sectionId: section.id,
          sectionTitle: section.title,
          subdomainId: sub.id,
          subdomainTitle: sub.title,
          level: answers[sub.id] || 'Not Started',
          notes: answers['notes:' + sub.id] || '',
        }))
      )
    );

    const csvHeader = 'Domain ID,Domain,Section ID,Section,Subdomain ID,Subdomain,Level,Notes\n';
    const csvRows = rows
      .map(r => `"${r.domainId}","${r.domainTitle}","${r.sectionId}","${r.sectionTitle}","${r.subdomainId}","${r.subdomainTitle}","${r.level}","${r.notes.replace(/"/g, '""')}"`)
      .join('\n');

    downloadFile(csvHeader + csvRows, `${sanitizeFilename(session.label)}-${new Date().toISOString().slice(0,10)}.csv`, 'text/csv;charset=utf-8;');
  }

  function exportSessionJson(session) {
    const answers = session.answers || {};
    const rows = DOMAINS.flatMap(domain =>
      domain.sections.flatMap(section =>
        section.subdomains.map(sub => ({
          domainId: domain.id,
          domainTitle: domain.title,
          sectionId: section.id,
          sectionTitle: section.title,
          subdomainId: sub.id,
          subdomainTitle: sub.title,
          level: answers[sub.id] || 'Not Started',
          notes: answers['notes:' + sub.id] || '',
        }))
      )
    );

    downloadFile(JSON.stringify(rows, null, 2), `${sanitizeFilename(session.label)}-${new Date().toISOString().slice(0,10)}.json`, 'application/json;charset=utf-8;');
  }

  function downloadFile(content, filename, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function sanitizeFilename(name) {
    return name.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 50);
  }

  // ============================================
  // RENDER
  // ============================================

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function render() {
    const container = document.getElementById('admin-panel');
    if (!container) return;

    if (!isAuthenticated()) {
      renderLoginScreen(container);
    } else {
      renderDashboard(container);
    }
  }

  function renderLoginScreen(container) {
    container.innerHTML = `
      <div class="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div class="bg-white p-10 rounded-3xl shadow-xl border border-slate-200 w-full max-w-md space-y-6">
          <div class="text-center space-y-2">
            <div class="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <h2 class="text-2xl font-black text-slate-900">Admin Access</h2>
            <p class="text-sm text-slate-500">Enter the admin password to manage sessions.</p>
          </div>
          <div id="admin-login-error" class="hidden text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-center font-medium"></div>
          <div>
            <input
              type="password"
              id="admin-password-input"
              placeholder="Password"
              class="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
              onkeydown="if(event.key==='Enter') window.adminPanel.login()"
            />
          </div>
          <button onclick="window.adminPanel.login()" class="w-full bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors">
            Sign In
          </button>
        </div>
      </div>
    `;
    // Auto-focus password field
    setTimeout(() => {
      const input = document.getElementById('admin-password-input');
      if (input) input.focus();
    }, 100);
  }

  function renderDashboard(container) {
    const sessions = getSessionsIndex();
    const activeSessionId = window.app && window.app.getActiveSessionId ? window.app.getActiveSessionId() : null;

    container.innerHTML = `
      <div class="max-w-6xl mx-auto py-10 px-4 space-y-8 animate-fade-in">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 class="text-3xl font-black text-slate-900">Session Manager</h2>
            <p class="text-slate-500 text-sm">Create, resume, review, and export assessment sessions.</p>
          </div>
          <div class="flex gap-3">
            <button onclick="window.adminPanel.newSession()" class="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
              New Session
            </button>
            <button onclick="window.adminPanel.logout()" class="bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-3 rounded-xl font-bold text-sm transition-colors">
              Sign Out
            </button>
          </div>
        </div>

        ${sessions.length === 0 ? `
          <div class="bg-white rounded-3xl border border-slate-200 p-16 text-center space-y-4">
            <div class="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto">
              <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900">No Sessions Yet</h3>
            <p class="text-slate-500 text-sm">Create a new session to start an assessment.</p>
          </div>
        ` : `
          <div class="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead class="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th class="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-500">Session</th>
                    <th class="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-500">Created</th>
                    <th class="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-500">Last Modified</th>
                    <th class="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-500">Progress</th>
                    <th class="px-6 py-4 text-right text-[10px] font-black uppercase tracking-widest text-slate-500">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  ${sessions.map(s => {
                    const isActive = s.id === activeSessionId;
                    return `
                      <tr class="${isActive ? 'bg-teal-50/50' : 'hover:bg-slate-50'} transition-colors">
                        <td class="px-6 py-4">
                          <div class="flex items-center gap-3">
                            ${isActive ? '<span class="w-2 h-2 bg-teal-500 rounded-full flex-shrink-0"></span>' : ''}
                            <div>
                              <div class="font-bold text-slate-900">${escapeHtml(s.label)}</div>
                              <div class="text-xs text-slate-400">${s.id}</div>
                            </div>
                          </div>
                        </td>
                        <td class="px-6 py-4 text-slate-600">${new Date(s.createdAt).toLocaleDateString()}</td>
                        <td class="px-6 py-4 text-slate-600">${new Date(s.lastModified).toLocaleDateString()}</td>
                        <td class="px-6 py-4">
                          <div class="flex items-center gap-3">
                            <div class="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div class="h-full bg-teal-500 rounded-full" style="width: ${s.completionPercent}%"></div>
                            </div>
                            <span class="text-xs font-bold text-slate-600">${s.completionPercent}%</span>
                          </div>
                        </td>
                        <td class="px-6 py-4">
                          <div class="flex items-center justify-end gap-2">
                            <button onclick="window.adminPanel.resumeSession('${s.id}')" class="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors" title="Resume">
                              Resume
                            </button>
                            <button onclick="window.adminPanel.reviewSession('${s.id}')" class="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors" title="Review">
                              Review
                            </button>
                            <button onclick="window.adminPanel.exportCsv('${s.id}')" class="bg-slate-600 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors" title="Export CSV">
                              CSV
                            </button>
                            <button onclick="window.adminPanel.exportJson('${s.id}')" class="bg-slate-600 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors" title="Export JSON">
                              JSON
                            </button>
                            <button onclick="window.adminPanel.deleteSession('${s.id}')" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors" title="Delete">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `}
      </div>

      <!-- Review Modal -->
      <div id="admin-review-modal" class="hidden fixed inset-0 z-[200] flex items-start justify-center bg-slate-900/50 backdrop-blur-sm p-4 overflow-y-auto"></div>
    `;
  }

  function renderReviewModal(session) {
    const modal = document.getElementById('admin-review-modal');
    if (!modal) return;

    const answers = session.answers || {};
    const stats = { Emerging: 0, Developing: 0, Mature: 0, 'Not Started': 0 };
    DOMAINS.forEach(d => d.sections.forEach(s => s.subdomains.forEach(sub => {
      stats[answers[sub.id] || 'Not Started']++;
    })));

    modal.classList.remove('hidden');
    modal.innerHTML = `
      <div class="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 my-8">
        <div class="p-6 bg-slate-50 border-b rounded-t-3xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 class="text-2xl font-black text-slate-900">${escapeHtml(session.label)}</h2>
            <p class="text-sm text-slate-500">Created ${new Date(session.createdAt).toLocaleDateString()} | Last modified ${new Date(session.lastModified).toLocaleDateString()}</p>
          </div>
          <div class="flex gap-2">
            <button onclick="window.adminPanel.printReview()" class="bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors">
              Print
            </button>
            <button onclick="window.adminPanel.closeReview()" class="bg-slate-900 hover:bg-slate-950 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors">
              Close
            </button>
          </div>
        </div>

        <div class="p-6 space-y-6" id="review-content">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
              <div class="text-3xl font-black text-red-600">${stats.Emerging}</div>
              <div class="text-xs font-bold text-red-800 uppercase tracking-widest mt-1">Emerging</div>
            </div>
            <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
              <div class="text-3xl font-black text-amber-600">${stats.Developing}</div>
              <div class="text-xs font-bold text-amber-800 uppercase tracking-widest mt-1">Developing</div>
            </div>
            <div class="bg-teal-50 border border-teal-200 rounded-xl p-4 text-center">
              <div class="text-3xl font-black text-teal-700">${stats.Mature}</div>
              <div class="text-xs font-bold text-teal-800 uppercase tracking-widest mt-1">Mature</div>
            </div>
            <div class="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
              <div class="text-3xl font-black text-slate-500">${stats['Not Started']}</div>
              <div class="text-xs font-bold text-slate-600 uppercase tracking-widest mt-1">Not Started</div>
            </div>
          </div>

          <div class="space-y-4">
            ${DOMAINS.map(d => `
              <details class="bg-white border border-slate-200 rounded-2xl overflow-hidden group" open>
                <summary class="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-sm">${d.id}</div>
                    <h3 class="font-bold text-slate-900">${escapeHtml(d.title)}</h3>
                  </div>
                  <svg class="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <div class="px-5 pb-5 space-y-3">
                  ${d.sections.map(s => `
                    <div class="bg-slate-50 rounded-xl p-4">
                      <h4 class="text-xs font-black text-teal-600 uppercase tracking-widest mb-3">${escapeHtml(s.title)}</h4>
                      <div class="space-y-2">
                        ${s.subdomains.map(sub => {
                          const level = answers[sub.id] || 'Not Started';
                          const note = answers['notes:' + sub.id] || '';
                          const badgeClass = level === 'Emerging' ? 'bg-red-100 text-red-600'
                            : level === 'Developing' ? 'bg-amber-100 text-amber-600'
                            : level === 'Mature' ? 'bg-teal-100 text-teal-700'
                            : 'bg-slate-100 text-slate-500';
                          return `
                            <div class="flex items-start justify-between gap-4 py-2 border-b border-slate-200 last:border-0">
                              <div class="flex-1 min-w-0">
                                <div class="text-sm text-slate-700 font-medium">${escapeHtml(sub.title)}</div>
                                ${note ? `<div class="text-xs text-slate-500 mt-1 italic">${escapeHtml(note)}</div>` : ''}
                              </div>
                              <span class="flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${badgeClass}">
                                ${level}
                              </span>
                            </div>
                          `;
                        }).join('')}
                      </div>
                    </div>
                  `).join('')}
                </div>
              </details>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // ============================================
  // PUBLIC API
  // ============================================

  window.adminPanel = {
    render: render,

    login: async function() {
      const input = document.getElementById('admin-password-input');
      const errorEl = document.getElementById('admin-login-error');
      if (!input) return;

      const hash = await hashPassword(input.value);
      if (hash === PASSWORD_HASH) {
        setAuthenticated();
        render();
      } else {
        if (errorEl) {
          errorEl.textContent = 'Incorrect password. Please try again.';
          errorEl.classList.remove('hidden');
        }
        input.value = '';
        input.focus();
      }
    },

    logout: function() {
      sessionStorage.removeItem(AUTH_KEY);
      render();
    },

    newSession: function() {
      const label = prompt('Enter a name for this session:', 'Assessment ' + new Date().toLocaleDateString());
      if (label === null) return; // Cancelled

      const session = createNewSession(label);

      // Load into assessment tool and switch tabs
      if (window.app && window.app.loadSession) {
        window.app.loadSession(session.id);
      }
      if (typeof switchTab === 'function') {
        switchTab('assessment');
      }
    },

    resumeSession: function(id) {
      const session = getSession(id);
      if (!session) {
        alert('Session not found.');
        return;
      }

      if (window.app && window.app.loadSession) {
        window.app.loadSession(id);
      }
      if (typeof switchTab === 'function') {
        switchTab('assessment');
      }
    },

    reviewSession: function(id) {
      const session = getSession(id);
      if (!session) {
        alert('Session not found.');
        return;
      }
      renderReviewModal(session);
    },

    closeReview: function() {
      const modal = document.getElementById('admin-review-modal');
      if (modal) {
        modal.classList.add('hidden');
        modal.innerHTML = '';
      }
    },

    printReview: function() {
      window.print();
    },

    exportCsv: function(id) {
      const session = getSession(id);
      if (!session) return;
      exportSessionCsv(session);
    },

    exportJson: function(id) {
      const session = getSession(id);
      if (!session) return;
      exportSessionJson(session);
    },

    deleteSession: function(id) {
      const index = getSessionsIndex();
      const session = index.find(s => s.id === id);
      if (!session) return;

      if (!confirm(`Delete "${session.label}"? This cannot be undone.`)) return;

      // If this is the active session, clear the app
      const activeId = window.app && window.app.getActiveSessionId ? window.app.getActiveSessionId() : null;
      if (activeId === id && window.app && window.app.clearActiveSession) {
        window.app.clearActiveSession();
      }

      deleteSession(id);
      render();
    },

    // Called by app.js to save session data
    updateSession: function(sessionId, answers, department) {
      const session = getSession(sessionId);
      if (!session) return;

      session.answers = answers;
      session.lastModified = new Date().toISOString();
      session.completionPercent = calculateCompletionPercent(answers);
      if (department) session.department = department;
      saveSession(session);
    },

    getSession: getSession,
    getSessionsIndex: getSessionsIndex,
    createNewSession: createNewSession,
    migrateIfNeeded: migrateIfNeeded,
    isAuthenticated: isAuthenticated,
    authenticate: async function(password) {
      const hash = await hashPassword(password);
      if (hash === PASSWORD_HASH) {
        setAuthenticated();
        return true;
      }
      return false;
    }
  };

})();
