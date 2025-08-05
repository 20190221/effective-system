document.addEventListener("DOMContentLoaded", () => {
  // 3초 후 인트로 화면 숨기기
  setTimeout(() => {
    document.querySelector(".intro-screen").style.display = "none";

    // 프로필 섹션만 숨겨져 있으니, IntersectionObserver로 감시 시작
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          entry.target.classList.remove("hidden");
          observer.unobserve(entry.target); // 한 번 나타나면 감시 종료
        }
      });
    }, {
      threshold: 0.8  // 요소가 50% 이상 보일 때 실행
    });

    // .hidden 클래스를 가진 요소(프로필 섹션)만 감시
    document.querySelectorAll(".hidden").forEach(el => observer.observe(el));
  }, 3000);
});