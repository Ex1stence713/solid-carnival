  // Smooth reveal on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(el => {
      if (el.isIntersecting) {
        el.target.style.opacity = '1';
        el.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.project-card, .stat, .skill-item, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // ── DYNAMIC VIDEO LOADER ──
  // Lista filmów w folderze videos/
  // Dodaj nowe filmy tutaj po wrzuceniu ich do folderu videos/
  const videoList = [ { file: '0328.mp4', title: 'Mój zmontowany film', desc: 'Film jest krótki, ale pokazuje moje umiejętności montażowe. Zmontowany z różnych ujęć, z dynamicznym cięciem i dobrą muzyką.' },
    // Przykład: { file: 'film1.mp4', title: 'Mój pierwszy film', desc: 'Opis filmu' },
    // Dodaj więcej filmów tutaj...
  ];

  function loadVideos() {
    const videosGrid = document.getElementById('videos-grid');
    
    if (!videosGrid) return;
    
    // Wyczyść siatkę
    videosGrid.innerHTML = '';
    
    if (videoList.length === 0) {
      // Pokaż placeholder jeśli nie ma filmów
      videosGrid.innerHTML = `
        <div class="video-card" style="grid-column: 1 / -1;">
          <div class="video-wrapper">
            <div class="video-placeholder">
              <svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              <p>Dodaj filmy do folderu <strong>videos/</strong></p>
              <p style="font-size: 12px; margin-top: 8px; opacity: 0.7;">
                Wrzuć pliki wideo (.mp4, .webm, .mov) do folderu videos/<br>
                i zaktualizuj listę w pliku script.js
              </p>
            </div>
          </div>
        </div>
      `;
      return;
    }
    
    // Dodaj każdy film z listy
    videoList.forEach((video, index) => {
      const videoCard = document.createElement('div');
      videoCard.className = 'video-card';
      videoCard.style.opacity = '0';
      videoCard.style.transform = 'translateY(20px)';
      videoCard.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      
      videoCard.innerHTML = `
        <div class="video-wrapper">
          <video 
            controls 
            preload="metadata"
            poster=""
          >
            <source src="videos/${video.file}" type="video/mp4">
            Twoja przeglądarka nie obsługuje tagu video.
          </video>
        </div>
        <div class="video-info">
          <h3 class="video-title">${video.title || 'Film ' + (index + 1)}</h3>
          <p class="video-desc">${video.desc || 'Kliknij, aby odtworzyć'}</p>
        </div>
      `;
      
      videosGrid.appendChild(videoCard);
      
      // Animuj pojawienie się
      setTimeout(() => {
        videoCard.style.opacity = '1';
        videoCard.style.transform = 'translateY(0)';
      }, 100 * (index + 1));
    });
  }

  // Załaduj filmy po załadowaniu strony
  document.addEventListener('DOMContentLoaded', loadVideos);
