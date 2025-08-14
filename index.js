document.addEventListener("DOMContentLoaded", () => { 
  const slides = [
    {
      image: "images/KakaoTalk_20250814_162219822.jpg",
      title: "日本",
      text: "始まった淺野さんのキャリア、その原点とは？",
      color: "black"
    },
    {
      image: "images/retsya2.jpg",
      title: "中国",
      text: "中国で直面した。。。",
      color: "#ffcc00"
    },
    {
      image: "images/retsya3.jpg",
      title: "韓国",
      text: "日本、中国に続いて韓国にやってきた淺野さん。 叶えたい目標は？",
      color: "#00ffcc"
    }
  ];

  let currentIndex = 0;
  const backgroundLayer = document.querySelector(".background-layer");
  const textContainer = document.querySelector(".example-text");
  const titleEl = document.querySelector(".example-text h1");
  const textEl = document.querySelector(".example-text p");
  const indicatorsContainer = document.querySelector(".slide-indicators");
  const introScreen = document.querySelector(".intro-screen"); 
  const body = document.body;
  let slideInterval;

  // 스크롤 막기
  body.classList.add("intro-active");

  // 이미지 사전 로딩
  slides.forEach(slide => {
    const img = new Image();
    img.src = slide.image;
  });

  // 초기 상태
  backgroundLayer.classList.add("slide-anim", "show");
  textContainer.classList.add("slide-anim", "show");

  // 배경 및 텍스트 업데이트
  function updateBackground(direction = "right") {
    backgroundLayer.classList.remove("show", "from-left", "from-right");
    textContainer.classList.remove("show", "from-left", "from-right");

    if (direction === "left") {
      backgroundLayer.classList.add("from-left");
      textContainer.classList.add("from-left");
    } else {
      backgroundLayer.classList.add("from-right");
      textContainer.classList.add("from-right");
    }

    setTimeout(() => {
      const currentSlide = slides[currentIndex];
      // ✅ 백틱으로 수정: url 적용
      backgroundLayer.style.backgroundImage = `url('${currentSlide.image}')`;
      titleEl.textContent = currentSlide.title;
      textEl.innerHTML = currentSlide.text;

      // ✅ 글자색 적용
      titleEl.style.color = currentSlide.color;
      textEl.style.color = currentSlide.color;

      requestAnimationFrame(() => {
        backgroundLayer.classList.add("show");
        textContainer.classList.add("show");
      });

      updateDots();
    }, 100);
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
    currentIndex = (currentIndex + 1) % slides.length;
    updateBackground("right");
  }

  // 자동 슬라이드 시작
  function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  // 점(dot) 생성
  function createDots() {
    indicatorsContainer.innerHTML = ''; 
    slides.forEach((_, index) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (index === currentIndex) dot.classList.add("active");
      dot.addEventListener("click", () => {
        const direction = index > currentIndex ? "right" : "left";
        currentIndex = index;
        updateBackground(direction);
        clearInterval(slideInterval);
        startAutoSlide();
      });
      indicatorsContainer.appendChild(dot);
    });
  }

  // ✅ 인트로 자동 종료 (3초 후 부드러운 페이드아웃)
  setTimeout(() => {
    introScreen.classList.add("intro-fade-out");
    body.classList.remove("intro-active");

    introScreen.addEventListener("transitionend", () => {
      introScreen.style.display = "none";
      backgroundLayer.classList.add("visible");
      createDots();
      updateBackground();
      startAutoSlide();

      // IntersectionObserver
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
    }, { once: true });
  }, 3000);
});
