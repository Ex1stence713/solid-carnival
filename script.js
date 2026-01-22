// Progress bar
window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    document.getElementById("readingProgress").style.width = (scrollTop / height) * 100 + "%";

    const scrollBtn = document.getElementById("scrollTop");
    scrollBtn.style.display = scrollTop > 400 ? "block" : "none";
});

// Scroll top
document.getElementById("scrollTop").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Mobile menu
function toggleMobileMenu() {
    const menu = document.getElementById("navLinks");
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const menu = document.getElementById("navLinks");
        menu.style.display = "none";
    });
});

// Skills animation
const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            bar.style.width = bar.dataset.width + "%";
            skillObserver.unobserve(bar);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll(".skill-progress").forEach(bar => {
    skillObserver.observe(bar);
});

// Stats counter
const statObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            
            // Skip if already animated
            if (el.dataset.animated === 'true') return;
            el.dataset.animated = 'true';
            
            let count = 0;
            const target = +el.dataset.count;
            const increment = target > 100 ? Math.ceil(target / 30) : 1;
            
            const interval = setInterval(() => {
                count = Math.min(count + increment, target);
                el.textContent = count.toLocaleString('pl-PL');
                if (count >= target) clearInterval(interval);
            }, 30);
            
            statObserver.unobserve(el);
        }
    });
}, { threshold: 0.6 });

document.querySelectorAll(".stat-number").forEach(stat => {
    statObserver.observe(stat);
});

// FAQ
document.querySelectorAll(".faq-question").forEach(btn => {
    btn.addEventListener("click", function() {
        const item = this.closest('.faq-item');
        const answer = this.nextElementSibling;
        const icon = this.querySelector(".faq-icon");
        const isOpen = answer.style.display === "block";
        
        // Close all other FAQ items
        document.querySelectorAll('.faq-item').forEach(faqItem => {
            if (faqItem !== item) {
                faqItem.querySelector('.faq-answer').style.display = 'none';
                faqItem.querySelector('.faq-icon').textContent = '+';
            }
        });
        
        // Toggle current item
        answer.style.display = isOpen ? "none" : "block";
        icon.textContent = isOpen ? "+" : "−";
    });
});

// Lightbox
function openLightbox(img) {
    document.getElementById("lightboxImg").src = img.src;
    document.getElementById("lightbox").style.display = "flex";
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

// Theme toggle function
function applyTheme(theme) {
    const body = document.body;
    if (theme === 'light') {
        body.classList.add('light-theme');
    } else {
        body.classList.remove('light-theme');
    }
    localStorage.setItem('theme', theme);
}

const themeToggle = document.getElementById('themeToggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0.95';
    observer.observe(section);
});
// Chrome extension message
chrome.runtime.sendMessage({type: "notify"}, (response) => {
    if (chrome.runtime.lastError) {
        console.warn("Błąd powiadomienia:", chrome.runtime.lastError.message);
        return;
    }
    console.log("Odpowiedź:", response);
});
