// 메뉴 토글 기능
const menuToggle = document.querySelector('.menu-toggle');
const sideMenu = document.querySelector('.side-menu');
let isMenuOpen = false;

menuToggle.addEventListener('click', () => {
  if (!isMenuOpen) {
    sideMenu.style.left = '0';
    isMenuOpen = true;
    menuToggle.textContent = 'CLOSE';
  } else {
    sideMenu.style.left = '-250px';
    isMenuOpen = false;
    menuToggle.textContent = 'MENU';
  }
});

// 메뉴 외부 클릭시 메뉴 닫기
document.addEventListener('click', (e) => {
  if (!sideMenu.contains(e.target) && !menuToggle.contains(e.target) && isMenuOpen) {
    sideMenu.style.left = '-250px';
    isMenuOpen = false;
    menuToggle.textContent = 'MENU';
  }
});

// 스크롤 애니메이션
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// 모든 타임라인 아이템에 옵저버 적용
document.querySelectorAll('.timeline-item').forEach(item => {
  observer.observe(item);
});
