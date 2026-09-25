const pageLoader = document.getElementById('page-loader');
const loaderBar = document.getElementById('loader-progress-bar');
const loaderPercent = document.getElementById('loader-percent');
const loaderMessage = document.getElementById('loader-message');
const loaderProgress = document.querySelector('.loader-progress');

if (pageLoader && loaderBar && loaderPercent && loaderMessage && loaderProgress) {
  const messages = [
    [15, 'Uruchamiam projekt...'],
    [40, 'Ładuję zasoby...'],
    [70, 'Układam interfejs...'],
    [90, 'Prawie gotowe...']
  ];
  let progress = 0;
  let messageIndex = 0;
  const loaderStartedAt = Date.now();
  const minimumLoaderTime = 1000; // 1.0 second

  const updateLoader = (value) => {
    progress = Math.min(value, 100);
    loaderBar.style.width = `${progress}%`;
    loaderPercent.textContent = `${progress}%`;
    loaderProgress.setAttribute('aria-valuenow', progress);

    if (messageIndex < messages.length && progress >= messages[messageIndex][0]) {
      loaderMessage.textContent = messages[messageIndex][1];
      messageIndex += 1;
    }
  };

  const loadingInterval = window.setInterval(() => {
    if (progress < 90) {
      updateLoader(progress + Math.ceil(Math.random() * 8));
    }
  }, 180);

  window.addEventListener('load', () => {
    window.clearInterval(loadingInterval);
    const finishLoading = () => {
      updateLoader(100);
      loaderMessage.textContent = 'Gotowe!';
      window.setTimeout(() => pageLoader.classList.add('is-hidden'), 500);
    };
    const remainingTime = minimumLoaderTime - (Date.now() - loaderStartedAt);

    window.setTimeout(finishLoading, Math.max(remainingTime, 0));
  });
}

const bgDots = document.getElementById('bg-dots');

if (bgDots) {
  const particleCount = 26;
  const palette = ['#dfeeff', '#9fc9ff', '#d8f1d0', '#d7c29d', '#f5e6a9'];

  for (let i = 0; i < particleCount; i++) {
    const dot = document.createElement('span');
    dot.className = 'dot-particle';

    const size = Math.random() * 8 + 5;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const duration = Math.random() * 18 + 16;
    const delay = Math.random() * 10;

    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.left = `${left}%`;
    dot.style.top = `${top}%`;
    dot.style.background = `linear-gradient(135deg, ${palette[i % palette.length]}, rgba(255,255,255,0.75))`;
    dot.style.animationDuration = `${duration}s`;
    dot.style.animationDelay = `${delay}s`;

    bgDots.appendChild(dot);
  }
}

const revealItems = document.querySelectorAll('.reveal, .info-card, .project-card, .feature-item, .timeline-item, .music-card, .contact-panel, .contact-intro');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  }
);

revealItems.forEach((item) => {
  item.classList.add('reveal');
  revealObserver.observe(item);
});

const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons.length > 0 && projectCards.length) {
filterButtons.forEach((buttton) => {
  button.addEventListener('click', () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((filterButton) => {
      filterButton.classList.remove('active');
    });
    button.classList.add('active');

    projectCards.forEach((card) => {
      const cardCategory = card.dataset.category;
      const shouldShow = selectedFilter === 'all' || cardCategory === selectedFilter;
      card.style.display = shouldShow ? 'block' : 'none';
    });
  });
});
}