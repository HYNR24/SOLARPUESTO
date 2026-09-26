# SolarPuesto V1.0 — Contexto del Proyecto

**Proyecto:** SolarPuesto V1.0 — Calculadora de potencia y material para puestos de comercio informal
**Asignatura:** Ingeniería de Software II
**Responsable:** Heyner Aldana Herrera
**Fecha de inicio:** 28/08/2026
**Fecha límite:** 20/11/2026

---

## 1. Contenido del proyecto

- App calculadora de potencia para puestos de comercio informal.
- **Entrada:** tabla de aparatos (nombre, cantidad, potencia nominal en W, horas de uso/día).
- **Salida:** potencia total (W), energía diaria (Wh/día) y dimensionamiento de un sistema autónomo solar (paneles, batería, inversor).
- Incluye guía de instalación y manipulación de los componentes con ejemplos (p. ej. licuadora, lámparas, refrigerador pequeño).

## 2. Contexto (ODS 7)

- Los vendedores ambulantes dependen de conexiones eléctricas ilegales/peligrosas o generadores ruidosos y contaminantes para refrigerar alimentos, iluminar puestos y cobrar con datáfonos.
- Colombia: ~56 % de empleo informal (DANE); pérdidas no técnicas de energía por miles de millones de pesos al año (Superservicios/XM); alta radiación solar (Atlas IDEAM).

## 3. Acta de reunión (kickoff)

- **Tema a tratar:** Inicio formal del proyecto SolarPuesto Versión 1.0.
- **Objetivo:** Dar inicio formal al proyecto y establecer las bases del ciclo de vida del software que regirá su desarrollo.
- **Desarrollo (resumen):**
  1. Se conforma el grupo de trabajo del proyecto SolarPuesto V1.0.
  2. Presentación de los integrantes.
  3. Definición de roles de los participantes.
  4. Definición del plan de trabajo y seguimiento.
  5. Alcance inicial: app con tabla de aparatos que calcula potencia total (W) y energía diaria (Wh) a cubrir con sistema autónomo solar (panel, batería, inversor).
  6. Ciclo de vida del software: análisis → diseño → desarrollo → pruebas → despliegue, con revisión por fase.
  7. Inicio de la fase 1 (análisis y levantamiento de requisitos); entregable: documento de especificación de requisitos.
  8. Requisitos funcionales preliminares V1.0 (ver sección 4).
  9. Cronograma preliminar y metodología de seguimiento.
  10. Compromisos del equipo (ver sección 6).
  11. Registro y seguimiento de compromisos (tabla).
  12. Próxima reunión: revisión de compromisos y aprobación de requisitos.
- **Conclusión:** Se definen los integrantes del proyecto, se conforma el grupo de trabajo y se asignan roles. Se da inicio formal al proyecto bajo el ciclo de vida del software, comenzando con el levantamiento de requisitos.
- **Observaciones:** No existe observaciones en la reunión.
- **Nota:** Las especificaciones y funciones de cada rol se explican de manera detallada en el acta de definición de roles adjunta en la carpeta del proyecto.

## 4. Requisitos funcionales (V1.0)

| Código | Requisito | Módulo | Prioridad |
|---|---|---|---|
| RF-01 | Registrar, editar y eliminar aparatos en la tabla de carga. | Tabla de entrada | Alta |
| RF-02 | Calcular la potencia instalada: P(W) = Σ (potencia × cantidad). | Cálculo | Alta |
| RF-03 | Calcular la energía diaria: E(Wh/día) = Σ (potencia × cantidad × horas). | Cálculo | Alta |
| RF-04 | Dimensionar material: paneles (HSP y eficiencia), batería (Ah a tensión, profundidad de descarga) e inversor (W) con margen. | Material | Alta |
| RF-05 | Aplicar parámetros configurables: horas pico solar, eficiencia y margen de pérdidas. | Material | Alta |
| RF-06 | Presentar el resultado en pantalla legible y formato imprimible/exportable. | Reporte | Media |
| RF-07 | Mostrar instructivo de instalación y manipulación con ejemplos por caso de uso. | Guía | Media |

## 5. Modelo de trabajo

- Metodología ágil **Extreme Programming (XP)**.
- Equipo: **2 desarrolladores** que asumen todo el ciclo (análisis, diseño, codificación, pruebas, despliegue).
- Programación en parejas y desarrollo guiado por pruebas (TDD).
- **Presencial:** viernes, 2 horas de jornada.
- **Home Office:** 8 horas adicionales por semana, según comodidad del equipo.
- Revisión de avance de iteración XP en cada jornada presencial de viernes.

## 6. Compromisos del equipo

| No. | Compromiso | Responsable | Fecha entrega | Estado |
|---|---|---|---|---|
| 1 | Liderar el proyecto, convocar sesiones y controlar el cronograma | | | Pendiente |
| 2 | Documento de especificación de requisitos (funcionales y no funcionales) | | | Pendiente |
| 3 | Contexto del problema y 5 casos de uso de referencia | | | Pendiente |
| 4 | Estructura de la tabla de entrada (aparato, cantidad, W, horas/día) | | | Pendiente |
| 5 | Fórmulas de cálculo de potencia total (W) y energía diaria (Wh) | | | Pendiente |
| 6 | Diseño preliminar de la interfaz (ingreso y resultados) | | | Pendiente |

## 7. Cronograma e hitos (31/08 – 20/11/2026)

| Hito | Fecha | Entregable |
|---|---|---|
| M1 | 11/09/2026 | Requisitos aprobados |
| M2 | 25/09/2026 | Diseño aprobado (arquitectura, interfaz, fórmula) |
| M3 | 30/10/2026 | MVP funcional (cálculo de potencia y material) |
| M4 | 13/11/2026 | Pruebas superadas y correcciones |
| M5 | 20/11/2026 | Entrega final + manual + demo |

| Semana | Fechas | Fase | Actividades | Entregable |
|---|---|---|---|---|
| 1 | 31/08–04/09 | Requisitos | Levantamiento de requisitos; contexto; casos de uso | Borrador de requisitos |
| 2 | 07/09–11/09 | Requisitos | Historias de usuario XP; validación y aprobación | Documento de requisitos (M1) |
| 3 | 14/09–18/09 | Diseño | Arquitectura, base de datos, bocetos | Esquema de diseño |
| 4 | 21/09–25/09 | Diseño | UI final; fórmula (W, Wh/día, HSP, eficiencia, margen); stack | Diseño aprobado (M2) |
| 5 | 28/09–02/10 | Desarrollo | Entorno/repositorio; tabla de entrada CRUD | Entorno + tabla |
| 6 | 05/10–09/10 | Desarrollo | Módulo de cálculo de potencia (W) y energía (Wh) | Cálculo de potencia |
| 7 | 12/10–16/10 | Desarrollo | Módulo de dimensionamiento de material | Cálculo de material |
| 8 | 19/10–23/10 | Desarrollo | Módulo de guía de instalación y manipulación | Guía integrada |
| 9 | 26/10–30/10 | Desarrollo | Integración de módulos; validaciones | MVP funcional (M3) |
| 10 | 02/11–06/11 | Pruebas | Pruebas funcionales con casos de referencia | Reporte de pruebas |
| 11 | 09/11–13/11 | Pruebas | Usabilidad; ajustes; manual de uso | Pruebas superadas (M4) |
| 12 | 16/11–20/11 | Entrega | Documentación final, demo, cierre | Entrega final (M5) |

## 8. Agenda para futura reunión

1. Debatir funcionalidades esenciales del aplicativo.
2. Definir la estructura de la tabla de entrada de aparatos (nombre, cantidad, W, horas/día).
3. Validar las fórmulas de cálculo de potencia total (W) y energía diaria (Wh).
4. Revisar y confirmar los casos de uso de referencia (licuadora, lámparas, refrigerador).
5. Definir el alcance del MVP y las historias de usuario iniciales.
6. Asignar compromisos y responsables para la fase de diseño.

## 9. Bases técnicas del cálculo (a validar en diseño)

- Potencia instalada: `P(W) = Σ (potencia nominal × cantidad)`
- Energía diaria: `E(Wh/día) = Σ (potencia × cantidad × horas/día)`
- Horas pico solar (HSP): ~4–5 h/día en Colombia (según Atlas IDEAM).
- Sistema autónomo: panel fotovoltaico (Wp), batería (Ah @ tensión, profundidad de descarga ~50 %), inversor (W ≥ potencia pico + arranque) e índices de eficiencia y margen de seguridad.

## 10. Archivos generados

- `SolarPuesto_Desarrollo_Gantt.xlsx` (Escritorio) — Gantt por semanas con colores, resumen e hitos, y hoja de requisitos.

## 11. Próximos pasos / pendientes

- [ ] Validar hitos M1 y M2 en la próxima reunión.
- [ ] Aprobar el documento de especificación de requisitos.
- [ ] Definir casos de uso de referencia (5 mínimo).
- [ ] Definir fórmula de dimensionamiento final del sistema solar.
- [ ] Definir el stack tecnológico.