lucide.createIcons();

  const menuBtn = document.getElementById("menuBtn");
  const closeMenu = document.getElementById("closeMenu");
  const mobileMenu = document.getElementById("mobileMenu");
  const navbar = document.getElementById("navbar");

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("translate-x-full");
  });

  closeMenu.addEventListener("click", () => {
    mobileMenu.classList.add("translate-x-full");
  });

  // Mudar cor do header ao rolar
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("bg-blue-900", "shadow-lg");
    } else {
      navbar.classList.remove("bg-blue-900", "shadow-lg");
    }
  });