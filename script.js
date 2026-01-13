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

// Mobile menu
function toggleMobileMenu() {
    const menu = document.getElementById("navLinks");
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

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
            let count = 0;
            const target = +el.dataset.count;
            const interval = setInterval(() => {
                count++;
                el.textContent = count;
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
    btn.addEventListener("click", () => {
        const answer = btn.nextElementSibling;
        const icon = btn.querySelector(".faq-icon");

        const open = answer.style.display === "block";
        answer.style.display = open ? "none" : "block";
        icon.textContent = open ? "+" : "−";
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
