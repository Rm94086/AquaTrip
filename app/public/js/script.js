/* ══════════════════════════════════════
   AQUATRIP — script.js
   ══════════════════════════════════════ */

/* ── BOLHAS ── */
const bubbleContainer = document.getElementById('bubbles');
for (let i = 0; i < 18; i++) {
  const b = document.createElement('b');
  const size = Math.random() * 60 + 20;
  b.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*100}%;animation-duration:${Math.random()*20+15}s;animation-delay:${Math.random()*20}s`;
  bubbleContainer.appendChild(b);
}

/* ══════════════════════════════════════
   CARROSSEL — DESTINOS
   ══════════════════════════════════════ */
const grid   = document.getElementById('cardsGrid');
const dotsEl = document.getElementById('carouselDots');
const CARD_W = 280 + 24;
const total  = grid.children.length;
const visible  = () => Math.floor(grid.clientWidth / CARD_W) || 1;
const numDots  = () => Math.ceil(total / visible());

function buildDots() {
  dotsEl.innerHTML = '';
  for (let i = 0; i < numDots(); i++) {
    const btn = document.createElement('button');
    btn.setAttribute('aria-label', `Slide ${i + 1}`);
    if (i === 0) btn.classList.add('active');
    btn.onclick = () => { grid.scrollLeft = i * visible() * CARD_W; syncDots(); };
    dotsEl.appendChild(btn);
  }
}

function syncDots() {
  const idx = Math.round(grid.scrollLeft / (visible() * CARD_W));
  [...dotsEl.children].forEach((d, i) => d.classList.toggle('active', i === idx));
  document.getElementById('arrowLeft').disabled  = grid.scrollLeft <= 0;
  document.getElementById('arrowRight').disabled = grid.scrollLeft >= grid.scrollWidth - grid.clientWidth - 4;
}

function scrollCards(dir) {
  grid.scrollLeft += dir * visible() * CARD_W;
  setTimeout(syncDots, 320);
}

grid.addEventListener('scroll', syncDots);
window.addEventListener('resize', () => { buildDots(); syncDots(); });
buildDots();
syncDots();

/* drag-to-scroll — destinos */
let down = false, sx, ss;
grid.addEventListener('mousedown', e => { down = true; sx = e.pageX; ss = grid.scrollLeft; grid.classList.add('dragging'); });
document.addEventListener('mouseup',   () => { down = false; grid.classList.remove('dragging'); setTimeout(syncDots, 50); });
document.addEventListener('mousemove', e => { if (!down) return; e.preventDefault(); grid.scrollLeft = ss - (e.pageX - sx); });

/* ══════════════════════════════════════
   CARROSSEL — EXPEDIÇÕES
   ══════════════════════════════════════ */
const expGrid   = document.getElementById('expGrid');
const expDotsEl = document.getElementById('expDots');
const EXP_W     = () => { const li = expGrid.querySelector('li'); return li ? li.offsetWidth + 24 : 384; };
const expTotal  = expGrid.children.length;
const expVisible = () => Math.floor(expGrid.clientWidth / EXP_W()) || 1;
const expNumDots = () => Math.ceil(expTotal / expVisible());

function buildExpDots() {
  expDotsEl.innerHTML = '';
  for (let i = 0; i < expNumDots(); i++) {
    const btn = document.createElement('button');
    btn.setAttribute('aria-label', `Slide ${i + 1}`);
    if (i === 0) btn.classList.add('active');
    btn.onclick = () => { expGrid.scrollLeft = i * expVisible() * EXP_W(); syncExpDots(); };
    expDotsEl.appendChild(btn);
  }
}

function syncExpDots() {
  const idx = Math.round(expGrid.scrollLeft / EXP_W());
  [...expDotsEl.children].forEach((d, i) => d.classList.toggle('active', i === idx));
  document.getElementById('expArrowLeft').disabled  = expGrid.scrollLeft <= 0;
  document.getElementById('expArrowRight').disabled = expGrid.scrollLeft >= expGrid.scrollWidth - expGrid.clientWidth - 4;
}

function scrollExp(dir) {
  expGrid.scrollLeft += dir * EXP_W();
  setTimeout(syncExpDots, 320);
}

expGrid.addEventListener('scroll', syncExpDots);
window.addEventListener('resize', () => { buildExpDots(); syncExpDots(); });
buildExpDots();
syncExpDots();

/* drag-to-scroll — expedições */
let expDown = false, expSx, expSs;
expGrid.addEventListener('mousedown', e => { expDown = true; expSx = e.pageX; expSs = expGrid.scrollLeft; expGrid.classList.add('dragging'); });
document.addEventListener('mouseup',   () => { expDown = false; expGrid.classList.remove('dragging'); setTimeout(syncExpDots, 50); });
document.addEventListener('mousemove', e => { if (!expDown) return; e.preventDefault(); expGrid.scrollLeft = expSs - (e.pageX - expSx); });

/* ══════════════════════════════════════
   DRAWER
   ══════════════════════════════════════ */
function toggleDrawer() {
  const d = document.getElementById('drawer');
  const h = document.getElementById('hamburger');
  const open = d.classList.toggle('open');
  h.classList.toggle('active', open);
  h.setAttribute('aria-expanded', open);
  d.setAttribute('aria-hidden', !open);
}

function closeDrawer() {
  const d = document.getElementById('drawer');
  const h = document.getElementById('hamburger');
  d.classList.remove('open');
  h.classList.remove('active');
  h.setAttribute('aria-expanded', 'false');
  d.setAttribute('aria-hidden', 'true');
}

document.addEventListener('click', e => {
  if (!e.target.closest('#drawer') && !e.target.closest('#hamburger')) closeDrawer();
});

/* ══════════════════════════════════════
   MODAL
   ══════════════════════════════════════ */
const dlg = document.getElementById('modal');

function openModal(tab) {
  dlg.showModal();
  switchTab(tab || 'login');
}

function closeModal() {
  dlg.close();
}

dlg.addEventListener('click', e => {
  if (e.target === dlg) dlg.close();
});

function switchTab(tab) {
  const isLogin = tab === 'login';
  document.getElementById('loginForm').hidden  = !isLogin;
  document.getElementById('signupForm').hidden =  isLogin;
  document.getElementById('tabLogin').className  = isLogin  ? 'active' : '';
  document.getElementById('tabSignup').className = !isLogin ? 'active' : '';
  document.getElementById('modalTitle').textContent = isLogin
    ? 'Bem-vindo de volta'
    : 'Crie sua conta';
  document.getElementById('modalSub').textContent = isLogin
    ? 'Entre para continuar sua jornada aquática'
    : 'Junte-se a 180 mil exploradores';
}
