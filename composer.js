const creators = document.querySelectorAll('.creator');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');

// ---------- 모달 닫기 함수 ----------
const closeModal = () => {
  modal.classList.remove('show'); 
  setTimeout(() => modal.style.display = 'none', 500); // CSS transition 시간과 동일
};

// ESC 키로 모달 닫기
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.style.display === 'flex') {
    closeModal();
  }
});

// ---------- 크리에이터 클릭 이벤트 ----------
creators.forEach(creatorDiv => {
  const img = creatorDiv.querySelector('img');

  // 3D Tilt + Hover 효과
  img.addEventListener('mousemove', e => {
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = -(x - centerX) / 20;
    img.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    img.style.boxShadow = `0 15px 30px rgba(0,123,255,0.3)`;
  });

  img.addEventListener('mouseleave', () => {
    img.style.transform = `perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)`;
    img.style.boxShadow = `0 5px 15px rgba(0,123,255,0.2)`;
  });

  // 클릭 → 모달 열기
  creatorDiv.addEventListener('click', () => {
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);

    const name = creatorDiv.dataset.name;
    const desc = creatorDiv.dataset.desc;

    modalContent.innerHTML = `
      <span class="close">&times;</span>
      <h2>${name}</h2>
      <p>${desc}</p>
    `;

    // 닫기 버튼 클릭 이벤트
    modalContent.querySelector('.close').addEventListener('click', closeModal);
  });
});

// ---------- 모달 배경 클릭 시 닫기 ----------
modal.addEventListener('click', e => {
  if (e.target === modal) closeModal();
});

// ---------- 스크롤 애니메이션 ----------
const scrollElements = document.querySelectorAll('.team-photo-wrapper, .creators');

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;
  return elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend;
};

const displayScrollElement = (el) => {
  el.classList.add('show');
};

const handleScrollAnimation = () => {
  scrollElements.forEach(el => {
    if (elementInView(el, 1.25)) displayScrollElement(el);
  });
};

window.addEventListener('scroll', handleScrollAnimation);
