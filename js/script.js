// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Fade in animation on scroll using Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Navbar background and shadow on scroll
    function updateNavbarOnScroll() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = 'none';
        }
    }

    // Parallax effect for hero section
    function updateParallaxEffect() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.3; // Reduced intensity for better performance
            hero.style.transform = `translateY(${rate}px)`;
        }
    }

    // Throttle function for better performance
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Add scroll event listeners with throttling
    window.addEventListener('scroll', throttle(() => {
        updateNavbarOnScroll();
        updateParallaxEffect();
    }, 16)); // ~60fps

    // Enhanced hover effects for cards
    function addCardHoverEffects() {
        const cards = document.querySelectorAll('.feature-card, .community-card, .partner-card');
        
        cards.forEach(card => {
            // Mouse enter effect
            card.addEventListener('mouseenter', function() {
                if (this.classList.contains('feature-card')) {
                    this.style.transform = 'translateY(-15px) scale(1.02)';
                    this.style.boxShadow = '0 25px 60px rgba(102, 126, 234, 0.25)';
                } else if (this.classList.contains('community-card')) {
                    this.style.transform = 'translateY(-8px) scale(1.01)';
                } else if (this.classList.contains('partner-card')) {
                    this.style.transform = 'translateY(-8px) scale(1.03)';
                }
            });
            
            // Mouse leave effect
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                if (this.classList.contains('feature-card')) {
                    this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                }
            });

            // Add ripple effect on click
            card.addEventListener('click', function(e) {
                createRippleEffect(e, this);
            });
        });
    }

    // Create ripple effect
    function createRippleEffect(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            pointer-events: none;
        `;
        
        // Add ripple keyframe if not exists
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Animate counter numbers (for potential stats section)
    function animateCounters() {
        const counters = document.querySelectorAll('[data-count]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current);
            }, 16);
        });
    }

    // Add typing effect for hero text (optional enhancement)
    function addTypingEffect() {
        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle) {
            const text = heroTitle.textContent;
            heroTitle.textContent = '';
            heroTitle.style.opacity = '1';
            
            let i = 0;
            const typeTimer = setInterval(() => {
                if (i < text.length) {
                    heroTitle.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeTimer);
                }
            }, 100);
        }
    }

    // Initialize all interactive features
    function init() {
        addCardHoverEffects();
        animateCounters();
        
        // Add loading animation completion
        document.body.classList.add('loaded');
        
        // Optional: Add typing effect (uncomment to enable)
        // addTypingEffect();
        
        console.log('Flows Collective website loaded successfully! 🎨');
    }

    // Mobile menu toggle (for future mobile navigation)
    function initMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                mobileMenuBtn.classList.toggle('active');
            });
        }
    }

    // Form handling (for future contact/signup forms)
    function initFormHandling() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Add loading state
                const submitBtn = form.querySelector('[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission (replace with actual API call)
                setTimeout(() => {
                    submitBtn.textContent = 'Sent! ✓';
                    submitBtn.style.background = '#48bb78';
                    
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                        form.reset();
                    }, 2000);
                }, 1500);
            });
        });
    }

    // Lazy loading for images (when images are added)
    function initLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => {
                img.classList.add('lazy');
                imageObserver.observe(img);
            });
        }
    }

    // Gallery interaction enhancements
    function initGalleryInteractions() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                // Add click effect
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // Optional: Add modal functionality here in the future
                const title = this.querySelector('.gallery-overlay h4').textContent;
                console.log(`Clicked on: ${title}`);
            });
        });
    }

    // Performance monitoring
    function logPerformanceMetrics() {
        window.addEventListener('load', () => {
            const perfData = performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page load time: ${pageLoadTime}ms`);
        });
    }

    // Initialize everything
    init();
    initMobileMenu();
    initFormHandling();
    initLazyLoading();
    initGalleryInteractions();
    logPerformanceMetrics();

    // Add custom cursor effect for artistic feel (optional)
    function initCustomCursor() {
        const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0;
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
            cursor.style.opacity = '0.7';
        });
        
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });
        
        // Enhance cursor on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .feature-card, .community-card, .partner-card');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            });
        });
    }

    // Uncomment to enable custom cursor
    // initCustomCursor();
});