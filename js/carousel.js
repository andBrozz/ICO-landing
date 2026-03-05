// простой бесконечный слайдер, показывающий 4 элемента
class LogoCarousel {
  constructor(selector) {
    this.el = document.querySelector(selector);
    if (!this.el) return;
    this.inner = this.el.querySelector('.carousel-inner');
    this.prev = this.el.querySelector('.carousel-prev');
    this.next = this.el.querySelector('.carousel-next');
    this.visible = 4;
    this.origCount = this.inner.children.length;
    this.current = this.visible; // позиция в учтённых клонах

    this.cloneItems();
    this.slides = this.inner.children;
    this.updateSizes();
    this.jump(this.current, false);
    this.bind();
  }

  cloneItems() {
    const items = Array.from(this.inner.children);
    const head = items.slice(0, this.visible).map(i => i.cloneNode(true));
    const tail = items.slice(-this.visible).map(i => i.cloneNode(true));
    tail.reverse().forEach(i => this.inner.insertBefore(i, this.inner.firstChild));
    head.forEach(i => this.inner.appendChild(i));
  }

  updateSizes() {
    const style = getComputedStyle(this.inner);
    this.gap = parseInt(style.gap) || 0;
    this.w = this.slides[0].offsetWidth + this.gap;
  }

  bind() {
    this.next.addEventListener('click', e => { e.preventDefault(); this.go(1); });
    this.prev.addEventListener('click', e => { e.preventDefault(); this.go(-1); });
    this.inner.addEventListener('transitionend', () => this.checkBounds());
  }

  go(dir) {
    this.current += dir;
    this.inner.style.transition = 'transform .5s ease';
    this.inner.style.transform = `translateX(${-this.current * this.w}px)`;
  }

  jump(idx, animate = true) {
    if (!animate) this.inner.style.transition = 'none';
    this.current = idx;
    this.inner.style.transform = `translateX(${-this.current * this.w}px)`;
    if (!animate) setTimeout(() => this.inner.style.transition = 'transform .5s ease');
  }

  checkBounds() {
    if (this.current >= this.origCount + this.visible)
      this.jump(this.visible, false);
    if (this.current < this.visible)
      this.jump(this.origCount + this.visible - 1, false);
  }
}

function initCarousel() {
  new LogoCarousel('.carousel-container');
}

document.addEventListener('DOMContentLoaded', initCarousel);

if (typeof htmx !== 'undefined') {
  document.addEventListener('htmx:afterSettle', initCarousel);
}