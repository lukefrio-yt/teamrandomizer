const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playSound(type) {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  const now = audioCtx.currentTime;

  if (type === 'click') {
    osc.frequency.setValueAtTime(500, now);
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.03);
    osc.start(now); osc.stop(now + 0.03);
  } else if (type === 'pop') {
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.linearRampToValueAtTime(700, now + 0.1);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.1);
    osc.start(now); osc.stop(now + 0.1);
  } else if (type === 'error') {
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
    osc.start(now); osc.stop(now + 0.12);
  }
}

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

let generatedData = {};
let historyData = [];

function showToast(msg) {
  toastText.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

function showError(msg) {
  errorText.textContent = msg;
  errorBox.classList.remove('hidden');
  playSound('error');
}
function hideError() {
  errorBox.classList.add('hidden');
}

modeSelect.addEventListener('change', () => {
  playSound('click');
  if (modeSelect.value === 'teams') {
    customBox.classList.remove('hidden');
  } else {
    customBox.classList.add('hidden');
  }
});

window.addEventListener('DOMContentLoaded', () => {
  const savedPlayers = localStorage.getItem('tr_pro_players');
  if (savedPlayers) {
    inputArea.value = savedPlayers;
    updatePlayerCount();
  }

  const savedHistory = localStorage.getItem('tr_pro_history');
  if (savedHistory) {
    try {
      historyData = JSON.parse(savedHistory);
      renderHistory();
    } catch(e) { historyData = []; }
  }
});

inputArea.addEventListener('input', () => {
  hideError();
  updatePlayerCount();
  localStorage.setItem('tr_pro_players', inputArea.value);
});

function getPlayersList() {
  return inputArea.value
    .split('\n')
    .map(n => n.trim())
    .filter(n => n.length > 0);
}

function updatePlayerCount() {
  const count = getPlayersList().length;
  badge.textContent = `${count} ${count === 1 ? 'hráč' : count >= 2 && count <= 4 ? 'hráči' : 'hráčů'}`;
}

clearBtn.addEventListener('click', () => {
  playSound('click');
  hideError();
  inputArea.value = '';
  updatePlayerCount();
  localStorage.removeItem('tr_pro_players');
  resultsWrapper.classList.add('hidden');
});

generateBtn.addEventListener('click', () => {
  hideError();
  const players = getPlayersList();

  if (players.length < 2) {
    showError('Zadej alespoň 2 hráče pro úspěšné rozlosování!');
    return;
  }

  playSound('pop');

  const isCaptains = captainsCheck.checked;
  const mode = modeSelect.value;
  let totalTeams = 2;

  // Spolehlivý výpočet počtu týmů podle zvoleného režimu
  if (mode === 'pairs') {
    totalTeams = Math.max(2, Math.floor(players.length / 2));
  } else if (mode === 'trios') {
    totalTeams = Math.max(2, Math.floor(players.length / 3));
  } else if (mode === 'quads') {
    totalTeams = Math.max(2, Math.floor(players.length / 4));
  } else if (mode === 'teams') {
    totalTeams = parseInt(numberInput.value) || 2;
    if (totalTeams > players.length) {
      showError('Počet týmů nemůže být větší než počet hráčů!');
      return;
    }
  }

  // Zamíchání hráčů
  const shuffled = [...players];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Rozdělení do týmů
  const teams = Array.from({ length: totalTeams }, () => []);
  shuffled.forEach((player, index) => {
    teams[index % totalTeams].push(player);
  });

  generatedData = { teams, isCaptains };
  renderResults(teams, isCaptains);

  // Uložení do historie
  const now = new Date();
  const timeString = `${now.toLocaleDateString('cs-CZ')} ${now.toLocaleTimeString('cs-CZ', {hour: '2-digit', minute:'2-digit'})}`;
  
  let teamWord = 'týmů';
  if (teams.length === 1) teamWord = 'tým';
  else if (teams.length >= 2 && teams.length <= 4) teamWord = 'týmy';

  const historyItem = {
    id: Date.now(),
    title: `Rozlosování (${teams.length} ${teamWord})`,
    date: timeString,
    teams: teams,
    isCaptains: isCaptains
  };

  historyData.unshift(historyItem);
  if (historyData.length > 10) historyData.pop();
  localStorage.setItem('tr_pro_history', JSON.stringify(historyData));
  renderHistory();
  showToast('Uloženo do historie!');
});

function renderResults(teams, isCaptains) {
  resultsContainer.innerHTML = '';
  resultsWrapper.classList.remove('hidden');

  teams.forEach((team, tIndex) => {
    const card = document.createElement('div');
    card.className = 'team-card';

    let pWord = 'hráčů';
    if (team.length === 1) pWord = 'hráč';
    else if (team.length >= 2 && team.length <= 4) pWord = 'hráči';

    const title = document.createElement('div');
    title.className = 'team-title';
    title.innerHTML = `<span>Skupina ${tIndex + 1}</span> <span style="font-size: 0.8rem; color: #94a3b8;">${team.length} ${pWord}</span>`;

    const list = document.createElement('ul');
    list.className = 'player-list';

    team.forEach((player, pIndex) => {
      const li = document.createElement('li');
      li.className = 'player-item';
      const isCaptain = isCaptains && pIndex === 0;
      li.innerHTML = `
        <i class="fa-solid fa-user" style="color: ${isCaptain ? '#f59e0b' : '#38bdf8'}; font-size: 0.8rem;"></i> 
        ${player}
        ${isCaptain ? '<span class="captain-tag">Kapitán</span>' : ''}
      `;
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
    const div = document.createElement('div');
    div.className = 'history-item';
    div.innerHTML = `
      <div class="history-info" onclick="loadHistoryItem(${item.id})" title="Kliknutím obnovíš">
        <span class="history-title"><i class="fa-solid fa-list-check"></i> ${item.title}</span>
        <span class="history-date">${item.date}</span>
      </div>
      <div class="history-actions">
        <button class="btn btn-secondary btn-small" onclick="loadHistoryItem(${item.id})" title="Zobrazit"><i class="fa-solid fa-eye"></i></button>
        <button class="btn btn-danger btn-small" onclick="deleteHistoryItem(${item.id})" title="Smazat"><i class="fa-solid fa-xmark"></i></button>
      </div>
    `;
    historyList.appendChild(div);
  });
}

window.loadHistoryItem = function(id) {
  playSound('click');
  const item = historyData.find(h => h.id === id);
  if (item) {
    generatedData = { teams: item.teams, isCaptains: item.isCaptains };
    renderResults(item.teams, item.isCaptains);
    showToast('Načteno z historie!');
  }
};

window.deleteHistoryItem = function(id) {
  playSound('click');
  historyData = historyData.filter(h => h.id !== id);
  localStorage.setItem('tr_pro_history', JSON.stringify(historyData));
  renderHistory();
};

clearHistoryBtn.addEventListener('click', () => {
  playSound('click');
  historyData = [];
  localStorage.removeItem('tr_pro_history');
  renderHistory();
  showToast('Historie byla vymazána.');
});

copyBtn.addEventListener('click', () => {
  if (!generatedData.teams) return;
  playSound('click');

  let text = '⚡ Rozlosované skupiny:\n\n';
  generatedData.teams.forEach((team, idx) => {
    text += `*Skupina ${idx + 1}:*\n`;
    team.forEach((p, pIdx) => {
      const cap = generatedData.isCaptains && pIdx === 0 ? ' (Kapitán)' : '';
      text += `- ${p}${cap}\n`;
    });
    text += '\n';
  });

  navigator.clipboard.writeText(text).then(() => {
    showToast('Zkopírováno do schránky!');
  });
});