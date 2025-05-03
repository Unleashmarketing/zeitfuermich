document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Mobile Dropdown Toggle
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        
        link.addEventListener('click', function(e) {
            // Only handle click on mobile
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && navMenu.classList.contains('active') && 
            !e.target.closest('.nav-menu') && 
            !e.target.closest('.mobile-menu-btn')) {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Modal Functionality
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('href');
            const modal = document.querySelector(modalId);
            
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Booking Form Submission
    const bookingForm = document.getElementById('booking-form');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // You would typically send form data to server here
            // For demo purposes, we'll just show an alert
            alert('Vielen Dank für Ihre Anfrage. Wir werden uns in Kürze bei Ihnen melden.');
            
            // Reset form and close modal
            this.reset();
            const modal = this.closest('.modal');
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    
    function showSlide(index) {
        testimonialSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        testimonialSlides[index].classList.add('active');
    }
    
    if (prevBtn && nextBtn && testimonialSlides.length > 0) {
        prevBtn.addEventListener('click', function() {
            currentSlide--;
            if (currentSlide < 0) {
                currentSlide = testimonialSlides.length - 1;
            }
            showSlide(currentSlide);
        });
        
        nextBtn.addEventListener('click', function() {
            currentSlide++;
            if (currentSlide >= testimonialSlides.length) {
                currentSlide = 0;
            }
            showSlide(currentSlide);
        });
        
        // Auto slide every 5 seconds
        setInterval(function() {
            currentSlide++;
            if (currentSlide >= testimonialSlides.length) {
                currentSlide = 0;
            }
            showSlide(currentSlide);
        }, 5000);
    }
    
    // Scroll Animations
    const scrollElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    }
    
    function handleScrollAnimation() {
        scrollElements.forEach(el => {
            if (isElementInViewport(el)) {
                el.classList.add('active');
            }
        });
    }
    
    // Initial check
    handleScrollAnimation();
    
    // Check on scroll
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Sticky Header
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    function handleStickyHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide header on scroll down, show on scroll up
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    }
    
    window.addEventListener('scroll', handleStickyHeader);
});
