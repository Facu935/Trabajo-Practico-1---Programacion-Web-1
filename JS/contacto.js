import { NAV, CURSOS_INFO, INTEGRANTES_DEL_GRUPO, FOOTER_LINKS_ACERCA_DE, FOOTER_LINKS_CURSOS, FOOTER_REDES } from "../constants/constants.js";
import { Header } from "./header.js";
import { Navbar } from "./navbar.js";
import { Footer } from "./footer.js";

const header = new Header();
const barraNav = new Navbar();
const footer = new Footer();

header.mostrarHeader(CURSOS_INFO);
barraNav.mostrarItems(NAV);
footer.mostrarFooter(INTEGRANTES_DEL_GRUPO, FOOTER_LINKS_ACERCA_DE, FOOTER_LINKS_CURSOS, FOOTER_REDES);

const form = document.getElementById("contactForm");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const messageInput = document.getElementById("message");
const charCount = document.getElementById("charCount");
const dialog = document.getElementById("successDialog");
const acceptBtn = document.getElementById("acceptBtn");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const lastname = document.getElementById("lastname").value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const message = messageInput.value.trim();

    const regexSoloLetras = /^[a-zA-ZñÑááéíóúÁÉÍÓÚ ]+$/;
    if (!regexSoloLetras.test(name)) {
    alert("El nombre solo debe contener letras y espacios.");
    return;
}
    if (!regexSoloLetras.test(lastname)) {
    alert("El apellido solo debe contener letras y espacios.");
    return;
    }

    const validacionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!validacionEmail.test(email)) {
    alert("Ingrese un email válido.");
    return;
    }

    if (phone !== "") {
    const validacionTelefono = /^\d{4}-\d{4}$/;
    if (!validacionTelefono.test(phone)) {
        alert("El teléfono debe tener el formato 1234-5678 (8 dígitos con guión).");
        return;
        }
    }

    if (message.length > 1000) {
        alert("La consulta no puede superar los 1000 caracteres.");
        return;
    }

    dialog.showModal();
});


messageInput.addEventListener("input", () => {
    const current = messageInput.value.length;
    charCount.textContent = `${current} / 1000`;
});


acceptBtn.addEventListener("click", () => {
    dialog.close();
    window.location.href = "../index.html";
});
