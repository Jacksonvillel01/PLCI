document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navList = document.querySelector('.nav-list');
    
    mobileToggle.addEventListener('click', () => {
        const visibility = navList.getAttribute('data-visible');
        
        if (visibility === "false") {
            navList.setAttribute('data-visible', "true");
            mobileToggle.setAttribute('aria-expanded', "true");
        } else {
            navList.setAttribute('data-visible', "false");
            mobileToggle.setAttribute('aria-expanded', "false");
        }
    });
    
    // Smooth scrolling for anchor navigation only; allow regular page links to work normally
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // If it’s a hash link to a section on the current page, smooth scroll.
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);

                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    if (navList.getAttribute('data-visible') === "true") {
                        navList.setAttribute('data-visible', "false");
                        mobileToggle.setAttribute('aria-expanded', "false");
                    }
                }
            }

            // For external page links like branches.html or give.html, allow normal navigation.
        });
    });
    
    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        // Show/hide back to top button
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
        
        // Highlight active navigation link
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
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
    
    // Back to top functionality
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Intersection Observer for section animations
    const sections = document.querySelectorAll('.section');
    
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Sermon download functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('download-btn') || e.target.parentElement.classList.contains('download-btn')) {
            const btn = e.target.classList.contains('download-btn') ? e.target : e.target.parentElement;
            const sermonFile = btn.getAttribute('data-sermon');
            
            // Create a temporary link to trigger download
            const link = document.createElement('a');
            link.href = sermonFile;
            link.download = sermonFile.split('/').pop();
            link.click();
        }
    });
    
    // Gallery image download functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('gallery-download-btn') || e.target.parentElement.classList.contains('gallery-download-btn')) {
            const btn = e.target.classList.contains('gallery-download-btn') ? e.target : e.target.parentElement;
            const imageFile = btn.getAttribute('data-image');
            
            // Create a temporary link to trigger download
            const link = document.createElement('a');
            link.href = imageFile;
            link.download = imageFile.split('/').pop();
            link.click();
        }
    });
    
    
    // Event registration button
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('register-btn')) {
            e.preventDefault();
            alert('Thank you for your interest! Registration form would open here.');
        }
    });
    
    // Contact form submission
    document.addEventListener('submit', function(e) {
        if (e.target.id === 'contactForm') {
            e.preventDefault();

            const form = e.target;
            const submitBtn = document.getElementById('submitBtn');
            const btnText = document.getElementById('btnText');
            const btnLoading = document.getElementById('btnLoading');
            const formMessage = document.getElementById('formMessage');

            // Show loading state
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';
            formMessage.style.display = 'none';

            // Prepare form data
            const formData = new FormData(form);

            // Submit form using fetch
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Success
                    formMessage.style.display = 'block';
                    formMessage.className = 'success-message';
                    formMessage.textContent = 'Thank you for your message! We will get back to you soon.';
                    form.reset();
                } else {
                    // Error
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                // Error handling
                formMessage.style.display = 'block';
                formMessage.className = 'error-message';
                formMessage.textContent = 'Oops! There was a problem sending your message. Please try again or contact us directly.';
                console.error('Form submission error:', error);
            })
            .finally(() => {
                // Reset button state
                submitBtn.disabled = false;
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
            });
        }
    });
    
    // Modal functionality for audio player (guarded if modal is not on this page)
    const modal = document.getElementById('audioModal');
    const modalAudio = document.getElementById('modal-audio');
    const modalTitle = document.getElementById('modal-title');
    const closeModal = document.querySelector('.close-modal');

    if (modal && modalAudio && closeModal) {
        // Close modal when clicking X
        closeModal.addEventListener('click', function() {
            modal.style.display = "none";
            modalAudio.pause();
        });

        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = "none";
                modalAudio.pause();
            }
        });
    } else {
        // Optional: log for developers in dev mode
        // console.debug('Audio modal elements not found: skipping modal setup.');
    }
    
    // Add pulse animation to important elements
    const importantElements = document.querySelectorAll('.btn, .action-btn, .register-btn, .submit-btn');
    importantElements.forEach(el => {
        el.classList.add('pulse-animation');
    });
    
    // Add float animation to hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('float-animation');
    }
    
    // Copy phone number to clipboard functionality
    function showCopyNotification(message, isError = false) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${isError ? '#e74c3c' : '#27ae60'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            font-weight: 500;
            animation: slideIn 0.3s ease;
        `;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2500);
    }

    function copyToClipboard(phoneNumber) {
        const copyText = String(phoneNumber).trim();

        if (!copyText) {
            showCopyNotification('No number to copy', true);
            return;
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(copyText)
                .then(() => showCopyNotification('Phone number copied!'))
                .catch(() => fallbackCopyText(copyText));
        } else {
            fallbackCopyText(copyText);
        }
    }

    function fallbackCopyText(text) {
        try {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.setAttribute('readonly', '');
            textArea.style.position = 'fixed';
            textArea.style.top = '-9999px';
            textArea.style.left = '-9999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);

            if (successful) {
                showCopyNotification('Phone number copied!');
            } else {
                // Last resort: show prompt for manual copy
                window.prompt('Copy this phone number', text);
                showCopyNotification('Copy the number from the prompt', true);
            }
        } catch (err) {
            console.error('Fallback copy failed', err);
            window.prompt('Copy this phone number', text);
            showCopyNotification('Copy the number from the prompt', true);
        }
    }

    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const phoneAttr = this.getAttribute('data-phone');
            const numberText = this.closest('.mobile-money-card')?.querySelector('.phone-number')?.textContent;
            const number = (phoneAttr || numberText || '').trim();
            const originalText = btn.innerHTML;

            if (number) {
                copyToClipboard(number);
                btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    btn.innerHTML = originalText;
                }, 1800);
            } else {
                showCopyNotification('Copy number not found', true);
            }
        });
    });
});


