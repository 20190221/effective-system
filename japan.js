document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.film-section');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(sec => observer.observe(sec));
});
