// Persistencia local (RFN-05 / Nota del Acta 004) — SolarPuesto V1.0
// Guarda la tabla de carga y los parametros configurables en localStorage.
// No hay datos personales ni servidor: todo queda en el navegador del usuario.

import { DEFAULTS } from "./formulas.js";

export const CLAVE = "solarpuesto:v1";

// Los valores por defecto de los parametros cambiaron en el Acta No. 005:
// la tension del banco paso de 12 V a 24 V (D-07), porque un panel de 450 Wp
// es nominal de 24 V y no alimenta un banco de 12 V sin convertidor.
// Un 12 V guardado pertenece a la especificacion anterior, asi que al detectar
// un estado viejo se re-siembra SOLO ese parametro. El resto de la
// configuracion del usuario y toda su tabla de carga se conservan.
export const PARAMETROS_VERSION = 2;
const RE_SIEMBRAR = { tension: DEFAULTS.tension };

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
    const params = sanearParametros(datos.params);
    if (datos.paramsVersion !== PARAMETROS_VERSION) {
      for (const [k, v] of Object.entries(RE_SIEMBRAR)) params[k] = v;
    }
    return { aparatos, params };
  } catch {
    return null; // JSON corrupto: se ignora y se empieza limpio
  }
}

// Guarda el estado. Devuelve true si se escribio, false si no habia almacenamiento.
export function guardar(aparatos, params) {
  const s = almacenamiento();
  if (!s) return false;
  try {
    s.setItem(CLAVE, JSON.stringify({ version: 1, paramsVersion: PARAMETROS_VERSION, aparatos, params }));
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
