let slides = document.querySelectorAll('.slide');
let currentIndex = 0;

function changeSlide() {
  slides[currentIndex].classList.remove('active');
  
  currentIndex = (currentIndex + 1) % slides.length;
  
  slides[currentIndex].classList.add('active');
}

// Trocar de imagem a cada 5 segundos
setInterval(changeSlide, 4000);