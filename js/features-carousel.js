// Features Carousel
document.addEventListener('DOMContentLoaded', function() {
  const prevBtns = document.querySelectorAll('.carousel-btn-prev');
  const nextBtns = document.querySelectorAll('.carousel-btn-next');
  
  prevBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const carousel = this.nextElementSibling;
      carousel.scrollBy({ left: -(360 + 15), behavior: 'smooth' });
    });
  });
  
  nextBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const carousel = this.previousElementSibling;
      carousel.scrollBy({ left: 360 + 15, behavior: 'smooth' });
    });
  });
});
