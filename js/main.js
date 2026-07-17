// Academic Website - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initAnimations();
    initMobileMenu();
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-item a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
        
        // Smooth scrolling for anchor links
        if (href.startsWith('#')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    });
}


// Scroll effects
function initScrollEffects() {
    const header = document.querySelector('.header');
    const animatedElements = document.querySelectorAll('.card, .publication-item, .timeline-item');
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    });
    
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));
}

// Animation utilities
function initAnimations() {
    // Add stagger animation to grid items
    const gridItems = document.querySelectorAll('.grid .card');
    gridItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Typing effect for hero subtitle (if exists)
    const heroSubtitle = document.querySelector('.hero-subtitle[data-typing]');
    if (heroSubtitle) {
        typeWriter(heroSubtitle, heroSubtitle.textContent, 50);
    }
}

// Typing effect
function typeWriter(element, text, speed = 100) {
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Update toggle icon
            const icon = mobileToggle.textContent;
            mobileToggle.textContent = icon === '☰' ? '✕' : '☰';
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileToggle.textContent = '☰';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileToggle.textContent = '☰';
            }
        });
    }
}