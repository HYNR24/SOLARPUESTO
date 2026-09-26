# Plan de Captura de Evidencias — Compromisos del Acta No. 004

**Proyecto:** SolarPuesto V1.0 — Calculadora de potencia y material para puestos de comercio informal
**Asignatura:** Ingeniería de Software II — Metodología Extreme Programming (XP)
**Propósito:** este documento indica **exactamente qué capturar** para demostrar, uno por uno, los cinco compromisos pactados en el Acta 004. Cada captura corresponde a la *prueba de aceptación* que el acta escribe para ese compromiso.
**Documento complementario:** `Matriz_Cumplimiento_Acta_004.md`

---

## 0. Preparación (una sola vez)

1. Abre PowerShell en la carpeta `app`:
   ```
   cd C:\Users\Heyner\Desktop\SolarPuesto\app
   ```
2. Levanta el servidor de desarrollo:
   ```
   npm run dev
   ```
3. Abre en Chrome la dirección que muestre la consola: `http://localhost:5173`
4. **Deja la terminal abierta** mientras tomas las capturas.
5. Configura la ventana: maximizada, zoom del **100 %**. Si la tabla tiene scroll lateral, sube el zoom a 80 %.
6. Verifica que abajo se lea: **«Fase 3 · Desarrollo (MVP) — Hito M3 · Acta de Reunión No. 004 · SolarPuesto V1.0»**. Esa línea demuestra que la aplicación ya está en la Fase 3.

> **Tip:** como la app guarda todo en el navegador, si la tabla aparece con datos de una sesión anterior, pulsa **🗑 Vaciar todo** y acepta. Así todas las capturas empiezan desde el mismo punto limpio.

---

## 1. Compromiso 1 — Tabla de entrada CRUD (RF-01)

**Prueba de aceptación del acta:** «Poder registrar, editar y eliminar aparatos en la tabla (Sprint 1)».

| Paso | Acción en pantalla |
|---|---|
| 1 | Pestaña **«1. Carga de aparatos»** |
| 2 | Pulsa **«➕ Añadir aparato»** → aparece una fila vacía al final |
| 3 | Escribe `Plancha` en *Aparato*, `1` en *Cant.*, `1200` en *Potencia real (W)* |
| 4 | Mira la columna **«Uso total (auto)»**: se calcula mientras escribes, sin pulsar nada |
| **CAPTURA 1-A** | La tabla con la fila nueva ya rellena y el «Uso total» calculado |
| 5 | Cambia la *Potencia* a `900` — el valor de Wh/día de esa fila se actualiza al instante |
| 6 | Vuelve a pulsar **«➕ Añadir aparato»** para tener una fila de sobra |
| 7 | Pulsa el 🗑 de esa fila y acepta el aviso *«¿Eliminar este aparato?»* |
| **CAPTURA 1-B** | La tabla después de eliminar: la fila desapareció |

**Lo que demuestra:** alta (registrar), edición en vivo y baja (eliminar) sobre la misma tabla.

---

## 2. Compromiso 2 — KPIs de P(W) y E(Wh/día) (RF-02, RF-03)

**Prueba de aceptación del acta:** «KPIs de potencia y energía calculados con el uso real de cada aparato (Sprint 2)».

| Paso | Acción en pantalla |
|---|---|
| 1 | En la pestaña 1, pulsa el ejemplo **«🥤 Puesto de jugos»** |
| 2 | Observa la columna «Uso total (auto)»: la licuadora marca `1 h 50 min` (2 min × 55 usos), no 24 h |
| 3 | Pulsa **«🔍 Calcular resultado»** |
| 4 | En la pestaña **«2. Resultado»** se muestran los tres KPIs: Potencia instalada, Energía diaria y Consumo nocturno |
| **CAPTURA 2-A** | Los tres KPIs completos arriba y la tabla «📊 Desglose por aparato» con la participación en % de cada elemento |
| 5 | Señala en la captura que la licuadora aporta el mayor porcentaje: es la app la que prioriza el consumo real, no la potencia nominal |

**Valores esperados** (para que puedas compararlos con los del Modelado Matemático):
`657 W` instalados · `1 408 Wh/día` · `340 Wh` nocturnos.

> ⚠ **Importante:** captura este compromiso con **`cantidad = 1`** en todas las filas (como viene el ejemplo). Existe un riesgo técnico documentado en `Matriz_Cumplimiento_Acta_004.md` §5.1: con 2 o más unidades del tipo *Por usos* la energía se duplica. **No pongas cantidad 2 en esta captura.**

---

## 3. Compromiso 3 — Dimensionamiento de material (RF-04, RF-05)

**Prueba de aceptación del acta:** «Sugerencia de paneles, batería e inversor **y consumo nocturno según horario** (Sprint 3)».

| Paso | Acción en pantalla |
|---|---|
| 1 | Quédate en la pestaña **«2. Resultado»**, baja hasta **«🔥 Dimensionamiento del sistema solar»** |
| **CAPTURA 3-A** | Los tres bloques: 🔆 Paneles (Wp requerido y nº de paneles), 🔋 Banco de baterías (Ah, tensión, DOD, y las Wh nocturnas que debe cubrir) y ⚡ Inversor (W con el margen sobre el pico) |
| 2 | Más abajo, el bloque verde **«✅ Garantía»** que explica en lenguaje llano por qué ese material alcanza |
| 3 | Sube a **«⚙️ Parámetros configurables»** |
| 4 | Cambia *Horas pico solar* de `4.5` a `5` y *Margen de pérdidas* de `25` a `40` |
| **CAPTURA 3-B** | Los parámetros editados y, en la misma captura si alcanzas, el bloque de dimensionamiento con los nuevos valores |
| 5 | Vuelve a poner HSP en `4.5` y margen en `25` |
| **CAPTURA 3-C** (persistencia) | Con la tabla cargada, **recarga la página con F5**: los aparatos y los parámetros siguen ahí. Demuestra el almacenamiento local que pedía la Nota del Acta 004 |

**Lo que demuestra:** los tres componentes del sistema autónomo, el refinio del consumo nocturno por horario (☀️ día / 🌙 noche / 🌗 ambos) y que los parámetros son configurables y se conservan.

---

## 4. Compromiso 4 — Guía de instalación y manipulación (RF-07)

**Prueba de aceptación del acta:** «Guía accesible con los casos de referencia de la tabla de entrada (Sprint 4)».

| Paso | Acción en pantalla |
|---|---|
| 1 | Pulsa la pestaña **«3. Guía de instalación»** |
| **CAPTURA 4-A** | Las tarjetas de los casos 1 a 3: *Puesto de jugos*, *Iluminación LED + celular/datáfono*, *Alimentos con refrigerador pequeño* — cada una con sus componentes, los equipos sugeridos, los pasos y la advertencia |
| 2 | Baja hasta el final de la página |
| **CAPTURA 4-B** | Los casos 4 y 5: *Puesto mixto* y *Puesto de fritura* |

**Lo que demuestra:** los 5 casos de referencia del Acta 002 tienen su instructivo, con advertencias de seguridad (p. ej. ⚠ no conectar licuadora y nevera a la vez).

---

## 5. Compromiso 5 — Validaciones, integración e imprimible (RF-06)

**Prueba de aceptación del acta:** «Aplicación integrada, validaciones y suite de pruebas TDD aprobada (✅ M3, W9)».

Esta es la parte que faltaba y se cerró en esta entrega. Son **tres capturas obligatorias**.

### 5.1 Validación de entradas y mensajes de error (V-01 … V-07)

| Paso | Acción en pantalla |
|---|---|
| 1 | Pestaña **«1. Carga de aparatos»**, pulsa **«🗑 Vaciar todo»** y acepta |
| 2 | Pulsa **«➕ Añadir aparato»** dos veces |
| 3 | En la primera fila: escribe `Licuadora`, deja *Cant.* en `0`, *Potencia* en `0`, y vacía *Min por uso* |
| 4 | En la segunda fila: escribe `Licuadora` (mismo nombre) y pon el *Ciclo* en `80` (fuera del 20–60 %) |
| 5 | Pulsa **«🔍 Calcular resultado»** |
| **CAPTURA 5-A** | El bloque rojo **«⚠ Revisa N campos en M filas»** con la lista de mensajes, los campos demarcados en rojo y la app **sin** avanzar a la pestaña de resultado |

### 5.2 Resultado imprimible (RF-06)

| Paso | Acción en pantalla |
|---|---|
| 1 | Vuelve a cargar el ejemplo **🥤 Puesto de jugos** y calcula |
| 2 | En la pestaña 2, pulsa el botón **«🖨️ Imprimir / PDF»** (o `Ctrl + P`) |
| **CAPTURA 5-B** | La vista previa de impresión: **solo el contenido útil** — sin el menú superior, sin los botones y sin el pie. Se aplica la regla `@media print` |

### 5.3 Suite de pruebas TDD en verde

| Paso | Acción en pantalla |
|---|---|
| 1 | En la terminal de PowerShell (la del paso 0), ejecuta `npm test` |
| **CAPTURA 5-C** | La salida de Vitest: **`Test Files 3 passed (3)`** y **`Tests 57 passed (57)`**, con los tres archivos `formulas.test.js`, `validaciones.test.js` y `almacen.test.js` en verde |

---

## 6. Resumen: qué archivo nombre a cada captura

| Archivo sugerido | Compromiso | Qué prueba |
|---|---|---|
| `evidencia_1_crud.png` | 1 | Alta, edición en vivo y baja de aparatos |
| `evidencia_2_kpis.png` | 2 | Potencia, energía y desglose por uso real |
| `evidencia_3a_material.png` | 3 | Paneles, batería, inversor y consumo nocturno |
| `evidencia_3b_parametros.png` | 3 | Parámetros configurables (HSP, eficiencia, margen…) |
| `evidencia_3c_persistencia.png` | 3 | Los datos sobreviven a F5 (almacenamiento local) |
| `evidencia_4a_guia.png` | 4 | Guía de instalación, casos 1 a 3 |
| `evidencia_4b_guia.png` | 4 | Guía de instalación, casos 4 y 5 |
| `evidencia_5a_validaciones.png` | 5 | Errores por campo y resumen de validación |
| `evidencia_5b_impresion.png` | 5 | Resultado imprimible sin la interfaz |
| `evidencia_5c_pruebas.png` | 5 | 57 pruebas TDD en verde |

**Dónde guardarlas:** crea la carpeta `Evidencias_Acta_004/` dentro de `C:\Users\Heyner\Desktop\SolarPuesto\`.

---

## 7. Antes de presentar: lista de verificación

- [ ] `npm test` termina con **57 passed (57)**.
- [ ] El pie de la app dice **Fase 3 · Hito M3 · Acta 004**.
- [ ] Ninguna captura muestra cantidades mayores que 1 en filas de tipo *Por usos* (riesgo 5.1).
- [ ] Las 10 capturas están en `Evidencias_Acta_004/`.
- [ ] Llevas también `Matriz_Cumplimiento_Acta_004.md` (o su versión Word) donde se leen los estados y el riesgo 5.1.

---

*Documento de apoyo para la validación del hito M3 (30/10/2026).*
