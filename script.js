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

// Opinion Form Handler
const opinionForm = document.getElementById('opinionForm');
if (opinionForm) {
    opinionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            project: document.getElementById('project').value,
            rating: document.getElementById('rating').value,
            message: document.getElementById('message').value,
            email: document.getElementById('email').value,
            date: new Date().toLocaleDateString('pl-PL'),
            id: Date.now()
        };
        
        // Pobierz istniejące opinie z localStorage
        let opinions = JSON.parse(localStorage.getItem('userOpinions')) || [];
        
        // Dodaj nową opinię
        opinions.unshift(formData);
        
        // Zapisz do localStorage (max 50 opinii)
        opinions = opinions.slice(0, 50);
        localStorage.setItem('userOpinions', JSON.stringify(opinions));
        
        // Pokaż wiadomość sukcesu
        const submitBtn = opinionForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = '✅ Opinia dodana! Dziękuję!';
        submitBtn.style.background = '#2ecc71';
        opinionForm.reset();
        
        // Odśwież listę opinii
        displayUserOpinions();
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
        }, 3000);
        
        // Scroll do opinii (jeśli istnieje element)
        const opinionsSection = document.getElementById('userOpinionsContainer');
        if (opinionsSection) {
            opinionsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

// Wyświetl opinie użytkowników
function displayUserOpinions() {
    console.log('🔍 displayUserOpinions() called');
    const opinions = JSON.parse(localStorage.getItem('userOpinions')) || [];
    const opinionsContainer = document.getElementById('userOpinionsContainer');
    
    console.log('📦 Opinie z localStorage:', opinions);
    console.log('🎯 Container znaleziony:', !!opinionsContainer, opinionsContainer);
    
    if (!opinionsContainer) {
        console.warn('⚠️ Brak elementu #userOpinionsContainer!');
        return;
    }
    
    if (opinions.length === 0) {
        console.log('⚠️ Brak opinii w localStorage');
        opinionsContainer.innerHTML = '<div class="empty" style="grid-column: 1 / -1;"><p>Brak opinii. Bądź pierwszym, który oceni moją pracę!</p></div>';
        return;
    }
    
    console.log('✅ Renderuję', opinions.length, 'opinii');
    opinionsContainer.innerHTML = opinions.map((opinion, index) => {
        const stars = '⭐'.repeat(opinion.rating) + '☆'.repeat(5 - opinion.rating);
        return `
            <div class="user-opinion-card" style="animation-delay: ${index * 0.1}s;">
                <div style="display: flex; justify-content: space-between; align-items: start;">
                    <div style="flex: 1;">
                        <div class="stars">${stars}</div>
                        <p class="opinion-text">"${opinion.message}"</p>
                        <div class="opinion-author">
                            <strong>${opinion.name}</strong>
                            <small>${opinion.project} • ${opinion.date}</small>
                        </div>
                    </div>
                    <button class="btn-delete-opinion" onclick="deleteOpinion(${opinion.id})" title="Usuń opinię" style="background: none; border: none; color: var(--accent); cursor: pointer; font-size: 18px; padding: 0;">✕</button>
                </div>
            </div>
        `;
    }).join('');
    
    // Uruchom carousel opinii
    setTimeout(() => {
        startOpinionsCarousel();
    }, 100);
}

// Usuń opinię
function deleteOpinion(id) {
    let opinions = JSON.parse(localStorage.getItem('userOpinions')) || [];
    opinions = opinions.filter(op => op.id !== id);
    localStorage.setItem('userOpinions', JSON.stringify(opinions));
    displayUserOpinions();
}

// Carousel rotation dla opinii
let rotationIndex = 0;
let rotationInterval = null;

function rotateTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    if (testimonials.length <= 1) return;

    const container = document.querySelector('.testimonials-grid');
    if (!container) return;

    // Dodaj animację wychodzenia
    testimonials[rotationIndex].style.opacity = '0.3';
    testimonials[rotationIndex].style.transform = 'scale(0.95)';

    rotationIndex = (rotationIndex + 1) % testimonials.length;

    // Następna opinia
    setTimeout(() => {
        testimonials.forEach((card, i) => {
            if (i === rotationIndex) {
                card.style.animation = 'none';
                setTimeout(() => {
                    card.style.animation = '';
                }, 10);
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
                card.style.order = '-1';
            } else {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
                card.style.order = '';
            }
        });
    }, 300);
}

// Opinie użytkowników - carousel
function startOpinionsCarousel() {
    const container = document.getElementById('userOpinionsContainer');
    if (!container) return;

    // Rotuj co 5 sekund
    let currentIndex = 0;
    
    setInterval(() => {
        const cards = container.querySelectorAll('.user-opinion-card');
        if (cards.length <= 1) return;

        // Dodaj animację wychodzenia dla bieżącej karty
        cards.forEach((card, i) => {
            card.style.animation = 'none';
        });

        cards[currentIndex].style.animation = 'slideCarousel 0.6s ease-out reverse';
        
        currentIndex = (currentIndex + 1) % cards.length;
        
        setTimeout(() => {
            cards.forEach((card, i) => {
                if (i === currentIndex) {
                    card.style.order = '-1';
                    card.style.animation = 'slideCarousel 0.6s ease-out both';
                } else {
                    card.style.order = '';
                }
            });
        }, 300);
    }, 6000);
}

// Załaduj opinie na starcie
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        displayUserOpinions();
        startOpinionsCarousel();
    }, 100);
});

// Również załaduj od razu (na wypadek gdyby DOM był już gotowy)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', displayUserOpinions);
} else {
    displayUserOpinions();
}

// DEBUG: Dodaj testowe opinie jeśli localStorage jest pusty
if (!localStorage.getItem('userOpinions') || JSON.parse(localStorage.getItem('userOpinions')).length === 0) {
    const testOpinions = [
        {
            name: "Jan Kowalski",
            project: "Strona Internetowa",
            rating: 5,
            message: "Strona Internetowa została wykonana perfekcyjnie! Paweł jest bardzo profesjonalny i terminowy.",
            email: "jan@example.com",
            date: "15.01.2026",
            id: Date.now()
        },
        {
            name: "NexusTM",
            project: "Discord Bot",
            rating: 5,
            message: "Paweł zrobił bota dokładnie tak jak chcieliśmy. Szybko, profesjonalnie i bez problemów. Polecam!",
            email: "maria@example.com",
            date: "14.01.2026",
            id: Date.now() - 1
        }
    ];
    localStorage.setItem('userOpinions', JSON.stringify(testOpinions));
    displayUserOpinions();
    console.log('✅ Testowe opinie dodane do localStorage');
} else {
    console.log('📊 Opinie z localStorage:', JSON.parse(localStorage.getItem('userOpinions')));
}
