
// Our Services section: mouse drag/slide functionality
document.addEventListener('DOMContentLoaded', function () {
  const slidesContainer = document.getElementById('services-slides');
  const cards = Array.from(document.querySelectorAll('#services-slides .service-card'));
  let current = 0;
  let startX = 0;
  let isDragging = false;
  let dragThreshold = 60; // px

  function showServiceSlide(idx) {
    cards.forEach((card, i) => {
      card.style.display = (i >= idx && i < idx + 3) ? 'flex' : 'none';
    });
  }

  // Mouse events
  slidesContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    slidesContainer.style.cursor = 'grabbing';
  });
  document.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    slidesContainer.style.cursor = '';
    const diff = e.clientX - startX;
    if (diff > dragThreshold) {
      // Dragged right, show previous
      current = (current - 3 + cards.length) < 0 ? Math.max(cards.length - 3, 0) : (current - 3);
      showServiceSlide(current);
    } else if (diff < -dragThreshold) {
      // Dragged left, show next
      current = (current + 3 >= cards.length) ? 0 : (current + 3);
      showServiceSlide(current);
    }
  });
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    // Optionally, you can add a visual drag effect here
  });

  // Touch events for mobile
  slidesContainer.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
  });
  slidesContainer.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;
    if (diff > dragThreshold) {
      current = (current - 3 + cards.length) < 0 ? Math.max(cards.length - 3, 0) : (current - 3);
      showServiceSlide(current);
    } else if (diff < -dragThreshold) {
      current = (current + 3 >= cards.length) ? 0 : (current + 3);
      showServiceSlide(current);
    }
  });

  // Keep in sync with arrow buttons if present
  showServiceSlide(current);
});
