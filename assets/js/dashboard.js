/* 
  Project: 3D Printing Service Bureau
  Author: Senior Frontend Developer
  Dashboard Logic: Navigation, Quoting Simulation, Sidebar Toggle
*/

document.addEventListener('DOMContentLoaded', () => {
    // Helper: Force all fade-in children visible inside a section
    function forceShowSection(section) {
        section.classList.add('active');
        section.classList.remove('d-none');
        // Immediately reveal all fade-in children without waiting for IntersectionObserver
        section.querySelectorAll('.fade-in').forEach(el => {
            el.classList.add('appear');
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }

    // Sidebar Navigation Logic
    const menuItems = document.querySelectorAll('.sidebar-item[data-target]');
    const sections = document.querySelectorAll('.dashboard-section');

    // Initialize: ensure active section is visible on page load
    sections.forEach(sec => {
        if (sec.classList.contains('active')) {
            forceShowSection(sec);
        }
    });

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const target = item.getAttribute('data-target');
            
            // Update Active State on Menu
            menuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Switch Sections
            sections.forEach(sec => {
                if (sec.id === target || sec.id === `section-${target}`) {
                    forceShowSection(sec);
                } else {
                    sec.classList.remove('active');
                    sec.classList.add('d-none');
                }
            });

            // Close sidebar on mobile after click
            if (window.innerWidth < 1200) {
                const sidebar = document.getElementById('sidebar');
                const overlay = document.querySelector('.sidebar-overlay');
                if (sidebar) sidebar.classList.remove('active');
                if (overlay) overlay.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });

    // Sidebar Toggle for Mobile (Offcanvas Style)
    const toggleBtn = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const wrapper = document.querySelector('.dashboard-wrapper');
    
    // Create Overlay if not exists
    let overlay = document.querySelector('.sidebar-overlay');
    if (!overlay && wrapper) {
        overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        wrapper.appendChild(overlay);
    }

    // Add Close Button to Sidebar Header if not exists
    const sidebarHeader = document.querySelector('.sidebar-header');
    if (sidebarHeader && !sidebarHeader.querySelector('.sidebar-close')) {
        const closeBtn = document.createElement('button');
        closeBtn.className = 'sidebar-close';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        sidebarHeader.appendChild(closeBtn);
        
        closeBtn.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    }

    if (toggleBtn && sidebar && overlay) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        overlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    }

    // Modal Simulation for Quote UI
    const calculateBtn = document.getElementById('calculate-quote');
    const resultCard = document.getElementById('quote-result');
    const priceDisplay = document.getElementById('quote-price');

    if (calculateBtn) {
        calculateBtn.addEventListener('click', () => {
            const material = document.getElementById('quote-material').value;
            const qty = parseInt(document.getElementById('quote-qty').value) || 1;
            
            let basePrice = 45.00; // Base price for FDM
            if (material === 'sla') basePrice = 85.00;
            if (material === 'sls') basePrice = 150.00;
            if (material === 'metal') basePrice = 450.00;

            const finalPrice = (basePrice * qty).toFixed(2);
            
            // Add loading effect simulation
            calculateBtn.disabled = true;
            calculateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Calculating...';

            setTimeout(() => {
                calculateBtn.disabled = false;
                calculateBtn.innerHTML = 'Get Instant Price';
                priceDisplay.textContent = finalPrice;
                resultCard.style.display = 'block';
                resultCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 1500);
        });
    }

    // Direct Upload Link from Dashboard Home
    const directUpload = document.getElementById('btn-upload-direct');
    const uploadTrigger = document.getElementById('upload-trigger');

    if (directUpload) {
        directUpload.addEventListener('click', () => {
            const uploadTarget = document.querySelector('[data-target="upload"]') || document.querySelector('[data-target="uploadsContent"]');
            if (uploadTarget) uploadTarget.click();
        });
    }
    if (uploadTrigger) {
        uploadTrigger.addEventListener('click', () => {
            const uploadTarget = document.querySelector('[data-target="upload"]') || document.querySelector('[data-target="uploadsContent"]');
            if (uploadTarget) uploadTarget.click();
        });
    }

    // Dynamic Search Placeholder (Mobile vs Desktop)
    const orderSearch = document.querySelector('.order-search-input');
    if (orderSearch) {
        const updatePlaceholder = () => {
            if (window.innerWidth < 768) {
                orderSearch.placeholder = 'Search';
            } else {
                orderSearch.placeholder = 'Search orders...';
            }
        };
        updatePlaceholder();
        window.addEventListener('resize', updatePlaceholder);
    }
});
