document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const numeroTarjeta = document.querySelector("#numero-tarjeta");
    const vencimiento = document.querySelector("#vencimiento");
    const cvv = document.querySelector("#cvv");
    const nombre = document.querySelector("#titular");

    // --- Formatear número de tarjeta en tiempo real: XXXX XXXX XXXX XXXX ---
    numeroTarjeta.addEventListener("input", (e) => {
        let value = e.target.value.replace(/\D/g, ""); // eliminar todo lo que no sea número
        value = value.substring(0, 16); // máximo 16 dígitos
        e.target.value = value.replace(/(.{4})/g, "$1 ").trim(); // añadir espacio cada 4 dígitos
    });

    // --- Formatear fecha de vencimiento en tiempo real: DD/MM/AA ---
    vencimiento.addEventListener("input", (e) => {
        let value = e.target.value.replace(/\D/g, ""); // solo números
        value = value.substring(0, 6); // máximo 6 dígitos
        if (value.length >= 4) {
            e.target.value = value.replace(/(\d{2})(\d{2})(\d{0,2})/, "$1/$2/$3").trim();
        } else if (value.length >= 2) {
            e.target.value = value.replace(/(\d{2})(\d{0,2})/, "$1/$2").trim();
        } else {
            e.target.value = value;
        }
    });

    // --- Restringir CVV a 3 números ---
    cvv.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/\D/g, "").substring(0, 3);
    });

    // --- Restringir nombre a solo letras y espacios ---
    nombre.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, "");
    });

    // --- Validación final al enviar ---
    form.addEventListener("submit", (e) => {
        const numero = numeroTarjeta.value.replace(/\s/g, "");
        const fechaTexto = vencimiento.value.trim();
        const cvvValue = cvv.value.trim();
        const nombreValue = nombre.value.trim();

        // --- Validar nombre ---
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(nombreValue)) {
            e.preventDefault();
            alert("El nombre solo puede contener letras y espacios.");
            return;
        }

        // --- Validar número de tarjeta ---
        if (numero.length !== 16) {
            e.preventDefault();
            alert("El número de tarjeta debe tener exactamente 16 dígitos.");
            return;
        }

        // --- Validar fecha de vencimiento ---
        if (!/^\d{2}\/\d{2}\/\d{2}$/.test(fechaTexto)) {
            e.preventDefault();
            alert("La fecha debe tener el formato DD/MM/AA.");
            return;
        }

        const [dia, mes, añoCorto] = fechaTexto.split("/").map(Number);
        const año = 2000 + añoCorto;

        if (mes < 1 || mes > 12 || dia < 1 || dia > 31) {
            e.preventDefault();
            alert("La fecha de vencimiento no es válida.");
            return;
        }

        const hoy = new Date();
        const fechaIngresada = new Date(año, mes - 1, dia);
        if (fechaIngresada < hoy) {
            e.preventDefault();
            alert("La fecha de vencimiento no puede ser anterior a la actual.");
            return;
        }

        if (año > 2050) {
            e.preventDefault();
            alert("El año de vencimiento no puede ser posterior a 2050.");
            return;
        }

        // --- Validar CVV ---
        if (!/^\d{3}$/.test(cvvValue)) {
            e.preventDefault();
            alert("El código de seguridad (CVV) debe tener 3 dígitos.");
            return;
        }

        // --- Si todo está bien ---
        alert("✅ Datos validados correctamente. Procesando pago...");
    });
});
