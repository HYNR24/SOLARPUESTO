# Manual de Despliegue — SolarPuesto V1.0

*Publicación, verificación y reversión de la aplicación SolarPuesto V1.0*

**Código:** SP-MD-002 · **Edición:** 1.0 — Edición inicial · **Fecha:** 13/11/2026

**Autor:** Heyner Alberto Aldana Herrera · **Docente:** Miguel Antonio Urbano Silva · **Asignatura:** Ingeniería de Software II (XP — TDD)

---

## Acerca de este manual

Este documento explica, en lenguaje claro y con apoyo visual, todo lo necesario para publicar la aplicación SolarPuesto V1.0 a partir de su paquete estático: preparar el build, copiarlo a un servidor web, verificar el sitio y saber revertir la publicación.

Está escrito para leerse con la terminal y el servidor a la mano. No supone administración avanzada de sistemas: cada comando se explica y cada comprobación indica el resultado esperado. El alcance acordado es un servidor estático en la raíz del sitio (Nginx, Apache o IIS).

### Ficha del documento

| Campo | Valor |
| --- | --- |
| **Documento** | Manual de Despliegue — SolarPuesto V1.0 |
| **Código** | SP-MD-002 |
| **Edición** | 1.0 — Edición inicial |
| **Fecha** | 13/11/2026 |
| **Autor** | Heyner Alberto Aldana Herrera |
| **Docente** | Miguel Antonio Urbano Silva |
| **Asignatura** | Ingeniería de Software II (XP — TDD) |
| **Entregable** | Manual de despliegue — Fase de entrega final |
| **Público** | Docentes, evaluadores del proyecto y responsables de la publicación |
| **Alcance** | Generación del paquete estático dist, publicación en servidor web estático (Nginx, Apache o IIS), verificación posterior, diagnóstico, reversión y responsabilidades sobre los datos. |

### Qué encontrarás

- **Qué se publica:** el paquete estático `dist`, sus piezas y sus límites; qué NO va al servidor.
- **Preparación verificable:** `npm test`, `npm run build` y `npm run preview` con sus resultados esperados.
- **Procedimiento paso a paso:** Nginx, Apache e IIS, más la nota sobre publicación en subcarpeta.
- **Verificación y reversión:** comprobaciones posteriores, diagnóstico por síntoma y vuelta al paquete anterior.
- **Anexos:** comandos, estructura de `dist`, glosario, lista de verificación y trazabilidad con M5.

## Cómo leer este manual

El manual combina texto, tablas, diagramas y avisos. Los avisos no son decoración: cada uno indica una condición que cambia el procedimiento, el resultado o la integridad del paquete publicado.

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
| **Diagrama** | Explica el recorrido del código hasta el navegador. | Antes de publicar. |
| **Tabla** | Ordena comandos, requisitos, síntomas y comprobaciones. | Cuando necesites un valor exacto. |
| **Caja de aviso** | Señala un riesgo, un límite o una buena práctica. | Siempre que aparezca antes de un paso. |
| **Lista de verificación** | Confirma que un paso quedó completo. | Antes de avanzar a la etapa siguiente. |
| **Figura** | Muestra la arquitectura o el flujo de publicación. | Cuando el texto no alcance. |

> **CONSEJO — Una lectura rentable**
> Lee primero el capítulo 3 (preparación) y el capítulo 4 (publicación). Con eso ya puedes desplegar; los capítulos 5 y 6 son la verificación y el plan de reversión.

### Convenciones de texto

- Los nombres de botones y pestañas se escriben en **negrita**: **Calcular resultado**, **Vaciar todo**.
- Los valores y fórmulas se muestran en `fuente monoespaciada` para distinguirlos del texto.
- Los números usan coma decimal (1.408,33 Wh); los capítulos se citan como «capítulo 5» o «§5.4».

## Contenido

El índice se genera con los títulos de capítulo y de sección de esta edición. La versión diseñada en DOCX y PDF incluye números de página.

- **1  Qué se despliega**
  - 1.1  Qué se publica
  - 1.2  Qué no se publica
  - 1.3  Relación con los otros manuales
- **2  Requisitos del entorno**
  - 2.1  Entorno de construcción
  - 2.2  Entorno de publicación
  - 2.3  Comprobación previa
- **3  Preparación y verificación previa**
  - 3.1  Secuencia de comandos
  - 3.2  Resultado esperado del build
  - 3.3  Comprobación con preview
- **4  Procedimiento de despliegue**
  - 4.1  Generar y copiar el paquete
  - 4.2  Nginx
  - 4.3  Apache
  - 4.4  IIS
  - 4.5  Si se publica en una subcarpeta
- **5  Verificación posterior al despliegue**
  - 5.1  Comprobaciones obligatorias
  - 5.2  Caso de referencia verificable
  - 5.3  Criterios de aceptación
- **6  Diagnóstico y reversión**
  - 6.1  Diagnóstico por síntoma
  - 6.2  Reversión al paquete anterior
- **7  Datos, privacidad y responsabilidades**
  - 7.1  Comportamiento de los datos
  - 7.2  Responsables y registro
- **A  Comandos de referencia**
- **B  Estructura del paquete publicado**
- **C  Glosario de despliegue**
- **D  Lista de verificación de despliegue**
- **E  Trazabilidad con el proyecto**

# 1  Qué se despliega

*Naturaleza del paquete, límites y relación con los otros manuales*

SolarPuesto V1.0 se entrega como una aplicación web estática. Desplegarla no es instalar un servidor de aplicaciones: es copiar un conjunto de archivos a un servidor web y comprobar que el navegador los sirve completos. Este capítulo define exactamente qué se publica.

La aplicación se compila con Vite. El resultado es una carpeta `dist` con un `index.html`, una hoja de estilos, un bundle de JavaScript y las fotografías de la guía de instalación. No hay código que se ejecute del lado del servidor: todo el cálculo ocurre en el navegador del vendedor al pulsar **Calcular resultado**.

*Figura 1.1. Arquitectura de la aplicación: módulos puros de cálculo, componentes React y almacenamiento local del navegador. El servidor solo entrega archivos.*

| Valor | Indicador |
| --- | --- |
| **43** | módulos del build |
| **113** | pruebas en verde |
| **0** | datos enviados |

## 1.1  Qué se publica

*Tabla 1.1. Contenido del paquete de publicación*

| Elemento | Origen | Destino en el servidor |
| --- | --- | --- |
| **index.html** | dist/index.html | Raíz del sitio (documento predeterminado) |
| **Bundle de la app** | dist/assets/*.js | dist/assets/ conservando el nombre |
| **Hoja de estilos** | dist/assets/*.css | dist/assets/ conservando el nombre |
| **Fotografías de materiales** | public/materiales/ | dist/materiales/ (8 imágenes JPG) |
| **Fuentes e iconos** | Según el build | Junto a los assets generados |

> **IMPORTANTE — Publica el contenido de dist, no la carpeta**
> Se copia lo que hay **dentro** de `dist` al directorio raíz del sitio. Si se copia la carpeta `dist` completa, las rutas relativas de `index.html` quedan un nivel más abajo y la página aparece en blanco.

## 1.2  Qué no se publica

- **Node.js ni npm:** solo se necesitan para construir el paquete, nunca en el servidor de destino.
- **node_modules:** es dependencia de desarrollo; no forma parte de `dist`.
- **Servidor de aplicaciones, API o base de datos:** la app no tiene backend.
- **Cuentas, autenticación o analítica:** no existen usuarios ni datos personales.
- **Procesos en segundo plano:** no hay demonios, colas ni tareas programadas.
- **El código fuente:** se conserva aparte como respaldo, pero no se expone en el docroot.

Esta simplicidad es una decisión de diseño documentada en la arquitectura (RFN-05): la tabla de aparatos y los parámetros viven en el `localStorage` del navegador. Por eso el despliegue se reduce a servir archivos estáticos, y por eso también la pérdida del equipo implica la pérdida de la tabla guardada.

## 1.3  Relación con los otros manuales

*Tabla 1.2. Reparto de la documentación*

| Documento | Qué responde | Cuándo usarlo |
| --- | --- | --- |
| **Manual de Usuario** | ¿Cómo opero la aplicación y leo el resultado? | Durante el uso diario |
| **Manual de Instalación, Parte II** | ¿Cómo instalo dependencias, ejecuto en desarrollo y compilo? | Antes de este manual |
| ****Manual de Despliegue**** | ¿Cómo publico `dist`, lo verifico y lo revierto? | Al entregar o publicar |
| **Informe de Pruebas** | ¿Qué se verificó y con qué evidencia? | Como respaldo de la entrega |

> **NOTA — No se duplica la Parte II**
> Los capítulos 13 a 15 del Manual de Instalación (`npm install`, `npm run dev`, puerto 5173) se dan por cumplidos aquí. Este manual empieza en el momento en que existe un proyecto funcional y termina cuando el sitio publicado pasa las comprobaciones del capítulo 5.

# 2  Requisitos del entorno

*Dónde se construye y dónde se publica*

Hay dos entornos distintos y conviene no mezclarlos: el de construcción, donde se genera `dist`, y el de publicación, donde solo se sirven archivos. La confusión entre ambos es la causa más frecuente de un despliegue fallido.

## 2.1  Entorno de construcción

*Tabla 2.1. Entorno donde se ejecuta el build*

| Requisito | Mínimo | Verificado en la entrega |
| --- | --- | --- |
| **Node.js** | 18 o superior (se recomienda LTS) | v24.13.1 |
| **npm** | Incluido con Node.js | 11.8.0 |
| **Terminal** | PowerShell o equivalente | PowerShell sin elevación |
| **Sistema operativo** | Windows, Linux o macOS | Windows 11 Pro |
| **Disco** | Espacio para node_modules y dist | Unos cientos de MB |
| **Conexión a internet** | Solo para npm install | No requerida después |

```text
node -v
npm -v
```
*Comprueba las versiones antes de construir*

## 2.2  Entorno de publicación

*Tabla 2.2. Entorno de destino*

| Requisito | Detalle |
| --- | --- |
| **Servidor web estático** | Nginx, Apache o IIS (o cualquier servidor de archivos estáticos) |
| **Documento predeterminado** | index.html en la raíz del sitio |
| **Tipos MIME** | text/html, text/css, application/javascript, image/jpeg |
| **Permisos de lectura** | El usuario del servidor debe leer todo el contenido de dist |
| **Navegador del usuario** | Chrome, Edge o Firefox actualizado; sin permisos especiales |
| **Node.js en el servidor** | **No se requiere** |
| **Base de datos** | **No se requiere** |

> **CONSEJO — El servidor no necesita saber de Node**
> Puedes construir en tu computador y copiar únicamente `dist` al servidor. Es el escenario más simple y el recomendado para la entrega académica: basta con un servidor web estático.

## 2.3  Comprobación previa

- [ ] Estoy ubicado en la carpeta donde está `package.json` (`app/`).
- [ ] Las dependencias están instaladas (`node_modules` existe).
- [ ] Tengo permisos de escritura para generar `dist`.
- [ ] Conozco la ruta física del directorio raíz del servidor de destino.
- [ ] Dispongo de una copia del último `dist` que funcionó, si existía uno.

# 3  Preparación y verificación previa

*Comandos, contenido de dist y resultados esperados*

Nunca se publica un paquete que no haya pasado las pruebas. Esta secuencia es obligatoria y deja un registro verificable de que el artefacto que se copia es el correcto.

## 3.1  Secuencia de comandos

1. **Instalar dependencias** — `npm install`. Solo la primera vez o tras borrar `node_modules`.
2. **Ejecutar la suite** — `npm test`. Deben aprobarse **113 pruebas** en **5 archivos**.
3. **Compilar** — `npm run build`. Vite transforma **43 módulos** y genera `dist` sin errores.
4. **Comprobar en local** — `npm run preview`. Abre la versión de producción en `http://localhost:4173`.
5. **Verificar recursos** — Confirmar que `dist/materiales/` contiene las 8 fotografías.

```text
cd C:\Users\Heyner\Desktop\SolarPuesto\app
npm install
npm test
npm run build
npm run preview
```
*Secuencia completa de preparación (PowerShell)*

## 3.2  Resultado esperado del build

```text
vite v5.4.21 building for production...
✓ 43 modules transformed.
dist/index.html                 0.57 kB │ gzip:  0.36 kB
dist/assets/index-BjpLWDZA.css 22.95 kB │ gzip:  5.59 kB
dist/assets/index-CXukYp5o.js 221.91 kB │ gzip: 68.76 kB
✓ built in 936ms
```
*Salida de referencia de `npm run build`*

> **NOTA — Los nombres con hash cambian**
> Los archivos `index-*.js` e `index-*.css` llevan un hash de contenido. No los renombres ni los edites a mano: `index.html` los referencia por su nombre generado. Si el build cambia, vuelve a copiar **todo** el contenido de `dist`.

*Figura 3.1. Del código fuente a la carpeta `dist` y al navegador del usuario.*

## 3.3  Comprobación con preview

*Tabla 3.1. Comprobaciones sobre la versión de producción*

| Comprobación | Resultado esperado |
| --- | --- |
| **Respuesta HTTP** | 200 en `http://localhost:4173` |
| **Encabezado** | SolarPuesto V1.0 visible |
| **Navegación** | Las cinco pestañas responden al clic |
| **Ejemplo** | **Puesto de jugos** carga 5 aparatos |
| **Cálculo** | 635 W · 1.408,33 Wh/día · 340 Wh nocturno |
| **Guía** | Las fichas de material muestran sus fotografías |
| **Consola del navegador** | Sin errores 404 de assets |

> **ATENCION — Preview no es el servidor de destino**
> `npm run preview` sirve `dist` en el puerto 4173 para verificar, pero sigue siendo un servidor de Vite en tu equipo. No lo uses como publicación definitiva: para eso están los procedimientos del capítulo 4.

# 4  Procedimiento de despliegue

*Del paquete verificado al servidor Nginx, Apache o IIS*

El procedimiento es el mismo para los tres servidores: generar el paquete, copiar su contenido al directorio raíz del sitio, configurar el documento predeterminado y comprobar. Cambia únicamente la sintaxis de configuración.

## 4.1  Generar y copiar el paquete

1. Ejecuta la secuencia del capítulo 3 y conserva una copia del `dist` anterior si lo hay.
2. Crea el directorio de destino en el servidor (por ejemplo `/var/www/solarpuesto` o `C:\inetpub\solarpuesto`).
3. Copia **el contenido** de `dist` dentro de ese directorio, conservando `assets/` y `materiales/`.
4. Verifica que `index.html` quede directamente en la raíz del sitio, no dentro de una subcarpeta `dist`.
5. Otorga al usuario del servidor permisos de **lectura** sobre todos los archivos.

```text
# Ejemplo en PowerShell: copiar el contenido de dist al docroot
$origen = "C:\Users\Heyner\Desktop\SolarPuesto\app\dist\*"
$destino = "C:\inetpub\solarpuesto"
New-Item -ItemType Directory -Force -Path $destino | Out-Null
Copy-Item -Path $origen -Destination $destino -Recurse -Force
```
*Copia del contenido de `dist` (el asterisco es importante)*

## 4.2  Nginx

```text
server {
    listen 80;
    server_name solarpuesto.local;
    root /var/www/solarpuesto;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /materiales/ {
        try_files $uri =404;
    }
}
```
*Bloque `server` mínimo para servir `dist`*

1. Guarda el bloque en `/etc/nginx/sites-available/solarpuesto` y habilítalo con un enlace simbólico.
2. Comprueba la sintaxis con `nginx -t`.
3. Recarga con `systemctl reload nginx`.

> **NOTA — Sobre try_files**
> SolarPuesto no usa router, así que no hay rutas profundas que resolver; el `try_files` se mantiene como buena práctica para que cualquier ruta inexistente devuelva la aplicación en lugar de un 404 inesperado.

## 4.3  Apache

```text
<VirtualHost *:80>
    ServerName solarpuesto.local
    DocumentRoot "/var/www/solarpuesto"
    <Directory "/var/www/solarpuesto">
        Options -Indexes +FollowSymLinks
        AllowOverride None
        Require all granted
        DirectoryIndex index.html
    </Directory>
</VirtualHost>
```
*VirtualHost mínimo para servir `dist`*

1. Habilita el sitio (`a2ensite solarpuesto`) y los módulos `dir` y `mime`.
2. Comprueba con `apachectl configtest`.
3. Recarga con `systemctl reload apache2`.

## 4.4  IIS

1. **Crear el sitio** — Administrador de IIS → Sitios → Agregar sitio; ruta física apuntando a la carpeta que contiene `index.html`.
2. **Documento predeterminado** — Agregar `index.html` y dejarlo primero en la lista.
3. **Tipos MIME** — Confirmar `.js` → `application/javascript`, `.css` → `text/css`, `.jpg` → `image/jpeg`.
4. **Rol de contenido estático** — Verificar que «Contenido estático» esté instalado en el rol Servidor web (IIS).
5. **Permisos** — El grupo `IIS_IUSRS` debe tener lectura sobre la carpeta.
6. **Probar** — Examinar el sitio y confirmar HTTP 200 antes de cerrar el asistente.

> **ATENCION — El error clásico de IIS**
> Si falta el tipo MIME para `.js`, el navegador recibe el bundle con un tipo incorrecto y lo bloquea: la página carga el HTML pero queda en blanco. Es el síntoma más común y se resuelve en la configuración de tipos MIME, no en el código de la aplicación.

## 4.5  Si se publica en una subcarpeta

Los tres procedimientos anteriores asumen que la aplicación se sirve en la **raíz** del sitio, que es el alcance de esta entrega. Si se publicara bajo una ruta como `https://ejemplo.com/solarpuesto/`, las rutas absolutas generadas por Vite apuntarían a la raíz del dominio y los assets no se encontrarían.

> **IMPORTANTE — Ajustar la ruta base de Vite**
> En ese caso hay que definir `base: '/solarpuesto/'` en `app/vite.config.js`, volver a ejecutar `npm run build` y repetir las comprobaciones del capítulo 3. Este manual no aplica ese cambio porque el destino acordado es la raíz; queda documentado como criterio de extensión, heredado del capítulo 16 del Manual de Instalación.

# 5  Verificación posterior al despliegue

*Comprobaciones, caso de referencia y criterios de aceptación*

Un despliegue no termina cuando termina la copia. Termina cuando el sitio publicado responde igual que la versión de producción verificada en local.

## 5.1  Comprobaciones obligatorias

- [ ] La URL del sitio devuelve HTTP 200 y muestra el encabezado SolarPuesto V1.0.
- [ ] Las cinco pestañas (Inicio, Carga, Resultado, Guía, Presupuesto) responden.
- [ ] El botón **Puesto de jugos** carga los cinco aparatos del ejemplo.
- [ ] **Calcular resultado** abre la pestaña 2 con los tres indicadores.
- [ ] El desglose y el dimensionamiento muestran números, no `NaN` ni `undefined`.
- [ ] Las ocho fotografías de `materiales/` se visualizan en la guía.
- [ ] La consola del navegador no reporta 404 de `assets` ni de imágenes.
- [ ] Al recargar, la tabla y los parámetros se conservan (`localStorage`).
- [ ] Se imprimió o guardó un PDF del resultado como evidencia del despliegue.

## 5.2  Caso de referencia verificable

*Tabla 5.1. Resultado del ejemplo Puesto de jugos*

| Indicador | Valor esperado |
| --- | --- |
| **Potencia instalada** | 635 W |
| **Energía diaria** | 1.408,33 Wh/día |
| **Consumo nocturno** | 340 Wh/día |
| **Paneles** | 2 × 450 Wp (900 Wp) |
| **Banco de baterías** | 24 V · 147 Ah · DOD 50 % |
| **Inversor** | ≥ 794 W |
| **Controlador** | ≥ 50 A |

Si estos valores coinciden en el sitio publicado, el paquete desplegado es el mismo que pasó la suite de pruebas. Si difieren, no ajustes los datos en la aplicación: vuelve al capítulo 3 y reconstruye el paquete.

## 5.3  Criterios de aceptación

1. **Funcional** — El flujo completo de las cinco pestañas termina sin errores.
2. **Visual** — Estilos y fotografías cargan; la interfaz es legible en 320 px.
3. **De datos** — La persistencia local funciona tras recargar la página.
4. **De evidencia** — Se conserva el registro de comandos, la copia de `dist` y el PDF del resultado.

> **CONSEJO — Compara con las evidencias**
> Las nueve capturas de `Entregables_FasePruebas/Evidencias_Pruebas` se tomaron sobre la versión de producción en `http://localhost:4173`. Úsalas como patrón visual del sitio ya publicado.

# 6  Diagnóstico y reversión

*Síntomas frecuentes y cómo volver al paquete anterior*

Casi todos los problemas de un despliegue estático tienen una causa verificable en la ruta, los permisos o los tipos MIME. Anota siempre el mensaje exacto antes de cambiar algo.

## 6.1  Diagnóstico por síntoma

*Tabla 6.1. Diagnóstico de despliegue*

| Síntoma | Causa probable | Acción |
| --- | --- | --- |
| **Página en blanco con HTML cargado** | Falta el tipo MIME de `.js` o el bundle dio 404 | Revisar MIME y que `assets/` se haya copiado |
| **Estilos sin aplicar** | No se copió `index-*.css` o el MIME de `.css` es incorrecto | Volver a copiar `dist/assets/` |
| **Fotografías rotas en la guía** | Falta `dist/materiales/` | Copiar la carpeta de recursos completa |
| **404 en la raíz del sitio** | Se copió la carpeta `dist` en vez de su contenido | Subir `index.html` un nivel |
| **403 Forbidden** | Permisos de lectura del usuario del servidor | Otorgar lectura sobre el docroot |
| **EADDRINUSE en local** | Otro proceso usa el puerto 5173 o 4173 | Aceptar el puerto que propone Vite o cerrar el proceso |
| **`npm run build` falla** | Dependencias incompletas o error de código | Repetir `npm install` y leer el primer error |
| **`npm test` falla** | Se cambió un parámetro o un módulo | Revisar el cambio y comparar con los 5 casos |
| **La tabla desapareció** | Otro navegador, modo privado o datos borrados | Volver a cargar un ejemplo; es comportamiento esperado |
| **Los valores muestran `NaN`** | Se desplegó un `dist` anterior al cierre de DEF-01 | Reconstruir con el código de la entrega final |

> **CONSEJO — Un reporte útil ahorra tiempo**
> Indica el comando ejecutado, el mensaje completo, la versión de Node.js, el servidor web y el navegador. «No funciona» no permite reproducir nada.

## 6.2  Reversión al paquete anterior

La reversión es barata porque el artefacto es solo una carpeta de archivos estáticos. No hay migraciones de base de datos ni servicios que detener.

1. Conserva, antes de cada publicación, una copia del `dist` que está en producción (por ejemplo `dist_backup_AAAA-MM-DD`).
2. Si el nuevo paquete falla, detén la copia y sustituye el contenido del docroot por el de la copia.
3. Comprueba de nuevo las cinco pestañas y el caso Puesto de jugos.
4. Registra el incidente, el paquete revertido y la causa en la bitácora de la entrega.
5. Corrige en local, vuelve a ejecutar `npm test` y `npm run build`, y republica.

> **ATENCION — No edites archivos en el servidor**
> Nunca parches `index.html` ni el bundle directamente en el docroot para «salir del paso». Cualquier corrección se hace en el código fuente, se reconstruye y se publica un `dist` completo. Un parche manual se pierde en el siguiente despliegue y deja la documentación desactualizada.

# 7  Datos, privacidad y responsabilidades

*Qué ocurre con la información una vez publicado el sitio*

Que el servidor no tenga base de datos simplifica el despliegue, pero no elimina las responsabilidades: la tabla de cada vendedor queda en su propio navegador y no existe copia remota.

## 7.1  Comportamiento de los datos

*Tabla 7.1. Datos tras el despliegue*

| Dato | Dónde queda | Detalle |
| --- | --- | --- |
| **Tabla de aparatos** | localStorage del navegador | Clave `solarpuesto:v1` |
| **Parámetros configurables** | localStorage del navegador | Dentro del mismo estado |
| **Versión del formato** | localStorage | PARAMETROS_VERSION = 2 |
| **Estados antiguos de 12 V** | Se migran al abrir | Se ajusta solo tension = 24 V |
| **Resultado y presupuesto** | No se guardan | Se recalculan con la tabla y los parámetros |
| **Datos personales** | No existen | Sin cuentas, sin analítica, sin backend |

- Cambiar de navegador o de equipo **no traslada** la tabla.
- Borrar los datos del navegador **borra** la tabla guardada.
- El servidor **no recibe** ni almacena información de los puestos.
- En un equipo compartido, el usuario debe pulsar **Vaciar todo** al terminar.

> **PRIVACIDAD — La copia la hace el usuario**
> Guarda un PDF del resultado o una captura de la tabla antes de cerrar un trabajo importante. Es la única forma de conservar el escenario fuera del navegador y no es responsabilidad del despliegue.

## 7.2  Responsables y registro

1. **Quien construye** — Ejecuta la secuencia del capítulo 3 y firma el registro de comandos.
2. **Quien publica** — Copia `dist`, configura el servidor y completa el Anexo D.
3. **Quien verifica** — Recorre el capítulo 5 sobre la URL publicada, no sobre localhost.
4. **Quien custodia** — Conserva el proyecto fuente, la copia de `dist` y las evidencias.

> Un despliegue correcto no se mide por la ausencia de errores, sino por poder repetirlo y revertirlo.
> — Criterio de entrega de SolarPuesto V1.0

# A  Comandos de referencia

*Scripts de package.json usados en el despliegue*

```text
npm install              # instalar dependencias (primera vez)
npm test                # suite Vitest: 113 pruebas
npm run build           # genera la carpeta dist
npm run preview         # sirve dist localmente en :4173
npm run dev             # servidor de desarrollo en :5173
npm run test:e2e:rapido # Playwright sin interfaz
```
*Comandos disponibles en `app/package.json`*

*Tabla A.1. Comandos esenciales del despliegue*

| Comando | Cuándo usarlo |
| --- | --- |
| **npm run dev** | Durante el desarrollo o una demostración |
| **npm test** | Después de cualquier cambio en fórmulas o parámetros |
| **npm run build** | Antes de publicar o entregar |
| **npm run preview** | Para comprobar la versión de producción |

# B  Estructura del paquete publicado

*Qué debe existir en el docroot*

```text
<docroot>/
  index.html                       # documento predeterminado
  assets/
    index-XXXXXXXX.css             # hoja de estilos con hash
    index-XXXXXXXX.js              # bundle de la aplicación
  materiales/
    bateria-ciclo-profundo.jpg
    cable-solar.jpg
    conector-mc4.jpg
    controlador-carga.jpg
    fusible-100a.jpg
    inversor.jpg
    panel-solar.jpg
    regleta-usa.jpg
```
*Contenido esperado de `dist`*

> **IMPORTANTE — El hash no se edita**
> Los nombres `index-XXXXXXXX.*` los genera Vite. Si el build cambia, `index.html` apunta a archivos nuevos: copia siempre el `dist` completo, nunca archivos sueltos.

# C  Glosario de despliegue

*Términos usados en este manual*

*Tabla C.1. Glosario*

| Término | Significado |
| --- | --- |
| **Build** | Compilación que transforma el código fuente en la carpeta `dist` |
| **Bundle** | Archivo JavaScript que contiene la aplicación empaquetada |
| **dist** | Carpeta de salida de `npm run build`; es el artefacto publicable |
| **Docroot** | Directorio raíz desde el cual el servidor web sirve los archivos |
| **Documento predeterminado** | Archivo que se entrega cuando se pide la raíz (`index.html`) |
| **Tipo MIME** | Etiqueta que indica al navegador cómo interpretar cada archivo |
| **SPA** | Single Page Application: aplicación de una sola página |
| **Static hosting** | Alojamiento que solo entrega archivos, sin ejecutar código de servidor |
| **Rollback** | Volver al paquete anterior ante una publicación fallida |
| **HSP** | Horas solar pico: horas equivalentes de sol a intensidad máxima |
| **DOD** | Profundidad de descarga: fracción de la batería que se puede usar |
| **localStorage** | Almacenamiento local del navegador, sin servidor |

# D  Lista de verificación de despliegue

*De cero a aplicación publicada*

Completar y conservar junto a las evidencias de la entrega. Indicar fecha y responsable.

- [ ] Node.js y npm responden en la terminal (`node -v`, `npm -v`).
- [ ] Ejecuté `npm install` sin errores.
- [ ] `npm test` reporta **113 pruebas aprobadas** en 5 archivos.
- [ ] `npm run build` genera `dist` sin errores (43 módulos).
- [ ] `dist/index.html`, `dist/assets/` y `dist/materiales/` existen.
- [ ] `npm run preview` abre la aplicación en `http://localhost:4173`.
- [ ] Las cinco pestañas responden y el ejemplo Puesto de jugos carga datos.
- [ ] Las ocho fotografías de materiales se visualizan en la guía.
- [ ] Conservé una copia del `dist` anterior (si aplica).
- [ ] Copié **el contenido** de `dist` al docroot, no la carpeta.
- [ ] El documento predeterminado es `index.html` y los tipos MIME están definidos.
- [ ] El usuario del servidor tiene permisos de lectura.
- [ ] La URL publicada devuelve HTTP 200 y pasa el capítulo 5.
- [ ] Guardé el PDF del resultado y el registro de comandos.
- [ ] Registré fecha, responsable y paquete publicado.
- [ ] Sé cómo revertir al paquete anterior (capítulo 6).

# E  Trazabilidad con el proyecto

*De dónde vienen los valores de este manual*

- El ciclo de vida «análisis → diseño → desarrollo → pruebas → **despliegue**» está definido en el `CONTEXTO_PROYECTO.md` del Acta 001.
- El hito **M5 (20/11/2026)** registra la entrega final con manual y demostración.
- Los requisitos y la arquitectura estática provienen del Acta 003 (`Arquitectura_y_Stack_SolarPuesto_V1.md`).
- El build de 43 módulos, las 113 pruebas y las capturas sobre `:4173` provienen del `Informe_de_Pruebas_SolarPuesto_V1.md`.
- Los capítulos 12 a 20 y el Anexo D del `Manual_de_Instalacion_SolarPuesto_V1.md` son la base que este documento ordena y amplía.
- El caso Puesto de jugos y sus valores provienen de los cinco casos del **Acta de Reunión No. 002**.
- La entrega final se registra en el **Acta No. 007**, del 06/11/2026.

## Control de versiones del documento

El producto conserva el nombre «V1.0» porque es la versión entregada. La edición del documento cambia cuando cambia su contenido o su diseño.

*Tabla. Historial del documento*

| Versión | Fecha | Cambio |
| --- | --- | --- |
| **1.0** | 13/11/2026 | Versión inicial del manual de despliegue: paquete estático dist, publicación en Nginx/Apache/IIS, verificación, diagnóstico, reversión y lista de verificación. Alineada con SolarPuesto V1.0 y la suite de 113 pruebas. |

### Trazabilidad con el proyecto

- Los valores de referencia provienen de los cinco casos del **Acta de Reunión No. 002**.
- El controlador de carga y el cambio de tensión a 24 V provienen del **Acta No. 005** (D-06 y D-07).
- La suite de **113 pruebas** y el cierre de defectos están en el Informe de Pruebas de la fase de entrega.
- La entrega final se registra en el **Acta No. 007**, del 06/11/2026.

> **NOTA — Sobre el pie de la aplicación**
> La versión evaluada muestra en su pie la fase de desarrollo y el acta de la sesión de trabajo. Este manual no modifica la aplicación: documenta su comportamiento tal como se entregó.

Para citar este documento: Heyner Alberto Aldana Herrera. Manual de Despliegue — SolarPuesto V1.0. SP-MD-002, edición 1.0. Neiva, Huila, 13/11/2026.

## Para cerrar

El despliegue termina cuando el sitio publicado responde igual que la versión de producción verificada en local, cuando existe una copia del paquete anterior y cuando alguien puede repetir el procedimiento leyendo este documento. No termina cuando termina la copia de archivos.

Publicar sin verificar convierte un error de rutas en una falla visible para todos. Verificar, registrar y saber revertir son las tres condiciones que hacen que una entrega sea reproducible.

> Un despliegue correcto no se mide por la ausencia de errores, sino por poder repetirlo y revertirlo.
> — Criterio de entrega de SolarPuesto V1.0

## Créditos y licencias

Este manual fue escrito para el proyecto SolarPuesto V1.0. Los diagramas se generaron para la documentación del proyecto con la identidad visual de la aplicación. Los bloques de comandos y configuración son texto propio, verificados contra el entorno de la entrega final.

*Tabla. Procedencia de los recursos gráficos*

| Recurso | Origen | Uso |
| --- | --- | --- |
| **Diagrama de despliegue** | Producción propia (assets/despliegue.png) | Ilustrar el recorrido de código a navegador |
| **Diagrama de arquitectura** | Producción propia (assets/arquitectura_app.png) | Mostrar las capas de la aplicación |
| **Portadas y diagramas** | Producción propia para esta edición | Identidad visual del documento |
| **Bloques de comandos** | app/package.json y configuración de servidor | Reproducir el procedimiento |
| **Tipografía** | Segoe UI (Microsoft) | Composición del documento |

Las marcas y nombres comerciales que aparecen en las fotografías pertenecen a sus respectivos titulares y se muestran con fines educativos.
