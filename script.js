document.addEventListener('DOMContentLoaded', () => {
    // Initialize particles.js
    particlesJS('particles-js', {
        particles: {
            number: { value: 80 },
            color: { value: '#6c63ff' },
            shape: { type: 'circle' },
            opacity: { value: 0.5 },
            size: { value: 3 },
            move: {
                enable: true,
                speed: 3
            }
        }
    });

    // Typing animation
    const texts = ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver'];
    let textIndex = 0;
    let charIndex = 0;
    const typingText = document.querySelector('.typing-text');

    function type() {
        if (charIndex < texts[textIndex].length) {
            typingText.textContent += texts[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 2000);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typingText.textContent = texts[textIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500);
        }
    }

    // Start typing animation
    setTimeout(type, 1000);

    // Dark mode toggle
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.documentElement.setAttribute('data-theme', 
            document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light'
        );
    });

    // Loading screen
    window.addEventListener('load', () => {
        const loadingScreen = document.querySelector('.loading-screen');
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Scroll animations with intersection observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('skill-item')) {
                    entry.target.style.animationDelay = `${Array.from(entry.target.parentElement.children).indexOf(entry.target) * 0.1}s`;
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.skill-item, .project-card, .fade-in').forEach(el => {
        observer.observe(el);
    });

    // Header scroll effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Enhanced Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navMenu = document.querySelector('nav ul');
    let menuOpen = false;

    function toggleMenu() {
        if (!menuOpen) {
            menuBtn.classList.add('active');
            navMenu.classList.add('active');
            document.body.classList.add('menu-open');
            menuBtn.querySelector('i').classList.replace('fa-bars', 'fa-times');
            menuOpen = true;
        } else {
            menuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
            menuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
            menuOpen = false;
        }
    }

    menuBtn.addEventListener('click', toggleMenu);

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (menuOpen && !e.target.closest('nav')) {
            toggleMenu();
        }
    });

    // Close menu when clicking links
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            if (menuOpen) toggleMenu();
        });
    });

    // Close menu on resize if mobile menu is open
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && menuOpen) {
            toggleMenu();
        }
    });

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Enhanced Timeline Animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Start observing the next item after current one becomes visible
                const nextItem = entry.target.nextElementSibling;
                if (nextItem && nextItem.classList.contains('timeline-item')) {
                    setTimeout(() => {
                        timelineObserver.observe(nextItem);
                    }, 300);
                }
            }
        });
    }, { 
        threshold: 0.5,
        rootMargin: '-50px'
    });

    // Initially observe only the first timeline item
    const firstTimelineItem = timelineItems[0];
    if (firstTimelineItem) {
        timelineObserver.observe(firstTimelineItem);
    }

    // Testimonial slider
    const slider = document.querySelector('.testimonial-slider');
    const prevBtn = document.querySelector('.testimonial-btn.prev');
    const nextBtn = document.querySelector('.testimonial-btn.next');
    let slideIndex = 0;

    function slideTestimonials(direction) {
        const slides = document.querySelectorAll('.testimonial-card');
        slideIndex = (slideIndex + direction + slides.length) % slides.length;
        slider.style.transform = `translateX(-${slideIndex * 100}%)`;
    }

    prevBtn?.addEventListener('click', () => slideTestimonials(-1));
    nextBtn?.addEventListener('click', () => slideTestimonials(1));

    // Language switcher
    const translations = {
        en: {
            home: 'Home',
            about: 'About',
            projects: 'Projects',
            contact: 'Contact'
            // Add more translations
        },
        es: {
            home: 'Inicio',
            about: 'Sobre mí',
            projects: 'Proyectos',
            contact: 'Contacto'
            // Add more translations
        },
        fr: {
            home: 'Accueil',
            about: 'À propos',
            projects: 'Projets',
            contact: 'Contact'
            // Add more translations
        }
    };

    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            document.documentElement.setAttribute('lang', lang);
            updateLanguage(lang);
        });
    });

    function updateLanguage(lang) {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.dataset.translate;
            if (translations[lang]?.[key]) {
                element.textContent = translations[lang][key];
            }
        });
    }

    // Scroll Progress Indicator
    const scrollProgress = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', () => {
        const totalScroll = document.documentElement.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scroll = `${totalScroll / windowHeight}`;

        scrollProgress.style.transform = `scaleX(${scroll})`;
    });
});
