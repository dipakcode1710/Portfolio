// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });

    // Change navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(5, 19, 103, 0.9)';
            navbar.style.padding = '0.5rem 2rem';
        } else {
            navbar.style.background = 'var(--dark-color)';
            navbar.style.padding = '1rem 2rem';
        }
    });

    // Enhanced typing animation with cursor
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = "Hi, I'm Dipak Suryawanshi";
        heroTitle.innerHTML = '<span class="typing-text"></span><span class="cursor">|</span>';
        const typingText = heroTitle.querySelector('.typing-text');
        const cursor = heroTitle.querySelector('.cursor');
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                cursor.style.animation = 'blink 0.7s infinite';
            }
        };
        setTimeout(typeWriter, 500);
    }

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.querySelector('input[placeholder="Your Name"]').value;
            const email = this.querySelector('input[placeholder="Your Email"]').value;
            const subject = this.querySelector('input[placeholder="Subject"]').value;
            const message = this.querySelector('textarea').value;
            
            if (!name || !email || !subject || !message) {
                showAlert('Please fill all the fields!', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showAlert('Please enter a valid email address!', 'error');
                return;
            }
            
            showAlert('Your message has been sent successfully!', 'success');
            this.reset();
        });
    }

    // Function to validate email
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Function to show alert messages
    function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`;
        alertDiv.setAttribute('role', 'alert');
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        if (contactForm) {
            contactForm.parentNode.insertBefore(alertDiv, contactForm);
        }
        setTimeout(() => {
            alertDiv.classList.remove('show');
            setTimeout(() => alertDiv.remove(), 300);
        }, 5000);
    }

    // Add GitHub Contribution Calendar
    const calendarContainer = document.querySelector('#contribution-graph');
    if (calendarContainer) {
        try {
            GitHubCalendar("#contribution-graph", "dipakcode1710", {
                responsive: true,
                tooltips: true,
                global_stats: true,
                summary_text: "My coding activity over the past year."
            }).then(() => {
                console.log("GitHub Calendar loaded successfully");
            }).catch(error => {
                console.error("Error loading GitHub Calendar:", error);
                const fallback = document.querySelector('.github-fallback');
                if (fallback) {
                    fallback.style.display = 'block';
                }
                calendarContainer.style.display = 'none';
            });
        } catch (error) {
            console.error("GitHub Calendar initialization failed:", error);
            const fallback = document.querySelector('.github-fallback');
            if (fallback) {
                fallback.style.display = 'block';
            }
            calendarContainer.style.display = 'none';
        }
    }

    // Add animation to skill cards on scroll
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    window.addEventListener('scroll', () => {
        skillCards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            if (cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    });

    // Add animation to project cards on scroll
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    window.addEventListener('scroll', () => {
        projectCards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            if (cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    });

    // Staggered animation for education cards
    const educationCards = document.querySelectorAll('.education-card');
    educationCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.2}s, transform 0.5s ease ${index * 0.2}s`;
    });

    window.addEventListener('scroll', () => {
        educationCards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            if (cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateX(0)';
            }
        });
    });

    // Project filter functionality
    const projectTags = document.querySelectorAll('.tech-tag');
    projectTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const technology = this.textContent.trim().toLowerCase();
            this.classList.toggle('active-filter');
            console.log(`Filter clicked: ${technology}`);
        });
    });
});

// Add preloader
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 500);
    }
});

// Add CSS for cursor animation
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .cursor {
            display: inline-block;
            margin-left: 5px;
            animation: none;
        }
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});