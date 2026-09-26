# Modelado Matemático — SolarPuesto V1.0

**Asignatura:** Ingeniería de Software II (XP)
**Entregable:** Especificación detallada de las ecuaciones de la Fase de Diseño (Acta 003, Eje 2 + compromiso 3 del Acta 002).
**Referencia:** Implementado en `ACTA3/Mockup_SolarPuesto_V1.0.html` y en `src/lib/formulas.js` del entorno React/Vite.

---

## 0. Entradas del modelo (tabla de carga por elemento)

Cada elemento del puesto se registra con:

| Campo | Tipo | Unidad | Validación |
|---|---|---|---|
| `nombre` | texto | — | obligatorio y único |
| `cantidad` (c) | entero | unidades | ≥ 1 |
| `potencia` (P_nom) | decimal | W (potencia de etiqueta por unidad) | > 0 |
| `tipo` | selección | — | `usos` · `continuo` · `refri` |
| `horario` | selección | — | `dia` · `noche` · `ambos` |
| según tipo | — | — | ver sección 1 |

> La potencia se registra **por unidad** (la de la etiqueta). La cantidad multiplica automáticamente.

## 1. Uso real diario por tipo de elemento

El consumo varía con el uso; por eso la app no usa "horas/día fijas", sino el uso real:

### 1.1 Tipo «Por usos» — elementos discretos (licuadora, fritadora, sandwichera, celular)
\[
h = \frac{m \cdot u \cdot c}{60}
\]
- `m`: minutos por uso · `u`: usos al día · `c`: cantidad
- Ejemplo: licuadora 550 W, 2 min/jugo × 55 jugos × 1 → `h = 2·55·1/60 = 1,83 h` → **1 h 50 min/día**.

### 1.2 Tipo «Continuo» — elementos encendidos por jornada (luces, radio, datáfono, ventilador)
\[
h = t_{enc}
\]
- `t_enc`: horas encendido/día (0 < t ≤ 24).
- Ejemplo: foco LED 45 W encendido 6 h → `h = 6 h`.

### 1.3 Tipo «Refrigeración» — compresor con ciclo de trabajo
\[
h = t_{con} \cdot \frac{c_{ciclo}}{100}
\]
- `t_con`: horas conectado/día · `c_ciclo`: porcentaje del ciclo de trabajo del compresor (default **35 %**, editarú en 20–60 %). El compresor no consume a toda hora.
- Ejemplo: refrigerador pequeño 90 W, 12 h conectado × 35 % → `h = 12·0,35 = 4,2 h`.

## 2. Potencia instalada y energía diaria

\[
P(W) = \sum_{i} (P_{nom,i} \cdot c_i)
\]
\[
E(Wh/día) = \sum_{i} (P_{nom,i} \cdot c_i \cdot h_i)
\]

- `h_i`: uso real diario del elemento `i` (sección 1).
- Pico simultáneo (para inversor):\[
P_{pico} = \max_i (P_{nom,i} \cdot c_i)
\]

## 3. Dimensionamiento del sistema autónomo

### 3.1 Potencia del conjunto de paneles (Wp)
\[
W_p = \frac{E}{\text{HSP}} \cdot \frac{1}{\eta} \cdot (1 + m)
\]
- `E`: energía diaria consumida (Wh/día) · `HSP`: horas pico solar (default **4,5 h** para Neiva, rango IDEAM 4–5 h)
- `η`: eficiencia del sistema (default **0,80**) · `m`: margen de pérdidas (default **25 %**)

\[
N_{paneles} = \left\lceil \frac{W_p}{W_{panel}} \right\rceil
\]
- `W_panel`: potencia de un panel comercial (default **450 Wp**). Se redondea **hacia arriba** (no se instalan fracciones).

### 3.2 Banco de baterías (Ah)
\[
Ah = \frac{E \cdot (1 + m)}{V_{bat} \cdot \text{DOD}}
\]
- `V_bat`: tensión del banco (default **12 V**) · `DOD`: profundidad de descarga (default **50 %**; se evita descargar más para prolongar vida útil)
- La batería debe almacenar **toda** la energía diaria para poder entregarla sin sol.

### 3.3 Inversor (W)
\[
W_{inv} \geq P_{pico} \cdot 1{,}25
\]
- Factor 1,25 = margen de arranque (picos de corriente de motores/compresor). Si no se registran elementos, se usa `P × 1,25`.

## 4. Refinio del consumo nocturno (energía para cuando el sol baja)

Cada elemento indica su `horario` (día / noche / ambos). El consumo **nocturno** es:

\[
E_{noche} = \sum_{i \in \{\text{noche, ambos}\}} (P_{nom,i} \cdot c_i \cdot h_i)
\]

Criterios de diseño (guardía de funcionamiento):
1. **La batería cubre `E_noche`**: `Ah` se calcula sobre el total diario (sección 3.2), que incluye la parte nocturna; por construcción `E_{noche} ≤ E`, por lo tanto queda garantizada.
2. **Los paneles recargan en las HSP diurnas**: la producción diaria del arreglo debe ser `≥ E × (1+m)`:
   \[
   W_{panel} \cdot N_{paneles} \cdot \text{HSP} \geq E \cdot (1 + m)
   \]
3. **Origen de los datos**: HSP de Neiva ≈ **4,5–5 h** (Atlas IDEAM); la batería debe elegirse para clima cálido (> 35 °C) y el panel orientado con el mejor ángulo de la zona.

## 5. Parámetros configurables (persistencia local, RFN-05)

| Parámetro | Variable | Default | Rango editable |
|---|---|---|---|
| Horas pico solar | `HSP` | 4,5 h | 1–8 h |
| Eficiencia del sistema | `η` | 0,80 | 0,20–1,00 |
| Margen de pérdidas | `m` | 25 % | 0–100 % |
| Tensión del banco | `V_bat` | 12 V | 12–48 V |
| Profundidad de descarga | `DOD` | 50 % | 10–90 % |
| Potencia de panel comercial | `W_panel` | 450 Wp | 50–550 Wp |

## 6. Validación de referencia (5 casos de uso del Acta 002)

| Caso | Resultado esperado (aprox.) | Cumple |
|---|---|---|
| 🥤 Puesto de jugos (licuadora 550 W, 2 min×55; LED; datáfono; celular; radio) | E ≈ 1.408 Wh/día; P ≈ 657 W | ✅ |
| 📱 Luces LED + celular/datáfono | E ≈ 800 Wh/día; P ≈ 245 W | ✅ |
| ❄️ Refrigerador pequeño (90 W, 12 h × 35 %) | E ≈ 558 Wh/día; P ≈ 225 W | ✅ |
| 🔀 Puesto mixto | E ≈ 1.472 Wh/día; P ≈ 665 W | ✅ |
| 🍟 Puesto de fritura (fritadora 1200 W, 3 min×40) | E ≈ 2.895 Wh/día; P ≈ 1.340 W | ✅ |

Validación adicional con insumo real: **licuadora Black & Decker 550 W (120 V / 60 Hz)**, 2 min × 50 usos → `E = 550 × 1,67 = 917 Wh/día`. **Foco LED 45 W E27** → continuo 6 h × `cantidad` × 45 W.

## 7. Garantía del dimensionamiento (mensaje al vendedor)

El resultado garantiza:
- El **inversor** cubre la potencia pico (todo encendido a la vez) con margen del 25 %.
- La **batería** cubre la energía diaria total, incluida la **nocturna**, con margen del 25 % y DOD respetado.
- Si cambia el uso (minutos/usos/horas), el resultado se debe **recalcular**.