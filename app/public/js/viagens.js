function loadTrips() {
  try {
    const raw = localStorage.getItem('aquatrip_v2');
    return raw ? JSON.parse(raw) : DEFAULTS;
  } catch (e) {
    return DEFAULTS;
  }
}

function daysBetween(a, b) {
  return Math.max(1, Math.round((new Date(b) - new Date(a)) / 86400000));
}

function formatDate(d) {
  return new Date(d + 'T12:00:00').toLocaleDateString('pt-BR', {
    month: 'short',
    year: 'numeric',
  });
}

function renderStars(n) {
  return Array.from({ length: 5 }, (_, i) => {
    const color = i < n ? '#06b6d4' : 'rgba(207,250,254,0.2)';
    return `<span class="at-star" style="color:${color}">★</span>`;
  }).join('');
}

function render() {
  const trips = loadTrips();
  const sorted = [...trips].sort((a, b) => new Date(b.start) - new Date(a.start));

  const byYear = {};
  sorted.forEach((t) => {
    const y = t.start.slice(0, 4);
    if (!byYear[y]) byYear[y] = [];
    byYear[y].push(t);
  });

  const timeline = document.getElementById('at-timeline');
  timeline.innerHTML = '';

  const years = Object.keys(byYear).sort((a, b) => b - a);

  if (!years.length) {
    timeline.innerHTML = '<section class="at-empty">Nenhuma viagem encontrada.</section>';
    return;
  }

  years.forEach((y) => {
    const group = document.createElement('section');
    group.className = 'at-year-group';
    group.innerHTML = `<section class="at-year-label">${y}</section><section class="at-cards" id="c-${y}"></section>`;
    timeline.appendChild(group);

    const grid = group.querySelector('.at-cards');

    byYear[y].forEach((t) => {
      const d = daysBetween(t.start, t.end);
      const card = document.createElement('section');
      card.className = 'at-card';
      card.innerHTML = `
        <section class="at-card-visual" style="background:${BG_COLORS[t.bg || 0]}">${t.img || ''}</section>
        <section class="at-card-body">
          <section class="at-card-row">
            <section>
              <section class="at-card-city">${t.city}</section>
              <section class="at-card-country">${t.country}</section>
            </section>
            <section class="at-card-date">${formatDate(t.start)}</section>
          </section>
          <section class="at-card-desc">${t.desc}</section>
          <section class="at-card-tags">
            ${(t.tags || []).map((tag) => `<span class="at-tag">${tag}</span>`).join('')}
          </section>
        </section>
        <section class="at-card-footer">
          <section class="at-stars">${renderStars(t.rating)}</section>
          <section class="at-dur">${d} dia${d !== 1 ? 's' : ''}</section>
        </section>`;
      grid.appendChild(card);
    });
  });

  const totalDias = trips.reduce((s, t) => s + daysBetween(t.start, t.end), 0);
  const paises = new Set(trips.map((t) => t.country)).size;

  document.getElementById('s-v').textContent = trips.length;
  document.getElementById('s-p').textContent = paises;
  document.getElementById('s-d').textContent = totalDias;
  document.getElementById('at-subtitle').textContent =
    `${trips.length} destino${trips.length !== 1 ? 's' : ''} · ${paises} país${paises !== 1 ? 'es' : ''}`;
}
const BG_COLORS = [
  'rgba(8,145,178,0.18)',
  'rgba(6,182,212,0.15)',
  'rgba(4,59,92,0.6)',
  'rgba(2,13,26,0.7)',
  'rgba(207,250,254,0.08)',
];

const DEFAULTS = [
  {
    id: 1,
    city: 'Lisboa',
    country: 'Portugal',
    start: '2026-03-10',
    end: '2026-03-17',
    rating: 5,
    bg: 0,
  },
  {
    id: 2,
    city: 'Buenos Aires',
    country: 'Argentina',
    start: '2026-07-01',
    end: '2026-07-10',
    rating: 5,
    bg: 1,
  },
  {
    id: 3,
    city: 'Tóquio',
    country: 'Japão',
    start: '2026-04-03',
    end: '2026-04-14',
    rating: 5,
    bg: 2,
  },
 
];

document.addEventListener('DOMContentLoaded', render);