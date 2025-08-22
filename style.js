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

function initWaveCursor() {
    document.body.classList.add('wave-cursor');
    
    document.addEventListener('click', function(e) {
        const wave = document.createElement('div');
        wave.className = 'wave-ring';
        wave.style.left = e.clientX + 'px';
        wave.style.top = e.clientY + 'px';
        document.body.appendChild(wave);
        
        setTimeout(() => wave.remove(), 600);
    });
}
// 기존 코드 아래에 호출 추가
initWaveCursor();
