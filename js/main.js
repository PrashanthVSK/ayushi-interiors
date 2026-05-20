/* ==========================================================================
   Ayushi Interiors & Decorations - JavaScript
   Features: Navigation, Tabs, Filterable Gallery, Lightbox, Slider, Form
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Initialize Lucide Icons ---
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // --- 2. Sticky Header Scroll Effect ---
    const header = document.getElementById('header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger once on load in case of refresh

    // --- 3. Mobile Navigation Menu Toggle ---
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking anywhere outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // --- 4. Specialties Section Tab Toggle ---
    const tabButtons = document.querySelectorAll('#specialtiesTabs .tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Remove active states from buttons
            tabButtons.forEach(b => b.classList.remove('active'));
            // Add active state to clicked button
            btn.classList.add('active');
            
            // Fade out current panel, switch panels, then fade in new panel
            tabPanels.forEach(panel => {
                if (panel.classList.contains('active')) {
                    panel.classList.remove('active');
                }
                
                if (panel.id === targetTab) {
                    // Small delay to allow fade out transition
                    setTimeout(() => {
                        panel.classList.add('active');
                    }, 50);
                }
            });
        });
    });

    // --- 5. Portfolio Gallery Category Filter ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');
            
            // Update active state of buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.classList.add('show');
                } else {
                    item.classList.remove('show');
                }
            });
        });
    });

    // --- 6. Portfolio Lightbox Display ---
    const lightbox = document.getElementById('portfolioLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCat = document.getElementById('lightboxCat');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDesc = document.getElementById('lightboxDesc');
    const lightboxClose = document.getElementById('lightboxClose');
    const viewButtons = document.querySelectorAll('.view-item-btn');

    const openLightbox = (item) => {
        const img = item.querySelector('img');
        const overlay = item.querySelector('.portfolio-overlay');
        const category = overlay.querySelector('.item-cat').textContent;
        const title = overlay.querySelector('h4').textContent;
        const desc = overlay.querySelector('p').textContent;

        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCat.textContent = category;
        lightboxTitle.textContent = title;
        lightboxDesc.textContent = desc;

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock background scroll
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore background scroll
    };

    // Attach click events to the zoom buttons
    viewButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Avoid triggering card click
            const portfolioItem = btn.closest('.portfolio-item');
            openLightbox(portfolioItem);
        });
    });

    // Also open lightbox when clicking on the portfolio card itself
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            openLightbox(item);
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Close lightbox on escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // --- 7. Testimonials Carousel / Slider ---
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    let currentIndex = 0;

    const showTestimonial = (index) => {
        testimonialCards.forEach((card, i) => {
            card.classList.remove('active');
            if (i === index) {
                card.classList.add('active');
            }
        });
    };

    if (nextBtn && prevBtn && testimonialCards.length > 0) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % testimonialCards.length;
            showTestimonial(currentIndex);
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
            showTestimonial(currentIndex);
        });

        // Optional Auto Play Testimonials every 6 seconds
        let autoPlay = setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonialCards.length;
            showTestimonial(currentIndex);
        }, 6000);

        // Reset auto play interval when buttons are clicked
        const resetInterval = () => {
            clearInterval(autoPlay);
            autoPlay = setInterval(() => {
                currentIndex = (currentIndex + 1) % testimonialCards.length;
                showTestimonial(currentIndex);
            }, 6000);
        };

        nextBtn.addEventListener('click', resetInterval);
        prevBtn.addEventListener('click', resetInterval);
    }

    // --- 8. Consultation Booking Form Handler ---
    const form = document.getElementById('consultationForm');
    const feedback = document.getElementById('formFeedback');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('.btn-submit');
            const originalBtnContent = submitBtn.innerHTML;
            
            // Show loading animation in button
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Booking, please wait... <i data-lucide="loader" class="animate-spin"></i>';
            if (typeof lucide !== 'undefined') lucide.createIcons();

            // Inputs
            const nameVal = document.getElementById('clientName').value.trim();
            const phoneVal = document.getElementById('clientPhone').value.trim();
            const emailVal = document.getElementById('clientEmail').value.trim();
            const projectVal = document.getElementById('projectType').value;
            const budgetVal = document.getElementById('budgetRange').value;

            // Simple validation regex
            const phoneRegex = /^[6-9]\d{9}$/; // 10 digit Indian mobile numbers
            const formattedPhone = phoneVal.replace(/[\s-]/g, '');

            // Perform quick validation
            if (!nameVal || !phoneVal) {
                feedback.textContent = 'Please fill out all required fields marked with *';
                feedback.className = 'form-feedback error';
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
                if (typeof lucide !== 'undefined') lucide.createIcons();
                return;
            }

            if (formattedPhone.length < 10) {
                feedback.textContent = 'Please enter a valid 10-digit mobile number';
                feedback.className = 'form-feedback error';
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
                if (typeof lucide !== 'undefined') lucide.createIcons();
                return;
            }

            // SheetDB URL Configuration
            // TO CONNECT YOUR GOOGLE SHEET:
            // 1. Create a Google Sheet with headers in Row 1: Date, Name, Phone, Email, ProjectType, Budget, Message
            // 2. Go to https://sheetdb.io, sign up for a free account, and paste your Google Sheet link to get an API URL.
            // 3. Replace 'YOUR_SHEETDB_API_URL' below with your SheetDB API URL (e.g. 'https://sheetdb.io/api/v1/a1b2c3d4e5f6').
            const SHEETDB_URL = 'https://sheetdb.io/api/v1/t49luzxomv2ze'; 

            const payload = {
                data: [
                    {
                        "Date": new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
                        "Name": nameVal,
                        "Phone": phoneVal,
                        "Email": emailVal || 'N/A',
                        "ProjectType": projectVal,
                        "Budget": budgetVal,
                        "Message": document.getElementById('clientMessage').value.trim() || 'N/A'
                    }
                ]
            };

            if (SHEETDB_URL === 'YOUR_SHEETDB_API_URL') {
                // FALLBACK MOCKUP: Runs when the SheetDB URL is not configured yet
                console.log('SheetDB API is not configured yet. Lead data payload:', payload);
                setTimeout(() => {
                    feedback.innerHTML = `<strong>Thank you, ${nameVal}!</strong><br>Your consultation request for ${projectVal} is booked (Simulation). To save this to Google Sheets, configure your SheetDB URL in <code>js/main.js</code>.`;
                    feedback.className = 'form-feedback success';
                    
                    form.reset();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnContent;
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                }, 1200);
            } else {
                // REAL API POST: Sends data directly to SheetDB endpoint
                fetch(SHEETDB_URL, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('SheetDB Server Error');
                    }
                })
                .then(data => {
                    feedback.innerHTML = `<strong>Thank you, ${nameVal}!</strong><br>Your consultation request for ${projectVal} has been successfully booked. Our expert designer will call you on <strong>${phoneVal}</strong> within 24 hours.`;
                    feedback.className = 'form-feedback success';
                    
                    form.reset();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnContent;
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                })
                .catch(error => {
                    console.error('SheetDB Submit Error:', error);
                    feedback.textContent = 'Oops! We could not save your booking online. Please call us directly at 8050044844 / 9739840744.';
                    feedback.className = 'form-feedback error';
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnContent;
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                });
            }
        });
    }

    // --- 9. Active Link Switching on Scroll (Intersection Observer) ---
    const sections = document.querySelectorAll('section[id]');
    
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Trigger when section occupies center screen
        threshold: 0
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));

});
