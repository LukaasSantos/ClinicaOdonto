// ======== INICIALIZAÇÃO ========
document.addEventListener('DOMContentLoaded', function() {
    // Garantir que AOS está disponível antes de inicializar
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            easing: 'ease-in-out',
            disable: 'mobile' // Desabilitar em mobile se necessário
        });
        console.log('AOS initialized successfully');
    } else {
        console.error('AOS library not loaded');
        // Fallback: adicionar classes de animação manualmente
        initFallbackAnimations();
    }

    // Inicializar outros componentes
    initNavbar();
    initWhatsAppIntegration();
    initSmoothScroll();
    initAnimations();
    initPerformanceOptimizations();
    
    // Forçar animações como fallback
    setTimeout(forceAnimations, 1000);
});

// ======== ANIMAÇÕES FALLBACK ========
function initFallbackAnimations() {
    const elements = document.querySelectorAll('[data-aos]');
    console.log(`Found ${elements.length} elements with data-aos attributes`);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animationType = entry.target.getAttribute('data-aos') || 'fade-up';
                entry.target.classList.add('aos-animate');
                console.log(`Animating element with ${animationType}`);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// ======== FORÇAR ANIMAÇÕES ========
function forceAnimations() {
    // Forçar animações após carregamento completo
    setTimeout(() => {
        const elements = document.querySelectorAll('[data-aos]');
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('aos-animate');
            }, index * 100); // Stagger animations
        });
    }, 500);
}

// ======== NAVBAR SCROLL ========
function initNavbar() {
    const navbar = document.getElementById('mainNav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ======== WHATSAPP INTEGRATION ========
function initWhatsAppIntegration() {
    // Adicionar tracking aos links do WhatsApp
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Adicionar efeito de loading
            const originalText = this.innerHTML;
            const loadingText = '<i class="fas fa-spinner fa-spin me-2"></i>Conectando...';
            
            this.innerHTML = loadingText;
            
            // Restaurar texto original após um breve delay
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 1000);
            
            // Analytics (se necessário)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'whatsapp_click', {
                    'event_category': 'engagement',
                    'event_label': 'whatsapp_button'
                });
            }
        });
    });
    
    // Mensagem personalizada baseada no horário
    updateTimeBasedMessages();
}

// ======== MENSAGENS BASEADAS NO HORÁRIO ========
function updateTimeBasedMessages() {
    const hour = new Date().getHours();
    let greeting = '';
    let message = '';
    
    if (hour < 12) {
        greeting = 'Bom dia';
        message = 'Gostaria de agendar uma consulta para hoje';
    } else if (hour < 18) {
        greeting = 'Boa tarde';
        message = 'Gostaria de agendar uma consulta para esta tarde';
    } else {
        greeting = 'Boa noite';
        message = 'Gostaria de agendar uma consulta para amanhã';
    }
    
    // Atualizar mensagens principais
    const mainWhatsAppLinks = document.querySelectorAll('.whatsapp-btn, .btn-whatsapp-nav');
    mainWhatsAppLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes('wa.me')) {
            const newMessage = encodeURIComponent(`${greeting}! ${message} na Clínica Sorriso Perfeito.`);
            link.setAttribute('href', href.replace(/text=[^&]*/, `text=${newMessage}`));
        }
    });
}

// ======== SMOOTH SCROLL ========
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Fechar menu mobile se estiver aberto
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });
}

// ======== ANIMAÇÕES ADICIONAIS ========
function initAnimations() {
    // Animação de números (se houver contadores)
    animateCounters();
    
    // Animação de elementos ao entrar na viewport
    observeElements();
    
    // Parallax effect no hero
    initParallax();
}

// ======== ANIMAÇÃO DE CONTADORES ========
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length === 0) return;
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// ======== OBSERVAR ELEMENTOS ========
function observeElements() {
    const animatedElements = document.querySelectorAll('.fade-in-up, .bounce-in');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease-out';
        observer.observe(element);
    });
}

// ======== PARALLAX EFFECT ========
function initParallax() {
    const heroSection = document.querySelector('.hero-section');
    
    if (!heroSection) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = heroSection.querySelector('::before');
        
        if (parallax) {
            const speed = 0.5;
            parallax.style.transform = `translateY(${scrolled * speed}px)`;
        }
    });
}

// ======== PERFORMANCE OPTIMIZATIONS ========
function initPerformanceOptimizations() {
    // Lazy loading para imagens
    lazyLoadImages();
    
    // Debounce para eventos de scroll
    debounceScroll();
    
    // Preload de recursos críticos
    preloadCriticalResources();
}

// ======== LAZY LOADING ========
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// ======== DEBOUNCE SCROLL ========
function debounceScroll() {
    let ticking = false;
    
    function updateOnScroll() {
        // Lógica que precisa executar no scroll
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });
}

// ======== PRELOAD CRITICAL RESOURCES ========
function preloadCriticalResources() {
    // Preload de fontes críticas
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
    fontLink.as = 'style';
    document.head.appendChild(fontLink);
}

// ======== UTILITÁRIOS ========
// Formatar número de telefone
function formatPhoneNumber(phone) {
    return phone.replace(/\D/g, '').replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
}

// Validar formulário
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('is-invalid');
        } else {
            input.classList.remove('is-invalid');
        }
    });
    
    return isValid;
}

// Mostrar notificação
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} position-fixed top-0 start-50 translate-middle-x mt-3`;
    notification.style.zIndex = '9999';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ======== EVENT LISTENERS ========
document.addEventListener('keydown', function(e) {
    // ESC para fechar modais
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal.show');
        modals.forEach(modal => {
            const bsModal = bootstrap.Modal.getInstance(modal);
            if (bsModal) {
                bsModal.hide();
            }
        });
    }
});

// ======== SERVICE WORKER (PWA) ========
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
                
                // Verifica por atualizações do Service Worker
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    console.log('New Service Worker found');
                    
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            console.log('New Service Worker available, refreshing page');
                            // Notifica o usuário sobre a atualização
                            if (confirm('Nova versão disponível! Deseja atualizar agora?')) {
                                window.location.reload();
                            }
                        }
                    });
                });
                
                // Escuta mensagens do Service Worker
                navigator.serviceWorker.addEventListener('message', event => {
                    if (event.data && event.data.type === 'CACHE_UPDATED') {
                        console.log('Cache updated by Service Worker');
                        if (confirm('Conteúdo atualizado! Deseja recarregar a página?')) {
                            window.location.reload();
                        }
                    }
                });
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
    
    // Força verificação de atualizações periodicamente
    setInterval(() => {
        if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({ type: 'CHECK_FOR_UPDATES' });
        }
    }, 30000); // Verifica a cada 30 segundos
}

// ======== ERROR HANDLING ========
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Enviar erro para serviço de analytics se necessário
});

// ======== EXPORT FUNCTIONS ========
window.ClinicaUtils = {
    formatPhoneNumber,
    validateForm,
    showNotification,
    updateTimeBasedMessages
};
