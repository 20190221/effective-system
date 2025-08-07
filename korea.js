
// 모든 질문에 클릭 이벤트 추가
document.querySelectorAll('.question').forEach(function(question) {
  question.addEventListener('click', function() {
    const qaItem = this.parentElement;
    qaItem.classList.toggle('active');
  });
});