/* ══════════════════════════════════════
   AQUATRIP — script.js
   ══════════════════════════════════════ */


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
    btn.onclick = () => { grid.scrollTo({ left: i * visible() * CARD_W, behavior: 'smooth' }); syncDots(); };
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
  grid.scrollTo({ left: grid.scrollLeft + dir * visible() * CARD_W, behavior: 'smooth' });
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