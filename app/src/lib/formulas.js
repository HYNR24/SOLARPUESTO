// Módulo puro de cálculo — SolarPuesto V1.0 (sin dependencias de UI ni DOM -> 100% testable)

export const DEFAULTS = {
  hsp: 4.5,     // horas pico solar (Neiva)
  eff: 0.8,     // eficiencia del sistema
  margen: 0.25, // margen de pérdidas
  tension: 24,  // V del banco de baterías (compatible con panel de 450 Wp / 24 V nominal)
  dod: 0.5,     // profundidad de descarga
  ppanel: 450,  // Wp por panel comercial
  vpanel: 24    // V nominales de trabajo del panel (clase del panel de 450 Wp)
};

// Amperajes comerciales de los controladores de carga. La corriente exigida se
// redondea hacia arriba hasta el primero que la cubra (D-06 del Acta No. 005).
const AMPERAJES_COMERCIALES = [10, 20, 30, 40, 50, 60, 80, 100];

function amperajeComercial(amperios) {
  const hallado = AMPERAJES_COMERCIALES.find((a) => a >= amperios);
  if (hallado) return hallado;
  // Por encima de 100 A se redondea a la decena siguiente.
  return Math.ceil(amperios / 10) * 10;
}

// Horas de uso diario POR UNIDAD de un elemento, según su tipo.
// La cantidad NO interviene aquí: se aplica sobre la potencia, no sobre las
// horas. Multiplicar ambos equivale a elevar la energía al cuadrado de la
// cantidad (ver D-01 del Acta No. 005).
// - usos:      m * u / 60          (minutos por uso × usos al día)
// - continuo:  t                   (horas encendido/día)
// - refri:     t_conectado × ciclo% (compresor no consume a toda hora)
export function horasDeUso(a) {
  if (a.tipo === "usos") return ((a.min || 0) * (a.usos || 0)) / 60;
  if (a.tipo === "continuo") return a.horas || 0;
  if (a.tipo === "refri") return (a.horasConectado || 0) * ((a.ciclo || 0) / 100);
  return 0;
}

// Dimensiona el sistema completo a partir de la lista de aparatos.
// Devuelve un objeto puro con KPIs, desglose por aparato, material y
// refinio del consumo nocturno (lo cubre la batería).
export function dimensionar(aparatos, params = DEFAULTS) {
  const p = { ...DEFAULTS, ...params };

  const filas = aparatos.map((a) => {
    const horas = horasDeUso(a);
    const potenciaTotal = a.potencia * a.cantidad;
    const energiaWh = potenciaTotal * horas;
    return { ...a, horas, potenciaTotal, energiaWh };
  });

  const totalWh = filas.reduce((s, f) => s + f.energiaWh, 0);
  const totalW = filas.reduce((s, f) => s + f.potenciaTotal, 0);
  const pico = filas.length ? Math.max(0, ...filas.map((f) => f.potenciaTotal)) : 0;

  const nocturnoWh = filas
    .filter((f) => f.horario === "noche" || f.horario === "ambos")
    .reduce((s, f) => s + f.energiaWh, 0);

  // Paneles:  Wp = (E / HSP) * (1 / eff) * (1 + margen);  N = ceil(Wp / Wpanel)
  const wp = (totalWh / p.hsp) * (1 / p.eff) * (1 + p.margen);
  const nPaneles = totalWh > 0 ? Math.ceil(wp / p.ppanel) : 0;

  // Batería:  Ah = E * (1 + margen) / (V * DOD)
  const ah = totalWh > 0 ? (totalWh * (1 + p.margen)) / (p.tension * p.dod) : 0;

  // Inversor:  >= P_pico * 1.25  (margen de arranque)
  const watInversor = Math.max(pico * 1.25, totalW * 1.25);

  // Controlador de carga (D-06): regula la entrada del panel hacia la batería
  // y la protege de la sobrecarga. Corriente = 1,25 × potencia del arreglo /
  // tensión del banco, redondeada al amperaje comercial inmediato.
  const potenciaArreglo = nPaneles * p.ppanel;
  const ampControlador =
    potenciaArreglo > 0 && p.tension > 0
      ? amperajeComercial((1.25 * potenciaArreglo) / p.tension)
      : 0;

  // Garantía: los paneles re-cargan la batería dentro de las HSP
  const produccionDiariaKWh = wp * p.hsp;

  return {
    filas,
    totalW,
    totalWh,
    pico,
    nocturnoWh,
    wp,
    nPaneles,
    ah,
    watInversor,
    vpanel: p.vpanel,
    ppanel: p.ppanel,
    tension: p.tension,
    dod: p.dod,
    potenciaArreglo,
    ampControlador,
    produccionDiariaWh: produccionDiariaKWh // Wp × HSP
  };
}

// Formatea horas (flotante) como "X h Y min".
export function formatoHoras(h) {
  if (!(h > 0)) return "—";
  const totalMin = Math.round(h * 60);
  const hh = Math.floor(totalMin / 60);
  const mm = totalMin % 60;
  if (hh === 0) return `${mm} min`;
  if (mm === 0) return `${hh} h`;
  return `${hh} h ${mm} min`;
}