/* ==============================================
   AquaWorld — Lógica de Filtros e Carrossel
   ============================================== */

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

///////////////////////////
(function () {
  "use strict";

  // ── Seletores ──────────────────────────────────
  const filterBtns     = document.querySelectorAll(".filter-btn");
  const starInputs     = document.querySelectorAll("input[name='stars']");
  const priceSlider    = document.getElementById("price-range");
  const priceOutput    = document.querySelector(".price-output");
  const cardsGrid      = document.getElementById("cards-grid");
  const prevBtn        = document.getElementById("prev-btn");
  const nextBtn        = document.getElementById("next-btn");
  const pageIndicator  = document.getElementById("page-indicator");
  const noResults      = document.getElementById("no-results");
  const featuredCard   = document.querySelector(".card-featured");

  // ── Estado ─────────────────────────────────────
  const CARDS_PER_PAGE = 3;
  let currentPage  = 0;
  let activeFilter = "todos";
  let minStars     = 0;
  let maxPrice     = 10000;

  // ── Helpers ────────────────────────────────────
  function formatBRL(value) {
    return "R$ " + Number(value).toLocaleString("pt-BR");
  }

  function getAllCards() {
    return Array.from(cardsGrid.querySelectorAll(".card-item"));
  }

  function getVisibleCards() {
    return getAllCards().filter(card => !card.dataset.hidden);
  }

  // ── Filtros ────────────────────────────────────
  function applyFilters() {
    const allCards = getAllCards();

    // Filtra card destacado também
    if (featuredCard) {
      const region = featuredCard.dataset.region;
      const stars  = parseFloat(featuredCard.dataset.stars);
      const price  = parseFloat(featuredCard.dataset.price);
      const show   = (activeFilter === "todos" || region === activeFilter)
                     && stars  >= minStars
                     && price  <= maxPrice;
      featuredCard.style.display = show ? "" : "none";
    }

    // Filtra cards do grid
    allCards.forEach(card => {
      const region = card.dataset.region;
      const stars  = parseFloat(card.dataset.stars);
      const price  = parseFloat(card.dataset.price);
      const show   = (activeFilter === "todos" || region === activeFilter)
                     && stars  >= minStars
                     && price  <= maxPrice;

      if (show) {
        delete card.dataset.hidden;
      } else {
        card.dataset.hidden = "true";
      }
    });

    currentPage = 0;
    renderPage();
  }

  // ── Paginação / Carrossel ──────────────────────
  function renderPage() {
    const visible = getVisibleCards();
    const totalPages = Math.ceil(visible.length / CARDS_PER_PAGE);

    // Anima saída
    cardsGrid.classList.add("animating");

    setTimeout(() => {
      // Oculta todos
      getAllCards().forEach(c => { c.style.display = "none"; });

      // Exibe apenas a página corrente dos visíveis
      const start = currentPage * CARDS_PER_PAGE;
      const end   = start + CARDS_PER_PAGE;
      const pageCards = visible.slice(start, end);

      pageCards.forEach(c => { c.style.display = ""; });

      // Sem resultados
      const hasResults = pageCards.length > 0;
      noResults.hidden = hasResults;
      cardsGrid.style.display = hasResults ? "" : "none";

      // Indicador de página
      pageIndicator.textContent = totalPages > 0
        ? `${currentPage + 1} / ${totalPages}`
        : "0 / 0";

      // Setas
      prevBtn.disabled = currentPage === 0;
      nextBtn.disabled = currentPage >= totalPages - 1;

      // Anima entrada
      cardsGrid.classList.remove("animating");
    }, 200);
  }

  // ── Event Listeners ────────────────────────────

  // Filtros de região
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.dataset.filter;
      applyFilters();
    });
  });

  // Filtro de estrelas
  starInputs.forEach(input => {
    input.addEventListener("change", () => {
      minStars = parseFloat(input.value);
      applyFilters();
    });
  });

  // Filtro de preço
  priceSlider.addEventListener("input", () => {
    maxPrice = parseFloat(priceSlider.value);
    priceOutput.textContent = priceSlider.value < 10000
      ? formatBRL(priceSlider.value)
      : "R$ 10.000+";
    applyFilters();
  });

  // Navegação carrossel
  prevBtn.addEventListener("click", () => {
    if (currentPage > 0) {
      currentPage--;
      renderPage();
    }
  });

  nextBtn.addEventListener("click", () => {
    const totalPages = Math.ceil(getVisibleCards().length / CARDS_PER_PAGE);
    if (currentPage < totalPages - 1) {
      currentPage++;
      renderPage();
    }
  });

  // Swipe em telas touch
  let touchStartX = 0;

  cardsGrid.addEventListener("touchstart", e => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  cardsGrid.addEventListener("touchend", e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextBtn.click();
      else prevBtn.click();
    }
  }, { passive: true });

  // ── Init ───────────────────────────────────────
  renderPage();

})();