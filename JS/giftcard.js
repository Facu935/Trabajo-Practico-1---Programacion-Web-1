// giftcard.js
import { localStorageUsuarios, guardarModificacionLocalStorage, obtenerUsuarioLogueado } from "./funciones-generales.js";

export function agregarGiftcardAlUsuario(destinatario, monto, color) {
    const usuarios = localStorageUsuarios();
    const usuarioActual = obtenerUsuarioLogueado();

    if (!usuarioActual) {
        alert("Debes iniciar sesión para agregar una giftcard.");
        window.location.href = "../pages/login.html"; 
        return;
    }

    const usuarioIndex = usuarios.findIndex(u => u.email === usuarioActual.email);
    if (usuarioIndex === -1) {
        alert("No se encontró el usuario en la base local.");
        return;
    }

    usuarios[usuarioIndex].giftcard = {
        destinatario: destinatario,
        monto: monto,
        color: color
    };

    guardarModificacionLocalStorage(usuarios);
    localStorage.setItem("usuarioLogueado", JSON.stringify(usuarios[usuarioIndex]));

    mostrarPopup();
}

function mostrarPopup() {
    const overlay = document.querySelector(".overlay");
    if (overlay) {
        overlay.style.display = "flex";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const formGiftcard = document.querySelector("#formGiftcard");
    const montoInput = document.querySelector("#monto");
    const destinatarioInput = document.querySelector("#destinatario");
    const colorRadios = document.querySelectorAll("input[name='color']");

    const previewBox = document.querySelector("#preview-box");
    const previewMontoTop = document.querySelector("#monto-top-right");
    const previewMontoBottom = document.querySelector("#monto-bottom-left");
    const previewDestinatario = document.querySelector("#destinatario-name");

    if (!formGiftcard) return;

    function actualizarVistaPrevia() {
        const monto = montoInput.value || "0000";
        const destinatario = destinatarioInput.value || "Destinatario";
        const colorSeleccionado = document.querySelector("input[name='color']:checked").value;

        
        previewBox.style.backgroundColor = colorSeleccionado;
        previewMontoTop.textContent = `$${monto}.-`;
        previewMontoBottom.textContent = `$${monto}.-`;
        previewDestinatario.textContent = destinatario;

        
        previewMontoBottom.style.display = montoInput.value ? "inline" : "none";

       
        const textoColor = calcularContraste(colorSeleccionado);
        previewBox.style.color = textoColor;
    }

 
    function calcularContraste(hexColor) {
        hexColor = hexColor.replace("#", "");
        const r = parseInt(hexColor.substring(0, 2), 16);
        const g = parseInt(hexColor.substring(2, 4), 16);
        const b = parseInt(hexColor.substring(4, 6), 16);
        const luminancia = 0.299 * r + 0.587 * g + 0.114 * b;
        return luminancia > 150 ? "#000" : "#fff";
    }

   
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

   
    actualizarVistaPrevia();
});
