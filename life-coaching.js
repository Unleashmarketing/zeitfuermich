document.addEventListener('DOMContentLoaded', function() {
    // FAQ Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Open first FAQ item by default
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
    
    // Package card hover effect
    const packageCards = document.querySelectorAll('.package-card');
    
    packageCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            packageCards.forEach(otherCard => {
                if (otherCard !== card && otherCard.classList.contains('package-featured')) {
                    otherCard.style.transform = 'scale(1)';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            packageCards.forEach(otherCard => {
                if (otherCard.classList.contains('package-featured')) {
                    otherCard.style.transform = 'scale(1.05)';
                }
            });
        });
    });
    
    // Form validation and enhancement
    const bookingForm = document.getElementById('booking-form');
    
    if (bookingForm) {
        const coachingTypeSelect = document.getElementById('coaching-type');
        const messageField = document.getElementById('message');
        
        coachingTypeSelect.addEventListener('change', function() {
            if (this.value === 'intro') {
                messageField.placeholder = 'Teile mir gerne mit, woran du arbeiten möchtest und welche Fragen du zum Coaching-Prozess hast.';
            } else {
                messageField.placeholder = 'Teile mir gerne mit, woran du arbeiten möchtest oder welche Ziele du durch das Coaching erreichen willst.';
            }
        });
        
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            const requiredFields = bookingForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (!isValid) {
                alert('Bitte fülle alle Pflichtfelder aus.');
                return;
            }
            
            // Here you would typically send form data to server
            // For demo purposes, we'll just show an alert
            alert('Vielen Dank für deine Anfrage. Ich werde mich innerhalb der nächsten 24 Stunden bei dir melden.');
            
            // Reset form and close modal
            this.reset();
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Smooth scroll to sections
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]:not(.modal-trigger)');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
