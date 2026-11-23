document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Loader & Initialize AOS
    const loader = document.getElementById("loader");
    setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => loader.style.display = "none", 500);
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }, 1500);

    // 2. Navbar, Scroll Progress & Back to Top
    const navbar = document.getElementById("navbar");
    const progressBar = document.getElementById("scroll-progress");
    const backToTop = document.getElementById("back-to-top");

    window.addEventListener("scroll", () => {
        // Sticky Nav
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        // Progress Bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";

        // Back to top
        if (window.scrollY > 500) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    });

    // 3. Mobile Menu Toggle
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        // Animate hamburger lines
        hamburger.classList.toggle("toggle");
    });

    // 4. Hero Carousel
    const slides = document.querySelectorAll(".slide");
    const dotsContainer = document.getElementById("carousel-dots");
    let currentSlide = 0;
    
    // Create dots
    slides.forEach((_, i) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".dot");

    function goToSlide(n) {
        slides[currentSlide].classList.remove("active");
        dots[currentSlide].classList.remove("active");
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add("active");
        dots[currentSlide].classList.add("active");
    }

    // Auto Slide
    setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 5000);

    // 5. Animated Counters
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // Lower is slower

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target + "+";
                }
            };
            updateCount();
        });
    }

    // Observer to trigger counter when in view
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const aboutSection = document.querySelector('.about');
    if(aboutSection) counterObserver.observe(aboutSection);

    // 6. Portfolio Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 50);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });

    // 7. FAQ Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const icon = header.querySelector('i');
            const content = header.nextElementSibling;

            // Close all others
            document.querySelectorAll('.accordion-content').forEach(c => {
                if (c !== content) {
                    c.style.maxHeight = null;
                    c.previousElementSibling.querySelector('i').className = 'fas fa-plus';
                }
            });

            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                icon.className = 'fas fa-plus';
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                icon.className = 'fas fa-minus';
            }
        });
    });
});
// Video Control Toggle & Autoplay Handling
const heroVideo = document.getElementById('heroVideo');
const videoToggleBtn = document.getElementById('videoToggleBtn');

if (heroVideo && videoToggleBtn) {
    const videoIcon = videoToggleBtn.querySelector('i');

    videoToggleBtn.addEventListener('click', () => {
        if (heroVideo.paused) {
            heroVideo.play();
            videoIcon.className = 'fas fa-pause';
            videoToggleBtn.setAttribute('aria-label', 'Pause Video');
        } else {
            heroVideo.pause();
            videoIcon.className = 'fas fa-play';
            videoToggleBtn.setAttribute('aria-label', 'Play Video');
        }
    });

    // Ensure video attempts play on low-power devices
    document.addEventListener('touchstart', () => {
        if (heroVideo.paused && heroVideo.autoplay) {
            heroVideo.play().catch(() => {
                // Silently handle mobile autoplay restrictions
            });
        }
    }, { once: true });
}




