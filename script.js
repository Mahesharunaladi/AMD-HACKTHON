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

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature cards, testimonial cards, etc.
document.querySelectorAll('.feature-card, .testimonial-card, .language-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format number based on target
        if (target >= 1000) {
            element.textContent = Math.floor(current / 1000) + 'K+';
        } else if (target < 100) {
            element.textContent = Math.floor(current) + '+';
        } else {
            element.textContent = Math.floor(current) + '%';
        }
    }, 16);
}

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const text = statNumber.textContent;
            
            // Extract number from text
            let target = parseInt(text.replace(/\D/g, ''));
            
            if (text.includes('K')) {
                target *= 1000;
            }
            
            animateCounter(statNumber, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Progress bar animation
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressFill = entry.target.querySelector('.progress-fill');
            const width = progressFill.style.width;
            progressFill.style.width = '0';
            
            setTimeout(() => {
                progressFill.style.width = width;
            }, 100);
            
            progressObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.progress-item').forEach(item => {
    progressObserver.observe(item);
});

// Interactive dashboard bubbles
document.querySelectorAll('.bubble').forEach(bubble => {
    bubble.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.2)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    bubble.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
});

// Button ripple effect
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Language card hover effect
document.querySelectorAll('.language-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) rotate(2deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotate(0deg)';
    });
});

// Feature card tilt effect
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Console message
console.log('%c🎓 Essence Learning Platform', 'color: #2DD4BF; font-size: 24px; font-weight: bold;');
console.log('%cBuilt for AMD Hackathon 2024', 'color: #3B82F6; font-size: 14px;');
console.log('%cPersonalized Learning • Multilingual Support • AI-Powered', 'color: #6B7280; font-size: 12px;');

// Log page load time
window.addEventListener('load', () => {
    const loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
    console.log(`%cPage loaded in ${loadTime}ms`, 'color: #10B981; font-weight: bold;');
});

// Handle CTA button clicks
document.querySelectorAll('.btn-primary, .btn-cta-primary').forEach(button => {
    button.addEventListener('click', function(e) {
        if (!this.getAttribute('href')) {
            e.preventDefault();
            
            // Show a simple alert (in production, this would open a signup modal)
            const message = '🎉 Welcome to Essence! Sign up to start your personalized learning journey.';
            
            // Create a custom notification
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: linear-gradient(135deg, #2DD4BF, #3B82F6);
                color: white;
                padding: 1.5rem 2rem;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                z-index: 10000;
                animation: slideIn 0.5s ease-out;
                max-width: 400px;
            `;
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.5s ease-out';
                setTimeout(() => notification.remove(), 500);
            }, 3000);
        }
    });
});

// Add notification animations
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyle);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.dashboard-preview, .bubble');
    
    parallaxElements.forEach(el => {
        const speed = el.classList.contains('bubble') ? 0.3 : 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Lazy load images (if you add real images later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Easter egg: Konami code
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode.splice(-konamiPattern.length - 1, konamiCode.length - konamiPattern.length);
    
    if (konamiCode.join(',').includes(konamiPattern.join(','))) {
        document.body.style.animation = 'rainbow 2s linear infinite';
        console.log('🌈 Rainbow mode activated! You found the easter egg!');
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);
