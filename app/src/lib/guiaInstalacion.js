// Guía de instalación gráfica — Compromiso 4 del Acta de Reunión No. 005.
// Contenido del "libro" de instalación que se muestra en la pestaña 3:
// portada con cómo funciona el sistema, capítulos de montaje ilustrados y
// recomendaciones de uso. Los pocos números que aparecen aquí son los del
// caso de referencia «Puesto mixto»; el diagrama de la app los toma en vivo
// del dimensionamiento.

export const GUIA_INTRO = {
  titulo: "Manual de instalación del sistema solar autónomo",
  subtitulo: "Guía gráfica para armar el sistema paso a paso",
  comoFunciona: [
    "Todo empieza en el sol: el panel solar capta la luz y la convierte en corriente continua (CC).",
    "Esa corriente pasa por el controlador de carga, que la regula y evita que las baterías se sobrecarguen o se descarguen de más.",
    "El controlador carga el banco de baterías, que es el depósito de energía del puesto y trabaja a 24 V.",
    "Cuando necesitas usar tus aparatos, la batería entrega la energía al inversor.",
    "El inversor transforma los 24 V de corriente continua en 110/120 V de corriente alterna (CA), que es la que usan la licuadora, las luces y los cargadores.",
    "Así, lo que consumes durante el día lo entrega el panel, y lo que consumes de noche lo entrega la batería."
  ]
};

// Cada capítulo es un paso de montaje ilustrado, en el mismo orden en que se
// recomienda instalar y conectar los elementos.
export const PASOS_MONTAJE = [
  {
    n: 1,
    key: "panel",
    icono: "🔆",
    titulo: "Instala el panel solar",
    resumen: "El panel debe recibir la mayor cantidad de sol directo del día.",
    acciones: [
      "Elige el lugar más soleado, sin sombras de árboles, postes ni del toldo.",
      "Oriéntalo hacia el sur y dale una inclinación de 10° a 15° para que escurra el agua.",
      "Ancla el panel a una estructura o a una vara firme para que el viento no lo voltee.",
      "Límpialo con un trapo húmedo cada 2 o 3 días, a primera hora."
    ],
    tip: "Nunca lo cubras con lonas ni lo dejes bajo sombra: cualquier sombra, aunque sea parcial, reduce la carga de todo el día.",
    conexion: {
      titulo: "Del panel al controlador (PV)",
      descripcion: "Lleva el cable rojo al borne PV+ y el negro al PV−. Usa conectores MC4 y revisa que no queden polos sueltos.",
      aviso: "Nunca conectes el panel directamente a la batería."
    },
    materiales: [
      {
        nombre: "Panel solar de 450 Wp",
        detalle: "Monocristalino o policristalino, 24 V. En la foto se ven las celdas reales del panel.",
        imagen: "/materiales/panel-solar.jpg",
        alt: "Ejemplo real: celdas de un panel solar policristalino",
        credito: "Guilhem Vellut",
        licencia: "CC BY 2.0",
        fuente: "https://commons.wikimedia.org/wiki/File:Close-up_of_a_polycrystalline_solar_PV_panel.jpg"
      }
    ]
  },
  {
    n: 2,
    key: "cableado",
    icono: "➿",
    titulo: "Tiende el cableado",
    resumen: "Un buen cableado es corto, firme y protegido.",
    acciones: [
      "Usa cable de cobre flexible: de 4 a 6 mm² del panel al controlador y de 10 a 25 mm² del banco al inversor.",
      "Lleva los cables por canaleta o tubo, lejos de zonas de paso y de superficies calientes.",
      "Mantén los tramos lo más cortos posible para no perder energía en forma de calor.",
      "Respeta la polaridad (+ y −) y aprieta bien todos los bornes."
    ],
    tip: "Un borne flojo se calienta y puede quemar el terminal o dañar el equipo.",
    conexion: {
      titulo: "Calibre y ruta de los cables",
      descripcion: "Del panel al controlador usa cable de 4 a 6 mm²; de la batería al inversor, de 10 a 25 mm². Rojo es positivo y negro es negativo.",
      aviso: "Un cable delgado o un borne flojo se calienta y puede quemar el terminal."
    },
    materiales: [
      {
        nombre: "Conector MC4 macho y hembra",
        detalle: "Es el conector típico de los paneles solares. Une el positivo con el positivo y el negativo con el negativo.",
        imagen: "/materiales/conector-mc4.jpg",
        alt: "Ejemplo real: conector MC4 macho y hembra",
        credito: "Orion Lawlor",
        licencia: "CC0",
        fuente: "https://commons.wikimedia.org/wiki/File:MC4_Connector_Front_and_Top_View.jpg"
      },
      {
        nombre: "Cable solar rojo y negro",
        detalle: "Rojo para el positivo y negro para el negativo; 4–6 mm² del panel al controlador.",
        imagen: "/materiales/cable-solar.jpg",
        alt: "Ejemplo real: cables solares rojo y negro",
        credito: "Asurnipal",
        licencia: "CC BY-SA 4.0",
        fuente: "https://commons.wikimedia.org/wiki/File:Dornbirn-Photovoltaic_cables-01ASD.jpg"
      }
    ]
  },
  {
    n: 3,
    key: "controlador",
    icono: "🎛️",
    titulo: "Conecta el controlador de carga",
    resumen: "Va entre el panel y la batería: regula la carga y protege el banco.",
    acciones: [
      "Fíjalo en un lugar seco y ventilado, cerca del banco pero protegido del agua.",
      "Elige un controlador de corriente igual o mayor a la que indica la aplicación.",
      "Conéctalo en este orden: primero la batería al controlador y después el panel.",
      "Para desconectar, hazlo al revés: primero el panel y al final la batería."
    ],
    tip: "Si el controlador se calienta mucho o marca voltajes raros, revisa la polaridad y que los bornes estén apretados.",
    conexion: {
      titulo: "Batería primero, panel después",
      descripcion: "Conecta BAT+ y BAT− al banco, y luego PV+ y PV− al panel. El borne LOAD es solo para cargas pequeñas, no para el inversor.",
      aviso: "Para apagar, desconecta primero el panel y al final la batería."
    },
    materiales: [
      {
        nombre: "Controlador de carga solar",
        detalle: "Ejemplo real de controlador. Debe soportar al menos la corriente que indica la aplicación.",
        imagen: "/materiales/controlador-carga.jpg",
        alt: "Ejemplo real: controlador de carga solar",
        credito: "Ranjithkumar Murugesan",
        licencia: "CC0",
        fuente: "https://commons.wikimedia.org/wiki/File:SUOER_SOLAR_CHARGE_CONTROLLER.jpg"
      }
    ]
  },
  {
    n: 4,
    key: "bateria",
    icono: "🔋",
    titulo: "Arma y conecta el banco de baterías",
    resumen: "El banco almacena la energía para la noche.",
    acciones: [
      "Ubica las baterías en un lugar ventilado, seco y firme, nunca en un cajón cerrado.",
      "Conéctalas respetando la polaridad y pon un fusible o breaker cerca del borne positivo.",
      "No mezcles baterías de distinta edad o capacidad en el mismo banco.",
      "Usa baterías de ciclo profundo, como mínimo de la capacidad que indica la aplicación."
    ],
    tip: "Respeta la profundidad de descarga (50 %): no descargues la batería por completo, así dura más.",
    conexion: {
      titulo: "Dos baterías de 12 V en serie = 24 V",
      descripcion: "Une el negativo de una batería con el positivo de la otra. La salida libre (positivo de A y negativo de B) va al controlador y al inversor.",
      aviso: "Pon un fusible o breaker en el positivo y no mezcles baterías de distinta edad o capacidad."
    },
    materiales: [
      {
        nombre: "Batería de ciclo profundo",
        detalle: "12 V · 100 Ah. Para un banco de 24 V se conectan dos baterías iguales en serie.",
        imagen: "/materiales/bateria-ciclo-profundo.jpg",
        alt: "Ejemplo real: batería de ciclo profundo",
        credito: "TaurusEmerald",
        licencia: "CC BY-SA 4.0",
        fuente: "https://commons.wikimedia.org/wiki/File:Super_Start_Marine_RV_Deep_Cycle_Battery.jpg"
      },
      {
        nombre: "Fusible ANL con portafusible",
        detalle: "Ejemplo de 100 A. Se instala en el cable positivo, cerca del borne de la batería.",
        imagen: "/materiales/fusible-100a.jpg",
        alt: "Ejemplo real: fusible ANL con portafusible",
        credito: "Zureks",
        licencia: "CC BY 3.0",
        fuente: "https://commons.wikimedia.org/wiki/File:Fuse_100A_with_holder,_closed.jpg"
      }
    ]
  },
  {
    n: 5,
    key: "inversor",
    icono: "⚡",
    titulo: "Conecta el inversor",
    resumen: "Convierte los 24 V CC de la batería en 110/120 V CA para tus aparatos.",
    acciones: [
      "Colócalo lo más cerca posible del banco, con cable grueso y corto.",
      "Respeta la polaridad al conectarlo a la batería.",
      "Enciéndelo solo cuando uses los aparatos y apágalo al cerrar.",
      "No superes la potencia que indica la aplicación para evitar sobrecargas."
    ],
    tip: "Aunque no tenga nada conectado, el inversor consume algo de batería: apágalo cuando no lo uses.",
    conexion: {
      titulo: "Batería → fusible → inversor",
      descripcion: "El positivo pasa por el fusible o breaker y llega al borne + del inversor; el negativo va directo al borne −. La salida CA va a los aparatos.",
      aviso: "Nunca conectes la salida de 110/120 V CA a la batería ni al controlador."
    },
    materiales: [
      {
        nombre: "Inversor de 24 V a 120 V",
        detalle: "Ejemplo real de inversor. Debe entregar al menos la potencia que calcula la aplicación.",
        imagen: "/materiales/inversor.jpg",
        alt: "Ejemplo real: inversor de corriente",
        credito: "C J Cowie",
        licencia: "CC BY-SA 3.0",
        fuente: "https://commons.wikimedia.org/wiki/File:Inverter_CJC01.jpg"
      }
    ]
  },
  {
    n: 6,
    key: "cargas",
    icono: "🔌",
    titulo: "Conecta los aparatos y pon en marcha",
    resumen: "Con el sistema listo, enciende todo con seguridad.",
    acciones: [
      "Revisa que todas las conexiones estén firmes y con la polaridad correcta.",
      "Sigue la secuencia: batería → controlador → panel → inversor.",
      "Enciende los aparatos uno por uno, empezando por los de menor consumo.",
      "Si algo no enciende, revisa el fusible, la polaridad y la carga de la batería."
    ],
    tip: "No conectes al mismo tiempo los dos aparatos de mayor consumo si el inversor es ajustado.",
    conexion: {
      titulo: "Salida CA a los aparatos",
      descripcion: "Conecta licuadora, luces y cargadores a la salida CA del inversor o a una regleta. Enciéndelos uno por uno, del menor al mayor consumo.",
      aviso: "No uses el borne LOAD del controlador para alimentar el inversor."
    },
    materiales: [
      {
        nombre: "Regleta de tomacorrientes",
        detalle: "Sirve para repartir la salida CA entre la licuadora, las luces y los cargadores.",
        imagen: "/materiales/regleta-usa.jpg",
        alt: "Ejemplo real: regleta de tomacorrientes",
        credito: "Wikimedia Commons",
        licencia: "CC BY-SA 3.0",
        fuente: "https://commons.wikimedia.org/wiki/File:US-power-strip-rotated.jpg"
      }
    ]
  }
];

export const RECOMENDACIONES = [
  {
    icono: "☀️",
    titulo: "Aprovecha las horas de sol",
    texto: "Carga el celular, el datáfono y usa los aparatos de mayor consumo durante el día: lo que consumes de noche lo entrega la batería."
  },
  {
    icono: "🔋",
    titulo: "Cuida la batería",
    texto: "Respeta el 50 % de descarga y mantenla cargada. Una batería bien cuidada dura más y rinde mejor."
  },
  {
    icono: "🧹",
    titulo: "Mantén el panel limpio",
    texto: "Límpialo cada 2 o 3 días, a primera hora. Polvo, hojas o sombras reducen la energía que produce."
  },
  {
    icono: "🌙",
    titulo: "Reduce el consumo nocturno",
    texto: "Apaga el inversor al cerrar y evita dejar equipos encendidos: aun en vacío consumen batería."
  },
  {
    icono: "⚠️",
    titulo: "Seguridad primero",
    texto: "Respeta la polaridad, usa fusibles y nunca manipules el sistema mojado. Mantén el agua y el aceite lejos de los equipos."
  },
  {
    icono: "📈",
    titulo: "Revisa y ajusta",
    texto: "Compara lo que produce el sistema con lo que calcula la aplicación; si un aparato se apaga temprano, mueve consumo al día o amplía el banco."
  }
];
