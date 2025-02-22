// Navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        navMenu.classList.remove('active');
    });
});

// Typed.js
new Typed('.typed-text', {
    strings: ['Junior Software Developer', 'Team Collaborator', 'Solution Builder'],
    typeSpeed: 60,
    backSpeed: 40,
    loop: true
});

// Skill Bars
const animateSkills = () => {
    document.querySelectorAll('.skill-bar').forEach(bar => {
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = bar.dataset.width;
        }, 500);
    });
};

// Contact Form
const form = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name && email.includes('@') && message) {
        formMessage.textContent = 'Thanks for reaching out! I’ll get back to you soon.';
        form.reset();
        setTimeout(() => formMessage.textContent = '', 3000);
    } else {
        formMessage.textContent = 'Please fill out all fields correctly.';
    }
});

// Back to Top
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
    backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
});

// Scroll Animations
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.id === 'experience') animateSkills();
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.section').forEach(section => observer.observe(section));

// GitHub Calendar
GitHubCalendar(".calendar", "dipakcode1710", {
    responsive: true,
    tooltips: true
});