
/* ============================================
   PORTFOLIO.JS
   JavaScript for Insha Mahfooz Portfolio Website
   Version: 2.0
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio JS loaded successfully!');

    // ============================================
    // 1. MOBILE NAVIGATION TOGGLE
    // ============================================
    
    // Create mobile menu button if not exists
    function createMobileMenu() {
        const nav = document.querySelector('nav');
        if (!document.querySelector('.mobile-menu-btn')) {
            const menuBtn = document.createElement('button');
            menuBtn.className = 'mobile-menu-btn';
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            menuBtn.setAttribute('aria-label', 'Toggle navigation menu');
            nav.appendChild(menuBtn);
            
            // Add click event to toggle menu
            menuBtn.addEventListener('click', toggleMobileMenu);
            
            // Add CSS for mobile menu button
            const style = document.createElement('style');
            style.textContent = `
                .mobile-menu-btn {
                    display: none;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 24px;
                    cursor: pointer;
                    padding: 5px;
                    z-index: 1001;
                }
                @media (max-width: 768px) {
                    .mobile-menu-btn { display: block; }
                    nav ul { 
                        display: none; 
                        flex-direction: column;
                        position: absolute;
                        top: 100%;
                        left: 0;
                        width: 100%;
                        background: rgba(0,0,0,0.9);
                        padding: 20px;
                        z-index: 1000;
                    }
                    nav ul.active { display: flex; }
                    nav ul li { margin: 10px 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    function toggleMobileMenu() {
        const navMenu = document.querySelector('nav ul');
        const menuBtn = document.querySelector('.mobile-menu-btn');
        
        navMenu.classList.toggle('active');
        
        // Change icon based on state
        if (navMenu.classList.contains('active')) {
            menuBtn.innerHTML = '<i class="fas fa-times"></i>';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        } else {
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = 'auto';
        }
    }
    
    // ============================================
    // 2. SMOOTH SCROLLING FOR NAVIGATION LINKS
    // ============================================
    
    function setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Close mobile menu if open
                    const navMenu = document.querySelector('nav ul');
                    const menuBtn = document.querySelector('.mobile-menu-btn');
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                        document.body.style.overflow = 'auto';
                    }
                    
                    // Calculate scroll position
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    // Smooth scroll to target
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // ============================================
    // 3. ACTIVE NAV LINK ON SCROLL
    // ============================================
    
    function setupActiveNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        function updateActiveNav() {
            let current = '';
            const scrollPosition = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        }
        
        window.addEventListener('scroll', updateActiveNav);
        updateActiveNav(); // Initialize on load
    }
    
    // ============================================
    // 4. BACK TO TOP BUTTON
    // ============================================
    
    function createBackToTopButton() {
        // Create button element
        const backToTopBtn = document.createElement('button');
        backToTopBtn.id = 'backToTop';
        backToTopBtn.className = 'back-to-top-btn';
        backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTopBtn.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(backToTopBtn);
        
        // Add CSS for back to top button
        const style = document.createElement('style');
        style.textContent = `
            .back-to-top-btn {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, #7b2ff7, #f107a3);
                color: white;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 999;
            }
            .back-to-top-btn.visible {
                opacity: 1;
                visibility: visible;
            }
            .back-to-top-btn:hover {
                transform: translateY(-5px);
                box-shadow: 0 6px 20px rgba(0,0,0,0.4);
                background: linear-gradient(135deg, #f107a3, #7b2ff7);
            }
        `;
        document.head.appendChild(style);
        
        // Show/hide button on scroll
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ============================================
    // 5. ANIMATE ELEMENTS ON SCROLL
    // ============================================
    
    function setupScrollAnimations() {
        // Elements to animate
        const animatedElements = document.querySelectorAll('.project-card, .skill-box span');
        
        // Create Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Add initial styles and observe elements
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
        
        // Add animation CSS
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // ============================================
    // 6. TYPEWRITER EFFECT FOR HERO TEXT
    // ============================================
    
    function setupTypewriterEffect() {
        const heroText = document.querySelector('.hero-text h1');
        if (!heroText) return;
        
        const originalText = heroText.innerHTML;
        const spanText = heroText.querySelector('span');
        
        if (spanText) {
            const spanContent = spanText.textContent;
            spanText.style.opacity = '0';
            spanText.textContent = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < spanContent.length) {
                    spanText.textContent += spanContent.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100); // Adjust typing speed here
                } else {
                    spanText.style.opacity = '1';
                    spanText.style.transition = 'opacity 0.5s ease';
                }
            };
            
            // Start typing after a delay
            setTimeout(typeWriter, 1000);
        }
    }
    
    // ============================================
    // 7. SKILL BARS ANIMATION (Optional Enhancement)
    // ============================================
    
    function createSkillBars() {
        // This is an optional feature to show skill levels
        const skillsSection = document.querySelector('#skills .skill-box');
        if (!skillsSection) return;
        
        // Example skill data with levels (0-100)
        const skillData = [
            { name: 'HTML', level: 90 },
            { name: 'CSS', level: 85 },
            { name: 'Python', level: 80 },
            { name: 'SQL', level: 75 },
            { name: 'Git & GitHub', level: 70 },
            { name: 'Problem Solving', level: 85 }
        ];
        
        // Check if we should replace the current skills display
        const shouldReplace = confirm('Would you like to see animated skill bars instead of skill tags?');
        
        if (shouldReplace) {
            skillsSection.innerHTML = '';
            
            skillData.forEach(skill => {
                const skillBar = document.createElement('div');
                skillBar.className = 'skill-bar';
                skillBar.innerHTML = `
                    <div class="skill-info">
                        <span class="skill-name">${skill.name}</span>
                        <span class="skill-percent">${skill.level}%</span>
                    </div>
                    <div class="skill-progress">
                        <div class="skill-level" style="width: 0%"></div>
                    </div>
                `;
                skillsSection.appendChild(skillBar);
                
                // Animate skill bar after a delay
                setTimeout(() => {
                    const levelElement = skillBar.querySelector('.skill-level');
                    levelElement.style.width = skill.level + '%';
                }, 500);
            });
            
            // Add CSS for skill bars
            const style = document.createElement('style');
            style.textContent = `
                .skill-bar {
                    width: 100%;
                    max-width: 600px;
                    margin: 15px auto;
                }
                .skill-info {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 5px;
                }
                .skill-progress {
                    height: 10px;
                    background: rgba(255,255,255,0.1);
                    border-radius: 5px;
                    overflow: hidden;
                }
                .skill-level {
                    height: 100%;
                    background: linear-gradient(90deg, #ffe75c, #ffb347);
                    border-radius: 5px;
                    transition: width 1.5s ease-in-out;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // ============================================
    // 8. PROJECT FILTERING (If you add categories)
    // ============================================
    
    function setupProjectFilter() {
        // This function assumes you add categories to your projects
        const projectsSection = document.querySelector('#projects');
        if (!projectsSection) return;
        
        // Example filter buttons
        const filterButtons = document.createElement('div');
        filterButtons.className = 'project-filters';
        filterButtons.innerHTML = `
            <button class="filter-btn active" data-filter="all">All</button>
            <button class="filter-btn" data-filter="web">Web</button>
            <button class="filter-btn" data-filter="python">Python</button>
            <button class="filter-btn" data-filter="game">Games</button>
        `;
        projectsSection.insertBefore(filterButtons, projectsSection.querySelector('.project-card'));
        
        // Add CSS for filters
        const style = document.createElement('style');
        style.textContent = `
            .project-filters {
                display: flex;
                justify-content: center;
                gap: 10px;
                margin-bottom: 30px;
                flex-wrap: wrap;
            }
            .filter-btn {
                padding: 8px 20px;
                background: rgba(255,255,255,0.1);
                border: 1px solid rgba(255,255,255,0.2);
                color: white;
                border-radius: 20px;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            .filter-btn.active,
            .filter-btn:hover {
                background: rgba(255,231,92,0.3);
                border-color: #ffe75c;
            }
        `;
        document.head.appendChild(style);
        
        // Filter functionality (would need data-filter attributes on project cards)
        // This is a template - you would need to implement based on your actual project structure
    }
    
    // ============================================
    // 9. FORM VALIDATION FOR CONTACT FORM
    // ============================================
    
    function setupContactForm() {
        // Check if contact form exists (you might add one later)
        const contactForm = document.querySelector('#contact form');
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[name="name"]').value.trim();
            const email = this.querySelector('input[name="email"]').value.trim();
            const message = this.querySelector('textarea[name="message"]').value.trim();
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For now, just show a success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            this.reset();
        });
        
        function isValidEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
    }
    
    // ============================================
    // 10. NOTIFICATION SYSTEM
    // ============================================
    
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Add CSS
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 15px 20px;
                    border-radius: 8px;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    min-width: 300px;
                    max-width: 500px;
                    z-index: 9999;
                    animation: slideIn 0.3s ease;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                }
                .notification.success {
                    background: linear-gradient(135deg, #4CAF50, #45a049);
                }
                .notification.error {
                    background: linear-gradient(135deg, #f44336, #d32f2f);
                }
                .notification.info {
                    background: linear-gradient(135deg, #2196F3, #1976D2);
                }
                .notification-close {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 20px;
                    cursor: pointer;
                    margin-left: 15px;
                }
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Close button functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // ============================================
    // 11. DARK/LIGHT THEME TOGGLE
    // ============================================
    
    function setupThemeToggle() {
        // Create theme toggle button
        const themeToggle = document.createElement('button');
        themeToggle.id = 'themeToggle';
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.setAttribute('aria-label', 'Toggle dark/light theme');
        
        // Add to navigation
        const nav = document.querySelector('nav');
        nav.appendChild(themeToggle);
        
        // Add CSS
        const style = document.createElement('style');
        style.textContent = `
            .theme-toggle {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                padding: 5px 10px;
                margin-left: 15px;
                border-radius: 50%;
                transition: all 0.3s ease;
            }
            .theme-toggle:hover {
                background: rgba(255,255,255,0.1);
                transform: rotate(30deg);
            }
            /* Dark theme styles */
            body.dark-theme {
                background: linear-gradient(135deg, #121212, #1a1a2e);
            }
            body.dark-theme .project-card {
                background: rgba(255,255,255,0.05);
            }
            body.dark-theme .skill-box span {
                background: rgba(255,255,255,0.05);
            }
        `;
        document.head.appendChild(style);
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        // Toggle theme on click
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            
            if (document.body.classList.contains('dark-theme')) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('portfolio-theme', 'dark');
                showNotification('Dark theme enabled');
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('portfolio-theme', 'light');
                showNotification('Light theme enabled');
            }
        });
    }
    
    // ============================================
    // 12. VIEW COUNTER (Simulated)
    // ============================================
    
    function setupViewCounter() {
        // In a real app, this would connect to a backend
        // For now, we'll simulate with localStorage
        const viewCount = localStorage.getItem('portfolio-views') || 0;
        const newCount = parseInt(viewCount) + 1;
        localStorage.setItem('portfolio-views', newCount);
        
        // Optional: Display view count in footer
        const footer = document.querySelector('footer');
        if (footer) {
            const viewCounter = document.createElement('div');
            viewCounter.className = 'view-counter';
            viewCounter.innerHTML = `👁️ Views: ${newCount}`;
            viewCounter.style.cssText = `
                margin-top: 10px;
                font-size: 14px;
                opacity: 0.7;
            `;
            footer.appendChild(viewCounter);
        }
    }
    
    // ============================================
    // 13. LAZY LOADING FOR IMAGES
    // ============================================
    
    function setupLazyLoading() {
        // Add loading="lazy" to all images except the first one
        document.querySelectorAll('img:not(.hero-img img)').forEach(img => {
            img.setAttribute('loading', 'lazy');
        });
    }
    
    // ============================================
    // 14. INITIALIZE ALL FEATURES
    // ============================================
    
    function initializePortfolio() {
        // Core features (always run)
        createMobileMenu();
        setupSmoothScrolling();
        setupActiveNavOnScroll();
        createBackToTopButton();
        setupScrollAnimations();
        setupTypewriterEffect();
        setupLazyLoading();
        setupViewCounter();
        
        // Optional features (uncomment to enable)
        // setupProjectFilter();
        // setupContactForm();
        // setupThemeToggle();
        // createSkillBars(); // This shows a confirmation dialog
        
        console.log('Portfolio initialized with all features!');
    }
    
    // ============================================
    // 15. PERFORMANCE OPTIMIZATIONS
    // ============================================
    
    // Debounce function for scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Throttle function for resize events
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
        };
    }
    
    // ============================================
    // START EVERYTHING
    // ============================================
    
    // Initialize with a slight delay to ensure DOM is ready
    setTimeout(initializePortfolio, 100);
    
    // Add error handling
    window.addEventListener('error', function(e) {
        console.error('JavaScript Error:', e.message);
        showNotification('An error occurred. Please refresh the page.', 'error');
    });
});

// ============================================
// PUBLIC FUNCTIONS (can be called from browser console)
// ============================================

// Function to manually show a notification
window.showPortfolioNotification = function(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 5000);
};

// Function to toggle dark mode manually
window.toggleDarkMode = function() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
    showPortfolioNotification(isDark ? 'Dark mode enabled' : 'Light mode enabled');
};

// Function to simulate sending a contact message
window.sendContactMessage = function(name, email, message) {
    console.log('Simulating message send:', { name, email, message });
    showPortfolioNotification('Message sent successfully! (Simulation)', 'success');
    return true;
};




