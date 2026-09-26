# RESUMEN DEL PROYECTO — SOLARPUESTO V1.0
*Guía de respaldo para revisión e interrogatorio — Ingeniería de Software II (XP)*
Este archivo resume todo lo que lleva el proyecto para responder las preguntas del docente (gestor) en la revisión.

## 1. Ficha del proyecto
| Campo | Valor |
|---|---|
| Nombre | SolarPuesto V1.0 |
| Tipo | Calculadora de potencia y material fotovoltaico para puestos de comercio informal |
| Asignatura / curso | Ingeniería de Software II — Programa de Ingeniería de Software |
| Metodología | Extreme Programming (XP) — 2 desarrolladores, TDD, programación en parejas |
| Contexto | ODS 7 (energía asequible y no contaminante); transición fotovoltaica de puestos informales |
| Inicio | Agosto 2026 (Acta No. 001 — kickoff; Gantt: W1 = 31/08–04/09) |
| Entrega final | Hito M5 — 20/11/2026 (W12) |

## 2. Equipo de trabajo y roles
| Nombre | Rol o cargo | Responsabilidad |
|---|---|---|
| Miguel Antonio Urbano | Docente (Gestor) | Aprobación de hitos (M1–M5) y revisión de entregables |
| Heyner Alberto Aldana | Programador — Enfoque Técnico y de Negocio | Arquitectura, stack, fórmulas, contexto/negocio |
| Brayan Steven Rios | Programador — Enfoque Técnico y de Calidad | Diseño de interfaz, pruebas y calidad (TDD) |
| ENCARGADO SEGUIMIENTO | Tracker | Seguimiento del proyecto |

## 3. ¿Qué es la app (alcance)?
Entrada: tabla de aparatos del puesto (nombre, cantidad, potencia real W, tipo de uso y horario) y parámetros configurables (HSP, eficiencia, margen, tensión, DOD, Wp del panel).
Salida: potencia instalada P(W), energía diaria E(Wh/día), consumo nocturno (cubre la batería), dimensionamiento de paneles, batería e inversor, desglose por aparato y garantía del dimensionamiento.
Adicional: guía de instalación y manejo seguro con 5 casos reales; resultado imprimible/exportable; responsive (móvil).

## 4. Contexto y oportunidad (ODS 7)
- En Colombia ~56% del empleo es informal (DANE); los vendedores usan conexiones ilegales peligrosas o generadores ruidosos y contaminantes.
- Pérdidas no técnicas de energía por miles de millones de pesos al año (Superservicios/XM).
- Alta radiación solar en Colombia; HSP ≈ 4–5 h/día (Atlas IDEAM).
- Oportunidad: negocio/emprendimiento de transición fotovoltaica para puestos informales; la app dimensiona la solución por uso real.

## 5. Reuniones y actas (0001–0004)
| Acta | Fecha | Tema central | Resultado |
|---|---|---|---|
| 001 | kickoff (ago 2026) | Inicio formal, roles, ciclo de vida, RF preliminares | Equipo conformado; arranca Fase 1 |
| 002 | 11/09/2026 | Revisión compromisos; aprobación RF/RFN, casos de uso, HU y alcance MVP | Hito M1 cumplido; compromisos de diseño |
| 003 | 11/09/2026 | Aprobación de la Fase 1 y autorización de la Fase de Diseño (UI/UX, fórmulas, arquitectura) | Fase 2 autorizada (tres ejes) |
| 004 | 25/09/2026 | Aprobación del hito M2 y pacto de la Fase de Desarrollo (5 compromisos W5–W9) | Fase 3 planificada |
Evidencia del cierre de diseño: informe de cumplimiento de compromisos de las actas 002 y 003 (Entregables_FaseDiseño).

## 6. Requisitos funcionales (V1.0)
| Código | Requisito | Módulo | Prioridad |
|---|---|---|---|
| RF-01 | Registrar, editar y eliminar aparatos en la tabla de carga | Tabla de entrada | Alta |
| RF-02 | Calcular la potencia instalada: P(W) = Σ (potencia × cantidad) | Cálculo | Alta |
| RF-03 | Calcular la energía diaria: E(Wh/día) = Σ (potencia × cantidad × horas) | Cálculo | Alta |
| RF-04 | Dimensionar material: paneles (HSP y eficiencia), batería (Ah a tensión, DOD) e inversor (W) con margen | Material | Alta |
| RF-05 | Aplicar parámetros configurables: Horas Pico Solar, eficiencia y margen de pérdidas | Material | Alta |
| RF-06 | Presentar el resultado en pantalla legible y formato imprimible/exportable | Reporte | Media |
| RF-07 | Mostrar instructivo de instalación y manipulación con ejemplos por caso de uso | Guía | Media |

## 7. Requisitos no funcionales (RFN)
| Código | Categoría | Requisito |
|---|---|---|
| RFN-01 | Usabilidad | Interfaz simple, en español, utilizable por un vendedor sin formación técnica |
| RFN-02 | Portabilidad | Accesible desde computador y móvil (navegador) |
| RFN-03 | Rendimiento | Cálculo con respuesta inmediata (< 2 s) |
| RFN-04 | Fiabilidad | Validación de datos de entrada (cantidad, W y horas > 0; rangos realistas) |
| RFN-05 | Seguridad | Sin datos personales; almacenamiento local (localStorage) |
| RFN-06 | Mantenibilidad | Código modular y documentado bajo XP/TDD |

## 8. Historias de usuario (XP) — alcance del MVP
| HU | Historia |
|---|---|
| HU-01 | Como vendedor quiero registrar los aparatos de mi puesto para calcular cuánta energía necesito. |
| HU-02 | Como vendedor quiero que el sistema calcule automáticamente la potencia total y la energía diaria. |
| HU-03 | Como vendedor quiero que el sistema me sugiera cuántos paneles, baterías y qué inversor comprar. |
| HU-04 | Como vendedor quiero ver el resultado de forma clara e imprimible. |
| HU-05 | Como vendedor quiero leer una guía sencilla de instalación y manejo seguro. |

## 9. Fórmulas de cálculo
**Potencia instalada: P(W) = Σ (potencia × cantidad)**
**Energía diaria: E(Wh/día) = Σ (potencia × cantidad × h_real)**
Uso real por tipo (horas/día): usos = (min × usos × cantidad)/60 · continuo = horas encendido · refrigeración = h_conectado × (ciclo %/100).
Horario día/noche/ambos: el consumo nocturno (noche + ambos) queda cubierto por la batería y los paneles lo recargan en las HSP.
**Paneles: Wp = (E/HSP) × (1/eficiencia) × (1 + margen); N = redondeo superior de Wp / Wp_panel.**
**Batería: Ah = E × (1 + margen) / (tensión × DOD).**
**Inversor: W ≥ potencia pico × 1,25 (margen de arranque).**
Parámetros por defecto (configurables): HSP 4,5 h (Neiva; rango Colombia 4–5), eficiencia 0,8, margen 25 %, 12 V, DOD 50 %, panel 450 Wp, ciclo refrigeración 35 % (20–60 %).

## 10. Casos de uso de referencia (5)
- Puesto de jugos (licuadora).
- Iluminación LED + celular/datáfono.
- Alimentos con refrigerador pequeño.
- Puesto mixto: licuadora + luces + datáfono.
- Puesto de fritura (elemento de calor + ventilador).

## 11. Stack y arquitectura
- React 18 + Vite 5 (JavaScript, ESModules); SPA liviana y móvil-friendly.
- Pruebas: Vitest + React Testing Library + jsdom (TDD).
- Persistencia: localStorage (RFN-05), sin datos personales.
- Módulos puros de cálculo en src/lib (formulas.js, casos.js) 100 % testables; interfaz en src/App.jsx.
- Tema visual profesional (azul marino + ámbar solar), responsive; tabla con scroll en móvil.

## 12. Entregables y dónde está cada cosa
| Ruta | Contenido |
|---|---|
| ACTA 1/, ACTA 2/, ACTA3/ | Actas de reunión 001–003; mockup/prototipo (ACTA3/Mockup_SolarPuesto_V1.0.html) |
| ACTA 4/ | Acta 004 — inicio Fase de Desarrollo (plan, compromisos W5–W9) |
| Entregables_FaseDiseño/ | Modelado matemático, arquitectura/stack, plan de pruebas, matriz de cumplimiento, informe de cumplimiento (docx) |
| app/ | Aplicación React + Vite (fuente) + app.zip (ZIP limpio para entregar) |
| SolarPuesto_Desarrollo_Gantt.xlsx | Cronograma Gantt por semanas con hitos M1–M5 y hoja de requisitos |
| README.md / CONTEXTO_PROYECTO.md | Guía del proyecto y contexto |

## 13. Plan de pruebas (MVP)
- Documento: Entregables_FaseDiseño/Plan_Pruebas_MVP_SolarPuesto_V1.md (casos U-01…U-10, límites y errores).
- Ejecutadas: 19 pruebas TDD en verde sobre el módulo de cálculo (fórmulas), incl. casos de referencia y consumo nocturno.
- Pendientes para M4 (W10–W11): pruebas de componentes/interfaz (RTL), usabilidad, manual de uso.

## 14. Cronograma, fases e hitos (Gantt)
| Hito | Fecha | Entregable |
|---|---|---|
| M1 | 11/09/2026 (W2) | Requisitos aprobados |
| M2 | 25/09/2026 (W4) | Diseño aprobado (UI, fórmula, stack) |
| M3 | 30/10/2026 (W9) | MVP funcional (cálculo de potencia y material) |
| M4 | 13/11/2026 (W11) | Pruebas superadas y correcciones |
| M5 | 20/11/2026 (W12) | Entrega final + manual + demo |
Fases: Requisitos (W1–W2), Diseño (W3–W4), Desarrollo (W5–W9), Pruebas (W10–W11), Entrega (W12).

## 15. Estado real actual de la aplicación
La aplicación ya implementa (al día de la fecha):
- CRUD de aparatos con edición directa, tipos de uso (usos/continuo/refrigeración) y horario (día/noche/ambos).
- Cálculo en vivo de KPIs (potencia W, energía Wh/día y consumo nocturno) y desglose por aparato.
- Parámetros configurables y dimensionamiento de paneles, batería e inversor con garantía.
- Guía de instalación con los 5 casos reales; resultado imprimible; diseño responsive profesional.
- 19 pruebas TDD en verde y build de producción OK.
**Pendientes hacia M3/M4: suite de pruebas de componentes/interfaz, validaciones finas, usabilidad y manual de uso.**

## 16. Posibles preguntas del ingeniero con respuestas cortas
| Pregunta | Respuesta |
|---|---|
| ¿Por qué Extreme Programming (XP)? | Equipo pequeño (2 devs) que cubre todo el ciclo; iteraciones cortas, TDD y programación en parejas; revisión presencial los viernes. |
| ¿Por qué React + Vite? | SPA liviana, funciona en móvil, ecosistema de pruebas (Vitest + RTL + jsdom) ideal para TDD y rápida de iterar el MVP. |
| ¿Por qué HSP = 4,5? | Promedio de la zona (Neiva, Huila); Colombia tiene ~4–5 h de sol pico/día según el Atlas IDEAM. Es configurable. |
| ¿Cómo se dimensiona la batería? | Ah = (E × (1 + margen)) / (tensión × DOD); cubre todo el consumo diario, incluido el nocturno. |
| ¿Qué pasa con el consumo nocturno? | Cada aparato se clasifica por horario; la suma noche+ambos la cubre la batería y los paneles la recargan en las HSP. |
| ¿Qué validaciones tiene la entrada? | Nombre obligatorio y único; cantidad entera ≥ 1; potencia > 0; horas 0–24; ciclo refrigeración 20–60 %. |
| ¿Cómo se guardan los datos? | localStorage del navegador, sin datos personales (RFN-05). |
| ¿Cómo se garantiza la calidad? | TDD con 19 pruebas en verde sobre el cálculo; plan de pruebas del MVP para la fase de pruebas (M4). |
Para abrir la app: npm install → npm run dev → http://localhost:5173 (en la carpeta app).
Documento de respaldo generado el 25/09/2026. Proyecto: SolarPuesto V1.0 — Ingeniería de Software II (XP).
