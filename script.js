document.addEventListener('DOMContentLoaded', () => {
    // Hero Slider Logic
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    const slideInterval = 5000;

    const showSlide = (n) => {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    };

    const nextSlide = () => showSlide(currentSlide + 1);

    let timer = setInterval(nextSlide, slideInterval);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(timer);
            showSlide(index);
            timer = setInterval(nextSlide, slideInterval);
        });
    });

    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        for (let i = 0; i < revealElements.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = revealElements[i].getBoundingClientRect().top;
            const elementVisible = 100;
            if (elementTop < windowHeight - elementVisible) {
                revealElements[i].classList.add('active');
            }
        }
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // Stats Counter Animation
    const stats = document.querySelectorAll('.num');
    const speed = 200;

    const animateStats = () => {
        stats.forEach(stat => {
            const updateCount = () => {
                const target = +stat.getAttribute('data-target');
                const count = +stat.innerText;
                const inc = target / speed;

                if (count < target) {
                    stat.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    stat.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Intersection Observer for Stats
    const statsSection = document.querySelector('.credibility-bar');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateStats();
                observer.unobserve(statsSection);
            }
        }, { threshold: 0.5 });
        observer.observe(statsSection);
    }

    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navContainer = document.querySelector('.nav-container');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navContainer.classList.toggle('active');
            // Basic mobile menu styling toggle
            if (navContainer.classList.contains('active')) {
                navContainer.style.display = 'block';
                navContainer.style.position = 'absolute';
                navContainer.style.top = '100%';
                navContainer.style.left = '0';
                navContainer.style.width = '100%';
                navContainer.style.backgroundColor = 'white';
                navContainer.style.padding = '20px';
                navContainer.style.boxShadow = '0 10px 10px rgba(0,0,0,0.1)';
                document.querySelector('.main-nav').style.display = 'flex';
                document.querySelector('.main-nav').style.flexDirection = 'column';
            } else {
                navContainer.style.display = '';
            }
        });
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                if (navContainer.classList.contains('active')) {
                    mobileToggle.click();
                }
            }
        });
    });
});
