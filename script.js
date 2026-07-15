/* ============================================
   THE DAILY GRIND - Interactive JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // THEME TOGGLE (Dark / Light Mode)
    // ========================================
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    const html = document.documentElement;

    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        html.setAttribute('data-theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            html.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            html.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    });

    // ========================================
    // MOBILE NAVIGATION
    // ========================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('mobile-open');
        const spans = mobileMenuBtn.querySelectorAll('span');
        if (navLinks.classList.contains('mobile-open')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('mobile-open');
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // ========================================
    // NAVBAR SCROLL EFFECT
    // ========================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Add shadow on scroll
        if (currentScroll > 50) {
            navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        // Hide/show navbar on scroll direction
        if (currentScroll > lastScroll && currentScroll > 300) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });

    // ========================================
    // ACTIVE NAV LINK ON SCROLL
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinkItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinkItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ========================================
    // MENU TABS FILTERING
    // ========================================
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuItems = document.querySelectorAll('.menu-item');

    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Update active tab
            menuTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const category = this.getAttribute('data-category');

            // Filter items with animation
            menuItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                if (itemCategory === category) {
                    item.classList.remove('hidden');
                    item.style.animation = 'none';
                    item.offsetHeight; // Trigger reflow
                    item.style.animation = 'fadeIn 0.4s ease-out';
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // ========================================
    // TESTIMONIALS SLIDER
    // ========================================
    const track = document.getElementById('testimonialTrack');
    const cards = track.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('testimonialDots');

    let currentIndex = 0;
    const totalCards = cards.length;
    let cardsPerView = window.innerWidth > 768 ? 2 : 1;
    const maxIndex = totalCards - cardsPerView;

    // Create dots
    function createDots() {
        dotsContainer.innerHTML = '';
        const dotCount = totalCards - cardsPerView + 1;
        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('button');
            dot.classList.add('testimonial-dot');
            if (i === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }
    createDots();

    function updateSlider() {
        const cardWidth = cards[0].offsetWidth + 32; // gap included
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

        // Update dots
        document.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        updateSlider();
    }

    function nextSlide() {
        currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
        updateSlider();
    }

    function prevSlide() {
        currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
        updateSlider();
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Auto-play
    let autoPlay = setInterval(nextSlide, 5000);

    track.addEventListener('mouseenter', () => clearInterval(autoPlay));
    track.addEventListener('mouseleave', () => {
        autoPlay = setInterval(nextSlide, 5000);
    });

    // Update on resize
    window.addEventListener('resize', () => {
        cardsPerView = window.innerWidth > 768 ? 2 : 1;
        currentIndex = 0;
        createDots();
        updateSlider();
    });

    // ========================================
    // CONTACT FORM
    // ========================================
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    function showToast(message, type = 'success') {
        toastMessage.textContent = message;
        const icon = toast.querySelector('i');
        icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
        icon.style.color = type === 'success' ? '#22c55e' : '#ef4444';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3500);
    }

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const name = formData.get('name');

        // Simulate form submission
        showToast(`Thanks, ${name}! Your message has been sent. We'll get back to you soon!`);
        contactForm.reset();
    });

    // ========================================
    // NEWSLETTER FORM
    // ========================================
    const newsletterForm = document.getElementById('newsletterForm');

    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        showToast('Thanks for subscribing! Check your inbox for a welcome treat.');
        newsletterForm.reset();
    });

    // ========================================
    // SCROLL REVEAL ANIMATIONS
    // ========================================
    const revealElements = document.querySelectorAll('.feature-card, .menu-item, .gallery-item, .contact-item');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });

    // ========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // GALLERY LIGHTBOX (Simple)
    // ========================================
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-overlay"></div>
                <img src="${img.src}" alt="${img.alt}">
                <button class="lightbox-close"><i class="fas fa-times"></i></button>
            `;
            lightbox.style.cssText = `
                position: fixed; inset: 0; z-index: 10000;
                display: flex; align-items: center; justify-content: center;
                animation: fadeIn 0.3s ease;
            `;
            lightbox.querySelector('.lightbox-overlay').style.cssText = `
                position: absolute; inset: 0; background: rgba(0,0,0,0.9);
            `;
            lightbox.querySelector('img').style.cssText = `
                position: relative; max-width: 90%; max-height: 90vh;
                border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,0.5);
                object-fit: contain;
            `;
            lightbox.querySelector('.lightbox-close').style.cssText = `
                position: absolute; top: 2rem; right: 2rem;
                width: 48px; height: 48px; border-radius: 50%;
                background: rgba(255,255,255,0.1); border: none;
                color: white; font-size: 1.2rem; cursor: pointer;
                display: flex; align-items: center; justify-content: center;
                transition: background 0.3s;
            `;

            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';

            const closeLightbox = () => {
                lightbox.style.animation = 'fadeOut 0.3s ease forwards';
                setTimeout(() => {
                    lightbox.remove();
                    document.body.style.overflow = '';
                }, 300);
            };

            lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
            lightbox.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);
            document.addEventListener('keydown', function escHandler(e) {
                if (e.key === 'Escape') {
                    closeLightbox();
                    document.removeEventListener('keydown', escHandler);
                }
            });
        });
    });

    // Add fadeOut keyframe dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);

}); // End DOMContentLoaded
