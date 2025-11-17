export class Footer {
  constructor() {}

  mostrarFooter(
    integrantes,
    links_acerca_de,
    cursos_destacados,
    redes_sociales
  ) 
  {
    this.mostrarIntegrantes(integrantes);
    this.mostrarLinks(links_acerca_de, cursos_destacados);
    this.mostrarRedesSociales(redes_sociales);
    this.notaLegal();
    this.flechaVueltaAInicio();
  }

  mostrarIntegrantes(integrantes) {
    const FOOTER = document.querySelector("#footer");
    const CONTENEDOR_INTEGRANTES = document.createElement("div");
    CONTENEDOR_INTEGRANTES.classList.add("footer-recuadros");
    const LISTA_INTEGRANTES = document.querySelector("#footer-datos-grupo");

    const TITULO = document.createElement("h3");
    TITULO.textContent = "Datos del Grupo";
    CONTENEDOR_INTEGRANTES.appendChild(TITULO);

    integrantes.forEach((integrante) => {
      const ITEM_INTEGRANTE = document.createElement("li");
      ITEM_INTEGRANTE.textContent = integrante.integrante;
      LISTA_INTEGRANTES.appendChild(ITEM_INTEGRANTE);
    });

    CONTENEDOR_INTEGRANTES.appendChild(LISTA_INTEGRANTES);
    FOOTER.appendChild(CONTENEDOR_INTEGRANTES);
  }

  mostrarLinks(links_acerca_de, cursos_destacados) {
    mostrarLinksAcercaDe(links_acerca_de);
    mostrarLinksCursosDestacados(cursos_destacados);
  }

  mostrarRedesSociales(redes_sociales) {
    const FOOTER = document.querySelector("#footer");
    const REDES = document.querySelector("#iconos-redes");
    const TITULO = document.createElement("h3");
    TITULO.id = "titulo-redes";
    TITULO.textContent = "Redes Sociales";

    const CONTENEDOR_REDES = document.createElement("div");
    CONTENEDOR_REDES.classList.add("footer-redes");

    redes_sociales.forEach((red) => {
      const templateRedes = `<a href=" ${red.href} " target="_blank"><img src="${red.img}" alt="${red.alt}" class="footer-redes-logos"></a>`;

      CONTENEDOR_REDES.innerHTML += templateRedes;
    });

    REDES.appendChild(TITULO);
    REDES.appendChild(CONTENEDOR_REDES);
    FOOTER.appendChild(REDES);
  }

  notaLegal() {
    const NOTA_LEGAL = document.createElement("p");
    NOTA_LEGAL.textContent = "© Edu Courses. Todos los derechos reservados";
    NOTA_LEGAL.id = "footer-nota-legal";
    document.body.appendChild(NOTA_LEGAL);
  }

  flechaVueltaAInicio() {
    const LINK_INICIO = document.createElement("a");
    LINK_INICIO.href = "#inicio";

    const ICONO = document.createElement("i");
    ICONO.id = "flecha-vuelta-inicio";
    ICONO.innerHTML = "&#x1F53C;";
    LINK_INICIO.appendChild(ICONO);
    document.body.appendChild(LINK_INICIO);
  }
}

function mostrarLinksAcercaDe(links_acerca_de) {
  const FOOTER = document.querySelector("#footer");
  const FOOTER_INFO = document.querySelector("#footer-recuadros-info");

  const ACERCA_DE = document.createElement("div");
  ACERCA_DE.classList.add("footer-recuadros-info-datos");
  ACERCA_DE.classList.add("footer-recuadros");

  const TITULO = document.createElement("h3");
  TITULO.textContent = "ACERCA DE";

  const LISTA_ACERCA_DE = document.createElement("ul");
  links_acerca_de.forEach((item) => {
    const templateAcercaDe = `<li><a href="${item.link}"> ${item.name}</a></li>`;
    LISTA_ACERCA_DE.innerHTML += templateAcercaDe;
  });

  ACERCA_DE.appendChild(TITULO);
  ACERCA_DE.appendChild(LISTA_ACERCA_DE);
  FOOTER_INFO.appendChild(ACERCA_DE);
  FOOTER.appendChild(FOOTER_INFO);
}

function mostrarLinksCursosDestacados(cursos_destacados) {
  const FOOTER = document.querySelector("#footer");
  const FOOTER_INFO = document.querySelector("#footer-recuadros-info");

  const CURSOS_DESTACADOS = document.createElement("div");
  CURSOS_DESTACADOS.classList.add("footer-recuadros-info-datos");
  CURSOS_DESTACADOS.classList.add("footer-recuadros");

  const TITULO = document.createElement("h3");
  TITULO.textContent = "CURSOS DESTACADOS";

  const LISTA_CURSOS_DESTACADOS = document.createElement("ul");
  cursos_destacados.forEach((item) => {
    const templateCursosDestacados = `<a href="${item.link}"><li>${item.name}</li></a>`;
    LISTA_CURSOS_DESTACADOS.innerHTML += templateCursosDestacados;
  });

  CURSOS_DESTACADOS.appendChild(TITULO);
  CURSOS_DESTACADOS.appendChild(LISTA_CURSOS_DESTACADOS);
  FOOTER_INFO.appendChild(CURSOS_DESTACADOS);
  FOOTER.appendChild(FOOTER_INFO);
}
