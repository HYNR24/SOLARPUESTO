# Matriz de Cumplimiento — Acta de Reunión No. 004

**Proyecto:** SolarPuesto V1.0 — Calculadora de potencia y material para puestos de comercio informal
**Asignatura:** Ingeniería de Software II — Metodología Extreme Programming (XP)
**Acta que origina los compromisos:** Reunión No. 004 del **25/09/2026** — *Inicio de la Fase de Desarrollo (Fase 3)*
**Objetivo de este documento:** dejar con evidencia el estado de los **cinco compromisos de la Fase 3** pactados en el Acta 004, para sustentar el **hito M3** (MVP funcional, 30/10/2026).

---

## 1. Participants y roles (contexto de la firma del acta)

| Nombre completo | Rol |
|---|---|
| Miguel Antonio Urbano Silva | Docente (Gestor) |
| Heyner Alberto Aldana | Programador — Enfoque Técnico y de Negocio |
| Brayan Steven Rios | Programador — Enfoque Técnico y de Calidad |

## 2. Estado de los compromisos de la Fase 3

| No. | Compromiso (Fase 3) | Responsable | Fecha pactada | **Estado** | Prueba de aceptación pactada |
|---|---|---|---|---|---|
| 1 | Configuración del entorno y tabla de entrada CRUD de aparatos en React (RF-01) | Brayan Steven Rios | 09/10/2026 | ✅ **Cumplido** | Poder registrar, editar y eliminar aparatos en la tabla (Sprint 1) |
| 2 | Módulo de cálculo de potencia total P(W) y energía diaria E(Wh/día) (RF-02, RF-03) | Heyner Alberto Aldana | 16/10/2026 | ✅ **Cumplido con reserva** | KPIs de potencia y energía calculados con el uso real de cada aparato (Sprint 2) |
| 3 | Módulo de dimensionamiento de material: paneles (HSP y eficiencia), batería (Ah, tensión, DOD) e inversor con margen; parámetros configurables (RF-04, RF-05) | Ambos | 23/10/2026 | ✅ **Cumplido** | Sugerencia de paneles, batería e inversor y consumo nocturno según horario (Sprint 3) |
| 4 | Módulo de guía de instalación y manipulación con ejemplos por caso de uso (RF-07) | Brayan Steven Rios | 30/10/2026 | ✅ **Cumplido** | Guía accesible con los casos de referencia de la tabla de entrada (Sprint 4) |
| 5 | Integración de módulos, validación de entradas y mensajes de error; resultado imprimible (RF-06) y pruebas TDD en verde | Ambos | 30/10/2026 | ✅ **Cumplido** | Aplicación integrada, validaciones y suite de pruebas TDD aprobada (**✅ M3**) |

## 3. Evidencia de cada compromiso

| No. | Evidencia técnica (archivo y línea) | Evidencia de prueba |
|---|---|---|
| 1 | Entorno: `app/package.json`, `app/vite.config.js`. CRUD: `app/src/App.jsx:108` (añadir), `:110-113` (eliminar con confirmación), `:105-106` (editar en vivo), `:115-118` (cargar los 5 casos de referencia) | Smoke test manual documentado en el plan de captura (flujo F-01) |
| 2 | `app/src/lib/formulas.js:16-22` (uso real por tipo), `:32-38` (P y E), `:39` (pico). Presentación: `app/src/App.jsx` KPIs y desglose por aparato | `app/tests/formulas.test.js` — U-01, U-02, U-03, U-04, U-08, U-09 |
| 3 | `app/src/lib/formulas.js:45-47` (paneles con HSP y eficiencia), `:50` (batería Ah con tensión y DOD), `:53` (inversor con margen 25 %), `:41-43` (consumo nocturno por horario). Parámetros: `app/src/App.jsx` sección «⚙️ Parámetros configurables». **Persistencia local (Nota del acta):** `app/src/lib/almacen.js` + autoguardado en `App.jsx` | `formulas.test.js` — U-05, U-06, U-07, U-08 · `app/tests/almacen.test.js` — 12 pruebas de persistencia |
| 4 | `app/src/App.jsx` — constante `GUIA` con los 5 casos (componentes, equipos, pasos y advertencias de seguridad) y su render en la pestaña 3 | Los 5 casos provienen de `app/src/lib/casos.js` (Acta 002) |
| 5 | **Validaciones:** `app/src/lib/validaciones.js` (reglas V-01 a V-07) + errores por campo en `app/src/App.jsx` (componente `FilaClave`) + resumen de errores arriba de la tabla. **Imprimible:** botón «🖨️ Imprimir / PDF» y regla `@media print` en `app/src/styles.css`. **Integración:** las tres pestañas conectadas al mismo estado | `app/tests/validaciones.test.js` — 26 pruebas (V-01…V-07) · `app/tests/formulas.test.js` — 19 pruebas · `app/tests/almacen.test.js` — 12 pruebas · **Total: 57 pruebas en verde** con `npm test` |

## 4. Cobertura de requisitos funcionales

| Requisito | Descripción | Estado | Dónde se cumple |
|---|---|---|---|
| RF-01 | Registrar, editar y eliminar aparatos | ✅ | `App.jsx` — tabla de carga (CRUD) |
| RF-02 | Calcular la potencia instalada P(W) | ✅ | `formulas.js` + KPI «Potencia instalada (W)» |
| RF-03 | Calcular la energía diaria E(Wh/día) | ✅ | `formulas.js` + KPI «Energía diaria (Wh/día)» + desglose |
| RF-04 | Dimensionar material (paneles, batería, inversor) | ✅ | `formulas.js` + sección «🔥 Dimensionamiento del sistema solar» |
| RF-05 | Parámetros configurables (HSP, eficiencia, margen) | ✅ | Sección «⚙️ Parámetros configurables» + persistencia local |
| RF-06 | Resultado legible e imprimible/exportable | ✅ | Botón de impresión + `@media print` |
| RF-07 | Instructivo de instalación y manipulación | ✅ | Pestaña «3. Guía de instalación» con 5 casos |

## 5. Riesgos abiertos y decisiones tomadas

### 5.1 Duplicación de la energía cuando hay 2 o más unidades del mismo tipo «Por usos» — **ABIERTO, NO CORREGIDO**

- **Dónde:** `app/src/lib/formulas.js:18`. `horasDeUso()` multiplica por `cantidad`, y `dimensionar()` (`:32-33`) ya multiplica la potencia por `cantidad`. El resultado es una doble multiplicación.
- **Efecto:** 2 licuadoras de 550 W, 2 min × 55 usos reportan **4 033 Wh/día** cuando el valor físicamente correcto es **2 017 Wh/día**.
- **Alcance real:** solo afecta a filas con `cantidad ≥ 2` **y** `tipo = "usos"`. Los tipos `continuo` y `refri` no duplican (sus horas no multiplican por cantidad). Los 5 casos de referencia usan `cantidad = 1`, por eso sus valores coinciden con la tabla del Modelado Matemático.
- **Prueba que lo fija:** `app/tests/formulas.test.js` — caso «U-04: la cantidad multiplica en uso por usos», que hoy espera el valor duplicado.
- **Decisión del equipo:** **se deja tal cual y se documenta.** No se modifica en esta entrega para no alterar los valores ya validados con los 5 casos de referencia del Acta 002.
- **Recomendación para la Fase 4 (pruebas):** escoger una de las dos semánticas — (a) `horasDeUso` deja de multiplicar por cantidad y las horas mostradas son **por unidad**; o (b) los tres tipos multiplican por cantidad y la energía pasa a ser `potencia × horas` — y actualizar la prueba U-04 en la misma pareja de programación.

### 5.2 Código muerto eliminado

La función `sanitizar()` de `App.jsx` no era llamada por ningún componente y duplicaba el trabajo de `formulas.js`. Se eliminó al integrar `validaciones.js`, que normaliza y valida los mismos campos.

### 5.3 Pendientes de la Fase 4 (fuera del Acta 004)

- Refactor de `App.jsx` a la estructura de componentes de `Entregables_FaseDiseño/Arquitectura_y_Stack_SolarPuesto_V1.md` §5 (`src/components/`).
- Pruebas de componentes con React Testing Library para los flujos F-01 a F-07 del plan de pruebas.
- Decidir y corregir el riesgo 5.1.

---

## 6. Conclusión

Los **cinco compromisos de la Fase 3 pactados en el Acta 004 se encuentran cumplidos** y verificados contra el código y la suite de pruebas (57 pruebas en verde). Se declara el **hito M3 — MVP funcional** alcanzado, con un riesgo técnico documentado (5.1) que se traslada a la agenda de la Fase 4 (Pruebas).

**Siguiente paso pactado en el acta:** validar el hito M3 en la semana 9 e iniciar la Fase de Pruebas (semana 10, 02–06/11/2026).

---

*Documento generado como evidencia de la Fase de Desarrollo. Complementa `Entregables_FaseDiseño/Matriz_Cumplimiento_Actas_2_y_3.md` (fases anteriores).*
