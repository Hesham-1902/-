// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initSlider();
    initModals();
    initMobileMenu();
    initLanguageSwitcher();
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
});

// Hero Slider Functionality
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;
    let slideInterval;

    // Function to show a specific slide
    function showSlide(n) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Update current slide index
        currentSlide = (n + slides.length) % slides.length;
        
        // Show current slide and activate corresponding dot
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // Function to show next slide
    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // Function to show previous slide
    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Event listeners for navigation buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetSlideInterval();
        });
    });

    // Auto slide functionality
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function resetSlideInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }

    // Start auto sliding
    startSlideInterval();

    // Pause auto sliding on hover
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            startSlideInterval();
        });
    }
}

// Modal Windows Functionality
function initModals() {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const closeModals = document.querySelectorAll('.close-modal');
    const switchToRegister = document.getElementById('switchToRegister');
    const switchToLogin = document.getElementById('switchToLogin');

    // Function to open a modal
    function openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Function to close a modal
    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Function to close all modals
    function closeAllModals() {
        closeModal(loginModal);
        closeModal(registerModal);
    }

    // Event listeners for opening modals
    if (loginBtn) {
        loginBtn.addEventListener('click', () => openModal(loginModal));
    }
    
    if (registerBtn) {
        registerBtn.addEventListener('click', () => openModal(registerModal));
    }

    // Event listeners for closing modals
    closeModals.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            closeModal(modal);
        });
    });

    // Switch between login and register modals
    if (switchToRegister) {
        switchToRegister.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal(loginModal);
            openModal(registerModal);
        });
    }
    
    if (switchToLogin) {
        switchToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal(registerModal);
            openModal(loginModal);
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeAllModals();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });

    // Form submission handlers
    const loginForm = document.querySelector('#loginModal .auth-form');
    const registerForm = document.querySelector('#registerModal .auth-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Here you would typically send the login data to your backend
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            // Simulate login process
            simulateLogin(email, password);
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Here you would typically send the registration data to your backend
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const userType = document.getElementById('userType').value;
            
            // Simulate registration process
            simulateRegistration(firstName, lastName, email, password, userType);
        });
    }
}

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuToggle.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
}

// Language Switcher Functionality
function initLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            langButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get selected language
            const lang = button.getAttribute('data-lang');
            
            // Here you would typically change the site language
            changeLanguage(lang);
        });
    });
}

// Simulate Login Process
function simulateLogin(email, password) {
    // Show loading state
    const submitBtn = document.querySelector('#loginModal .btn-primary');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري تسجيل الدخول...';
    submitBtn.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // For demo purposes, we'll just close the modal and show a success message
        document.getElementById('loginModal').classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Update UI to show user is logged in
        updateUserInterface(true);
        
        // Show success message
        showNotification('تم تسجيل الدخول بنجاح!', 'success');
    }, 1500);
}

// Simulate Registration Process
function simulateRegistration(firstName, lastName, email, password, userType) {
    // Show loading state
    const submitBtn = document.querySelector('#registerModal .btn-primary');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري إنشاء الحساب...';
    submitBtn.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // For demo purposes, we'll just close the modal and show a success message
        document.getElementById('registerModal').classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Show success message
        showNotification('تم إنشاء الحساب بنجاح! يرجى تفعيل الحساب عبر البريد الإلكتروني.', 'success');
    }, 1500);
}

// Update UI based on authentication state
function updateUserInterface(isLoggedIn) {
    const authButtons = document.querySelector('.auth-buttons');
    
    if (isLoggedIn) {
        authButtons.innerHTML = `
            <div class="user-menu">
                <button class="btn btn-outline" id="userProfileBtn">
                    <i class="fas fa-user"></i> حسابي
                </button>
                <button class="btn btn-primary" id="logoutBtn">
                    <i class="fas fa-sign-out-alt"></i> تسجيل الخروج
                </button>
            </div>
        `;
        
        // Add event listener for logout button
        document.getElementById('logoutBtn').addEventListener('click', () => {
            updateUserInterface(false);
            showNotification('تم تسجيل الخروج بنجاح!', 'info');
        });
    } else {
        authButtons.innerHTML = `
            <button class="btn btn-outline" id="loginBtn">تسجيل الدخول</button>
            <button class="btn btn-primary" id="registerBtn">إنشاء حساب</button>
        `;
        
        // Reinitialize modal functionality for the new buttons
        initModals();
    }
}

// Change Language (placeholder for actual implementation)
function changeLanguage(lang) {
    // In a real application, this would make an API call to change the language
    // and then update the page content accordingly
    
    if (lang === 'en') {
        document.documentElement.dir = 'ltr';
        document.documentElement.lang = 'en';
        // Here you would typically load English content
    } else {
        document.documentElement.dir = 'rtl';
        document.documentElement.lang = 'ar';
        // Here you would typically load Arabic content
    }
    
    // Show notification
    showNotification(`تم تغيير اللغة إلى ${lang === 'ar' ? 'العربية' : 'English'}`, 'info');
}

// Show Notification
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles for notification
    const notificationStyles = `
        <style>
            .notification {
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                z-index: 1200;
                min-width: 300px;
                max-width: 500px;
                border-radius: 4px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                animation: slideDown 0.3s ease;
            }
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px 16px;
                color: white;
            }
            .notification-info {
                background-color: #17a2b8;
            }
            .notification-success {
                background-color: #28a745;
            }
            .notification-warning {
                background-color: #ffc107;
                color: #212529;
            }
            .notification-error {
                background-color: #dc3545;
            }
            .notification-close {
                background: none;
                border: none;
                color: inherit;
                font-size: 1.25rem;
                cursor: pointer;
                margin-right: 8px;
            }
            @keyframes slideDown {
                from { transform: translate(-50%, -100%); opacity: 0; }
                to { transform: translate(-50%, 0); opacity: 1; }
            }
        </style>
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'notification-styles';
        styleElement.textContent = notificationStyles;
        document.head.appendChild(styleElement);
    }
    
    // Add notification to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
    
    // Close button event
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
}

// Event registration functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners to event registration buttons
    const eventRegisterBtns = document.querySelectorAll('.event-actions .btn-primary');
    
    eventRegisterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const eventCard = this.closest('.event-card');
            const eventTitle = eventCard.querySelector('.event-title').textContent;
            
            // Show registration modal or process
            showEventRegistrationModal(eventTitle);
        });
    });
});

// Show Event Registration Modal
function showEventRegistrationModal(eventTitle) {
    // Create modal HTML
    const modalHTML = `
        <div class="modal active" id="eventRegistrationModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>التسجيل في الفعالية</h2>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <p>أنت على وشك التسجيل في الفعالية: <strong>${eventTitle}</strong></p>
                    <form class="auth-form" id="eventRegistrationForm">
                        <div class="form-group">
                            <label for="registrantName">الاسم الكامل</label>
                            <input type="text" id="registrantName" required>
                        </div>
                        <div class="form-group">
                            <label for="registrantEmail">البريد الإلكتروني</label>
                            <input type="email" id="registrantEmail" required>
                        </div>
                        <div class="form-group">
                            <label for="registrantPhone">رقم الهاتف</label>
                            <input type="tel" id="registrantPhone" required>
                        </div>
                        <div class="form-group">
                            <label for="registrantOrganization">المؤسسة/الجهة</label>
                            <input type="text" id="registrantOrganization">
                        </div>
                        <div class="form-options">
                            <label class="checkbox-container">
                                <input type="checkbox" required>
                                <span class="checkmark"></span>
                                أوافق على مشاركة معلوماتي لأغراض تنظيم الفعالية
                            </label>
                        </div>
                        <button type="submit" class="btn btn-primary btn-full">تأكيد التسجيل</button>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Initialize modal functionality
    const modal = document.getElementById('eventRegistrationModal');
    const closeBtn = modal.querySelector('.close-modal');
    const form = document.getElementById('eventRegistrationForm');
    
    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    // Close when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = form.querySelector('.btn-primary');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التسجيل...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Close modal
            modal.remove();
            
            // Show success message
            showNotification('تم تسجيلك في الفعالية بنجاح! ستتلقى تأكيدًا عبر البريد الإلكتروني.', 'success');
        }, 1500);
    });
}