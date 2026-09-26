# Matriz de Cumplimiento — Actas de Reunión No. 002 y No. 003

**Proyecto:** SolarPuesto V1.0 — Calculadora de potencia y material para puestos de comercio informal
**Asignatura:** Ingeniería de Software II — Metodología Extreme Programming (XP)
**Objetivo de este documento:** dejar con evidencia el estado de cumplimiento de los compromisos de los compromisos del Acta 002 y los ejes de entrega de la Fase de Diseño autorizada en el Acta 003, para la aprobación del hito M2 (diseño aprobado).

---

## 1. Compromisos del Acta 002 (Reunión 11/09/2026)

| No. | Compromiso | Responsable | Fecha entrega | Estado | Evidencia |
|---|---|---|---|---|---|
| 1 | Definir arquitectura y stack tecnológico | Heyner Alberto Aldana | 18/09/2026 | ✅ Cumplido | `Entregables_FaseDiseño/Arquitectura_y_Stack_SolarPuesto_V1.md` |
| 2 | Bocetos de interfaz (ingreso y resultados) | Brayan Steven Rios | 18/09/2026 | ✅ Cumplido | `ACTA3/Mockup_SolarPuesto_V1.0.html` (CRUD, resultado, guía) |
| 3 | Definir la fórmula final de dimensionamiento y parámetros configurables | Ambos | 25/09/2026 | ✅ Cumplido | `Entregables_FaseDiseño/Modelado_Matematico_SolarPuesto_V1.md` |
| 4 | Crear repositorio y entorno de desarrollo | Heyner Alberto Aldana | 25/09/2026 | ✅ Cumplido | Repositorio Git en `SolarPuesto/` + esqueleto Vite/React + `tests/` (TDD) |
| 5 | Elaborar el plan de pruebas del MVP | Brayan Steven Rios | 25/09/2026 | ✅ Cumplido | `Entregables_FaseDiseño/Plan_Pruebas_MVP_SolarPuesto_V1.md` |

## 2. Ejes de entrega de la Fase De Diseño (Acta 003 — autorización del 11/09/2026)

| Eje | Entregable pactado | Estado | Evidencia |
|---|---|---|---|
| 1. Diseño de Interfaces (UI/UX) | Bocetos/wireframes: pantalla CRUD de aparatos, pantalla de resultados/reporte, módulo de guía con ejemplos | ✅ Cumplido | `ACTA3/Mockup_SolarPuesto_V1.0.html` — 3 pantallas funcionales, responsive (tabla con scroll en móvil) |
| 2. Modelado Matemático de Fórmulas | P(W), E(Wh/día), dimensionamiento de paneles (HSP y eficiencia), banco de baterías (Ah, tensión, DOD), inversor con margen | ✅ Cumplido | `Entregables_FaseDiseño/Modelado_Matematico_SolarPuesto_V1.md` + implementación en mockup y `src/lib/formulas.js` |
| 3. Arquitectura y Stack Tecnológico | Patrón arquitectónico, modelo de persistencia para parámetros configurables, entorno para TDD | ✅ Cumplido | `Entregables_FaseDiseño/Arquitectura_y_Stack_SolarPuesto_V1.md` + esqueleto del entorno |

## 3. Historia de usuario XP (alcance MVP) — cobertura

| HU | Descripción | Cobertura en la Fase de Diseño |
|---|---|---|
| HU-01 | Registrar los aparatos del puesto (tabla de carga) | Mockup pantalla 1 (CRUD con tipos de uso y horario) |
| HU-02 | Cálculo automático de potencia total y energía diaria | Mockup pantalla 2 (KPIs y desglose por aparato) |
| HU-03 | Sugerir paneles, baterías e inversor | Mockup pantalla 2 (dimensionamiento con garantía) |
| HU-04 | Resultado claro e imprimible | Mockup pantalla 2 (botón Imprimir/PDF) |
| HU-05 | Guía sencilla de instalación y manejo seguro | Mockup pantalla 3 (5 casos de uso de referencia) |

## 4. Pendientes de desarrollo (fuera del alcance de diseño — Sprints Fase 3)

- Migrar el prototipo HTML a la aplicación React + Vite (proceso iniciado con el entorno y los módulos de cálculo).
- Completar componentes de la interfaz, validaciones y usabilidad.
- Ejecutar el plan de pruebas del MVP (semana 10).
- Despliegue y entrega final (M5, 20/11/2026).

---

*Documento generado como evidencia para la revisión del hito M2 (25/09/2026).*