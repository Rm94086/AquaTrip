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
      const card = document.createElement('a');
      card.className = 'at-card';
      card.href = t.link || '#';
      card.setAttribute('aria-label', `Ver experiência: ${t.city}`);
      card.innerHTML = `
        <section class="at-card-visual" style="background:${BG_COLORS[t.bg || 0]}">${t.img || ''}</section>
        <section class="at-card-body">
          <section class="at-card-row">
            <section>
              <section class="at-card-city">${t.city}</section>
              <section class="at-card-country">${t.state}</section>
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
  const estados = new Set(trips.map((t) => t.state)).size;

  document.getElementById('s-v').textContent = trips.length;
  document.getElementById('s-p').textContent = estados;
  document.getElementById('s-d').textContent = totalDias;
  document.getElementById('at-subtitle').textContent =
    `${trips.length} destino${trips.length !== 1 ? 's' : ''} · ${estados} estado${estados !== 1 ? 's' : ''}`;
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
    city: 'Aquário de Santos',
    state: 'São Paulo',
    start: '2026-03-10',
    end: '2026-03-10',
    rating: 5,
    bg: 0,
    desc: 'Visita guiada aos tanques oceânicos e ao túnel submerso do Aquário de Santos.',
    tags: ['Aquário', 'Família'],
    link: '/produto_churaumi',
  },
  {
    id: 2,
    city: 'Fernando de Noronha',
    state: 'Pernambuco',
    start: '2026-07-01',
    end: '2026-07-08',
    rating: 5,
    bg: 1,
    desc: 'Praias premiadas, águas cristalinas e mergulho entre recifes preservados.',
    tags: ['Praia', 'Mergulho'],
    link: '/praias',
  },
  {
    id: 3,
    city: 'Arraial do Cabo',
    state: 'Rio de Janeiro',
    start: '2026-04-03',
    end: '2026-04-06',
    rating: 5,
    bg: 2,
    desc: 'Batismo de mergulho em uma das águas mais claras do litoral fluminense.',
    tags: ['Mergulho', 'Litoral'],
    link: '/mergulho',
  },
  {
    id: 4,
    city: 'Ilhabela',
    state: 'São Paulo',
    start: '2026-05-15',
    end: '2026-05-17',
    rating: 4,
    bg: 3,
    desc: 'Remada por enseadas protegidas e praias de água calma no litoral norte paulista.',
    tags: ['Caiaque', 'Natureza'],
    link: '/caiaque',
  },
];

document.addEventListener('DOMContentLoaded', render);