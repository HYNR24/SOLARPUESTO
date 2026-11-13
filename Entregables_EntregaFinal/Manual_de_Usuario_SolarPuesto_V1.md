# Manual de Usuario — SolarPuesto V1.0

*SolarPuesto V1.0 — Calculadora de potencia y material para puestos de comercio informal*

**Código:** SP-MU-002 · **Edición:** 2.0 — Edición diseñada · **Fecha:** 06/11/2026

**Autor:** Heyner Alberto Aldana Herrera · **Docente:** Miguel Antonio Urbano Silva · **Asignatura:** Ingeniería de Software II (XP — TDD)

---

## Acerca de este manual

Este documento explica, en lenguaje claro y con apoyo visual, todo lo necesario para usar SolarPuesto en un puesto de comercio informal: desde el primer cálculo hasta la lectura del presupuesto, pasando por la guía de instalación y el manejo de los datos.

Está escrito para leerse con el puesto delante y la aplicación abierta. No supone conocimientos de electricidad ni de programación; cuando un concepto técnico aparece por primera vez, se explica en el glosario y se relaciona con una decisión concreta.

### Ficha del documento

| Campo | Valor |
| --- | --- |
| **Documento** | Manual de Usuario — SolarPuesto V1.0 |
| **Código** | SP-MU-002 |
| **Edición** | 2.0 — Edición diseñada |
| **Fecha** | 06/11/2026 |
| **Autor** | Heyner Alberto Aldana Herrera |
| **Docente** | Miguel Antonio Urbano Silva |
| **Asignatura** | Ingeniería de Software II (XP — TDD) |
| **Entregable** | Manual de usuario — Fase de pruebas y entrega final |
| **Público** | Vendedores de comercio informal, docentes y evaluadores del proyecto |
| **Alcance** | Uso de la aplicación: configuración, carga de aparatos, lectura del resultado, guía de instalación, presupuesto, privacidad y solución de dudas. |

### Qué encontrarás

- **Guía de operación:** qué hace la aplicación, cómo se recorre y cómo se registra un puesto real.
- **Criterios de cálculo:** qué significa cada parámetro, por qué existe y cómo afecta el resultado.
- **Lectura del dimensionamiento:** paneles, batería, inversor y controlador explicados uno por uno.
- **Guía ilustrada y presupuesto:** cómo usar la guía de instalación y cómo interpretar los costos.
- **Soporte:** buenas prácticas, preguntas frecuentes, privacidad y un ejemplo completo verificable.

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

- **1  Conoce SolarPuesto**
  - 1.1  Qué es y qué problema resuelve
  - 1.2  A quién está dirigida
  - 1.3  Qué puedes hacer con la aplicación
  - 1.4  Qué no hace
  - 1.5  Cómo funciona en cuatro pasos
  - 1.6  El sistema solar que hay detrás
  - 1.7  Qué necesitas para empezar
- **2  Instalación y acceso**
  - 2.1  Requisitos
  - 2.2  Cómo abrir la aplicación
  - 2.3  Primera sesión, paso a paso
  - 2.4  Si la aplicación no carga
  - 2.5  Lista de verificación del primer arranque
- **3  Recorrido por la interfaz**
  - 3.1  Mapa general
  - 3.2  Encabezado
  - 3.3  Navegación
  - 3.4  La pestaña Inicio
  - 3.5  Estados: sin datos y con datos
  - 3.6  El pie de página
  - 3.7  Imprimir y guardar en PDF
- **4  Configura los parámetros**
  - 4.1  Dónde están
  - 4.2  Los siete parámetros
  - 4.3  Horas pico solar: el parámetro que más mueve el resultado
  - 4.4  Eficiencia y margen de pérdidas
  - 4.5  Tensión y profundidad de descarga
  - 4.6  Panel: potencia y voltaje de trabajo
  - 4.7  Método de ajuste
  - 4.8  Restaurar los valores
- **5  Paso 1: registra los aparatos**
  - 5.1  Prepara los datos antes de escribir
  - 5.2  Cargar un ejemplo
  - 5.3  Añadir, editar, eliminar y vaciar
  - 5.4  Tipos de uso
  - 5.5  Horario y consumo nocturno
  - 5.6  Cómo se calcula el uso total
  - 5.7  Validaciones de la tabla
  - 5.8  Autoguardado y privacidad
  - 5.9  Antes de pulsar Calcular
- **6  Paso 2: lee el resultado**
  - 6.1  Calcular
  - 6.2  Los tres indicadores
  - 6.3  Desglose por aparato
  - 6.4  Parámetros en la misma pantalla
  - 6.5  Dimensionamiento del sistema solar
    - Paneles fotovoltaicos
    - Banco de baterías
    - Inversor
    - Controlador de carga
  - 6.6  La garantía del dimensionamiento
  - 6.7  Ejemplo completo: Puesto de jugos
  - 6.8  Imprimir o guardar en PDF
  - 6.9  Interpretar situaciones raras
- **7  Paso 3: usa la guía de instalación**
  - 7.1  Qué es y cómo se navega
  - 7.2  Antes y después de calcular
  - 7.3  Los diez pasos
  - 7.4  El diagrama del sistema
  - 7.5  Materiales con fotos reales
  - 7.6  Llevar la guía al puesto
- **8  Paso 4: interpreta el presupuesto**
  - 8.1  Cuándo se habilita
  - 8.2  Cómo se compone
  - 8.3  Ejemplo: Puesto de jugos
  - 8.4  Cómo cambia el total
  - 8.5  Cómo cotizar con este presupuesto
- **9  Buenas prácticas de operación**
  - 9.1  Rutina diaria
  - 9.2  Rutina semanal y mensual
  - 9.3  Eficiencia en el puesto
  - 9.4  Bitácora de operación
  - 9.5  Señales de alerta
  - 9.6  Cuándo volver a calcular
- **10  Problemas y preguntas frecuentes**
  - 10.1  Diagnóstico rápido
  - 10.2  Preguntas frecuentes
    - ¿Por qué no avanza al resultado?
    - ¿Por qué la batería cambia tanto al modificar la tensión?
    - ¿Por qué el número de paneles no coincide con la división exacta?
    - ¿La guía reemplaza a un instalador?
    - ¿Puedo usar la aplicación sin internet?
    - ¿Dónde quedó mi tabla?
    - ¿Por qué el presupuesto dice «precios referenciales»?
    - ¿Puedo cambiar la TRM o los precios?
    - ¿Qué pasa si mi puesto usa 110 V y el inversor entrega 120 V?
    - ¿Los datos se envían a algún servidor?
  - 10.3  Errores de validación
  - 10.4  Cómo reportar un problema
- **11  Privacidad y manejo de los datos**
  - 11.1  Qué se guarda
  - 11.2  Qué no se envía
  - 11.3  Equipos compartidos
  - 11.4  Cómo borrar los datos
  - 11.5  Modo privado y almacenamiento bloqueado
  - 11.6  Migración de datos antiguos
- **12  Glosario**
- **A  Ejemplo completo: Puesto de jugos**
  - A.1  Entrada
  - A.2  Resultado
  - A.3  Cómo reproducirlo
- **B  Los cinco casos de referencia**
- **C  Lista de verificación de una sesión completa**

# 1  Conoce SolarPuesto

*Qué es, para qué sirve y dónde están sus límites*

SolarPuesto es una calculadora. No vende, no instala y no reemplaza al técnico: convierte la lista de aparatos de un puesto en un dimensionamiento solar y en un presupuesto referencial. Entender esa diferencia es la base para usarla bien.

## 1.1  Qué es y qué problema resuelve

Un puesto de comercio informal suele armarse por partes: primero la licuadora, luego una luz, después el datáfono y el celular. Cuando llega el momento de comprar paneles y baterías, la decisión se toma a ojo o copiando el equipo del vecino. El resultado típico es un sistema que se queda corto a media jornada o que se compró más grande de lo necesario.

SolarPuesto reemplaza esa intuición por un cálculo reproducible. Toma la potencia real de cada aparato, el tiempo que se usa y el momento del día; calcula la energía diaria y el consumo nocturno; y traduce esos números en paneles, baterías, inversor y controlador. Después muestra una guía de montaje y un presupuesto en pesos colombianos.

| Valor | Indicador |
| --- | --- |
| **5** | casos de referencia |
| **113** | pruebas en verde |
| **0** | datos enviados |

*Tabla 1.1. Qué cambia al usar la aplicación*

| Sin SolarPuesto | Con SolarPuesto |
| --- | --- |
| Se compra por intuición o por imitación. | Se calcula con la potencia y el uso reales. |
| No se sabe si la batería aguanta la noche. | El consumo nocturno se calcula aparte. |
| El material se compra en varias rondas. | El dimensionamiento y el presupuesto salen juntos. |
| El error se descubre cuando el puesto se apaga. | El error se detecta antes de comprar. |

## 1.2  A quién está dirigida

- **Al vendedor o vendedora:** necesita saber qué comprar y cómo operar el sistema sin depender de un técnico para cada duda.
- **Al instalador:** necesita el dimensionamiento exacto y el orden de montaje antes de llegar al puesto.
- **Al docente o evaluador:** necesita reproducir los cálculos y verificar que la aplicación responde con datos reales.
- **Al estudiante:** necesita un caso concreto para entender cómo se relacionan potencia, energía, autonomía y costo.

No se requieren conocimientos de electricidad. Cuando aparece un término técnico, el capítulo 12 lo define y el contexto explica para qué se usa.

## 1.3  Qué puedes hacer con la aplicación

- Registrar los aparatos del puesto con potencia, cantidad, tipo de uso y horario.
- Partir de cinco ejemplos reales y editarlos hasta que representen tu negocio.
- Obtener potencia instalada, energía diaria y consumo nocturno en un solo cálculo.
- Dimensionar paneles, banco de baterías, inversor y controlador con criterios explícitos.
- Leer una guía de instalación personalizada, con diagramas, pasos y fotos de materiales.
- Consultar un presupuesto referencial por grupos de costo y en pesos colombianos.
- Imprimir el resultado o guardarlo como PDF para llevarlo al proveedor.
- Conservar la tabla y los parámetros en el navegador para la próxima visita.

## 1.4  Qué no hace

> **ATENCION — Los límites también son parte del resultado**
> SolarPuesto no reemplaza al electricista, no certifica la instalación y no garantiza precios. Tampoco mide el consumo real de tus aparatos: usa el dato de la etiqueta y el tiempo que tú indicas. Si el dato de entrada es incorrecto, el resultado también lo será.

- **No es una cotización:** el presupuesto es referencial y no incluye IVA, transporte ni mano de obra real.
- **No es un estudio eléctrico:** no calcula calibres definitivos, caídas de tensión ni protecciones específicas.
- **No reemplaza la normativa:** la instalación debe cumplir el RETIE y las normas locales.
- **No mide aparatos:** la potencia se toma de la etiqueta o del manual del fabricante.
- **No guarda en la nube:** los datos quedan en el navegador del equipo que usas.

## 1.5  Cómo funciona en cuatro pasos

El flujo de la aplicación sigue el mismo orden en que se toma una decisión de compra: primero se conocen los aparatos, luego se calcula la energía, después se dimensiona el equipo y al final se estima el costo.

*Figura 1.1. Del registro de aparatos al presupuesto. Los tres primeros pasos son técnicos; el cuarto es una estimación de mercado.*

1. **Registra** cada aparato con su potencia real y su uso diario. Es la única entrada manual del sistema.
2. **Calcula** la energía diaria y el consumo nocturno. La aplicación lo hace al instante, pero el resultado se abre al pulsar **Calcular resultado**.
3. **Dimensiona** paneles, batería, inversor y controlador aplicando eficiencia, margen y profundidad de descarga.
4. **Presupuesta** el material con precios referenciales y una TRM aproximada de 4.000 COP por dólar.

## 1.6  El sistema solar que hay detrás

La aplicación no inventa el sistema: lo dimensiona. El recorrido físico siempre es el mismo, cambie el tamaño del puesto o el número de paneles.

*Figura 1.2. Recorrido de la energía. El panel y la batería trabajan en corriente continua; el inversor entrega corriente alterna a los aparatos.*

Durante el día, el panel produce y el controlador carga la batería mientras alimenta las cargas. De noche, el panel deja de producir y la batería entrega la energía al inversor. Ese reparto es la razón por la que la aplicación calcula por separado el consumo nocturno.

## 1.7  Qué necesitas para empezar

- [ ] La etiqueta de potencia de cada aparato (vatios reales).
- [ ] Una idea del tiempo de uso: minutos por uso, horas encendido o ciclo del compresor.
- [ ] El horario: si el aparato se usa de día, de noche o en ambos momentos.
- [ ] Un navegador actualizado y la dirección de la aplicación.
- [ ] Diez minutos para la primera carga de datos.

> **CONSEJO — Empieza con un ejemplo**
> Si no conoces todos los datos, carga el ejemplo más parecido a tu puesto y edítalo. Es más rápido corregir una tabla llena que llenar una vacía.

# 2  Instalación y acceso

*Requisitos, primer arranque y solución de carga*

La aplicación funciona en el navegador: no se instala en el celular ni en el computador y no pide registro. Este capítulo explica cómo abrirla correctamente y qué hacer si la primera pantalla no aparece.

## 2.1  Requisitos

*Tabla 2.1. Requisitos de uso*

| Requisito | Mínimo | Recomendado |
| --- | --- | --- |
| **Navegador** | Chrome, Edge, Firefox o Safari actualizado | Última versión estable |
| **Conexión** | Solo para la primera carga si está publicada | Conexión estable para cargar la app |
| **Pantalla** | 320 px de ancho (celular) | Tableta o computador para leer tablas |
| **Permisos** | Ninguno especial | Almacenamiento local habilitado |
| **Cuenta** | No requiere | No requiere |

La aplicación no necesita cámara, micrófono, ubicación ni notificaciones. Si el navegador bloquea el almacenamiento local, la aplicación sigue calculando, pero no conserva la tabla al cerrar.

## 2.2  Cómo abrir la aplicación

Usa la dirección que te haya entregado el responsable del proyecto. Si estás ejecutando la versión de desarrollo en tu computador, la dirección habitual es:

```text
http://localhost:5173
```
*Dirección local de Vite en modo desarrollo*

> **ATENCION — No abras index.html con doble clic**
> La aplicación necesita un servidor. Si abres el archivo directamente, la página puede quedar en blanco o no cargar los módulos. Usa la dirección que entrega la terminal al ejecutar `npm run dev` o la dirección publicada del proyecto.

En un celular, abre la misma dirección en el navegador. Para mayor comodidad, guárdala como marcador o agrégala a la pantalla de inicio; no es una aplicación nativa, así que el acceso directo abre el navegador.

## 2.3  Primera sesión, paso a paso

1. Abre la dirección y espera a que aparezca el encabezado **SolarPuesto V1.0**.
2. Revisa que las cinco pestañas estén visibles: Inicio, 1. Carga de aparatos, 2. Resultado, 3. Guía de instalación y 4. Presupuesto.
3. Entra a **1. Carga de aparatos** y pulsa un ejemplo parecido a tu puesto.
4. Ajusta potencias, cantidades, tipos de uso y horarios hasta que la tabla represente tu jornada.
5. Pulsa **Calcular resultado**, revisa las tres tarjetas y continúa con la guía y el presupuesto.

> **IMPORTANTE — El orden importa**
> La guía y el presupuesto se generan a partir del cálculo. Si cambias un aparato después de calcular, vuelve a pulsar **Calcular resultado** antes de tomar decisiones de compra.

## 2.4  Si la aplicación no carga

*Tabla 2.2. Problemas de acceso*

| Síntoma | Causa probable | Qué hacer |
| --- | --- | --- |
| **Página en blanco** | Se abrió el archivo index.html directamente | Usa la dirección del servidor o `npm run dev` |
| **Error de conexión** | El servidor local está apagado o cambió de puerto | Revisa la terminal y usa la dirección que muestra |
| **No aparecen las pestañas** | Carga incompleta o caché vieja | Recarga con Ctrl + F5 y vuelve a abrir |
| **La tabla no se conserva** | Modo privado o almacenamiento bloqueado | Usa una ventana normal y permite el almacenamiento |
| **Se ve desordenado en el celular** | Zoom o pantalla muy angosta | Gira el equipo, ajusta el zoom o usa una pantalla mayor |

Si el problema persiste, anota la dirección, el navegador y el mensaje exacto. Esa información permite reproducir la falla y evita respuestas ambiguas.

## 2.5  Lista de verificación del primer arranque

- [ ] La aplicación abre y muestra el encabezado con la versión.
- [ ] Las cinco pestañas responden al clic.
- [ ] Un ejemplo carga aparatos en la tabla.
- [ ] El botón Calcular resultado abre la pestaña 2.
- [ ] La tabla sigue ahí después de recargar la página.

> **NOTA — Sin registro ni contraseña**
> No existe una cuenta de usuario. La «sesión» es el estado guardado en el navegador. Cambiar de navegador o de equipo equivale a empezar de cero.

# 3  Recorrido por la interfaz

*Cinco pestañas y un flujo de trabajo*

La pantalla tiene cuatro zonas fijas y un contenido que cambia según la pestaña. Conocerlas evita buscar funciones donde no están y permite saber en qué paso del flujo te encuentras.

## 3.1  Mapa general

*Figura 3.1. Zonas de la pantalla: encabezado, navegación, contenido y pie. La pestaña activa se resalta en ámbar.*

## 3.2  Encabezado

El encabezado identifica la aplicación y su versión. El nombre **SolarPuesto** y la etiqueta **V1.0** permiten verificar que estás usando la versión documentada. El subtítulo recuerda el propósito: calcular potencia y material para puestos de comercio informal.

El icono del sol no es un botón: es parte de la identidad visual. No cambia el tema ni abre un menú.

## 3.3  Navegación

*Tabla 3.1. Las cinco pestañas*

| Pestaña | Qué muestra | Cuándo usarla |
| --- | --- | --- |
| **Inicio** | Explicación del flujo, accesos directos y diagrama general. | Primera visita o para orientarte. |
| **1. Carga de aparatos** | Ejemplos, tabla editable, validaciones y botón Calcular. | Siempre que cambie un aparato o su uso. |
| **2. Resultado** | Indicadores, desglose, parámetros, dimensionamiento e impresión. | Después de calcular y antes de comprar. |
| **3. Guía de instalación** | Carrusel con 8 o 10 pasos, diagrama, materiales y recomendaciones. | Antes y durante el montaje. |
| **4. Presupuesto** | Ocho grupos de costo y total estimado en COP. | Para planear la compra y cotizar. |

> **NOTA — El orden de las pestañas es el orden del trabajo**
> No es una recomendación estética: la guía y el presupuesto dependen de la tabla y del cálculo. Saltar pasos produce estados «sin calcular».

## 3.4  La pestaña Inicio

Inicio explica el flujo en tres pasos y ofrece dos accesos directos: empezar con la tabla de aparatos o abrir la guía de instalación. También muestra un diagrama general del sistema solar y recuerda que los datos se guardan en el navegador.

*Figura 3.2. Pantalla de Inicio. Los accesos directos llevan a la carga o a la guía sin pasar por el menú.*

## 3.5  Estados: sin datos y con datos

*Tabla 3.2. Qué cambia cuando existe un dimensionamiento*

| Pestaña | Sin cálculo | Con cálculo |
| --- | --- | --- |
| **2. Resultado** | Muestra guiones y un aviso para agregar aparatos. | Muestra indicadores, desglose y material. |
| **3. Guía** | Portada y diagrama en espera; contador de 8 pasos. | Diez pasos con diagrama, materiales y recomendaciones. |
| **4. Presupuesto** | Estado de espera y enlace a la carga. | Ocho grupos de costo y total en COP. |

El estado «sin datos» no es un error: es una invitación a completar la tabla. La aplicación no inventa consumos ni muestra cifras parciales como si fueran definitivas.

## 3.6  El pie de página

El pie identifica la fase del proyecto y el acta de la sesión de trabajo. Es información de trazabilidad académica, no un dato técnico del sistema. La versión del producto permanece en el encabezado.

## 3.7  Imprimir y guardar en PDF

El botón **Imprimir / PDF** de la pestaña Resultado abre el diálogo de impresión del navegador. Desde allí puedes imprimir en papel o elegir «Guardar como PDF».

1. Abre **2. Resultado** con el cálculo ya hecho.
2. Pulsa **Imprimir / PDF**.
3. En el destino, elige la impresora o «Guardar como PDF».
4. Desactiva encabezados y pies del navegador si quieres un documento más limpio.
5. Revisa la vista previa: la tabla de desglose y el dimensionamiento deben caber completos.

> **CONSEJO — Un PDF por escenario**
> Si estás comparando dos configuraciones, guarda un PDF por cada una con un nombre claro (por ejemplo, `jugos-24V-450Wp.pdf`). Así puedes mostrar el efecto de un cambio sin volver a escribir la tabla.

# 4  Configura los parámetros

*Los siete valores que adaptan el cálculo a tu zona*

Los parámetros no son un adorno técnico: cambian el tamaño del sistema y el presupuesto. Se editan en la pestaña Resultado y se recalculan al instante. La regla de oro es mover un solo parámetro a la vez y observar el efecto.

## 4.1  Dónde están

Desplázate en **2. Resultado** hasta la tarjeta **Parámetros configurables**. Cada campo tiene una etiqueta, un valor y un límite. Los cambios se guardan automáticamente y afectan el dimensionamiento y el presupuesto de inmediato.

> **IMPORTANTE — No necesitas volver a cargar la tabla**
> Si cambias un parámetro, la aplicación recalcula con los mismos aparatos. Vuelve a la pestaña 1 solo si cambió un aparato, una cantidad o un horario.

## 4.2  Los siete parámetros

*Tabla 4.1. Parámetros configurables y su efecto*

| Parámetro | Por defecto | Rango | Qué controla |
| --- | --- | --- | --- |
| **Horas pico solar (HSP)** | 4,5 h | 1 a 8 | Horas de sol útil de la zona. Más HSP, menos paneles. |
| **Eficiencia del sistema** | 0,80 | 0,20 a 1,00 | Pérdidas por cableado, temperatura y equipos. |
| **Margen de pérdidas** | 25 % | 0 a 100 % | Reserva adicional para imprevistos y degradación. |
| **Tensión de la batería** | 24 V | 12 a 48 V | Tensión nominal del banco y base del cálculo en Ah. |
| **Profundidad de descarga (DOD)** | 50 % | 10 a 90 % | Parte de la batería que se puede usar sin dañarla. |
| **Potencia del panel** | 450 Wp | 50 a 550 Wp | Potencia del panel comercial que vas a comprar. |
| **Voltaje del panel** | 24 V | 12 a 48 V | Tensión nominal de trabajo del panel. |

## 4.3  Horas pico solar: el parámetro que más mueve el resultado

Las HSP no son las horas de luz del día: son las horas equivalentes a plena intensidad solar. En Neiva el valor de trabajo es **4,5 h**; en zonas con nubosidad frecuente puede bajar a 4 h. Si el panel recibe sombra parte del día, el valor efectivo es menor.

*Tabla 4.2. Cómo elegir las HSP*

| Situación | HSP sugerido | Efecto |
| --- | --- | --- |
| Neiva, cielo despejado | 4,5 | Valor de referencia del proyecto |
| Zona con nubes parciales | 4,0 | Más paneles para la misma energía |
| Sombra parcial durante la mañana | 3,5 a 4,0 | El sistema crece; conviene corregir la sombra |
| Sombra la mayor parte del día | No usar la app como excusa | Reubicar el panel antes de comprar |

> **ATENCION — Subir las HSP no mejora el sistema**
> Un HSP alto reduce el número de paneles y puede dejar el sistema corto en invierno o en días nublados. Es mejor un valor conservador y verificar con la producción real.

## 4.4  Eficiencia y margen de pérdidas

La **eficiencia** representa las pérdidas del sistema: cableado, temperatura de las celdas, conversión del inversor y suciedad. El valor de 0,80 es una convención prudente para un sistema pequeño. El **margen de pérdidas** agrega una reserva adicional del 25 % sobre la energía calculada.

Los dos parámetros se multiplican en la práctica. Si bajas la eficiencia o subes el margen, el sistema crece. Si haces lo contrario, se reduce y se vuelve más sensible a los días malos.

## 4.5  Tensión y profundidad de descarga

La tensión del banco define cómo se reparte la energía. A 24 V, una batería de 147 Ah almacena la misma energía que dos de 147 Ah a 12 V en paralelo; la diferencia está en la corriente y en el calibre de los cables. El proyecto usa **24 V** porque es compatible con el panel de 450 Wp y reduce la corriente para la misma potencia.

La **DOD** es el porcentaje de la batería que se puede descargar sin acortar su vida. Con 50 %, la aplicación duplica la capacidad necesaria para no exigir el banco por debajo de la mitad. Subir la DOD reduce los Ah calculados, pero acorta la vida de la batería; bajarla la protege y encarece el sistema.

> **PELIGRO — No uses el 100 % de descarga como atajo**
> Una descarga profunda repetida destruye una batería de plomo-ácido. Si el presupuesto aprieta, reduce el consumo nocturno antes que subir la DOD.

## 4.6  Panel: potencia y voltaje de trabajo

La aplicación no elige marca ni tecnología: usa la potencia del panel comercial que piensas comprar. Con 450 Wp y 24 V, el cálculo entrega un número entero de paneles y una potencia de arreglo. Cambiar a 550 Wp puede reducir el número de unidades, pero verifica que el controlador y la estructura soporten el nuevo arreglo.

El voltaje de trabajo del panel debe ser compatible con el banco. Un panel de 24 V nominales con un banco de 12 V no es una combinación recomendable; la aplicación migra automáticamente los estados antiguos de 12 V a 24 V para evitar esa mezcla.

## 4.7  Método de ajuste

1. Anota el resultado actual: paneles, Ah, inversor, controlador y total.
2. Cambia **un solo** parámetro y observa el nuevo dimensionamiento.
3. Compara el efecto en el material y en el presupuesto, no solo en el número que tocaste.
4. Si el cambio no mejora la decisión, vuelve al valor anterior.
5. Registra el escenario elegido y el motivo en tu bitácora.

*Tabla 4.3. Errores frecuentes al configurar*

| Error | Por qué ocurre | Cómo corregirlo |
| --- | --- | --- |
| **Subir HSP para que «quepan» menos paneles** | Se confunde el deseo con el dato de la zona | Usar 4,5 para Neiva y corregir la sombra |
| **Subir DOD para reducir la batería** | Se prioriza el costo inmediato | Mantener 50 % y reducir consumo nocturno |
| **Cambiar tres parámetros a la vez** | No se puede atribuir el efecto | Mover uno y comparar |
| **Bajar la eficiencia «por seguridad»** | Se encarece el sistema sin medir | Usar 0,80 y validar con producción real |
| **Poner 12 V con panel de 450 Wp** | Se copia un esquema antiguo | Usar 24 V; la app migra estados viejos |

## 4.8  Restaurar los valores

El botón **Vaciar todo** de la pestaña 1 borra la tabla y devuelve los parámetros a sus valores por defecto. Úsalo cuando quieras empezar un escenario limpio, no para corregir un dato: para eso basta con editar el campo.

> **CONSEJO — Guarda una captura antes de vaciar**
> Si estás comparando escenarios, imprime o guarda el PDF del resultado actual. **Vaciar todo** no se puede deshacer.

# 5  Paso 1: registra los aparatos

*La entrada de datos que determina todo el cálculo*

La calidad del resultado depende de la calidad de la tabla. Este capítulo explica qué dato usar para cada aparato, cómo elegir el tipo de uso y por qué la cantidad se aplica una sola vez.

## 5.1  Prepara los datos antes de escribir

*Tabla 5.1. Datos de entrada*

| Dato | Dónde encontrarlo | Qué escribir |
| --- | --- | --- |
| **Potencia real** | Etiqueta del aparato o fuente de alimentación | El número en W; si dice 550 W, escribe 550 |
| **Cantidad** | Cuántos aparatos iguales se usan a la vez | Entero de 1 o más |
| **Tipo de uso** | Cómo se enciende y apaga | Por usos, continuo o refrigeración |
| **Horario** | Momento del día en que se usa | Día, noche o ambos |
| **Tiempo** | Minutos por uso, horas encendido o ciclo | Según el tipo de uso |

> **CONSEJO — Si no conoces la etiqueta**
> Usa un valor razonable y vuelve a calcular cuando tengas el dato exacto. Es mejor un cálculo aproximado y corregible que dejar el aparato por fuera.

## 5.2  Cargar un ejemplo

En la parte superior de la pestaña hay cinco botones con casos de referencia. Al pulsar uno, la tabla se llena con sus aparatos y valores. Todo se puede editar después: el ejemplo es un punto de partida, no una camisa de fuerza.

*Tabla 5.2. Casos de referencia*

| Ejemplo | Aparatos principales | Uso típico |
| --- | --- | --- |
| **Puesto de jugos** | Licuadora, lámparas LED, datáfono, celular y radio | Venta de jugos y bebidas |
| **Luces LED + datáfono** | Cuatro lámparas, tira LED, celular, datáfono y radio | Puesto nocturno pequeño |
| **Refrigerador pequeño** | Nevera, lámparas LED y datáfono | Venta de productos refrigerados |
| **Puesto mixto** | Licuadora, lámparas, datáfono, celular y radio | Jornada con día y noche |
| **Puesto de fritura** | Fritadora o plancha, extractor, lámparas y datáfono | Comida caliente y alto consumo |

*Figura 5.1. Tabla cargada con el ejemplo Puesto de jugos. La columna Uso total se actualiza mientras se edita.*

## 5.3  Añadir, editar, eliminar y vaciar

*Tabla 5.3. Operaciones de la tabla*

| Acción | Cómo se hace | Qué debes saber |
| --- | --- | --- |
| **Añadir** | Botón **Añadir aparato** | Agrega una fila vacía al final |
| **Editar** | Escribe directamente en la celda | El uso total se recalcula al instante |
| **Eliminar** | Botón de basura de la fila | Pide confirmación antes de borrar |
| **Vaciar todo** | Botón **Vaciar todo** | Borra tabla y parámetros; también pide confirmación |

La fila no se guarda hasta que tenga un nombre y una potencia válida. Si escribes un nombre repetido, la validación lo marca aunque cambien mayúsculas, tildes o espacios.

## 5.4  Tipos de uso

El tipo de uso define cómo se calculan las horas efectivas. Elegirlo mal es el error más común y el que más distorsiona la energía diaria.

*Tabla 5.4. Tipos de uso*

| Tipo | Cuándo usarlo | Datos que pide | Fórmula de horas |
| --- | --- | --- | --- |
| **Por usos** | Se prende y apaga varias veces: licuadora, cargador, fritadora | Minutos por uso y usos por día | min × usos ÷ 60 |
| **Continuo** | Permanece encendido: luces, radio, datáfono | Horas encendido por día | horas |
| **Refrigeración** | Neveras y equipos con compresor | Horas conectado y ciclo de trabajo | horas × (ciclo ÷ 100) |

> **ATENCION — La nevera no consume todo el tiempo**
> Un refrigerador conectado 12 horas con un ciclo del 35 % consume como si estuviera encendido 4,2 horas. Si lo registras como continuo, sobreestimas el sistema y el costo.

## 5.5  Horario y consumo nocturno

El horario no cambia la energía total del día: cambia la parte que se le exige a la batería. Un aparato usado de noche consume lo mismo que de día, pero el panel no puede cubrirlo en ese momento.

*Tabla 5.5. Efecto del horario*

| Horario | Qué implica | Ejemplo |
| --- | --- | --- |
| **Día** | El panel puede alimentarlo mientras produce | Licuadora, datáfono |
| **Noche** | La batería debe cubrirlo completo | Lámparas, radio |
| **Ambos** | Se reparte; la app lo suma al consumo nocturno | Radio encendida todo el día |

La aplicación etiqueta el consumo nocturno como «lo cubre la batería». Es una frase literal del cálculo: no significa que la batería se dimensione solo con la noche, sino que esa energía debe estar disponible cuando no hay sol.

## 5.6  Cómo se calcula el uso total

La aplicación calcula las horas efectivas por unidad y multiplica una sola vez por la cantidad. La fórmula es:

```text
Energía diaria (Wh) = potencia real (W) × cantidad × horas efectivas por unidad
```

La cantidad multiplica la potencia, no las horas. Si tienes dos licuadoras de 550 W usadas 110 minutos al día, la energía es 550 × 2 × (110 ÷ 60) = **2.016,67 Wh**, no el cuadrado de la cantidad.

*Tabla 5.6. Ejemplo de cálculo por unidad*

| Aparato | Potencia | Cantidad | Horas por unidad | Energía |
| --- | --- | --- | --- | --- |
| **Licuadora** | 550 W | 2 | 110 min = 1,83 h | 2.016,67 Wh |
| **Lámpara LED** | 10 W | 2 | 5 h | 100 Wh |
| **Radio** | 40 W | 1 | 6 h | 240 Wh |

## 5.7  Validaciones de la tabla

Antes de calcular, la aplicación revisa los datos. Si hay errores, marca los campos en rojo y muestra un resumen con el número de campos y filas afectadas. No se avanza al resultado hasta corregirlos.

*Tabla 5.7. Reglas de validación*

| Regla | Qué controla | Ejemplo que se rechaza |
| --- | --- | --- |
| **V-01** | Nombre obligatorio y único | Fila sin nombre o nombre repetido |
| **V-02** | Cantidad entera de 1 o más | 0, -1 o 1,5 |
| **V-03** | Potencia mayor que 0 W | 0 W o -5 W |
| **V-04** | En «por usos»: minutos y usos válidos | Minutos en 0 o usos en 0 |
| **V-05** | En «continuo»: horas entre 0 y 24 | 25 horas |
| **V-06** | En «refrigeración»: ciclo entre 20 % y 60 % | 10 % o 70 % |
| **V-07** | Uso total no mayor a 24 h al día | 2 minutos × 800 usos |

Los nombres se comparan sin importar mayúsculas, tildes ni espacios de más: «Lámpara LED» y «lampara led» se consideran el mismo aparato y se marcan como repetidos.

*Figura 5.2. Resumen de errores. El mensaje indica cuántos campos y filas deben corregirse antes de calcular.*

> **IMPORTANTE — Corrige el dato, no el síntoma**
> Si la aplicación rechaza una fila, revisa la etiqueta y el uso real. Cambiar el tipo de uso solo para que pase la validación produce un resultado falso y seguro.

## 5.8  Autoguardado y privacidad

Cada cambio se guarda en el navegador; al volver, la tabla sigue ahí.

> **PRIVACIDAD — Equipos compartidos**
> En un equipo prestado, pulsa **Vaciar todo** al terminar o usa una ventana privada.

## 5.9  Antes de pulsar Calcular

- [ ] Todos los aparatos del puesto están en la tabla.
- [ ] Cada potencia corresponde a la etiqueta del aparato.
- [ ] Las cantidades son enteras y reflejan el uso simultáneo.
- [ ] El tipo de uso coincide con la forma real de encender el aparato.
- [ ] El horario está definido para cada fila.
- [ ] No hay nombres repetidos ni campos en rojo.

# 6  Paso 2: lee el resultado

*Indicadores, dimensionamiento y garantía del cálculo*

El resultado no es un número único: son tres indicadores, un desglose por aparato y cuatro decisiones de material. Leerlos en orden evita comprar de más o de menos.

## 6.1  Calcular

Con la tabla completa, pulsa **Calcular resultado**. Si no hay errores, la aplicación abre la pestaña **2. Resultado**. Si hay errores, se queda en la pestaña 1 y muestra el resumen de validación.

> **NOTA — El cálculo ya estaba hecho**
> La aplicación calcula mientras escribes, pero el resultado solo se abre cuando pulsas el botón. Ese gesto es una confirmación: revisaste la tabla y aceptas usarla como entrada.

## 6.2  Los tres indicadores

| Valor | Indicador |
| --- | --- |
| **635 W** | Potencia instalada |
| **1.408 Wh** | Energía diaria |
| **340 Wh** | Consumo nocturno |

*Tabla 6.1. Lectura de los indicadores*

| Indicador | Qué significa | Cómo usarlo |
| --- | --- | --- |
| **Potencia instalada** | Suma de potencia de todos los aparatos, multiplicada por su cantidad. | Dimensiona el inversor y anticipa el pico si todo está encendido. |
| **Energía diaria** | Consumo total de una jornada según el uso real. | Dimensiona paneles y batería. |
| **Consumo nocturno** | Parte de la energía usada cuando no hay sol. | Verifica la reserva de la batería y las decisiones de horario. |

La **potencia instalada** no es lo mismo que la potencia pico. La primera suma todo; la segunda toma el aparato más grande o la suma simultánea. El inversor se elige con un margen sobre la potencia instalada para soportar el arranque.

*Figura 6.1. Resultado del ejemplo Puesto de jugos. Las tres tarjetas resumen el puesto antes del desglose.*

## 6.3  Desglose por aparato

La tabla de desglose muestra potencia, uso real diario, energía y participación porcentual. Sirve para identificar los equipos que más consumen y decidir dónde ahorrar. En un puesto de jugos, la licuadora suele ser el mayor consumo aunque se use pocos minutos.

*Tabla 6.2. Participación en el ejemplo Puesto de jugos*

| Aparato | Energía | Participación |
| --- | --- | --- |
| **Licuadora** | 1.008,33 Wh | 71,6 % |
| **Radio** | 240,00 Wh | 17,0 % |
| **Lámparas LED** | 100,00 Wh | 7,1 % |
| **Datáfono** | 45,00 Wh | 3,2 % |
| **Celular** | 15,00 Wh | 1,1 % |

La barra de participación es una ayuda visual, no una escala exacta: se dibuja con un mínimo y un máximo para que las porciones pequeñas sigan siendo visibles.

## 6.4  Parámetros en la misma pantalla

Debajo del desglose están los parámetros configurables. Si los cambias, el dimensionamiento se actualiza de inmediato. El capítulo 4 explica cada uno; aquí basta recordar que se mueve uno a la vez.

## 6.5  Dimensionamiento del sistema solar

La sección **Dimensionamiento del sistema solar** traduce la energía en material concreto. Cada decisión tiene una fórmula y un criterio de redondeo.

### Paneles fotovoltaicos

La potencia requerida se calcula con la energía diaria, las horas pico solar, la eficiencia y el margen. El número de paneles se redondea hacia arriba porque los paneles se compran completos.

```text
Wp requeridos = (energía diaria ÷ HSP) × (1 ÷ eficiencia) × (1 + margen)
N.º de paneles = techo(Wp requeridos ÷ potencia del panel)
```

Para el ejemplo de jugos: (1.408,33 ÷ 4,5) × (1 ÷ 0,80) × 1,25 = 489 Wp; 489 ÷ 450 = 1,09, que se redondea a **2 paneles** (900 Wp). La aplicación muestra la potencia requerida y la potencia del arreglo, no solo el número de unidades.

### Banco de baterías

La capacidad se calcula con la energía diaria completa, el margen del 25 %, la tensión del banco y la profundidad de descarga. La unidad resultante es amperio-hora (Ah).

```text
Ah = (energía diaria × (1 + margen)) ÷ (tensión × DOD)
```

Jugos: (1.408,33 × 1,25) ÷ (24 × 0,50) = **146,7 Ah**, que se muestra como 147 Ah. La fórmula usa la energía del día completo, no solo la nocturna; por eso el banco cubre la noche con holgura y también los días nublados.

### Inversor

La aplicación toma la mayor entre la potencia pico y la potencia instalada, y aplica un margen del 25 % para el arranque de motores y compresores.

```text
Inversor ≥ 1,25 × máximo(potencia pico, potencia instalada)
```

Jugos: 1,25 × 635 = **793,75 W**, que se muestra como ≥ 794 W. Si el puesto tiene un motor grande, el pico manda; si tiene muchos aparatos pequeños, manda la suma.

### Controlador de carga

La corriente del controlador se calcula con la potencia del arreglo, un factor de 1,25 y la tensión del banco. Luego se redondea al amperaje comercial inmediato.

```text
Corriente = (1,25 × potencia del arreglo) ÷ tensión del banco
```

Jugos: (1,25 × 900) ÷ 24 = 46,9 A; el siguiente valor comercial es **50 A**. Los amperajes comerciales usados son 10, 20, 30, 40, 50, 60, 80 y 100 A.

## 6.6  La garantía del dimensionamiento

Al final de la sección aparece un recuadro verde con la explicación del resultado. No es publicidad: es la justificación que puedes leerle al proveedor.

> **CONSEJO — Cómo leer la garantía**
> El inversor cubre la potencia pico; la batería cubre la energía diaria, incluidos los Wh nocturnos, con margen y DOD; los paneles recargan el banco dentro de las HSP. Si una de esas tres frases no se cumple en tu caso, revisa los parámetros.

## 6.7  Ejemplo completo: Puesto de jugos

*Tabla 6.3. Resultado de referencia*

| Dato | Valor |
| --- | --- |
| **Potencia instalada** | 635 W |
| **Energía diaria** | 1.408,33 Wh/día |
| **Consumo nocturno** | 340 Wh/día |
| **Paneles** | 2 × 450 Wp = 900 Wp |
| **Banco de baterías** | 24 V · 147 Ah · DOD 50 % |
| **Inversor** | ≥ 794 W |
| **Controlador** | ≥ 50 A |
| **Presupuesto estimado** | $5.769.120 COP |

Este ejemplo se puede cargar con un clic desde el botón **Puesto de jugos**. Si tu resultado coincide, la aplicación está funcionando correctamente y la tabla está bien interpretada.

## 6.8  Imprimir o guardar en PDF

1. Revisa que el cálculo esté actualizado.
2. Pulsa **Imprimir / PDF** en la parte superior del resultado.
3. Elige la impresora o «Guardar como PDF».
4. Verifica que el desglose y el dimensionamiento estén completos en la vista previa.
5. Asigna un nombre que identifique el escenario y la fecha.

> **NOTA — El PDF no reemplaza la app**
> El PDF es una foto del resultado. Si cambias la tabla, debes generar uno nuevo. No contiene fórmulas vivas ni se actualiza solo.

## 6.9  Interpretar situaciones raras

*Tabla 6.4. Casos que suelen generar dudas*

| Situación | Por qué ocurre | Qué hacer |
| --- | --- | --- |
| **0 paneles** | No hay energía diaria calculada | Revisa potencia, tiempo y tipo de uso |
| **Batería muy grande** | DOD baja o consumo diario alto | Revisa si el consumo nocturno es real |
| **Inversor mucho mayor que la potencia** | Se aplicó el margen sobre la suma | Verifica si todos los aparatos se usan a la vez |
| **Controlador salta a 50 A** | Redondeo al valor comercial | Es normal: el valor comercial siguiente |
| **El total no cambia al editar un nombre** | El nombre no afecta el cálculo | Edita potencia, tiempo o cantidad |

# 7  Paso 3: usa la guía de instalación

*Un carrusel que se adapta a tu sistema*

La guía no es un texto genérico: se arma con los valores del cálculo. Sin datos muestra una portada en espera; con datos agrega el diagrama, los materiales y las recomendaciones.

## 7.1  Qué es y cómo se navega

La pestaña **3. Guía de instalación** es un carrusel de diapositivas. Se avanza con las flechas laterales, con los puntos de la parte inferior o con las teclas de flecha del teclado. El contador indica el paso actual y el total.

- **Flecha izquierda / derecha:** paso anterior o siguiente.
- **Puntos inferiores:** salto directo a un paso.
- **Teclas ← y →:** la misma navegación sin usar el mouse.
- **Contador «Paso X de Y»:** confirma si estás antes o después del cálculo.

## 7.2  Antes y después de calcular

*Tabla 7.1. Contenido de la guía según el estado*

| Estado | Qué muestra | Total de pasos |
| --- | --- | --- |
| **Sin cálculo** | Portada, diagrama en espera y aviso para completar la tabla. | 8 |
| **Con cálculo** | Portada con resumen, diagrama personalizado, seis pasos de montaje, recomendaciones y un día de trabajo. | 10 |

Los seis pasos de montaje se pueden leer aunque no haya cálculo, pero el diagrama, las recomendaciones y el ejemplo de jornada solo aparecen cuando existe un dimensionamiento.

## 7.3  Los diez pasos

*Tabla 7.2. Secuencia completa de la guía*

| Paso | Contenido |
| --- | --- |
| **1** | Portada con el resumen personalizado: potencia pico, energía diaria, consumo nocturno y banco/inversor. |
| **2** | Diagrama único del sistema, generado con los valores del puesto. |
| **3** | Instala el panel solar. |
| **4** | Tiende el cableado. |
| **5** | Conecta el controlador de carga. |
| **6** | Arma y conecta el banco de baterías. |
| **7** | Conecta el inversor. |
| **8** | Conecta los aparatos y pon en marcha. |
| **9** | Recomendaciones para tu sistema. |
| **10** | Un día de trabajo con el sistema (ejemplo paso a paso). |

*Figura 7.1. Portada de la guía con el resumen calculado. Los valores cambian con el puesto.*

## 7.4  El diagrama del sistema

El diagrama muestra el recorrido de la energía y resume el material: número y potencia de paneles, corriente del controlador, tensión y capacidad del banco, y potencia del inversor. La leyenda distingue corriente continua, corriente alterna y panel solar.

*Figura 7.2. Diagrama generado con los valores del puesto. Es la figura que conviene imprimir y llevar al montaje.*

> **IMPORTANTE — El diagrama no es un plano eléctrico**
> Muestra la topología y el material, no el calibre definitivo de cada tramo ni la ubicación física de las protecciones. Para eso se usa el capítulo 7 del Manual de instalación y la revisión de un electricista.

## 7.5  Materiales con fotos reales

Cada paso de montaje incluye una o dos fichas de material con fotografía, descripción, crédito y licencia. La foto ayuda a reconocer el componente en la ferretería o en el kit recibido; el crédito permite reutilizarla correctamente.

- **Panel solar:** celdas y marco; verifica la potencia y la tensión de trabajo.
- **Conector MC4:** par macho/hembra para unir los cables del panel.
- **Cable solar:** rojo para positivo, negro para negativo.
- **Controlador:** debe soportar al menos la corriente calculada.
- **Batería de ciclo profundo:** capacidad y tensión según el banco.
- **Fusible ANL:** protección del cable positivo.
- **Inversor:** onda pura si hay equipos electrónicos sensibles.
- **Regleta:** reparte la salida CA entre los aparatos.

> **CONSEJO — La foto no es la marca**
> La imagen muestra un ejemplo real, no una recomendación de compra. Compara especificaciones (potencia, tensión, corriente, onda) y no solo la apariencia.

## 7.6  Llevar la guía al puesto

1. Calcula el sistema y abre la guía.
2. Imprime el diagrama o guárdalo como PDF en el celular.
3. Haz una lista de material con las cantidades del resultado.
4. Sigue los pasos en orden: panel, cableado, controlador, baterías, inversor y cargas.
5. Marca cada paso en la lista de verificación del Manual de instalación.

> **PELIGRO — La guía es un apoyo educativo**
> La instalación real debe respetar la normativa vigente y, cuando implique corriente alterna o bancos de batería grandes, debe ser revisada por un electricista certificado.

Si el puesto cambia, la guía cambia. Vuelve a la pestaña 1, actualiza la tabla y recalcula antes de reutilizar el diagrama impreso.

# 8  Paso 4: interpreta el presupuesto

*Ocho grupos de costo y un total referencial*

El presupuesto traduce el dimensionamiento a pesos colombianos. No es una cotización: es una estimación para planear la compra y comparar proveedores con el mismo alcance.

## 8.1  Cuándo se habilita

La pestaña **4. Presupuesto** muestra los costos cuando existe un cálculo válido. Si la tabla está vacía o tiene errores, aparece un estado de espera con la indicación de calcular primero en la pestaña 1.

> **NOTA — El presupuesto depende del cálculo, no del azar**
> Si cambias un aparato o un parámetro, el total cambia. Vuelve a revisar el presupuesto después de cada ajuste del dimensionamiento.

## 8.2  Cómo se compone

*Tabla 8.1. Grupos de costo*

| Grupo | Qué incluye | Cómo se calcula |
| --- | --- | --- |
| **Generación** | Paneles fotovoltaicos monocristalinos | N.º de paneles × Wp × precio por Wp |
| **Almacenamiento** | Banco de baterías AGM/Gel | Ah × precio por Ah según tensión |
| **Conversión y control** | Inversor y controlador de carga | W del inversor y A del controlador |
| **Montaje** | Estructura, rieles, anclajes y tornillería | Wp del arreglo × tarifa |
| **Instalación eléctrica** | Cableado, MC4 y canalización | Wp del arreglo × tarifa |
| **Seguridad** | Protecciones, fusibles, DPS, bornes y tierra | Wp del arreglo × tarifa |
| **Otros** | Imprevistos, herramientas y mano de obra estimada | Wp del arreglo × tarifa |

La aplicación usa una TRM aproximada de 4.000 COP por dólar, precios referenciales del mercado colombiano y no incluye IVA, transporte ni instalación real. Esos valores son parámetros de referencia, no una oferta.

## 8.3  Ejemplo: Puesto de jugos

*Tabla 8.2. Presupuesto del ejemplo Puesto de jugos*

| Grupo | Concepto | Cantidad | Subtotal |
| --- | --- | --- | --- |
| **Generación** | Paneles de 450 Wp | 2 | $1.008.000 |
| **Almacenamiento** | Banco de baterías 24 V | 147 Ah | $1.622.880 |
| **Conversión y control** | Inversor | 794 W | $762.240 |
| **Conversión y control** | Controlador | 50 A | $1.800.000 |
| **Montaje** | Estructura y anclajes | 900 Wp | $216.000 |
| **Instalación eléctrica** | Cableado y MC4 | 900 Wp | $180.000 |
| **Seguridad** | Protecciones y tierra | 900 Wp | $108.000 |
| **Otros** | Imprevistos y mano de obra | 900 Wp | $72.000 |

| Valor | Indicador |
| --- | --- |
| **$5.769.120** | Total estimado |
| **8** | grupos de costo |
| **3** | cotizaciones sugeridas |

El total coincide con la suma de los ocho subtotales. Si un concepto no aplica a tu puesto, no lo elimines del cálculo: ajústalo en la cotización con el proveedor.

## 8.4  Cómo cambia el total

*Tabla 8.3. Sensibilidad del presupuesto*

| Cambio | Efecto esperado |
| --- | --- |
| **Subir la potencia del panel** | Puede reducir el número de paneles, pero sube el precio unitario. |
| **Subir la DOD** | Reduce los Ah y el costo de batería; acorta su vida útil. |
| **Cambiar la tensión a 48 V** | Reduce la corriente y el calibre, pero exige otro banco. |
| **Aumentar el consumo nocturno** | Sube batería, paneles y presupuesto. |
| **Cambiar la TRM del código** | Cambia todos los precios de referencia, no el dimensionamiento. |

*Figura 8.1. Presupuesto del ejemplo Puesto de jugos. El total se muestra en el encabezado y en el pie de la tabla.*

## 8.5  Cómo cotizar con este presupuesto

1. Imprime el presupuesto o guárdalo como PDF.
2. Pide cotización por el mismo alcance (paneles, batería, inversor, controlador, estructura, cableado y protecciones). Un kit cerrado no es equivalente si tiene menos Ah o menos Wp.
3. Solicita precio unitario, disponibilidad y garantía de cada componente.
4. Compara al menos tres proveedores locales.
5. Verifica si el precio incluye IVA, transporte e instalación.
6. Ajusta el total con las diferencias reales y conserva la cotización junto al cálculo.

> **ATENCION — Precios referenciales, no vinculantes**
> El presupuesto no incluye IVA ni transporte y puede variar por marca, proveedor, ciudad y disponibilidad. No lo presentes como una oferta comercial.

# 9  Buenas prácticas de operación

*Rutinas para que el sistema dure*

Un sistema bien dimensionado también necesita una operación ordenada. Estas rutinas son cortas, repetibles y están pensadas para un puesto que abre todos los días.

## 9.1  Rutina diaria

*Tabla 9.1. Rutina diaria*

| Momento | Acción | Por qué |
| --- | --- | --- |
| **Al abrir** | Revisa que el panel esté limpio y sin sombras. | Una sombra parcial reduce la producción de todo el arreglo. |
| **Durante la jornada** | Usa los aparatos de mayor consumo mientras hay sol. | La batería se reserva para la noche. |
| **Antes de encender** | Enciende los aparatos uno por uno. | Evita picos simultáneos y protege el inversor. |
| **Al cerrar** | Apaga el inversor y los aparatos. | El inversor consume batería aun en vacío. |
| **Al cerrar** | Revisa que no queden luces ni cargadores conectados. | El consumo nocturno no previsto agota el banco. |

## 9.2  Rutina semanal y mensual

*Tabla 9.2. Mantenimiento preventivo*

| Frecuencia | Actividad | Qué revisar |
| --- | --- | --- |
| **Cada 2 o 3 días** | Limpiar el panel | Polvo, hojas, excrementos, sombras nuevas |
| **Cada semana** | Revisar el cableado visible | Roces, humedad, cables sueltos |
| **Cada mes** | Revisar bornes y apriete | Corrosión, terminales flojos |
| **Cada mes** | Medir la tensión del banco | Carga y estado de las baterías |
| **Cada mes** | Revisar el controlador | Indicadores, temperatura, alarmas |
| **Cada 3 meses** | Limpiar la ventilación del inversor | Polvo y obstrucciones |
| **Cada 6 meses** | Revisar estructura y anclajes | Tornillos, óxido, estabilidad |

> **CONSEJO — Una nota en el celular**
> Registra la fecha y el valor medido. En tres meses vas a necesitar esa línea base para saber si la batería está envejeciendo o si el panel se está ensuciando más de lo normal.

## 9.3  Eficiencia en el puesto

- **Mueve consumo al día:** licuadora, cargadores y equipos de alto consumo rinden mejor con sol.
- **Escalona el arranque:** no enciendas la licuadora y la nevera al mismo tiempo.
- **Apaga el inversor:** en vacío también consume batería.
- **Evita cargas fantasma:** cargadores y equipos en espera consumen sin que los notes.
- **Limpia el panel a primera hora:** el agua se evapora antes y no queda marcas.
- **No cubras la ventilación:** el inversor y el controlador necesitan aire.

## 9.4  Bitácora de operación

Úsala como plantilla: una fila por semana y una extra cuando algo cambie.

*Tabla 9.3. Plantilla de bitácora*

| Fecha | Tensión del banco | Consumo del día | Observación | Acción |
| --- | --- | --- | --- | --- |
|  | V | Wh |  |  |
|  | V | Wh |  |  |
|  | V | Wh |  |  |

## 9.5  Señales de alerta

*Tabla 9.4. Señales de alerta*

| Señal | Qué puede significar | Qué hacer |
| --- | --- | --- |
| **Las luces parpadean** | Conexión floja o batería baja | Revisar bornes y tensión |
| **El inversor se apaga solo** | Sobrecarga, sobretemperatura o batería baja | Apagar aparatos, ventilar y medir |
| **La batería dura menos** | Consumo mayor, batería vieja o DOD excesivo | Recalcular y revisar el banco |
| **El controlador marca alarma** | Sobretensión, sobredescarga o sobretemperatura | Consultar el manual del equipo |
| **Olor a quemado** | Cortocircuito o sobrecarga | Apagar de inmediato y llamar a un técnico |

## 9.6  Cuándo volver a calcular

- Se agrega o se retira un aparato del puesto.
- Cambia el horario del negocio o el tiempo de uso de un equipo.
- Se reemplaza la licuadora, la nevera o el inversor por otro de distinta potencia.
- El sistema se queda corto de forma repetida.
- Se cambia de local o de zona con menos sol.

# 10  Problemas y preguntas frecuentes

*Diagnóstico rápido y respuestas concretas*

La mayoría de los problemas tiene una causa verificable. Este capítulo separa los problemas de la aplicación, los del cálculo y los de la instalación.

## 10.1  Diagnóstico rápido

*Tabla 10.1. Diagnóstico de la aplicación*

| Síntoma | Causa probable | Acción |
| --- | --- | --- |
| **No avanza al resultado** | Errores de validación | Revisa el resumen rojo y corrige los campos |
| **El resultado no cambia** | No se pulsó Calcular o hay errores | Corrige y pulsa Calcular resultado |
| **La tabla desapareció** | Otro navegador, modo privado o datos borrados | Vuelve a cargar el ejemplo o la tabla |
| **El presupuesto está vacío** | No hay cálculo válido | Calcula primero en la pestaña 1 |
| **La guía dice «Sin calcular»** | La tabla no tiene datos válidos | Agrega aparatos y calcula |
| **El número de paneles no es exacto** | Redondeo a paneles completos | Es normal: se compran unidades enteras |
| **La batería cambia al mover la tensión** | La capacidad en Ah depende de la tensión | La energía no cambia; cambia el reparto |
| **El PDF se ve cortado** | Configuración de impresión | Ajusta escala o desactiva encabezados del navegador |

## 10.2  Preguntas frecuentes

### ¿Por qué no avanza al resultado?

Porque hay errores de validación. El resumen rojo indica cuántos campos y filas deben corregirse. Los campos con error quedan marcados y, al pasar el cursor, muestran el mensaje.

### ¿Por qué la batería cambia tanto al modificar la tensión?

La capacidad en Ah es inversamente proporcional a la tensión. Si el banco sube de 24 V a 48 V, la misma energía requiere menos amperios-hora. La energía total no cambia; cambia cómo se reparte.

### ¿Por qué el número de paneles no coincide con la división exacta?

Porque los paneles se compran completos. La aplicación calcula la potencia requerida y redondea hacia arriba al siguiente número entero de paneles.

### ¿La guía reemplaza a un instalador?

No. La guía explica el orden de montaje, las conexiones y las precauciones, pero no reemplaza la revisión de un profesional ni el cumplimiento de la normativa eléctrica.

### ¿Puedo usar la aplicación sin internet?

Sí, una vez cargada. Si está publicada en un servidor, el navegador puede necesitar internet para la primera carga. Después, los cálculos se resuelven localmente.

### ¿Dónde quedó mi tabla?

En el mismo navegador y en el mismo equipo. Si cambias de navegador, de computador o borras los datos del navegador, la tabla no estará disponible.

### ¿Por qué el presupuesto dice «precios referenciales»?

Porque no es una cotización. Es una estimación para planear el gasto. Los precios reales dependen del proveedor, la marca, la ciudad y la disponibilidad.

### ¿Puedo cambiar la TRM o los precios?

Sí, si tienes acceso al código. Los precios están en `Presupuesto.jsx` y la TRM es una constante. Cualquier cambio debe volver a ejecutar las pruebas.

### ¿Qué pasa si mi puesto usa 110 V y el inversor entrega 120 V?

La aplicación dimensiona el inversor por potencia, no por tensión de salida. Verifica que el inversor elegido entregue la tensión de tus aparatos y que su potencia sea igual o mayor a la calculada.

### ¿Los datos se envían a algún servidor?

No. La aplicación no tiene backend ni registro. La tabla se guarda en `localStorage` bajo la clave `solarpuesto:v1`.

## 10.3  Errores de validación

Las reglas V-01 a V-07 están explicadas en el capítulo 5. Si el mensaje no es claro, vuelve a esa tabla: cada regla indica el dato que debe corregirse y un ejemplo de valor rechazado.

## 10.4  Cómo reportar un problema

1. Anota la versión que aparece en el encabezado (**V1.0**).
2. Describe el paso exacto: pestaña, botón y dato introducido.
3. Adjunta una captura de pantalla completa, no solo del mensaje.
4. Indica el navegador y el sistema operativo.
5. Si el problema es de cálculo, adjunta la tabla o el PDF del resultado.

> **CONSEJO — Un reporte útil ahorra tiempo**
> «No funciona» no permite reproducir nada. «En Chrome, al escribir 0 W en la licuadora y pulsar Calcular, el mensaje dice V-03» sí permite corregirlo.

# 11  Privacidad y manejo de los datos

*Qué se guarda, dónde y cómo borrarlo*

SolarPuesto no tiene cuentas ni servidor. Los datos viven en el navegador del equipo que usas. Esa decisión simplifica el uso y también define tus responsabilidades.

## 11.1  Qué se guarda

*Tabla 11.1. Datos persistidos*

| Dato | Dónde | Para qué |
| --- | --- | --- |
| **Tabla de aparatos** | Almacenamiento local del navegador | Recuperar el trabajo al volver |
| **Parámetros** | Almacenamiento local del navegador | Mantener la configuración elegida |
| **Versión del formato** | Almacenamiento local del navegador | Migrar estados antiguos |
| **Resultado y presupuesto** | No se guardan como tales | Se recalculan con la tabla y los parámetros |

La clave usada es `solarpuesto:v1`. La versión del formato permite que una tabla guardada por una versión anterior se migre sin perder los aparatos; en particular, los estados con 12 V se reajustan a 24 V.

## 11.2  Qué no se envía

- No se envían datos personales, de consumo ni de ubicación.
- No hay registro de usuarios ni base de datos central.
- No hay analítica de uso ni publicidad.
- No se comparten datos con terceros.

> **PRIVACIDAD — Sin servidor no hay copia remota**
> Si el equipo se daña o se borran los datos del navegador, la tabla se pierde. Guarda un PDF del resultado si necesitas conservar el escenario.

## 11.3  Equipos compartidos

En un computador prestado o en una sala de cómputo, la tabla puede quedar visible para la siguiente persona. Pulsa **Vaciar todo** al terminar o usa una ventana privada. La ventana privada no conserva los datos al cerrarla.

## 11.4  Cómo borrar los datos

1. Abre la pestaña **1. Carga de aparatos**.
2. Pulsa **Vaciar todo** y confirma.
3. La tabla y los parámetros vuelven a los valores por defecto.
4. También puedes borrar los datos del sitio desde la configuración del navegador.

> **ATENCION — Borrar no se puede deshacer**
> La aplicación no tiene papelera ni historial. Si necesitas conservar un escenario, guarda el PDF antes de vaciar.

## 11.5  Modo privado y almacenamiento bloqueado

Si el navegador está en modo privado o bloquea el almacenamiento, la aplicación sigue funcionando, pero no conserva los datos al cerrar. La validación y el cálculo no dependen del almacenamiento: solo la persistencia.

## 11.6  Migración de datos antiguos

Si una versión anterior guardó una tensión de 12 V, la aplicación la reajusta a 24 V sin borrar la tabla. Es una migración de compatibilidad, no una conversión de magnitudes: los aparatos y sus consumos se conservan.

Si después de actualizar ves valores distintos, revisa los parámetros antes de suponer una pérdida de datos. El cambio de tensión modifica la capacidad en Ah y el dimensionamiento, no la energía diaria.

# 12  Glosario

*Los términos que aparecen en el resultado*

Cada término se explica en una frase y se relaciona con la decisión que ayuda a tomar.

| Término | Significado | Dónde se usa |
| --- | --- | --- |
| **Wh** | Vatio-hora. Unidad de energía. 1.000 Wh = 1 kWh. | Mide el consumo diario. |
| **Wp** | Vatio pico. Potencia máxima de un panel en condiciones estándar. | Define el panel que se compra. |
| **W** | Vatio. Unidad de potencia instantánea. | Aparece en la etiqueta de cada aparato. |
| **HSP** | Horas solar pico. Horas equivalentes de sol a máxima intensidad. | Convierte energía en paneles. |
| **DOD** | Profundidad de descarga. Porcentaje de la batería que se puede usar. | Protege la vida del banco. |
| **CC / DC** | Corriente continua. La que entrega el panel y almacena la batería. | Recorrido panel-controlador-batería. |
| **CA / AC** | Corriente alterna. La que usan los electrodomésticos comunes. | Salida del inversor. |
| **Inversor** | Equipo que convierte CC de la batería en CA para los aparatos. | Se elige por potencia y onda. |
| **Controlador** | Equipo que regula la carga del panel y protege la batería. | Se elige por corriente. |
| **Panel** | Módulo fotovoltaico que convierte la luz en electricidad. | Se elige por Wp y tensión. |
| **Banco** | Conjunto de baterías conectadas para almacenar energía. | Se elige por Ah, tensión y DOD. |
| **Potencia pico** | La potencia del aparato que más consume, o la suma si todo está encendido. | Dimensiona el inversor. |
| **Consumo nocturno** | Energía usada cuando no hay sol; la debe cubrir la batería. | Verifica la reserva. |
| **Amperio (A)** | Unidad de corriente eléctrica. | Define el controlador y los cables. |
| **Amperio-hora (Ah)** | Cantidad de carga que puede entregar una batería. | Capacidad del banco. |
| **MC4** | Conector estándar para paneles solares. | Une los cables del panel. |
| **DPS** | Dispositivo de protección contra sobretensiones. | Protege la instalación. |
| **RETIE** | Reglamento Técnico de Instalaciones Eléctricas de Colombia. | Norma de la instalación. |
| **localStorage** | Almacenamiento local del navegador. | Conserva la tabla sin servidor. |

> **NOTA — Glosario vivo**
> Si un término no aparece aquí, búscalo en el Manual de instalación (Anexo C) o en la documentación técnica del proveedor del equipo.

# A  Ejemplo completo: Puesto de jugos

*Entrada, resultado y reproducción*

Este anexo reúne el caso de referencia que se usa en todo el manual. Sirve para comprobar que la aplicación está funcionando y para explicar el flujo a otra persona.

## A.1  Entrada

*Tabla A.1. Tabla de carga del ejemplo*

| Aparato | Cant. | Potencia | Tipo | Uso | Horario |
| --- | --- | --- | --- | --- | --- |
| **Licuadora (jugos)** | 1 | 550 W | Por usos | 2 min × 55 | Día |
| **Lámpara LED** | 2 | 10 W | Continuo | 5 h | Noche |
| **Datáfono** | 1 | 15 W | Continuo | 3 h | Día |
| **Celular (carga)** | 1 | 10 W | Por usos | 30 min × 3 | Día |
| **Radio de música** | 1 | 40 W | Continuo | 6 h | Ambos |

## A.2  Resultado

*Tabla A.2. Resultado esperado*

| Indicador | Valor |
| --- | --- |
| **Potencia instalada** | 635 W |
| **Energía diaria** | 1.408,33 Wh/día |
| **Consumo nocturno** | 340 Wh/día |
| **Paneles** | 2 paneles de 450 Wp (900 Wp) |
| **Banco de baterías** | 24 V, 147 Ah, DOD 50 % |
| **Inversor** | ≥ 794 W |
| **Controlador de carga** | ≥ 50 A |
| **Presupuesto estimado** | $5.769.120 COP (referencial) |

## A.3  Cómo reproducirlo

1. Abre la pestaña **1. Carga de aparatos**.
2. Pulsa el botón **Puesto de jugos**.
3. Verifica que la tabla coincida con la Tabla A.1.
4. Pulsa **Calcular resultado**.
5. Compara las tres tarjetas y el dimensionamiento con la Tabla A.2.
6. Abre la guía y el presupuesto para confirmar los mismos valores.

> **IMPORTANTE — Si no coincide**
> Revisa primero los parámetros (HSP 4,5; eficiencia 0,80; margen 25 %; tensión 24 V; DOD 50 %; panel 450 Wp; voltaje 24 V). Si todo está por defecto, vuelve a cargar el ejemplo y repite el cálculo.

# B  Los cinco casos de referencia

*Valores verificados del Acta No. 002*

Los cinco casos se usan en las pruebas automatizadas y en la documentación del proyecto. Los valores siguientes corresponden a los parámetros por defecto.

*Tabla B.1. Resultados con los parámetros por defecto*

| Caso | Potencia | Energía/día | Nocturno | Paneles | Batería | Inversor | Controlador |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Jugos** | 635 W | 1.408,33 Wh | 340 Wh | 2 × 450 Wp | 24 V · 147 Ah | ≥ 794 W | ≥ 50 A |
| **Luces + datáfono** | 125 W | 760,00 Wh | 640 Wh | 1 × 450 Wp | 24 V · 79 Ah | ≥ 157 W | ≥ 30 A |
| **Refrigerador** | 125 W | 558,00 Wh | 498 Wh | 1 × 450 Wp | 24 V · 58 Ah | ≥ 157 W | ≥ 30 A |
| **Mixto** | 645 W | 1.471,67 Wh | 460 Wh | 2 × 450 Wp | 24 V · 153 Ah | ≥ 807 W | ≥ 50 A |
| **Fritura** | 1.295 W | 2.845,00 Wh | 100 Wh | 3 × 450 Wp | 24 V · 296 Ah | ≥ 1.619 W | ≥ 80 A |

Los valores de Ah se muestran redondeados y el inversor se redondea hacia arriba, tal como los presenta la aplicación. La potencia del controlador se redondea al amperaje comercial inmediato.

*Tabla B.2. Presupuesto referencial por caso*

| Caso | Presupuesto estimado |
| --- | --- |
| **Jugos** | $5.769.120 COP |
| **Luces + datáfono** | $2.894.880 COP |
| **Refrigerador** | $2.663.040 COP |
| **Mixto** | $5.847.840 COP |
| **Fritura** | $10.078.080 COP |

# C  Lista de verificación de una sesión completa

*De cero a presupuesto en orden*

- [ ] Abrí la aplicación en la dirección correcta.
- [ ] Cargué un ejemplo o agregué mis aparatos.
- [ ] Verifiqué potencia, cantidad, tipo de uso y horario.
- [ ] Corregí los campos marcados en rojo.
- [ ] Pulsé Calcular resultado y revisé las tres tarjetas.
- [ ] Leí el desglose y detecté el aparato de mayor consumo.
- [ ] Revisé los parámetros y dejé los valores de mi zona.
- [ ] Anoté paneles, batería, inversor y controlador.
- [ ] Abrí la guía y revisé el diagrama.
- [ ] Comparé el presupuesto con al menos tres proveedores.
- [ ] Guardé un PDF del escenario elegido.

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

Para citar este documento: Heyner Alberto Aldana Herrera. Manual de Usuario — SolarPuesto V1.0. SP-MU-002, edición 2.0. Neiva, Huila, 06/11/2026.

## Para cerrar

SolarPuesto convierte una lista de aparatos en una decisión de compra y de operación. La aplicación no conoce el puesto: lo conoces tú. Por eso el resultado es un punto de partida verificable y no una promesa.

Vuelve a calcular cuando cambie un aparato, cuando cambie el horario del negocio o cuando el sistema se quede corto. Un cálculo actualizado cuesta minutos; una batería agotada a media jornada cuesta ventas.

> Un buen sistema solar no es el más grande: es el que cubre tu jornada con margen, se instala con seguridad y se puede mantener.
> — Principio de diseño del proyecto

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
