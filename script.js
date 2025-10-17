// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initTabs();
    initModals();
    initFontSizeControls();
    initScrollToTop();
    initSearchFunctionality();
    initSmoothScrolling();
    initAnimations();
    initFormValidations();
    initInteractiveElements();
    
    console.log('✅ جميع المكونات جاهزة للعمل!');
});

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            const isActive = navMenu.classList.contains('active');
            
            mobileMenuToggle.innerHTML = isActive 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
                
            mobileMenuToggle.setAttribute('aria-expanded', isActive);
            
            // Add animation to menu items
            if (isActive) {
                animateMenuItems();
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Add click handlers for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
            
            // Add click animation
            link.style.transform = 'scale(0.95)';
            setTimeout(() => {
                link.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Animate menu items
function animateMenuItems() {
    const menuItems = document.querySelectorAll('.nav-link');
    menuItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('animate-in');
    });
}

// Tab Functionality
function initTabs() {
    const tabHeaders = document.querySelectorAll('.tab-header');
    const tabContents = document.querySelectorAll('.tab-content');

    // Set first tab as active by default
    if (tabHeaders.length > 0 && !document.querySelector('.tab-header.active')) {
        tabHeaders[0].classList.add('active');
        const firstTabId = tabHeaders[0].getAttribute('data-tab');
        const firstTabContent = document.getElementById(firstTabId);
        if (firstTabContent) {
            firstTabContent.classList.add('active');
        }
    }

    tabHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // Remove active class from all headers and contents
            tabHeaders.forEach(h => {
                h.classList.remove('active');
                h.setAttribute('aria-selected', 'false');
            });
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked header
            header.classList.add('active');
            header.setAttribute('aria-selected', 'true');
            
            // Show corresponding content with animation
            const tabId = header.getAttribute('data-tab');
            const tabContent = document.getElementById(tabId);
            if (tabContent) {
                tabContent.classList.add('active');
                
                // Add entrance animation
                tabContent.style.animation = 'none';
                setTimeout(() => {
                    tabContent.style.animation = 'fadeIn 0.5s ease';
                }, 10);
            }
            
            // Add click effect
            header.style.transform = 'scale(0.95)';
            setTimeout(() => {
                header.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Modal Windows Functionality
function initModals() {
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeModals = document.querySelectorAll('.close-modal');
    const registerLink = document.getElementById('registerLink');

    // Function to open a modal
    function openModal(modal) {
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            document.documentElement.style.paddingRight = `${getScrollbarWidth()}px`;
            
            // Focus management for accessibility
            const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (focusableElements.length > 0) {
                focusableElements[0].focus();
            }
            
            // Add escape key listener
            const escapeHandler = (e) => {
                if (e.key === 'Escape') {
                    closeModal(modal);
                    document.removeEventListener('keydown', escapeHandler);
                }
            };
            document.addEventListener('keydown', escapeHandler);
            
            // Store handler for cleanup
            modal._escapeHandler = escapeHandler;
        }
    }

    // Function to close a modal
    function closeModal(modal) {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
            document.documentElement.style.paddingRight = '';
            
            // Remove escape key listener
            if (modal._escapeHandler) {
                document.removeEventListener('keydown', modal._escapeHandler);
                delete modal._escapeHandler;
            }
        }
    }

    // Function to close all modals
    function closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            closeModal(modal);
        });
    }

    // Calculate scrollbar width
    function getScrollbarWidth() {
        return window.innerWidth - document.documentElement.clientWidth;
    }

    // Event listeners for opening modals
    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(loginModal);
        });
    }

    // Event listeners for closing modals
    closeModals.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const modal = btn.closest('.modal');
            closeModal(modal);
        });
    });

    // Register link
    if (registerLink) {
        registerLink.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('سيتم توجيهك إلى صفحة طلب العضوية قريباً', 'info');
            closeModal(loginModal);
            
            // Simulate redirect after delay
            setTimeout(() => {
                showNotification('نظام العضوية قيد التطوير حالياً', 'warning');
            }, 2000);
        });
    }

    // Close modal when clicking outside
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });

    // Form submission handlers
    const loginForm = document.querySelector('#loginModal .auth-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validate form
            if (validateForm(loginForm)) {
                // Get form data
                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;
                
                // Simulate login process
                simulateLogin(email, password);
            }
        });
    }

    // Add input animations
    const formInputs = document.querySelectorAll('.auth-form input');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
}

// Font Size Controls
function initFontSizeControls() {
    const decreaseBtn = document.getElementById('decreaseFont');
    const normalBtn = document.getElementById('normalFont');
    const increaseBtn = document.getElementById('increaseFont');

    const fontSizeMap = {
        'decreaseFont': '14px',
        'normalFont': '16px', 
        'increaseFont': '18px'
    };

    function setFontSize(size) {
        document.documentElement.style.fontSize = size;
        
        // Update active button
        [decreaseBtn, normalBtn, increaseBtn].forEach(btn => {
            if (btn) {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            }
        });
        
        const activeBtn = document.getElementById(Object.keys(fontSizeMap).find(key => fontSizeMap[key] === size));
        if (activeBtn) {
            activeBtn.classList.add('active');
            activeBtn.setAttribute('aria-pressed', 'true');
        }
        
        // Save preference to localStorage
        localStorage.setItem('preferredFontSize', size);
        
        // Show notification
        showNotification(`تم تغيير حجم الخط إلى ${size === '14px' ? 'صغير' : size === '16px' ? 'متوسط' : 'كبير'}`, 'info');
    }

    // Load saved font size
    const savedSize = localStorage.getItem('preferredFontSize') || '16px';
    setFontSize(savedSize);

    // Event listeners
    if (decreaseBtn) {
        decreaseBtn.addEventListener('click', () => {
            setFontSize('14px');
            addButtonClickEffect(decreaseBtn);
        });
    }
    
    if (normalBtn) {
        normalBtn.addEventListener('click', () => {
            setFontSize('16px');
            addButtonClickEffect(normalBtn);
        });
    }
    
    if (increaseBtn) {
        increaseBtn.addEventListener('click', () => {
            setFontSize('18px');
            addButtonClickEffect(increaseBtn);
        });
    }
}

// Scroll to Top Functionality
function initScrollToTop() {
    // Create scroll to top button
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollBtn.setAttribute('aria-label', 'الانتقال إلى الأعلى');
    document.body.appendChild(scrollBtn);

    // Show/hide button based on scroll position
    function toggleScrollButton() {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    }

    // Scroll to top function
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Add click effect
        scrollBtn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            scrollBtn.style.transform = 'scale(1)';
        }, 150);
    }

    // Event listeners
    window.addEventListener('scroll', toggleScrollButton);
    scrollBtn.addEventListener('click', scrollToTop);

    // Initial check
    toggleScrollButton();
}

// Search Functionality
function initSearchFunctionality() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const searchContainer = document.querySelector('.search-container');

    if (searchInput && searchBtn) {
        // Search button click
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            performSearch(searchInput.value);
        });

        // Enter key in search input
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(searchInput.value);
            }
        });

        // Search input focus effects
        searchInput.addEventListener('focus', () => {
            searchContainer.classList.add('focused');
        });

        searchInput.addEventListener('blur', () => {
            if (!searchInput.value) {
                searchContainer.classList.remove('focused');
            }
        });

        // Real-time search suggestions (simulated)
        searchInput.addEventListener('input', debounce((e) => {
            const query = e.target.value;
            if (query.length > 2) {
                showSearchSuggestions(query);
            }
        }, 300));
    }
}

// Perform search
function performSearch(query) {
    if (!query.trim()) {
        showNotification('يرجى إدخال كلمة للبحث', 'warning');
        return;
    }

    // Show loading state
    const searchBtn = document.querySelector('.search-btn');
    const originalHtml = searchBtn.innerHTML;
    searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    searchBtn.classList.add('btn-loading');

    // Simulate search API call
    setTimeout(() => {
        // Reset button
        searchBtn.innerHTML = originalHtml;
        searchBtn.classList.remove('btn-loading');

        // Show results
        showNotification(`تم العثور على 15 نتيجة لـ "${query}"`, 'success');
        
        // In a real application, you would display search results here
        console.log(`Searching for: ${query}`);
    }, 1500);
}

// Show search suggestions
function showSearchSuggestions(query) {
    // In a real application, this would fetch suggestions from an API
    const suggestions = [
        'الاجتهادات القضائية',
        'القوانين والتشريعات', 
        'المحكمة الدستورية',
        'التحكيم التجاري',
        'القضاء الإداري'
    ].filter(item => item.includes(query));
    
    // For demo purposes, just log the suggestions
    if (suggestions.length > 0) {
        console.log('Search suggestions:', suggestions);
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animations
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add staggered animation for cards
                if (entry.target.classList.contains('quick-card') || 
                    entry.target.classList.contains('article-card') ||
                    entry.target.classList.contains('judgement-card') ||
                    entry.target.classList.contains('archive-card')) {
                    
                    const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 0.1;
                    entry.target.style.animationDelay = `${delay}s`;
                }
            }
        });
    }, observerOptions);

    // Observe elements to animate
    document.querySelectorAll('.quick-card, .article-card, .judgement-card, .archive-card, .feature-item').forEach(el => {
        observer.observe(el);
    });

    // Add CSS for animations
    if (!document.querySelector('#animation-styles')) {
        const animationStyles = `
            <style id="animation-styles">
                .quick-card, .article-card, .judgement-card, .archive-card, .feature-item {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: opacity 0.6s ease, transform 0.6s ease;
                }
                
                .animate-in {
                    opacity: 1;
                    transform: translateY(0);
                }
                
                .nav-link {
                    transition: all 0.3s ease;
                }
                
                .nav-link.animate-in {
                    animation: slideInRight 0.5s ease forwards;
                }
                
                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', animationStyles);
    }
}

// Form Validations
function initFormValidations() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        
        inputs.forEach(input => {
            // Real-time validation
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    });
}

// Validate individual field
function validateField(field) {
    const formGroup = field.closest('.form-group');
    const value = field.value.trim();
    
    // Remove previous states
    formGroup.classList.remove('success', 'error');
    
    // Check required fields
    if (field.hasAttribute('required') && !value) {
        formGroup.classList.add('error');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            formGroup.classList.add('error');
            return false;
        }
    }
    
    // Password validation
    if (field.type === 'password' && value) {
        if (value.length < 6) {
            formGroup.classList.add('error');
            return false;
        }
    }
    
    // If all validations pass
    if (value) {
        formGroup.classList.add('success');
    }
    
    return true;
}

// Validate entire form
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Interactive Elements
function initInteractiveElements() {
    // Magazine cover interactions
    const coverDesign = document.querySelector('.cover-design');
    if (coverDesign) {
        coverDesign.addEventListener('click', function() {
            this.style.transform = 'rotateY(0) rotateX(0) scale(1.1)';
            showNotification('جاري فتح العدد الحالي...', 'info');
            
            setTimeout(() => {
                window.location.href = '#current-issue';
            }, 1000);
        });
    }

    // Quick card interactions
    const quickCards = document.querySelectorAll('.quick-card');
    quickCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const cardTitle = this.querySelector('h3').textContent;
            showNotification(`جاري التوجه إلى ${cardTitle}...`, 'info');
            
            // Add click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Article card interactions
    const articleCards = document.querySelectorAll('.article-card');
    articleCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('a')) {
                const articleTitle = this.querySelector('.article-title').textContent;
                showNotification(`جاري فتح المقال: ${articleTitle}`, 'info');
                
                // Simulate opening article
                setTimeout(() => {
                    const articleLink = this.querySelector('.article-link');
                    if (articleLink) {
                        window.location.href = articleLink.href;
                    }
                }, 1000);
            }
        });
    });

    // Judgement card interactions
    const judgementCards = document.querySelectorAll('.judgement-card');
    judgementCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.judgement-link')) {
                const judgementTitle = this.querySelector('h3').textContent;
                showNotification(`جاري فتح الحكم: ${judgementTitle}`, 'info');
            }
        });
    });
}

// Simulate Login Process
function simulateLogin(email, password) {
    // Show loading state
    const submitBtn = document.querySelector('#loginModal .btn-primary');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري تسجيل الدخول...';
    submitBtn.classList.add('btn-loading');
    submitBtn.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.classList.remove('btn-loading');
        submitBtn.disabled = false;
        
        // For demo purposes, we'll just close the modal and show a success message
        document.getElementById('loginModal').classList.remove('active');
        document.body.style.overflow = 'auto';
        document.documentElement.style.paddingRight = '';
        
        // Update UI to show user is logged in
        updateUserInterface(true);
        
        // Show success message
        showNotification('تم تسجيل الدخول بنجاح! مرحباً بعودتك.', 'success');
    }, 2000);
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
        
        // Add event listener for profile button
        document.getElementById('userProfileBtn').addEventListener('click', () => {
            showNotification('جاري فتح صفحة الملف الشخصي...', 'info');
        });
        
        // Add event listener for logout button
        document.getElementById('logoutBtn').addEventListener('click', () => {
            // Show confirmation dialog
            if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
                updateUserInterface(false);
                showNotification('تم تسجيل الخروج بنجاح!', 'info');
            }
        });
    } else {
        authButtons.innerHTML = `
            <button class="btn btn-outline" id="loginBtn"><i class="fas fa-sign-in-alt"></i> دخول الأعضاء</button>
        `;
        
        // Reinitialize modal functionality for the new button
        initModals();
    }
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
    notification.className = `notification ${type}`;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');
    
    const icons = {
        info: 'fas fa-info-circle',
        success: 'fas fa-check-circle',
        warning: 'fas fa-exclamation-triangle',
        error: 'fas fa-exclamation-circle'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="${icons[type] || icons.info}"></i>
            <span class="notification-message">${message}</span>
            <button class="notification-close" aria-label="إغلاق الإشعار">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add notification to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    const autoRemove = setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
    
    // Close button event
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoRemove);
        notification.remove();
    });
    
    // Pause auto-remove on hover
    notification.addEventListener('mouseenter', () => {
        clearTimeout(autoRemove);
    });
    
    notification.addEventListener('mouseleave', () => {
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    });
}

// Utility Functions

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add button click effect
function addButtonClickEffect(button) {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
}

// Keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    // Tab navigation for modals
    if (e.key === 'Tab' && document.querySelector('.modal.active')) {
        const modal = document.querySelector('.modal.active');
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    }
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Performance monitoring
window.addEventListener('load', () => {
    // Log performance metrics
    if ('performance' in window) {
        const perfData = window.performance.timing;
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
        
        if (loadTime > 3000) {
            console.warn('Page load time is relatively slow. Consider optimization.');
        }
    }
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    showNotification('حدث خطأ غير متوقع. يرجى تحديث الصفحة.', 'error');
});

// Export functions for global access (if needed)
window.MagazineApp = {
    showNotification,
    initModals,
    validateForm
};

console.log('🚀 مجلة هيئة قضايا الدولة - جاهزة للعمل!');
