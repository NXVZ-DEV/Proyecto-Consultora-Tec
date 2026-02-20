/*
   Script de Funcionalidad para STL Solutions
   Contiene:
   1. Menú móvil (Responsive)
   2. Animaciones al hacer scroll (Scroll Reveal)
   3. Navegación suave
*/

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Funcionalidad del Menú Móvil ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Alternar clase 'active' para mostrar/ocultar menú
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // --- 2. Efecto de Navbar al hacer Scroll ---
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(11, 13, 23, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
        } else {
            navbar.style.background = 'rgba(11, 13, 23, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // --- 3. Animaciones de Aparición (Scroll Reveal) Staggered ---
    const revealElements = document.querySelectorAll('.service-card, .dev-card, .section-title, .hero-content, .about-image img, .about-content');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function (entries, revealOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                revealOnScroll.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        el.classList.add('reveal-on-scroll'); // Add class via JS to ensure logic applies
        revealOnScroll.observe(el);
    });

    // --- 4. Smooth Scroll para enlaces internos ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset para el navbar fijo
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });


    // --- 5. Integración con WhatsApp ---
    const contactForm = document.getElementById('whatsapp-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Número proporcionado por el usuario: +51 980934622
            const phoneNumber = '51980934622';

            const text = `Hola, soy ${name}. Mi correo es ${email}. Mensaje: ${message}`;
            const encodedText = encodeURIComponent(text);

            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

            window.open(whatsappUrl, '_blank');
        });
    }

});

function toggleChat() {
    const chat = document.getElementById("chatbot");
    chat.style.display = chat.style.display === "flex" ? "none" : "flex";
}

function sendMessage() {
    const input = document.getElementById("user-input");
    const message = input.value.trim().toLowerCase();
    const chatBody = document.getElementById("chat-body");

    if(message === "") return;

    // Mostrar mensaje del usuario
    const userMsg = document.createElement("div");
    userMsg.classList.add("user-message");
    userMsg.textContent = input.value;
    chatBody.appendChild(userMsg);

    // Crear respuesta del bot
    const botMsg = document.createElement("div");
    botMsg.classList.add("bot-message");

    let respuesta = "";

    // Respuestas inteligentes
    if(message.includes("hola") || message.includes("buenas")) {
        respuesta = "¡Hola! 😊 ¿Necesitas reparación, mantenimiento o cotización?";
    }

    else if(message.includes("precio") || message.includes("cuánto") || message.includes("costo")) {
        respuesta = "El precio depende del servicio. Puedes escribirnos directamente por WhatsApp al 952 105 060 📲";
    }

    else if(message.includes("horario")) {
        respuesta = "Atendemos de lunes a sábado de 9:00am a 7:00pm ⏰";
    }

    else if(message.includes("ubicación") || message.includes("donde") || message.includes("lima")) {
        respuesta = "Atendemos a todo Lima y provincia, cualquier consulta que requiera 🚗";
    }

    else if(message.includes("whatsapp") || message.includes("contacto")) {
        respuesta = "Puedes escribirnos aquí 👉 https://wa.me/51952105060";
        
        // Redirigir automáticamente después de 2 segundos
        setTimeout(() => {
            window.open("https://wa.me/51952105060", "_blank");
        }, 2000);
    }

    else if(message.includes("formateo")) {
        respuesta = "Realizamos formateo completo con instalación limpia y optimización del sistema 💻";
    }

    else if(message.includes("pantalla")) {
        respuesta = "Sí, cambiamos pantallas de laptop con repuestos de calidad 🔧";
    }

    else {
        respuesta = "Gracias por tu mensaje 😊 Para atención rápida puedes escribirnos al WhatsApp 999 999 999 📲";
    }

    botMsg.textContent = respuesta;

    setTimeout(() => {
        chatBody.appendChild(botMsg);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 500);

    input.value = "";
}