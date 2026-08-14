(function () {
  "use strict";

  /* =========================================================
     DADOS (mock) — em produção viriam de uma API
     ========================================================= */

  const CATEGORIAS = {
    praia:   { label: "Praia",             icon: iconPraia() },
    pesca:   { label: "Pesca esportiva",   icon: iconPesca() },
    caiaque: { label: "Caiaque",           icon: iconCaiaque() },
    aquario: { label: "Aquário",           icon: iconAquario() },
    scuba:   { label: "Mergulho / scuba",  icon: iconScuba() },
  };

  let experiencias = [
    { id: "exp-01", titulo: "Trilha de snorkel em Porto de Galinhas", categoria: "scuba", criador: "Renata Farias", local: "Porto de Galinhas, PE", preco: "R$ 180", status: "ativa", metaAlvo: 200, metaAtual: 236, descricao: "Passeio guiado de snorkel entre piscinas naturais e recifes de corais, com equipamento incluso." },
    { id: "exp-02", titulo: "Pesca de tucunaré no Rio Negro", categoria: "pesca", criador: "Diego Martins", local: "Manaus, AM", preco: "R$ 420", status: "ativa", metaAlvo: 40, metaAtual: 31, descricao: "Dia inteiro de pesca esportiva com barco, isca e guia especializado na região amazônica." },
    { id: "exp-03", titulo: "Caiaque ao pôr do sol em Ilhabela", categoria: "caiaque", criador: "Juliana Prado", local: "Ilhabela, SP", preco: "R$ 95", status: "ativa", metaAlvo: 60, metaAtual: 60, descricao: "Remada guiada por enseadas tranquilas com parada para observar o pôr do sol na Baía de Castelhanos." },
    { id: "exp-04", titulo: "Visita guiada ao Aquário de Ubatuba", categoria: "aquario", criador: "Marcelo Souza", local: "Ubatuba, SP", preco: "R$ 60", status: "suspensa", metaAlvo: 150, metaAtual: 74, descricao: "Tour com biólogo marinho explicando os ecossistemas representados em cada tanque." },
    { id: "exp-05", titulo: "Dia de praia e boia em Jericoacoara", categoria: "praia", criador: "Aline Costa", local: "Jericoacoara, CE", preco: "R$ 70", status: "ativa", metaAlvo: 100, metaAtual: 118, descricao: "Roteiro de praia com paradas nas dunas, lagoas e pôr do sol na Pedra Furada." },
    { id: "exp-06", titulo: "Batismo de mergulho em Fernando de Noronha", categoria: "scuba", criador: "Renata Farias", local: "Fernando de Noronha, PE", preco: "R$ 650", status: "ativa", metaAlvo: 30, metaAtual: 12, descricao: "Primeira experiência de mergulho autônomo com instrutor certificado PADI." },
    { id: "exp-07", titulo: "Caiaque nos manguezais de Cananéia", categoria: "caiaque", criador: "Bruno Lima", local: "Cananéia, SP", preco: "R$ 85", status: "desativada", metaAlvo: 50, metaAtual: 9, descricao: "Remada tranquila pelos canais de manguezal com observação de aves." },
    { id: "exp-08", titulo: "Pesca oceânica em alto-mar", categoria: "pesca", criador: "Diego Martins", local: "Cabo Frio, RJ", preco: "R$ 890", status: "ativa", metaAlvo: 20, metaAtual: 20, descricao: "Saída de barco para pesca de dourado e atum com toda a estrutura a bordo." },
    { id: "exp-09", titulo: "Aquário interativo com raias", categoria: "aquario", criador: "Marcelo Souza", local: "Guarujá, SP", preco: "R$ 55", status: "ativa", metaAlvo: 120, metaAtual: 45, descricao: "Contato guiado com raias e peixes-boi em tanque de imersão." },
    { id: "exp-10", titulo: "Praia deserta de barco em Angra", categoria: "praia", criador: "Aline Costa", local: "Angra dos Reis, RJ", preco: "R$ 210", status: "suspensa", metaAlvo: 80, metaAtual: 80, descricao: "Passeio de escuna até praias isoladas do arquipélago da Ilha Grande." },
    { id: "exp-11", titulo: "Mergulho em naufrágio histórico", categoria: "scuba", criador: "Bruno Lima", local: "Arraial do Cabo, RJ", preco: "R$ 540", status: "ativa", metaAlvo: 25, metaAtual: 33, descricao: "Mergulho técnico guiado ao naufrágio do Navio Ipiranga, para mergulhadores certificados." },
    { id: "exp-12", titulo: "Caiaque em cavernas de Bonito", categoria: "caiaque", criador: "Juliana Prado", local: "Bonito, MS", preco: "R$ 130", status: "ativa", metaAlvo: 45, metaAtual: 18, descricao: "Roteiro de caiaque por rios de água cristalina com paradas em grutas." },
  ];

  let usuarios = [
    { id: "usr-01", nome: "Camila Torres", email: "camila.torres@mail.com", telefone: "(11) 98221-4470", status: "ativo", suspensoAte: null },
    { id: "usr-02", nome: "Pedro Nogueira", email: "p.nogueira@mail.com", telefone: "(21) 97654-1123", status: "ativo", suspensoAte: null },
    { id: "usr-03", nome: "Larissa Ferreira", email: "larissa.f@mail.com", telefone: "(85) 99887-2201", status: "suspenso", suspensoAte: "2026-08-20" },
    { id: "usr-04", nome: "Thiago Almeida", email: "thiago.almeida@mail.com", telefone: "(11) 91234-5678", status: "ativo", suspensoAte: null },
    { id: "usr-05", nome: "Beatriz Rocha", email: "beatriz.rocha@mail.com", telefone: "(13) 99456-7788", status: "ativo", suspensoAte: null },
    { id: "usr-06", nome: "Gustavo Melo", email: "gustavo.melo@mail.com", telefone: "(27) 98811-2233", status: "banido", suspensoAte: null },
    { id: "usr-07", nome: "Fernanda Lima", email: "fer.lima@mail.com", telefone: "(48) 99223-4411", status: "ativo", suspensoAte: null },
    { id: "usr-08", nome: "Rafael Costa", email: "rafael.costa@mail.com", telefone: "(19) 98765-0099", status: "ativo", suspensoAte: null },
    { id: "usr-09", nome: "Vanessa Souza", email: "vanessa.souza@mail.com", telefone: "(41) 99012-3344", status: "ativo", suspensoAte: null },
    { id: "usr-10", nome: "Otávio Ramos", email: "otavio.ramos@mail.com", telefone: "(31) 98456-7710", status: "suspenso", suspensoAte: "2026-08-15" },
    { id: "usr-11", nome: "Isabela Martins", email: "isabela.martins@mail.com", telefone: "(51) 99887-6655", status: "ativo", suspensoAte: null },
    { id: "usr-12", nome: "Henrique Dias", email: "henrique.dias@mail.com", telefone: "(71) 98123-4567", status: "ativo", suspensoAte: null },
  ];

  let faturamento = [
    { data: "2026-07-02", expId: "exp-01", cliente: "Camila Torres", valor: 180, taxa: 18, status: "pago" },
    { data: "2026-07-01", expId: "exp-05", cliente: "Larissa Ferreira", valor: 70, taxa: 7, status: "pago" },
    { data: "2026-06-30", expId: "exp-03", cliente: "Thiago Almeida", valor: 95, taxa: 9.5, status: "pago" },
    { data: "2026-06-29", expId: "exp-08", cliente: "Rafael Costa", valor: 890, taxa: 89, status: "pago" },
    { data: "2026-06-27", expId: "exp-11", cliente: "Vanessa Souza", valor: 540, taxa: 54, status: "pendente" },
    { data: "2026-06-25", expId: "exp-06", cliente: "Gustavo Melo", valor: 650, taxa: 65, status: "pendente" },
    { data: "2026-06-20", expId: "exp-09", cliente: "Fernanda Lima", valor: 55, taxa: 5.5, status: "pago" },
    { data: "2026-06-18", expId: "exp-04", cliente: "Isabela Martins", valor: 60, taxa: 6, status: "reembolsado" },
    { data: "2026-06-15", expId: "exp-02", cliente: "Otávio Ramos", valor: 420, taxa: 42, status: "pago" },
    { data: "2026-06-10", expId: "exp-12", cliente: "Henrique Dias", valor: 130, taxa: 13, status: "pago" },
  ];

  /* =========================================================
     ÍCONES (SVG inline)
     ========================================================= */
  function iconPraia(){ return '<svg viewBox="0 0 24 24"><path d="M4 20c4-1 12-1 16 0M9 20c0-6 3-11 8-13" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/><circle cx="17" cy="6" r="2.4" stroke="currentColor" stroke-width="1.8" fill="none"/></svg>'; }
  function iconPesca(){ return '<svg viewBox="0 0 24 24"><path d="M3 12c4-3 14-3 18 0-4 3-14 3-18 0z" stroke="currentColor" stroke-width="1.8" fill="none"/><circle cx="6.5" cy="12" r=".9" fill="currentColor"/><path d="M21 12s-1.5-2-1.5 0 1.5 2 1.5 2" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>'; }
  function iconCaiaque(){ return '<svg viewBox="0 0 24 24"><path d="M2 15l7-9 13 13-7 3z" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/><path d="M3 6l4 4M17 20l4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'; }
  function iconAquario(){ return '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="13" rx="1.5" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M8 20h8M12 18v2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M9 11c1.4-1 3.6-1 5 0" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>'; }
  function iconScuba(){ return '<svg viewBox="0 0 24 24"><circle cx="12" cy="9" r="5" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M9 9h6M12 14v6M8 22c0-1.5 1-2 4-2s4 .5 4 2" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>'; }
  function iconOlho(){ return '<svg viewBox="0 0 24 24"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8" fill="none"/></svg>'; }
  function iconPausa(){ return '<svg viewBox="0 0 24 24"><rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor"/><rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor"/></svg>'; }
  function iconOff(){ return '<svg viewBox="0 0 24 24"><path d="M12 4v7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M7 6.5a7 7 0 1 0 10 0" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/></svg>'; }
  function iconPlay(){ return '<svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 9 9" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M21 3v6h-6" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'; }
  function iconBan(){ return '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M5.6 5.6l12.8 12.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'; }

  /* =========================================================
     HELPERS
     ========================================================= */
  const brl = (n) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const dataBr = (iso) => new Date(iso + "T00:00:00").toLocaleDateString("pt-BR");
  const norm = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const dataFutura = (dias) => {
    const d = new Date();
    d.setDate(d.getDate() + dias);
    return d.toISOString().slice(0, 10);
  };

  function metaEstado(atual, alvo) {
    const pct = alvo > 0 ? (atual / alvo) * 100 : 0;
    if (pct >= 100.001) return "ultrapassada";
    if (pct >= 100) return "batida";
    return "progresso";
  }

  function buildTideGauge(exp) {
    const pct = exp.metaAlvo > 0 ? (exp.metaAtual / exp.metaAlvo) * 100 : 0;
    const estado = metaEstado(exp.metaAtual, exp.metaAlvo);
    const muted = exp.status !== "ativa";
    const scaleMax = 130; // escala visual: 100% da meta fica a ~77% da barra
    const unit = 200 / scaleMax;
    const baseVal = Math.min(pct, 100);
    const overVal = pct > 100 ? Math.min(pct, scaleMax) - 100 : 0;
    const baseW = baseVal * unit;
    const overW = overVal * unit;
    const tickX = 100 * unit;

    const gradBase = muted ? "url(#gaugeGradMuted)" : "url(#gaugeGradTeal)";
    const gradOver = muted ? "url(#gaugeGradMuted)" : "url(#gaugeGradGold)";

    const label = estado === "progresso" ? "Em progresso" : estado === "batida" ? "Meta batida" : "Meta ultrapassada";

    return `
      <figure class="tide-gauge" data-state="${estado}">
        <meter class="sr-only" min="0" max="${exp.metaAlvo}" value="${exp.metaAtual}" optimum="${exp.metaAlvo}">${Math.round(pct)}%</meter>
        <svg class="tide-gauge__visual" viewBox="0 0 200 34" aria-hidden="true">
          <rect class="tide-gauge__track" x="1" y="5" width="198" height="24" rx="12"/>
          <clipPath id="clip-${exp.id}"><rect x="1" y="5" width="198" height="24" rx="12"/></clipPath>
          <g clip-path="url(#clip-${exp.id})">
            <rect class="tide-gauge__fill-base" style="fill:${gradBase}" x="1" y="5" width="${Math.max(baseW,0)}" height="24"/>
            <rect class="tide-gauge__fill-over" style="fill:${gradOver}" x="${1+baseW}" y="5" width="${Math.max(overW,0)}" height="24"/>
            ${muted ? "" : `<rect class="tide-gauge__shine" x="${Math.max(baseW+overW-14,0)}" y="5" width="10" height="24"/>`}
          </g>
          <line class="tide-gauge__tick" x1="${tickX}" x2="${tickX}" y1="2" y2="32"/>
        </svg>
        <figcaption>
          <b class="tide-gauge__label">${label}</b>
          <strong>${Math.round(pct)}% · ${exp.metaAtual}/${exp.metaAlvo}</strong>
        </figcaption>
      </figure>
    `;
  }

  /* =========================================================
     NAVEGAÇÃO ENTRE PAINÉIS
     ========================================================= */
  const navLinks = document.querySelectorAll(".side-nav__link");
  const panels = document.querySelectorAll(".panel");
  const sideNav = document.getElementById("mainNav");
  const navOverlay = document.getElementById("navOverlay");
  const menuToggle = document.getElementById("menuToggle");

  function goToPanel(target) {
    panels.forEach((p) => p.classList.toggle("is-active", p.id === target));
    navLinks.forEach((l) => l.classList.toggle("is-active", l.dataset.target === target));
    closeNav();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => goToPanel(link.dataset.target));
  });

  function openNav() {
    sideNav.classList.add("is-open");
    navOverlay.classList.add("is-visible");
    menuToggle.setAttribute("aria-expanded", "true");
  }
  function closeNav() {
    sideNav.classList.remove("is-open");
    navOverlay.classList.remove("is-visible");
    menuToggle.setAttribute("aria-expanded", "false");
  }
  menuToggle.addEventListener("click", () => {
    sideNav.classList.contains("is-open") ? closeNav() : openNav();
  });
  navOverlay.addEventListener("click", closeNav);

  /* =========================================================
     EXPERIÊNCIAS — render + filtros + ações
     ========================================================= */
  const listaExperiencias = document.getElementById("listaExperiencias");
  const experienciasVazio = document.getElementById("experienciasVazio");
  const buscaExperiencias = document.getElementById("buscaExperiencias");
  const filtroCategoria = document.getElementById("filtroCategoria");
  const filtroStatus = document.getElementById("filtroStatus");
  const filtroMeta = document.getElementById("filtroMeta");

  function statusBadge(status) {
    const map = { ativa: "Ativa", suspensa: "Suspensa", desativada: "Desativada" };
    return `<mark class="status-badge status-badge--${status}">${map[status]}</mark>`;
  }

  function actionsFor(exp) {
    const botoes = [
      `<button type="button" class="btn btn--primary" data-action="ver" data-id="${exp.id}">${iconOlho()} Ver página</button>`
    ];

    if (exp.status === "ativa") {
      botoes.push(`<button type="button" class="btn btn--warn" data-action="suspender" data-id="${exp.id}">${iconPausa()} Suspender</button>`);
      botoes.push(`<button type="button" class="btn btn--danger" data-action="desativar" data-id="${exp.id}">${iconOff()} Desativar</button>`);
    } else if (exp.status === "suspensa") {
      botoes.push(`<button type="button" class="btn btn--primary" data-action="ativar" data-id="${exp.id}">${iconPlay()} Ativar</button>`);
      botoes.push(`<button type="button" class="btn btn--danger" data-action="desativar" data-id="${exp.id}">${iconOff()} Desativar</button>`);
    }
    // desativada: nenhuma ação além de "Ver página" — estado final

    return botoes.join("");
  }

  function renderExperiencias() {
    const termo = norm(buscaExperiencias.value.trim());
    const categoria = filtroCategoria.value;
    const status = filtroStatus.value;
    const meta = filtroMeta.value;

    const filtradas = experiencias.filter((exp) => {
      const combinaTermo = !termo ||
        norm(exp.titulo).includes(termo) ||
        norm(exp.criador).includes(termo) ||
        norm(exp.local).includes(termo);
      const combinaCategoria = categoria === "todas" || exp.categoria === categoria;
      const combinaStatus = status === "todos" || exp.status === status;
      const combinaMeta = meta === "todas" || metaEstado(exp.metaAtual, exp.metaAlvo) === meta;
      return combinaTermo && combinaCategoria && combinaStatus && combinaMeta;
    });

    listaExperiencias.innerHTML = filtradas.map((exp) => `
      <li>
        <article class="exp-card ${exp.status === "desativada" ? "exp-card--desativada" : ""}" data-id="${exp.id}">
          <header class="exp-card__head">
            <p class="exp-card__category">${CATEGORIAS[exp.categoria].icon} ${CATEGORIAS[exp.categoria].label}</p>
            ${statusBadge(exp.status)}
          </header>
          <h2 class="exp-card__title">${exp.titulo}</h2>
          <p class="exp-card__meta">Por <strong>${exp.criador}</strong> · ${exp.local}</p>
          ${buildTideGauge(exp)}
          <footer class="exp-card__actions">${actionsFor(exp)}</footer>
        </article>
      </li>
    `).join("");

    experienciasVazio.hidden = filtradas.length !== 0;
    atualizarEstatisticasExperiencias();
  }

  function atualizarEstatisticasExperiencias() {
    document.getElementById("statAtivas").textContent = experiencias.filter(e => e.status === "ativa").length;
    document.getElementById("statBatidas").textContent = experiencias.filter(e => {
      const s = metaEstado(e.metaAtual, e.metaAlvo);
      return s === "batida" || s === "ultrapassada";
    }).length;
    document.getElementById("statSuspensas").textContent = experiencias.filter(e => e.status === "suspensa").length;
  }

  [buscaExperiencias].forEach(el => el.addEventListener("input", renderExperiencias));
  [filtroCategoria, filtroStatus, filtroMeta].forEach(el => el.addEventListener("change", renderExperiencias));
  document.getElementById("formExperiencias").addEventListener("submit", (e) => e.preventDefault());

  /* =========================================================
     MODAL DE CONFIRMAÇÃO ("tem certeza?")
     ========================================================= */
  const confirmModal = document.getElementById("confirmModal");
  const confirmTitle = document.getElementById("confirmTitle");
  const confirmMessage = document.getElementById("confirmMessage");
  const confirmAccept = document.getElementById("confirmAccept");
  const confirmCancel = document.getElementById("confirmCancel");
  const confirmDuracaoWrap = document.getElementById("confirmDuracaoWrap");
  const confirmDuracao = document.getElementById("confirmDuracao");
  let pendingConfirm = null;

  function askConfirm({ titulo, mensagem, rotuloConfirmar, classeConfirmar, mostrarDuracao, onConfirm }) {
    confirmTitle.textContent = titulo;
    confirmMessage.textContent = mensagem;
    confirmAccept.textContent = rotuloConfirmar;
    confirmAccept.className = `btn ${classeConfirmar}`;
    confirmDuracaoWrap.hidden = !mostrarDuracao;
    if (mostrarDuracao) confirmDuracao.value = "7";
    pendingConfirm = onConfirm;
    confirmModal.showModal();
  }

  confirmCancel.addEventListener("click", () => { pendingConfirm = null; confirmModal.close(); });
  confirmAccept.addEventListener("click", () => {
    if (pendingConfirm) pendingConfirm(confirmDuracaoWrap.hidden ? null : confirmDuracao.value);
    pendingConfirm = null;
    confirmModal.close();
  });
  confirmModal.addEventListener("click", (e) => {
    const rect = confirmModal.getBoundingClientRect();
    const dentro = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
    if (!dentro) { pendingConfirm = null; confirmModal.close(); }
  });

  listaExperiencias.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;
    const exp = experiencias.find((x) => x.id === btn.dataset.id);
    if (!exp) return;

    if (btn.dataset.action === "ver") {
      // Ainda sem ação: este botão vai futuramente levar à página da experiência.
    } else if (btn.dataset.action === "suspender") {
      askConfirm({
        titulo: "Suspender experiência",
        mensagem: `Tem certeza que deseja suspender "${exp.titulo}"? Ela para de aparecer para novos interessados até ser ativada novamente.`,
        rotuloConfirmar: "Suspender",
        classeConfirmar: "btn--warn",
        onConfirm: () => { exp.status = "suspensa"; renderExperiencias(); }
      });
    } else if (btn.dataset.action === "desativar") {
      askConfirm({
        titulo: "Desativar experiência",
        mensagem: `Tem certeza que deseja desativar "${exp.titulo}"? Essa ação remove a experiência da plataforma.`,
        rotuloConfirmar: "Desativar",
        classeConfirmar: "btn--danger",
        onConfirm: () => { exp.status = "desativada"; renderExperiencias(); }
      });
    } else if (btn.dataset.action === "ativar") {
      exp.status = "ativa";
      renderExperiencias();
    }
  });

  /* =========================================================
     USUÁRIOS — render + filtros + ações (suspender / banir)
     ========================================================= */
  const corpoUsuarios = document.getElementById("corpoUsuarios");
  const usuariosVazio = document.getElementById("usuariosVazio");
  const buscaUsuarios = document.getElementById("buscaUsuarios");
  const filtroStatusUsuarios = document.getElementById("filtroStatusUsuarios");

  function statusBadgeUsuario(status) {
    const map = { ativo: "Ativo", suspenso: "Suspenso", banido: "Banido" };
    return `<mark class="user-badge user-badge--${status}">${map[status]}</mark>`;
  }

  function acoesUsuario(usuario) {
    const botoes = [];
    if (usuario.status === "ativo") {
      botoes.push(`<button type="button" class="btn btn--warn" data-action="suspender" data-id="${usuario.id}">${iconPausa()} Suspender</button>`);
      botoes.push(`<button type="button" class="btn btn--danger" data-action="banir" data-id="${usuario.id}">${iconBan()} Banir</button>`);
    } else if (usuario.status === "suspenso") {
      botoes.push(`<button type="button" class="btn btn--primary" data-action="reativar" data-id="${usuario.id}">${iconPlay()} Reativar</button>`);
      botoes.push(`<button type="button" class="btn btn--danger" data-action="banir" data-id="${usuario.id}">${iconBan()} Banir</button>`);
    } else if (usuario.status === "banido") {
      botoes.push(`<button type="button" class="btn btn--primary" data-action="reativar" data-id="${usuario.id}">${iconPlay()} Reativar</button>`);
    }
    return botoes.join("");
  }

  function renderUsuarios() {
    const termo = norm(buscaUsuarios.value.trim());
    const status = filtroStatusUsuarios.value;

    const filtrados = usuarios.filter((usuario) => {
      const combinaTermo = !termo ||
        norm(usuario.nome).includes(termo) ||
        norm(usuario.email).includes(termo) ||
        norm(usuario.telefone).includes(termo);
      const combinaStatus = status === "todos" || usuario.status === status;
      return combinaTermo && combinaStatus;
    });

    corpoUsuarios.innerHTML = filtrados.map((usuario) => `
      <tr>
        <td data-col="nome">${usuario.nome}</td>
        <td data-col="email">${usuario.email}</td>
        <td data-col="telefone">${usuario.telefone}</td>
        <td data-col="status">
          ${statusBadgeUsuario(usuario.status)}
          ${usuario.status === "suspenso" && usuario.suspensoAte ? `<small class="user-status-note">até ${dataBr(usuario.suspensoAte)}</small>` : ""}
        </td>
        <td data-col="acoes"><span class="table-actions">${acoesUsuario(usuario)}</span></td>
      </tr>
    `).join("");

    usuariosVazio.hidden = filtrados.length !== 0;

    document.getElementById("statTotalUsuarios").textContent = usuarios.length;
    document.getElementById("statSuspensos").textContent = usuarios.filter(u => u.status === "suspenso").length;
    document.getElementById("statBanidos").textContent = usuarios.filter(u => u.status === "banido").length;
  }

  [buscaUsuarios].forEach(el => el.addEventListener("input", renderUsuarios));
  [filtroStatusUsuarios].forEach(el => el.addEventListener("change", renderUsuarios));
  document.getElementById("formUsuarios").addEventListener("submit", (e) => e.preventDefault());

  corpoUsuarios.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;
    const usuario = usuarios.find((u) => u.id === btn.dataset.id);
    if (!usuario) return;

    if (btn.dataset.action === "suspender") {
      askConfirm({
        titulo: "Suspender usuário",
        mensagem: `Tem certeza que deseja suspender ${usuario.nome}? A conta ficará bloqueada durante o período escolhido abaixo.`,
        rotuloConfirmar: "Suspender",
        classeConfirmar: "btn--warn",
        mostrarDuracao: true,
        onConfirm: (duracaoDias) => {
          usuario.status = "suspenso";
          usuario.suspensoAte = duracaoDias === "0" ? null : dataFutura(Number(duracaoDias));
          renderUsuarios();
        }
      });
    } else if (btn.dataset.action === "banir") {
      askConfirm({
        titulo: "Banir usuário",
        mensagem: `Tem certeza que deseja banir ${usuario.nome} permanentemente? Essa ação bloqueia o acesso dele à plataforma.`,
        rotuloConfirmar: "Banir",
        classeConfirmar: "btn--danger",
        onConfirm: () => {
          usuario.status = "banido";
          usuario.suspensoAte = null;
          renderUsuarios();
        }
      });
    } else if (btn.dataset.action === "reativar") {
      askConfirm({
        titulo: "Reativar usuário",
        mensagem: `Tem certeza que deseja reativar o acesso de ${usuario.nome} à plataforma?`,
        rotuloConfirmar: "Reativar",
        classeConfirmar: "btn--primary",
        onConfirm: () => {
          usuario.status = "ativo";
          usuario.suspensoAte = null;
          renderUsuarios();
        }
      });
    }
  });

  /* =========================================================
     FATURAMENTO — render + filtros
     ========================================================= */
  const corpoFaturamento = document.getElementById("corpoFaturamento");
  const faturamentoVazio = document.getElementById("faturamentoVazio");
  const buscaFaturamento = document.getElementById("buscaFaturamento");
  const filtroStatusPagamento = document.getElementById("filtroStatusPagamento");
  const filtroPeriodo = document.getElementById("filtroPeriodo");

  function dentroDoPeriodo(dataIso, dias) {
    if (dias === "todos") return true;
    const hoje = new Date("2026-07-05T00:00:00");
    const data = new Date(dataIso + "T00:00:00");
    const diff = (hoje - data) / (1000 * 60 * 60 * 24);
    return diff <= Number(dias);
  }

  function renderFaturamento() {
    const termo = norm(buscaFaturamento.value.trim());
    const status = filtroStatusPagamento.value;
    const periodo = filtroPeriodo.value;

    const filtrados = faturamento.filter((t) => {
      const exp = experiencias.find(e => e.id === t.expId);
      const combinaTermo = !termo ||
        (exp && norm(exp.titulo).includes(termo)) ||
        norm(t.cliente).includes(termo);
      const combinaStatus = status === "todos" || t.status === status;
      const combinaPeriodo = dentroDoPeriodo(t.data, periodo);
      return combinaTermo && combinaStatus && combinaPeriodo;
    });

    corpoFaturamento.innerHTML = filtrados.map((t) => {
      const exp = experiencias.find(e => e.id === t.expId);
      const pillMap = { pago: "Pago", pendente: "Pendente", reembolsado: "Reembolsado" };
      return `
        <tr>
          <td data-col="data">${dataBr(t.data)}</td>
          <td data-col="experiencia">${exp ? exp.titulo : "—"}</td>
          <td data-col="cliente">${t.cliente}</td>
          <td data-col="valor">${brl(t.valor)}</td>
          <td data-col="taxa">${brl(t.taxa)}</td>
          <td data-col="status"><mark class="pill pill--${t.status}">${pillMap[t.status]}</mark></td>
        </tr>
      `;
    }).join("");

    faturamentoVazio.hidden = filtrados.length !== 0;
    atualizarResumoFaturamento(filtrados);
  }

  function atualizarResumoFaturamento(lista) {
    const somaOnde = (status) => lista.filter(t => t.status === status).reduce((acc, t) => acc + t.valor, 0);
    const taxaOnde = (status) => lista.filter(t => t.status === status).reduce((acc, t) => acc + t.taxa, 0);

    document.getElementById("billTotalRecebido").textContent = brl(somaOnde("pago"));
    document.getElementById("billTotalPendente").textContent = brl(somaOnde("pendente"));
    document.getElementById("billTotalReembolso").textContent = brl(somaOnde("reembolsado"));
    document.getElementById("billTotalTaxa").textContent = brl(taxaOnde("pago"));
  }

  [buscaFaturamento].forEach(el => el.addEventListener("input", renderFaturamento));
  [filtroStatusPagamento, filtroPeriodo].forEach(el => el.addEventListener("change", renderFaturamento));
  document.getElementById("formFaturamento").addEventListener("submit", (e) => e.preventDefault());

  /* =========================================================
     INICIALIZAÇÃO
     ========================================================= */
  renderExperiencias();
  renderUsuarios();
  renderFaturamento();
})();
