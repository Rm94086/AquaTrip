/* ==============================================
   AquaWorld — Página de Produto
   ============================================== */

////////////////////////////////////////////////////////

(function () {
  "use strict";

  /* ── Galeria ──────────────────────────────── */
  const fotoPrincipal = document.getElementById("foto-principal");
  const thumbBtns     = document.querySelectorAll(".thumb-btn");
  const btnExpand     = document.getElementById("btn-expand");

  // Dados das fotos (src full + alt)
  const fotos = Array.from(thumbBtns).map(btn => ({
    src: btn.dataset.src,
    alt: btn.dataset.alt,
  }));
  let fotoAtual = 0;

  function setFoto(index) {
    fotoAtual = index;

    // Troca a imagem principal com fade
    fotoPrincipal.classList.add("fade-out");
    setTimeout(() => {
      fotoPrincipal.src = fotos[index].src;
      fotoPrincipal.alt = fotos[index].alt;
      fotoPrincipal.classList.remove("fade-out");
    }, 180);

    // Atualiza thumbs
    thumbBtns.forEach((btn, i) => {
      btn.classList.toggle("active", i === index);
      btn.setAttribute("aria-pressed", String(i === index));
    });
  }

  thumbBtns.forEach((btn, i) => {
    btn.addEventListener("click", () => setFoto(i));
  });

  /* ── Lightbox ─────────────────────────────── */
  const lightbox     = document.getElementById("lightbox");
  const lightboxImg  = document.getElementById("lightbox-img");
  const lightboxClose= document.getElementById("lightbox-close");
  const lbPrev       = document.getElementById("lb-prev");
  const lbNext       = document.getElementById("lb-next");

  function abrirLightbox(index) {
    fotoAtual = index;
    lightboxImg.src = fotos[index].src;
    lightboxImg.alt = fotos[index].alt;
    lightbox.showModal ? lightbox.showModal() : lightbox.setAttribute("open", "");
    document.body.style.overflow = "hidden";
  }

  function fecharLightbox() {
    lightbox.close ? lightbox.close() : lightbox.removeAttribute("open");
    document.body.style.overflow = "";
  }

  function lightboxNav(dir) {
    fotoAtual = (fotoAtual + dir + fotos.length) % fotos.length;
    lightboxImg.src = fotos[fotoAtual].src;
    lightboxImg.alt = fotos[fotoAtual].alt;
    setFoto(fotoAtual);
  }

  btnExpand.addEventListener("click", () => abrirLightbox(fotoAtual));
  fotoPrincipal.addEventListener("click", () => abrirLightbox(fotoAtual));
  lightboxClose.addEventListener("click", fecharLightbox);
  lbPrev.addEventListener("click", () => lightboxNav(-1));
  lbNext.addEventListener("click", () => lightboxNav(1));

  // Fecha ao clicar fora da imagem
  lightbox.addEventListener("click", e => { if (e.target === lightbox) fecharLightbox(); });

  // Teclado
  document.addEventListener("keydown", e => {
    if (!lightbox.open && !lightbox.hasAttribute("open")) return;
    if (e.key === "Escape")      fecharLightbox();
    if (e.key === "ArrowLeft")   lightboxNav(-1);
    if (e.key === "ArrowRight")  lightboxNav(1);
  });

  /* ── Contadores de pessoas ────────────────── */
  const PRECO_BASE_ADULTO  = 8500;
  const PRECO_BASE_CRIANCA = 4250; // 50% de desconto

  const counters = { adultos: 1, criancas: 0 };
  const MIN      = { adultos: 1, criancas: 0 };
  const MAX      = { adultos: 10, criancas: 8 };

  const elAdultos  = document.getElementById("adultos");
  const elCriancas = document.getElementById("criancas");

  document.querySelectorAll(".counter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target;
      const action = btn.dataset.action;

      if (action === "inc" && counters[target] < MAX[target]) counters[target]++;
      if (action === "dec" && counters[target] > MIN[target]) counters[target]--;

      elAdultos.textContent  = counters.adultos;
      elCriancas.textContent = counters.criancas;

      // Atualiza estados dos botões
      document.querySelectorAll(`.counter-btn[data-target="${target}"]`).forEach(b => {
        const val = counters[target];
        if (b.dataset.action === "dec") b.disabled = val <= MIN[target];
        if (b.dataset.action === "inc") b.disabled = val >= MAX[target];
      });

      calcularPreco();
    });
  });

  // Desabilita "−" no início
  document.querySelectorAll('.counter-btn[data-action="dec"]').forEach(b => {
    const t = b.dataset.target;
    b.disabled = counters[t] <= MIN[t];
  });

  /* ── Tipo de quarto ──────────────────────── */
  const quartoPrecos = { standard: 0, superior: 800, suite: 2000 };
  let quartoExtra = 0;

  document.querySelectorAll("input[name='quarto']").forEach(input => {
    input.addEventListener("change", () => {
      quartoExtra = quartoPrecos[input.value] || 0;
      calcularPreco();
    });
  });

  /* ── Cálculo de preço ─────────────────────── */
  const elPrecoBase     = document.getElementById("preco-base");
  const elPrecoCriancas = document.getElementById("preco-criancas");
  const elPrecoQuarto   = document.getElementById("preco-quarto");
  const elPrecoTotal    = document.getElementById("preco-total");

  function formatBRL(v) {
    return "R$ " + v.toLocaleString("pt-BR");
  }

  function calcularPreco() {
    const baseAdultos  = counters.adultos  * PRECO_BASE_ADULTO;
    const baseCriancas = counters.criancas * PRECO_BASE_CRIANCA;
    const totalQuarto  = (counters.adultos + Math.ceil(counters.criancas / 2)) * quartoExtra;
    const total        = baseAdultos + baseCriancas + totalQuarto;

    elPrecoBase.textContent     = formatBRL(baseAdultos);
    elPrecoCriancas.textContent = formatBRL(baseCriancas);
    elPrecoQuarto.textContent   = formatBRL(totalQuarto);
    elPrecoTotal.textContent    = formatBRL(total);

    // Atualiza label de crianças no resumo
    document.querySelector("#preco-criancas")
      .closest(".resumo-linha")
      .querySelector("span").textContent = `Crianças (${counters.criancas})`;
  }

  /* ── Validação e botão prosseguir ─────────── */
  const btnProsseguir = document.getElementById("btn-prosseguir");
  const dataIda       = document.getElementById("data-ida");
  const dataVolta     = document.getElementById("data-volta");

  // Garante que a volta não seja antes da ida
  dataIda.addEventListener("change", () => {
    if (dataVolta.value && dataVolta.value < dataIda.value) {
      dataVolta.value = "";
    }
    dataVolta.min = dataIda.value || "2025-06-01";
  });

  btnProsseguir.addEventListener("click", () => {
    if (!dataIda.value) {
      dataIda.focus();
      pulsarCampo(dataIda.closest(".form-field"));
      return;
    }
    if (!dataVolta.value) {
      dataVolta.focus();
      pulsarCampo(dataVolta.closest(".form-field"));
      return;
    }

    // Feedback visual de sucesso antes de "navegar"
    btnProsseguir.textContent = "✓ Redirecionando para pagamento…";
    btnProsseguir.style.background = "linear-gradient(135deg, #0a9e78, #22d3a5)";
    btnProsseguir.disabled = true;

    // Simula redirect (substituir por window.location.href = 'pagamento.html')
    setTimeout(() => {
      btnProsseguir.textContent = "Prosseguir para pagamento →";
      btnProsseguir.style.background = "";
      btnProsseguir.disabled = false;
    }, 2500);
  });

  function pulsarCampo(el) {
    if (!el) return;
    el.style.borderColor = "rgba(255,100,100,0.7)";
    el.style.boxShadow   = "0 0 0 3px rgba(255,100,100,0.15)";
    setTimeout(() => {
      el.style.borderColor = "";
      el.style.boxShadow   = "";
    }, 1400);
  }

  /* ── Hamburguer ──────────────────────────── */
  const hamburgerBtn  = document.getElementById("hamburger-btn");
  const hamburgerMenu = document.getElementById("hamburger-menu");

  if (hamburgerBtn && hamburgerMenu) {
    hamburgerBtn.addEventListener("click", () => {
      const isOpen = hamburgerBtn.getAttribute("aria-expanded") === "true";
      hamburgerBtn.setAttribute("aria-expanded", String(!isOpen));
      hamburgerMenu.hidden = isOpen;
    });
    document.addEventListener("click", e => {
      if (!hamburgerBtn.contains(e.target) && !hamburgerMenu.contains(e.target)) {
        hamburgerBtn.setAttribute("aria-expanded", "false");
        hamburgerMenu.hidden = true;
      }
    });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        hamburgerBtn.setAttribute("aria-expanded", "false");
        hamburgerMenu.hidden = true;
      }
    });
  }

})();