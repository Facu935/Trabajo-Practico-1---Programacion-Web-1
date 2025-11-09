export function crearFieldsetPersonal() {
    const fieldset = document.createElement('fieldset');

    const templateInterno = `
        <div class="container-input">
            <input type="text" id="nombre" name="nombre" placeholder="Nombre" autocomplete="name" required />
        </div>
        <div class="container-input">
            <input type="text" id="apellido" name="apellido" placeholder="Apellido" autocomplete="family-name" required />
        </div>
        <div class="container-input">
            <input type="number" id="dni" name="dni" placeholder="DNI" required />
        </div>
        <div class="container-input">
            <input type="number" id="dni" name="dni" placeholder="Telefono" required />
        </div>
    `;
    
    fieldset.innerHTML = templateInterno;
    return fieldset;
}