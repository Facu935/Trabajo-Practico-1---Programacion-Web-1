import { NAV } from "../constants/constants.js";
import { Navbar } from "./navbar.js";
import { SliderHome } from "./sliderHome.js";
import { IMAGENES_SLIDER_HOME } from "../constants/constants.js";


const barraNav = new Navbar();
barraNav.mostrarItems(NAV);


const sliderHome = new SliderHome();
sliderHome.mostrarNodos(IMAGENES_SLIDER_HOME);
sliderHome.mostrarImagenesSegunNodoClickeado(IMAGENES_SLIDER_HOME);

