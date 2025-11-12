document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const numeroTarjeta = document.querySelector("#numero-tarjeta");
    const vencimiento = document.querySelector("#vencimiento");
    const cvv = document.querySelector("#cvv");
    const nombre = document.querySelector("#titular");

    // Formatear número de tarjeta en tiempo real: XXXX XXXX XXXX XXXX
    numeroTarjeta.addEventListener("input", (e) => {
        let value = e.target.value.replace(/\D/g, ""); // eliminar todo lo que no sea número
        value = value.substring(0, 16); // limitar a 16 dígitos
        // insertar espacios cada 4 dígitos
        e.target.value = value.replace(/(.{4})/g, "$1 ").trim();
    });

    // Restringir CVV a 3 números
    cvv.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/\D/g, "").substring(0, 3);
    });

    // Restringir nombre a solo letras y espacios
    nombre.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, "");
    });

    form.addEventListener("submit", (e) => {
        const numero = numeroTarjeta.value.replace(/\s/g, ""); // quitar espacios
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

        if (!/^\d{16}$/.test(numero)) {
            e.preventDefault();
            alert("El número de tarjeta solo debe contener números.");
            return;
        }

        // --- Validar fecha de vencimiento ---
        const [dia, mes, añoCorto] = fechaTexto.split("/");
        const año = 2000 + parseInt(añoCorto);
        const fechaIngresada = new Date(año, mes - 1);
        const hoy = new Date();
        const mesActual = hoy.getMonth() + 1;
        const añoActual = hoy.getFullYear();

        if (año < añoActual || (año === añoActual && mes < mesActual)) {
            e.preventDefault();
            alert("La fecha de vencimiento no puede ser anterior al mes actual.");
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
        alert("Datos validados correctamente. Procesando pago...");
    });
});
