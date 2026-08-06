/* ============================================
   PREMIUM ANIMATIONS ENGINE
   Advanced JavaScript for Award-Winning Portfolio
   ============================================ */

class PremiumAnimations {
    constructor() {
        this.init();
    }

    init() {
        // Initialize all premium animation features
        this.setupScrollReveal();
        this.setupParallax();
        this.setupMagneticButtons();
        this.setupCardTilt();
        this.setupCursorTrail();
        this.setupTextAnimations();
        this.setupFloatingElements();
        this.setupMouseGlow();
        this.setupPageTransitions();
        this.setupSmootherScroll();
    }

    /* ============================================
       SCROLL REVEAL ANIMATIONS
       ============================================ */

    setupScrollReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add stagger delay based on position
                    const delay = index * 0.1;
                    entry.target.style.setProperty('--reveal-delay', `${delay}s`);
                    entry.target.classList.add('reveal-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all elements that should reveal
        document.querySelectorAll(
            '.glass-card, .project-card, .skill-item, .timeline-item, .stat-card, section'
        ).forEach(el => {
            el.classList.add('reveal-element');
            observer.observe(el);
        });
    }

    /* ============================================
       PARALLAX EFFECT
       ============================================ */

    setupParallax() {
        if (window.matchMedia('(max-width: 768px)').matches) return;

        const parallaxElements = document.querySelectorAll('[data-parallax]');
        if (parallaxElements.length === 0) return;

        let rafId;
        let lastScrollY = window.scrollY;

        const updateParallax = () => {
            const scrollY = window.scrollY;
            const delta = scrollY - lastScrollY;

            parallaxElements.forEach(element => {
                const speed = parseFloat(element.dataset.parallax) || 0.5;
                const yPos = scrollY * speed;
                element.style.transform = `translateY(${yPos}px)`;
            });

            lastScrollY = scrollY;
        };

        window.addEventListener('scroll', () => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(updateParallax);
        }, { passive: true });
    }

    /* ============================================
       MAGNETIC BUTTON EFFECT
       ============================================ */

    setupMagneticButtons() {
        if (window.matchMedia('(max-width: 768px)').matches) return;

        const magneticButtons = document.querySelectorAll('.btn, .project-link, .skill-item');
        
        magneticButtons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                this.handleMagneticMove(e, button);
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = '';
            });
        });
    }

    handleMagneticMove(e, element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const distX = mouseX - centerX;
        const distY = mouseY - centerY;

        const distance = Math.sqrt(distX * distX + distY * distY);
        const maxDistance = 100;

        if (distance < maxDistance) {
            const force = 1 - distance / maxDistance;
            const moveX = (distX / distance) * force * 15;
            const moveY = (distY / distance) * force * 15;

            element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    }

    /* ============================================
       CARD 3D TILT EFFECT
       ============================================ */

    setupCardTilt() {
        if (window.matchMedia('(max-width: 768px)').matches) return;

        const tiltCards = document.querySelectorAll('.project-card, .glass-card');

        tiltCards.forEach(card => {
            card.style.transformStyle = 'preserve-3d';

            card.addEventListener('mousemove', (e) => {
                this.applyCardTilt(e, card);
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    applyCardTilt(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    }

    /* ============================================
       CURSOR TRAIL EFFECT
       ============================================ */

    setupCursorTrail() {
        if (window.matchMedia('(max-width: 768px)').matches) return;

        const trailContainer = document.createElement('div');
        trailContainer.id = 'cursor-trail';
        trailContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 99999;
        `;
        document.body.appendChild(trailContainer);

        let mouseX = 0;
        let mouseY = 0;
        const particles = [];

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Create trail particle
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                left: ${mouseX}px;
                top: ${mouseY}px;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(255, 184, 77, 0.8), rgba(255, 107, 157, 0.6));
                pointer-events: none;
                transform: translate(-50%, -50%);
                box-shadow: 0 0 10px rgba(255, 184, 77, 0.6);
                animation: cursorTrailFade 1s ease-out forwards;
                z-index: 99998;
            `;

            trailContainer.appendChild(particle);

            setTimeout(() => particle.remove(), 1000);
        }, { passive: true });
    }

    /* ============================================
       TEXT ANIMATIONS (Character reveal)
       ============================================ */

    setupTextAnimations() {
        const textElements = document.querySelectorAll('h1, h2, .section-title');

        textElements.forEach(element => {
            const text = element.textContent;
            const chars = text.split('');

            element.innerHTML = chars.map((char, index) => 
                `<span style="animation: charReveal 0.6s ease-out ${index * 0.05}s backwards; display: inline-block; will-change: opacity, transform;">${char}</span>`
            ).join('');
        });
    }

    /* ============================================
       FLOATING ELEMENTS
       ============================================ */

    setupFloatingElements() {
        const floatingElements = document.querySelectorAll('[data-float]');

        floatingElements.forEach((element, index) => {
            const delay = index * 0.2;
            const duration = 3 + Math.random() * 2;

            element.style.animation = `float ${duration}s ease-in-out infinite`;
            element.style.animationDelay = `${delay}s`;
        });
    }

    /* ============================================
       MOUSE GLOW EFFECT
       ============================================ */

    setupMouseGlow() {
        if (window.matchMedia('(max-width: 768px)').matches) return;

        const glow = document.createElement('div');
        glow.id = 'mouse-glow';
        glow.style.cssText = `
            position: fixed;
            width: 300px;
            height: 300px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255, 184, 77, 0.2), transparent);
            pointer-events: none;
            z-index: 1;
            filter: blur(60px);
            transform: translate(-50%, -50%);
        `;
        document.body.appendChild(glow);

        let mouseX = 0;
        let mouseY = 0;
        let glowX = 0;
        let glowY = 0;
        let animationFrameId;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }, { passive: true });

        const updateGlow = () => {
            glowX += (mouseX - glowX) * 0.1;
            glowY += (mouseY - glowY) * 0.1;
            glow.style.left = `${glowX}px`;
            glow.style.top = `${glowY}px`;

            animationFrameId = requestAnimationFrame(updateGlow);
        };

        updateGlow();
    }

    /* ============================================
       PAGE TRANSITION EFFECTS
       ============================================ */

    setupPageTransitions() {
        const links = document.querySelectorAll('a[href$=".html"]');

        links.forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.target === '_blank' || e.metaKey || e.ctrlKey) return;

                e.preventDefault();
                this.pageTransitionOut(link.href);
            });
        });
    }

    pageTransitionOut(href) {
        document.body.style.animation = 'pageExit 0.5s ease-in forwards';
        
        setTimeout(() => {
            window.location.href = href;
        }, 500);
    }

    /* ============================================
       SMOOTH SCROLL ENHANCEMENT
       ============================================ */

    setupSmootherScroll() {
        // Enhance smooth scroll behavior with easing
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                const target = document.querySelector(href);

                if (target) {
                    e.preventDefault();
                    this.smoothScrollTo(target);
                }
            });
        });
    }

    smoothScrollTo(element) {
        const targetPosition = element.getBoundingClientRect().top + window.scrollY - 80;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;

        const easeInOutCubic = (t) => {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        };

        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);

            window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));

            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    }
}

/* ============================================
   SCROLL PROGRESS BAR
   ============================================ */

class ScrollProgressBar {
    constructor() {
        this.bar = document.createElement('div');
        this.bar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 4px;
            background: linear-gradient(90deg, #FFB84D, #FF6B9D, #FF8A65);
            width: 0%;
            z-index: 100;
            transition: width 0.3s ease;
            box-shadow: 0 0 20px rgba(255, 184, 77, 0.6);
        `;
        document.body.appendChild(this.bar);

        window.addEventListener('scroll', () => this.update(), { passive: true });
    }

    update() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        this.bar.style.width = `${scrolled}%`;
    }
}

/* ============================================
   ANIMATED COUNTER
   ============================================ */

class AnimatedCounter {
    constructor() {
        this.init();
    }

    init() {
        const numbers = document.querySelectorAll('.stat-number');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.countUp(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        numbers.forEach(num => observer.observe(num));
    }

    countUp(element) {
        const target = parseInt(element.dataset.target || element.textContent, 10);
        const duration = 2000;
        const steps = 60;
        const stepValue = target / steps;
        const stepDuration = duration / steps;
        let current = 0;

        const counter = setInterval(() => {
            current += stepValue;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(counter);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, stepDuration);
    }
}

/* ============================================
   SMOOTH SCROLL ON LOAD
   ============================================ */

class SmoothLoad {
    constructor() {
        this.animateOnLoad();
    }

    animateOnLoad() {
        // Stagger animate all sections
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            section.style.animation = `fadeInUp 0.8s ease-out ${index * 0.1}s backwards`;
        });
    }
}

/* ============================================
   INTERSECTION OBSERVER FOR ANIMATIONS
   ============================================ */

class ScrollTriggerAnimations {
    constructor() {
        this.init();
    }

    init() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-scroll-visible');
                    // Add specific animations based on class
                    this.applyAnimationByClass(entry.target);
                }
            });
        }, options);

        document.querySelectorAll('.glass-card, .project-card, .skill-item, .timeline-item').forEach(el => {
            observer.observe(el);
        });
    }

    applyAnimationByClass(element) {
        if (element.classList.contains('project-card')) {
            element.style.animation = 'slideInScale 0.8s var(--easing-smooth) backwards';
        } else if (element.classList.contains('skill-item')) {
            element.style.animation = 'bounceIn 0.6s var(--easing-bounce) backwards';
        } else if (element.classList.contains('timeline-item')) {
            element.style.animation = 'slideRotate 0.8s var(--easing-smooth) backwards';
        } else {
            element.style.animation = 'fadeInUp 0.8s var(--easing-smooth) backwards';
        }
    }
}

/* ============================================
   CUSTOM CURSOR
   ============================================ */

class CustomCursor {
    constructor() {
        if (window.matchMedia('(max-width: 768px)').matches) return;

        this.cursor = document.createElement('div');
        this.cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid rgba(255, 184, 77, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 100000;
            transform: translate(-50%, -50%);
            box-shadow: 0 0 10px rgba(255, 184, 77, 0.4);
            transition: all 0.1s ease;
        `;
        document.body.appendChild(this.cursor);

        this.dot = document.createElement('div');
        this.dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(255, 184, 77, 0.8);
            border-radius: 50%;
            pointer-events: none;
            z-index: 100001;
            transform: translate(-50%, -50%);
        `;
        document.body.appendChild(this.dot);

        document.addEventListener('mousemove', (e) => this.update(e), { passive: true });
    }

    update(e) {
        this.cursor.style.left = e.clientX + 'px';
        this.cursor.style.top = e.clientY + 'px';
        this.dot.style.left = e.clientX + 'px';
        this.dot.style.top = e.clientY + 'px';
    }
}

/* ============================================
   INITIALIZE ALL ANIMATIONS ON DOM READY
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Check for reduced motion preference
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        new PremiumAnimations();
        new ScrollProgressBar();
        new AnimatedCounter();
        new SmoothLoad();
        new ScrollTriggerAnimations();
        new CustomCursor();
    }

    // Add reveal styles if not exists
    if (!document.querySelector('style[data-reveal-styles]')) {
        const style = document.createElement('style');
        style.setAttribute('data-reveal-styles', 'true');
        style.textContent = `
            .reveal-element {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.8s var(--easing-smooth), 
                            transform 0.8s var(--easing-smooth);
                transition-delay: var(--reveal-delay, 0s);
            }
            .reveal-visible {
                opacity: 1;
                transform: translateY(0);
            }
            .animate-scroll-visible {
                animation-play-state: running;
            }
            @keyframes cursorTrailFade {
                to {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
});

// Export for use in other contexts
window.PremiumAnimations = PremiumAnimations;
window.ScrollProgressBar = ScrollProgressBar;
window.AnimatedCounter = AnimatedCounter;
window.CustomCursor = CustomCursor;