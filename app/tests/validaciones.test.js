import { describe, it, expect } from "vitest";
import {
  validarAparato,
  validarTabla,
  normalizarNombre,
  LIMITS
} from "../src/lib/validaciones.js";

const base = {
  id: 1,
  nombre: "Licuadora",
  cantidad: 1,
  potencia: 550,
  tipo: "usos",
  horario: "dia",
  min: 2,
  usos: 55
};

describe("normalizarNombre", () => {
  it("ignora mayúsculas, tildes y espacios sobrantes", () => {
    expect(normalizarNombre("  RefrigERADOR  ")).toBe("refrigerador");
    expect(normalizarNombre("Lámpara LED")).toBe("lampara led");
  });
});

describe("V-01 — nombre obligatorio y único", () => {
  it("rechaza nombre vacío", () => {
    expect(validarAparato({ ...base, nombre: "" })).toHaveProperty("nombre");
    expect(validarAparato({ ...base, nombre: "   " })).toHaveProperty("nombre");
  });

  it("acepta un nombre válido", () => {
    expect(validarAparato(base)).not.toHaveProperty("nombre");
  });

  it("rechaza nombres repetidos, aunque cambien mayúsculas o tildes", () => {
    const otro = { ...base, id: 2, nombre: "  LÁMPARA led " };
    const e = validarAparato({ ...base, nombre: "lampara LED" }, [base, otro]);
    expect(e.nombre).toMatch(/ya está en otra fila/);
  });

  it("no marca duplicado si cada fila tiene nombre distinto", () => {
    const filas = [base, { ...base, id: 2, nombre: "Radio" }];
    expect(validarAparato(base, filas)).not.toHaveProperty("nombre");
  });
});

describe("V-02 — cantidad entero ≥ 1", () => {
  it("rechaza 0, negativos y vacíos", () => {
    expect(validarAparato({ ...base, cantidad: 0 })).toHaveProperty("cantidad");
    expect(validarAparato({ ...base, cantidad: -1 })).toHaveProperty("cantidad");
    expect(validarAparato({ ...base, cantidad: "" })).toHaveProperty("cantidad");
  });

  it("rechaza decimales", () => {
    expect(validarAparato({ ...base, cantidad: 1.5 }).cantidad).toMatch(/entero/);
  });

  it("acepta enteros como texto (lo que escribe el usuario)", () => {
    expect(validarAparato({ ...base, cantidad: "3" })).not.toHaveProperty("cantidad");
  });
});

describe("V-03 — potencia > 0", () => {
  it("rechaza 0, negativos y vacío", () => {
    expect(validarAparato({ ...base, potencia: 0 })).toHaveProperty("potencia");
    expect(validarAparato({ ...base, potencia: -5 })).toHaveProperty("potencia");
    expect(validarAparato({ ...base, potencia: "" })).toHaveProperty("potencia");
  });

  it("acepta 0,1 W", () => {
    expect(validarAparato({ ...base, potencia: 0.1 })).not.toHaveProperty("potencia");
  });
});

describe("V-04 — tipo usos: minutos por uso y usos por día", () => {
  it("exige min > 0", () => {
    expect(validarAparato({ ...base, min: 0 })).toHaveProperty("min");
  });

  it("exige usos ≥ 1", () => {
    expect(validarAparato({ ...base, usos: 0 })).toHaveProperty("usos");
  });

  it("no mira horas/ciclo cuando el tipo es usos", () => {
    const e = validarAparato({ ...base, horas: "", horasConectado: "", ciclo: "" });
    expect(e).toEqual({});
  });
});

describe("V-05 — tipo continuo: horas entre 0 y 24", () => {
  const cont = { ...base, tipo: "continuo", horas: 6, min: "", usos: "" };

  it("acepta 6 h", () => {
    expect(validarAparato(cont)).toEqual({});
  });

  it("rechaza 0 h y 25 h", () => {
    expect(validarAparato({ ...cont, horas: 0 })).toHaveProperty("horas");
    expect(validarAparato({ ...cont, horas: 25 }).horas).toMatch(/Máximo 24/);
  });
});

describe("V-06 — tipo refri: horas conectadas y ciclo 20–60 %", () => {
  const refri = {
    ...base,
    tipo: "refri",
    min: "",
    usos: "",
    horas: "",
    horasConectado: 12,
    ciclo: 35
  };

  it("acepta 12 h conectadas y ciclo 35 %", () => {
    expect(validarAparato(refri)).toEqual({});
  });

  it("rechaza ciclo fuera de 20–60 %", () => {
    expect(validarAparato({ ...refri, ciclo: 10 }).ciclo).toMatch(/entre 20 y 60/);
    expect(validarAparato({ ...refri, ciclo: 70 }).ciclo).toMatch(/entre 20 y 60/);
  });

  it("rechaza más de 24 h conectadas", () => {
    expect(validarAparato({ ...refri, horasConectado: 25 })).toHaveProperty("horasConectado");
  });

  it("respeta los límites declarados", () => {
    expect(LIMITS).toEqual({ horasDia: 24, cicloMin: 20, cicloMax: 60 });
  });
});

describe("V-07 — uso total ≤ 24 h/día", () => {
  it("rechaza un uso total mayor a 24 h", () => {
    const e = validarAparato({ ...base, min: 2, usos: 800 });
    expect(e.uso).toMatch(/supera las 24 h/);
  });

  it("acepta un uso total razonable", () => {
    expect(validarAparato(base)).not.toHaveProperty("uso");
  });
});

describe("validarTabla", () => {
  it("tabla vacía es válida (no bloquea el cálculo)", () => {
    const r = validarTabla([]);
    expect(r.ok).toBe(true);
    expect(r.mensajes).toEqual([]);
    expect(r.filasConError).toBe(0);
  });

  it("tabla válida no reporta errores", () => {
    const filas = [base, { ...base, id: 2, nombre: "Radio", tipo: "continuo", horas: 6, min: "", usos: "" }];
    const r = validarTabla(filas);
    expect(r.ok).toBe(true);
    expect(r.erroresPorFila).toEqual({});
  });

  it("reporta los errores agrupados por fila y campo", () => {
    const filas = [
      { ...base, id: 1, potencia: 0 },
      { ...base, id: 2, nombre: "Refrigerador", tipo: "refri", horasConectado: 12, ciclo: 80, min: "", usos: "", horas: "" }
    ];
    const r = validarTabla(filas);
    expect(r.ok).toBe(false);
    expect(r.erroresPorFila[1]).toHaveProperty("potencia");
    expect(r.erroresPorFila[2]).toHaveProperty("ciclo");
    expect(r.filasConError).toBe(2);
    expect(r.camposConError).toBe(r.mensajes.length);
  });

  it("el mensaje de uso incluye el nombre del aparato", () => {
    const r = validarTabla([{ ...base, min: 2, usos: 800 }]);
    expect(r.mensajes[0]).toMatch(/^Licuadora: /);
  });

  it("marca el nombre repetido en ambas filas involucradas", () => {
    const filas = [
      { ...base, id: 1, nombre: "Licuadora" },
      { ...base, id: 2, nombre: "licuadora" }
    ];
    const r = validarTabla(filas);
    expect(r.erroresPorFila[1]).toHaveProperty("nombre");
    expect(r.erroresPorFila[2]).toHaveProperty("nombre");
  });
});
