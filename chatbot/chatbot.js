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
        respuesta = "El precio depende del servicio. Puedes escribirnos directamente por WhatsApp al 999 999 999 📲";
    }

    else if(message.includes("horario")) {
        respuesta = "Atendemos de lunes a sábado de 9:00am a 7:00pm ⏰";
    }

    else if(message.includes("ubicación") || message.includes("donde") || message.includes("lima")) {
        respuesta = "Atendemos en Lima y también ofrecemos servicio a domicilio 🚗";
    }

    else if(message.includes("whatsapp") || message.includes("contacto")) {
        respuesta = "Puedes escribirnos aquí 👉 https://wa.me/51999999999";
        
        // Redirigir automáticamente después de 2 segundos
        setTimeout(() => {
            window.open("https://wa.me/51999999999", "_blank");
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