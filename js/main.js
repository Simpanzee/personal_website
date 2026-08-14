const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcon.onclick = () => {
    navLinks.classList.toggle('active');
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Scroll-reveal: fade/slide elements in as they enter the viewport
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
    if (prefersReducedMotion) {
        revealEls.forEach(el => el.classList.add('visible'));
    } else {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        revealEls.forEach(el => revealObserver.observe(el));
    }
}

// Typewriter effect on the hero role text (e.g. "Game Developer")
const roleEl = document.querySelector('.info-box .text > span');
if (roleEl && !prefersReducedMotion) {
    const fullText = roleEl.textContent;
    roleEl.textContent = '';
    roleEl.classList.add('typewriter');
    let charIndex = 0;
    const typeNextChar = () => {
        roleEl.textContent = fullText.slice(0, charIndex);
        charIndex++;
        if (charIndex <= fullText.length) {
            setTimeout(typeNextChar, 75);
        }
    };
    typeNextChar();
}

// Highlight the nav link for whichever section is currently in view
const sections = document.querySelectorAll('section[id]');
const hashNavLinks = document.querySelectorAll('.nav-links a[href^="#"]');
if (sections.length && hashNavLinks.length) {
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                hashNavLinks.forEach(a => {
                    a.classList.toggle('active-link', a.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(sec => navObserver.observe(sec));
}

const projectsCarousel = document.querySelector('#projectsCarousel');
const prevProjectBtn = document.querySelector('#prevProject');
const nextProjectBtn = document.querySelector('#nextProject');

if (projectsCarousel && prevProjectBtn && nextProjectBtn) {
    const getScrollAmount = () => {
        const card = projectsCarousel.querySelector('.project-card');
        const cardStyle = getComputedStyle(projectsCarousel);
        const gap = parseFloat(cardStyle.gap) || 0;
        return card ? card.offsetWidth + gap : projectsCarousel.offsetWidth;
    };

    prevProjectBtn.onclick = () => {
        projectsCarousel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    };

    nextProjectBtn.onclick = () => {
        projectsCarousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    };
}