// Main App Module
(function() {
  'use strict';

  // ============================================
  // STATE MANAGEMENT
  // ============================================

  const state = {
    screen: 'welcome', // 'welcome' | 'dept' | 'questions' | 'results'
    selectedDept: null,
    activeDomainIdx: 0,
    answers: {},
    toasts: [],
    sessionState: {
      mode: 'idle',
      code: '',
      participants: 0,
      isConnecting: false
    },
    showDashboard: false,
    lastUpdatedAt: null,
    visibleDomains: DOMAINS,
    activeSessionId: null,
    readOnly: false
  };

  // Load saved data - either from a session or legacy localStorage
  function loadSavedData(sessionId) {
    if (sessionId && window.adminPanel) {
      const session = window.adminPanel.getSession(sessionId);
      if (session) {
        state.answers = session.answers || {};
        state.activeSessionId = sessionId;
        if (session.department) {
          state.selectedDept = DEPARTMENTS.find(d => d.id === session.department) || null;
          updateVisibleDomains();
        }
        return;
      }
    }
    // Legacy fallback
    const saved = localStorage.getItem('ai_assessment_data');
    if (saved) {
      try {
        state.answers = JSON.parse(saved);
      } catch (e) {
        console.error('Failed to load saved data:', e);
      }
    }
  }

  // Save data to localStorage / active session
  function saveData() {
    if (state.activeSessionId && window.adminPanel) {
      window.adminPanel.updateSession(
        state.activeSessionId,
        state.answers,
        state.selectedDept ? state.selectedDept.id : null
      );
    }
    // Always also save to legacy key for backward compat
    localStorage.setItem('ai_assessment_data', JSON.stringify(state.answers));
  }

  // ============================================
  // TOAST NOTIFICATIONS
  // ============================================

  function addToast(message, type = 'info') {
    const id = Date.now();
    state.toasts.push({ id, message, type });
    renderToasts();

    setTimeout(() => {
      state.toasts = state.toasts.filter(t => t.id !== id);
      renderToasts();
    }, 3000);
  }

  function renderToasts() {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const styles = {
      success: 'bg-green-600 text-white border-green-700',
      info: 'bg-teal-600 text-white border-teal-700',
      error: 'bg-red-600 text-white border-red-700',
    };

    container.innerHTML = state.toasts.map(toast => {
      const icon = toast.type === 'success'
        ? '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>'
        : '';

      return `
        <div class="px-4 py-2 rounded-lg shadow-2xl border-2 flex items-center space-x-3 max-w-xs ${styles[toast.type]}">
          ${icon}
          <span class="text-sm font-bold">${escapeHtml(toast.message)}</span>
        </div>
      `;
    }).join('');
  }

  // ============================================
  // UTILITY FUNCTIONS
  // ============================================

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function calculateProgress() {
    const total = state.visibleDomains.reduce((acc, domain) =>
      acc + domain.sections.reduce((sAcc, section) => sAcc + section.subdomains.length, 0), 0);

    const completed = Object.keys(state.answers).filter(id => {
      return state.visibleDomains.some(d =>
        d.sections.some(s =>
          s.subdomains.some(sub => sub.id === id)
        )
      );
    }).length;

    return Math.round((completed / total) * 100) || 0;
  }

  function updateVisibleDomains() {
    if (!state.selectedDept) {
      state.visibleDomains = DOMAINS;
    } else {
      state.visibleDomains = DOMAINS.filter(d => state.selectedDept.domainIds.includes(d.id));
    }
  }

  // ============================================
  // EVENT HANDLERS
  // ============================================

  function handleMaturitySelect(subdomainId, level) {
    if (state.readOnly) return;
    state.answers[subdomainId] = level;
    saveData();
    addToast(`${level} level saved.`, 'success');

    // Dispatch event for sync
    window.dispatchEvent(new CustomEvent('assessment-update', {
      detail: state.answers
    }));

    render();
  }

  function handleNoteUpdate(subdomainId, value) {
    if (state.readOnly) return;
    const noteKey = 'notes:' + subdomainId;
    state.answers[noteKey] = value.slice(0, 300);
    saveData();

    // Sync notes with peers
    window.dispatchEvent(new CustomEvent('assessment-update', {
      detail: state.answers
    }));
  }

  function handleRemoteData(remoteData) {
    try {
      if (!remoteData || typeof remoteData !== 'object') {
        console.warn('[App] Ignoring invalid remote data:', remoteData);
        return;
      }
      state.answers = { ...state.answers, ...remoteData };
      state.lastUpdatedAt = new Date();
      saveData();
      render();
    } catch (err) {
      console.error('[App] Error processing remote data:', err);
    }
  }

  function handleSessionUpdate(session) {
    state.sessionState = session;
    render();
  }

  function handleOpenDashboard() {
    state.showDashboard = true;
    renderSessionDashboard();
  }

  function handleCloseDashboard() {
    state.showDashboard = false;
    renderSessionDashboard();
  }

  function handleExportCsv() {
    const rows = DOMAINS.flatMap((domain) =>
      domain.sections.flatMap((section) =>
        section.subdomains.map((sub) => ({
          domainId: domain.id,
          domainTitle: domain.title,
          sectionId: section.id,
          sectionTitle: section.title,
          subdomainId: sub.id,
          subdomainTitle: sub.title,
          level: state.answers[sub.id] || 'Not Started',
          notes: state.answers['notes:' + sub.id] || '',
        }))
      )
    );

    const csvHeader = 'Domain ID,Domain,Section ID,Section,Subdomain ID,Subdomain,Level,Notes\n';
    const csvRows = rows
      .map((r) => `"${r.domainId}","${r.domainTitle}","${r.sectionId}","${r.sectionTitle}","${r.subdomainId}","${r.subdomainTitle}","${r.level}","${r.notes.replace(/"/g, '""')}"`)
      .join('\n');
    const csvContent = csvHeader + csvRows;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `cosn-ai-maturity-export-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    addToast('CSV exported successfully.', 'success');
  }

  function handleExportJson() {
    const rows = DOMAINS.flatMap((domain) =>
      domain.sections.flatMap((section) =>
        section.subdomains.map((sub) => ({
          domainId: domain.id,
          domainTitle: domain.title,
          sectionId: section.id,
          sectionTitle: section.title,
          subdomainId: sub.id,
          subdomainTitle: sub.title,
          level: state.answers[sub.id] || 'Not Started',
          notes: state.answers['notes:' + sub.id] || '',
        }))
      )
    );

    const jsonContent = JSON.stringify(rows, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `cosn-ai-maturity-export-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    addToast('JSON exported successfully.', 'success');
  }

  function startOver() {
    if (state.readOnly) return;
    if (confirm('Are you sure you want to start over? This will create a fresh session.')) {
      state.answers = {};
      state.screen = 'welcome';
      state.selectedDept = null;
      state.activeDomainIdx = 0;
      state.readOnly = false;

      // Create a new session if admin module is available
      if (window.adminPanel) {
        const session = window.adminPanel.createNewSession('Session ' + new Date().toLocaleDateString());
        state.activeSessionId = session.id;
      } else {
        localStorage.removeItem('ai_assessment_data');
      }

      updateVisibleDomains();
      render();
    }
  }

  function exportJSON() {
    const stats = calculateStats();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(
      JSON.stringify({
        answers: state.answers,
        stats,
        timestamp: new Date().toISOString()
      })
    );
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "cosn_ai_maturity_results.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  function copyToClipboard() {
    const stats = calculateStats();
    const text = `CoSN K-12 AI Maturity Results\n\n` +
      `Summary:\n- Emerging: ${stats.Emerging}\n- Developing: ${stats.Developing}\n- Mature: ${stats.Mature}\n\n` +
      `Full Data Attached (JSON Format Recommended for Analysis)`;
    navigator.clipboard.writeText(text);
    alert('Summary copied to clipboard!');
  }

  function calculateStats() {
    const counts = { Emerging: 0, Developing: 0, Mature: 0, 'Not Started': 0 };
    state.visibleDomains.forEach(d => {
      d.sections.forEach(s => {
        s.subdomains.forEach(sub => {
          const val = state.answers[sub.id] || 'Not Started';
          counts[val]++;
        });
      });
    });
    return counts;
  }

  // ============================================
  // RENDER FUNCTIONS
  // ============================================

  function renderWelcomeScreen() {
    return `
      <div class="flex-1 space-y-12 animate-fade-in">
        <div class="space-y-4">
          <h2 class="text-5xl font-extrabold text-navy leading-tight">Maturity Self-Assessment</h2>
          <p class="text-xl text-slate-500">Benchmark your district's readiness across 7 critical domains using the CoSN Gen AI Framework.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div class="w-10 h-10 bg-teal-light text-teal rounded-xl flex items-center justify-center mb-4 text-xl font-bold">🏢</div>
            <h3 class="font-bold text-navy mb-1 text-lg">Department-Based</h3>
            <p class="text-sm text-slate-500">Tailored questions focusing on your specific operational impact.</p>
          </div>
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div class="w-10 h-10 bg-teal-light text-teal rounded-xl flex items-center justify-center mb-4 text-xl font-bold">🔄</div>
            <h3 class="font-bold text-navy mb-1 text-lg">Real-time Sync</h3>
            <p class="text-sm text-slate-500">Enable the Collaboration Hub to aggregate results with peers instantly.</p>
          </div>
        </div>
        <div class="pt-4">
          <button onclick="app.goToScreen('dept')" class="bg-teal hover:bg-teal-dark text-white px-12 py-5 rounded-2xl font-black text-xl shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center">
            Start My Assessment
            <svg class="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </button>
        </div>
      </div>
    `;
  }

  function renderDeptScreen() {
    return `
      <div class="flex-1 space-y-8 animate-fade-in">
        <div>
          <h2 class="text-3xl font-bold text-navy">Select Your Group</h2>
          <p class="text-slate-500">Find your name and select your assigned domain.</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          ${DEPARTMENTS.map(dept => `
            <button onclick="app.selectDept('${dept.id}')" class="bg-white p-6 rounded-2xl border-2 border-slate-100 hover:border-teal text-left transition-all hover:shadow-xl group relative overflow-hidden">
              <div class="absolute top-0 right-0 w-24 h-24 bg-teal/5 rounded-full -mr-8 -mt-8 group-hover:bg-teal/10 transition-colors"></div>
              <h3 class="text-xl font-bold text-navy group-hover:text-teal mb-1 z-10 relative">${escapeHtml(dept.name)}</h3>
              ${dept.members ? `<p class="text-sm font-semibold text-teal z-10 relative">${escapeHtml(dept.members)}</p>` : ''}
              <p class="text-sm text-slate-400 z-10 relative mt-1">${escapeHtml(dept.description)}</p>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderQuestionsScreen() {
    const currentDomain = state.visibleDomains[state.activeDomainIdx];
    const isFirst = state.activeDomainIdx === 0;
    const isLast = state.activeDomainIdx === state.visibleDomains.length - 1;

    return `
      <div class="flex-1 space-y-10 animate-fade-in">
        <div class="flex items-center justify-between border-b border-slate-200 pb-6">
          <div>
            <h2 class="text-3xl font-black text-navy">${escapeHtml(currentDomain.title)}</h2>
            <div class="flex items-center space-x-2 mt-2">
              <span class="text-[10px] font-black uppercase text-white bg-teal px-2 py-0.5 rounded">Domain ${currentDomain.id}</span>
              <span class="text-xs text-slate-400 font-bold tracking-tight">Focusing on ${escapeHtml(state.selectedDept?.name || '')} Readiness</span>
            </div>
          </div>
        </div>
        ${currentDomain.sections.map(section => `
          <div class="space-y-6">
            <h3 class="text-sm font-black text-teal uppercase tracking-widest flex items-center">
              <span class="w-6 h-1 bg-teal mr-3 rounded-full"></span>
              ${escapeHtml(section.title)}
            </h3>
            <div class="grid grid-cols-1 gap-8">
              ${section.subdomains.map(sub => `
                <div class="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 space-y-6 relative overflow-hidden group">
                  <div class="absolute top-0 left-0 w-1.5 h-full bg-slate-100 group-hover:bg-teal transition-colors"></div>
                  <h4 class="text-2xl font-bold text-navy">${escapeHtml(sub.title)}</h4>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    ${['Emerging', 'Developing', 'Mature'].map(level => {
                      const isSelected = state.answers[sub.id] === level;
                      const borderClass = isSelected
                        ? (level === 'Emerging' ? 'border-red-500 bg-red-50/50'
                          : level === 'Developing' ? 'border-amber-500 bg-amber-50/50'
                          : 'border-teal bg-teal-light/50')
                        : 'border-slate-50 hover:border-slate-200 bg-slate-50/30';
                      const radioClass = isSelected
                        ? (level === 'Emerging' ? 'bg-red-500 border-red-200'
                          : level === 'Developing' ? 'bg-amber-500 border-amber-200'
                          : 'bg-teal border-teal-light')
                        : 'bg-transparent border-slate-200';
                      const labelClass = isSelected ? 'text-navy' : 'text-slate-400';
                      const textClass = isSelected ? 'text-slate-700 font-medium' : 'text-slate-500';

                      return `
                        <button onclick="app.selectMaturity('${sub.id}', '${level}')" class="p-6 rounded-2xl border-2 text-left transition-all relative ${borderClass}">
                          <div class="flex items-center mb-3">
                            <div class="w-4 h-4 rounded-full mr-2 border-2 ${radioClass}"></div>
                            <span class="text-[10px] font-black uppercase tracking-widest ${labelClass}">${level}</span>
                          </div>
                          <p class="text-xs leading-relaxed ${textClass}">${escapeHtml(sub.descriptions[level])}</p>
                        </button>
                      `;
                    }).join('')}
                  </div>
                  <div class="pt-2">
                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 block">Notes <span class="font-normal normal-case tracking-normal text-slate-300">(${(state.answers['notes:' + sub.id] || '').length}/300)</span></label>
                    <textarea
                      maxlength="300"
                      placeholder="Add optional notes for this subdomain..."
                      class="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-700 placeholder-slate-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none resize-none transition-colors"
                      rows="2"
                      oninput="app.updateNote('${sub.id}', this.value)"
                    >${escapeHtml(state.answers['notes:' + sub.id] || '')}</textarea>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
        <div class="flex items-center justify-between pt-12 pb-20 border-t border-slate-100">
          <button
            onclick="app.prevDomain()"
            ${isFirst ? 'disabled' : ''}
            class="px-8 py-3 rounded-xl font-bold text-sm border-2 transition-all ${isFirst ? 'border-slate-50 text-slate-200 cursor-not-allowed' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}"
          >
            ← Back
          </button>
          ${isLast
            ? '<button onclick="app.goToScreen(\'results\')" class="bg-teal hover:bg-teal-dark text-white px-10 py-4 rounded-xl font-black text-sm shadow-2xl transition-all hover:scale-105">Complete & View Results</button>'
            : '<button onclick="app.nextDomain()" class="bg-navy hover:bg-navy-dark text-white px-8 py-3 rounded-xl font-bold text-sm shadow-xl transition-all hover:scale-105">Next Domain →</button>'
          }
        </div>
      </div>
    `;
  }

  function renderResultsScreen() {
    const stats = calculateStats();

    return `
      <div class="max-w-5xl mx-auto space-y-12 animate-fade-in pb-20">
        <div class="text-center space-y-4">
          <h2 class="text-4xl font-extrabold text-slate-900">Maturity Profile</h2>
          <p class="text-slate-600">A snapshot of your district's readiness across all assessed domains.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-red-50 border-2 border-red-200 p-8 rounded-2xl text-center">
            <span class="text-5xl font-black text-red-600">${stats.Emerging}</span>
            <p class="text-sm font-bold text-red-800 mt-2 uppercase tracking-widest">Emerging Areas</p>
            <p class="text-xs text-red-600 mt-1">High Risk - Immediate Attention Required</p>
          </div>
          <div class="bg-amber-50 border-2 border-amber-200 p-8 rounded-2xl text-center">
            <span class="text-5xl font-black text-amber-600">${stats.Developing}</span>
            <p class="text-sm font-bold text-amber-800 mt-2 uppercase tracking-widest">Developing Areas</p>
            <p class="text-xs text-amber-600 mt-1">Managed Risk - Planning & Piloting</p>
          </div>
          <div class="bg-teal-100 border-2 border-teal-600 p-8 rounded-2xl text-center">
            <span class="text-5xl font-black text-teal-700">${stats.Mature}</span>
            <p class="text-sm font-bold text-teal-700 mt-2 uppercase tracking-widest">Mature Areas</p>
            <p class="text-xs text-teal-600 mt-1">Optimized - Scaling Success</p>
          </div>
        </div>

        <div class="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
          <div class="p-8 bg-slate-50 border-b flex items-center justify-between">
            <h3 class="text-xl font-bold text-slate-900">Domain Details</h3>
            <div class="flex space-x-2">
              <button onclick="app.exportJSON()" class="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-950 transition-colors">Export JSON</button>
              <button onclick="app.copyToClipboard()" class="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-teal-700 transition-colors">Copy Summary</button>
            </div>
          </div>
          <div class="divide-y">
            ${state.visibleDomains.map(d => `
              <details class="group">
                <summary class="p-6 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors">
                  <div class="flex items-center space-x-4">
                    <div class="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">${d.id}</div>
                    <h4 class="text-lg font-bold text-slate-900">${escapeHtml(d.title)}</h4>
                  </div>
                  <div class="flex items-center space-x-4">
                    <span class="text-xs font-medium text-slate-600">
                      ${d.sections.reduce((acc, s) => acc + s.subdomains.length, 0)} Items
                    </span>
                    <svg class="w-5 h-5 text-slate-600 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </summary>
                <div class="p-6 pt-0 bg-slate-50">
                  <div class="grid grid-cols-1 gap-4">
                    ${d.sections.map(s => `
                      <div class="bg-white p-4 rounded-xl border border-slate-200">
                        <h5 class="text-sm font-bold text-teal-600 mb-3">${escapeHtml(s.title)}</h5>
                        <div class="space-y-2">
                          ${s.subdomains.map(sub => {
                            const level = state.answers[sub.id] || 'Not Started';
                            const badgeClass = level === 'Emerging' ? 'bg-red-100 text-red-600'
                              : level === 'Developing' ? 'bg-amber-100 text-amber-600'
                              : level === 'Mature' ? 'bg-teal-100 text-teal-700'
                              : 'bg-slate-100 text-slate-600';

                            return `
                              <div class="flex items-center justify-between text-sm py-2 border-b last:border-0">
                                <span class="text-slate-600">${escapeHtml(sub.title)}</span>
                                <span class="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${badgeClass}">
                                  ${level}
                                </span>
                              </div>
                            `;
                          }).join('')}
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              </details>
            `).join('')}
          </div>
        </div>

        <div class="flex items-center justify-center space-x-4">
          <button onclick="app.goToScreen('questions')" class="text-slate-900 font-bold hover:underline">Edit Responses</button>
          <span class="text-slate-300">|</span>
          <button onclick="app.startOver()" class="text-red-500 font-bold hover:underline">Start Over</button>
        </div>
      </div>
    `;
  }

  function renderSidebar() {
    const isQuestionsScreen = state.screen === 'questions';
    const progress = calculateProgress();

    const activeLabel = state.activeSessionId && window.adminPanel
      ? (window.adminPanel.getSession(state.activeSessionId) || {}).label || ''
      : '';

    return `
      <div class="md:w-72 space-y-6 ${isQuestionsScreen ? 'md:order-first' : 'md:order-last'}">
        ${activeLabel ? `
          <div class="bg-slate-900 text-white p-4 rounded-xl shadow-sm">
            <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Active Session</p>
            <p class="text-sm font-bold truncate">${escapeHtml(activeLabel)}</p>
            ${state.readOnly ? '<p class="text-[10px] text-amber-400 font-bold mt-1 uppercase">Read-Only Mode</p>' : ''}
          </div>
        ` : ''}
        ${isQuestionsScreen ? `
          <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Progress Track</h4>
            <div class="h-3 bg-slate-100 rounded-full overflow-hidden">
              <div class="h-full bg-teal transition-all duration-500" style="width: ${progress}%"></div>
            </div>
            <p class="text-right text-xs mt-2 text-slate-500 font-bold">${progress}% Domain Complete</p>
          </div>
        ` : ''}

        <div id="sync-manager-container"></div>

        ${isQuestionsScreen ? `
          <nav class="space-y-1">
            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 py-2">Framework Domains</p>
            ${state.visibleDomains.map((d, idx) => `
              <button
                onclick="app.setActiveDomain(${idx})"
                class="w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${state.activeDomainIdx === idx ? 'bg-navy text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}"
              >
                ${d.id}. ${escapeHtml(d.title)}
              </button>
            `).join('')}
          </nav>
          <button onclick="app.startOver()" class="w-full text-center mt-8 text-red-500 text-xs font-bold hover:underline opacity-60 hover:opacity-100 transition-opacity">
            Reset All Assessment Data
          </button>
        ` : ''}

        ${state.screen === 'dept' ? `
          <button onclick="app.startOver()" class="w-full text-center mt-8 text-red-500 text-xs font-bold hover:underline opacity-60 hover:opacity-100 transition-opacity">
            Reset All Assessment Data
          </button>
        ` : ''}
      </div>
    `;
  }

  function renderMainContent() {
    switch (state.screen) {
      case 'welcome':
        return renderWelcomeScreen();
      case 'dept':
        return renderDeptScreen();
      case 'questions':
        return renderQuestionsScreen();
      case 'results':
        return renderResultsScreen();
      default:
        return '';
    }
  }

  function render() {
    const app = document.getElementById('app');
    if (!app) return;

    const isQuestionsScreen = state.screen === 'questions';
    const containerClass = state.screen === 'results'
      ? ''
      : `flex flex-col md:flex-row gap-8 ${isQuestionsScreen ? 'max-w-7xl' : 'max-w-6xl'} mx-auto ${state.screen === 'welcome' ? 'items-start' : ''}`;

    if (state.screen === 'results') {
      app.innerHTML = renderMainContent();
    } else {
      app.innerHTML = `
        <div class="${containerClass}">
          ${renderSidebar()}
          <div class="flex-1 ${isQuestionsScreen ? 'md:order-last' : 'md:order-first'}">
            ${renderMainContent()}
          </div>
        </div>
      `;
    }

    // Re-render SyncManager after main render
    if (window.SyncManager && window.SyncManager._render) {
      window.SyncManager._render();
    }

    // Re-render dashboard if it's currently visible
    if (state.showDashboard) {
      renderSessionDashboard();
    }
  }

  function renderSessionDashboard() {
    const dashboardEl = document.getElementById('session-dashboard');
    if (!dashboardEl) return;

    if (!state.showDashboard) {
      dashboardEl.classList.add('hidden');
      return;
    }

    dashboardEl.classList.remove('hidden');

    const rows = DOMAINS.flatMap((domain) =>
      domain.sections.flatMap((section) =>
        section.subdomains.map((sub) => ({
          domainId: domain.id,
          domainTitle: domain.title,
          sectionId: section.id,
          sectionTitle: section.title,
          subdomainId: sub.id,
          subdomainTitle: sub.title,
          level: state.answers[sub.id] || 'Not Started',
          notes: state.answers['notes:' + sub.id] || '',
        }))
      )
    );

    const completed = rows.filter(row => row.level !== 'Not Started').length;
    const lastUpdateLabel = state.lastUpdatedAt
      ? state.lastUpdatedAt.toLocaleString()
      : 'No updates yet';

    dashboardEl.innerHTML = `
      <div class="w-full max-w-6xl bg-white rounded-3xl shadow-2xl border border-slate-200">
        <div class="p-6 bg-slate-50 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 class="text-2xl font-black text-slate-900">Session Dashboard</h2>
            <p class="text-sm text-slate-600">Live session data from connected participants.</p>
          </div>
          <div class="flex flex-wrap gap-2">
            <button onclick="app.exportCsv()" class="bg-teal-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-teal-700 transition-colors">
              Export CSV
            </button>
            <button onclick="app.exportJsonDashboard()" class="bg-indigo-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-indigo-700 transition-colors">
              Export JSON
            </button>
            <button onclick="app.closeDashboard()" class="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-950 transition-colors">
              Back to Assessment
            </button>
          </div>
        </div>

        <div class="p-6 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="rounded-2xl border border-slate-200 bg-white p-4">
              <p class="text-[10px] uppercase font-black tracking-widest text-slate-500">Session Status</p>
              <p class="text-lg font-bold text-slate-900">
                ${state.sessionState.mode === 'host' ? 'Hosting' : state.sessionState.mode === 'client' ? 'Connected' : 'Idle'}
              </p>
              <p class="text-xs text-slate-600">Code: ${state.sessionState.code || 'N/A'}</p>
            </div>
            <div class="rounded-2xl border border-slate-200 bg-white p-4">
              <p class="text-[10px] uppercase font-black tracking-widest text-slate-500">Participants</p>
              <p class="text-lg font-bold text-slate-900">${state.sessionState.participants}</p>
              <p class="text-xs text-slate-600">Includes the host device.</p>
            </div>
            <div class="rounded-2xl border border-slate-200 bg-white p-4">
              <p class="text-[10px] uppercase font-black tracking-widest text-slate-500">Completion</p>
              <p class="text-lg font-bold text-slate-900">${completed} / ${rows.length}</p>
              <p class="text-xs text-slate-600">Last update: ${lastUpdateLabel}</p>
            </div>
          </div>

          <div class="rounded-2xl border border-slate-200 overflow-hidden">
            <div class="bg-slate-900 text-white px-4 py-3 text-xs font-black uppercase tracking-widest">
              Session Data Table
            </div>
            <div class="max-h-[480px] overflow-auto">
              <table class="min-w-[900px] w-full text-sm">
                <thead class="bg-slate-50 text-slate-600">
                  <tr>
                    <th class="px-4 py-3 text-left font-bold">Domain</th>
                    <th class="px-4 py-3 text-left font-bold">Section</th>
                    <th class="px-4 py-3 text-left font-bold">Subdomain</th>
                    <th class="px-4 py-3 text-left font-bold">Level</th>
                    <th class="px-4 py-3 text-left font-bold">Notes</th>
                  </tr>
                </thead>
                <tbody class="divide-y">
                  ${rows.map(row => {
                    const badgeClass = row.level === 'Emerging' ? 'bg-red-100 text-red-600'
                      : row.level === 'Developing' ? 'bg-amber-100 text-amber-600'
                      : row.level === 'Mature' ? 'bg-teal-100 text-teal-700'
                      : 'bg-slate-100 text-slate-600';

                    return `
                      <tr class="text-slate-700">
                        <td class="px-4 py-3 align-top">
                          <div class="text-xs font-black text-slate-500">${row.domainId}</div>
                          <div class="font-semibold text-slate-900">${escapeHtml(row.domainTitle)}</div>
                        </td>
                        <td class="px-4 py-3 align-top">
                          <div class="text-xs font-black text-slate-500">${escapeHtml(row.sectionId)}</div>
                          <div class="font-semibold text-slate-900">${escapeHtml(row.sectionTitle)}</div>
                        </td>
                        <td class="px-4 py-3 align-top">
                          <div class="text-xs font-black text-slate-500">${escapeHtml(row.subdomainId)}</div>
                          <div class="font-semibold text-slate-900">${escapeHtml(row.subdomainTitle)}</div>
                        </td>
                        <td class="px-4 py-3 align-top">
                          <span class="inline-flex rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-widest ${badgeClass}">
                            ${row.level}
                          </span>
                        </td>
                        <td class="px-4 py-3 align-top text-xs text-slate-600 max-w-[200px]">
                          ${row.notes ? escapeHtml(row.notes) : '<span class="text-slate-300 italic">—</span>'}
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================
  // PUBLIC API
  // ============================================

  window.app = {
    goToScreen: function(screen) {
      state.screen = screen;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      render();
    },

    selectDept: function(deptId) {
      state.selectedDept = DEPARTMENTS.find(d => d.id === deptId);
      updateVisibleDomains();
      state.screen = 'questions';
      state.activeDomainIdx = 0;
      saveData(); // Persist department selection to session
      render();
    },

    selectMaturity: function(subdomainId, level) {
      handleMaturitySelect(subdomainId, level);
    },

    prevDomain: function() {
      if (state.activeDomainIdx > 0) {
        state.activeDomainIdx--;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        render();
      }
    },

    nextDomain: function() {
      if (state.activeDomainIdx < state.visibleDomains.length - 1) {
        state.activeDomainIdx++;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        render();
      }
    },

    setActiveDomain: function(idx) {
      state.activeDomainIdx = idx;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      render();
    },

    startOver: startOver,
    exportJSON: exportJSON,
    copyToClipboard: copyToClipboard,
    updateNote: handleNoteUpdate,
    exportCsv: handleExportCsv,
    exportJsonDashboard: handleExportJson,
    closeDashboard: handleCloseDashboard,

    loadSession: function(sessionId) {
      state.readOnly = false;
      state.screen = 'welcome';
      state.activeDomainIdx = 0;
      state.selectedDept = null;
      state.answers = {};
      loadSavedData(sessionId);
      updateVisibleDomains();
      render();
    },

    getActiveSessionId: function() {
      return state.activeSessionId;
    },

    setReadOnly: function(val) {
      state.readOnly = !!val;
      render();
    },

    clearActiveSession: function() {
      state.activeSessionId = null;
      state.answers = {};
      state.screen = 'welcome';
      state.selectedDept = null;
      state.readOnly = false;
      updateVisibleDomains();
      render();
    }
  };

  // ============================================
  // INITIALIZATION
  // ============================================

  function init() {
    console.log('[App] Initializing...');

    // Verify #app element exists
    const appElement = document.getElementById('app');
    if (!appElement) {
      console.error('[App] #app element not found!');
      return;
    }

    // Migrate legacy data to sessions if needed
    if (window.adminPanel) {
      window.adminPanel.migrateIfNeeded();
      // Auto-load most recent session if one exists
      const sessions = window.adminPanel.getSessionsIndex();
      if (sessions.length > 0) {
        loadSavedData(sessions[0].id);
      } else {
        loadSavedData();
      }
    } else {
      loadSavedData();
    }

    // Initialize SyncManager
    if (window.SyncManager) {
      window.SyncManager.init('sync-manager-container', {
        onDataReceived: handleRemoteData,
        onSessionUpdate: handleSessionUpdate,
        addToast: addToast,
        onOpenDashboard: handleOpenDashboard
      });

      // Set current data
      window.SyncManager.setCurrentData(state.answers);

      // Listen for local updates to broadcast
      window.addEventListener('assessment-update', (e) => {
        if (window.SyncManager) {
          window.SyncManager.sendUpdate(e.detail);
        }
      });
    }

    console.log('[App] Calling render(), screen:', state.screen);
    render();
    console.log('[App] Initialization complete');
  }

  // Start the app when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
