window.addEventListener("load", () => {
  setTimeout(() => {
    const intro = document.getElementById("intro");
    intro.classList.add("hide");
    setTimeout(() => {
      intro.style.display = "none";
    }, 1000); // transition 시간과 맞추기
  }, 3000);
});
