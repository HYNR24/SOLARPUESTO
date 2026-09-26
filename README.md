# SolarPuesto V1.0

Calculadora de potencia y material para puestos de comercio informal (transición fotovoltaica).

## Estructura
- `ACTA 1/`, `ACTA 2/`, `ACTA 3/`, `ACTA 4/` — actas de reunión y prototipo de diseño (mockup HTML).
- `Entregables_FaseDiseño/` — documentación de la fase de diseño (modelado matemático, arquitectura/stack, plan de pruebas, matriz de cumplimiento de las Actas 002 y 003).
- `Entregables_FaseDesarrollo/` — documentación de la fase de desarrollo (**Acta 004**): matriz de cumplimiento de los 5 compromisos, plan de captura de evidencias e informe en Word.
- `app/` — aplicación **React + Vite** (SPA) con módulos de cálculo puros y tests (Vitest).

## Fases (cronograma)
F1 Requisitos ✅ (M1) · F2 Diseño ✅ (M2) · **F3 Desarrollo ✅ (M3)** · F4 Pruebas (M4) · F5 Entrega (M5, 20/11/2026)

## Comandos del entorno
```bash
cd app
npm install
npm run dev      # entorno de desarrollo -> http://localhost:5173
npm test         # pruebas (Vitest) — 57 pruebas
npm run build    # build de producción
```

## Stack (diseño M2)
React + Vite · JavaScript (ESModules) · Vitest + React Testing Library · localStorage · Tema solar responsive (tabla con scroll en móvil).

## Módulos de la app (`app/src/lib/`)
| Archivo | Responsabilidad |
|---|---|
| `formulas.js` | Cálculo puro: uso real por tipo de aparato, P(W), E(Wh/día), paneles, batería, inversor, consumo nocturno. |
| `validaciones.js` | Reglas de entrada V-01…V-07 (RFN-04), puras y testeables. |
| `almacen.js` | Persistencia en `localStorage` de la tabla de carga y los parámetros (RFN-05), con tolerancia a datos corruptos. |
| `casos.js` | Los 5 casos de referencia del Acta 002. |

## Pruebas (`app/tests/`)
`formulas.test.js` (19) · `validaciones.test.js` (26) · `almacen.test.js` (12) → **57 pruebas en verde**.

## Riesgo técnico abierto
Con 2 o más unidades del tipo *Por usos* la energía diaria se duplica (`formulas.js:18`). Está documentado y **no corregido por decisión del equipo**; se traslada a la Fase 4. Ver `Entregables_FaseDesarrollo/Matriz_Cumplimiento_Acta_004.md` §5.1.
