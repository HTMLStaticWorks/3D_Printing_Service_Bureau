/* 
  Project: 3D Printing Service Bureau
  Author: Senior Frontend Developer
  Logic: Light/Dark Mode, Intersection Observer, Navbar Active State
*/

document.addEventListener('DOMContentLoaded', () => {
    // Theme Switching
    const themeBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'light';

    // RTL Toggle
    const rtlBtn = document.getElementById('rtl-toggle');
    const isRtl = localStorage.getItem('rtl') === 'true';

    // Apply saved states on start
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    updateThemeIcon(savedTheme);

    if (isRtl) {
        enableRtl();
    }

    if (rtlBtn) {
        rtlBtn.addEventListener('click', () => {
            const currentlyRtl = document.documentElement.getAttribute('dir') === 'rtl';
            if (currentlyRtl) {
                disableRtl();
            } else {
                enableRtl();
            }
        });
    }

    function enableRtl() {
        document.documentElement.setAttribute('dir', 'rtl');
        document.body.classList.add('rtl-mode');
        localStorage.setItem('rtl', 'true');
        if (rtlBtn) rtlBtn.innerText = 'LTR';
    }

    function disableRtl() {
        document.documentElement.removeAttribute('dir');
        document.body.classList.remove('rtl-mode');
        localStorage.setItem('rtl', 'false');
        if (rtlBtn) rtlBtn.innerText = 'RTL';
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            const newTheme = isDark ? 'dark' : 'light';
            
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        const icon = document.querySelector('#theme-toggle i');
        if (icon) {
            icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.5rem 0';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '1rem 0';
            navbar.style.boxShadow = 'none';
        }
    });

    // Active Nav Link Highlight
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-item');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
            
            // If the link is inside a dropdown, highlight the toggle instead
            const parentDropdown = link.closest('.dropdown-menu');
            if (parentDropdown) {
                const toggle = parentDropdown.parentElement.querySelector('.dropdown-toggle');
                if (toggle) {
                    toggle.classList.add('active');
                }
            }
        }
    });

    // Special case for dashboard pages to trigger parent active state
    if (currentPath === 'dashboard.html' || currentPath === 'dashboard-admin.html') {
        const dashToggle = document.getElementById('dashboardDropdown');
        if (dashToggle) dashToggle.classList.add('active');
    }

    // Intersection Observer for Fade-In Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.fade-in, .reveal');
    animateElements.forEach(el => observer.observe(el));

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to top button visibility
    const backToTop = document.createElement('div');
    backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTop.className = 'back-to-top';
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Mobile Menu Toggle & Scroll Lock
    const navbarCollapse = document.getElementById('navbarContent');
    if (navbarCollapse) {
        navbarCollapse.addEventListener('show.bs.collapse', () => {
            document.body.classList.add('menu-open');
        });
        navbarCollapse.addEventListener('hide.bs.collapse', () => {
            document.body.classList.remove('menu-open');
        });
    }

    // Close mobile menu on link click
    const mobileNavLinks = document.querySelectorAll('.navbar-nav .nav-link:not(.dropdown-toggle), .dropdown-item');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse && window.innerWidth < 1200) {
                bsCollapse.hide();
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const isNavbar = e.target.closest('.navbar');
        if (!isNavbar && navbarCollapse.classList.contains('show') && window.innerWidth < 1200) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) bsCollapse.hide();
        }
    });
});

// Extra Styles for back to top button added via JS or CSS
const style = document.createElement('style');
style.textContent = `
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        background-color: var(--secondary);
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 10px 20px rgba(255, 107, 53, 0.3);
    }
    .back-to-top.visible {
        opacity: 1;
        visibility: visible;
    }
    .back-to-top:hover {
        transform: translateY(-5px);
        background-color: #e65a2a;
    }
`;
document.head.appendChild(style);
