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
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const name = this.querySelector('input[name="name"]').value.trim();
            const email = this.querySelector('input[name="email"]').value.trim();
            const subject = this.querySelector('input[name="subject"]').value.trim();
            const message = this.querySelector('textarea[name="message"]').value.trim();

            if (!name || !email || !subject || !message) {
                showAlert('Please fill all the fields!', 'error');
                return;
            }

            if (!validateEmail(email)) {
                showAlert('Please enter a valid email address!', 'error');
                return;
            }

            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            const formData = new FormData(this);

            try {
                const response = await fetch('/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams(formData).toString()
                });

                if (!response.ok) {
                    throw new Error('Form submission failed');
                }

                showAlert('Your message has been sent successfully!', 'success');
                this.reset();
            } catch (error) {
                console.error('Contact form submission error:', error);
                showAlert('Unable to send message right now. Please try again later.', 'error');
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        });
    }

    // Phone link handling
    const phoneLink = document.querySelector('.phone-link');
    if (phoneLink) {
        phoneLink.addEventListener('click', function(e) {
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            if (!isMobile) {
                e.preventDefault();
                showAlert('Phone calls are only available on mobile devices!', 'error');
            }
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

// ---- Microservices Architecture Animation ----
let currentFlow = 'all';
let msPackets = [];

const msNodes = {
    react:    { el: 'n-react' },
    gateway:  { el: 'n-gateway' },
    eureka:   { el: 'n-eureka' },
    order:    { el: 'n-order' },
    planning: { el: 'n-planning' },
    vehicle:  { el: 'n-vehicle' },
    customer: { el: 'n-customer' }
};

const msFlows = {
    all: [
        { from: 'react',    to: 'gateway',  color: '#5d8bf4', label: 'HTTP' },
        { from: 'gateway',  to: 'order',    color: '#5d8bf4', label: 'route' },
        { from: 'gateway',  to: 'customer', color: '#5d8bf4', label: 'route' },
        { from: 'order',    to: 'planning', color: '#f59e0b', label: 'Feign' },
        { from: 'planning', to: 'vehicle',  color: '#f59e0b', label: 'Feign' },
        { from: 'vehicle',  to: 'customer', color: '#f59e0b', label: 'Feign' },
        { from: 'order',    to: 'eureka',   color: '#7c3aed', label: 'register' },
        { from: 'planning', to: 'eureka',   color: '#7c3aed', label: 'register' },
        { from: 'vehicle',  to: 'eureka',   color: '#7c3aed', label: 'register' },
        { from: 'customer', to: 'eureka',   color: '#7c3aed', label: 'register' },
        { from: 'gateway',  to: 'eureka',   color: '#7c3aed', label: 'discover' }
    ],
    order: [
        { from: 'react',    to: 'gateway',  color: '#5d8bf4', label: 'POST /order' },
        { from: 'gateway',  to: 'order',    color: '#5d8bf4', label: 'route' },
        { from: 'order',    to: 'planning', color: '#f59e0b', label: 'getPlanningById' },
        { from: 'planning', to: 'vehicle',  color: '#f59e0b', label: 'getVehicle' },
        { from: 'vehicle',  to: 'customer', color: '#f59e0b', label: 'getOwner' }
    ],
    customer: [
        { from: 'react',    to: 'gateway',  color: '#5d8bf4', label: 'POST /customer' },
        { from: 'gateway',  to: 'customer', color: '#5d8bf4', label: 'route' },
        { from: 'customer', to: 'eureka',   color: '#7c3aed', label: 'register' }
    ],
    discovery: [
        { from: 'order',    to: 'eureka',   color: '#7c3aed', label: 'heartbeat' },
        { from: 'planning', to: 'eureka',   color: '#7c3aed', label: 'heartbeat' },
        { from: 'vehicle',  to: 'eureka',   color: '#7c3aed', label: 'heartbeat' },
        { from: 'customer', to: 'eureka',   color: '#7c3aed', label: 'heartbeat' },
        { from: 'gateway',  to: 'eureka',   color: '#7c3aed', label: 'discover' }
    ]
};

const msStatusLabels = {
    all:       'All services running — animating communication flows',
    order:     'Order creation flow: React → Gateway → Order → Planning → Vehicle → Customer',
    customer:  'Customer registration: React → Gateway → Customer Service → Eureka',
    discovery: 'Eureka service discovery: all services sending heartbeats'
};

function setFlow(name, btn) {
    currentFlow = name;
    document.querySelectorAll('.ms-toggle button').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    const statusEl = document.getElementById('ms-status-text');
    if (statusEl) statusEl.textContent = msStatusLabels[name];
    drawMsLines();
}

function getMsCenter(id) {
    const canvas = document.getElementById('ms-canvas');
    const el = document.getElementById(id);
    if (!el || !canvas) return { x: 0, y: 0 };
    const cr = canvas.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    return { x: er.left - cr.left + er.width / 2, y: er.top - cr.top + er.height / 2 };
}

function drawMsLines() {
    const svg = document.getElementById('ms-svg');
    const canvas = document.getElementById('ms-canvas');
    if (!svg || !canvas) return;

    const W = canvas.clientWidth, H = canvas.clientHeight;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);

    msPackets.forEach(p => p.el && p.el.remove());
    msPackets = [];

    const activeFlows = msFlows[currentFlow];
    let svgContent = `<defs>
        <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </marker>
    </defs>`;

    activeFlows.forEach(flow => {
        const a = getMsCenter(msNodes[flow.from].el);
        const b = getMsCenter(msNodes[flow.to].el);
        const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
        const dx = b.x - a.x, dy = b.y - a.y;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        const ox = -dy / len * 22, oy = dx / len * 22;
        svgContent += `
            <path d="M${a.x},${a.y} Q${mx + ox},${my + oy} ${b.x},${b.y}" fill="none" stroke="${flow.color}" stroke-width="1.5" stroke-opacity="0.35" stroke-dasharray="5 4" marker-end="url(#arr)"/>
            <text x="${mx + ox * 1.4}" y="${my + oy * 1.4}" fill="${flow.color}" font-size="9" text-anchor="middle" font-family="monospace" opacity="0.7">${flow.label}</text>
        `;
    });
    svg.innerHTML = svgContent;

    activeFlows.forEach((flow, i) => {
        setTimeout(() => spawnMsPacket(flow), i * 600);
    });
}

function spawnMsPacket(flow) {
    const canvas = document.getElementById('ms-canvas');
    if (!canvas) return;

    const dot = document.createElement('div');
    dot.className = 'ms-packet';
    dot.style.background = flow.color;
    dot.style.boxShadow = `0 0 6px ${flow.color}`;
    canvas.appendChild(dot);

    const packet = { el: dot, flow, t: 0 };
    msPackets.push(packet);

    function animatePacket() {
        const a = getMsCenter(msNodes[flow.from].el);
        const b = getMsCenter(msNodes[flow.to].el);
        const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
        const dx = b.x - a.x, dy = b.y - a.y;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        const ox = -dy / len * 22, oy = dx / len * 22;

        packet.t += 0.015;
        if (packet.t > 1) {
            packet.t = 0;
            setTimeout(() => {
                if (msFlows[currentFlow].includes(flow)) animatePacket();
                else dot.remove();
            }, 1200 + Math.random() * 800);
            return;
        }

        const t = packet.t, mt = 1 - t;
        const cx = mx + ox, cy = my + oy;
        const x = mt * mt * a.x + 2 * mt * t * cx + t * t * b.x;
        const y = mt * mt * a.y + 2 * mt * t * cy + t * t * b.y;
        dot.style.left = (x - 5) + 'px';
        dot.style.top  = (y - 5) + 'px';
        requestAnimationFrame(animatePacket);
    }
    animatePacket();
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (document.getElementById('ms-canvas')) drawMsLines();
    }, 500);
    window.addEventListener('resize', () => {
        if (document.getElementById('ms-canvas')) drawMsLines();
    });
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