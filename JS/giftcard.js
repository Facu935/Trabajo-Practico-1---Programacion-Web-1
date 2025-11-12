// giftcard.js
import { localStorageUsuarios, guardarModificacionLocalStorage, obtenerUsuarioLogueado } from "./funciones-generales.js";

export function agregarGiftcardAlUsuario(destinatario, monto, color) {
    const usuarios = localStorageUsuarios();
    const usuarioActual = obtenerUsuarioLogueado();

    if (!usuarioActual) {
        alert("Debes iniciar sesión para agregar una giftcard.");
        window.location.href = "../pages/login.html"; // Redirige si no está logueado
        return;
    }

    const usuarioIndex = usuarios.findIndex(u => u.email === usuarioActual.email);
    if (usuarioIndex === -1) {
        alert("No se encontró el usuario en la base local.");
        return;
    }

    // Asignamos la giftcard al usuario logueado
    usuarios[usuarioIndex].giftcard = {
        destinatario: destinatario,
        monto: monto,
        color: color
    };

    guardarModificacionLocalStorage(usuarios);
    localStorage.setItem("usuarioLogueado", JSON.stringify(usuarios[usuarioIndex]));

    mostrarPopup();
}

// --- Función para mostrar el popup de éxito ---
function mostrarPopup() {
    const overlay = document.querySelector(".overlay");
    if (overlay) {
        overlay.style.display = "flex";
    }
}

// --- Manejo del formulario y vista previa ---
document.addEventListener("DOMContentLoaded", () => {
    const formGiftcard = document.querySelector("#formGiftcard");
    const montoInput = document.querySelector("#monto");
    const destinatarioInput = document.querySelector("#destinatario");
    const colorRadios = document.querySelectorAll("input[name='color']");

    // Elementos de vista previa
    const previewBox = document.querySelector("#preview-box");
    const previewMontoTop = document.querySelector("#monto-top-right");
    const previewMontoBottom = document.querySelector("#monto-bottom-left");
    const previewDestinatario = document.querySelector("#destinatario-name");

    if (!formGiftcard) return;

    // --- Actualiza la vista previa ---
    function actualizarVistaPrevia() {
        const monto = montoInput.value || "0000";
        const destinatario = destinatarioInput.value || "Destinatario";
        const colorSeleccionado = document.querySelector("input[name='color']:checked").value;

        // Cambia fondo y textos
        previewBox.style.backgroundColor = colorSeleccionado;
        previewMontoTop.textContent = `$${monto}.-`;
        previewMontoBottom.textContent = `$${monto}.-`;
        previewDestinatario.textContent = destinatario;

        // Muestra el monto inferior si hay monto cargado
        previewMontoBottom.style.display = montoInput.value ? "inline" : "none";

        // Ajusta color de texto según el contraste
        const textoColor = calcularContraste(colorSeleccionado);
        previewBox.style.color = textoColor;
    }

    // --- Calcular contraste para texto legible ---
    function calcularContraste(hexColor) {
        hexColor = hexColor.replace("#", "");
        const r = parseInt(hexColor.substring(0, 2), 16);
        const g = parseInt(hexColor.substring(2, 4), 16);
        const b = parseInt(hexColor.substring(4, 6), 16);
        const luminancia = 0.299 * r + 0.587 * g + 0.114 * b;
        return luminancia > 150 ? "#000" : "#fff";
    }

    // --- Listeners dinámicos ---
    montoInput.addEventListener("input", actualizarVistaPrevia);
    destinatarioInput.addEventListener("input", actualizarVistaPrevia);
    colorRadios.forEach(radio => radio.addEventListener("change", actualizarVistaPrevia));

    // --- Envío del formulario ---
    formGiftcard.addEventListener("submit", e => {
        e.preventDefault();

        const destinatario = destinatarioInput.value.trim();
        const monto = parseFloat(montoInput.value);
        const color = document.querySelector("input[name='color']:checked").value;

        if (!destinatario || isNaN(monto) || monto < 1000) {
            alert("Por favor, complete todos los campos correctamente.");
            return;
        }

        agregarGiftcardAlUsuario(destinatario, monto, color);
    });

    // --- Inicializa vista previa ---
    actualizarVistaPrevia();
});
