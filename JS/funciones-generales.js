export function localStorageUsuarios(){
    const USUARIOS_EXISTENTES = JSON.parse(localStorage.getItem('usuarios') || '[]');
    return USUARIOS_EXISTENTES;
    //Mira el estado del ARRAY de LOCAL STORAGE, un array con muchos usuarios y tiene de clave 'usuarios'
}

export function guardarModificacionLocalStorage(usuarios){
    localStorage.setItem('usuarios', JSON.stringify(usuarios))
}

export function limpiarLocalStorage(clave){
    localStorage.removeItem(clave);
}