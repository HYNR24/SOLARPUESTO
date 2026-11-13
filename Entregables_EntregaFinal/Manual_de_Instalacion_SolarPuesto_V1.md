# Manual de Instalación — SolarPuesto V1.0

*Sistema solar autónomo para puestos de comercio informal y puesta en marcha de SolarPuesto V1.0*

**Código:** SP-MI-002 · **Edición:** 2.0 — Edición diseñada · **Fecha:** 06/11/2026

**Autor:** Heyner Alberto Aldana Herrera · **Docente:** Miguel Antonio Urbano Silva · **Asignatura:** Ingeniería de Software II (XP — TDD)

---

## Acerca de este manual

Este documento explica, en lenguaje claro y con apoyo visual, todo lo necesario para instalar el sistema solar de un puesto de comercio informal y poner en marcha la aplicación SolarPuesto, con criterios de seguridad, verificación y mantenimiento.

Está escrito para leerse con el puesto delante y la aplicación abierta. No supone conocimientos de electricidad ni de programación; cuando un concepto técnico aparece por primera vez, se explica en el glosario y se relaciona con una decisión concreta.

### Ficha del documento

| Campo | Valor |
| --- | --- |
| **Documento** | Manual de Instalación — SolarPuesto V1.0 |
| **Código** | SP-MI-002 |
| **Edición** | 2.0 — Edición diseñada |
| **Fecha** | 06/11/2026 |
| **Autor** | Heyner Alberto Aldana Herrera |
| **Docente** | Miguel Antonio Urbano Silva |
| **Asignatura** | Ingeniería de Software II (XP — TDD) |
| **Entregable** | Manual de instalación — Fase de pruebas y entrega final |
| **Público** | Instaladores, técnicos, docentes y evaluadores del proyecto |
| **Alcance** | Montaje del sistema solar de 24 V CC con salida de 110/120 V CA, seguridad eléctrica, verificación, mantenimiento y despliegue de la aplicación. |

### Qué encontrarás

- **Parte I — El sistema solar:** componentes, dimensionamiento, seguridad, montaje, puesta en marcha y mantenimiento.
- **Parte II — La aplicación:** requisitos, instalación, ejecución, publicación, configuración, pruebas y privacidad.
- **Fichas de material:** fotografías reales con su crédito y licencia.
- **Verificación:** listas de comprobación y valores esperados para no improvisar.
- **Referencia:** comandos, estructura del proyecto y solución de problemas.

## Cómo leer este manual

El manual combina texto, tablas, diagramas y avisos. Los avisos no son decoración: cada uno indica una condición que cambia el resultado o la seguridad de la instalación.

| Aviso | Significado |
| --- | --- |
| **PELIGRO** | Riesgo de lesión grave o muerte. Detente y verifica antes de continuar. |
| **ATENCION** | Riesgo de daño al equipo, al sistema o a los datos. |
| **IMPORTANTE** | Condición necesaria para que el sistema funcione correctamente. |
| **CONSEJO** | Buena práctica que mejora el rendimiento, la duración o la seguridad. |
| **NOTA** | Aclaración útil que no cambia el procedimiento. |
| **PRIVACIDAD** | Información sobre el manejo y la permanencia de los datos. |

*Tabla 1. Recursos gráficos del manual*

| Bloque | Para qué sirve | Cuándo consultarlo |
| --- | --- | --- |
| **Diagrama** | Explica una relación o un recorrido de energía. | Antes de montar o de explicar el sistema. |
| **Tabla** | Ordena datos, rangos, materiales o comparaciones. | Cuando necesites un valor exacto. |
| **Caja de aviso** | Señala un riesgo, un límite o una buena práctica. | Siempre que aparezca antes de un paso. |
| **Lista de verificación** | Confirma que un paso quedó completo. | Antes de avanzar a la etapa siguiente. |
| **Figura** | Muestra la aplicación real o un material real. | Cuando el texto no alcance. |

> **CONSEJO — Una lectura rentable**
> Lee primero el capítulo 1 y el capítulo 5 (o el 5 de la Parte I). Con eso ya puedes obtener un resultado útil. Los demás capítulos se consultan cuando hagan falta.

### Convenciones de texto

- Los nombres de botones y pestañas se escriben en **negrita**: **Calcular resultado**, **Vaciar todo**.
- Los valores y fórmulas se muestran en `fuente monoespaciada` para distinguirlos del texto.
- Los números usan coma decimal (1.408,33 Wh); los capítulos se citan como «capítulo 5» o «§5.4».

## Contenido

El índice se genera con los títulos de capítulo y de sección de esta edición. La versión diseñada en DOCX y PDF incluye números de página.

- **Parte I — El sistema solar**
- **1  El sistema que vas a montar**
  - 1.1  De qué está hecho el sistema
  - 1.2  El caso de referencia
  - 1.3  Qué no cubre esta guía
- **2  Seguridad antes de empezar**
  - 2.1  Equipo de protección
  - 2.2  Reglas de oro
- **3  Herramientas y materiales**
  - 3.1  Herramientas
  - 3.2  Materiales del caso de referencia
  - 3.3  Fichas de material
- **4  Lee el dimensionamiento antes de comprar**
  - 4.1  Parámetros por defecto
  - 4.2  Las cinco fórmulas
  - 4.3  Resultado aplicado al ejemplo
- **5  El panel solar**
  - 5.1  Efecto de las sombras
- **6  Cableado y conectores**
  - 6.1  Verificación antes de energizar
- **7  El controlador de carga**
- **8  El banco de baterías**
  - 8.1  Cómo formar 24 V
- **9  El inversor y las cargas**
- **10  Orden de montaje y puesta en marcha**
  - 10.1  Secuencia de energización
- **11  Verificación y mantenimiento**
  - 11.1  Mediciones de referencia
  - 11.2  Calendario de mantenimiento
- **Parte II — La aplicación**
- **12  Qué se instala de la aplicación**
  - 12.1  Lo que no se instala
- **13  Requisitos del entorno**
- **14  Instalación de dependencias**
- **15  Ejecución en desarrollo**
- **16  Compilación y publicación**
- **17  Configuración de parámetros**
- **18  Pruebas y verificación de la entrega**
- **19  Datos, privacidad y copia**
- **20  Solución de problemas de despliegue**
- **A  Comandos de referencia**
- **B  Estructura del proyecto**
- **C  Glosario técnico**
- **D  Lista de verificación de despliegue**

---

# Parte I — El sistema solar

# 1  El sistema que vas a montar

*Componentes, recorrido de la energía y alcance de esta guía*

Un sistema solar autónomo no se arma por partes: se diseña completo y se monta en un orden. Este capítulo muestra el conjunto antes de tocar el primer cable.

## 1.1  De qué está hecho el sistema

El puesto trabaja con corriente continua en el lado solar y con corriente alterna en el lado de los aparatos. Entre ambos están el controlador, el banco de baterías y el inversor.

*Tabla 1.1. Componentes del sistema*

| Componente | Qué hace | Dónde va |
| --- | --- | --- |
| **Panel solar** | Convierte la luz en corriente continua. | Exterior, sin sombras |
| **Controlador de carga** | Regula la carga y protege el banco. | Seco y ventilado, cerca del banco |
| **Banco de baterías** | Almacena la energía para la noche. | Ventilado, firme, lejos del agua |
| **Inversor** | Convierte 24 V CC en 110/120 V CA. | Junto al banco, cable corto y grueso |
| **Protecciones** | Fusible, breaker, DPS y puesta a tierra. | En el positivo y en la salida |
| **Cargas** | Licuadora, luces, datáfono y cargadores. | En la salida CA del inversor |

*Figura 1.1. Recorrido de la energía: el panel y la batería trabajan en CC; el inversor entrega CA a los aparatos.*

| Valor | Indicador |
| --- | --- |
| **900 Wp** | generación |
| **24 V** | tensión del banco |
| **147 Ah** | almacenamiento |

## 1.2  El caso de referencia

Todo el manual usa el Puesto de jugos como ejemplo verificable. Si tu puesto es otro, sustituye estos valores por los que entrega la aplicación; el orden de montaje no cambia.

*Tabla 1.2. Dimensionamiento del Puesto de jugos*

| Indicador | Valor del ejemplo |
| --- | --- |
| **Potencia instalada** | 635 W |
| **Energía diaria** | 1.408,33 Wh/día |
| **Consumo nocturno** | 340 Wh/día |
| **Paneles** | 2 × 450 Wp (900 Wp) |
| **Banco de baterías** | 24 V · 147 Ah · DOD 50 % |
| **Inversor** | ≥ 794 W |
| **Controlador** | ≥ 50 A |
| **Presupuesto referencial** | $5.769.120 COP |

> **PELIGRO — La instalación la revisa un profesional**
> Esta guía explica el orden de montaje, pero no certifica la instalación. La conexión eléctrica debe cumplir el RETIE y ser revisada por un técnico competente antes de energizar el puesto.

## 1.3  Qué no cubre esta guía

- No es una cotización: los precios son referenciales y no incluyen IVA, transporte ni mano de obra.
- No calcula calibres definitivos, caídas de tensión ni protecciones específicas para tu instalación.
- No mide el consumo real de los aparatos: usa el dato de la etiqueta que tú registraste.
- No incluye obra civil, permisos ni adecuación del punto de venta.

# 2  Seguridad antes de empezar

*Riesgos eléctricos, equipo de protección y reglas de oro*

Una batería de ciclo profundo puede entregar cientos de amperios en un cortocircuito. Antes de montar, define cómo vas a trabajar y en qué orden vas a desconectar.

> **PELIGRO — Detente si no estás seguro**
> No manipules bornes con el sistema energizado, no trabajes mojado y no puentees el fusible. Ante duda, desconecta y consulta a un técnico.

*Tabla 2.1. Riesgos y prevención*

| Riesgo | Qué puede pasar | Cómo prevenirlo |
| --- | --- | --- |
| **Cortocircuito en el banco** | Chispas, cable caliente, incendio | Fusible en el positivo y herramientas aisladas |
| **Polaridad invertida** | Daño del controlador o del inversor | Rojo con +, negro con −; verificar con multímetro |
| **Panel conectado sin controlador** | Sobrecarga de la batería | Siempre panel → controlador → batería |
| **Salida CA de 110/120 V** | Choque eléctrico | Caja, tapa y tierra; no manipular con las manos húmedas |
| **Agua o aceite cerca del equipo** | Fuga, corrosión o incendio | Equipos secos, elevados y ventilados |

## 2.1  Equipo de protección

- Guantes dieléctricos y gafas de seguridad.
- Destornilladores y llaves con mango aislado.
- Multímetro para verificar tensión y continuidad antes de cada conexión.
- Calzado cerrado y ropa que no se enganche en la estructura.

## 2.2  Reglas de oro

1. Trabaja siempre **sin energía**: batería desconectada y panel cubierto o desconectado.
2. Conecta primero la **batería al controlador** y después el **panel al controlador**.
3. Para desconectar, hazlo al revés: primero el panel y al final la batería.
4. Instala el fusible o breaker **en el cable positivo, cerca del borne de la batería**.
5. No uses el borne LOAD del controlador para alimentar el inversor.
6. No mezcles baterías de distinta edad, marca o capacidad en el mismo banco.

> **ATENCION — El orden no es negociable**
> El controlador necesita ver la batería antes que el panel para reconocer la tensión del sistema. Invertir ese orden puede dejar el equipo en falla o con parámetros erróneos.

- [ ] Tengo el dimensionamiento impreso a la mano.
- [ ] El área de trabajo está seca y ventilada.
- [ ] Las herramientas están aisladas y el multímetro funciona.
- [ ] El fusible y las protecciones están listos antes de conectar.
- [ ] Sé quién revisará la instalación antes de energizarla.

# 3  Herramientas y materiales

*Lista de compra y fichas fotográficas con su licencia*

Comprar con la lista cerrada evita ir dos veces al proveedor. Esta es la lista del caso de referencia; ajústala al resultado de tu propio cálculo.

## 3.1  Herramientas

*Tabla 3.1. Herramientas mínimas*

| Herramienta | Para qué |
| --- | --- |
| **Multímetro digital** | Verificar tensión, polaridad y continuidad |
| **Crimpador y terminales** | Unir cables a bornes sin soldaduras improvisadas |
| **Destornilladores y llaves** | Apretar bornes, estructura y canaletas |
| **Cinta aislante y cinchas** | Aislar, ordenar y fijar el cableado |
| **Taladro y anclajes** | Fijar la estructura del panel |
| **Guantes y gafas** | Protección personal durante el montaje |

## 3.2  Materiales del caso de referencia

*Tabla 3.2. Lista de materiales*

| Material | Especificación | Cantidad |
| --- | --- | --- |
| **Panel solar** | 450 Wp, 24 V nominal | 2 |
| **Controlador de carga** | ≥ 50 A, para 24 V | 1 |
| **Batería de ciclo profundo** | 12 V · 100 Ah ( dos en serie ) | 2 |
| **Inversor** | 24 V CC → 110/120 V CA, ≥ 794 W | 1 |
| **Cable solar** | 4–6 mm² (panel) y 10–25 mm² (banco) | Según tramo |
| **Conectores MC4** | Macho y hembra | 2 pares |
| **Fusible ANL + portafusible** | 100 A, en el positivo | 1 |
| **Regleta de tomacorrientes** | Salida CA para las cargas | 1 |
| **Estructura, rieles y anclajes** | Para 900 Wp | 1 juego |
| **Protección y puesta a tierra** | Breaker, DPS, borne de tierra | 1 juego |

> **CONSEJO — Lleva el resultado impreso**
> El presupuesto de la aplicación agrupa estos mismos materiales por generación, almacenamiento, conversión, montaje, seguridad y otros. Úsalo como lista de chequeo.

## 3.3  Fichas de material

Las fotografías muestran ejemplos reales, no marcas obligatorias. Cada ficha conserva el crédito y la licencia de Wikimedia Commons.

**Panel solar de 450 Wp** — Monocristalino o policristalino de 24 V nominal. Dos unidades forman el arreglo de 900 Wp. *(Foto: Guilhem Vellut · CC BY 2.0)*

**Conector MC4 macho y hembra** — Une el positivo con el positivo y el negativo con el negativo del cable solar. *(Foto: Orion Lawlor · CC0)*

**Cable solar rojo y negro** — Rojo para + y negro para −. De 4 a 6 mm² del panel al controlador. *(Foto: Asurnipal · CC BY-SA 4.0)*

**Controlador de carga solar** — Regula la entrada del panel y protege el banco. Debe soportar al menos 50 A. *(Foto: Ranjithkumar Murugesan · CC0)*

**Batería de ciclo profundo** — 12 V · 100 Ah. Dos iguales en serie entregan 24 V y mantienen los Ah. *(Foto: TaurusEmerald · CC BY-SA 4.0)*

**Fusible ANL con portafusible** — Se instala en el cable positivo, lo más cerca posible del borne de la batería. *(Foto: Zureks · CC BY 3.0)*

**Inversor de 24 V a 120 V** — Entrega corriente alterna a los aparatos. Debe cubrir al menos 794 W. *(Foto: C J Cowie · CC BY-SA 3.0)*

**Regleta de tomacorrientes** — Reparte la salida CA entre licuadora, luces, datáfono y cargadores. *(Foto: Wikimedia Commons · CC BY-SA 3.0)*

# 4  Lee el dimensionamiento antes de comprar

*Parámetros, fórmulas y redondeos comerciales*

El resultado de la aplicación es la entrada de esta guía. Entender cómo se calculó evita comprar un kit que se ve barato pero que tiene menos batería o menos paneles.

## 4.1  Parámetros por defecto

*Tabla 4.1. Valores por defecto de SolarPuesto V1.0*

| Parámetro | Valor | Qué representa |
| --- | --- | --- |
| **HSP** | 4,5 h | Horas solar pico, valor de referencia para Neiva |
| **Eficiencia** | 0,80 | Pérdidas del sistema |
| **Margen** | 25 % | Reserva ante pérdidas y días malos |
| **Tensión del banco** | 24 V | Compatible con panel de 450 Wp de 24 V nominal |
| **DOD** | 50 % | Profundidad de descarga máxima recomendada |
| **Panel comercial** | 450 Wp | Potencia de cada módulo |
| **Voltaje de panel** | 24 V | Tensión nominal de trabajo del módulo |

## 4.2  Las cinco fórmulas

```text
Wp        = (E_dia / HSP) x (1 / eficiencia) x (1 + margen)
N_paneles = redondeo_arriba(Wp / 450 Wp)
Ah        = (E_dia x (1 + margen)) / (V_banco x DOD)
W_inversor= 1,25 x max(potencia_pico, potencia_instalada)
A_control = 1,25 x (N_paneles x 450 Wp) / V_banco  -> amperaje comercial
```
*Modelo de cálculo implementado en src/lib/formulas.js*

La batería se dimensiona con la energía diaria completa, no solo con el consumo nocturno; el consumo nocturno se usa como verificación de la reserva. Los amperajes del controlador se redondean al valor comercial inmediato: 10, 20, 30, 40, 50, 60, 80 o 100 A.

## 4.3  Resultado aplicado al ejemplo

*Tabla 4.2. Cálculo del Puesto de jugos*

| Concepto | Cálculo | Resultado |
| --- | --- | --- |
| **Potencia del arreglo** | (1.408,33 / 4,5) / 0,80 × 1,25 | ≈ 489 Wp → 2 paneles |
| **Banco** | 1.408,33 × 1,25 / (24 × 0,50) | ≈ 147 Ah |
| **Inversor** | 1,25 × 635 W | ≥ 794 W |
| **Controlador** | 1,25 × 900 Wp / 24 V | 46,9 A → ≥ 50 A |

> **IMPORTANTE — Los redondeos son parte del resultado**
> Los paneles se compran completos, los amperajes del controlador se suben al valor comercial y el inversor se redondea hacia arriba. No intentes «corregir» esos números en la lista de compra: son los que la aplicación verificó con 113 pruebas.

# 5  El panel solar

*Ubicación, orientación, anclaje y limpieza*

El panel define cuánta energía entra al sistema. Una mala ubicación no se arregla con más batería: se arregla moviendo el panel.

1. **Elige el lugar más soleado** — Sin sombras de árboles, postes, toldos ni cables durante las horas centrales del día.
2. **Oriéntalo e inclínalo** — Hacia el sur, con 10° a 15° de inclinación para que el agua escurra y no se acumule polvo.
3. **Ancla la estructura y deja circular el aire** — Fija rieles y anclajes a una base firme y no lo pegues a una superficie caliente: el viento lo levanta y el calor reduce la producción.

## 5.1  Efecto de las sombras

*Tabla 5.1. Condiciones que afectan la generación*

| Situación | Efecto |
| --- | --- |
| **Sombra parcial sobre una celda** | Reduce la producción de todo el arreglo |
| **Panel horizontal** | Acumula polvo y agua; produce menos |
| **Panel bajo techo o lona** | Prácticamente no produce |
| **Limpieza cada 2 o 3 días** | Recupera la producción perdida por polvo |

> **ATENCION — Nunca lo cubras**
> Una lona, una hoja o la sombra de un poste reducen la carga de todo el día. Limpia el panel a primera hora con un trapo húmedo, antes de que el sol evapore el agua.

- [ ] El panel recibe sol directo entre las 9:00 y las 15:00.
- [ ] La inclinación permite que el agua escurra.
- [ ] La estructura está anclada y no vibra con el viento.
- [ ] Los cables llegan sin rozar bordes filosos.
- [ ] Los conectores MC4 quedan firmes y sin polos sueltos.

# 6  Cableado y conectores

*Calibres, polaridad, canaletas y conectores MC4*

Un cable delgado o un borne flojo se calienta. En un sistema de 24 V la corriente es alta, así que el tramo entre la batería y el inversor merece el cable más grueso.

*Tabla 6.1. Calibres de referencia*

| Tramo | Calibre recomendado | Color |
| --- | --- | --- |
| **Panel → controlador** | 4 a 6 mm² | Rojo (+) y negro (−) |
| **Controlador → banco** | Según corriente del controlador | Rojo (+) y negro (−) |
| **Banco → inversor** | 10 a 25 mm² | Rojo (+) y negro (−) |
| **Inversor → cargas** | Cable CA según carga | Según norma del tomacorriente |

1. Lleva los cables por **canaleta o tubo**, lejos de zonas de paso y de superficies calientes.
2. Mantén los tramos **lo más cortos posible**: la longitud se paga en calor y en caída de tensión.
3. Respeta la polaridad en cada empalme y **aprieta bien todos los bornes**.
4. Usa **conectores MC4** en el lado del panel; no empalmes con cinta aislante a la intemperie.
5. Etiqueta los extremos antes de cerrar la canaleta.

> **PELIGRO — Nunca conectes el panel directamente a la batería**
> El panel debe pasar siempre por el controlador de carga. Sin regulación, la batería se sobrecarga, se calienta y puede dañarse de forma irreversible.

## 6.1  Verificación antes de energizar

- [ ] El multímetro confirma continuidad en cada tramo.
- [ ] No hay positivo y negativo invertidos en ningún borne.
- [ ] Los MC4 hacen tope y no se separan al tirar suavemente.
- [ ] Ningún cable queda pelado, rozado o bajo una bisagra.
- [ ] El fusible está instalado en el positivo, cerca del banco.

# 7  El controlador de carga

*Orden de conexión, bornes y corriente mínima*

El controlador es el único equipo que ve al panel y a la batería al mismo tiempo. Por eso su conexión tiene un orden estricto.

1. **Fíjalo en un lugar seco y ventilado** — Cerca del banco, protegido del agua y con circulación de aire.
2. **Conecta primero la batería (BAT)** — BAT+ al positivo y BAT− al negativo del banco; el equipo reconoce así los 24 V.
3. **Conecta después el panel (PV)** — PV+ y PV− con sus MC4; el controlador empieza a regular la carga.
4. **Para apagar, invierte el orden** — Primero desconecta el panel y al final la batería.

*Tabla 7.1. Bornes del controlador*

| Borne | Destino | Observación |
| --- | --- | --- |
| **PV+ / PV−** | Panel solar | Nunca directo a la batería |
| **BAT+ / BAT−** | Banco de baterías | Se conecta primero |
| **LOAD+ / LOAD−** | Cargas pequeñas de CC | No se usa para el inversor |

La corriente exigida se calcula con el arreglo completo, no con la demanda del puesto: 1,25 × 900 Wp / 24 V = 46,9 A. El resultado se redondea al amperaje comercial inmediato, por eso el caso de referencia pide un controlador de **≥ 50 A**.

> **ATENCION — El borne LOAD no alimenta el inversor**
> El inversor se conecta directamente al banco a través del fusible. Usar LOAD para él dispara la protección del controlador o lo daña.

> **NOTA — Tipos de controlador**
> La aplicación dimensiona la corriente, no la tecnología de regulación (PWM o MPPT). Cualquiera que soporte 24 V y la corriente calculada es compatible con el cálculo.

# 8  El banco de baterías

*Serie de 24 V, capacidad, DOD y fusible*

El banco es la reserva de la noche. Se dimensiona en amperios-hora y se protege con un fusible colocado lo más cerca posible del borne positivo.

## 8.1  Cómo formar 24 V

*Tabla 8.1. Configuraciones del banco*

| Conexión | Resultado | Cuándo usarla |
| --- | --- | --- |
| **2 baterías de 12 V en serie** | 24 V, se conservan los Ah | Caso de referencia |
| **2 baterías de 12 V en paralelo** | 12 V, se suman los Ah | Solo si el sistema es de 12 V |
| **Serie y paralelo combinados** | 24 V, se suman los Ah por rama | Bancos grandes |

Para el Puesto de jugos: 1.408,33 Wh × 1,25 / (24 V × 0,50) = **146,7 Ah**, que la aplicación presenta como **147 Ah**. Dos baterías de 12 V · 100 Ah en serie entregan 24 V · 100 Ah; si necesitas 147 Ah, usa baterías de mayor capacidad o dos ramas en paralelo de baterías iguales.

1. **Ubica el banco** — Ventilado, seco, firme y lejos de alimentos, agua y aceite; nunca en un cajón cerrado.
2. **Conecta en serie** — Une el negativo de A con el positivo de B; los extremos libres van al sistema.
3. **Instala el fusible y no mezcles baterías** — En el positivo, a menos de 20 cm del borne (100 A en el ejemplo); usa baterías de la misma edad, marca y capacidad.

> **PELIGRO — Cortocircuito en el banco**
> Una herramienta metálica que puentea los bornes puede fundir cable y provocar un incendio. Trabaja con el fusible retirado y colócalo solo al final.

> **CONSEJO — Respeta el 50 % de descarga**
> El DOD del 50 % alarga la vida del banco. Una descarga completa repetida reduce drásticamente los ciclos útiles de una batería de ciclo profundo.

# 9  El inversor y las cargas

* Conversión de 24 V CC a 110/120 V CA y reparto de salida*

El inversor es el último eslabón antes de los aparatos. Su potencia se elige con margen de arranque y su consumo en vacío obliga a apagarlo al cerrar el puesto.

*Tabla 9.1. Selección del inversor*

| Característica | Valor del ejemplo | Criterio |
| --- | --- | --- |
| **Tensión de entrada** | 24 V CC | Igual a la del banco |
| **Tensión de salida** | 110/120 V CA | Igual a la de los aparatos |
| **Potencia continua** | ≥ 794 W | 1,25 × potencia instalada |
| **Forma de onda** | Senoidal pura recomendada | Protege motores y fuentes |
| **Consumo en vacío** | Algunos vatios | Apagarlo al cerrar |

*Figura 9.1. Orden de conexión: batería → controlador → panel → inversor → cargas.*

1. **Colócalo cerca del banco** — Cable grueso y corto: 10 a 25 mm² desde el positivo a través del fusible.
2. **Conecta la salida CA** — A una regleta con tierra; nunca a la batería ni al controlador.
3. **Enciende las cargas una por una** — Empieza por las de menor consumo para evitar picos simultáneos.

> **ATENCION — No superes la potencia calculada**
> Si el inversor se apaga solo, apaga aparatos, ventila el equipo y revisa la tensión del banco antes de volver a intentarlo. No puentees la protección.

- [ ] El inversor entrega la tensión que usan mis aparatos.
- [ ] El cable del banco al inversor es corto y del calibre indicado.
- [ ] La salida CA llega a una regleta con protección y tierra.
- [ ] El inversor se apaga al cerrar el puesto.
- [ ] El borne LOAD del controlador no alimenta el inversor.

# 10  Orden de montaje y puesta en marcha

*Seis pasos de montaje y secuencia de energización*

El orden protege los equipos y a quien monta; síguelo completo.

1. **Instala el panel y tiende el cableado** — Ubicación soleada, sur, 10° a 15° y estructura anclada; calibres correctos, canaleta, polaridad y MC4 firmes.
2. **Conecta el controlador y arma el banco** — Primero BAT y después PV; dos baterías de 12 V en serie para 24 V, con fusible de 100 A en el positivo.
3. **Conecta el inversor** — Cable grueso y corto desde el banco; salida CA a la regleta.
4. **Conecta los aparatos** — Enciéndelos uno por uno, del menor al mayor consumo.

## 10.1  Secuencia de energización

1. Verifica con multímetro que no hay cortocircuitos ni polaridad invertida.
2. Conecta la batería al controlador y comprueba que el equipo reconoce 24 V.
3. Conecta el panel al controlador y observa que aparece carga.
4. Cierra el fusible del banco hacia el inversor.
5. Enciende el inversor, mide la tensión CA y prueba cada aparato de forma individual.

> **IMPORTANTE — Si algo no enciende**
> Revisa en este orden: fusible, polaridad, tensión del banco y carga de la batería.

- [ ] Todas las conexiones están firmes y con la polaridad correcta.
- [ ] El controlador muestra carga del panel.
- [ ] El banco marca tensión coherente con 24 V.
- [ ] La regleta entrega 110/120 V CA.
- [ ] Cada aparato enciende de forma individual.
- [ ] Se registraron las mediciones iniciales en la bitácora.

# 11  Verificación y mantenimiento

*Mediciones esperadas, bitácora y calendario*

La instalación termina cuando existe un registro de las mediciones. Sin ese dato, cualquier falla futura se diagnostica a ciegas.

## 11.1  Mediciones de referencia

*Tabla 11.1. Verificación inicial*

| Punto | Valor esperado | Qué hacer si no coincide |
| --- | --- | --- |
| **Tensión del banco en reposo** | ≈ 24 V (cargada, algo más) | Revisar carga y conexiones en serie |
| **Corriente del controlador** | Igual o inferior a su nominal | Revisar sombras y polaridad PV |
| **Tensión en la regleta** | 110/120 V CA | Revisar inversor y fusible |
| **Temperatura de bornes** | Tibios, nunca calientes | Aprietar o cambiar el calibre |
| **Consumo nocturno** | ≈ 340 Wh en el ejemplo | Recalcular si cambió el horario |

## 11.2  Calendario de mantenimiento

*Tabla 11.2. Mantenimiento preventivo*

| Frecuencia | Actividad |
| --- | --- |
| **Cada 2 o 3 días** | Limpiar el panel a primera hora |
| **Cada semana** | Revisar cableado visible, roces y humedad |
| **Cada mes** | Apretar bornes, medir tensión del banco y revisar alarmas |
| **Cada 3 meses** | Limpiar la ventilación del inversor y del controlador |
| **Cada 6 meses** | Revisar estructura, anclajes y estado de las baterías |

> **CONSEJO — Anota la fecha y el valor**
> Una línea por semana en un cuaderno permite ver si la batería envejece o si el panel se ensucia más de lo normal. Es la bitácora más barata y más útil del sistema.

> Primero la seguridad, después la energía y al final la prisa.
> — Regla de trabajo del proyecto

---

# Parte II — La aplicación

# 12  Qué se instala de la aplicación

*Arquitectura, alcance y piezas que sí y no se despliegan*

SolarPuesto es una aplicación web estática: se sirve con un servidor web y se abre en un navegador.

*Figura 12.1. Arquitectura de la aplicación: módulos puros, componentes React y almacenamiento local del navegador.*

*Tabla 12.1. Piezas de la aplicación*

| Pieza | Tecnología | Función |
| --- | --- | --- |
| **Interfaz** | React 18.3.1 | Cinco pestañas y formularios |
| **Empaquetado** | Vite 5.4 | Desarrollo, build y preview |
| **Cálculo** | formulas.js | Módulo puro de dimensionamiento |
| **Validación** | validaciones.js | Reglas V-01 a V-07 |
| **Persistencia** | almacen.js | localStorage del navegador |
| **Pruebas** | Vitest + Testing Library | 113 pruebas automatizadas |

## 12.1  Lo que no se instala

- **Servidor de aplicaciones:** basta con servir archivos estáticos.
- **Base de datos:** la tabla y los parámetros viven en el navegador del usuario.
- **Cuentas o autenticación:** la aplicación no registra usuarios.
- **Procesos en segundo plano:** todo el cálculo ocurre al pulsar **Calcular resultado**.

> **NOTA — Una aplicación, dos manuales**
> El Manual de Usuario explica cómo operar la aplicación; este explica el montaje y la puesta en marcha.

# 13  Requisitos del entorno

*Node.js, npm, navegador y sistema operativo*

Verifica el entorno antes de instalar dependencias: la mayoría de los problemas de arranque son versiones incorrectas o una terminal abierta en la carpeta equivocada.

*Tabla 13.1. Entorno de ejecución*

| Requisito | Mínimo | Verificado en la entrega |
| --- | --- | --- |
| **Node.js** | 18 o superior (se recomienda LTS) | v24.13.1 |
| **npm** | Incluido con Node.js | 11.8.0 |
| **Navegador** | Chrome, Edge o Firefox actual | Chrome 156 |
| **Sistema operativo** | Windows, Linux o macOS | Windows 11 Pro |
| **Terminal** | PowerShell o equivalente | PowerShell sin elevación |
| **Disco** | Espacio para node_modules y dist | Unos cientos de MB |

```text
node -v
npm -v
```
*Comprueba las versiones antes de continuar*

> **NOTA — Sobre el LEEME.md de la aplicación**
> El LEEME.md original menciona 57 pruebas porque corresponde a un hito anterior. La entrega final ejecuta **113 pruebas en verde**; usa ese valor como referencia.

- [ ] Node.js y npm responden en la terminal.
- [ ] Estoy ubicado en la carpeta donde está package.json.
- [ ] Tengo permisos de escritura en la carpeta del proyecto.
- [ ] El navegador está actualizado.

# 14  Instalación de dependencias

*npm install, node_modules y comprobación inicial*

Las dependencias se descargan una sola vez. No hace falta conexión a internet para usar la aplicación después, pero sí para este primer paso.

1. Descomprime el proyecto en una ruta sin espacios problemáticos, por ejemplo `C:\SolarPuesto\app`.
2. Abre PowerShell en esa carpeta y confirma que ves `package.json`.
3. Ejecuta `npm install` y espera a que termine.
4. Comprueba que existe la carpeta `node_modules`.

```text
cd C:\SolarPuesto\app
npm install
npm test
```
*Instalación y primera verificación*

> **ATENCION — No abras index.html con doble clic**
> La aplicación usa módulos ES y necesita un servidor. Abrir el archivo directamente deja la página en blanco. Siempre usa `npm run dev` o sirve la carpeta `dist`.

*Tabla 14.1. Problemas de instalación*

| Síntoma | Causa probable | Acción |
| --- | --- | --- |
| **npm no se reconoce** | Node.js no instalado o no en PATH | Reinstalar Node.js LTS y abrir nueva terminal |
| **Error de permisos** | Terminal sin permisos de escritura | Usar una carpeta del usuario |
| **Falla la descarga** | Sin internet o proxy | Repetir con conexión estable |
| **Carpeta node_modules vacía** | Instalación interrumpida | Borrar node_modules y repetir npm install |

# 15  Ejecución en desarrollo

*npm run dev, puerto 5173 y parada del servidor*

En desarrollo, Vite sirve la aplicación y recarga la página al guardar cambios. Es la forma más rápida de comprobar que todo funciona.

```text
npm run dev
http://localhost:5173
Ctrl + C   (para detener el servidor)
```
*Arranque del servidor de desarrollo*

*Tabla 15.1. Situaciones habituales*

| Situación | Qué hacer |
| --- | --- |
| **El puerto 5173 está ocupado** | Vite propone otro puerto; usa la dirección que muestra la consola |
| **La página sale en blanco** | Recarga con Ctrl + F5; revisa la consola del navegador |
| **Los cambios no aparecen** | Guarda el archivo y confirma que el servidor sigue activo |
| **Se detuvo el servidor** | Vuelve a ejecutar npm run dev |

> **CONSEJO — Comprueba las cinco pestañas**
> Inicio, 1. Carga de aparatos, 2. Resultado, 3. Guía de instalación y 4. Presupuesto. Si las cinco responden, el despliegue local está correcto.

- [ ] La aplicación abre en la dirección indicada por Vite.
- [ ] El encabezado muestra SolarPuesto V1.0.
- [ ] Las cinco pestañas responden al clic.
- [ ] Un ejemplo carga aparatos en la tabla.
- [ ] Calcular resultado abre la pestaña 2.

# 16  Compilación y publicación

*npm run build, carpeta dist y opciones de alojamiento*

Para entregar o publicar se genera una versión estática optimizada.

*Figura 16.1. Del código fuente a la carpeta dist y al navegador del usuario.*

```text
npm run build
npm run preview
```
*Generación y comprobación local de la versión de producción*

*Tabla 16.1. Formas de publicar*

| Destino | Qué se copia | Observación |
| --- | --- | --- |
| **Equipo local** | Carpeta dist | Abrir con npm run preview |
| **Servidor web estático** | Contenido de dist | Nginx, Apache o IIS |
| **Alojamiento estático** | Contenido de dist | Sin Node.js en el servidor |
| **USB o carpeta compartida** | Proyecto completo | Incluir node_modules o ejecutar npm install |

> **IMPORTANTE — Publica el contenido de dist**
> Copia lo que hay **dentro** de `dist` y conserva la carpeta `materiales` con las fotografías; si se sirve desde una subcarpeta, ajusta la ruta base de Vite.

- [ ] npm run build termina sin errores.
- [ ] La carpeta dist contiene index.html y los recursos.
- [ ] npm run preview abre la aplicación correctamente.
- [ ] Las fotos de materiales se ven en la guía.
- [ ] Se conserva una copia del proyecto fuente y de dist.

# 17  Configuración de parámetros

*DEFAULTS, dónde cambiarlos y efecto de cada valor*

Los parámetros viven en `src/lib/formulas.js`. Cambiarlos modifica todos los cálculos, así que cualquier ajuste obliga a volver a ejecutar las pruebas.

*Tabla 17.1. Parámetros de cálculo*

| Parámetro | Por defecto | Si lo subes |
| --- | --- | --- |
| **hsp** | 4,5 | Menos paneles; riesgo de quedarte corto en días nublados |
| **eff** | 0,80 | Menos paneles; asumes un sistema más eficiente |
| **margen** | 0,25 | Más paneles y más batería; más reserva |
| **tension** | 24 | Menos Ah y menos corriente; exige otro banco |
| **dod** | 0,50 | Menos Ah, pero acorta la vida de la batería |
| **ppanel** | 450 | Menos unidades; verifica controlador y estructura |
| **vpanel** | 24 | Debe coincidir con la clase del panel comprado |

```text
export const DEFAULTS = {
  hsp: 4.5, eff: 0.8, margen: 0.25, tension: 24,
  dod: 0.5, ppanel: 450, vpanel: 24
};
```
*src/lib/formulas.js — valores de referencia*

> **ATENCION — Cualquier cambio exige volver a probar**
> Tras editar los parámetros ejecuta `npm test`. Los cinco casos de referencia y las 113 pruebas están calibrados con los valores por defecto; un cambio sin verificación deja la documentación y el presupuesto desactualizados.

> **NOTA — Precios y TRM**
> Los precios referenciales están en `src/components/Presupuesto.jsx` y usan una TRM aproximada de 4.000 COP por dólar. No son una cotización.

# 18  Pruebas y verificación de la entrega

*Suite de 113 pruebas, comandos y build de producción*

La entrega final se verificó con una suite automatizada en verde, caja negra sobre la interfaz real y una compilación de producción exitosa.

*Tabla 18.1. Distribución de la suite*

| Archivo / nivel | Pruebas | Qué cubre |
| --- | --- | --- |
| **formulas.test.js** | 31 | Modelo de cálculo y redondeos |
| **validaciones.test.js** | 26 | Reglas V-01 a V-07 |
| **almacen.test.js** | 15 | localStorage y migración 12 → 24 V |
| **Componentes** | 6 | Tabla, resultado, guía y navegación |
| **Caja negra** | 35 | Flujo completo solo con <App /> |
| **Total** | 113 | 113 aprobadas, 0 fallidas, 5,62 s |

| Valor | Indicador |
| --- | --- |
| **113** | pruebas en verde |
| **43** | módulos en el build |
| **0** | defectos abiertos |

```text
npm test
npm run test:e2e:rapido
npm run build
```
*Comandos de verificación*

El build de producción generó 43 módulos en 936 ms. El único defecto funcional encontrado, DEF-01, afectaba la guía de instalación: tras calcular, el resumen mostraba «Sin calcular» y el diagrama mostraba `NaN`. Se corrigió el contrato de salida del módulo de dimensionamiento y se agregó una prueba de regresión.

> **CONSEJO — Verifica también lo visible**
> Las nueve capturas de `Evidencias_Pruebas` muestran inicio, tabla vacía, tabla cargada, resultado, guía, presupuesto y resumen de errores. Compáralas con tu instalación.

# 19  Datos, privacidad y copia

*localStorage, migración de parámetros y responsabilidades*

La aplicación no tiene servidor: todo queda en el navegador del equipo que la usa. Eso simplifica el despliegue y define quién cuida los datos.

*Tabla 19.1. Comportamiento de los datos*

| Dato | Dónde | Detalle |
| --- | --- | --- |
| **Tabla de aparatos** | localStorage | Clave solarpuesto:v1 |
| **Parámetros** | localStorage | Misma clave, dentro del estado |
| **Versión del formato** | localStorage | PARAMETROS_VERSION = 2 |
| **Estados antiguos de 12 V** | Se migran | Se re-siembra solo tension = 24 V |
| **Resultado y presupuesto** | No se guardan | Se recalculan con la tabla y los parámetros |
| **Datos personales** | No existen | Sin cuentas, sin analítica, sin backend |

- Cambiar de navegador o de equipo **no traslada** la tabla.
- Borrar los datos del navegador **borra** la tabla guardada.
- En un equipo compartido, pulsa **Vaciar todo** al terminar.
- No hay copia remota: si el equipo se daña, la tabla se pierde.

> **PRIVACIDAD — La copia la haces tú**
> Guarda un PDF del resultado o una captura de la tabla antes de cerrar un trabajo importante. Es la única forma de conservar el escenario fuera del navegador.

> **NOTA — Migración 12 → 24 V**
> El Acta No. 005 cambió la tensión del banco a 24 V (D-07). Al abrir un estado antiguo, la aplicación ajusta solo ese parámetro y conserva la tabla y el resto de la configuración.

# 20  Solución de problemas de despliegue

*Diagnóstico por síntoma y acciones concretas*

Casi todos los problemas de puesta en marcha tienen una causa verificable. Anota siempre el mensaje exacto antes de cambiar algo.

*Tabla 20.1. Diagnóstico de despliegue*

| Síntoma | Causa probable | Acción |
| --- | --- | --- |
| **Página en blanco** | Se abrió index.html directamente | Usar npm run dev o servir dist |
| **EADDRINUSE / puerto ocupado** | Otro proceso usa 5173 | Aceptar el puerto que propone Vite o cerrar el proceso |
| **npm install falla** | Sin internet, permisos o PATH | Revisar Node.js y repetir en carpeta del usuario |
| **npm run build falla** | Dependencias incompletas o error de código | Repetir npm install y leer el primer error |
| **npm test falla** | Se cambió un parámetro o un módulo | Revisar el cambio y comparar con los 5 casos |
| **Las fotos no aparecen** | Falta public/materiales en dist | Copiar la carpeta de recursos |
| **La tabla desapareció** | Otro navegador o datos borrados | Volver a cargar un ejemplo |
| **El índice de este manual no coincide** | Índice sin actualizar | Regenerar el índice |

> **CONSEJO — Un reporte útil ahorra tiempo**
> Indica el comando ejecutado, el mensaje completo, la versión de Node.js y el navegador. «No funciona» no permite reproducir nada.

- [ ] Anoté el comando y el mensaje exacto del error.
- [ ] Verifiqué node -v y npm -v.
- [ ] Confirmé la carpeta desde la que ejecuto los comandos.
- [ ] Probé con un ejemplo de referencia antes de editar datos.
- [ ] Conservé una copia del estado que sí funcionaba.

# A  Comandos de referencia

*Scripts de package.json y su uso*

```text
npm install              # instalar dependencias (primera vez)
npm run dev             # servidor de desarrollo, puerto 5173
npm run build           # genera la carpeta dist
npm run preview         # sirve dist localmente
npm test                # suite Vitest: 113 pruebas
npm run test:watch      # pruebas en modo observación
npm run test:ui         # interfaz de Vitest
npm run test:e2e        # Playwright con navegador visible
npm run test:e2e:rapido # Playwright sin interfaz
npm run test:e2e:report # abre el reporte de evidencias
```
*Scripts disponibles en app/package.json*

*Tabla A.1. Comandos esenciales*

| Comando | Cuándo usarlo |
| --- | --- |
| **npm run dev** | Durante el desarrollo o una demostración |
| **npm run build** | Antes de publicar o entregar |
| **npm test** | Después de cualquier cambio en fórmulas o parámetros |
| **npm run preview** | Para comprobar la versión de producción |

# B  Estructura del proyecto

*Dónde está cada pieza*

```text
app/
  index.html
  package.json
  vite.config.js
  LEEME.md
  public/materiales/        # 8 fotografías con licencia
  src/
    App.jsx                 # navegación de 5 pestañas
    lib/formulas.js         # DEFAULTS y dimensionar()
    lib/validaciones.js     # reglas V-01 a V-07
    lib/almacen.js          # localStorage, clave solarpuesto:v1
    lib/casos.js            # 5 casos de referencia
    lib/guiaInstalacion.js  # pasos de montaje y materiales
    components/            # Inicio, Carga, Resultado, Guia, Presupuesto
  dist/                    # salida de npm run build
```
*Árbol de carpetas de la aplicación*

*Tabla B.1. Rutas importantes*

| Ruta | Contenido |
| --- | --- |
| **src/lib** | Módulos puros de cálculo, validación y persistencia |
| **src/components** | Componentes React de las cinco pestañas |
| **public/materiales** | Fotografías de Wikimedia Commons con crédito |
| **Evidencias_Pruebas** | Nueve capturas de la fase de pruebas |
| **dist** | Versión estática lista para publicar |

# C  Glosario técnico

*Términos del sistema y del despliegue*

*Tabla C.1. Glosario*

| Término | Significado |
| --- | --- |
| **HSP** | Horas solar pico: horas equivalentes de sol a intensidad máxima |
| **Wp** | Vatio pico: potencia nominal de un panel en condiciones estándar |
| **DOD** | Profundidad de descarga: fracción de la batería que se puede usar |
| **Ah** | Amperio-hora: capacidad de carga del banco |
| **CC / DC** | Corriente continua: panel, controlador y batería |
| **CA / AC** | Corriente alterna: salida del inversor hacia los aparatos |
| **MC4** | Conector estándar para cableado de paneles solares |
| **DPS** | Dispositivo de protección contra sobretensiones |
| **PWM / MPPT** | Tecnologías de regulación del controlador de carga |
| **RETIE** | Reglamento Técnico de Instalaciones Eléctricas de Colombia |
| **SPA** | Single Page Application: aplicación de una sola página |
| **Vite** | Empaquetador y servidor de desarrollo |
| **Vitest / jsdom** | Motor de pruebas y entorno DOM simulado |
| **localStorage** | Almacenamiento local del navegador, sin servidor |
| **TRM** | Tasa de cambio usada para los precios referenciales en COP |

# D  Lista de verificación de despliegue

*De cero a aplicación publicada*

- [ ] Node.js y npm responden en la terminal.
- [ ] Ejecuté npm install sin errores.
- [ ] npm test reporta 113 pruebas aprobadas.
- [ ] npm run dev abre la aplicación en localhost:5173.
- [ ] Las cinco pestañas responden y un ejemplo carga datos.
- [ ] npm run build genera dist sin errores.
- [ ] npm run preview sirve la versión de producción.
- [ ] Las fotografías de materiales se visualizan en la guía.
- [ ] Copié el contenido de dist al destino de publicación.
- [ ] Conservé una copia del proyecto fuente y del resultado.
- [ ] Registré las mediciones iniciales del sistema solar.
- [ ] La instalación eléctrica fue revisada por un técnico competente.

## Control de versiones del documento

El producto conserva el nombre «V1.0» porque es la versión entregada. La edición del documento cambia cuando cambia su contenido o su diseño.

*Tabla. Historial del documento*

| Versión | Fecha | Cambio |
| --- | --- | --- |
| **1.0** | 06/11/2026 | Versión inicial, alineada con SolarPuesto V1.0 y la suite de 113 pruebas. |
| **2.0** | 06/11/2026 | Edición diseñada: contenido reescrito, identidad visual de la aplicación, diagramas propios, fichas de material y estructura editorial. |

### Trazabilidad con el proyecto

- Los valores de referencia provienen de los cinco casos del **Acta de Reunión No. 002**.
- El controlador de carga y el cambio de tensión a 24 V provienen del **Acta No. 005** (D-06 y D-07).
- La suite de **113 pruebas** y el cierre de defectos están en el Informe de Pruebas de la fase de entrega.
- La entrega final se registra en el **Acta No. 007**, del 06/11/2026.

> **NOTA — Sobre el pie de la aplicación**
> La versión evaluada muestra en su pie la fase de desarrollo y el acta de la sesión de trabajo. Este manual no modifica la aplicación: documenta su comportamiento tal como se entregó.

Para citar este documento: Heyner Alberto Aldana Herrera. Manual de Instalación — SolarPuesto V1.0. SP-MI-002, edición 2.0. Neiva, Huila, 06/11/2026.

## Para cerrar

La instalación termina cuando el sistema funciona, el usuario sabe operarlo y existe un registro de las mediciones. No termina cuando se conecta el último cable.

La Parte I protege el equipo y a las personas; la Parte II protege la aplicación y los datos. Las dos importan: un sistema bien montado con una aplicación mal publicada sigue siendo una entrega incompleta.

> Primero la seguridad, después la energía y al final la prisa.
> — Regla de trabajo del proyecto

## Créditos y licencias

Este manual fue escrito para el proyecto SolarPuesto V1.0. Las capturas de pantalla provienen de la aplicación y se usan como evidencia funcional. Las fotografías de materiales provienen de Wikimedia Commons y conservan el crédito y la licencia indicados en cada ficha.

*Tabla. Procedencia de los recursos gráficos*

| Recurso | Origen | Uso |
| --- | --- | --- |
| **Capturas de la aplicación** | Evidencias de la fase de pruebas | Ilustrar pantallas y estados reales |
| **Fotografías de materiales** | Wikimedia Commons | Mostrar componentes reales con su licencia |
| **Diagramas y portadas** | Producción propia para esta edición | Explicar el sistema y la interfaz |
| **Tipografía** | Segoe UI (Microsoft) | Composición del documento |

Las marcas y nombres comerciales que aparecen en las fotografías pertenecen a sus respectivos titulares y se muestran con fines educativos.
