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
