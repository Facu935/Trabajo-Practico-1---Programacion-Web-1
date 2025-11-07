/**
 * Crea un fieldset completo para un participante.
 * @param {number} numero - El número del participante (ej: 1, 2, 3)
 * @returns {HTMLElement} - El elemento <fieldset> creado.
 */
export function crearFieldsetParticipante(numero) {
    const fieldset = document.createElement('fieldset');
    
    // Usamos una plantilla literal (template literal) para crear el HTML interno
    // de forma más limpia, similar a tu ejemplo.
    const templateInterno = `
        <div class="container-input">
            <input type="text" id="nombre${numero}" name="nombre${numero}" placeholder="Nombre" autocomplete="name" required />
        </div>
        <div class="container-input">
            <input type="text" id="apellido${numero}" name="apellido${numero}" placeholder="Apellido" autocomplete="family-name" required />
        </div>
        <div class="container-input">
            <input type="number" id="dni${numero}" name="dni${numero}" placeholder="DNI" required />
        </div>
        <div class="container-button">
            <button type="button" class="icon-delete" aria-label="Eliminar participante ${numero}">&#10060;</button>
        </div>
    `;
    
    // Asignamos el HTML al fieldset
    fieldset.innerHTML = templateInterno;
    return fieldset;
}