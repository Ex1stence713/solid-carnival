const DISCORD_ID = "1087829498810073269";
const LFM_USER = "_nighthunter_.";
const LFM_API_KEY = "0d22a6285362338637e9fe9eb97a1fd0";
const GITHUB_USER = "Ex1stence713";

const audio = document.getElementById('bg-audio');
let isMuted = true;

// Grid Canvas
const canvas = document.getElementById('grid');
const ctx = canvas.getContext('2d', { alpha: true });

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resizeCanvas, 250);
});

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const gridSize = 50;
    ctx.strokeStyle = 'rgba(0, 255, 159, 0.1)';
    ctx.lineWidth = 1;

    for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

drawGrid();
window.addEventListener('resize', drawGrid);

// Welcome Screen
const welcomeScreen = document.getElementById('welcome-screen');
const mainContent = document.getElementById('main-content');
const enterBtn = document.getElementById('enter-btn');

function enterSite() {
    welcomeScreen.classList.add('hidden');
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
        mainContent.classList.remove('hidden');
    }, 500);

    const volume = volumeSlider.value / 100;
    audio.volume = volume;
    
    if (volume > 0) {
        audio.play().catch(e => console.warn('Audio blocked:', e));
    }

    animateCards();
    animateSkills();
}

enterBtn.addEventListener('click', enterSite);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !welcomeScreen.classList.contains('hidden')) {
        enterSite();
    }
});

function animateCards() {
    const cards = document.querySelectorAll('.social-card');
    cards.forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, i * 50);
    });
}

function animateSkills() {
    const skills = document.querySelectorAll('.skill-progress');
    skills.forEach((skill, i) => {
        const targetWidth = skill.style.width;
        skill.style.width = '0';
        setTimeout(() => {
            skill.style.width = targetWidth;
        }, 500 + i * 100);
    });
}

// Sound Toggle
const soundToggle = document.getElementById('sound-toggle');
const volumeSlider = document.getElementById('volume-slider');
const volumePercent = document.getElementById('volume-percent');

function updateVolume() {
    const volume = volumeSlider.value / 100;
    audio.volume = volume;
    volumePercent.textContent = volumeSlider.value + '%';
    
    const icon = soundToggle.querySelector('i');
    if (volumeSlider.value == 0) {
        icon.className = 'fas fa-volume-mute';
        isMuted = true;
        audio.muted = true;
    } else {
        if (volumeSlider.value < 50) {
            icon.className = 'fas fa-volume-down';
        } else {
            icon.className = 'fas fa-volume-up';
        }
        isMuted = false;
        audio.muted = false;
    }
}

volumeSlider.addEventListener('input', updateVolume);

soundToggle.addEventListener('click', () => {
    if (volumeSlider.value == 0) {
        volumeSlider.value = 30;
    } else {
        volumeSlider.value = 0;
    }
    updateVolume();
    
    if (!audio.paused || volumeSlider.value > 0) {
        audio.play().catch(e => console.warn('Audio blocked:', e));
    }
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const icon = themeToggle.querySelector('i');
    icon.className = document.body.classList.contains('light-theme') ? 'fas fa-sun' : 'fas fa-moon';
});

// Clock
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
}

updateClock();
setInterval(updateClock, 1000);

// Copy Discord
function copyDiscord() {
    navigator.clipboard.writeText('_nighthunter_.');
    showToast();
}

function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Discord Status
let discordCache = null;
let lastDiscordUpdate = 0;
const DISCORD_CACHE_TIME = 30000;

async function updateDiscord() {
    const now = Date.now();
    
    if (discordCache && (now - lastDiscordUpdate < DISCORD_CACHE_TIME)) {
        return;
    }

    try {
        const response = await fetch(`https://loom.cat/api/v1/users/${DISCORD_ID}`);
        const data = await response.json();

        discordCache = data;
        lastDiscordUpdate = now;

        const avatar = document.getElementById('avatar');
        if (avatar) {
            avatar.src = data.metadata.avatar_url;
        }

        const statusMap = {
            online: { text: 'Dostępny', color: '#00ff9f' },
            dnd: { text: 'Nie przeszkadzać', color: '#ff0055' },
            idle: { text: 'Zaraz wracam', color: '#ffaa00' },
            offline: { text: 'Niewidoczny', color: '#808080' }
        };

        const status = statusMap[data.status] || statusMap.offline;
        
        const statusText = document.getElementById('status-text');
        const discordStatus = document.getElementById('discord-status');
        
        if (statusText) statusText.textContent = status.text;
        if (discordStatus) discordStatus.style.background = status.color;

    } catch (error) {
        console.error('Discord API error:', error);
    }
}

// Spotify/Last.fm
let spotifyCache = null;
let lastSpotifyUpdate = 0;
const SPOTIFY_CACHE_TIME = 10000;

async function updateSpotify() {
    const now = Date.now();
    
    if (spotifyCache && (now - lastSpotifyUpdate < SPOTIFY_CACHE_TIME)) {
        return;
    }

    try {
        const response = await fetch(
            `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LFM_USER}&api_key=${LFM_API_KEY}&format=json&limit=1`
        );
        const data = await response.json();
        const track = data.recenttracks.track[0];
        
        if (!track) return;

        spotifyCache = track;
        lastSpotifyUpdate = now;

        const isPlaying = track['@attr'] && track['@attr'].nowplaying === 'true';
        const widget = document.getElementById('spotify-widget');

        if (isPlaying) {
            widget.style.display = 'block';
            
            const trackName = document.getElementById('track-name');
            const trackArtist = document.getElementById('track-artist');
            const albumCover = document.getElementById('album-cover');
            
            if (trackName) trackName.textContent = track.name;
            if (trackArtist) trackArtist.textContent = track.artist['#text'];
            
            const albumArt = track.image[2]['#text'];
            if (albumArt && albumCover) {
                albumCover.src = albumArt;
            }
        } else {
            widget.style.display = 'none';
        }

    } catch (error) {
        console.error('Last.fm API error:', error);
    }
}

// GitHub Stats
async function updateGithubStats() {
    try {
        const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USER}`);
        const userData = await userResponse.json();
        
        const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100`);
        const reposData = await reposResponse.json();
        
        let totalStars = 0;
        let totalCommits = 0;
        
        reposData.forEach(repo => {
            totalStars += repo.stargazers_count;
        });
        
        const reposEl = document.getElementById('github-repos');
        const starsEl = document.getElementById('total-stars');
        const commitsEl = document.getElementById('github-commits');
        const totalCommitsEl = document.getElementById('total-commits');
        
        if (reposEl) {
            animateValue(reposEl, 0, userData.public_repos, 1500);
        }
        if (starsEl) {
            animateValue(starsEl, 0, totalStars, 1500);
        }
        
        for (const repo of reposData.slice(0, 10)) {
            try {
                const commitsResponse = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${repo.name}/commits?per_page=1`);
                const linkHeader = commitsResponse.headers.get('Link');
                
                if (linkHeader) {
                    const match = linkHeader.match(/page=(\d+)>; rel="last"/);
                    if (match) {
                        totalCommits += parseInt(match[1]);
                    }
                } else {
                    const commits = await commitsResponse.json();
                    totalCommits += commits.length;
                }
            } catch (e) {
                console.warn(`Could not fetch commits for ${repo.name}`);
            }
        }
        
        if (commitsEl) {
            animateValue(commitsEl, 0, Math.min(totalCommits, 999), 2000);
        }
        if (totalCommitsEl) {
            animateValue(totalCommitsEl, 0, Math.min(totalCommits, 999), 2000);
        }
        
        generateGithubChart();
        
    } catch (error) {
        console.error('GitHub API error:', error);
    }
}

function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = end.toString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toString();
        }
    }, 16);
}

function generateGithubChart() {
    const chart = document.getElementById('github-chart');
    if (!chart) return;
    
    chart.innerHTML = '';
    
    const today = new Date();
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    
    for (let i = 0; i < 365; i++) {
        const day = document.createElement('div');
        day.className = 'github-day';
        
        const level = Math.floor(Math.random() * 5);
        day.setAttribute('data-level', level);
        
        const date = new Date(oneYearAgo);
        date.setDate(date.getDate() + i);
        day.title = date.toLocaleDateString();
        
        chart.appendChild(day);
    }
}

// Uptime Animation
let uptimeValue = 99.9;
function animateUptime() {
    const uptimeEl = document.getElementById('uptime');
    if (uptimeEl) {
        uptimeValue = 99.0 + Math.random() * 0.9;
        uptimeEl.textContent = uptimeValue.toFixed(1) + '%';
    }
}

setInterval(animateUptime, 5000);

// Initialize
function init() {
    updateDiscord();
    updateSpotify();
    updateGithubStats();
    
    setInterval(updateDiscord, 30000);
    setInterval(updateSpotify, 10000);
}

init();

// Matrix Rain Effect
const matrixBg = document.getElementById('matrix-bg');
let matrixChars = '01';

function createMatrixChar() {
    const char = document.createElement('span');
    char.textContent = matrixChars[Math.floor(Math.random() * matrixChars.length)];
    char.style.position = 'absolute';
    char.style.left = Math.random() * 100 + '%';
    char.style.top = '-20px';
    char.style.color = 'rgba(0, 255, 159, 0.3)';
    char.style.fontSize = '14px';
    char.style.fontFamily = 'monospace';
    char.style.animation = `fall ${3 + Math.random() * 2}s linear`;
    char.style.pointerEvents = 'none';
    
    matrixBg.appendChild(char);
    
    setTimeout(() => {
        char.remove();
    }, 5000);
}

setInterval(createMatrixChar, 500);

const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
