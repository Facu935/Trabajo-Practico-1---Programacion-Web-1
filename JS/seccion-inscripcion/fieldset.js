export function crearFieldsetPersonal(id) {
    const fieldset = document.createElement('fieldset');

    const templateInterno = `
        <div class="container-input">
            <input type="text" id="nombre-${id}" name="nombre-${id}" placeholder="Nombre" autocomplete="name" required 
                   pattern="[A-Za-zñÑáéíóúÁÉÍÓÚ ]+" 
                   title="Solo puedes ingresar letras y espacios." />
        </div>
        <div class="container-input">
            <input type="text" id="apellido-${id}" name="apellido-${id}" placeholder="Apellido" autocomplete="family-name" required 
                   pattern="[A-Za-zñÑáéíóúÁÉÍÓÚ ]+" 
                   title="Solo puedes ingresar letras y espacios." />
        </div>
        <div class="container-input">
            <input type="text" id="dni-${id}" name="dni-${id}" placeholder="DNI" required 
                   inputmode="numeric" 
                   pattern="\\d{7,8}" 
                   title="Solo números (7 u 8 dígitos sin puntos)." />
        </div>
        <div class="container-input">
            <input type="tel" id="telefono-${id}" name="telefono-${id}" placeholder="Teléfono (ej: 1234-5678)" required 
                   pattern="\\d{4}-\\d{4}" 
                   title="El teléfono debe tener el formato 1234-5678 (8 dígitos con guión)." />
        </div>
    `;

    fieldset.innerHTML = templateInterno;
    return fieldset;
}