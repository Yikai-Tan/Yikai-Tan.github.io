const hamburgerBtn = document.getElementById('hamburgerBtn');
const navMenu = document.getElementById('navMenu');
const glassNavbar = document.getElementById('glassNavbar');
let isMenuOpen = false;

hamburgerBtn.addEventListener('click', function() {
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        hamburgerBtn.classList.add('active');
        navMenu.classList.add('active');
        glassNavbar.classList.add('expanded');
    } else {
        hamburgerBtn.classList.remove('active');
        navMenu.classList.remove('active');
        glassNavbar.classList.remove('expanded');
    }
});

// Close clicking outside
document.addEventListener('click', function(event) {
    if (!glassNavbar.contains(event.target)) {
        isMenuOpen = false;
        hamburgerBtn.classList.remove('active');
        navMenu.classList.remove('active');
        glassNavbar.classList.remove('expanded');
    }
});

// Close pressing Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && isMenuOpen) {
        isMenuOpen = false;
        hamburgerBtn.classList.remove('active');
        navMenu.classList.remove('active');
        glassNavbar.classList.remove('expanded');
    }
});

// Add smooth scroll effect for nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // Only prevent default for internal anchors (starting with #)
        if (targetId.startsWith('#')) {
            e.preventDefault();
            
            // Get the target section
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close mobile menu if open
                isMenuOpen = false;
                hamburgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
                glassNavbar.classList.remove('expanded');
                
                // Smooth scroll to target
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add scroll-based navbar highlight
function updateActiveNavLink() {
    const sections = document.querySelectorAll('div[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Listen for scroll events
window.addEventListener('scroll', updateActiveNavLink);

// Add fade-in animation for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all main sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.container-fluid');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
    
    // Make hero section visible immediately
    const heroSection = document.getElementById('home');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }
});

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('glassNavbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
