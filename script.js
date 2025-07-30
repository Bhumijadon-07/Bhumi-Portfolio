
// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);

// Update icon based on current theme
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
  
  // Add animation effect
  themeToggle.style.transform = 'rotate(360deg)';
  setTimeout(() => {
    themeToggle.style.transform = 'rotate(0deg)';
  }, 300);
});

function updateThemeIcon(theme) {
  if (theme === 'dark') {
    themeIcon.className = 'fas fa-sun';
  } else {
    themeIcon.className = 'fas fa-moon';
  }
}

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  
  // Animate hamburger bars
  const bars = document.querySelectorAll('.bar');
  bars.forEach((bar, index) => {
    if (navMenu.classList.contains('active')) {
      if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
      if (index === 1) bar.style.opacity = '0';
      if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      bar.style.transform = 'none';
      bar.style.opacity = '1';
    }
  });
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => {
      bar.style.transform = 'none';
      bar.style.opacity = '1';
    });
  });
});

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

// Enhanced navbar background on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  const scrolled = window.scrollY;
  
  if (scrolled > 100) {
    navbar.style.background = 'var(--glass-bg)';
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    navbar.style.backdropFilter = 'blur(20px)';
  } else {
    navbar.style.background = 'var(--glass-bg)';
    navbar.style.boxShadow = 'none';
  }
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Add stagger effect for timeline items
      if (entry.target.classList.contains('timeline-item')) {
        const items = document.querySelectorAll('.timeline-item');
        const index = Array.from(items).indexOf(entry.target);
        entry.target.style.animationDelay = `${index * 0.2}s`;
      }
    }
  });
}, observerOptions);

// Add fade-in class to elements and observe them
const elementsToAnimate = [
  '.stat-item',
  '.skill-card',
  '.project-card',
  '.contact-item',
  '.contact-form',
  '.timeline-item',
  '.testimonial-card'
];

elementsToAnimate.forEach(selector => {
  document.querySelectorAll(selector).forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
});

// Typing animation for hero subtitle
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
  const subtitle = document.querySelector('.hero-subtitle');
  if (subtitle) {
    const originalText = subtitle.textContent;
    setTimeout(() => {
      typeWriter(subtitle, originalText, 80);
    }, 1000);
  }
});

// Testimonials slider
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const navDots = document.querySelectorAll('.nav-dot');

function showTestimonial(index) {
  testimonialCards.forEach((card, i) => {
    card.classList.toggle('active', i === index);
  });
  
  navDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

// Auto-rotate testimonials
setInterval(() => {
  currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
  showTestimonial(currentTestimonial);
}, 5000);

// Manual testimonial navigation
navDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentTestimonial = index;
    showTestimonial(currentTestimonial);
  });
});

// Contact form handling with enhanced validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = contactForm.querySelector('input[type="text"]').value.trim();
    const email = contactForm.querySelector('input[type="email"]').value.trim();
    const message = contactForm.querySelector('textarea').value.trim();
    
    // Enhanced form validation
    const errors = [];
    
    if (!name || name.length < 2) {
      errors.push('Name must be at least 2 characters long');
    }
    
    if (!email || !isValidEmail(email)) {
      errors.push('Please enter a valid email address');
    }
    
    if (!message || message.length < 10) {
      errors.push('Message must be at least 10 characters long');
    }
    
    if (errors.length > 0) {
      showNotification(errors.join('. '), 'error');
      return;
    }
    
    // Simulate form submission with loading state
    const submitBtn = contactForm.querySelector('.btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
      contactForm.reset();
      showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
      
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 3000);
      
    } catch (error) {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      showNotification('Failed to send message. Please try again.', 'error');
    }
  });
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Enhanced notification system
function showNotification(message, type = 'info') {
  // Remove existing notifications
  document.querySelectorAll('.notification').forEach(n => n.remove());
  
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  
  const icons = {
    success: 'fas fa-check-circle',
    error: 'fas fa-exclamation-circle',
    info: 'fas fa-info-circle',
    warning: 'fas fa-exclamation-triangle'
  };
  
  const colors = {
    success: '#27ae60',
    error: '#e74c3c',
    info: '#3498db',
    warning: '#f39c12'
  };
  
  notification.innerHTML = `
    <i class="${icons[type]}"></i>
    <span>${message}</span>
    <button onclick="this.parentElement.remove()" class="notification-close">
      <i class="fas fa-times"></i>
    </button>
  `;
  
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    background: ${colors[type]};
    color: white;
    border-radius: 10px;
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: 1rem;
    max-width: 400px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    animation: slideInRight 0.3s ease, fadeOut 0.3s ease 4.7s forwards;
    backdrop-filter: blur(10px);
  `;
  
  document.body.appendChild(notification);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 5000);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');
  const shapes = document.querySelectorAll('.shape');
  
  if (hero && heroContent) {
    heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
    
    shapes.forEach((shape, index) => {
      const speed = 0.2 + (index * 0.1);
      shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
  }
});

// Enhanced particle system
function createParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 3 + 1;
    const animationDuration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: particle-float ${animationDuration}s ease-in-out infinite;
      animation-delay: ${delay}s;
      pointer-events: none;
    `;
    
    hero.appendChild(particle);
  }
}

// Initialize particles
window.addEventListener('load', createParticles);

// Active navigation link highlighting
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// 3D tilt effect for cards
function addTiltEffect(selector) {
  const cards = document.querySelectorAll(selector);
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
  });
}

// Initialize tilt effects
window.addEventListener('load', () => {
  addTiltEffect('.skill-card');
  addTiltEffect('.project-card');
  addTiltEffect('.stat-item');
  addTiltEffect('.timeline-card');
});

// Scroll progress indicator
function createScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: var(--primary-gradient);
    z-index: 10001;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

// Initialize scroll progress
createScrollProgress();

// Smooth reveal animations with stagger
function addStaggerAnimation(selector, delay = 100) {
  const elements = document.querySelectorAll(selector);
  
  elements.forEach((el, index) => {
    el.style.animationDelay = `${index * delay}ms`;
  });
}

// Add CSS for additional animations
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes fadeOut {
    to {
      opacity: 0;
      transform: translateX(50px);
    }
  }
  
  .notification-close {
    background: none;
    border: none;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    padding: 0;
    opacity: 0.8;
    transition: opacity 0.2s ease;
  }
  
  .notification-close:hover {
    opacity: 1;
  }
  
  @keyframes particle-float {
    0%, 100% { 
      transform: translateY(0px) translateX(0px) rotate(0deg); 
      opacity: 1; 
    }
    25% { 
      transform: translateY(-50px) translateX(25px) rotate(90deg); 
      opacity: 0.7; 
    }
    50% { 
      transform: translateY(-100px) translateX(50px) rotate(180deg); 
      opacity: 0.3; 
    }
    75% { 
      transform: translateY(-50px) translateX(25px) rotate(270deg); 
      opacity: 0.7; 
    }
  }
`;
document.head.appendChild(additionalStyles);

// Performance optimization: Throttle scroll events
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

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
  // Existing scroll handlers here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Initialize stagger animations
window.addEventListener('load', () => {
  addStaggerAnimation('.skill-card', 150);
  addStaggerAnimation('.project-card', 200);
  addStaggerAnimation('.timeline-item', 300);
});

console.log('🚀 Enhanced portfolio loaded with dark mode and 3D effects!');
