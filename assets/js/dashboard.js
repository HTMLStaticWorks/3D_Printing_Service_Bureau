/* 
  Project: 3D Printing Service Bureau
  Author: Senior Frontend Developer
  Dashboard Logic: Navigation, Quoting Simulation, Sidebar Toggle
*/

document.addEventListener('DOMContentLoaded', () => {
    // Sidebar Navigation Logic
    const menuItems = document.querySelectorAll('.sidebar-item[data-target]');
    const sections = document.querySelectorAll('.dashboard-section');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const target = item.getAttribute('data-target');
            
            // Update Active State on Menu
            menuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Switch Sections
            sections.forEach(sec => {
                if (sec.id === target || sec.id === `section-${target}`) {
                    sec.classList.add('active');
                    sec.classList.remove('d-none');
                } else {
                    sec.classList.remove('active');
                    sec.classList.add('d-none');
                }
            });

            // Close sidebar on mobile after click
            if (window.innerWidth < 992) {
                document.getElementById('sidebar').classList.remove('active');
            }
        });
    });

    // Sidebar Toggle for Mobile
    const toggleBtn = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
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
});
