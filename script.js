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
