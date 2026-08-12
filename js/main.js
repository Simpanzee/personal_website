const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcon.onclick = () => {
    navLinks.classList.toggle('active');
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