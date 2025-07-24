document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.side-menu');
  const navbar = document.querySelector('.navbar');

  // 메뉴 토글 버튼 클릭 시
  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
    toggle.classList.toggle('open');
    navbar.classList.toggle('menu-open'); // ⚠️ CSS에서 `.menu-open` 클래스 정의 확인 필수
  });

  // 모달 관련
  const modal = document.getElementById('profileModal');
  if (modal) {
    const creators = document.querySelectorAll('.creator');
    const modalName = document.getElementById('modalName');
    const modalDesc = document.getElementById('modalDesc');
    const closeBtn = modal.querySelector('.close');

    creators.forEach(creator => {
      creator.addEventListener('click', () => {
        const name = creator.dataset.name;
        const desc = creator.dataset.desc;

        modalName.textContent = name;
        modalDesc.innerHTML = desc; // <br> 태그 사용 가능

        modal.style.display = 'flex';
      });
    });

    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  }

  // 스크롤 감지로 navbar 숨기기
  let lastScrollY = window.scrollY;
  const threshold = 10;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    const diff = currentScroll - lastScrollY;

    // 메뉴 열려있으면 헤더 숨김/표시 안 함
    if (menu.classList.contains('open')) return;

    if (diff > threshold) {
      navbar.classList.add('hidden'); // 아래로 스크롤 시 숨김
    } else if (diff < -threshold) {
      navbar.classList.remove('hidden'); // 위로 스크롤 시 표시
    }

    lastScrollY = currentScroll;
  });

  // 마우스를 위로 올리면 헤더 다시 표시
  document.addEventListener('mousemove', (e) => {
    if (menu.classList.contains('open')) return;
    if (e.clientY < 50) {
      navbar.classList.remove('hidden');
    }
  });
});
