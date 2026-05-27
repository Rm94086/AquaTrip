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