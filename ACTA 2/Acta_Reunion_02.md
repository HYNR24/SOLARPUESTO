# PROGRAMA DE INGENIERÍA DE SOFTWARE
# CURSO DE INGENIERÍA DE SOFTWARE II
# PROYECTO SOLARPUESTO V1.0

## ACTA DE REUNIÓN NO. 002

**Fecha:** Viernes, 11 de septiembre de 2026.
**Hora:** 14:00 h a 16:00 h — Jornada presencial.

**Participantes:**

| Nombre Completo | Rol o Cargo |
|---|---|
| Miguel Antonio Urbano | Docente (Gestor) |
| Heyner Alberto Aldana | Programador — Enfoque Técnico y de Negocio |
| Brayan Steven Rios | Programador — Enfoque Técnico y de Calidad |

---

## Tema para tratar:
Revisión de los compromisos asumidos en la reunión No. 001 y aprobación de los requisitos funcionales y no funcionales de SolarPuesto V1.0 (hito M1).

## Objetivos de la reunión:
1. Verificar el cumplimiento de los compromisos del acta No. 001.
2. Aprobar los requisitos funcionales (RF-01 a RF-07) y no funcionales (RFN) de la versión 1.0.
3. Validar la estructura de la tabla de entrada de aparatos y las fórmulas de cálculo de potencia y energía.
4. Confirmar los casos de uso de referencia.
5. Definir el alcance del MVP y las historias de usuario iniciales bajo XP.
6. Asignar compromisos y responsables para la fase de diseño.

## Desarrollo:

1. **Revisión del cumplimiento de compromisos (acta No. 001).** Cada integrante presenta su entregable y se valida en grupo:

| No. | Compromiso | Responsable | Evidencia presentada | Verificación |
|---|---|---|---|---|
| 1 | Liderar el proyecto, convocar sesiones y controlar el cronograma | Heyner Alberto Aldana | Cronograma y Gantt por semanas actualizado | Cumplido |
| 2 | Documento de especificación de requisitos (funcionales y no funcionales) | Ambos | Documento de requisitos V1.0 | Cumplido |
| 3 | Contexto del problema y 5 casos de uso de referencia | Heyner Alberto Aldana | Contexto, ODS 7 y casos de uso | Cumplido |
| 4 | Estructura de la tabla de entrada (aparato, cantidad, W, horas/día) | Brayan Steven Rios | Estructura de la tabla con validaciones | Cumplido |
| 5 | Fórmulas de cálculo de potencia total (W) y energía diaria (Wh) | Ambos | Fórmulas documentadas y validadas | Cumplido |
| 6 | Diseño preliminar de la interfaz (ingreso y resultados) | Brayan Steven Rios | Bocetos de pantallas (ingreso y resultados) | Cumplido |

2. **Aprobación de requisitos funcionales.**

| Código | Requisito | Módulo | Prioridad |
|---|---|---|---|
| RF-01 | Registrar, editar y eliminar aparatos en la tabla de carga | Tabla de entrada | Alta |
| RF-02 | Calcular la potencia instalada: P(W) = Σ (potencia × cantidad) | Cálculo | Alta |
| RF-03 | Calcular la energía diaria: E(Wh/día) = Σ (potencia × cantidad × horas) | Cálculo | Alta |
| RF-04 | Dimensionar material: paneles (HSP y eficiencia), batería (Ah a tensión, profundidad de descarga) e inversor (W) con margen | Material | Alta |
| RF-05 | Aplicar parámetros configurables: horas pico solar, eficiencia y margen de pérdidas | Material | Alta |
| RF-06 | Presentar el resultado en pantalla legible y formato imprimible/exportable | Reporte | Media |
| RF-07 | Mostrar instructivo de instalación y manipulación con ejemplos por caso de uso | Guía | Media |

3. **Aprobación de requisitos no funcionales (RFN).**

| Código | Categoría | Requisito |
|---|---|---|
| RFN-01 | Usabilidad | Interfaz simple, en español, utilizable por un vendedor sin formación técnica |
| RFN-02 | Portabilidad | Accesible desde computador y dispositivo móvil (navegador) |
| RFN-03 | Rendimiento | Cálculo con respuesta inmediata (< 2 s) |
| RFN-04 | Fiabilidad | Validación de datos de entrada (cantidad, W y horas > 0; potencias dentro de rango realista) |
| RFN-05 | Seguridad | Sin datos personales; almacenamiento local de la tabla de aparatos |
| RFN-06 | Mantenibilidad | Código modular y documentado bajo XP/TDD |

4. **Aprobación de la estructura de la tabla de entrada.**

| Campo | Tipo | Validación |
|---|---|---|
| Aparato | Texto | Obligatorio, nombre único |
| Cantidad | Número entero | ≥ 1 |
| Potencia nominal (W) | Número decimal | > 0 |
| Horas de uso/día | Número decimal | 0 < h ≤ 24 |

5. **Validación de fórmulas de cálculo.**
   - Potencia instalada: `P(W) = Σ (potencia nominal × cantidad)`
   - Energía diaria: `E(Wh/día) = Σ (potencia × cantidad × horas/día)`
   - Dimensionamiento de referencia (a afinar en diseño — M2):
     - Paneles: `Wp = (E / HSP) × (1/eficiencia) × (1 + margen)`
     - Batería: `Ah = (E × (1 + margen)) / (tensión × DOD)`, con DOD ≈ 50 %
     - Inversor: `W ≥ energía pico total × 1.25 (margen de arranque)`
   - Rango de horas pico solar (HSP) confirmado: 4–5 h/día (Atlas IDEAM).

6. **Casos de uso de referencia (5 confirmados).**
   1. Puesto de jugos con licuadora.
   2. Puesto con iluminación LED y celular/datáfono.
   3. Puesto de alimentos con refrigerador pequeño.
   4. Puesto mixto: licuadora + lámparas + datáfono.
   5. Puesto de fritura con elemento de calentamiento y ventilador.

7. **Alcance del MVP e historias de usuario iniciales (XP).**
   - **MVP:** tabla de carga (CRUD), cálculo de potencia (W) y energía diaria (Wh/día), y dimensionamiento básico de paneles, batería e inversor. Guía de instalación en su versión mínima.
   - **Historias de usuario:**
     - HU-01: Como vendedor quiero registrar los aparatos de mi puesto para calcular cuánta energía necesito.
     - HU-02: Como vendedor quiero que el sistema calcule automáticamente la potencia total y la energía diaria.
     - HU-03: Como vendedor quiero que el sistema me sugiera cuántos paneles, baterías y qué inversor comprar.
     - HU-04: Como vendedor quiero ver el resultado de forma clara e imprimible.
     - HU-05: Como vendedor quiero leer una guía sencilla de instalación y manejo seguro.

## Compromisos (formato de seguimiento):

| No. | Compromiso | Responsable | Fecha entrega | Estado |
|---|---|---|---|---|
| 1 | Definir arquitectura y stack tecnológico | Heyner Alberto Aldana | 18/09/2026 | Pendiente |
| 2 | Bocetos de interfaz (ingreso y resultados) | Brayan Steven Rios | 18/09/2026 | Pendiente |
| 3 | Definir la fórmula final de dimensionamiento y parámetros configurables | Ambos | 25/09/2026 | Pendiente |
| 4 | Crear repositorio y entorno de desarrollo | Heyner Alberto Aldana | 25/09/2026 | Pendiente |
| 5 | Elaborar el plan de pruebas del MVP | Brayan Steven Rios | 25/09/2026 | Pendiente |

**Nota:** Se agenda la siguiente reunión para revisar los avances de diseño y aprobar el hito M2 (arquitectura, interfaz y fórmula de dimensionamiento).

## Conclusión:
Quedan aprobados los requisitos funcionales y no funcionales de SolarPuesto V1.0 (hito M1 cumplido), la estructura de la tabla de entrada, las fórmulas de potencia y energía, y los 5 casos de uso de referencia. Se define el alcance del MVP y las historias de usuario iniciales bajo XP. El proyecto avanza formalmente a la fase de diseño, con compromisos asignados y fechas de entrega claras.

## Modelo de trabajo:
Se mantiene la metodología ágil Extreme Programming (XP), con dos desarrolladores responsables de todo el ciclo de vida: análisis, diseño, codificación, pruebas y despliegue. Trabajo presencial los viernes (2 horas) y 8 horas adicionales en Home Office durante la semana. El avance se revisará al inicio de cada jornada presencial con sesiones cortas de seguimiento.

## Agenda para futura reunión:
1. Revisar los avances de diseño (arquitectura, interfaz y fórmula de dimensionamiento).
2. Aprobar el hito M2 (diseño aprobado) el 25/09/2026.
3. Definir el stack tecnológico definitivo.
4. Configurar el repositorio y el entorno de desarrollo.
5. Asignar compromisos para la fase de desarrollo (tabla de entrada CRUD).

## Observaciones:
No existe observaciones en la reunión.

---

_________________
MIGUEL ANTONIO URBANO SILVA
DOCENTE
(Gestor)

____________________________________
HEYNER ALBERTO ALDANA
PROGRAMADOR — ENFOQUE TÉCNICO Y DE NEGOCIO

____________________________________
BRAYAN STEVEN RIOS
PROGRAMADOR — ENFOQUE TÉCNICO Y DE CALIDAD

____________________________________
xxxxxxxxxxxxxxxxxxxxxxxxxx
ENCARGADO SEGUIMIENTO PROYECTO — TRACKER