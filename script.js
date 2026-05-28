/**
 * Fedra Caseiro - Landing Page Functionality
 */

// 1. WhatsApp Configuration
const WHATSAPP_CONFIG = {
    phone: "+351911515750", // Número real da Fedra
    message: "Olá Fedra, vi a tua página e gostava de perceber como posso comunicar melhor e vender com mais estratégia."
};

/**
 * Abre o link do WhatsApp com a mensagem configurada
 */
function openWhatsApp() {
    // Remove caracteres não numéricos exceto se for necessário para a API (a API prefere apenas números com código de país)
    const cleanPhone = WHATSAPP_CONFIG.phone.replace(/[^\d]/g, '');
    const encodedMessage = encodeURIComponent(WHATSAPP_CONFIG.message);
    const url = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
    window.open(url, '_blank', 'noopener,noreferrer');
}

document.addEventListener('DOMContentLoaded', () => {
    // 2. Set WhatsApp click events to all elements with class 'js-whatsapp-cta'
    const whatsappButtons = document.querySelectorAll('.js-whatsapp-cta');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            openWhatsApp();
        });
    });

    // 3. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // 4. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        questionBtn.addEventListener('click', () => {
            const isExpanded = questionBtn.getAttribute('aria-expanded') === 'true';
            
            // Close other FAQs for a clean accordion effect
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current FAQ
            questionBtn.setAttribute('aria-expanded', !isExpanded);
            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');
            if (!isExpanded) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    // 5. Scroll Animations (Fade-in on scroll)
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                animationObserver.unobserve(entry.target); // Trigger once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(el => animationObserver.observe(el));

    // 6. Automatic Footer Year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 7. Smooth Scroll Offset adjustment for Fixed Header
    const header = document.querySelector('.site-header');
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
