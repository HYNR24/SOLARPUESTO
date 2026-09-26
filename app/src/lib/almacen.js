// Persistencia local (RFN-05 / Nota del Acta 004) — SolarPuesto V1.0
// Guarda la tabla de carga y los parametros configurables en localStorage.
// No hay datos personales ni servidor: todo queda en el navegador del usuario.

import { DEFAULTS } from "./formulas.js";

export const CLAVE = "solarpuesto:v1";

const TIPOS = ["usos", "continuo", "refri"];
const HORARIOS = ["dia", "noche", "ambos"];

// localStorage puede estar ausente (SSR/tests) o lanzar (modo privado, cuota llena).
function almacenamiento() {
  try {
    const s = globalThis.localStorage;
    if (!s) return null;
    const prueba = `${CLAVE}__test`;
    s.setItem(prueba, "1");
    s.removeItem(prueba);
    return s;
  } catch {
    return null;
  }
}

// Descarta filas que no tengan la forma minima esperada (datos viejos o manipulados).
function ApparatusValido(a) {
  return a && typeof a === "object" && !Array.isArray(a) && typeof a.nombre === "string";
}

function sanearParametros(p) {
  const base = { ...DEFAULTS };
  if (!p || typeof p !== "object" || Array.isArray(p)) return base;
  for (const k of Object.keys(DEFAULTS)) {
    const v = parseFloat(p[k]);
    if (!isNaN(v) && v > 0) base[k] = v;
  }
  return base;
}

function sanearAparatos(lista) {
  if (!Array.isArray(lista)) return [];
  return lista.filter(ApparatusValido).map((a, i) => ({
    ...a,
    id: a.id ?? i + 1,
    cantidad: a.cantidad ?? 1,
    potencia: a.potencia ?? "",
    tipo: TIPOS.includes(a.tipo) ? a.tipo : "usos",
    horario: HORARIOS.includes(a.horario) ? a.horario : "dia"
  }));
}

// Devuelve { aparatos, params } con lo guardado, o null si no hay nada valido.
export function cargar() {
  const s = almacenamiento();
  if (!s) return null;
  let bruto;
  try {
    bruto = s.getItem(CLAVE);
  } catch {
    return null;
  }
  if (!bruto) return null;
  try {
    const datos = JSON.parse(bruto);
    if (!datos || typeof datos !== "object") return null;
    const aparatos = sanearAparatos(datos.aparatos);
    if (aparatos.length === 0 && !datos.params) return null;
    return { aparatos, params: sanearParametros(datos.params) };
  } catch {
    return null; // JSON corrupto: se ignora y se empieza limpio
  }
}

// Guarda el estado. Devuelve true si se escribio, false si no habia almacenamiento.
export function guardar(aparatos, params) {
  const s = almacenamiento();
  if (!s) return false;
  try {
    s.setItem(CLAVE, JSON.stringify({ version: 1, aparatos, params }));
    return true;
  } catch {
    return false; // cuota excedida o almacenamiento bloqueado
  }
}

// Borra lo guardado (boton "vaciar" de la app).
export function vaciar() {
  const s = almacenamiento();
  if (!s) return false;
  try {
    s.removeItem(CLAVE);
    return true;
  } catch {
    return false;
  }
}
