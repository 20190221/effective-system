document.addEventListener("DOMContentLoaded", () => { 
  const slides = [
    {
      image: "images/retsya1-1.jpg",
      title: "日本",
      text: "始まった浅野さんのキャリア、その原点とは？",
      gradient: "linear-gradient(90deg, #FFDEE9, #B5FFFC)" // 아침
    },
    {
      image: "images/retsya2-1.jpg",
      title: "中国",
      text: "中国で得た浅野さんの経験、その成長の秘密とは？",
      gradient: "linear-gradient(90deg, #FFB347, #FFCC33)" // 점심
    },
    {
      image: "images/retsya3-2.jpg",
      title: "韓国",
      text: "日本、中国に続いて韓国にやってきた浅野さん。 叶えたい目標は？",
      gradient: "linear-gradient(90deg, #FF5F6D, #FFC371)" // 저녁
    }
  ];

  let currentIndex = 0;
  const backgroundLayer = document.querySelector(".background-layer");
  const textContainer = document.querySelector(".example-text");
  const indicatorsContainer = document.querySelector(".slide-indicators");
  const introScreen = document.querySelector(".intro-screen"); 
  const body = document.body;
  let slideInterval;

  const prevBtn = document.querySelector(".slide-btn.prev");
  const nextBtn = document.querySelector(".slide-btn.next");

  body.classList.add("intro-active");

  slides.forEach(slide => { new Image().src = slide.image; });

  backgroundLayer.classList.add("slide-anim", "show");
  textContainer.classList.add("slide-anim", "show");

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
      backgroundLayer.style.backgroundImage = `url('${currentSlide.image}')`;

      // 텍스트에 그라데이션 적용
      textContainer.innerHTML = `
        <h1 style="
          background: ${currentSlide.gradient};
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: bold;
        ">${currentSlide.title}</h1>
        <p style="
          background: ${currentSlide.gradient};
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: bold;
        ">${currentSlide.text}</p>
      `;

      requestAnimationFrame(() => {
        backgroundLayer.classList.add("show");
        textContainer.classList.add("show");
      });

      updateDots();
    }, 100);
  }

  function updateDots() {
    const dots = indicatorsContainer.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateBackground("right");
  }

  function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 5000);
  }

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

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateBackground("left");
    clearInterval(slideInterval);
    startAutoSlide();
  });

  nextBtn.addEventListener("click", () => {
    nextSlide();
    clearInterval(slideInterval);
    startAutoSlide();
  });

  createDots();
  updateBackground();

  setTimeout(() => {
    introScreen.classList.add("intro-fade-out");
    body.classList.remove("intro-active");

    introScreen.addEventListener("transitionend", () => {
      introScreen.style.display = "none";
      backgroundLayer.classList.add("visible");
      startAutoSlide();

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
  }, 4000);

  // introduce-text 스크롤 등장 애니메이션
  const introduceText = document.querySelector(".introduce-text");

  const introduceObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  introduceObserver.observe(introduceText);
});
