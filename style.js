document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.side-menu');

  // ===== 메뉴 토글 이벤트 =====
  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');

    if (menu.classList.contains('open')) {
      toggle.textContent = 'CLOSE';
    } else {
      toggle.textContent = 'MENU';
    }
  });

  // ===== 외부 클릭 시 메뉴 닫기 =====
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !toggle.contains(e.target) && menu.classList.contains('open')) {
      menu.classList.remove('open');
      toggle.textContent = 'MENU';
    }
  });
});
