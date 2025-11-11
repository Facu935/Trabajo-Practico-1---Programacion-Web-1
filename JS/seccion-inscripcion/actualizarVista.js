import { mostrarFormularioPersonal } from "./mostrarFormularioPersonal.js";
import { mostrarFormularioEmpresarial } from "./mostrarFormularioEmpresarial.js";

export function actualizarVista(cursoInfo) {
  const valorSeleccionado = document.querySelector('input[name="ambito"]:checked').value;
  const selectorContenedor = "#form-dinamico-container";

  if (valorSeleccionado === "personal") {
    mostrarFormularioPersonal(selectorContenedor, cursoInfo);
  } else if (valorSeleccionado === "empresarial") {
    mostrarFormularioEmpresarial(selectorContenedor, cursoInfo);
  }
}