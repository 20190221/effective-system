document.addEventListener('DOMContentLoaded', () => {
  const creators = document.querySelectorAll('.creator');
  const modal = document.querySelector('.modal');
  const modalContent = document.querySelector('.modal-content');

  const closeModal = () => {
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 500);
  };

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.style.display === 'flex') closeModal();
  });

  creators.forEach(creatorDiv => {
    const img = creatorDiv.querySelector('img');

    img.addEventListener('mousemove', e => {
      const rect = img.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = (y - rect.height / 2) / 20;
      const rotateY = -(x - rect.width / 2) / 20;
      img.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
      img.style.boxShadow = `0 15px 30px rgba(0,123,255,0.3)`;
    });

    img.addEventListener('mouseleave', () => {
      img.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)';
      img.style.boxShadow = '0 5px 15px rgba(0,123,255,0.2)';
    });

    creatorDiv.addEventListener('click', () => {
      modal.style.display = 'flex';
      setTimeout(() => modal.classList.add('show'), 10);

      const name = creatorDiv.dataset.name;
      const desc = creatorDiv.dataset.desc;
      const avatar = creatorDiv.dataset.avatar || img.src;
      const mainImage = creatorDiv.dataset.image || img.src;
      const instaLink = creatorDiv.dataset.instagram || '#';
      const githubLink = creatorDiv.dataset.github || '#';

      modalContent.innerHTML = `
        <div class="modal-header">
          <img src="${avatar}" alt="${name}">
          <h2>${name}</h2>
          <span class="close">&times;</span>
        </div>
        <img class="modal-main-image" src="${mainImage}" alt="${name}">
        <div class="modal-actions">
          <button class="like-btn">❤️ 0</button>
          <button class="comment-btn">💬</button>
        </div>
        <div class="modal-body">
          <p>${desc}</p>
          <div class="comment-wrapper">
            <div class="comment-list">
              <div class="comment-item fixed-comment">
                <a href="${instaLink}" target="_blank" class="social-icon insta">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37a4 4 0 1 1-4-4 4 4 0 0 1 4 4z"></path>
                    <line x1="17.5" y1="6.5" x2="17.5" y2="6.5"></line>
                  </svg>
                </a>
                <a href="${githubLink}" target="_blank" class="social-icon github">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                    <path d="M12 1C5.925 1 1 5.925 1 12c0 4.875 3.163 9.014 7.544 10.477.551.101.751-.239.751-.531 0-.263-.01-1.141-.016-2.063-3.07.667-3.719-1.481-3.719-1.481-.5-1.272-1.219-1.611-1.219-1.611-.996-.68.076-.666.076-.666 1.101.078 1.679 1.132 1.679 1.132.978 1.676 2.565 1.191 3.19.911.099-.708.383-1.192.695-1.467-2.449-.278-5.025-1.225-5.025-5.451 0-1.204.429-2.187 1.133-2.958-.113-.278-.492-1.397.108-2.913 0 0 .924-.296 3.027 1.13a10.504 10.504 0 0 1 5.5 0c2.102-1.426 3.025-1.13 3.025-1.13.6 1.516.222 2.635.109 2.913.706.771 1.132 1.754 1.132 2.958 0 4.236-2.578 5.17-5.036 5.444.394.34.744 1.013.744 2.041 0 1.474-.013 2.664-.013 3.025 0 .293.198.636.756.528C19.839 21.015 23 16.875 23 12c0-6.075-4.925-11-11-11z"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div class="comment-input">
              <input type="text" placeholder="댓글을 입력하세요">
              <button>전송</button>
            </div>
          </div>
        </div>
      `;

      // 좋아요 버튼 기능
      const likeBtn = modalContent.querySelector('.like-btn');
      let likeCount = 0;
      likeBtn.classList.remove('liked');
      likeBtn.addEventListener('click', () => {
        likeBtn.classList.toggle('liked');
        likeCount = likeBtn.classList.contains('liked') ? likeCount + 1 : Math.max(0, likeCount - 1);
        likeBtn.textContent = `❤️ ${likeCount}`;
      });

      // 닫기 버튼
      modalContent.querySelector('.close').addEventListener('click', closeModal);

      // 댓글 슬라이드
      const commentBtnToggle = modalContent.querySelector('.comment-btn');
      const commentInput = modalContent.querySelector('.comment-input');
      commentBtnToggle.addEventListener('click', () => {
        commentInput.classList.toggle('show');
        commentInput.querySelector('input').focus();
      });

      // 댓글 입력
      const commentList = modalContent.querySelector('.comment-list');
      const commentInputField = commentInput.querySelector('input');
      const commentSendBtn = commentInput.querySelector('button');
      const addComment = () => {
        if (commentInputField.value.trim() !== '') {
          const div = document.createElement('div');
          div.className = 'comment-item';
          div.textContent = commentInputField.value;
          commentList.appendChild(div);
          commentInputField.value = '';
        }
      };
      commentSendBtn.addEventListener('click', addComment);
      commentInputField.addEventListener('keydown', e => {
        if (e.key === 'Enter') addComment();
      });
    });
  });

  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });

  // 스크롤 애니메이션
  const scrollElements = document.querySelectorAll('.team-photo-wrapper, .creators');
  const elementInView = (el, dividend = 1) => el.getBoundingClientRect().top <= (window.innerHeight || document.documentElement.clientHeight) / dividend;
  const displayScrollElement = el => el.classList.add('show');
  const handleScrollAnimation = () => scrollElements.forEach(el => {
    if (elementInView(el, 1.25)) displayScrollElement(el);
  });
  window.addEventListener('scroll', handleScrollAnimation);
});
