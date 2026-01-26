// // ======================
// // Aktualizacja czasu
// // ======================
// function updateTime() {
//     const now = new Date();
//     const hours = String(now.getHours()).padStart(2, '0');
//     const minutes = String(now.getMinutes()).padStart(2, '0');
//     const seconds = String(now.getSeconds()).padStart(2, '0');
    
//     document.querySelector('.time').textContent = `${hours}:${minutes}:${seconds}`;
// }
// updateTime();
// setInterval(updateTime, 1000);

// // ======================
// // Obsługa przycisku mute
// // ======================
// const muteBtn = document.querySelector('.mute-btn');
// let isMuted = false;

// muteBtn.addEventListener('click', () => {
//     isMuted = !isMuted;
    
//     if (isMuted) {
//         muteBtn.innerHTML = `
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//                 <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
//                 <line x1="23" y1="9" x2="17" y2="15"></line>
//                 <line x1="17" y1="9" x2="23" y2="15"></line>
//             </svg>
//         `;
//     } else {
//         muteBtn.innerHTML = `
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//                 <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
//                 <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
//                 <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
//             </svg>
//         `;
//     }
// });

// const enterScreen = document.getElementById('enter-screen');
// const enterBtn = document.getElementById('enter-btn');

// function enterWebsite() {
//     enterScreen.classList.add('hidden');
//     const links = document.querySelectorAll('.link-card');
//     links.forEach((link, index) => {
//         link.style.opacity = '0';
//         link.style.transform = 'translateY(20px)';
        
//         setTimeout(() => {
//             link.style.transition = 'all 0.5s ease';
//             link.style.opacity = '1';
//             link.style.transform = 'translateY(0)';
//         }, (index + 1) * 100);
//     });
// }
// document.addEventListener('DOMContentLoaded', () => {
//     const enterScreen = document.getElementById('enter-screen');

//     // kliknięcie w cały ekran
//     enterScreen.addEventListener('click', enterWebsite);

//     // wciśnięcie Enter
//     document.addEventListener('keydown', (e) => {
//         if(e.key === 'Enter') {
//             enterWebsite();
//         }
//     });
// });

// // ======================
// // Poprawiona wersja animacji cząsteczek neonowych
// // ======================
// const canvas = document.createElement('canvas');
// canvas.id = 'particles';
// document.body.appendChild(canvas);
// const ctx = canvas.getContext('2d');

// const enterCanvas = document.getElementById('enter-canvas');
// const enterCtx = enterCanvas.getContext('2d');

// let w = enterCanvas.width = window.innerWidth;
// let h = enterCanvas.height = window.innerHeight;

// let width = canvas.width = window.innerWidth;
// let height = canvas.height = window.innerHeight;

// window.addEventListener('resize', () => {
//     width = canvas.width = window.innerWidth;
//     height = canvas.height = window.innerHeight;
//     w = enterCanvas.width = window.innerWidth;
//     h = enterCanvas.height = window.innerHeight;
// });

// const particles = [], particlesEnter = [];
// const numParticles = 80, numParticlesEnter = 40;

// // zwykłe cząsteczki
// for(let i = 0; i < numParticles; i++) {
//     particles.push({
//         x: Math.random() * width,
//         y: Math.random() * height,
//         radius: Math.random() * 3 + 1,
//         speedX: (Math.random() - 0.5) * 0.5,
//         speedY: (Math.random() - 0.5) * 0.5,
//         color: `hsl(${Math.random()*360}, 100%, 50%)`,
//         isMouse: false
//     });
// }
// for(let i = 0; i < numParticlesEnter; i++) {
//     particlesEnter.push({
//         x: Math.random() * width,
//         y: Math.random() * height,
//         radius: Math.random() * 3 + 1,
//         speedX: (Math.random() - 0.5) * 0.5,
//         speedY: (Math.random() - 0.5) * 0.5,
//         color: `hsl(${Math.random()*360}, 100%, 50%)`,
//         isMouse: false
//     });
// }

// // dodajemy punkt myszy
// const mouseIndex = particles.push({ x: -100, y: -100, radius: 0, isMouse: true });

// window.addEventListener('mousemove', (e) => {
//     particles[mouseIndex] = { x: e.clientX, y: e.clientY, radius: 0, isMouse: true };
// });

// // animacja
// function animateParticles() {
//     ctx.clearRect(0, 0, width, height);
//     enterCtx.clearRect(0, 0, width, height);

//     for(let p of particles){
//         if(!p.isMouse){
//             p.x += p.speedX;
//             p.y += p.speedY;

//             if(p.x < 0 || p.x > width) p.speedX *= -1;
//             if(p.y < 0 || p.y > height) p.speedY *= -1;
            
//             ctx.beginPath();
//             ctx.arc(p.x, p.y, p.radius, 0, Math.PI*2);
//             ctx.fillStyle = p.color || '#fff';
//             ctx.shadowColor = p.color || '#fff';
//             ctx.shadowBlur = 8;
//             ctx.fill();
//         }
//     }
//     for(let p of particlesEnter){
//             p.x += p.speedX;
//             p.y += p.speedY;

//             if(p.x < 0 || p.x > width) p.speedX *= -1;
//             if(p.y < 0 || p.y > height) p.speedY *= -1;
            
//             enterCtx.beginPath();
//             enterCtx.arc(p.x, p.y, p.radius, 0, Math.PI*2);
//             enterCtx.fillStyle = p.color || '#fff';
//             enterCtx.shadowColor = p.color || '#fff';
//             enterCtx.shadowBlur = 8;
//             enterCtx.fill();
//     }

//     // linie między punktami
//     for(let i =0; i<particles.length; i++){
//         for(let j=i+1; j<particles.length; j++){
//             const dx = particles[i].x - particles[j].x;
//             const dy = particles[i].y - particles[j].y;
//             const dist = Math.sqrt(dx*dx + dy*dy);
//             if(dist < 120){
//                 ctx.beginPath();
//                 ctx.moveTo(particles[i].x, particles[i].y);
//                 ctx.lineTo(particles[j].x, particles[j].y);
//                 ctx.strokeStyle = `rgba(138,43,226, ${1 - dist/120})`;
//                 ctx.lineWidth = 0.5;
//                 ctx.stroke();
//             }
//         }
//     }

//     requestAnimationFrame(animateParticles);
// }

// animateParticles();

// async function getDataFromLoomCat() {
//     const request = await fetch("https://loom.cat/api/v1/users/1087829498810073269")
//     const body = await request.json().catch(e => {
//         console.warn(e)
//         return null
//     }) 

//     if (!body || body.error) {
//         //logika błędu
//         return
//     }

//     const statustext = document.getElementById("dis-status")
//     statustext.innerText = { dnd: "Nie przeszkadzać", online: "Obecny", idle: "Zaraz wracam", offline: "Niewidoczny" }[body.status]
// }

const DISCORD_ID = "1087829498810073269";
const LFM_USER = "_nighthunter_.";
const LFM_API_KEY = "0d22a6285362338637e9fe9eb97a1fd0";
const music = document.getElementById('bg-music');
let vol = 0.2

function launch() {
    document.getElementById('overlay').style.display = 'none';
    music.volume = 0.2; music.play();
    document.getElementById('bg-video').play();
}

function toggleMute() {
    music.muted = !music.muted;
    document.getElementById('mute-icon').className = `fa ${music.muted ? "fa-volume-mute" : "fa-volume-up"}`
    document.getElementById('volmeeter').value = music.muted ? '0' : Math.max(vol * 100, 1).toString()
}

function vc() {
    const ovolbool = vol > 0
    const volbool = Number(document.getElementById('volmeeter').value) > 0
    if (!music.muted || volbool) {
        music.volume = vol = Number(document.getElementById('volmeeter').value) / 100
        if (volbool != ovolbool || music.muted) {
            toggleMute()
        }
    }
    setTimeout(vc, 100)
}
vc()

function copy() {
    navigator.clipboard.writeText('._nighthunter_.');
    const n = document.getElementById('notification');
    n.classList.add('show');
    setTimeout(() => n.classList.remove('show'), 2000);
}

function updateClock() {
    document.getElementById('clock').innerText = new Date().toLocaleTimeString('pl-PL', { hour12: false });
}

async function updateData() {
    console.log("Ładowanie profilu")
    const r = await fetch(`https://loom.cat/api/v1/users/${DISCORD_ID}`);
    console.log("Ładowanie zakończone!")
    try {
        const data = await r.json();
        document.getElementById('av').src = data.metadata.avatar_url;
        const statusNames = { online: 'Dostępny', dnd: 'Nie przeszkadzać', idle: 'Zaraz wracam', offline: 'Niewidoczny' };
        const statusColors = { online: '#43b581', dnd: '#f04747', idle: '#faa61a', offline: '#747f8d' };
        document.getElementById('dis-status').innerText = statusNames[data.status] || 'Offline';
        document.getElementById('status-dot').style.background = statusColors[data.status] || '#747f8d';
    } catch(e) {
        console.warn(e)
    }

    // try {
    //     const r = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LFM_USER}&api_key=${LFM_API_KEY}&format=json&limit=1`);
    //     const data = await r.json();
    //     const track = data.recenttracks.track[0];
    //     const isPlaying = track['@attr'] && track['@attr'].nowplaying === 'true';
    //     const tile = document.getElementById('lfm-tile');
    //     if(isPlaying) {
    //         tile.style.display = 'flex';
    //         document.getElementById('lfm-track').innerText = `${track.name} - ${track.artist['#text']}`;
    //         document.getElementById('lfm-img').src = track.image[2]['#text'];
    //     } else {
    //         tile.style.display = 'none';
    //     }
    // } catch(e) {}
}

setInterval(updateClock, 1000);
setInterval(updateData, 10000);
updateData();
updateClock();

const audio = document.getElementById('myAudio');
  function showAbout() {
    document.getElementById("home").style.display = "none";
    document.getElementById("about").style.display = "block";
        document.getElementById("image-gallery").style.display = "block";
    document.querySelector(".btn-about").style.display = "none";
    document.querySelector(".btn-back").style.display = "inline-block";
  }

  function showHome() {
    document.getElementById("about").style.display = "none";
    document.getElementById("home").style.display = "block";
    document.getElementById("image-gallery").style.display = "block";
    document.querySelector(".btn-back").style.display = "none";
    document.querySelector(".btn-about").style.display = "inline-block";
  }
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && ['c','u','s','x','a'].includes(e.key.toLowerCase())) {
        e.preventDefault();
    }
});
// Lista zdjęć (w folderze images/)
const images = [
  "images/img1.jpg",
  "images/img2.jpg",
  "images/img3.jpg",
  "images/img4.jpg",
  "images/img5.jpg",
  "images/img6.jpg"
];

const galleryGrid = document.getElementById("galleryGrid");

images.forEach((src, index) => {
  const img = document.createElement("img");
  img.src = src;
  img.alt = `Zdjęcie ${index + 1}`;
  img.style.animation = `fadeUp 0.6s ease forwards`;
  img.style.animationDelay = `${index * 0.1}s`;
  galleryGrid.appendChild(img);
});

// Keyframes dodajemy dynamicznie przez JS (opcjonalnie)
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}`;
document.head.appendChild(style);
img.style.animation = `fadeUp 0.6s ease forwards`;
img.style.animationDelay = `${index * 0.08}s`;

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

// Dodaj kliknięcie do każdego zdjęcia galerii
document.querySelectorAll('.gallery-grid img').forEach(img => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src; // pokazujemy to samo zdjęcie
  });
});

// Funkcja zamykania
function closeLightbox() {
  lightbox.style.display = 'none';
  lightboxImg.src = '';
}
