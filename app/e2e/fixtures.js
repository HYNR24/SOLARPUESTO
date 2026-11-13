import { test as base, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const raiz = path.dirname(fileURLToPath(import.meta.url));
export const CARPETA_EVIDENCIAS = path.resolve(raiz, "..", "..", "Evidencias_Playwright");
export const CARPETA_CAPTURAS = path.join(CARPETA_EVIDENCIAS, "capturas");
fs.mkdirSync(CARPETA_CAPTURAS, { recursive: true });

const estiloBanner = [
  "position:fixed",
  "top:0",
  "left:0",
  "right:0",
  "z-index:2147483647",
  "background:#0f172a",
  "color:#f8fafc",
  "font:600 15px/1.4 system-ui,-apple-system,Segoe UI,sans-serif",
  "padding:8px 16px",
  "text-align:center",
  "letter-spacing:.2px",
  "box-shadow:0 2px 12px rgba(0,0,0,.35)",
  "pointer-events:none"
].join(";");

// Fixture automática: prepara un navegador limpio, muestra el nombre de la
// prueba sobre la app, acepta los `confirm` y guarda una captura al terminar.
export const test = base.extend({
  _demo: [
    async ({ page }, use, testInfo) => {
      await page.addInitScript(
        ({ titulo, estilo }) => {
          window.print = () => {
            window.__impresiones = (window.__impresiones || 0) + 1;
          };
          const pintar = () => {
            if (!document.body) return;
            let banner = document.getElementById("__demo_banner");
            if (!banner) {
              banner = document.createElement("div");
              banner.id = "__demo_banner";
              banner.setAttribute("data-prueba", titulo);
              banner.style.cssText = estilo;
              document.body.appendChild(banner);
            }
            banner.textContent = "▶ " + titulo;
          };
          if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", pintar);
          } else {
            pintar();
          }
        },
        { titulo: testInfo.title, estilo: estiloBanner }
      );
      page.on("dialog", (dialogo) => dialogo.accept());
      await page.goto("/");
      await use();
      const id = (testInfo.title.match(/^[A-Z]+-\d{2}/) || [
        testInfo.title.replace(/[^\w-]+/g, "_")
      ])[0];
      try {
        await page.screenshot({
          path: path.join(CARPETA_CAPTURAS, `${id}.png`),
          fullPage: true
        });
      } catch {
        // La página pudo cerrarse si la prueba falló antes de tiempo.
      }
    },
    { auto: true }
  ]
});

export { expect };

// ---------------------------------------------------------------------------
// Utilidades para escribir los casos de forma parecida a las pruebas de Vitest
// ---------------------------------------------------------------------------

export const norm = (s) => String(s).replace(/[\u00a0\u202f]/g, " ");

export const enteroDe = (texto) => {
  const digitos = norm(texto).replace(/[^\d]/g, "");
  return digitos === "" ? NaN : parseInt(digitos, 10);
};

export const irA = (page, nombre) =>
  page.getByRole("button", { name: nombre }).click();

export const irCarga = (page) => irA(page, /1\. Carga de aparatos/i);
export const irResultado = (page) => irA(page, /^2\. Resultado$/i);
export const irGuia = (page) => irA(page, /^3\. Guía de instalación$/i);
export const irPresupuesto = (page) => irA(page, /^4\. Presupuesto$/i);

export const anadir = async (page) => {
  await irCarga(page);
  await irA(page, /Añadir aparato/i);
};

export const cargarEjemplo = async (page, nombre) => {
  await irCarga(page);
  await irA(page, nombre);
};

export const calcular = (page) => irA(page, /Calcular resultado/i);

export const filasCarga = (page) => page.locator(".tabla-wrap tbody tr");
export const filasDesglose = (page) => page.locator("#desglose tbody tr");
export const filasPresupuesto = (page) =>
  page.locator(".presupuesto-tabla tbody tr");

export const llenar = async (fila, { nombre, cantidad, potencia } = {}) => {
  if (nombre !== undefined) await fila.locator("input.nombre").fill(String(nombre));
  if (cantidad !== undefined)
    await fila.locator("input.cantidad").fill(String(cantidad));
  if (potencia !== undefined)
    await fila.locator("input.potencia").fill(String(potencia));
};

export const usarUsos = async (fila, { min, usos }) => {
  await fila.locator("input.min_uso").fill(String(min));
  await fila.locator("input.usos_dia").fill(String(usos));
};

export const usarContinuo = async (fila, { horas }) => {
  await fila.locator("select.tipo").selectOption("continuo");
  await fila.locator("input.horas_dia").fill(String(horas));
};

export const usarRefri = async (fila, { horasConectado, ciclo }) => {
  await fila.locator("select.tipo").selectOption("refri");
  await fila.locator("input.horas_conn").fill(String(horasConectado));
  await fila.locator("input.ciclo").fill(String(ciclo));
};

export const usoTotal = async (fila) =>
  norm(await fila.locator(".celda-uso-total").innerText());

export const kpi = async (page, selector) =>
  norm(await page.locator(selector).innerText());

export const campoParametro = (page, etiqueta) =>
  page.locator(".parametros .campo").filter({ hasText: etiqueta }).locator("input");

export const valorParametro = (page, etiqueta) =>
  campoParametro(page, etiqueta).inputValue();

export const cambiarParametro = async (page, etiqueta, valor) => {
  await campoParametro(page, etiqueta).fill(String(valor));
};

export const guardarCaptura = async (page, nombre) => {
  await page.screenshot({
    path: path.join(CARPETA_CAPTURAS, `${nombre}.png`),
    fullPage: true
  });
};
