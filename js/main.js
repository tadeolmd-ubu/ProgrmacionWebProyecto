// Smooth scroll para navegación
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

// Header con efecto al hacer scroll
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
    
    lastScroll = currentScroll;
});

// Animación de elementos al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Seleccionar elementos para animar
const animateElements = document.querySelectorAll('.card, .beneficio-item, .texto-nosotros, .nosotros-image, .formulario-contacto');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});

// Agregar clase para animación
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Validación del formulario de contacto
const contactForm = document.querySelector('.formulario-contacto');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const inputs = contactForm.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ef4444';
                input.style.boxShadow = '0 0 0 4px rgba(239, 68, 68, 0.1)';
            } else {
                input.style.borderColor = '#e2e8f0';
                input.style.boxShadow = 'none';
            }
        });
        
        if (isValid) {
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = 'Enviando...';
            btn.disabled = true;
            btn.style.opacity = '0.7';
            
            setTimeout(() => {
                btn.textContent = '¡Mensaje Enviado!';
                btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                
                setTimeout(() => {
                    contactForm.reset();
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                    btn.style.opacity = '1';
                }, 2000);
            }, 1500);
        }
    });
    
    // Limpiar error al escribir
    contactForm.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', () => {
            input.style.borderColor = '#3b82f6';
            input.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
        });
        
        input.addEventListener('blur', () => {
            if (input.value.trim()) {
                input.style.borderColor = '#e2e8f0';
                input.style.boxShadow = 'none';
            }
        });
    });
}

// Efecto parallax suave en el hero
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;
        
        if (scrolled < heroHeight) {
            hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
        }
    });
}

// Contador animado para estadísticas (opcional, si se agregan números)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString();
        }
    }, 16);
}

// Efecto hover 3D en cards
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Mobile menu toggle (si se implementa en el futuro)
const createMobileMenu = () => {
    const nav = document.querySelector('nav');
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    menuToggle.style.cssText = `
        display: none;
        flex-direction: column;
        gap: 5px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 5px;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .menu-toggle {
                display: flex !important;
            }
            .menu-toggle span {
                width: 25px;
                height: 3px;
                background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
                border-radius: 2px;
                transition: all 0.3s;
            }
            nav ul.active {
                display: flex !important;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                padding: 20px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            }
        }
    `;
    document.head.appendChild(style);
    
    menuToggle.addEventListener('click', () => {
        const ul = nav.querySelector('ul');
        ul.classList.toggle('active');
    });
    
    document.querySelector('.header-content').appendChild(menuToggle);
};

createMobileMenu();

// Preload images for smoother experience
const preloadImages = () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.src) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = img.src;
            document.head.appendChild(link);
        }
    });
};

preloadImages();

console.log('Fidelia - Scripts cargados correctamente ✨');
