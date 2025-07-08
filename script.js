// Portfolio JavaScript - Cleaned Version

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio Loaded - Muhammad Milon');
    initSmoothScrolling();
    initNavbarEffects();
    initAnimationObserver();
    initCounterAnimation();
    initTypingEffect();
    initMobileMenu();
    initScrollToTop();
    initPreloader();
});

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });
}

// Navbar Effects on Scroll
function initNavbarEffects() {
    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        navbar.style.background = currentScrollY > 100 ? 'rgba(26, 26, 26, 0.95)' : 'rgba(26, 26, 26, 0.8)';
        navbar.style.transform = (currentScrollY > lastScrollY && currentScrollY > 200) ? 'translateX(-50%) translateY(-100%)' : 'translateX(-50%) translateY(0)';
        lastScrollY = currentScrollY;
    });
}

// Intersection Observer for Animations
function initAnimationObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                if (entry.target.classList.contains('stat-card')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.project-card, .blog-card, .stat-card, .section-title, .section-subtitle')
        .forEach(el => observer.observe(el));
}

// Counter Animation
function initCounterAnimation() {
    window.animateCounter = function(element) {
        const numberElement = element.querySelector('.stat-number');
        if (!numberElement) return;
        const target = parseInt(numberElement.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            numberElement.textContent = Math.floor(current);
        }, 16);
    }
}

// Typing Effect
function initTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;
    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.borderRight = '2px solid var(--primary)';
    let index = 0;
    const typeSpeed = 50;
    function typeWriter() {
        if (index < text.length) {
            subtitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, typeSpeed);
        } else {
            setTimeout(() => { subtitle.style.borderRight = 'none'; }, 1000);
        }
    }
    setTimeout(typeWriter, 1500);
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (!mobileToggle || !navLinks) return;

    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navLinks.classList.toggle('mobile-active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navLinks.classList.remove('mobile-active');
        });
    });
}

// Scroll to Top Button
function initScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed; bottom: 30px; right: 30px;
        width: 50px; height: 50px; border-radius: 50%;
        background: var(--gradient); border: none;
        color: white; font-size: 1.5rem; cursor: pointer;
        z-index: 1000; opacity: 0; transform: translateY(100px);
        transition: var(--transition); box-shadow: var(--shadow);
    `;

    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', () => {
        scrollToTopBtn.style.opacity = window.scrollY > 500 ? '1' : '0';
        scrollToTopBtn.style.transform = window.scrollY > 500 ? 'translateY(0)' : 'translateY(100px)';
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Preloader
function initPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.style.cssText = `
        position: fixed; top: 0; left: 0;
        width: 100%; height: 100%; background: var(--bg-dark);
        display: flex; align-items: center; justify-content: center;
        z-index: 10000; transition: opacity 0.5s ease;
    `;
    preloader.innerHTML = `<div style="width: 50px; height: 50px; border: 3px solid transparent; border-top: 3px solid var(--primary); border-radius: 50%; animation: spin 1s linear infinite;"></div>`;
    document.body.appendChild(preloader);
    window.addEventListener('load', () => {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.remove(), 500);
    });
}

// Spinner Animation Style
const spinStyle = document.createElement('style');
spinStyle.textContent = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
document.head.appendChild(spinStyle);
