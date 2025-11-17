import { 
    localStorageUsuarios, 
    guardarModificacionLocalStorage, 
    obtenerUsuarioLogueado 
} from "./funciones-generales.js";

const previewBox = document.getElementById("preview-box");
const montoTopRight = document.getElementById("monto-top-right");
const montoBottomLeft = document.getElementById("monto-bottom-left");
const destinatarioInput = document.getElementById("destinatario");
const previewDestinatario = document.getElementById("destinatario-name");
const montoInput = document.getElementById("monto");
const form = document.getElementById("formGiftcard");

let colorLetra = "#000";
let tamanoLetra = "28px";
let posicionMonto = "top-right";
let colorFondo = "#000";

function actualizarPreview() {
    previewDestinatario.textContent = destinatarioInput.value || "Destinatario";

    const monto = montoInput.value ? `$${montoInput.value}.-` : "$0000.-";
    montoTopRight.textContent = monto;
    montoBottomLeft.textContent = monto;

    previewBox.style.backgroundColor = colorFondo;

    previewDestinatario.style.color = colorLetra;
    montoTopRight.style.color = colorLetra;
    montoBottomLeft.style.color = colorLetra;

    previewDestinatario.style.fontSize = tamanoLetra;
    montoTopRight.style.fontSize = tamanoLetra;
    montoBottomLeft.style.fontSize = tamanoLetra;

    montoTopRight.style.display = "block";
    montoBottomLeft.style.display = "none";

    montoTopRight.style.top = "";
    montoTopRight.style.bottom = "";
    montoTopRight.style.left = "";
    montoTopRight.style.right = "";

    if (posicionMonto === "top-right") {
        montoTopRight.style.top = "15px";
        montoTopRight.style.right = "15px";
    }
    if (posicionMonto === "top-left") {
        montoTopRight.style.top = "15px";
        montoTopRight.style.left = "15px";
    }
    if (posicionMonto === "bottom-left") {
        montoTopRight.style.bottom = "15px";
        montoTopRight.style.left = "15px";
    }
    if (posicionMonto === "bottom-right") {
        montoTopRight.style.bottom = "15px";
        montoTopRight.style.right = "15px";
    }
}

destinatarioInput.addEventListener("input", actualizarPreview);
montoInput.addEventListener("input", actualizarPreview);

document.querySelectorAll("input[name='color']").forEach(r => {
    r.addEventListener("change", e => {
        colorFondo = e.target.value;
        actualizarPreview();
    });
});

document.querySelectorAll(".text-color-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".text-color-btn")
            .forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        colorLetra = btn.dataset.color;
        actualizarPreview();
    });
});

document.querySelectorAll(".font-size-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".font-size-btn")
            .forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        tamanoLetra = btn.dataset.size;
        actualizarPreview();
    });
});

document.querySelectorAll(".btn-pos").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".btn-pos")
            .forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        posicionMonto = btn.dataset.pos;
        actualizarPreview();
    });
});

export function agregarGiftcardAlUsuario() {

    const usuarios = localStorageUsuarios();
    const usuarioActual = obtenerUsuarioLogueado();

    if (!usuarioActual) {
        alert("Debes iniciar sesión para agregar una giftcard.");
        window.location.href = "../pages/login.html";
        return;
    }

    const index = usuarios.findIndex(u => u.email === usuarioActual.email);
    if (index === -1) {
        alert("Error: usuario no encontrado.");
        return;
    }

    const nuevaGiftcard = {
        destinatario: destinatarioInput.value,
        monto: montoInput.value,
        colorFondo,
        colorLetra,
        tamanoLetra,
        posicionMonto
    };

    // si no existe, crear array
    if (!Array.isArray(usuarios[index].giftcards)) {
        usuarios[index].giftcards = [];
    }

    usuarios[index].giftcards.push(nuevaGiftcard);

    // guardar cambios
    guardarModificacionLocalStorage(usuarios);

    // actualizar usuarioLogueado
    localStorage.setItem("usuarioLogueado", JSON.stringify(usuarios[index]));

    mostrarPopup();
}

form.addEventListener("submit", e => {
    e.preventDefault();
    agregarGiftcardAlUsuario();
});

function mostrarPopup() {
    const overlay = document.querySelector(".overlay");
    overlay.style.display = "flex";
}

// inicializar preview
actualizarPreview();
