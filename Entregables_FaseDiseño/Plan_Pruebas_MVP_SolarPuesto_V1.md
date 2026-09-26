# Plan de Pruebas del MVP — SolarPuesto V1.0

**Asignatura:** Ingeniería de Software II (XP — TDD). **Fecha diseño:** 25/09/2026 (M2)
**Objetivo:** definir la estrategia de pruebas funcionales, de validación, de usabilidad y de rendimiento del MVP, usando los **5 casos de referencia** del Acta 002 y valores de insumo reales validados en diseño.

---

## 1. Estrategia (niveles)

| Nivel | Herramienta | Alcance |
|---|---|---|
| Pruebas unitarias (TDD) | Vitest | Módulos puros `lib/formulas.js` y `lib/validaciones.js` |
| Pruebas de componentes | React Testing Library | TablaCarga (CRUD), Resultado, Guía |
| Pruebas funcionales E2E (manual/automatizable) | Playwright (opcional) | Flujo completo: cargar → calcular → imprimir/leer |
| Pruebas de usabilidad / rendimiento | Manual + Lighthouse | Vendedor sin formación técnica; respuesta < 2 s (RFN-03) |

## 2. Casos de prueba unitaria (módulo fórmulas)

Datos de entrada tipo `Aparato` (`lib/formulas.js` → `dimensionar(aparatos, parametros)`).

| ID | Escenario | Entrada resumida | Resultado esperado |
|---|---|---|---|
| U-01 | Uso «por usos» | licuadora 550 W, c=1, min=2, usos=55 | `h=1,83` → E=550×1,83 ≈ 1008 Wh |
| U-02 | Uso «continuo» | foco LED 45 W, c=3, horas=6 | P=135 W → E=810 Wh |
| U-03 | Uso «refri» ciclo | 90 W, c=1, 12 h × 35 % | `h=4,2` → E=378 Wh |
| U-04 | Potencia por unidad + cantidad | 2 licuadoras 550 W | `P=1100 W`, `P_pico=1100 W` |
| U-05 | Paneles redondeo superior | E=1399 Wh, HSP 4,5, panel 450 Wp | `Wp=…`, `N=4` (3,11 → ceil) |
| U-06 | Batería cubre noche | E=1472 Wh, 12 V, DOD 50 %, margen 25 % | `Ah≈307` |
| U-07 | Inversor con margen | pico 1200 W | `≥1500 W` |
| U-08 | Consumo nocturno | luces `noche` 6 h + demás `dia` | `E_noche = solo luces` y `E_noche ≤ E` |
| U-09 | `horario=ambos` cuenta en nocturno | refri `ambos` | contribuye a `E_noche` |
| U-10 | Lista vacía | [] | totales 0; sin división por cero |

## 3. Casos de validación de entrada (RFN-04)

| ID | Regla | Entrada inválida | Acción |
|---|---|---|---|
| V-01 | Nombre obligatorio y único | vacío / repetido | campo rojo + aviso |
| V-02 | Cantidad ≥ 1 entero | 0, -1, 1,5 | campo rojo |
| V-03 | Potencia > 0 | 0, -5 | campo rojo |
| V-04 | min > 0 y usos ≥ 1 (usos) | min=0, usos=0 | campo rojo |
| V-05 | horas entre 0 y 24 (continuo) | 25 | campo rojo |
| V-06 | ciclo 20–60 % (refri) | 10 %, 70 % | campo rojo |
| V-07 | Uso total ≤ 24 h/día | 2 min × 800 usos | aviso + campo rojo |

## 4. Pruebas funcionales del MVP (flujos)

| ID | Flujo | Pasos | Resultado esperado |
|---|---|---|---|
| F-01 | CRUD básico | Añadir → editar → eliminar un aparato | Tabla refleja cambios; `Uso total` se recalcula al escribir |
| F-02 | Calcular del desglose | Cargar caso 🥤 → Calcular | Desglose por aparato con Wh y % del total |
| F-03 | Dimensionamiento | Cambiar parámetros → Recalcular | Wp, N paneles, Ah, inversor actualizados |
| F-04 | Imprimir/PDF | Botón Imprimir | Reporte legible (solo contenido) |
| F-05 | Refinio nocturno | Caso con luces `noche` | Muestra consumo nocturno cubierto por la batería |
| F-06 | Ejemplos editables | Cargar ejemplo → modificar valores | El cálculo se basa en lo editado |
| F-07 | Guía | Abrir pestaña Guía | 5 casos con componentes y pasos seguros |

## 5. Pruebas de referencia (5 casos del Acta 002)

| Caso | Valores clave | Verificación |
|---|---|---|
| 🥤 Puesto de jugos | licuadora 550 W, 2 min × 55; LED; datáfono; celular; radio | E≈1408 Wh/día; P≈657 W |
| 📱 Luces LED + datáfono | LED 4×10 W, tira 20 W, celular, datáfono, radio | E≈800 Wh/día; P≈245 W |
| ❄️ Refrigerador pequeño | 90 W, 12 h × 35 % | E≈558 Wh/día; P≈225 W |
| 🔀 Puesto mixto | licuadora, LED, datáfono, celular, radio | E≈1472 Wh/día; P≈665 W |
| 🍟 Puesto de fritura | fritadora 1200 W, 3 min × 40 | E≈2895 Wh/día; P≈1340 W |

**Insumos reales adicionales:** licuadora Black & Decker 550 W (120 V/60 Hz) → 917 Wh/día (2 min × 50 usos). Foco LED 45 W E27 → 270 Wh/día por foco (6 h).

## 6. Usabilidad (RFN-01) y rendimiento (RFN-03)

- **Usabilidad (manual con un vendedor real):** completar los 5 flujos sin ayuda en ≤ 10 min; lenguaje sencillo; botones grandes; responsive en celular (tabla con scroll).
- **Rendimiento:** el cálculo responde en < 2 s (en un celular de gama media). Medición con Lighthouse/Cronómetro manual.
- **Fiabilidad:** ninguna entrada válida debe producir resultados incoherentes (totales ≥ 0, `N_planos ≥ 1` si hay aparatos).

## 7. Autores y estado

- Diseño: Heyner Alberto Aldana (técnico y negocio) · Brayan Steven Rios (técnico y calidad).
- Estado: **Plan aprobado en Fase de Diseño (M2)**; ejecución en semana 10 (02–06/11/2026).