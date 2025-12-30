document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Burger Menu Toggle
    if (burger) {
        burger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            burger.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Schließe Mobile Menu bei Klick auf Link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            burger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Aktive Navigation basierend auf aktueller Seite hervorheben
    function setActiveNav() {
        const currentPage = window.location.pathname.split('/').pop();
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage || 
                (currentPage === '' && linkPage === 'index.html') ||
                (currentPage === undefined && linkPage === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    
    setActiveNav();
    
    // Smooth Scroll für interne Links (falls wir zu Ankern scrollen)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Nur für interne Anker (#...) smooth scrollen
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Kontaktformular mit Formspree
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Wird gesendet...';
        submitBtn.disabled = true;

        // FormData aus Formular erstellen
        const formData = new FormData(contactForm);

        // Senden an Formspree
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Nachricht gesendet!';
                submitBtn.style.backgroundColor = '#10b981';
                contactForm.reset();
            } else {
                submitBtn.innerHTML = '<i class="fas fa-times"></i> Fehler beim Senden';
                submitBtn.style.backgroundColor = '#ef4444';
            }

            // Reset nach 3 Sekunden
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.backgroundColor = '';
            }, 3000);
        }).catch(error => {
            console.error(error);
            submitBtn.innerHTML = '<i class="fas fa-times"></i> Fehler beim Senden';
            submitBtn.style.backgroundColor = '#ef4444';

            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.backgroundColor = '';
            }, 3000);
        });
    });
}
    // Animierte Elemente beim Scrollen
    function animateOnScroll() {
        const elements = document.querySelectorAll('.card, .timeline-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialisiere Animationen
    const animatedElements = document.querySelectorAll('.card, .timeline-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Einmal aufrufen für bereits sichtbare Elemente
});