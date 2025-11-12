export function mostrarUnidad(unidad) {

    const unidadId = unidad.dataset.unidad;
    const clases = document.querySelector(`.clases[data-clases="${unidadId}"]`);

    const estabaAbierta = clases.classList.contains("show-clases");

    document.querySelectorAll(".clases").forEach(element => element.classList.remove("show-clases"));
    document.querySelectorAll(".bloque-unidad img").forEach(img => {
        img.src = "../IMG/Cursos/mas.png";
        img.alt = "ver más";
    });

    if (!estabaAbierta) {
        clases.classList.add("show-clases");

        const imgUnidad = unidad.querySelector("img");
        imgUnidad.src = "../IMG/Cursos/menos.png";
        imgUnidad.alt = "ver menos";
    }
}