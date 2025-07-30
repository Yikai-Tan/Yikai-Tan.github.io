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
    const progressIndicators = document.querySelectorAll('.progress-indicator');
    
    let current = '';
    let currentIndex = -1;
    
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
            currentIndex = index;
        }
    });
    
    // Update navbar links
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
    
    // Update progress indicators
    progressIndicators.forEach((indicator, index) => {
        const sectionId = indicator.getAttribute('data-section');
        indicator.classList.remove('active', 'completed');
        
        if (sectionId === current) {
            indicator.classList.add('active');
        } else {
            // Check if this section is above the current section
            const sectionElement = document.getElementById(sectionId);
            if (sectionElement && sectionElement.offsetTop < pageYOffset + 200) {
                indicator.classList.add('completed');
            }
        }
    });
}

// Add click functionality to progress indicators
document.addEventListener('DOMContentLoaded', () => {
    const progressIndicators = document.querySelectorAll('.progress-indicator');
    
    progressIndicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            const targetSection = document.getElementById(sectionId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

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

// Projects Preview Bar Functionality
document.addEventListener('DOMContentLoaded', function() {
    const projectsIndicator = document.querySelector('.progress-indicator[data-section="projects"]');
    const projectsPreviewBar = document.querySelector('.projects-preview-bar');
    let previewTimeout;

    if (projectsIndicator && projectsPreviewBar) {
        // Show preview bar when hovering over projects indicator
        projectsIndicator.addEventListener('mouseenter', function() {
            clearTimeout(previewTimeout);
            projectsPreviewBar.classList.add('show');
        });

        // Keep preview bar visible when hovering over it
        projectsPreviewBar.addEventListener('mouseenter', function() {
            clearTimeout(previewTimeout);
            projectsPreviewBar.classList.add('show');
        });

        // Hide preview bar when leaving projects indicator (with delay)
        projectsIndicator.addEventListener('mouseleave', function() {
            previewTimeout = setTimeout(function() {
                projectsPreviewBar.classList.remove('show');
            }, 300); // 300ms delay to allow moving to preview bar
        });

        // Hide preview bar when leaving preview bar
        projectsPreviewBar.addEventListener('mouseleave', function() {
            previewTimeout = setTimeout(function() {
                projectsPreviewBar.classList.remove('show');
            }, 100); // Shorter delay when leaving preview bar
        });
    }
});
