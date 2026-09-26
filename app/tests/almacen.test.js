import { describe, it, expect, beforeEach } from "vitest";
import { cargar, guardar, vaciar, CLAVE } from "../src/lib/almacen.js";
import { DEFAULTS } from "../src/lib/formulas.js";

const filas = [
  { id: 1, nombre: "Licuadora", cantidad: 1, potencia: 550, tipo: "usos", horario: "dia", min: 2, usos: 55 }
];

beforeEach(() => {
  localStorage.clear();
});

describe("guardar / cargar — ida y vuelta (RFN-05)", () => {
  it("conserva la tabla de carga y los parametros", () => {
    expect(guardar(filas, DEFAULTS)).toBe(true);
    const r = cargar();
    expect(r.aparatos).toHaveLength(1);
    expect(r.aparatos[0].nombre).toBe("Licuadora");
    expect(r.aparatos[0].min).toBe(2);
    expect(r.params).toEqual(DEFAULTS);
  });

  it("guarda los parametros editados por el usuario", () => {
    guardar(filas, { ...DEFAULTS, hsp: 5, tension: 24 });
    expect(cargar().params.hsp).toBe(5);
    expect(cargar().params.tension).toBe(24);
  });

  it("devuelve null la primera vez (sin datos guardados)", () => {
    expect(cargar()).toBeNull();
  });

  it("una tabla vacia con parametros si se conserva", () => {
    guardar([], DEFAULTS);
    expect(cargar().aparatos).toEqual([]);
  });
});

describe("saneamiento de datos", () => {
  it("completa los parametros que falten con los valores por defecto", () => {
    localStorage.setItem(CLAVE, JSON.stringify({ aparatos: filas, params: { hsp: 4 } }));
    const r = cargar();
    expect(r.params.hsp).toBe(4);
    expect(r.params.ppanel).toBe(DEFAULTS.ppanel);
    expect(r.params.dod).toBe(DEFAULTS.dod);
  });

  it("descarta parametros no numericos o no positivos", () => {
    localStorage.setItem(CLAVE, JSON.stringify({ aparatos: filas, params: { hsp: "abc", eff: -1, dod: 0.6 } }));
    const r = cargar();
    expect(r.params.hsp).toBe(DEFAULTS.hsp);
    expect(r.params.eff).toBe(DEFAULTS.eff);
    expect(r.params.dod).toBe(0.6);
  });

  it("descarta filas que no son objetos validos", () => {
    localStorage.setItem(CLAVE, JSON.stringify({ aparatos: [filas[0], null, 5, "x", []], params: DEFAULTS }));
    expect(cargar().aparatos).toHaveLength(1);
  });

  it("corrige tipo y horario con valores permitidos", () => {
    localStorage.setItem(
      CLAVE,
      JSON.stringify({ aparatos: [{ id: 1, nombre: "X", tipo: "inventado", horario: "madrugada" }], params: DEFAULTS })
    );
    const a = cargar().aparatos[0];
    expect(a.tipo).toBe("usos");
    expect(a.horario).toBe("dia");
  });
});

describe("JSON corrupto", () => {
  it("no revienta: devuelve null y se puede volver a guardar", () => {
    localStorage.setItem(CLAVE, "{esto no es json");
    expect(cargar()).toBeNull();
    expect(guardar(filas, DEFAULTS)).toBe(true);
    expect(cargar().aparatos).toHaveLength(1);
  });

  it("devuelve null si el contenido no es un objeto", () => {
    localStorage.setItem(CLAVE, '"texto plano"');
    expect(cargar()).toBeNull();
  });
});

describe("entorno sin almacenamiento", () => {
  it("guardar devuelve false y cargar null, sin lanzar error", () => {
    const original = globalThis.localStorage;
    // jsdom no permite borrar localStorage del todo: se simula con un getter que lanza.
    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      get() {
        throw new Error("almacenamiento bloqueado");
      }
    });
    try {
      expect(guardar(filas, DEFAULTS)).toBe(false);
      expect(cargar()).toBeNull();
      expect(vaciar()).toBe(false);
    } finally {
      Object.defineProperty(globalThis, "localStorage", { configurable: true, value: original });
    }
  });
});

describe("vaciar", () => {
  it("borra lo guardado y cargar vuelve a dar null", () => {
    guardar(filas, DEFAULTS);
    expect(vaciar()).toBe(true);
    expect(cargar()).toBeNull();
  });
});
