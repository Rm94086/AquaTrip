/* AquaTrip — interações da Home */

const grid = document.getElementById('cardsGrid');
const dotsEl = document.getElementById('carouselDots');
const arrowLeft = document.getElementById('arrowLeft');
const arrowRight = document.getElementById('arrowRight');
const profileTrigger = document.getElementById('profileTrigger');
const profileDropdown = document.getElementById('profileDropdown');

/* CARROSSEL */
function getStep() {
  const firstCard = grid?.querySelector('li:not([hidden])');
  if (!firstCard) return 0;
  return firstCard.getBoundingClientRect().width + 24;
}

function getVisible() {
  const step = getStep();
  return step ? Math.max(1, Math.floor(grid.clientWidth / step)) : 1;
}

function buildDots() {
  if (!grid || !dotsEl) return;
  const visible = getVisible();
  const cards = [...grid.children].filter(card => !card.hidden);
  const count = Math.max(1, Math.ceil(cards.length / visible));
  dotsEl.innerHTML = '';

  for (let i = 0; i < count; i++) {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', `Slide ${i + 1}`);
    button.addEventListener('click', () => {
      grid.scrollTo({ left: i * visible * getStep(), behavior: 'smooth' });
    });
    dotsEl.appendChild(button);
  }
}

function syncDots() {
  if (!grid || !dotsEl) return;
  const step = getStep();
  const visible = getVisible();
  const index = step ? Math.round(grid.scrollLeft / (visible * step)) : 0;

  [...dotsEl.children].forEach((dot, i) => dot.classList.toggle('active', i === index));
  if (arrowLeft) arrowLeft.disabled = grid.scrollLeft <= 4;
  if (arrowRight) arrowRight.disabled = grid.scrollLeft >= grid.scrollWidth - grid.clientWidth - 4;
}

function scrollCards(direction) {
  if (!grid) return;
  grid.scrollBy({ left: direction * getVisible() * getStep(), behavior: 'smooth' });
  window.setTimeout(syncDots, 350);
}

window.scrollCards = scrollCards;

grid?.addEventListener('scroll', syncDots);
window.addEventListener('resize', () => {
  buildDots();
  syncDots();
});

/* FILTROS DE DESCUBRA / EM DESTAQUE */
const filterChips = [...document.querySelectorAll('.filter-chip')];
const discoverLinks = [...document.querySelectorAll('.discover-card[data-filter]')];

function applyFilter(filter) {
  if (!grid) return;

  [...grid.children].forEach(card => {
    const categories = (card.dataset.category || '').split(' ');
    card.hidden = filter !== 'todos' && !categories.includes(filter);
  });

  filterChips.forEach(chip => chip.classList.toggle('active', chip.dataset.filter === filter));
  grid.scrollTo({ left: 0, behavior: 'smooth' });
  buildDots();
  syncDots();
}

filterChips.forEach(chip => {
  chip.addEventListener('click', () => applyFilter(chip.dataset.filter));
});

discoverLinks.forEach(link => {
  link.addEventListener('click', () => {
    const filter = link.dataset.filter;
    if (!filter) return;
    applyFilter(filter);
  });
});

/* ARRASTAR O CARROSSEL NO DESKTOP */
let dragging = false;
let startX = 0;
let startScroll = 0;

grid?.addEventListener('mousedown', event => {
  if (event.target.closest('a, button')) return;
  dragging = true;
  startX = event.pageX;
  startScroll = grid.scrollLeft;
  grid.classList.add('dragging');
});

document.addEventListener('mouseup', () => {
  dragging = false;
  grid?.classList.remove('dragging');
  window.setTimeout(syncDots, 50);
});

document.addEventListener('mousemove', event => {
  if (!dragging || !grid) return;
  event.preventDefault();
  grid.scrollLeft = startScroll - (event.pageX - startX);
});

/* PERFIL */
function closeProfile() {
  if (!profileDropdown || !profileTrigger) return;
  profileDropdown.hidden = true;
  profileTrigger.setAttribute('aria-expanded', 'false');
}

profileTrigger?.addEventListener('click', event => {
  event.stopPropagation();
  const isOpen = !profileDropdown.hidden;
  profileDropdown.hidden = isOpen;
  profileTrigger.setAttribute('aria-expanded', String(!isOpen));
});

document.addEventListener('click', event => {
  if (!event.target.closest('.profile-menu')) closeProfile();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeProfile();
});

buildDots();
syncDots();
