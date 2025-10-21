(function() {
    const track = document.getElementById('cardsTrack');
    const prev = document.getElementById('prevBtn');
    const next = document.getElementById('nextBtn');

    function getScrollAmount() {
      const card = track.querySelector('.card');
      if (!card) return track.clientWidth;
      const style = getComputedStyle(track);
      const gap = parseFloat(style.gap || 16);
      return Math.round(card.offsetWidth + gap);
    }

    function updateButtons() {
      prev.disabled = track.scrollLeft <= 0;
      next.disabled = Math.ceil(track.scrollLeft + track.clientWidth) >= track.scrollWidth;
    }

    prev.addEventListener('click', () => {
      track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });

    next.addEventListener('click', () => {
      track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });

    track.addEventListener('scroll', updateButtons);
    window.addEventListener('resize', updateButtons);

    // Enable keyboard navigation
    track.setAttribute('tabindex', '0');
    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') next.click();
      if (e.key === 'ArrowLeft') prev.click();
    });

    // Enable touch drag
    let startX = 0, isDown = false;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; isDown = true; });
    track.addEventListener('touchmove', e => {
      if (!isDown) return;
      const dx = startX - e.touches[0].clientX;
      track.scrollLeft += dx;
      startX = e.touches[0].clientX;
    });
    track.addEventListener('touchend', () => { isDown = false; updateButtons(); });

    updateButtons();
  })();