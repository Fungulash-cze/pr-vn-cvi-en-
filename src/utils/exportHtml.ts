import { FLASHCARDS, NUMERIC_DRILL_ITEMS, SEMAPHORE_DRILL_ITEMS, LEGAL_XRAY_DOCUMENTS, CATEGORIES } from '../data/legalData';

export const generateSingleFileHtml = (): string => {
  const dataPayload = {
    categories: CATEGORIES,
    flashcards: FLASHCARDS,
    numericDrills: NUMERIC_DRILL_ITEMS,
    semaphoreDrills: SEMAPHORE_DRILL_ITEMS,
    xrayDocs: LEGAL_XRAY_DOCUMENTS,
  };

  return `<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Zdravotnické právo – Kartotéka & Dril (Offline edice)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;0,6..72,700;1,6..72,400&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #F5F3EE;
      --card-bg: #FCFBF9;
      --ink: #161615;
      --ink-muted: #575653;
      --ink-subtle: #8C8A84;
      --border-ink: #161615;
      --tag-lzps: #1D4ED8;
      --tag-zzs: #0F766E;
      --tag-oz: #C2410C;
      --tag-tz: #9F1239;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg);
      color: var(--ink);
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      line-height: 1.5;
      padding-bottom: 70px;
    }
    .container { max-width: 1040px; margin: 0 auto; padding: 24px 20px; }
    header {
      border-bottom: 2px solid var(--border-ink);
      padding-bottom: 20px;
      margin-bottom: 24px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: flex-end;
      gap: 16px;
    }
    .brand-eyebrow {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: var(--ink-muted);
      font-weight: 700;
    }
    h1 {
      font-family: 'Newsreader', serif;
      font-size: 32px;
      font-weight: 700;
      line-height: 1.15;
      color: var(--ink);
    }
    .nav-tabs {
      display: flex;
      gap: 8px;
      border-bottom: 1.5px solid var(--border-ink);
      padding-bottom: 14px;
      margin-bottom: 24px;
      overflow-x: auto;
    }
    .tab-btn {
      background: var(--card-bg);
      border: 1.5px solid var(--border-ink);
      padding: 8px 18px;
      font-weight: 700;
      font-size: 13px;
      cursor: pointer;
      box-shadow: 2.5px 2.5px 0px var(--border-ink);
      transition: all 0.1s ease;
      white-space: nowrap;
    }
    .tab-btn:hover { transform: translate(-1px, -1px); box-shadow: 3.5px 3.5px 0px var(--border-ink); }
    .tab-btn.active {
      background: var(--ink);
      color: #FCFBF9;
      box-shadow: 2.5px 2.5px 0px #8C8A84;
    }
    .hard-card {
      background: var(--card-bg);
      border: 1.5px solid var(--border-ink);
      box-shadow: 4px 4px 0px var(--border-ink);
      padding: 24px;
    }
    .badge {
      display: inline-block;
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      padding: 3px 8px;
      border: 1px solid var(--border-ink);
    }
    .tag-lzps { background: #DBEAFE; color: #1E40AF; border-color: #1E40AF; }
    .tag-zzs { background: #CCFBF1; color: #0F766E; border-color: #0F766E; }
    .tag-oz { background: #FFEDD5; color: #C2410C; border-color: #C2410C; }
    .tag-tz { background: #FFE4E6; color: #9F1239; border-color: #9F1239; }
    .card-question {
      font-family: 'Newsreader', serif;
      font-size: 24px;
      font-weight: 600;
      margin: 18px 0;
      line-height: 1.3;
    }
    .clue-box {
      background: #FEF3C7;
      border: 1px dashed #B45309;
      padding: 12px 14px;
      font-size: 13.5px;
      margin-bottom: 20px;
    }
    .btn-action {
      background: #FFFFFF;
      border: 1.5px solid var(--border-ink);
      padding: 10px 18px;
      font-weight: 700;
      font-size: 13px;
      cursor: pointer;
      box-shadow: 2.5px 2.5px 0px var(--border-ink);
    }
    .btn-action:hover { transform: translate(-1px, -1px); box-shadow: 3.5px 3.5px 0px var(--border-ink); }
    .btn-action:active { transform: translate(1px, 1px); box-shadow: 1px 1px 0px var(--border-ink); }
    .legal-basis-box {
      font-family: 'JetBrains Mono', monospace;
      font-size: 12.5px;
      background: #F1F0EA;
      border: 1px solid var(--border-ink);
      padding: 12px 14px;
      margin: 16px 0;
    }
    .caution-box {
      background: #FFFBEB;
      border-left: 4px solid #D97706;
      border-top: 1px solid #FCD34D;
      border-right: 1px solid #FCD34D;
      border-bottom: 1px solid #FCD34D;
      padding: 14px;
      margin: 16px 0;
      font-size: 13.5px;
    }
    .rating-bar {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-top: 24px;
      padding-top: 20px;
      border-top: 1.5px dashed var(--border-ink);
    }
    .btn-rating {
      border: 1.5px solid var(--border-ink);
      padding: 12px;
      font-weight: 700;
      font-size: 13px;
      cursor: pointer;
      box-shadow: 2px 2px 0px var(--border-ink);
      text-align: center;
    }
    .btn-rating.red { background: #FEE2E2; color: #991B1B; }
    .btn-rating.orange { background: #FFEDD5; color: #9A3412; }
    .btn-rating.green { background: #DCFCE7; color: #166534; }
    .footer-help {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: var(--ink);
      color: #FCFBF9;
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      padding: 8px 16px;
      display: flex;
      justify-content: space-between;
      z-index: 100;
    }
    kbd {
      background: #2E2E2C;
      border: 1px solid #575653;
      padding: 2px 6px;
      border-radius: 2px;
      color: #FFF;
      font-weight: 700;
    }
    .filter-select {
      background: #FFFFFF;
      border: 1.5px solid var(--border-ink);
      padding: 6px 12px;
      font-family: inherit;
      font-size: 13px;
      font-weight: 600;
    }
    .xray-sentence {
      padding: 6px 8px;
      cursor: pointer;
      border-bottom: 1px solid rgba(22,22,21,0.1);
      transition: background 0.15s ease;
      line-height: 1.6;
    }
    .xray-sentence:hover {
      background: rgba(22,22,21,0.05);
    }
    .xray-sentence.sound {
      background: #E6F4EA;
      border-left: 3px solid #137333;
    }
    .xray-sentence.flaw {
      background: #FCE8E6;
      border-left: 3px solid #C5221F;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div>
        <h1>České zdravotnické právo</h1>
      </div>
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--ink-muted); text-align: right;">
        ZZS č. 372/2011 Sb. · OZ č. 89/2012 Sb.<br>Úmluva č. 96/2001 Sb. m. s. · TZ č. 40/2009 Sb.
      </div>
    </header>

    <div class="nav-tabs">
      <button class="tab-btn active" onclick="switchTab('flashcards')">1. Vzdělávací kartičky (27 kartiček)</button>
      <button class="tab-btn" onclick="switchTab('drill')">2. Rychlé procvičování (Lhůty & Semafor)</button>
      <button class="tab-btn" onclick="switchTab('xray')">3. Odhalování chyb (3 dokumenty)</button>
    </div>

    <!-- TAB 1: KARTOTEKA -->
    <div id="tab-flashcards">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 18px; flex-wrap:wrap; gap:10px;">
        <select id="catFilter" class="filter-select" onchange="filterCategory(this.value)">
          <option value="all">Všechny okruhy (27 kartiček)</option>
        </select>
        <div id="cardCounter" style="font-family:'JetBrains Mono',monospace; font-size:13px; font-weight:700;"></div>
      </div>

      <div class="hard-card" id="activeCardContainer">
        <!-- Rendered by JS -->
      </div>

      <div style="display:flex; justify-content:space-between; margin-top: 16px;">
        <button class="btn-action" onclick="prevCard()">← Předchozí (Šipka vlevo)</button>
        <button class="btn-action" onclick="flipCard()">Otočit kartu (Mezerník)</button>
        <button class="btn-action" onclick="nextCard()">Další (Šipka vpravo) →</button>
      </div>
    </div>

    <!-- TAB 2: DRILL -->
    <div id="tab-drill" style="display:none;">
      <div style="display:flex; gap:8px; margin-bottom: 20px;">
        <button class="tab-btn active" id="subtab-num-btn" onclick="switchDrillSub('num')">Číselná palba (Lhůty & věk)</button>
        <button class="tab-btn" id="subtab-sem-btn" onclick="switchDrillSub('sem')">Semafor mlčenlivosti</button>
      </div>

      <div id="drill-num-container" class="hard-card"></div>
      <div id="drill-sem-container" class="hard-card" style="display:none;"></div>
    </div>

    <!-- TAB 3: XRAY -->
    <div id="tab-xray" style="display:none;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 16px; flex-wrap:wrap; gap:10px;">
        <div style="display:flex; gap:8px;" id="xrayDocTabs"></div>
        <button class="btn-action" onclick="resetCurrentXRay()">Resetovat označení</button>
      </div>
      <div class="hard-card" id="xrayDocumentView"></div>
    </div>
  </div>

  <footer class="footer-help">
    <div>Klávesy: <kbd>Mezerník</kbd> Otočit · <kbd>H</kbd> Vodítko · <kbd>1</kbd> Neumím · <kbd>2</kbd> S dopomocí · <kbd>3</kbd> Zvládnuto · <kbd>←</kbd><kbd>→</kbd> Karty</div>
    <div>České zdravotnické právo 2026</div>
  </footer>

  <script>
    const APP_DATA = ${JSON.stringify(dataPayload)};
    let currentCardIndex = 0;
    let isFlipped = false;
    let showHint = false;
    let activeCategory = 'all';
    let filteredCards = [...APP_DATA.flashcards];

    let currentNumIndex = 0;
    let numScore = { correct: 0, total: 0 };
    let numAnswered = false;

    let currentSemIndex = 0;
    let semScore = { correct: 0, total: 0 };
    let semAnswered = false;

    let currentXRayDocIndex = 0;
    let xrayClicked = {};

    function init() {
      // populate category dropdown
      const sel = document.getElementById('catFilter');
      APP_DATA.categories.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.id;
        opt.textContent = c.id + '. ' + c.shortTitle;
        sel.appendChild(opt);
      });

      renderXRayTabs();
      renderCard();
      renderNumericDrill();
      renderSemaphoreDrill();
      renderXRay();
    }

    function switchTab(tab) {
      document.querySelectorAll('.nav-tabs .tab-btn').forEach(b => b.classList.remove('active'));
      document.getElementById('tab-flashcards').style.display = tab === 'flashcards' ? 'block' : 'none';
      document.getElementById('tab-drill').style.display = tab === 'drill' ? 'block' : 'none';
      document.getElementById('tab-xray').style.display = tab === 'xray' ? 'block' : 'none';
      event.target.classList.add('active');
    }

    function switchDrillSub(sub) {
      document.getElementById('subtab-num-btn').classList.toggle('active', sub === 'num');
      document.getElementById('subtab-sem-btn').classList.toggle('active', sub === 'sem');
      document.getElementById('drill-num-container').style.display = sub === 'num' ? 'block' : 'none';
      document.getElementById('drill-sem-container').style.display = sub === 'sem' ? 'block' : 'none';
    }

    function filterCategory(cat) {
      activeCategory = cat;
      if (cat === 'all') {
        filteredCards = [...APP_DATA.flashcards];
      } else {
        filteredCards = APP_DATA.flashcards.filter(c => c.categoryId == cat);
      }
      currentCardIndex = 0;
      isFlipped = false;
      showHint = false;
      renderCard();
    }

    function renderCard() {
      if (filteredCards.length === 0) return;
      const card = filteredCards[currentCardIndex];
      const counterEl = document.getElementById('cardCounter');
      counterEl.textContent = (currentCardIndex + 1) + ' / ' + filteredCards.length;

      const cont = document.getElementById('activeCardContainer');
      const tagClass = 'tag-' + card.lawTag.toLowerCase().replace('_', '');

      if (!isFlipped) {
        cont.innerHTML = \`
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <span class="badge \${tagClass}">\${card.lawTagName}</span>
            <span style="font-family:'JetBrains Mono',monospace; font-size:12px; font-weight:700;">\${card.code}</span>
          </div>
          <div style="font-size:12px; color:var(--ink-muted); text-transform:uppercase; font-weight:700; margin-bottom:6px;">
            Okruh \${card.categoryId}: \${card.categoryName}
          </div>
          <div class="card-question">\${card.question}</div>
          \${card.options && card.options.length ? \`
            <div style="margin: 14px 0; display:flex; flex-direction:column; gap:8px;">
              \${card.options.map(o => \`
                <div style="padding:10px 14px; border:1.5px solid var(--border-ink); background:#FFF; font-size:13.5px; display:flex; gap:10px; align-items:flex-start;">
                  <strong style="font-family:'JetBrains Mono',monospace; background:var(--ink); color:#FFF; padding:2px 7px; font-size:11px;">\${o.letter}</strong>
                  <span>\${o.text}</span>
                </div>
              \`).join('')}
            </div>
          \` : ''}
          \${showHint ? \`<div class="clue-box"><strong>Vodítko:</strong> \${card.clue}</div>\` : ''}
          <div style="display:flex; gap:10px; margin-top:20px;">
            <button class="btn-action" onclick="toggleHint()">\${showHint ? 'Skrýt vodítko (H)' : 'Zobrazit vodítko (H)'}</button>
            <button class="btn-action" style="background:var(--ink); color:#FFF;" onclick="flipCard()">Otočit kartu (Mezerník)</button>
          </div>
        \`;
      } else {
        cont.innerHTML = \`
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <span class="badge \${tagClass}">\${card.lawTagName}</span>
            <span style="font-family:'JetBrains Mono',monospace; font-size:12px; font-weight:700;">\${card.code} // RUB KARTY</span>
          </div>
          \${card.correctOption ? \`
            <div style="background:#DCFCE7; border:1.5px solid #166534; padding:10px 14px; margin-bottom:12px; font-size:13px; font-weight:700; color:#14532D; font-family:'JetBrains Mono',monospace;">
              SPRÁVNÁ VOLBA: [\${card.correctOption}] \${card.options ? (card.options.find(o => o.letter === card.correctOption) || {}).text || '' : ''}
            </div>
          \` : ''}
          <div style="font-weight:700; font-size:16px; margin-bottom:8px; line-height:1.4;">
            \${card.answer}
          </div>
          <div class="legal-basis-box">
            <strong>§ PRÁVNÍ OPORA:</strong> \${card.legalBasis}
          </div>
          <div class="caution-box">
            <strong>⚠️ PRAKTICKÝ CHYTÁK / JUDIKATURA:</strong><br>\${card.cautionOrCaseLaw}
          </div>
          <div class="rating-bar">
            <button class="btn-rating red" onclick="rateCard(1)">[1] Znovu (Neumím)</button>
            <button class="btn-rating orange" onclick="rateCard(2)">[2] S dopomocí (Váhal jsem)</button>
            <button class="btn-rating green" onclick="rateCard(3)">[3] Zvládnuto (Umím)</button>
          </div>
        \`;
      }
    }

    function flipCard() {
      isFlipped = !isFlipped;
      renderCard();
    }

    function toggleHint() {
      showHint = !showHint;
      renderCard();
    }

    function nextCard() {
      if (currentCardIndex < filteredCards.length - 1) {
        currentCardIndex++;
        isFlipped = false;
        showHint = false;
        renderCard();
      }
    }

    function prevCard() {
      if (currentCardIndex > 0) {
        currentCardIndex--;
        isFlipped = false;
        showHint = false;
        renderCard();
      }
    }

    function rateCard(rating) {
      nextCard();
    }

    // DRILL LOGIC
    function renderNumericDrill() {
      const q = APP_DATA.numericDrills[currentNumIndex];
      const cont = document.getElementById('drill-num-container');
      cont.innerHTML = \`
        <div style="display:flex; justify-content:space-between; margin-bottom:12px; font-family:'JetBrains Mono',monospace; font-size:12px;">
          <span>ČÍSELNÁ PALBA: Otázka \${currentNumIndex + 1} z \${APP_DATA.numericDrills.length}</span>
          <span>Skóre: \${numScore.correct} / \${numScore.total}</span>
        </div>
        <div class="card-question" style="font-size:20px;">\${q.question}</div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin: 16px 0;" id="numOptions">
          \${q.options.map(opt => \`
            <button class="btn-action" style="text-align:left; padding:14px;" onclick="answerNum('\${opt.replace(/'/g, "\\\\'")}')">
              \${opt}
            </button>
          \`).join('')}
        </div>
        <div id="numFeedback"></div>
      \`;
    }

    function answerNum(selected) {
      if (numAnswered) return;
      numAnswered = true;
      const q = APP_DATA.numericDrills[currentNumIndex];
      const isCorrect = selected === q.correctAnswer;
      numScore.total++;
      if (isCorrect) numScore.correct++;

      const fb = document.getElementById('numFeedback');
      fb.innerHTML = \`
        <div style="padding:14px; margin-top:14px; background:\${isCorrect ? '#DCFCE7' : '#FEE2E2'}; border:1.5px solid var(--border-ink);">
          <div style="font-weight:700; color:\${isCorrect ? '#166534' : '#991B1B'}">
            \${isCorrect ? '✓ SPRÁVNĚ!' : '✗ CHYBA! Správná odpověď: ' + q.correctAnswer}
          </div>
          <div style="margin-top:6px; font-size:13.5px;">\${q.explanation}</div>
          <div style="font-family:'JetBrains Mono',monospace; font-size:12px; margin-top:6px;"><strong>Opora:</strong> \${q.legalBasis}</div>
          <button class="btn-action" style="margin-top:12px; background:var(--ink); color:#FFF;" onclick="nextNumQuestion()">
            \${currentNumIndex < APP_DATA.numericDrills.length - 1 ? 'Další otázka →' : 'Vyhodnotit dril'}
          </button>
        </div>
      \`;
    }

    function nextNumQuestion() {
      numAnswered = false;
      if (currentNumIndex < APP_DATA.numericDrills.length - 1) {
        currentNumIndex++;
        renderNumericDrill();
      } else {
        document.getElementById('drill-num-container').innerHTML = \`
          <div style="text-align:center; padding:30px 20px;">
            <div class="brand-eyebrow">DRIL DOKONČEN</div>
            <h2 style="font-family:'Newsreader',serif; font-size:28px; margin:12px 0;">Úspěšnost: \${Math.round((numScore.correct / numScore.total)*100)}%</h2>
            <p>Zodpovězeno správně \${numScore.correct} z \${numScore.total} otázek.</p>
            <button class="btn-action" style="margin-top:16px; background:var(--ink); color:#FFF;" onclick="currentNumIndex=0;numScore={correct:0,total:0};renderNumericDrill();">Restartovat dril</button>
          </div>
        \`;
      }
    }

    function renderSemaphoreDrill() {
      const q = APP_DATA.semaphoreDrills[currentSemIndex];
      const cont = document.getElementById('drill-sem-container');
      cont.innerHTML = \`
        <div style="display:flex; justify-content:space-between; margin-bottom:12px; font-family:'JetBrains Mono',monospace; font-size:12px;">
          <span>SEMAFOR MLČENLIVOSTI: Situace \${currentSemIndex + 1} z \${APP_DATA.semaphoreDrills.length}</span>
          <span>Skóre: \${semScore.correct} / \${semScore.total}</span>
        </div>
        <div class="card-question" style="font-size:20px;">\${q.situation}</div>
        <div style="display:flex; gap:10px; margin: 16px 0; flex-wrap:wrap;" id="semOptions">
          \${q.options.map(opt => \`
            <button class="btn-action" style="flex:1; min-width:180px;" onclick="answerSem('\${opt}')">
              \${opt}
            </button>
          \`).join('')}
        </div>
        <div id="semFeedback"></div>
      \`;
    }

    function answerSem(selected) {
      if (semAnswered) return;
      semAnswered = true;
      const q = APP_DATA.semaphoreDrills[currentSemIndex];
      const isCorrect = selected === q.correctAction;
      semScore.total++;
      if (isCorrect) semScore.correct++;

      const fb = document.getElementById('semFeedback');
      fb.innerHTML = \`
        <div style="padding:14px; margin-top:14px; background:\${isCorrect ? '#DCFCE7' : '#FEE2E2'}; border:1.5px solid var(--border-ink);">
          <div style="font-weight:700; color:\${isCorrect ? '#166534' : '#991B1B'}">
            \${isCorrect ? '✓ SPRÁVNĚ ROZHODNUTO!' : '✗ CHYBA! Správné řešení: ' + q.correctAction}
          </div>
          <div style="margin-top:6px; font-size:13.5px;">\${q.explanation}</div>
          <div style="font-family:'JetBrains Mono',monospace; font-size:12px; margin-top:6px;"><strong>Opora:</strong> \${q.legalBasis}</div>
          <button class="btn-action" style="margin-top:12px; background:var(--ink); color:#FFF;" onclick="nextSemQuestion()">
            \${currentSemIndex < APP_DATA.semaphoreDrills.length - 1 ? 'Další situace →' : 'Vyhodnotit semafor'}
          </button>
        </div>
      \`;
    }

    function nextSemQuestion() {
      semAnswered = false;
      if (currentSemIndex < APP_DATA.semaphoreDrills.length - 1) {
        currentSemIndex++;
        renderSemaphoreDrill();
      } else {
        document.getElementById('drill-sem-container').innerHTML = \`
          <div style="text-align:center; padding:30px 20px;">
            <div class="brand-eyebrow">SEMAFOR DOKONČEN</div>
            <h2 style="font-family:'Newsreader',serif; font-size:28px; margin:12px 0;">Úspěšnost: \${Math.round((semScore.correct / semScore.total)*100)}%</h2>
            <p>Správně vyřešeno \${semScore.correct} ze \${semScore.total} situací mlčenlivosti.</p>
            <button class="btn-action" style="margin-top:16px; background:var(--ink); color:#FFF;" onclick="currentSemIndex=0;semScore={correct:0,total:0};renderSemaphoreDrill();">Restartovat semafor</button>
          </div>
        \`;
      }
    }

    // XRAY LOGIC
    function renderXRayTabs() {
      const cont = document.getElementById('xrayDocTabs');
      cont.innerHTML = APP_DATA.xrayDocs.map((doc, i) => \`
        <button class="tab-btn \${i === currentXRayDocIndex ? 'active' : ''}" onclick="selectXRayDoc(\${i})">
          Dokument \${i + 1}: \${doc.title}
        </button>
      \`).join('');
    }

    function selectXRayDoc(index) {
      currentXRayDocIndex = index;
      renderXRayTabs();
      renderXRay();
    }

    function renderXRay() {
      const doc = APP_DATA.xrayDocs[currentXRayDocIndex];
      const cont = document.getElementById('xrayDocumentView');
      const clickedSet = xrayClicked[doc.id] || {};
      const foundFlaws = Object.keys(clickedSet).filter(id => {
        const s = doc.sentences.find(item => item.id === id);
        return s && s.isError;
      }).length;

      cont.innerHTML = \`
        <div style="border-bottom:1.5px solid var(--border-ink); padding-bottom:12px; margin-bottom:16px; display:flex; justify-content:space-between; align-items:flex-start;">
          <div>
            <div class="brand-eyebrow">\${doc.documentType} // \${doc.metaInfo.protocolNo}</div>
            <h2 style="font-family:'Newsreader',serif; font-size:22px; font-weight:700;">\${doc.title}</h2>
            <div style="font-size:12px; color:var(--ink-muted);">\${doc.metaInfo.institution} · \${doc.metaInfo.date}</div>
          </div>
          <div style="font-family:'JetBrains Mono',monospace; font-size:13px; font-weight:700; background:\${foundFlaws === doc.totalErrors ? '#DCFCE7' : '#FEF3C7'}; padding:6px 12px; border:1px solid var(--border-ink);">
            Odhaleno vad: \${foundFlaws} / \${doc.totalErrors}
          </div>
        </div>

        <p style="font-size:13px; color:var(--ink-muted); margin-bottom:16px;">
          <em>Instrukce: Klikněte na jednotlivé věty v textu níže, které podle Vás obsahují právní vadu či rozpor se zákonem.</em>
        </p>

        <div style="background:#FFFFFF; border:1.5px solid var(--border-ink); padding:20px;">
          \${doc.sentences.map(s => {
            const isSelected = clickedSet[s.id];
            let cls = '';
            if (isSelected) {
              cls = s.isError ? 'flaw' : 'sound';
            }
            return \`
              <div class="xray-sentence \${cls}" onclick="toggleSentence('\${s.id}')">
                \${isSelected ? (s.isError ? '⚠️ [VADA] ' : '✓ [V POŘÁDKU] ') : ''}
                \${s.text}
              </div>
            \`;
          }).join('')}
        </div>

        <div style="margin-top:20px;">
          <h3 style="font-family:'Newsreader',serif; font-size:18px; margin-bottom:10px;">Protokol právní analýzy:</h3>
          <div id="xrayFeedbackList">
            \${Object.keys(clickedSet).map(id => {
              const s = doc.sentences.find(item => item.id === id);
              if (!s) return '';
              return \`
                <div style="padding:10px 14px; margin-bottom:8px; border:1px solid var(--border-ink); background:\${s.isError ? '#FFFBEB' : '#F1F0EA'};">
                  <strong>\${s.isError ? '⚠️ PRÁVNÍ VADA:' : '✓ SOUHLAS SE ZÁKONEM:'}</strong> \${s.explanation}
                </div>
              \`;
            }).join('') || '<div style="font-size:13px; color:var(--ink-muted);">Zatím jste neoznačili žádnou větu v dokumentu.</div>'}
          </div>
        </div>
      \`;
    }

    function toggleSentence(id) {
      const doc = APP_DATA.xrayDocs[currentXRayDocIndex];
      if (!xrayClicked[doc.id]) xrayClicked[doc.id] = {};
      xrayClicked[doc.id][id] = true;
      renderXRay();
    }

    function resetCurrentXRay() {
      const doc = APP_DATA.xrayDocs[currentXRayDocIndex];
      if (xrayClicked[doc.id]) {
        delete xrayClicked[doc.id];
      }
      renderXRay();
    }

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (document.getElementById('tab-flashcards').style.display !== 'none') {
        if (e.code === 'Space') {
          e.preventDefault();
          flipCard();
        } else if (e.key === 'h' || e.key === 'H') {
          toggleHint();
        } else if (e.key === 'ArrowRight') {
          nextCard();
        } else if (e.key === 'ArrowLeft') {
          prevCard();
        } else if (e.key === '1') {
          rateCard(1);
        } else if (e.key === '2') {
          rateCard(2);
        } else if (e.key === '3') {
          rateCard(3);
        }
      }
    });

    init();
  </script>
</body>
</html>`;
};

export const downloadOfflineHtmlFile = (): void => {
  const htmlContent = generateSingleFileHtml();
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'zdravotnicke_pravo_kartoteka.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
