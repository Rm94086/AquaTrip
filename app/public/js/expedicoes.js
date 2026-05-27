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

(function () {

  "use strict";

  const filterBtns = document.querySelectorAll(".filter-btn");
  const starInputs = document.querySelectorAll("input[name='stars']");
  const priceSlider = document.getElementById("price-range");
  const priceOutput = document.querySelector(".price-output");
  const cardsGrid = document.getElementById("cards-grid");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const pageIndicator = document.getElementById("page-indicator");
  const noResults = document.getElementById("no-results");

  const CARDS_PER_PAGE = 3;

  let currentPage = 0;
  let activeFilter = "todos";
  let minStars = 0;
  let maxPrice = 20000;

  function getAllCards() {
    return Array.from(cardsGrid.querySelectorAll(".card-item"));
  }

  function getVisibleCards() {
    return getAllCards().filter(card => !card.dataset.hidden);
  }

  function formatBRL(value) {
    return "R$ " + Number(value).toLocaleString("pt-BR");
  }

  function applyFilters() {

    getAllCards().forEach(card => {

      const region = card.dataset.region;
      const stars = parseFloat(card.dataset.stars);
      const price = parseFloat(card.dataset.price);

      const show =
        (activeFilter === "todos" || region === activeFilter)
        && stars >= minStars
        && price <= maxPrice;

      if (show) {
        delete card.dataset.hidden;
      } else {
        card.dataset.hidden = "true";
      }

    });

    currentPage = 0;

    renderPage();
  }

  function renderPage() {

    const visible = getVisibleCards();

    const totalPages = Math.ceil(
      visible.length / CARDS_PER_PAGE
    );

    getAllCards().forEach(card => {
      card.style.display = "none";
    });

    const start = currentPage * CARDS_PER_PAGE;
    const end = start + CARDS_PER_PAGE;

    visible
      .slice(start, end)
      .forEach(card => {
        card.style.display = "";
      });

    noResults.hidden = visible.length > 0;

    pageIndicator.textContent =
      totalPages > 0
        ? `${currentPage + 1} / ${totalPages}`
        : "0 / 0";

    prevBtn.disabled = currentPage === 0;

    nextBtn.disabled =
      currentPage >= totalPages - 1;
  }

  filterBtns.forEach(btn => {

    btn.addEventListener("click", () => {

      filterBtns.forEach(b => {
        b.classList.remove("active");
      });

      btn.classList.add("active");

      activeFilter = btn.dataset.filter;

      applyFilters();

    });

  });

  starInputs.forEach(input => {

    input.addEventListener("change", () => {

      minStars = parseFloat(input.value);

      applyFilters();

    });

  });

  priceSlider.addEventListener("input", () => {

    maxPrice = parseFloat(priceSlider.value);

    priceOutput.textContent =
      priceSlider.value < 20000
        ? formatBRL(priceSlider.value)
        : "R$ 20.000+";

    applyFilters();

  });

  prevBtn.addEventListener("click", () => {

    if (currentPage > 0) {

      currentPage--;

      renderPage();

    }

  });

  nextBtn.addEventListener("click", () => {

    const totalPages = Math.ceil(
      getVisibleCards().length / CARDS_PER_PAGE
    );

    if (currentPage < totalPages - 1) {

      currentPage++;

      renderPage();

    }

  });

  renderPage();

})();