// Intersection reveal
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.film-section');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('show');
    });
  }, { threshold: 0.2 });
  sections.forEach(s => io.observe(s));
});

// Side menu toggle on mobile
const toggle = document.querySelector('.menu-toggle');
const side = document.querySelector('.side-menu');
toggle?.addEventListener('click', () => {
  side.classList.toggle('open');
});
