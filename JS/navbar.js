export class Navbar {
    constructor() {
    }


    mostrarItems(items){
        const barraNav = document.querySelector(".navegation__items");

        items.forEach(item => {
            const elemento = document.createElement("li");
            const elementoLink = document.createElement("a");
            elementoLink.textContent = item.name;
            elementoLink.href = item.link;
            elemento.appendChild(elementoLink);
            barraNav.appendChild(elemento);
        });

    }
}
