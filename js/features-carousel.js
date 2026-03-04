// Features Carousel with stable infinite scroll (no reset to start)
function initFeaturesCarousel() {
  const carousels = document.querySelectorAll('.carousel-features');

  carousels.forEach((carousel) => {
    if (carousel.dataset.carouselInitialized) return;

    const container = carousel.closest('.carousel-features-container');
    if (!container) return;

    const prevBtn = container.querySelector('.carousel-btn-prev');
    const nextBtn = container.querySelector('.carousel-btn-next');
    if (!prevBtn || !nextBtn) return;

    // original blocks
    const originals = Array.from(carousel.querySelectorAll('.carousel-block'));
    if (originals.length === 0) return;

    // compute gap and block width
    const style = getComputedStyle(carousel);
    const gap = parseInt(style.gap) || 0;
    const blockWidth = originals[0].offsetWidth + gap;
    const containerWidth = carousel.clientWidth;

    // initially clone one set to both sides
    originals.forEach(b => carousel.appendChild(b.cloneNode(true)));
    for (let i = originals.length - 1; i >= 0; i--) {
      carousel.insertBefore(originals[i].cloneNode(true), carousel.firstChild);
    }
    carousel.scrollLeft = originals.length * blockWidth;

    // helpers to extend buffer
    function extendRight() {
      originals.forEach(b => carousel.appendChild(b.cloneNode(true)));
    }
    function extendLeft() {
      for (let i = originals.length - 1; i >= 0; i--) {
        const clone = originals[i].cloneNode(true);
        carousel.insertBefore(clone, carousel.firstChild);
        carousel.scrollLeft += blockWidth; // keep viewport stable
      }
    }

    // click handlers
    prevBtn.addEventListener('click', function (e) {
      e.preventDefault();
      carousel.scrollBy({ left: -blockWidth, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', function (e) {
      e.preventDefault();
      carousel.scrollBy({ left: blockWidth, behavior: 'smooth' });
    });

    // on scroll, check if nearing ends and extend
    carousel.addEventListener('scroll', () => {
      const scrollPos = carousel.scrollLeft;
      const total = carousel.scrollWidth;
      // near right end
      if (scrollPos + containerWidth > total - blockWidth * 2) {
        extendRight();
      }
      // near left end
      if (scrollPos < blockWidth * 2) {
        extendLeft();
      }
    });

    carousel.dataset.carouselInitialized = 'true';
  });
}

// Initialize on load or HTMX swap
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFeaturesCarousel);
} else {
  initFeaturesCarousel();
}

document.addEventListener('htmx:afterSettle', initFeaturesCarousel);
document.addEventListener('htmx:afterSwap', initFeaturesCarousel);
