import { describe, it, expect } from "vitest";
import { dimensionar, horasDeUso, formatoHoras, DEFAULTS } from "../src/lib/formulas.js";
import { CASOS } from "../src/lib/casos.js";

describe("horasDeUso (uso real por tipo)", () => {
  it("U-01: uso por usos -> (min × usos × cant)/60", () => {
    const h = horasDeUso({ tipo: "usos", min: 2, usos: 55, cantidad: 1 });
    expect(h).toBeCloseTo(1.8333, 3); // 1 h 50 min
  });

  it("U-02: continuo -> horas encendidas", () => {
    expect(horasDeUso({ tipo: "continuo", horas: 6, cantidad: 1 })).toBe(6);
  });

  it("U-03: refri -> horas conectadas × ciclo", () => {
    expect(horasDeUso({ tipo: "refri", horasConectado: 12, ciclo: 35, cantidad: 1 })).toBeCloseTo(4.2, 5);
    expect(horasDeUso({ tipo: "refri", horasConectado: 12, ciclo: 40, cantidad: 1 })).toBeCloseTo(4.8, 5);
  });

  it("U-04: la cantidad NO afecta las horas de uso (se aplica a la potencia)", () => {
    // Regresión D-01: horas por unidad × cantidad = horas totales, una sola vez.
    expect(horasDeUso({ tipo: "usos", min: 2, usos: 55, cantidad: 1 })).toBeCloseTo(1.8333, 3);
    expect(horasDeUso({ tipo: "usos", min: 2, usos: 55, cantidad: 2 })).toBeCloseTo(1.8333, 3);
    expect(horasDeUso({ tipo: "usos", min: 2, usos: 55, cantidad: 7 })).toBeCloseTo(1.8333, 3);
  });
});

describe("dimensionar — potencia y energía", () => {
  const licuadora = { nombre: "Licuadora", cantidad: 2, potencia: 550, tipo: "usos", min: 2, usos: 55, horario: "dia" };

  it("U-04b: potencia instalada = p × cant, energía = p × cant × h (cant una sola vez)", () => {
    const r = dimensionar([licuadora]);
    expect(r.totalW).toBe(1100);
    expect(r.pico).toBe(1100);
    // 550 W × 2 unidades × 1,8333 h = 2.016,7 Wh/día  (no 4.033, que era el defecto D-01)
    expect(r.totalWh).toBeCloseTo(2016.67, 1);
    // La fila debe coincidir con el total: una sola multiplicación por cantidad.
    expect(r.filas[0].energiaWh).toBeCloseTo(2016.67, 1);
  });

  it("U-02: continuo LED 45W × 3 × 6h = 810 Wh", () => {
    const r = dimensionar([{ nombre: "Foco LED", cantidad: 3, potencia: 45, tipo: "continuo", horas: 6, horario: "dia" }]);
    expect(r.totalWh).toBe(810);
    expect(r.totalW).toBe(135);
  });

  it("U-05: número de paneles redondea hacia arriba (3,11 -> 4)", () => {
    const r = dimensionar(
      [{ nombre: "X", cantidad: 1, potencia: 550, tipo: "continuo", horas: 10, horario: "dia" }],
      { ...DEFAULTS, hsp: 4.5, ppanel: 450 }
    );
    // E = 5500 Wh -> wp = 5500/4.5/0.8*1.25 ≈ 1909 -> ceil(1909/450)=5
    expect(r.wp).toBeCloseTo(1909.72, 1);
    expect(r.nPaneles).toBe(5);
  });

  it("U-06: batería = E(1+m)/(V×DOD) — respeta la tensión indicada", () => {
    const r = dimensionar(
      [{ nombre: "X", cantidad: 1, potencia: 550, tipo: "continuo", horas: 10, horario: "dia" }],
      { ...DEFAULTS, tension: 12, dod: 0.5 }
    );
    // Ah = 5500*1.25/(12*0.5) ≈ 1145.83
    expect(r.ah).toBeCloseTo(1145.83, 1);
  });

  it("U-06b: la tensión por defecto es 24 V (compatible con panel de 450 Wp)", () => {
    // D-07 (Acta No. 005): con 12 V un panel de 450 Wp (nominal 24 V) no
    // puede alimentar el banco sin convertidor. 24 V reduce el Ah a la mitad.
    expect(DEFAULTS.tension).toBe(24);
    const r = dimensionar(
      [{ nombre: "X", cantidad: 1, potencia: 550, tipo: "continuo", horas: 10, horario: "dia" }],
      { dod: 0.5 }
    );
    // Ah = 5500*1.25/(24*0.5) ≈ 572.92  (la mitad que a 12 V)
    expect(r.ah).toBeCloseTo(572.92, 1);
  });

  it("U-07: inversor ≥ pico × 1,25", () => {
    const r = dimensionar(
      [{ nombre: "Fritadora", cantidad: 1, potencia: 1200, tipo: "continuo", horas: 2, horario: "dia" }]
    );
    expect(r.watInversor).toBe(1500);
  });
});

describe("refinio del consumo nocturno", () => {
  it("U-08: E_noche solo incluye horario noche/ambos", () => {
    const r = dimensionar([
      { nombre: "Luces", cantidad: 2, potencia: 10, tipo: "continuo", horas: 5, horario: "noche" }, // 100 Wh
      { nombre: "Radio", cantidad: 1, potencia: 40, tipo: "continuo", horas: 6, horario: "ambos" }   // 240 Wh
    ]);
    expect(r.nocturnoWh).toBe(340);
    expect(r.nocturnoWh).toBeLessThanOrEqual(r.totalWh);
  });

  it("U-09: 'ambos' cuenta en el consumo nocturno", () => {
    const r = dimensionar([{ nombre: "Refri", cantidad: 1, potencia: 90, tipo: "refri", horasConectado: 12, ciclo: 35, horario: "ambos" }]);
    expect(r.nocturnoWh).toBeCloseTo(378, 5);
  });

  it("U-10: lista vacía no rompe (totales 0, paneles 0)", () => {
    const r = dimensionar([]);
    expect(r.totalW).toBe(0);
    expect(r.totalWh).toBe(0);
    expect(r.nPaneles).toBe(0);
    expect(r.ah).toBe(0);
  });
});

// Valores exactos de los cinco casos de referencia del Acta No. 002.
// Se fijan número por número (Compromiso 2 del Acta No. 005) para que cualquier
// divergencia futura con el modelo matemático quede detectada, y no solo que el
// resultado sea "mayor que cero", que es lo que dejó pasar la tabla §6 del modelo.
const ESPERADO = {
  "Puesto de jugos": {
    totalW: 635, totalWh: 1408.33, nocturnoWh: 340,
    wp: 489.01, nPaneles: 2, ah: 146.7, watInversor: 793.75
  },
  "Luces LED + datáfono": {
    totalW: 125, totalWh: 760, nocturnoWh: 640,
    wp: 263.89, nPaneles: 1, ah: 79.17, watInversor: 156.25
  },
  "Refrigerador pequeño": {
    totalW: 125, totalWh: 558, nocturnoWh: 498,
    wp: 193.75, nPaneles: 1, ah: 58.13, watInversor: 156.25
  },
  "Puesto mixto": {
    totalW: 645, totalWh: 1471.67, nocturnoWh: 460,
    wp: 511.0, nPaneles: 2, ah: 153.3, watInversor: 806.25
  },
  "Puesto de fritura": {
    totalW: 1295, totalWh: 2845, nocturnoWh: 100,
    wp: 987.85, nPaneles: 3, ah: 296.35, watInversor: 1618.75
  }
};

// El nombre del caso viene con un emoji delante; se quita para buscar la ficha.
const claveDe = (caso) => caso.nombre.replace(/^[^\p{L}]+/u, "");

describe("casos de referencia (Acta 002) — valores exactos", () => {
  it.each(CASOS)("$nombre — coincide con la especificación", (caso) => {
    const e = ESPERADO[claveDe(caso)];
    expect(e, `sin ficha esperada para ${claveDe(caso)}`).toBeDefined();
    const r = dimensionar(caso.filas);
    expect(r.totalW).toBe(e.totalW);
    expect(r.totalWh).toBeCloseTo(e.totalWh, 1);
    expect(r.nocturnoWh).toBeCloseTo(e.nocturnoWh, 1);
    expect(r.wp).toBeCloseTo(e.wp, 1);
    expect(r.nPaneles).toBe(e.nPaneles);
    expect(r.ah).toBeCloseTo(e.ah, 1);
    expect(r.watInversor).toBeCloseTo(e.watInversor, 2);
  });

  it.each(CASOS)("$nombre — la suma de las filas coincide con el total", (caso) => {
    // El defecto D-01 se manifestaba justamente aquí: el detalle no cuadraba
    // con el indicador general.
    const r = dimensionar(caso.filas);
    const sumaFilas = r.filas.reduce((s, f) => s + f.energiaWh, 0);
    expect(sumaFilas).toBeCloseTo(r.totalWh, 5);
    const sumaW = r.filas.reduce((s, f) => s + f.potenciaTotal, 0);
    expect(sumaW).toBeCloseTo(r.totalW, 5);
  });

  it("Caso jugos: 2 licuadoras de 550 W dan 2.017 Wh/día y no 4.033", () => {
    // Regresión directa de D-01 sobre un caso con cantidad > 1.
    const base = CASOS[0].filas[0];
    const una = dimensionar([{ ...base, cantidad: 1 }]);
    const dos = dimensionar([{ ...base, cantidad: 2 }]);
    expect(una.totalWh).toBeCloseTo(1008.33, 1);
    expect(dos.totalWh).toBeCloseTo(2016.67, 1);
    // Duplicar unidades duplica la energía ( lineal ), no la cuadruplica.
    expect(dos.totalWh / una.totalWh).toBeCloseTo(2, 5);
  });

  it("Caso fritura: fritadora 1200W 3min×40 = 2400 Wh", () => {
    const fila = CASOS[4].filas.find((f) => f.nombre.includes("Fritadora"));
    const r = dimensionar([fila]);
    expect(r.totalWh).toBe(2400);
  });
});

describe("controlador de carga (D-06)", () => {
  it("C-01: el voltaje de trabajo del panel por defecto es 24 V", () => {
    expect(DEFAULTS.vpanel).toBe(24);
    const r = dimensionar([{ nombre: "X", cantidad: 1, potencia: 100, tipo: "continuo", horas: 5, horario: "dia" }]);
    expect(r.vpanel).toBe(24);
  });

  it("C-02: 2 paneles de 450 Wp a 24 V exigen un controlador de 50 A", () => {
    const r = dimensionar(CASOS[0].filas); // jugos -> 2 paneles
    expect(r.nPaneles).toBe(2);
    expect(r.potenciaArreglo).toBe(900);
    // 1,25 × 900 / 24 = 46,88 A -> 50 A comercial
    expect(r.ampControlador).toBe(50);
  });

  it("C-03: un solo panel de 450 Wp a 24 V exige un controlador de 30 A", () => {
    const r = dimensionar(CASOS[1].filas); // luces -> 1 panel
    expect(r.nPaneles).toBe(1);
    // 1,25 × 450 / 24 = 23,44 A -> 30 A comercial
    expect(r.ampControlador).toBe(30);
  });

  it("C-04: tres paneles a 24 V exigen un controlador de 80 A", () => {
    const r = dimensionar(CASOS[4].filas); // fritura -> 3 paneles
    expect(r.nPaneles).toBe(3);
    // 1,25 × 1350 / 24 = 70,31 A -> 80 A comercial
    expect(r.ampControlador).toBe(80);
  });

  it("C-05: sin aparatos no hay arreglo ni controlador", () => {
    const r = dimensionar([]);
    expect(r.potenciaArreglo).toBe(0);
    expect(r.ampControlador).toBe(0);
  });
});

describe("formatoHoras", () => {
  it("formatea horas y minutos", () => {
    expect(formatoHoras(1.8333)).toBe("1 h 50 min");
    expect(formatoHoras(0.5)).toBe("30 min");
    expect(formatoHoras(6)).toBe("6 h");
    expect(formatoHoras(0)).toBe("—");
  });
});