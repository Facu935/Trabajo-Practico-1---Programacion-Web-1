export function mostrarModal(cursoSeleccionado) {

    const modal = document.querySelector(".modal");
    const titulo = document.querySelector("#titulo-modal");
    const imagen = document.querySelector("#modal-img-curso");
    const duracion = document.querySelector("#duracion-modal");
    const profesor = document.querySelector("#profesor-modal");
    const valor = document.querySelector("#precio-modal");
    const botonAceptar = document.querySelector("#boton-aceptar");
    const botonCancelar = document.querySelector("#hidden-modal");

    titulo.textContent = `Te estas inscribiendo a ${cursoSeleccionado.nombre}`;
    imagen.src = cursoSeleccionado.img;
    imagen.alt = `Logo de ${cursoSeleccionado.nombre}`;
    duracion.textContent = `Duracion: ${cursoSeleccionado.duracion}`;
    profesor.textContent = `Profesor: ${cursoSeleccionado.docente.nombre}`;
    valor.textContent = `Precio: $${cursoSeleccionado.precio}`

    modal.classList.add("show-modal");
    document.body.style.overflow = "hidden";


    botonAceptar.addEventListener("click", () => {
        window.location.href = `../pages/inscripcion.html?curso=${encodeURIComponent(cursoSeleccionado.nombre)}&precio=${cursoSeleccionado.precio}&img=${encodeURIComponent(cursoSeleccionado.img)}&valoracion=${cursoSeleccionado.valoracion}&duracion=${cursoSeleccionado.duracion}&ver=${cursoSeleccionado.link}`;
    })

    botonCancelar.addEventListener("click", () => {
        modal.classList.remove("show-modal");
        document.body.style.overflow = "";
    });
}