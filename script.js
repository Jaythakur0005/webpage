// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    const navbar = document.querySelector('.navbar');
    const contactForm = document.getElementById('contactForm');
    const scrollToTopBtn = createScrollToTopButton();

    // Add scroll event listener for navbar and scroll-to-top button
    window.addEventListener('scroll', function() {
        // Add shadow to navbar on scroll
        if (window.scrollY > 50) {
            navbar.classList.add('shadow');
            scrollToTopBtn.classList.add('visible');
        } else {
            navbar.classList.remove('shadow');
            scrollToTopBtn.classList.remove('visible');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form validation and submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form inputs
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            // Validate inputs
            if (validateForm(name, email, message)) {
                // Show success message
                showFormMessage('Message sent successfully!', 'success');
                
                // Reset form
                contactForm.reset();
                
                // In a real application, you would send the form data to a server here
                console.log('Form submitted:', {
                    name: name.value,
                    email: email.value,
                    message: message.value
                });
            }
        });
    }

    // Handle button clicks for service cards
    document.querySelectorAll('.service-card button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll animations to elements
    addScrollAnimations();
});

// Create scroll-to-top button
function createScrollToTopButton() {
    const button = document.createElement('div');
    button.className = 'scroll-to-top';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(button);

    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    return button;
}

// Form validation function
function validateForm(name, email, message) {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Reset previous error states
    removeErrorState(name);
    removeErrorState(email);
    removeErrorState(message);

    // Validate name
    if (name.value.trim() === '') {
        showErrorState(name, 'Please enter your name');
        isValid = false;
    }

    // Validate email
    if (!emailRegex.test(email.value)) {
        showErrorState(email, 'Please enter a valid email address');
        isValid = false;
    }

    // Validate message
    if (message.value.trim() === '') {
        showErrorState(message, 'Please enter your message');
        isValid = false;
    }

    return isValid;
}

// Show error state for form inputs
function showErrorState(element, message) {
    element.classList.add('is-invalid');
    const feedback = document.createElement('div');
    feedback.className = 'invalid-feedback';
    feedback.textContent = message;
    element.parentNode.appendChild(feedback);
}

// Remove error state from form inputs
function removeErrorState(element) {
    element.classList.remove('is-invalid');
    const feedback = element.parentNode.querySelector('.invalid-feedback');
    if (feedback) {
        feedback.remove();
    }
}

// Show form submission message
function showFormMessage(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} mt-3`;
    alertDiv.role = 'alert';
    alertDiv.textContent = message;

    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(alertDiv, form.nextSibling);

    // Remove alert after 3 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// Add scroll animations to elements
function addScrollAnimations() {
    const elements = document.querySelectorAll('.service-card, .section-title, .about-section img');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        observer.observe(element);
    });
} 