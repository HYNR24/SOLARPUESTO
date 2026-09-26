// Módulo puro de validación de entradas (RFN-04) — SolarPuesto V1.0
// Sin dependencias de React ni del DOM -> 100% testable con Vitest.
// Reglas V-01 a V-07 del Plan_Pruebas_MVP (Entregables_FaseDiseño).

import { horasDeUso } from "./formulas.js";

export const LIMITS = {
  horasDia: 24,
  cicloMin: 20,
  cicloMax: 60
};

// Compara nombres ignorando mayúsculas, tildes y espacios sobrantes.
export function normalizarNombre(n) {
  return String(n ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

const num = (v) => {
  const n = parseFloat(v);
  return isNaN(n) ? 0 : n;
};

// Valida un aparato. `todos` es la lista completa (para la regla de nombre único).
// Devuelve un objeto { campo: mensaje } solo con los campos que fallan.
export function validarAparato(a, todos = []) {
  const e = {};
  const nombre = String(a.nombre ?? "").trim();

  // V-01 nombre obligatorio y único
  if (!nombre) {
    e.nombre = "Escribe el nombre del aparato.";
  } else {
    const repetidos = todos.filter(
      (o) => o !== a && normalizarNombre(o.nombre) === normalizarNombre(nombre)
    ).length;
    if (repetidos > 0) e.nombre = "Este nombre ya está en otra fila.";
  }

  // V-02 cantidad entero >= 1
  const crudo = String(a.cantidad ?? "").trim();
  const c = num(crudo);
  if (crudo === "" || isNaN(c) || c < 1) {
    e.cantidad = "La cantidad debe ser 1 o más.";
  } else if (!Number.isInteger(c)) {
    e.cantidad = "La cantidad debe ser un número entero.";
  }

  // V-03 potencia > 0
  if (!(num(a.potencia) > 0)) {
    e.potencia = "La potencia debe ser mayor que 0 W.";
  }

  if (a.tipo === "usos") {
    // V-04 minutos por uso > 0 y usos/dia >= 1
    if (!(num(a.min) > 0)) e.min = "Indica los minutos por uso (mínimo 1).";
    if (!(num(a.usos) >= 1)) e.usos = "Indica los usos por día (mínimo 1).";
  }

  if (a.tipo === "continuo") {
    // V-05 horas encendidas entre 0 y 24
    const h = num(a.horas);
    if (!(h > 0)) e.horas = "Indica las horas encendido por día.";
    else if (h > LIMITS.horasDia) e.horas = `Máximo ${LIMITS.horasDia} horas por día.`;
  }

  if (a.tipo === "refri") {
    // V-06 horas conectadas entre 0 y 24, ciclo 20-60 %
    const hc = num(a.horasConectado);
    if (!(hc > 0)) e.horasConectado = "Indica las horas conectado por día.";
    else if (hc > LIMITS.horasDia) e.horasConectado = `Máximo ${LIMITS.horasDia} horas por día.`;

    const ciclo = num(a.ciclo);
    if (ciclo < LIMITS.cicloMin || ciclo > LIMITS.cicloMax) {
      e.ciclo = `El ciclo debe estar entre ${LIMITS.cicloMin} y ${LIMITS.cicloMax} %.`;
    }
  }

  // V-07 el uso total no puede superar 24 h/dia
  if (horasDeUso(a) > LIMITS.horasDia) {
    e.uso = `El uso total supera las ${LIMITS.horasDia} h/día.`;
  }

  return e;
}

// Valida toda la tabla. Devuelve errores por fila, la lista de mensajes y si
// se puede calcular el resultado.
export function validarTabla(aparatos) {
  const erroresPorFila = {};
  const mensajes = [];

  for (const a of aparatos) {
    const e = validarAparato(a, aparatos);
    if (Object.keys(e).length > 0) {
      erroresPorFila[a.id] = e;
      const etiqueta = String(a.nombre ?? "").trim() || "Fila sin nombre";
      for (const [campo, msg] of Object.entries(e)) {
        mensajes.push(campo === "uso" ? `${etiqueta}: ${msg}` : `${etiqueta} — ${msg}`);
      }
    }
  }

  const filasConError = Object.keys(erroresPorFila).length;
  return {
    erroresPorFila,
    mensajes,
    filasConError,
    camposConError: mensajes.length,
    ok: mensajes.length === 0
  };
}
