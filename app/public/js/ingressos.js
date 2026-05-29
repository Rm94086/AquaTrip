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

/**
 * @returns {string} HTML string
 */
function barcodeHTML() {
  return '<figure class="barcode" aria-hidden="true">' +
    BAR_WIDTHS.map(w => {
      const h = 14 + Math.floor(Math.random() * 8);
      return `<b style="width:${w}px;height:${h}px"></b>`;
    }).join('') +
    '</figure>';
}

/**
 * Returns the badge HTML for a given status.
 * @param {'valido'|'used'|'exp'} status
 * @returns {string} HTML string
 */
function badgeHTML(status) {
  const map = {
    valido: ['badge--valid', 'ti-check',        'Válido'],
    used:   ['badge--used',  'ti-circle-check',  'Utilizado'],
    exp:    ['badge--exp',   'ti-clock',         'A confirmar'],
  };
  const [cls, icon, label] = map[status] ?? map.exp;
  return `<mark class="badge ${cls}"><i class="ti ${icon}" aria-hidden="true"></i>${label}</mark>`;
}

/**
 * @param {object} t - ticket data
 * @returns {string} HTML string
 */
function ticketHTML(t) {
  const panelMod = t.type === 'expedicao' ? ' ticket-panel--exp' : '';
  const dots = Array(5).fill('<span class="ticket-panel__dot"></span>').join('');

  return `
<article class="ticket" data-type="${t.type}" data-status="${t.status}">
  <aside class="ticket-panel${panelMod}">
    <i class="ti ${t.icon} ticket-panel__icon" aria-hidden="true"></i>
    <span class="ticket-panel__pill">${t.tag}</span>
    <span class="ticket-panel__dots" aria-hidden="true">${dots}</span>
    <span class="ticket-panel__notch" aria-hidden="true"></span>
  </aside>

  <span class="ticket-divider" aria-hidden="true"></span>

  <section class="ticket-body">
    <header class="ticket-header">
      <hgroup>
        <strong class="ticket-title">${t.title}</strong>
        <span class="ticket-sub">${t.sub}</span>
      </hgroup>
      ${badgeHTML(t.status)}
    </header>

    <ul class="ticket-meta">
      <li><i class="ti ti-calendar" aria-hidden="true"></i><time datetime="${t.date}">${t.date}</time></li>
      <li><i class="ti ti-clock" aria-hidden="true"></i><time>${t.time}</time></li>
      <li><i class="ti ti-map-pin" aria-hidden="true"></i><address>${t.place}</address></li>
    </ul>

    <footer class="ticket-footer">
      ${barcodeHTML()}
      <span class="ticket-code">${t.code}</span>
    </footer>
  </section>
</article>`;
}

/**
 * @param {object[]} items
 */
function render(items) {
  const el = document.getElementById('list');
  if (!items.length) {
    el.innerHTML = '<p class="empty">Nenhum ingresso encontrado.</p>';
    return;
  }
  el.innerHTML = items.map(ticketHTML).join('');
}

/**
 * Filters tickets and updates active tab.
 * @param {'todos'|'aquario'|'expedicao'|'valido'} key
 * @param {HTMLButtonElement} btn
 */
function filter(key, btn) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  const filtered = key === 'todos'      ? TICKETS
    : key === 'valido'                  ? TICKETS.filter(t => t.status === 'valido')
    : TICKETS.filter(t => t.type === key);

  render(filtered);
}
/** @type {Array<{type:string, icon:string, tag:string, title:string, sub:string, date:string, time:string, place:string, code:string, status:string}>} */
const TICKETS = [
  {
    type: 'aquario',
    tag: 'Aquário',
    title: 'Aquário de Santos',
    sub: 'Visita completa · 1 adulto',
    date: '14 jun 2026',
    time: '10:00',
    place: 'Santos, SP',
    code: 'AQS-8821',
    status: 'valido',
  },
  {
    type: 'expedicao',
    tag: 'Expedição',
    title: 'Mergulho na Ilha Anchieta',
    sub: 'Expedição subaquática · 2 pessoas',
    date: '22 jun 2026',
    time: '08:30',
    place: 'Ubatuba, SP',
    code: 'EXP-3310',
    status: 'valido',
  },
  {
    type: 'expedicao',
    tag: 'Expedição',
    title: 'Observação de Baleias',
    sub: 'Expedição náutica · 1 adulto',
    date: '10 ago 2026',
    time: '06:00',
    place: 'Abrolhos, BA',
    code: 'OBJ-5509',
    status: 'valido',
  },
  {
    type: 'aquario',
    tag: 'Aquário',
    title: 'AquaRio — Rio de Janeiro',
    sub: 'Visita + túnel subaquático · 1 adulto',
    date: '05 mai 2025',
    time: '14:00',
    place: 'Rio de Janeiro, RJ',
    code: 'ARJ-0047',
    status: 'used',
  },
  {
    type: 'expedicao',
    tag: 'Expedição',
    title: 'Passeio de Escuna — Búzios',
    sub: 'Tour costeiro ao pôr do sol · 2 pessoas',
    date: '06 mai 2025',
    time: '17:00',
    place: 'Búzios, RJ',
    code: 'ESC-7743',
    status: 'used',
  },
];

const BAR_WIDTHS = [4,2,3,1,4,2,5,1,3,4,2,3,1,2,4,3,2,1,3,2];

render(TICKETS);