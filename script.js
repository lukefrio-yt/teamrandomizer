/**
 * TeamRandomizer PRO — Apple HIG Edition
 * Robust, accessible, and responsive team generator.
 */

// ==========================================
// 1. SVG Icons (Inline for fast, offline use)
// ==========================================
const ICONS = {
  sun: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
  moon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`,
  volumeOn: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`,
  volumeOff: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`,
  user: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
  crown: `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
  eye: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`,
  trash: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`,
  listCheck: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>`
};

// ==========================================
// 2. Audio Engine (Synthesized Web Audio API)
// ==========================================
let audioCtx = null;
let soundEnabled = true;

function initAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

function playSound(type) {
  if (!soundEnabled) return;
  try {
    initAudioContext();
    if (!audioCtx) return;

    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'pop') {
      // Haptic-like cheerful pop
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(780, now + 0.12);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === 'error') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, now);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'copy') {
      // Gentle chime
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.setValueAtTime(780, now + 0.06);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc.start(now);
      osc.stop(now + 0.16);
    }
  } catch (e) {
    // Audio context silently ignored if unavailable
  }
}

// ==========================================
// 3. Theme & Audio Management
// ==========================================
let currentTheme = 'light';

function initTheme() {
  const savedTheme = localStorage.getItem('teamRandomizerTheme');
  if (savedTheme === 'dark' || savedTheme === 'light') {
    currentTheme = savedTheme;
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    currentTheme = 'dark';
  }
  applyTheme(currentTheme);
}

function applyTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.innerHTML = theme === 'dark' ? ICONS.sun : ICONS.moon;
  }
  try {
    localStorage.setItem('teamRandomizerTheme', theme);
  } catch (e) {}
}

function initSound() {
  const savedSound = localStorage.getItem('teamRandomizerSound');
  if (savedSound !== null) {
    soundEnabled = savedSound === 'true';
  }
  applySoundUI();
}

function applySoundUI() {
  const soundBtn = document.getElementById('sound-toggle-btn');
  if (soundBtn) {
    soundBtn.innerHTML = soundEnabled ? ICONS.volumeOn : ICONS.volumeOff;
  }
  try {
    localStorage.setItem('teamRandomizerSound', soundEnabled.toString());
  } catch (e) {}
}

// ==========================================
// 4. DOM Elements
// ==========================================
const inputArea = document.getElementById('players-input');
const badge = document.getElementById('player-count-badge');
const modeSelect = document.getElementById('mode-select');
const customBox = document.getElementById('custom-teams-box');
const numberInput = document.getElementById('number-input');
const captainsCheck = document.getElementById('captains-check');
const generateBtn = document.getElementById('generate-btn');
const clearBtn = document.getElementById('clear-btn');
const copyBtn = document.getElementById('copy-btn');
const resultsWrapper = document.getElementById('results-wrapper');
const resultsContainer = document.getElementById('results-section');
const errorBox = document.getElementById('error-box');
const errorText = document.getElementById('error-text');
const toast = document.getElementById('toast');
const toastText = document.getElementById('toast-text');
const historyList = document.getElementById('history-list');
const clearHistoryBtn = document.getElementById('clear-history-btn');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const soundToggleBtn = document.getElementById('sound-toggle-btn');

let generatedData = { teams: null, isCaptains: false };
let historyData = [];
let toastTimeout = null;

// ==========================================
// 5. Utility Functions & Notifications
// ==========================================
function showToast(msg) {
  if (toastTimeout) clearTimeout(toastTimeout);
  toastText.textContent = msg;
  toast.classList.add('show');
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 2200);
}

function showError(msg) {
  errorText.textContent = msg;
  errorBox.classList.remove('hidden');
  playSound('error');
}

function hideError() {
  errorBox.classList.add('hidden');
}

function getPlayersList() {
  return inputArea.value
    .split('\n')
    .map(name => name.trim())
    .filter(name => name.length > 0);
}

function getCzechPlural(count, singular, few, many) {
  if (count === 1) return `${count} ${singular}`;
  if (count >= 2 && count <= 4) return `${count} ${few}`;
  return `${count} ${many}`;
}

function updatePlayerCount() {
  const count = getPlayersList().length;
  badge.textContent = getCzechPlural(count, 'hráč', 'hráči', 'hráčů');
}

// ==========================================
// 6. Event Listeners & Setup
// ==========================================
themeToggleBtn.addEventListener('click', () => {
  playSound('click');
  applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

soundToggleBtn.addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  applySoundUI();
  playSound('click');
  showToast(soundEnabled ? 'Zvuky zapnuty' : 'Zvuky ztlumeny');
});

modeSelect.addEventListener('change', () => {
  playSound('click');
  if (modeSelect.value === 'teams') {
    customBox.classList.remove('hidden');
    numberInput.focus();
  } else {
    customBox.classList.add('hidden');
  }
});

inputArea.addEventListener('input', () => {
  hideError();
  updatePlayerCount();
  try {
    localStorage.setItem('tr_pro_players', inputArea.value);
  } catch (e) {}
});

clearBtn.addEventListener('click', () => {
  playSound('click');
  hideError();
  inputArea.value = '';
  updatePlayerCount();
  try {
    localStorage.removeItem('tr_pro_players');
  } catch (e) {}
  resultsWrapper.classList.add('hidden');
  showToast('Seznam vymazán');
});

// ==========================================
// 7. Team Generation Logic (Fixed & Robust)
// ==========================================
generateBtn.addEventListener('click', () => {
  hideError();
  const players = getPlayersList();

  if (players.length < 2) {
    showError('Zadej alespoň 2 hráče pro úspěšné rozlosování!');
    return;
  }

  const isCaptains = captainsCheck.checked;
  const mode = modeSelect.value;
  let totalTeams = 2;

  if (mode === 'pairs') {
    // 2 hráči v týmu -> počet týmů
    totalTeams = Math.max(2, Math.round(players.length / 2));
  } else if (mode === 'trios') {
    // 3 hráči v týmu -> počet týmů
    totalTeams = Math.max(2, Math.round(players.length / 3));
  } else if (mode === 'quads') {
    // 4 hráči v týmu -> počet týmů
    totalTeams = Math.max(2, Math.round(players.length / 4));
  } else if (mode === 'teams') {
    const rawNum = parseInt(numberInput.value, 10);
    if (isNaN(rawNum) || rawNum < 2) {
      showError('Počet týmů musí být alespoň 2!');
      return;
    }
    if (rawNum > players.length) {
      showError('Počet týmů nemůže být větší než celkový počet hráčů!');
      return;
    }
    totalTeams = rawNum;
  }

  playSound('pop');

  // Fisher-Yates náhodné promíchání
  const shuffled = [...players];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Rozdělení hráčů do týmů
  const teams = Array.from({ length: totalTeams }, () => []);
  shuffled.forEach((player, index) => {
    teams[index % totalTeams].push(player);
  });

  generatedData = { teams, isCaptains };
  renderResults(teams, isCaptains);

  // Záznam do historie
  const now = new Date();
  const timeString = `${now.toLocaleDateString('cs-CZ')} ${now.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' })}`;
  const teamLabel = getCzechPlural(teams.length, 'tým', 'týmy', 'týmů');

  const historyItem = {
    id: Date.now(),
    title: `Rozlosování (${teamLabel})`,
    date: timeString,
    teams: teams,
    isCaptains: isCaptains
  };

  historyData.unshift(historyItem);
  if (historyData.length > 15) historyData.pop();

  try {
    localStorage.setItem('tr_pro_history', JSON.stringify(historyData));
  } catch (e) {}

  renderHistory();
  showToast('Týmy byly rozlosovány!');

  // Jemné posunutí k výsledkům na menších displejích
  if (window.innerWidth < 640) {
    resultsWrapper.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
});

// ==========================================
// 8. Safe DOM Rendering (XSS Protection)
// ==========================================
function renderResults(teams, isCaptains) {
  resultsContainer.innerHTML = '';
  resultsWrapper.classList.remove('hidden');

  teams.forEach((team, tIndex) => {
    const card = document.createElement('div');
    card.className = 'team-card';

    const title = document.createElement('div');
    title.className = 'team-title';

    const titleSpan = document.createElement('span');
    titleSpan.textContent = `Tým ${tIndex + 1}`;

    const countSpan = document.createElement('span');
    countSpan.className = 'team-count-text';
    countSpan.textContent = getCzechPlural(team.length, 'hráč', 'hráči', 'hráčů');

    title.appendChild(titleSpan);
    title.appendChild(countSpan);

    const list = document.createElement('ul');
    list.className = 'player-list';

    team.forEach((playerName, pIndex) => {
      const li = document.createElement('li');
      li.className = 'player-item';

      const isCaptain = isCaptains && pIndex === 0;

      const iconSpan = document.createElement('span');
      iconSpan.className = `player-icon ${isCaptain ? 'captain' : ''}`;
      iconSpan.innerHTML = isCaptain ? ICONS.crown : ICONS.user;

      const nameSpan = document.createElement('span');
      nameSpan.textContent = playerName;

      li.appendChild(iconSpan);
      li.appendChild(nameSpan);

      if (isCaptain) {
        const capTag = document.createElement('span');
        capTag.className = 'captain-tag';
        capTag.innerHTML = `${ICONS.crown} Kapitán`;
        li.appendChild(capTag);
      }

      list.appendChild(li);
    });

    card.appendChild(title);
    card.appendChild(list);
    resultsContainer.appendChild(card);
  });
}

function renderHistory() {
  if (historyData.length === 0) {
    historyList.innerHTML = `<p class="history-empty">Zatím žádná uložená rozlosování.</p>`;
    return;
  }

  historyList.innerHTML = '';
  historyData.forEach((item) => {
    const itemEl = document.createElement('div');
    itemEl.className = 'history-item';

    const infoDiv = document.createElement('div');
    infoDiv.className = 'history-info';
    infoDiv.title = 'Kliknutím zobrazíš toto rozlosování';

    const titleSpan = document.createElement('span');
    titleSpan.className = 'history-title';
    titleSpan.innerHTML = `${ICONS.listCheck} <span>${escapeHtml(item.title)}</span>`;

    const dateSpan = document.createElement('span');
    dateSpan.className = 'history-date';
    dateSpan.textContent = item.date;

    infoDiv.appendChild(titleSpan);
    infoDiv.appendChild(dateSpan);
    infoDiv.addEventListener('click', () => loadHistoryItem(item.id));

    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'history-actions';

    const viewBtn = document.createElement('button');
    viewBtn.type = 'button';
    viewBtn.className = 'history-action-btn';
    viewBtn.title = 'Zobrazit';
    viewBtn.setAttribute('aria-label', 'Zobrazit toto rozlosování');
    viewBtn.innerHTML = ICONS.eye;
    viewBtn.addEventListener('click', () => loadHistoryItem(item.id));

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'history-action-btn delete';
    deleteBtn.title = 'Smazat záznam';
    deleteBtn.setAttribute('aria-label', 'Smazat tento záznam');
    deleteBtn.innerHTML = ICONS.trash;
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteHistoryItem(item.id);
    });

    actionsDiv.appendChild(viewBtn);
    actionsDiv.appendChild(deleteBtn);

    itemEl.appendChild(infoDiv);
    itemEl.appendChild(actionsDiv);
    historyList.appendChild(itemEl);
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, function (m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m];
  });
}

function loadHistoryItem(id) {
  playSound('click');
  const item = historyData.find(h => h.id === id);
  if (item) {
    generatedData = { teams: item.teams, isCaptains: item.isCaptains };
    renderResults(item.teams, item.isCaptains);
    showToast('Načteno z historie');
    resultsWrapper.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function deleteHistoryItem(id) {
  playSound('click');
  historyData = historyData.filter(h => h.id !== id);
  try {
    localStorage.setItem('tr_pro_history', JSON.stringify(historyData));
  } catch (e) {}
  renderHistory();
  showToast('Záznam smazán');
}

clearHistoryBtn.addEventListener('click', () => {
  if (historyData.length === 0) return;
  playSound('click');
  historyData = [];
  try {
    localStorage.removeItem('tr_pro_history');
  } catch (e) {}
  renderHistory();
  showToast('Historie byla vymazána');
});

// ==========================================
// 9. Copy to Clipboard (Robust with Fallback)
// ==========================================
copyBtn.addEventListener('click', () => {
  if (!generatedData.teams || generatedData.teams.length === 0) return;
  playSound('copy');

  let text = 'TeamRandomizer — Rozlosované týmy:\n\n';
  generatedData.teams.forEach((team, idx) => {
    text += `*Tým ${idx + 1}:*\n`;
    team.forEach((p, pIdx) => {
      const cap = generatedData.isCaptains && pIdx === 0 ? ' (Kapitán)' : '';
      text += `  • ${p}${cap}\n`;
    });
    text += '\n';
  });

  copyTextToClipboard(text);
});

function copyTextToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => showToast('Zkopírováno do schránky!'))
      .catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '-9999px';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    if (successful) {
      showToast('Zkopírováno do schránky!');
    } else {
      showError('Kopírování selhalo');
    }
  } catch (err) {
    showError('Kopírování selhalo');
  }
}

// ==========================================
// 10. Initialization
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSound();

  // Load saved players
  try {
    const savedPlayers = localStorage.getItem('tr_pro_players');
    if (savedPlayers) {
      inputArea.value = savedPlayers;
      updatePlayerCount();
    }
  } catch (e) {}

  // Load saved history
  try {
    const savedHistory = localStorage.getItem('tr_pro_history');
    if (savedHistory) {
      historyData = JSON.parse(savedHistory);
      if (!Array.isArray(historyData)) historyData = [];
    }
  } catch (e) {
    historyData = [];
  }
  renderHistory();
});
