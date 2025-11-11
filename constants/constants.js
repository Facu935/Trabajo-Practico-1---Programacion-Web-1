




export const NAV = [
    { name: "INICIO", link: "../index.html" },
    { name: "CALENDARIO", link: "../pages/calendario.html" },
    { name: "GIFT CARD", link: "../pages/giftcard.html" },
    { name: "CONTACTO", link: "../pages/contacto.html" },
]

export const USUARIOS_REGISTRADOS = [

]


export const INTEGRANTES_DEL_GRUPO = [
    { integrante: "Facundo Nicolás Olivieri (DNI: 42.290.776)" },
    { integrante: "Agustin Bejarano (DNI: 41.173.682)" },
    { integrante: "Nicolas Felipe Alvarez (DNI: 43.321.421)" },
    { integrante: "Franco David Pereyra (DNI: 44.181.869)" },
    { integrante: "Luis Omar Spataro (DNI: 36.494.378)" },
]

export const FOOTER_LINKS_ACERCA_DE = [
    { name: "Sobre Nosotros", link: "../pages/sobre-nosotros.html" },
    { name: "Preguntas Frecuentes", link: "../pages/preguntas-frecuentes.html" },
]

export const FOOTER_LINKS_CURSOS = [
    { name: "Html 5", link: "../pages/cursos.html?curso=html" },
    { name: "CSS", link: "../pages/cursos.html?curso=css" },
    { name: "JavaScript", link: "../pages/cursos.html?curso=javascript" },
    { name: "Blockchain", link: "../pages/cursos.html?curso=blockchain" },
    { name: "JQuery", link: "../pages/cursos.html?curso=jquery" },
    { name: "Java", link: "../pages/cursos.html?curso=java" },
]
export const FOOTER_REDES = [
    { img: "../IMG/Logo Facebook.png", alt: "Facebook", href: "https://www.facebook.com/" },
    { img: "../IMG/Logo Instagram.jpeg", alt: "Instagram", href: "http://www.instagram.com" },
    { img: "../IMG/Logo LinkedIn.png", alt: "LinkedIn", href: "http://www.linkedin.com" },
    { img: "../IMG/Logo Xpng.png", alt: "X", href: "http://www.x.com" },
    { img: "../IMG/Logo YT.png", alt: "YouTube", href: "http://www.youtube.com" },
]

export const CURSOS_INFO = [
    {
        cursoId: "html",
        nombre: "HTML 5",
        link: "../pages/cursos.html?curso=html",
        precio: 60000,
        valoracion: 4.7,
        cantidadDeEstudiantes: 12.5,
        duracion: 20,
        requisitos: ["Acceso a Internet"],
        destacado: true,
        cuposDisponibles: 3,
        img: "../IMG/Cursos/logo-html.png",
        descripcion: "Este curso está diseñado para quienes quieren comenzar a construir páginas web desde cero. Se abordarán todos los fundamentos de HTML, incluyendo la estructura de un documento, etiquetas, enlaces, imágenes y formularios. Aprenderás a crear contenido estructurado y semántico, entendiendo cómo los navegadores interpretan el código y cómo mejorar la accesibilidad de tus páginas. Además, el curso incluye prácticas guiadas para que desarrolles pequeñas páginas web completas y funcionales. Al finalizar, serás capaz de crear sitios web simples y sentar las bases para aprender CSS y JavaScript.",
        unidades: [
            { titulo: "Introducción a HTML y su importancia en la web", duracion: 4 },
            { titulo: "Estructura básica de un documento HTML", duracion: 4 },
            { titulo: "Etiquetas esenciales: párrafos, listas, enlaces e imágenes", duracion: 4 },
            { titulo: "Tablas y formularios: cómo recopilar información del usuario", duracion: 4 },
            { titulo: "Proyecto final: crear tu primera página web completa", duracion: 4 }
        ],
        docente:
        {
            nombre: "Mariana López", descripcion: "Mariana López es diseñadora web con más de 10 años de experiencia enseñando HTML y CSS. Ha trabajado en múltiples proyectos de sitios corporativos y tiendas online, y disfruta transmitir conocimientos de manera clara y práctica. Su enfoque se centra en que los estudiantes comprendan el “por qué” detrás de cada etiqueta y estructura, para que puedan aplicar lo aprendido en proyectos reales. Además, Mariana comparte recursos adicionales y ejercicios complementarios para reforzar el aprendizaje", valoracion: 4.8
        },
        opiniones: [
            { nombre: "Juan Pérez", cantidad: 5, comentario: "El curso superó mis expectativas. Mariana explica cada concepto con ejemplos claros y prácticos. Me gustó que haya ejercicios guiados y que al final podamos armar un proyecto completo que se siente estructurar contenido." },
            { nombre: "Laura Gómez", cantidad: 4, comentario: "Muy bueno para quienes empiezan desde cero. Aprendí mucho sobre la semántica de HTML y cómo organizar el contenido correctamente. Me hubiera gustado que haya más ejercicios de práctica por unidad, pero el material de lectura complementaria ayudó bastante." },
            { nombre: "Martín Díaz", cantidad: 5, comentario: "Excelente curso. Lo que más me gustó es que no solo enseñan etiquetas, sino que Mariana explica cómo los navegadores leen el código y cómo optimizarlo. Ya me siento más seguro para continuar con CSS y JavaScript." },
            { nombre: "Sofía Fernández", cantidad: 4, comentario: "Muy completo, aunque algunas explicaciones son algo densas, los ejemplos prácticos ayudan mucho. Recomiendo tomarlo con paciencia y seguir todos los ejercicios para aprovecharlo al máximo." },
        ],
        cursosSimilares: ["css", "javascript", "jquery"]
    },
    {
        cursoId: "css",
        nombre: "CSS3",
        link: "../pages/cursos.html?curso=css",
        precio: 60000,
        valoracion: 4.6,
        cantidadDeEstudiantes: 10.2,
        duracion: 25,
        requisitos: ["Acceso a Internet", "Conocimientos básicos de HTML"],
        destacado: true,
        cuposDisponibles: 5,
        img: "../IMG/Logo CSS3.png",
        descripcion: "Este curso está diseñado para que aprendas a darle estilo a tus páginas web de forma profesional. Comenzaremos con los conceptos básicos de CSS y cómo se integra con HTML, para luego avanzar a selectores, propiedades, tipografía, colores y layouts. Se enseñará Flexbox y Grid, dos herramientas esenciales para construir diseños modernos y responsivos. Además, aprenderás a crear animaciones y transiciones para mejorar la experiencia del usuario. Cada unidad incluye ejemplos prácticos y ejercicios para aplicar lo aprendido en proyectos reales.",
        unidades: [
            { titulo: "Introducción a CSS", duracion: 5 },
            { titulo: "Selectores y propiedades", duracion: 5 },
            { titulo: "Layouts con Flexbox y Grid", duracion: 5 },
            { titulo: "Colores, fuentes y estilos", duracion: 5 },
            { titulo: "Animaciones y proyecto final", duracion: 5 }
        ],
        docente: {
            nombre: "Federico Ramírez", descripcion: "Federico es desarrollador frontend con especialización en diseño de interfaces y experiencia de usuario. Durante más de 8 años ha enseñado CSS y herramientas de diseño a estudiantes y profesionales. Su enfoque es práctico: enseña cómo lograr resultados visuales atractivos y funcionales, explicando tanto la teoría como las mejores prácticas para cada proyecto.", valoracion: 4.7
        },
        opiniones: [
            { nombre: "Valentina Torres", cantidad: 5, comentario: "El curso me permitió entender cómo organizar layouts complejos. Federico explica con claridad y los ejercicios prácticos ayudan mucho." },
            { nombre: "Nicolás Ruiz", cantidad: 4, comentario: "Muy útil, aunque algunas unidades fueron un poco rápidas. Los ejemplos de Grid y Flexbox son excelentes." },
            { nombre: "Camila Ortiz", cantidad: 5, comentario: " Aprendí a diseñar páginas modernas y responsivas. El material adicional que comparte el docente es muy valioso." },
            { nombre: "Diego Blanco", cantidad: 4, comentario: "Recomendable para quienes ya saben HTML y quieren dominar CSS de manera práctica." },
        ],
        cursosSimilares: ["html", "javascript", "jquery"]
    },
    {
        cursoId: "javascript",
        nombre: "JavaScript",
        link: "../pages/cursos.html?curso=javascript",
        precio: 100000,
        valoracion: 4.8,
        cantidadDeEstudiantes: 8.7,
        duracion: 30,
        requisitos: ["Acceso a Internet", "HTML y CSS básicos"],
        destacado: true,
        cuposDisponibles: 8,
        img: "../IMG/Logo Javascript.png",
        descripcion: "Este curso te introduce al mundo de la programación en JavaScript, el lenguaje que da vida a las páginas web. Aprenderás desde variables, tipos de datos y estructuras de control hasta la manipulación del DOM y eventos. Cada tema incluye ejemplos prácticos y proyectos para que puedas interactuar con elementos de la página, validar formularios y crear pequeñas aplicaciones web. También se enseñan arrays y objetos, fundamentales para manejar datos de manera eficiente. Al final del curso, tendrás la base necesaria para avanzar a frameworks modernos como React o Node.js.",
        unidades: [
            { titulo: "Introducción a JavaScript", duracion: 5 },
            { titulo: "Variables y tipos de datos", duracion: 5 },
            { titulo: "Funciones y estructuras de control", duracion: 5 },
            { titulo: "DOM y eventos", duracion: 5 },
            { titulo: "Arrays y objetos", duracion: 5 },
            { titulo: "Proyecto práctico", duracion: 5 }
        ],
        docente: {
            nombre: "Camilo Méndez", descripcion: "Camilo es desarrollador web con más de 8 años de experiencia en frontend y JavaScript. Su estilo de enseñanza combina teoría con proyectos prácticos que permiten a los estudiantes aplicar inmediatamente lo aprendido. Además, comparte buenas prácticas de codificación y herramientas que facilitan el trabajo diario como desarrollador.", valoracion: 4.9
        },
        opiniones: [
            { nombre: "Mariana Castillo", cantidad: 5, comentario: "Aprendí a programar mis primeras aplicaciones web. Los ejercicios prácticos hacen que cada concepto se entienda de verdad." },
            { nombre: "Tomás Silva", cantidad: 4, comentario: "Muy bueno, aunque algunos ejemplos podrían ser un poco más desafiantes. Ideal para principiantes." },
            { nombre: "Paula Navarro", cantidad: 5, comentario: "Excelente curso, el docente explica todo de manera clara y detallada. Recomiendo hacer todos los ejercicios." },
            { nombre: "Lucas Herrera", cantidad: 4, comentario: "Se aprende mucho, los proyectos prácticos ayudan a consolidar los conocimientos." },
        ],
        cursosSimilares: ["html", "css", "jquery"]
    },
    {
        cursoId: "blockchain",
        nombre: "Blockchain",
        link: "../pages/cursos.html?curso=blockchain",
        precio: 30000,
        valoracion: 4.7,
        cantidadDeEstudiantes: 1.7,
        duracion: 20,
        requisitos: ["Acceso a Internet", "Conocimientos básicos de programación"],
        destacado: true,
        cuposDisponibles: 7,
        img: "../IMG/Cursos/blockchain.png",
        descripcion: "Este curso ofrece una visión completa de la tecnología blockchain, desde los conceptos básicos hasta aplicaciones prácticas. Aprenderás cómo funcionan las criptomonedas, qué es la minería, cómo operan los nodos y cómo crear contratos inteligentes. Se incluyen ejemplos reales y casos de uso de empresas y startups. Los estudiantes desarrollarán un entendimiento profundo de cómo blockchain cambia la forma en que se manejan los datos y las transacciones digitales, y cómo se puede aplicar en distintos sectores.",
        unidades: [
            { titulo: "¿Qué es blockchain?", duracion: 4 },
            { titulo: "Criptomonedas y wallets", duracion: 4 },
            { titulo: "Minería y nodos", duracion: 4 },
            { titulo: "Smart contracts", duracion: 4 },
            { titulo: "Aplicaciones prácticas", duracion: 4 }
        ],
        docente: {
            nombre: "Santiago Rojas", descripcion: "Santiago es ingeniero en sistemas especializado en blockchain y tecnologías descentralizadas. Ha trabajado en proyectos de criptomonedas y contratos inteligentes, y su enfoque docente se centra en explicar la teoría junto con ejercicios prácticos. Busca que los estudiantes comprendan tanto la lógica detrás de blockchain como su implementación real en proyectos digitales.", valoracion: 4.8
        },
        opiniones: [
            { nombre: "Camila Herrera", cantidad: 5, comentario: "Curso muy completo y actualizado. Aprendí conceptos complejos de manera sencilla y práctica." },
            { nombre: "Matías López", cantidad: 4, comentario: "La explicación es clara, y los ejemplos ayudan a entender cómo funciona blockchain en la vida real." },
            { nombre: "Florencia Díaz", cantidad: 4, comentario: "Me gustó la parte de contratos inteligentes y cómo aplicarlos en proyectos propios. Muy recomendable." },
            { nombre: "Joaquín Pérez", cantidad: 4, comentario: "Me gustó la parte de contratos inteligentes y cómo aplicarlos en proyectos propios. Muy recomendable." },
        ],
        cursosSimilares: ["javascript", "jquery", "java"]
    },
    {
        cursoId: "jquery",
        nombre: "Jquery",
        link: "../pages/cursos.html?curso=jquery",
        precio: 20000,
        valoracion: 4.5,
        cantidadDeEstudiantes: 4.5,
        duracion: 15,
        requisitos: ["Acceso a Internet", "HTML, CSS y JavaScript básicos"],
        destacado: true,
        cuposDisponibles: 3,
        img: "../IMG/Cursos/logo-jquery.png",
        descripcion: "En este curso aprenderás a utilizar jQuery, la biblioteca que facilita la manipulación de HTML, CSS y eventos de JavaScript. Se enseñará cómo seleccionar elementos, modificar el DOM, manejar animaciones y eventos, y simplificar tareas comunes en desarrollo web. Cada unidad incluye ejercicios prácticos para que los estudiantes puedan aplicar lo aprendido en proyectos reales. Al final, los participantes podrán crear interfaces interactivas y dinámicas sin complicaciones, aprovechando al máximo las funciones que jQuery ofrece..",
        unidades: [
            { titulo: "Introducción a jQuery", duracion: 4 },
            { titulo: "Selectores y métodos básicos", duracion: 4 },
            { titulo: "Eventos y animaciones", duracion: 4 },
            { titulo: "Proyecto práctico", duracion: 3 },
        ],
        docente: {
            nombre: "Laura Benítez", descripcion: "Laura es especialista en frontend y jQuery, con más de 5 años enseñando desarrollo web. Su metodología se centra en ejemplos prácticos que los estudiantes puedan aplicar inmediatamente. Además, destaca la importancia de escribir código limpio y mantenible, y comparte técnicas para optimizar el rendimiento de las páginas.", valoracion: 4.6
        },
        opiniones: [
            { nombre: "Bruno Castillo", cantidad: 4, comentario: "Muy útil para agilizar el desarrollo web. Los ejercicios me ayudaron a entender mejor cómo interactuar con elementos de la página." },
            { nombre: "Agustina Vega", cantidad: 5, comentario: "Aprendí a hacer animaciones y efectos en minutos. La explicación paso a paso facilita mucho el aprendizaje" },
            { nombre: "Federico Santos", cantidad: 4, comentario: "El contenido es claro y práctico. Recomiendo complementar con ejercicios propios." },
            { nombre: "Jimena López", cantidad: 4, comentario: "Ideal si ya sabes JavaScript y quieres trabajar con jQuery para proyectos web." },
        ],
        cursosSimilares: ["javascript", "html", "css"]
    },
    {
        cursoId: "java",
        nombre: "Java",
        link: "../pages/cursos.html?curso=java",
        precio: 70000,
        valoracion: 4.6,
        cantidadDeEstudiantes: 10.9,
        duracion: 35,
        requisitos: ["Acceso a Internet"],
        destacado: true,
        cuposDisponibles: 4,
        img: "../IMG/Cursos/java.png",
        descripcion: "Este curso te introduce al lenguaje de programación Java, uno de los más usados en el mundo del desarrollo de software. Se cubren desde los conceptos básicos hasta programación orientada a objetos, clases, objetos, arrays y colecciones. Cada unidad incluye ejercicios prácticos y ejemplos que permiten a los estudiantes desarrollar pequeñas aplicaciones de consola y proyectos iniciales de escritorio. Al finalizar el curso, los participantes tendrán la base necesaria para seguir aprendiendo Java avanzado o frameworks como Spring.",
        unidades: [
            { titulo: "Introducción a Java", duracion: 6 },
            { titulo: "Variables y tipos de datos", duracion: 5 },
            { titulo: "Estructuras de control", duracion: 6 },
            { titulo: "Clases y objetos", duracion: 6 },
            { titulo: "Colecciones y arrays", duracion: 6 },
            { titulo: "Proyecto práctico", duracion: 6 }
        ],
        docente: {
            nombre: "Valeria Gómez", descripcion: "Valeria es desarrolladora Java con 10 años de experiencia en proyectos de software empresarial y educación tecnológica. Su metodología combina teoría, ejemplos prácticos y proyectos guiados, buscando que cada estudiante pueda aplicar lo aprendido en escenarios reales. Además, Valeria enfatiza buenas prácticas de programación y la importancia de la planificación antes de codificar.", valoracion: 4.7
        },
        opiniones: [
            { nombre: "Nicolás Méndez", cantidad: 5, comentario: "Muy completo y didáctico. Los ejemplos y ejercicios me ayudaron a entender Java desde cero." },
            { nombre: "Julieta Ruiz", cantidad: 4, comentario: "Excelente para principiantes. El ritmo del curso es bueno y los proyectos prácticos ayudan a consolidar conceptos." },
            { nombre: "Sebastián Torres", cantidad: 5, comentario: "Aprendí mucho sobre programación orientada a objetos. Recomiendo seguir cada unidad con atención." },
            { nombre: "Mariana Blanco", cantidad: 3, comentario: "Buena explicación de los conceptos, aunque algunas unidades son densas, los ejercicios ayudan mucho." },
        ],
        cursosSimilares: ["javascript", "blockchain", "html"]
    },
    {
        cursoId: "mysql",
        nombre: "MySQL",
        link: "../pages/cursos.html?curso=mysql",
        precio: 11500,
        valoracion: 4.8,
        cantidadDeEstudiantes: 1,
        duracion: 28,
        requisitos: ["Acceso a Internet", "Fundametos de programación"],
        destacado: false,
        cuposDisponibles: 13,
        img: "../IMG/Otros Cursos/logo-mysql.png",
        descripcion: "Este curso enseña MySQL a nivel profesional, ideal para quienes quieren diseñar y administrar bases de datos eficientes. Se cubren diseño de esquemas, consultas avanzadas, joins, triggers, procedimientos almacenados, optimización de consultas y seguridad. Los ejercicios incluyen bases de datos para e-commerce, blogs, sistemas de gestión y aplicaciones web complejas. Cada unidad incluye prácticas guiadas y proyectos que simulan entornos reales.",
        unidades: [
            { titulo: "Fundamentos y diseño de bases de datos", duracion: 5 },
            { titulo: "Consultas avanzadas y joins", duracion: 5 },
            { titulo: "Procedimientos almacenados y triggers", duracion: 6 },
            { titulo: "Optimización y seguridad", duracion: 6 },
            { titulo: "Proyecto final: base de datos completa para aplicación", duracion: 6 }
        ],
        docente: {
            nombre: "Mariano Martinez", descripcion: "Mariano Martínez es administrador de bases de datos con más de 8 años de experiencia en MySQL y sistemas de gestión. Su enseñanza combina teoría, buenas prácticas y ejercicios prácticos para crear bases de datos profesionales y escalables.", valoracion: 4.8
        },
        opiniones: [
            { nombre: "Diego Ramírez", cantidad: 5, comentario: "Aprendí a diseñar bases de datos reales y optimizadas para proyectos profesionales." },
            { nombre: "Valentina López", cantidad: 5, comentario: "Muy completo, los ejercicios reflejan escenarios reales de trabajo." },
            { nombre: "Lucas Fernández", cantidad: 4, comentario: "Intenso pero útil, la práctica con triggers y procedimientos es excelente." },
            { nombre: "Mariana Torres", cantidad: 5, comentario: "Proyecto final muy desafiante, excelente para aprender MySQL avanzado." },
        ],
        cursosSimilares: ["nodejs", "php", "java"]
    },
    {
        cursoId: "nodejs",
        nombre: "Node.js",
        link: "../pages/cursos.html?curso=nodejs",
        precio: 13500,
        valoracion: 4.8,
        cantidadDeEstudiantes: 2.6,
        duracion: 30,
        requisitos: ["Acceso a Internet", "Conocimiento de JavaScript y conceptos básicos de backend"],
        cuposDisponibles: 19,
        img: "../IMG/Otros Cursos/logo-node.png",
        descripcion: "Este curso enseña Node.js de forma completa, ideal para quienes buscan desarrollar aplicaciones backend modernas. Se cubren arquitectura de servidores, manejo de APIs REST, Express, bases de datos, autenticación, middlewares, testing y despliegue en servidores. Los ejercicios incluyen desarrollo de aplicaciones de chat, e-commerce y APIs escalables. Cada unidad tiene prácticas guiadas y proyectos que simulan escenarios reales de backend profesional. ",
        unidades: [
            { titulo: "Fundamentos y entorno de Node.js", duracion: 5 },
            { titulo: "Express y routing", duracion: 5 },
            { titulo: "APIs REST y manejo de datos", duracion: 5 },
            { titulo: "Autenticación y seguridad", duracion: 5 },
            { titulo: "Proyecto final: aplicación backend completa", duracion: 5 }
        ],
        docente: {
            nombre: "Juan Salerno", descripcion: "Juan Salerno es desarrollador backend con más de 7 años de experiencia en Node.js y tecnologías relacionadas. Ha trabajado en startups y empresas internacionales, enfocándose en crear APIs eficientes y seguras. Su enseñanza combina teoría, buenas prácticas y desarrollo práctico de aplicaciones reales.", valoracion: 4.8
        },
        opiniones: [
            { nombre: "Ana María López", cantidad: 5, comentario: "Muy práctico, con proyectos que realmente reflejan el entorno laboral." },
            { nombre: "Diego Fernández", cantidad: 5, comentario: "Aprendí a crear APIs REST completas y seguras." },
            { nombre: "Sergio González", cantidad: 4, comentario: " Exigente pero muy completo, excelente para desarrolladores avanzados." },
            { nombre: "Julieta Torres", cantidad: 5, comentario: "Proyecto final desafiante y útil, lista para trabajar con Node.js profesionalmente." },
        ],
        cursosSimilares: ["react", "mysql", "javascript"]
    },
    {
        cursoId: "csharp",
        nombre: "C#",
        link: "../pages/cursos.html?curso=csharp",
        precio: 15000,
        valoracion: 4.8,
        cantidadDeEstudiantes: 1.3,
        duracion: 40,
        requisitos: ["Conocimientos básicos de programación"],
        destacado: false,
        cuposDisponibles: 13,
        img: "../IMG/Otros Cursos/logo-csharp.png",
        descripcion: "Este curso aborda C# a nivel profesional, ideal para quienes ya tienen experiencia básica en programación y desean crear aplicaciones robustas. Se cubren programación orientada a objetos, LINQ, manejo de archivos, colecciones, manejo de errores, interfaces gráficas con Windows Forms y WPF, y desarrollo de aplicaciones web con ASP.NET. Cada unidad incluye proyectos prácticos y ejercicios que simulan escenarios de desarrollo profesional. Al finalizar, podrás desarrollar aplicaciones completas de escritorio y web, aplicando buenas prácticas y patrones de diseño.",
        unidades: [
            { titulo: "Fundamentos y sintaxis avanzada de C#", duracion: 7 },
            { titulo: "Programación orientada a objetos y colecciones", duracion: 7 },
            { titulo: "LINQ y manejo de datos", duracion: 7 },
            { titulo: "Interfaces gráficas con Windows Forms y WPF", duracion: 7 },
            { titulo: "Proyecto final: aplicación completa de escritorio o web", duracion: 7 }
        ],
        docente: {
            nombre: "Julián Ramírez", descripcion: "Julián Ramírez es ingeniero en software con más de 10 años de experiencia en desarrollo en C# y .NET.Ha trabajado en empresas internacionales y proyectos de gran escala.Su enfoque combina teoría profunda con prácticas reales, enseñando optimización, depuración y desarrollo profesional.", valoracion: 4.8
        },
        opiniones: [
            { nombre: "Diego López", cantidad: 5, comentario: "Excelente curso, los ejercicios son muy prácticos y ayudan a entender C# a fondo." },
            { nombre: "Carolina Pérez", cantidad: 5, comentario: "Muy completo, especialmente la sección de interfaces gráficas y LINQ." },
            { nombre: "Fernando García", cantidad: 4, comentario: "Intenso, pero aprendí técnicas profesionales para aplicar en proyectos reales" },
            { nombre: "Valentina Herrera", cantidad: 4, comentario: "Proyectos finales geniales, me siento lista para un entorno profesional" },
        ],
        cursosSimilares: ["java", "mysql", "nodejs"]
    },
    {
        cursoId: "php",
        nombre: "PHP",
        link: "../pages/cursos.html?curso=php",
        precio: 12800,
        valoracion: 4.7,
        cantidadDeEstudiantes: 1.2,
        duracion: 32,
        requisitos: ["Conocimientos básicos de programación", "Fundamentos de programación"],
        destacado: false,
        cuposDisponibles: 23,
        img: "../IMG/Otros Cursos/logo-php.png",
        descripcion: "Este curso de PHP abarca desarrollo web backend avanzado, ideal para quienes quieren crear sitios y aplicaciones dinámicas. Se cubren PHP moderno, manejo de bases de datos, sesiones, seguridad, MVC, integración con APIs y desarrollo de sistemas completos. Los ejercicios incluyen blogs, e-commerce y sistemas de gestión. Cada unidad tiene prácticas guiadas que preparan al estudiante para proyectos profesionales.",
        unidades: [
            { titulo: "Fundamentos y sintaxis avanzada de PHP", duracion: 6 },
            { titulo: "Manejo de formularios y sesiones", duracion: 6 },
            { titulo: "Bases de datos y consultas SQL", duracion: 6 },
            { titulo: "MVC y seguridad en aplicaciones", duracion: 7 },
            { titulo: "Proyecto final: aplicación web completa", duracion: 7 }
        ],
        docente: {
            nombre: "Lucas Martínez", descripcion: "Lucas Martínez es desarrollador backend con más de 10 años de experiencia en PHP y sistemas web. Ha trabajado en grandes proyectos corporativos y startups. Su enseñanza combina teoría, buenas prácticas y desarrollo práctico de aplicaciones web completas.", valoracion: 4.7
        },
        opiniones: [
            { nombre: "Laura Pérez", cantidad: 5, comentario: "Muy completo, aprendí a crear aplicaciones web reales." },
            { nombre: "Martín Gómez", cantidad: 5, comentario: "Excelente explicación de seguridad y MVC, muy útil para proyectos profesionales." },
            { nombre: "Ana Torres", cantidad: 4, comentario: "El proyecto final integra todo lo aprendido, muy recomendable." },
            { nombre: "Nicolás Ramírez", cantidad: 5, comentario: "Intenso pero práctico, los ejercicios ayudan mucho a entender PHP moderno." },
        ],
        cursosSimilares: ["mysql", "html", "javascript"]
    },
    {
        cursoId: "python",
        nombre: "Python",
        link: "../pages/cursos.html?curso=python",
        precio: 95000,
        valoracion: 4.9,
        cantidadDeEstudiantes: 15,
        duracion: 30,
        requisitos: ["Conocimientos básicos de programación"],
        destacado: false,
        cuposDisponibles: 5,
        img: "../IMG/Otros Cursos/Logo Python.png",
        descripcion: "Este curso de Python avanzado está diseñado para quienes ya conocen los fundamentos de programación y quieren dominar Python de manera profesional. Incluye estructuras de datos complejas, programación orientada a objetos, manejo de archivos, módulos y librerías externas, desarrollo de scripts para automatización, y proyectos aplicados en análisis de datos y desarrollo web con frameworks. Los estudiantes trabajarán en ejercicios prácticos que simulan problemas reales y en proyectos integradores que consolidan las habilidades adquiridas. Se enseñan también buenas prácticas, depuración profesional y documentación de código.",
        unidades: [
            { titulo: "Estructuras y sintaxis avanzada en Python", duracion: 6 },
            { titulo: "Programación orientada a objetos y librerías externas", duracion: 6 },
            { titulo: "Manejo avanzado de archivos y bases de datos", duracion: 6 },
            { titulo: "Automatización de tareas y scripts profesionales", duracion: 6 },
            { titulo: "Proyecto final: análisis de datos y mini aplicación web", duracion: 6 }
        ],
        docente: {
            nombre: "Laura Méndez", descripcion: "Laura Méndez es desarrolladora y data scientist con más de 12 años de experiencia en Python profesional. Ha trabajado en empresas tecnológicas, startups y proyectos de análisis de datos. Su enfoque de enseñanza combina teoría con práctica intensiva y la creación de proyectos reales, preparando al estudiante para desafíos profesionales. También comparte tips de optimización, buenas prácticas y depuración avanzada.", valoracion: 4.9
        },
        opiniones: [
            { nombre: "Marcos Ruiz", cantidad: 5, comentario: "Un curso realmente completo. Laura explica cada concepto a profundidad y los proyectos son muy realistas. Aprendí a automatizar tareas y a usar librerías que antes no conocía." },
            { nombre: "Lucía Fernández", cantidad: 5, comentario: "Los ejercicios son desafiantes y muy útiles para proyectos reales. Me encantó la sección de POO y cómo aplicar scripts profesionales." },
            { nombre: "Carlos Gómez", cantidad: 5, comentario: "Muy recomendable para quienes buscan ir más allá de la programación básica en Python. Los proyectos finales ayudan a consolidar lo aprendido." },
            { nombre: "Valentina López", cantidad: 4, comentario: "Excelente curso, completo y bien estructurado. Laura es una docente muy clara y los ejemplos son aplicables en la vida real profesional." },
        ],
        cursosSimilares: ["java", "csharp", "nodejs"]
    },
    {
        cursoId: "react",
        nombre: "React",
        link: "../pages/cursos.html?curso=react",
        precio: 14000,
        valoracion: 4.9,
        cantidadDeEstudiantes: 3.2,
        duracion: 35,
        requisitos: ["Acceso a Internet", "Conocimientos sólidos de JavaScript, HTML y CSS"],
        destacado: false,
        cuposDisponibles: 30,
        img: "../IMG/Otros Cursos/logo-react.png",
        descripcion: "Este curso cubre React a nivel avanzado, ideal para desarrolladores que quieren crear aplicaciones web interactivas y escalables. Se abordan componentes, hooks, routing, estado global, integración con APIs, testing y optimización de rendimiento. Los proyectos prácticos incluyen desarrollo de dashboards, e-commerce y SPA (Single Page Applications). Cada unidad tiene ejercicios y retos que simulan escenarios reales de trabajo profesional en frontend moderno",
        unidades: [
            { titulo: "Fundamentos y JSX", duracion: 7 },
            { titulo: "Componentes, props y estado", duracion: 7 },
            { titulo: "Hooks y manejo de efectos", duracion: 7 },
            { titulo: "Routing y manejo de estado global", duracion: 7 },
            { titulo: "royecto final: SPA completa", duracion: 7 }
        ],
        docente: {
            nombre: "Camila Torres", descripcion: " Camila Torres es desarrolladora frontend con más de 8 años de experiencia en React y frameworks modernos. Ha trabajado en startups y empresas tecnológicas, especializándose en interfaces reactivas, testing y optimización. Su enfoque se centra en enseñar de forma práctica, preparando a los estudiantes para proyectos profesionales reales.", valoracion: 4.9
        },
        opiniones: [
            { nombre: "Nicolás López", cantidad: 5, comentario: "Excelente curso, los ejercicios son muy realistas y útiles." },
            { nombre: "Mariana Silva", cantidad: 5, comentario: "Aprendí a crear aplicaciones web profesionales y escalables con React." },
            { nombre: "Tomás Ramírez", cantidad: 4, comentario: "Requiere atención, pero el aprendizaje es muy sólido y aplicable." },
            { nombre: "Laura Figueroa", cantidad: 5, comentario: "Los proyectos finales son geniales, ya puedo aplicar React profesionalmente." },
        ],
        cursosSimilares: ["nodejs", "html", "javascript"]
    },


]

export const CLASES_CONTENIDOS_CURSOS = [
    { img: "../IMG/Cursos/play.png", alt: "reproducir clase", texto: "" },
    { img: "../IMG/Cursos/pdf.png", alt: "leer teoría", texto: "Teoría" },
    { img: "../IMG/Cursos/ejercicios.png", alt: "ejercicios", texto: "Ejercicios" },
    { img: "../IMG/Cursos/test.png", alt: "examen de la unidad", texto: "Examen" }
];



