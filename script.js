// Smooth scroll to section on nav link click (desktop only)
(() => {
  const navLinks = document.getElementById('navLinks');
  function scrollToSectionWithOffset(href) {
    const target = document.querySelector(href);
    if (target) {
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 0;
      const rect = target.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const top = rect.top + scrollTop - headerHeight - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        scrollToSectionWithOffset(href);
      }
    });
  });
})();

// Hero slider logic (scoped)
(() => {
  const slides = document.querySelectorAll('#slides .slide');
  let currentSlide = 0;
  let autoSlideInterval = null;
  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.style.display = i === idx ? 'flex' : 'none';
    });
  }
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }
  document.getElementById('prevSlide').onclick = function() {
    prevSlide();
    resetAutoSlide();
  };
  document.getElementById('nextSlide').onclick = function() {
    nextSlide();
    resetAutoSlide();
  };
  function startAutoSlide() {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 5000); // 5 seconds
  }
  function resetAutoSlide() {
    startAutoSlide();
  }
  showSlide(currentSlide);
  startAutoSlide();
})();

