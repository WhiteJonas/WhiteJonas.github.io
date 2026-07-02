// 滚动进入动画：元素进入视口时淡入上移
(function () {
  var els = document.querySelectorAll('.reveal');

  // 不支持 IntersectionObserver 时直接全部显示
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('show'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(function (el) { io.observe(el); });

  // 首屏 hero 立即显示，避免加载时闪空
  var hero = document.querySelector('.hero.reveal');
  if (hero) requestAnimationFrame(function () { hero.classList.add('show'); });
})();
