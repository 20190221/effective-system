// Korea.js - Complete Script for Korea Interview Page

document.addEventListener('DOMContentLoaded', function() {
    
  // ===== 스크롤 애니메이션 =====
  const sections = document.querySelectorAll('.film-section');
  
  // Intersection Observer로 스크롤 애니메이션 구현
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('show');
          }
      });
  }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
  });
  
  // 모든 섹션 관찰 시작
  sections.forEach(section => {
      observer.observe(section);
  });
  
  // 페이지 로드시 첫 번째 섹션 즉시 표시
  if (sections.length > 0) {
      setTimeout(() => {
          sections[0].classList.add('show');
      }, 100);
  }
  
  // ===== 사이드 메뉴 토글 기능 =====
  const menuToggle = document.querySelector('.menu-toggle');
  const sideMenu = document.querySelector('.side-menu');
  const body = document.body;
  
  if (menuToggle && sideMenu) {
      // 메뉴 열기/닫기
      menuToggle.addEventListener('click', function() {
          sideMenu.classList.toggle('active');
          body.classList.toggle('menu-open');
      });
      
      // 메뉴 외부 클릭시 닫기
      document.addEventListener('click', function(e) {
          if (!sideMenu.contains(e.target) && !menuToggle.contains(e.target)) {
              sideMenu.classList.remove('active');
              body.classList.remove('menu-open');
          }
      });
      
      // ESC 키로 메뉴 닫기
      document.addEventListener('keydown', function(e) {
          if (e.key === 'Escape') {
              sideMenu.classList.remove('active');
              body.classList.remove('menu-open');
          }
      });
  }
  
  // ===== 이미지 로드 에러 처리 =====
  const images = document.querySelectorAll('.film-photo img');
  images.forEach(img => {
      img.addEventListener('error', function() {
          // 이미지 로드 실패시 플레이스홀더 표시
          this.style.backgroundColor = '#f3f4f6';
          this.style.border = '2px dashed #d1d5db';
          this.style.display = 'flex';
          this.style.alignItems = 'center';
          this.style.justifyContent = 'center';
          this.style.minHeight = '200px';
          this.alt = '이미지를 불러올 수 없습니다';
      });
      
      img.addEventListener('load', function() {
          // 이미지 로드 성공시 페이드인 효과
          this.style.opacity = '0';
          this.style.transition = 'opacity 0.5s ease';
          setTimeout(() => {
              this.style.opacity = '1';
          }, 50);
      });
  });
  
  // ===== 부드러운 스크롤 =====
  const navLinks = document.querySelectorAll('.side-menu a[href^="#"]');
  navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href').substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
              targetElement.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
              });
              
              // 메뉴 닫기
              sideMenu.classList.remove('active');
              body.classList.remove('menu-open');
          }
      });
  });
  
  // ===== 페이지 로딩 완료 표시 =====
  window.addEventListener('load', function() {
      document.body.classList.add('loaded');
      console.log('Korea 인터뷰 페이지 로딩 완료');
  });
  
  // ===== 반응형 처리 =====
  function handleResize() {
      const container = document.querySelector('.container');
      if (window.innerWidth <= 768) {
          container?.classList.add('mobile');
      } else {
          container?.classList.remove('mobile');
      }
  }
  
  window.addEventListener('resize', handleResize);
  handleResize(); // 초기 실행
  
});
