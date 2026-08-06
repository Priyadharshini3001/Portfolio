/* ============================================
   MAIN JAVASCRIPT - Navigation & Interactions
   ============================================ */

// ========== DOM Elements ==========
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const loadingScreen = document.getElementById('loading-screen');
const pageWrapper = document.querySelector('.page-wrapper');

// ========== Initialization ==========
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollAnimations();
    initFormHandling();
    initPageTransitions();
    initTypingEffect();
    initProgressBars();
    initRepositoryFilters();
    hideLoadingScreen();
});

// ========== Navigation ==========
function initNavigation() {
    // Hamburger Menu Toggle
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
            updateActiveLink(link);
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container')) {
            closeMobileMenu();
        }
    });

    // Update active link on page load
    updateActiveNavigation();
}

function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    spans.forEach((span, index) => {
        if (navMenu.classList.contains('active')) {
            if (index === 0) span.style.transform = 'rotate(45deg) translate(8px, 8px)';
            if (index === 1) span.style.opacity = '0';
            if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            span.style.transform = 'none';
            span.style.opacity = '1';
        }
    });
}

function closeMobileMenu() {
    navMenu.classList.remove('active');
    const spans = hamburger.querySelectorAll('span');
    spans.forEach(span => {
        span.style.transform = 'none';
        span.style.opacity = '1';
    });
}

function updateActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.remove('active');
        
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

function updateActiveLink(link) {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
}

// ========== Page Transitions ==========
function initPageTransitions() {
    // Add animation classes to sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            section.style.transition = 'all 0.6s ease-out';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// ========== Typing Effect ==========
function initTypingEffect() {
    const typingTexts = [
        "Computer Science Engineering Graduate",
        "Automation Testing Enthusiast",
        "Python Backend Developer",
        "Full-Stack Developer"
    ];

    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const delayBetweenTexts = 2000;

    function type() {
        const currentText = typingTexts[textIndex];

        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        // When typing is complete
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, delayBetweenTexts);
            return;
        }

        // When deletion is complete
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingTexts.length;
            setTimeout(type, 500);
            return;
        }

        const speed = isDeleting ? deletingSpeed : typingSpeed;
        setTimeout(type, speed);
    }

    // Start typing effect after a delay
    setTimeout(() => {
        typingElement.classList.add('active');
        type();
    }, 2000);
}

// ========== Form Handling ==========
function initFormHandling() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validation
        if (!name || !email || !subject || !message) {
            showFormStatus('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showFormStatus('Please enter a valid email', 'error');
            return;
        }

        // Simulate form submission
        showFormStatus('Sending message...', 'loading');

        setTimeout(() => {
            // In a real application, you would send this data to a backend
            console.log({
                name,
                email,
                subject,
                message,
                timestamp: new Date().toISOString()
            });

            showFormStatus('Message sent successfully! Thank you for reaching out.', 'success');
            contactForm.reset();

            // Clear success message after 5 seconds
            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.className = '';
            }, 5000);
        }, 1500);
    });
}

function showFormStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;

    if (type === 'error') {
        formStatus.style.color = '#ef4444';
    } else if (type === 'success') {
        formStatus.style.color = '#10b981';
    } else if (type === 'loading') {
        formStatus.style.color = '#00d9ff';
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ========== Scroll Animations ==========
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements that need scroll reveal
    const revealElements = document.querySelectorAll(
        'section, .stat-card, .skill-card, .project-card, .timeline-item, ' +
        '.featured-card, .repo-card, .execution-card, .tool-card, .soft-skill-card, ' +
        '.cert-card, .info-item, .highlight-card, .resume-item, .skill-column'
    );

    revealElements.forEach(element => {
        if (!element.classList.contains('visible')) {
            observer.observe(element);
        }
    });
}

// ========== Progress Bars Animation ==========
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');

    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressValue = entry.target.style.getPropertyValue('--progress');
                entry.target.style.width = progressValue;
                barObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    progressBars.forEach(bar => {
        barObserver.observe(bar);
    });
}

// ========== Repository Filters ==========
function initRepositoryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const repoCards = document.querySelectorAll('.repo-card');
    const repoSearch = document.getElementById('repo-search');

    // Filter by category
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            repoCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-filter') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Search functionality
    if (repoSearch) {
        repoSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();

            repoCards.forEach(card => {
                const title = card.querySelector('.repo-header h3').textContent.toLowerCase();
                const description = card.querySelector('.repo-description').textContent.toLowerCase();

                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        });
    }
}

// ========== Loading Screen ==========
function hideLoadingScreen() {
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.remove('active');
        }, 500);
    }
}

function showLoadingScreen() {
    if (loadingScreen) {
        loadingScreen.classList.add('active');
    }
}

// ========== Smooth Scrolling ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ========== Keyboard Navigation ==========
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMobileMenu();
    }

    // Tab navigation highlight
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ========== Intersection Observer for Parallax ==========
const parallaxElements = document.querySelectorAll('[data-parallax]');
if (parallaxElements.length > 0) {
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const scrollPosition = window.pageYOffset;
            const elementOffset = element.offsetTop;
            const distance = scrollPosition - elementOffset;
            element.style.transform = `translateY(${distance * 0.5}px)`;
        });
    });
}

// ========== Performance Optimization ==========
let scrollTimeout;
let isScrolling = false;

window.addEventListener('scroll', () => {
    if (!isScrolling) {
        isScrolling = true;
        document.body.classList.add('is-scrolling');
    }

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        isScrolling = false;
        document.body.classList.remove('is-scrolling');
    }, 100);
}, { passive: true });

// ========== Local Storage for User Preferences ==========
function saveUserPreference(key, value) {
    try {
        localStorage.setItem(`portfolio_${key}`, JSON.stringify(value));
    } catch (e) {
        console.log('LocalStorage not available');
    }
}

function getUserPreference(key, defaultValue) {
    try {
        const value = localStorage.getItem(`portfolio_${key}`);
        return value ? JSON.parse(value) : defaultValue;
    } catch (e) {
        return defaultValue;
    }
}

// Save theme preference
function saveThemePreference() {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    saveUserPreference('theme', isDarkMode ? 'dark' : 'light');
}

// ========== Console Welcome Message ==========
console.log(
    '%cWelcome to Priyadharshini S Portfolio!',
    'color: #00d9ff; font-size: 16px; font-weight: bold;'
);
console.log(
    '%cMade with 💜 using HTML, CSS & JavaScript',
    'color: #7c3aed; font-size: 14px;'
);

// ========== Page Visibility API ==========
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Tab is now hidden');
    } else {
        console.log('Tab is now visible');
    }
});

// ========== Network Status ==========
window.addEventListener('online', () => {
    console.log('You are back online');
});

window.addEventListener('offline', () => {
    console.log('You are offline');
    formStatus.textContent = 'You are offline. Please check your connection.';
    formStatus.style.color = '#ef4444';
});

// ========== Prevent FOUC (Flash of Unstyled Content) ==========
document.documentElement.style.visibility = 'visible';

// ========== Auto-update Active Navigation on Page Load ==========
window.addEventListener('load', () => {
    updateActiveNavigation();
});

// Export functions for external use
window.portfolio = {
    showLoadingScreen,
    hideLoadingScreen,
    showFormStatus,
    saveUserPreference,
    getUserPreference
};
