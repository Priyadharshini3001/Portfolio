/* ============================================
   PREMIUM FUTURISTIC PORTFOLIO
   Advanced Animations & Interactive Effects
   ============================================ */

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    initLoadingAnimation();
    initParticleSystem();
    initCursorFollower();
    initScrollEffects();
    initCardAnimations();
    initNavbar();
    initThemeToggle();
    initCounterAnimations();
    initPageTransitions();
    initFloatingElements();
    initBackToTop();
});

// ========== LOADING ANIMATION ==========
function initLoadingAnimation() {
    const loader = document.querySelector('.loading');
    if (!loader) return;

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 800);
    });
}

// ========== PARTICLE SYSTEM ==========
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.init();
    }

    init() {
        this.canvas.id = 'particle-canvas';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        document.body.appendChild(this.canvas);
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.createParticles();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 1.5,
                opacity: Math.random() * 0.5 + 0.2,
                color: ['#00D4FF', '#7B61FF', '#FF4FD8'][Math.floor(Math.random() * 3)]
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) p.x = this.canvas.width;
            if (p.x > this.canvas.width) p.x = 0;
            if (p.y < 0) p.y = this.canvas.height;
            if (p.y > this.canvas.height) p.y = 0;

            this.ctx.fillStyle = p.color;
            this.ctx.globalAlpha = p.opacity;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fill();
        });

        this.ctx.globalAlpha = 1;
        requestAnimationFrame(() => this.animate());
    }
}

// ========== CURSOR FOLLOWER ==========
class CursorFollower {
    constructor() {
        this.follower = document.createElement('div');
        this.follower.className = 'cursor-follower visible';
        document.body.appendChild(this.follower);
        
        this.x = 0;
        this.y = 0;
        this.mouseX = 0;
        this.mouseY = 0;
        
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        this.animate();
    }

    animate() {
        this.x += (this.mouseX - this.x) * 0.2;
        this.y += (this.mouseY - this.y) * 0.2;

        this.follower.style.left = this.x - 15 + 'px';
        this.follower.style.top = this.y - 15 + 'px';

        requestAnimationFrame(() => this.animate());
    }
}

// ========== CARD TILT EFFECT ==========
class CardTilt {
    constructor() {
        this.cards = document.querySelectorAll('.glass-card, .project-card, .skill-card');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => this.handleTilt(e, card));
            card.addEventListener('mouseleave', () => this.resetTilt(card));
        });
    }

    handleTilt(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateZ(20px)
        `;

        const glow = (x / rect.width) * 100;
        card.style.backgroundPosition = `${glow}% 0%`;
    }

    resetTilt(card) {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    }
}

// ========== SCROLL EFFECTS ==========
function initScrollEffects() {
    const scrollProgress = document.querySelector('.scroll-progress');
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        // Update progress bar
        if (scrollProgress) {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        }

        // Navbar shrink effect
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Reveal animations
        revealOnScroll();
    }, { passive: true });
}

function revealOnScroll() {
    const elements = document.querySelectorAll('[data-reveal]');
    
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;

        if (isVisible && !el.classList.contains('revealed')) {
            el.classList.add('revealed');
            el.style.animation = `fade-in-up 0.8s ease-out`;
        }
    });
}

// ========== ANIMATED COUNTERS ==========
function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-count]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ========== CARD ANIMATIONS ==========
function initCardAnimations() {
    new CardTilt();
    
    const cards = document.querySelectorAll('.glass-card, .project-card, .skill-card, .dashboard-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.animation = `fade-in-up 0.8s ease-out ${index * 0.1}s forwards`;
    });
}

// ========== NAVBAR ANIMATIONS ==========
function initNavbar() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }

        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Page transition
            createPageTransition();
        });
    });
}

function createPageTransition() {
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    document.body.appendChild(transition);

    setTimeout(() => {
        transition.remove();
    }, 500);
}

// ========== THEME TOGGLE ==========
function initThemeToggle() {
    const toggle = document.querySelector('.theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';

    if (!toggle) {
        createThemeToggle();
        return;
    }

    document.body.classList.add(savedTheme + '-mode');
    
    toggle.addEventListener('click', () => {
        const newTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
        
        document.body.classList.remove('dark-mode', 'light-mode');
        document.body.classList.add(newTheme + '-mode');
        
        toggle.classList.toggle('light');
        localStorage.setItem('theme', newTheme);
    });
}

function createThemeToggle() {
    const toggle = document.createElement('button');
    toggle.className = 'theme-toggle';
    toggle.innerHTML = '<div class="theme-toggle-circle"></div>';
    
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.appendChild(toggle);
    }

    initThemeToggle();
}

// ========== PAGE TRANSITIONS ==========
function initPageTransitions() {
    const links = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"])');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href && !href.startsWith('javascript:') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
                e.preventDefault();
                
                const transition = document.createElement('div');
                transition.className = 'page-transition';
                document.body.appendChild(transition);

                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
}

// ========== FLOATING ELEMENTS ==========
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('[data-float]');

    floatingElements.forEach((el, index) => {
        const duration = 4 + index * 0.5;
        el.style.animation = `float ${duration}s ease-in-out infinite`;
    });
}

// Add float animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
    }

    @keyframes fade-in-up {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes glow-pulse {
        0%, 100% { box-shadow: 0 0 20px rgba(0, 212, 255, 0.4); }
        50% { box-shadow: 0 0 40px rgba(0, 212, 255, 0.6); }
    }

    .glass-card {
        position: relative;
        background-position: 0% 0%;
        background-size: 200% 200%;
    }

    .glass-card:hover {
        animation: glow-pulse 1.5s ease-in-out;
    }
`;
document.head.appendChild(style);

// ========== BACK TO TOP BUTTON ==========
function initBackToTop() {
    let backToTop = document.querySelector('.back-to-top');
    
    if (!backToTop) {
        backToTop = document.createElement('button');
        backToTop.className = 'back-to-top';
        backToTop.innerHTML = '↑';
        document.body.appendChild(backToTop);
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ========== TYPING ANIMATION ==========
function initTypingAnimation() {
    const typingElement = document.querySelector('[data-typing]');
    if (!typingElement) return;

    const texts = typingElement.getAttribute('data-typing').split('|');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, 2000);
            return;
        }

        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500);
            return;
        }

        setTimeout(type, isDeleting ? 50 : 100);
    }

    type();
}

// ========== SKILL CIRCLE PROGRESS ==========
function animateSkillCircles() {
    const circles = document.querySelectorAll('.skill-progress-circle circle:nth-child(2)');

    circles.forEach(circle => {
        const percentage = parseInt(circle.parentElement.getAttribute('data-percentage')) || 0;
        const radius = circle.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        
        circle.style.strokeDasharray = circumference;
        circle.style.strokeDashoffset = circumference;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const offset = circumference - (percentage / 100) * circumference;
                circle.style.transition = 'stroke-dashoffset 2s ease-out';
                circle.style.strokeDashoffset = offset;
            }
        }, { threshold: 0.5 });

        observer.observe(circle);
    });
}

// ========== PARALLAX SCROLLING ==========
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    window.addEventListener('scroll', () => {
        parallaxElements.forEach(el => {
            const scrollPosition = window.scrollY;
            const elementOffset = el.offsetTop;
            const distance = scrollPosition - elementOffset;
            
            el.style.transform = `translateY(${distance * 0.5}px)`;
        });
    }, { passive: true });
}

// ========== HERO SECTION ANIMATIONS ==========
function initHeroAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');

    if (heroTitle) {
        heroTitle.style.animation = 'fade-in-up 0.8s ease-out';
    }

    if (heroSubtitle) {
        heroSubtitle.style.animation = 'fade-in-up 0.8s ease-out 0.2s backwards';
    }

    if (heroButtons) {
        heroButtons.style.animation = 'fade-in-up 0.8s ease-out 0.4s backwards';
    }

    initTypingAnimation();
}

// ========== SMOOTH SCROLL ==========
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ========== PROJECT CARD HOVER ANIMATION ==========
function initProjectAnimations() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ========== INIT ALL ANIMATIONS ON PAGE LOAD ==========
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ParticleSystem();
        new CursorFollower();
        initParallax();
        initHeroAnimations();
        initSmoothScroll();
        initProjectAnimations();
        animateSkillCircles();
    });
} else {
    new ParticleSystem();
    new CursorFollower();
    initParallax();
    initHeroAnimations();
    initSmoothScroll();
    initProjectAnimations();
    animateSkillCircles();
}

// ========== MOUSE GLOW EFFECT ==========
document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    document.querySelectorAll('.mouse-glow').forEach(el => {
        const rect = el.getBoundingClientRect();
        const isNear = Math.hypot(
            x - (rect.left + rect.width / 2),
            y - (rect.top + rect.height / 2)
        ) < 200;

        if (isNear) {
            el.style.boxShadow = `0 0 40px rgba(0, 212, 255, 0.3)`;
        } else {
            el.style.boxShadow = `0 0 0px rgba(0, 212, 255, 0)`;
        }
    });
});

// ========== FORM ANIMATIONS ==========
function initFormAnimations() {
    const inputs = document.querySelectorAll('.form-input, .form-textarea');

    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.3)';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.boxShadow = 'none';
        });
    });

    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            if (this.form.checkValidity()) {
                this.style.animation = 'success-pulse 0.6s ease-out';
                setTimeout(() => {
                    this.style.animation = '';
                }, 600);
            }
        });
    }
}

initFormAnimations();

// ========== VIEWPORT ANIMATIONS ==========
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            animateOnScroll.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('[data-animate]').forEach(el => {
    animateOnScroll.observe(el);
});

// ========== EXPORT FUNCTIONS ==========
window.PortfolioAnimations = {
    ParticleSystem,
    CursorFollower,
    CardTilt
};
/* ===========================
   Footer
=========================== */
