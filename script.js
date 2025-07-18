// Scroll-triggered animation for Our Services section
(() => {
  const servicesSection = document.getElementById('services');
  if (!servicesSection) return;
  function onScroll() {
    const rect = servicesSection.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < windowHeight - 80) {
      servicesSection.classList.add('animate');
      window.removeEventListener('scroll', onScroll);
    }
  }
  window.addEventListener('scroll', onScroll);
  onScroll();
})();
// Hamburger menu for mobile nav with overlay and animation
(() => {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');
  function openNav() {
    navLinks.classList.add('show');
    navOverlay.classList.add('show');
    hamburger.classList.add('active');
  }
  function closeNav() {
    navLinks.classList.remove('show');
    navOverlay.classList.remove('show');
    hamburger.classList.remove('active');
  }
  function toggleNav() {
    if (navLinks.classList.contains('show')) {
      closeNav();
    } else {
      openNav();
    }
  }
  hamburger.addEventListener('click', toggleNav);
  hamburger.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') toggleNav();
  });
  navOverlay.addEventListener('click', closeNav);
  // Hide nav on link click (mobile) and smooth scroll to section
  function scrollToSectionWithOffset(href) {
    const target = document.querySelector(href);
    if (target) {
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 0;
      const rect = target.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const top = rect.top + scrollTop - headerHeight - 8; // 8px extra spacing
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        if (window.innerWidth <= 900) {
          closeNav();
          setTimeout(() => scrollToSectionWithOffset(href), 250);
        } else {
          scrollToSectionWithOffset(href);
        }
      }
    });
  });
  // Show/hide hamburger based on screen size
  function handleResize() {
    if (window.innerWidth <= 900) {
      hamburger.style.display = 'flex';
      closeNav();
    } else {
      hamburger.style.display = 'none';
      closeNav();
    }
  }
  window.addEventListener('resize', handleResize);
  handleResize();
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

// Services slider logic: show 3 at a time, next/prev, with touch drag
(() => {
  const cards = Array.from(document.querySelectorAll('#services-slides .service-card'));
  let current = 0;
  function showServiceSlide(idx) {
    cards.forEach((card, i) => {
      card.style.display = (i >= idx && i < idx + 3) ? 'flex' : 'none';
    });
  }
  document.getElementById('prevService').onclick = function() {
    current = (current - 3 + cards.length) < 0 ? Math.max(cards.length - 3, 0) : (current - 3);
    showServiceSlide(current);
  };
  document.getElementById('nextService').onclick = function() {
    current = (current + 3 >= cards.length) ? 0 : (current + 3);
    showServiceSlide(current);
  };
  // Touch drag support
  const slidesContainer = document.getElementById('services-slides');
  let startX = 0, endX = 0;
  slidesContainer.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });
  slidesContainer.addEventListener('touchmove', e => {
    endX = e.touches[0].clientX;
  });
  slidesContainer.addEventListener('touchend', () => {
    if (startX && endX) {
      if (endX - startX > 50) {
        // swipe right
        document.getElementById('prevService').click();
      } else if (startX - endX > 50) {
        // swipe left
        document.getElementById('nextService').click();
      }
    }
    startX = endX = 0;
  });
  showServiceSlide(current);
})();

// Knowledge Base slider logic: show 2 at a time, next/prev, with touch drag
(() => {
  const kbRow = document.querySelector('.knowledge-row');
  if (!kbRow) return;
  const cards = Array.from(kbRow.querySelectorAll('.knowledge-card'));
  let current = 0;
  function showKBSlide(idx) {
    cards.forEach((card, i) => {
      card.style.display = (i >= idx && i < idx + 2) ? 'flex' : 'none';
    });
  }
  // Add nav buttons if not present
  let nav = document.getElementById('kb-nav');
  if (!nav) {
    nav = document.createElement('div');
    nav.id = 'kb-nav';
    nav.style.width = '100%';
    nav.style.display = 'flex';
    nav.style.justifyContent = 'center';
    nav.style.alignItems = 'center';
    nav.style.marginTop = '32px';
    nav.style.gap = '16px';
    nav.innerHTML = `
      <button id="prevKB" style="background: rgba(229,57,53,0.08); border: none; border-radius: 50%; width: 44px; height: 44px; font-size: 1.5em; color: #e53935; cursor: pointer; box-shadow: 0 2px 8px rgba(229,57,53,0.08);">&#8592;</button>
      <button id="nextKB" style="background: rgba(229,57,53,0.08); border: none; border-radius: 50%; width: 44px; height: 44px; font-size: 1.5em; color: #e53935; cursor: pointer; box-shadow: 0 2px 8px rgba(229,57,53,0.08);">&#8594;</button>
    `;
    kbRow.parentNode.appendChild(nav);
  }
  document.getElementById('prevKB').onclick = function() {
    current = (current - 2 + cards.length) < 0 ? Math.max(cards.length - 2, 0) : (current - 2);
    showKBSlide(current);
  };
  document.getElementById('nextKB').onclick = function() {
    current = (current + 2 >= cards.length) ? 0 : (current + 2);
    showKBSlide(current);
  };
  // Touch drag support
  let startX = 0, endX = 0;
  kbRow.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });
  kbRow.addEventListener('touchmove', e => {
    endX = e.touches[0].clientX;
  });
  kbRow.addEventListener('touchend', () => {
    if (startX && endX) {
      if (endX - startX > 50) {
        document.getElementById('prevKB').click();
      } else if (startX - endX > 50) {
        document.getElementById('nextKB').click();
      }
    }
    startX = endX = 0;
  });
  showKBSlide(current);
})();
