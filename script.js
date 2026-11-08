
/* =====================================
   MOBILE NAVIGATION
===================================== */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show");
    });
});


/* =====================================
   PORTFOLIO TABS
===================================== */

const tabButtons = document.querySelectorAll(".tab-btn");
const workPanels = document.querySelectorAll(".work-panel");

tabButtons.forEach(button => {

    button.addEventListener("click", () => {

        const category = button.dataset.category;

        tabButtons.forEach(tab => {
            tab.classList.remove("active");
        });

        workPanels.forEach(panel => {
            panel.classList.remove("active");
        });

        button.classList.add("active");

        const selectedPanel = document.getElementById(category);

        selectedPanel.classList.add("active");

    });

});


/* =====================================
   IMAGE LIGHTBOX
===================================== */

const galleryImages = document.querySelectorAll(".gallery-item img");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");

galleryImages.forEach(image => {

    image.addEventListener("click", () => {

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";

    });

});

function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
}

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", event => {

    if (event.target === lightbox) {
        closeLightbox();
    }

});

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeLightbox();
    }

});


/* =====================================
   SCROLL REVEAL ANIMATIONS
===================================== */

// Automatically add reveal animation classes

const revealElements = document.querySelectorAll(
    ".section-heading, .about-content, .stats, " +
    ".service-card, .gallery-item, .video-card, " +
    ".experience-item, .skills-list span, .contact-content"
);

revealElements.forEach((element, index) => {

    element.classList.add("reveal");

    // Small stagger delay for grouped elements
    if (
        element.classList.contains("service-card") ||
        element.classList.contains("gallery-item") ||
        element.classList.contains("video-card") ||
        element.classList.contains("experience-item") ||
        element.classList.contains("skills-list")
    ) {
        element.style.transitionDelay = `${(index % 4) * 100}ms`;
    }

});


// Observe elements when they enter the screen

const revealObserver = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* =====================================
   ANIMATED COUNTERS
===================================== */

const counterElements = document.querySelectorAll(".stat-item h3");

const counterObserver = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const element = entry.target;
        const originalText = element.textContent.trim();

        const number = parseInt(originalText.replace(/\D/g, ""), 10);

        if (Number.isNaN(number)) {
            observer.unobserve(element);
            return;
        }

        const suffix = originalText.includes("+") ? "+" : "";
        const duration = 1500;
        const startTime = performance.now();

        function updateCounter(currentTime) {

            const progress = Math.min(
                (currentTime - startTime) / duration,
                1
            );

            const easedProgress = 1 - Math.pow(1 - progress, 4);

            const currentNumber = Math.floor(number * easedProgress);

            element.textContent = currentNumber + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = originalText;
            }

        }

        requestAnimationFrame(updateCounter);

        observer.unobserve(element);

    });

}, {
    threshold: 0.6
});

counterElements.forEach(element => {
    counterObserver.observe(element);
});


/* =====================================
   ACTIVE NAVIGATION ON SCROLL
===================================== */

const pageSections = document.querySelectorAll("section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a");

const activeSectionObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const currentId = entry.target.id;

        navigationLinks.forEach(link => {

            link.classList.remove("active-link");

            if (link.getAttribute("href") === `#${currentId}`) {
                link.classList.add("active-link");
            }

        });

    });

}, {
    rootMargin: "-35% 0px -55% 0px"
});

pageSections.forEach(section => {
    activeSectionObserver.observe(section);
});


/* =====================================
   SMOOTH SCROLL FOR ANCHOR LINKS
===================================== */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


/* =====================================
   PAUSE OTHER VIDEOS WHEN ONE PLAYS
===================================== */

const portfolioVideos = document.querySelectorAll(".video-card video");

portfolioVideos.forEach(video => {

    video.addEventListener("play", () => {

        portfolioVideos.forEach(otherVideo => {

            if (otherVideo !== video) {
                otherVideo.pause();
            }

        });

    });

});


/* =====================================
   PREVENT LIGHTBOX SCROLL
===================================== */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        document.body.style.overflow = "";
    }

});
