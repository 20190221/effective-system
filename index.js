document.addEventListener("DOMContentLoaded", () => { 
  const bgImages = [
    "images/korea.jpg",
    "images/china.jpg",
    "images/japan.jpg"
  ];

  let currentIndex = 0;
  const backgroundLayer = document.querySelector(".background-layer");
  const prevBtn = document.querySelector(".slide-btn.prev");
  const nextBtn = document.querySelector(".slide-btn.next");
  const indicatorsContainer = document.querySelector(".slide-indicators");

  const enterBtn = document.getElementById("enter-btn");      // 추가
  const introScreen = document.querySelector(".intro-screen"); // 추가

  let slideInterval;

  // 배경 이미지 변경 함수
  function updateBackground() {
    backgroundLayer.style.backgroundImage = `url('${bgImages[currentIndex]}')`;
    updateDots();
  }

  // 점(dot) UI 업데이트
  function updateDots() {
    const dots = indicatorsContainer.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  // 다음 슬라이드
  function nextSlide() {
    currentIndex = (currentIndex + 1) % bgImages.length;
    updateBackground();
  }

  // 이전 슬라이드
  function prevSlide() {
    currentIndex = (currentIndex - 1 + bgImages.length) % bgImages.length;
    updateBackground();
  }

  // 자동 슬라이드 시작
  function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  // 자동 슬라이드 재설정
  function resetSlideInterval() {
    clearInterval(slideInterval);
    startAutoSlide();
  }

  // 점(dot) 생성
  function createDots() {
    indicatorsContainer.innerHTML = ''; // 초기화
    bgImages.forEach((_, index) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (index === currentIndex) dot.classList.add("active");
      dot.addEventListener("click", () => {
        currentIndex = index;
        updateBackground();
        resetSlideInterval();
      });
      indicatorsContainer.appendChild(dot);
    });
  }

  // 버튼 클릭 이벤트
  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetSlideInterval();
  });

  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetSlideInterval();
  });

  enterBtn.addEventListener("click", () => {
    introScreen.style.display = "none";            // 인트로 숨기기
    backgroundLayer.classList.add("visible");       // 배경 보이기 (필요시)

    createDots();
    updateBackground();
    startAutoSlide();

    // IntersectionObserver (기존 그대로 사용)
    const hiddenObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          entry.target.classList.remove("hidden");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.8 });

    document.querySelectorAll(".hidden").forEach(el => hiddenObserver.observe(el));

    const boxes = document.querySelectorAll('.motto > div');
    const mottoObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.1 });

    boxes.forEach(box => mottoObserver.observe(box));
  });

  // 초기에는 인트로 화면이므로 슬라이드 초기화 하지 않음
});
