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
        e.preventDefault();
        
        // Get the target section
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        // Close menu after clicking a link
        isMenuOpen = false;
        hamburgerBtn.classList.remove('active');
        navMenu.classList.remove('active');
        glassNavbar.classList.remove('expanded');
        
        // Add a subtle feedback effect
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        // Smooth scroll to target section if it exists
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add parallax effect to background
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.body;
    const speed = scrolled * 0.5;
    parallax.style.backgroundPosition = `center ${speed}px`;
});