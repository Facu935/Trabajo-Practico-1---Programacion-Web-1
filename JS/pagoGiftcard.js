import { obtenerUsuarioLogueado } from "./funciones-generales.js";

function pagoGiftCard() {
    document.addEventListener("DOMContentLoaded", () => {
        const pago = document.querySelector(".pago")
        const form = document.querySelector("#form-pago");
        const pagoResumen = document.querySelector(".pago-resumen")

        const usuario = obtenerUsuarioLogueado();
        let nuevaGiftcard;

        if (usuario && Array.isArray(usuario.giftcards) && usuario.giftcards.length > 0) {
            nuevaGiftcard = usuario.giftcards[usuario.giftcards.length - 1];
        }

        if (!nuevaGiftcard) {
            alert("Error: No se pudo cargar la información de la gift card para el pago.");
            return;
        }

        const montoFormateado = `$ ${Number(nuevaGiftcard.monto).toLocaleString('es-AR')}`;

        const resumenHTML = `
        <div class="pago-resumen">
            <h3>Resumen de Compra</h3>
            <div class="pago-resumen-datos">
                <div id="detalle-curso">
                    <h4>GIFT CARD</h4>
                    <p>${montoFormateado}</p>
                </div>
                <div id="total">
                    <h4>Total:</h4>
                    <p>${montoFormateado}</p>
                </div>
            </div>
        </div>
        `;

        pagoResumen.innerHTML = resumenHTML;

        const numeroTarjeta = document.querySelector("#numero-tarjeta");
        const vencimiento = document.querySelector("#vencimiento");
        const cvv = document.querySelector("#cvv");
        const nombre = document.querySelector("#titular");

        let erroresContainer = document.querySelector("#errores");
        if (!erroresContainer) {
            erroresContainer = document.createElement("div");
            erroresContainer.id = "errores";
            erroresContainer.style.color = "red";
            erroresContainer.style.marginTop = "10px";
            form.appendChild(erroresContainer);
        }

        numeroTarjeta.addEventListener("input", (e) => {
            let value = e.target.value.replace(/\D/g, "");
            value = value.substring(0, 16);
            e.target.value = value.replace(/(.{4})/g, "$1 ").trim();
        });

        vencimiento.addEventListener("input", (e) => {
            let v = e.target.value.replace(/\D/g, "").substring(0, 4);
            if (v.length >= 3) {
                v = v.substring(0, 2) + "/" + v.substring(2);
            }
            e.target.value = v;
        });

        cvv.addEventListener("input", (e) => {
            e.target.value = e.target.value.replace(/\D/g, "").substring(0, 3);
        });

        nombre.addEventListener("input", (e) => {
            e.target.value = e.target.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, "");
        });

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const numero = numeroTarjeta.value.replace(/\s/g, "");
            const fechaTexto = vencimiento.value.trim();
            const cvvValue = cvv.value.trim();
            const nombreValue = nombre.value.trim();

            erroresContainer.innerHTML = "";

            const errores = [];

            if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(nombreValue)) {
                errores.push("El nombre solo puede contener letras y espacios.");
            }

            if (numero.length !== 16) {
                errores.push("El número de tarjeta debe tener exactamente 16 dígitos.");
            } else if (!/^\d{16}$/.test(numero)) {
                errores.push("El número de tarjeta solo debe contener números.");
            }

            if (!/^\d{2}\/\d{2}$/.test(fechaTexto)) {
                errores.push("El formato de vencimiento debe ser MM/AA.");
            } else {
                const [mes, añoCorto] = fechaTexto.split("/");
                const mesNum = parseInt(mes);
                const año = 2000 + parseInt(añoCorto);
                const hoy = new Date();
                const mesActual = hoy.getMonth() + 1;
                const añoActual = hoy.getFullYear();

                if (mesNum < 1 || mesNum > 12) {
                    errores.push("El mes debe estar entre 01 y 12.");
                }

                if (año < añoActual || (año === añoActual && mesNum < mesActual)) {
                    errores.push("La fecha de vencimiento no puede ser anterior al mes actual.");
                }

                if (año > 2050) {
                    errores.push("El año de vencimiento no puede ser posterior a 2050.");
                }
            }

            if (!/^\d{3}$/.test(cvvValue)) {
                errores.push("El código de seguridad (CVV) debe tener 3 dígitos.");
            }

            if (errores.length > 0) {
                errores.forEach(err => {
                    const p = document.createElement("p");
                    p.textContent = err;
                    erroresContainer.appendChild(p);
                });
            } else {
                const modal = document.createElement("div");
                modal.textContent = "Procesando compra...";
                Object.assign(modal.style, {
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "white",
                    color: "black",
                    padding: "2em 3em",
                    border: "2px solid #000",
                    borderRadius: "10px",
                    boxShadow: "0 0 15px rgba(0,0,0,0.3)",
                    zIndex: "9999",
                    fontSize: "1.2em",
                    fontWeight: "700",
                    textAlign: "center"
                });
                document.body.appendChild(modal);

                setTimeout(() => {
                    window.location.href = "perfil.html";
                }, 5000);
            }
        });
        pago.appendChild(pagoResumen);

    });
}

pagoGiftCard();