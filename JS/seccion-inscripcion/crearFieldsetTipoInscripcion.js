export function crearFieldsetTipoInscripcion() {
  const fieldset = document.createElement('fieldset');
  fieldset.className = 'fieldset-ambito';

  const templateInterno = `         
    <div class="container-input-ambito">
        <input type="radio" id="radio-personal" name="ambito" value="personal" checked>
        <label for="radio-personal">Personal</label> 
    </div>
    
    <div class="container-input-ambito">
        <input type="radio" id="radio-empresarial" name="ambito" value="empresarial">
        <label for="radio-empresarial">Empresarial</label> 
    </div>
  `;

  fieldset.innerHTML = templateInterno;
  return fieldset;
}
