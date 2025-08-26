document.addEventListener("DOMContentLoaded", () => { 
  const slides = [
    {
      image: "images/retsya1-1.jpg",
      title: "日本",
      text: "始まった浅野さんのキャリア、その原点とは？",
      gradient: "linear-gradient(90deg, #FFDEE9, #B5FFFC)"
    },
    {
      image: "images/retsya2-1.jpg",
      title: "中国",
      text: "中国で得た浅野さんの経験、その成長の秘密とは？",
      gradient: "linear-gradient(90deg, #FFB347, #FFCC33)"
    },
    {
      image: "images/retsya3-2.jpg",
      title: "韓国",
      text: "日本、中国に続いて韓国にやってきた浅野さん。 叶えたい目標は？",
      gradient: "linear-gradient(90deg, #FF5F6D, #FFC371)"
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

      textContainer.innerHTML = `
        <h1 class="slide-title" style="
          background: ${currentSlide.gradient};
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: bold;
          opacity: 0;
          filter: blur(6px);
          transition: opacity 1.5s ease, filter 1.5s ease;
        ">${currentSlide.title}</h1>
        <p class="slide-text" style="
          background: ${currentSlide.gradient};
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: bold;
          opacity: 0;
          filter: blur(4px);
          transition: opacity 1.7s ease 0.2s, filter 1.7s ease 0.2s;
        ">${currentSlide.text}</p>
      `;

      requestAnimationFrame(() => {
        const title = textContainer.querySelector(".slide-title");
        const text = textContainer.querySelector(".slide-text");
        title.style.opacity = 1;
        title.style.filter = "blur(0)";
        text.style.opacity = 1;
        text.style.filter = "blur(0)";
        backgroundLayer.classList.add("show");
        textContainer.classList.add("show");
      });

      updateDots();
    }, 100);
  }

  function updateDots() {
    const dots = indicatorsContainer.querySelectorAll(".dot");
    dots.forEach((dot, index) => dot.classList.toggle("active", index === currentIndex));
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateBackground("right");
  }

  function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 6000);
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
          if (entry.isIntersecting) entry.target.classList.add('show');
        });
      }, { threshold: 0.1 });

      boxes.forEach(box => mottoObserver.observe(box));
    }, { once: true });
  }, 4000);

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

  // ---------------- 햄버거 메뉴 ----------------
  const menuToggle = document.getElementById("menu-toggle");
  const sideMenu = document.getElementById("side-menu");

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    sideMenu.classList.toggle("open");
  });

  // ---------------- 웨이브 커서 ----------------
  initWaveCursor();

  // ---------------- 초기 메시지 → 셔터 효과 → 프로필 카드 ----------------
  let hasClicked = false;

  function resetToInitial() {
    const initialMessage = document.getElementById('initialMessage');
    const profileCard = document.getElementById('profileCard');
    const cameraIcon = document.querySelector('.travel-decoration.camera');

    profileCard.classList.remove('show');
    cameraIcon.classList.remove('hidden');

    setTimeout(() => {
        initialMessage.classList.remove('hidden');
        hasClicked = false;
        document.body.style.cursor = 'pointer';
    }, 800);
  }

  document.body.addEventListener('click', function(e) {
    if (e.target.id === 'backButton') return;
    if (hasClicked) return;
    hasClicked = true;

    const initialMessage = document.getElementById('initialMessage');
    const shutterOverlay = document.getElementById('shutterOverlay');
    const profileCard = document.getElementById('profileCard');
    const shutterSound = document.getElementById('shutterSound');
    const cameraIcon = document.querySelector('.travel-decoration.camera');

    initialMessage.classList.add('hidden');
    cameraIcon.classList.add('hidden');

    shutterSound.currentTime = 0;
    shutterSound.play().catch(() => {});

    shutterOverlay.classList.add('active');

    setTimeout(() => {
        shutterOverlay.classList.remove('active');
        profileCard.classList.add('show');

        setTimeout(() => {
            const profileImage = document.getElementById('profileImage');
            profileImage.src = "images/1.プロフィール_お気に入り_中国にて.jpg";
        }, 500);
    }, 300);

    document.body.style.cursor = 'default';
  });

  document.getElementById('backButton').addEventListener('click', function(e) {
    e.stopPropagation();
    resetToInitial();
  });

  document.body.addEventListener('mousemove', function() {
    if (!hasClicked) {
        document.body.style.cursor = 'pointer';
    }
  });

});

// ---------------- 웨이브 커서 함수 ----------------
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
