export function crearFieldsetPersonal(id) {
    const fieldset = document.createElement('fieldset');

    const templateInterno = `
        <div class="container-input">
            <input type="text" id="nombre-${id}" name="nombre-${id}" placeholder="Nombre" autocomplete="name" required />
        </div>
        <div class="container-input">
            <input type="text" id="apellido-${id}" name="apellido-${id}" placeholder="Apellido" autocomplete="family-name" required />
        </div>
        <div class="container-input">
            <input type="number" id="dni-${id}" name="dni-${id}" placeholder="DNI" required />
        </div>
        <div class="container-input">
            <input type="tel" id="telefono-${id}" name="telefono-${id}" placeholder="Teléfono" required />
        </div>
    `;

    fieldset.innerHTML = templateInterno;
    return fieldset;
}