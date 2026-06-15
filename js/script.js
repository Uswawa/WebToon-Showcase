// ===== Intersection Observer for Scroll Animations =====
document.addEventListener('DOMContentLoaded', function () {
    initializeScrollAnimations();
    initializeNavigation();
});

/**
 * Initialize Scroll Animations
 */
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateElement(entry.target);
            } else {
                // Reset animation when element leaves viewport
                resetAnimation(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with scroll-animate class
    const elementsToAnimate = document.querySelectorAll('.scroll-animate');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Apply animation to element based on data attribute
 */
function animateElement(element) {
    const animationType = element.getAttribute('data-animation') || 'fade-in-up';
    const animationDelay = element.getAttribute('data-delay') || '0s';

    // Convert kebab-case to camelCase (e.g., 'fade-in-left' -> 'fadeInLeft')
    const camelCaseAnimation = animationType.replace(/-([a-z])/g, (g) => g[1].toUpperCase());

    // Set animation styles
    element.style.animation = `${camelCaseAnimation} 0.6s ease-out forwards`;
    element.style.animationDelay = animationDelay;
    element.style.opacity = '1';
}

/**
 * Reset animation when element leaves viewport
 */
function resetAnimation(element) {
    element.style.animation = 'none';
    element.style.opacity = '0';
    
    // Trigger reflow to restart animation on next trigger
    void element.offsetWidth;
}

/**
 * Smooth scroll navigation
 */
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

