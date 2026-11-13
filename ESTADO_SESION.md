# Estado de sesión — SolarPuesto V1.0

**Última actualización:** 13/11/2026
**Alcance:** Fase de pruebas y entrega final + manual de despliegue (el historial de Sprint 1/2 sigue abajo)

> Este archivo es una nota de trabajo para retomar la sesión. **No es un entregable.**
> Está sin rastrear en git y conviene borrarlo antes de entregar el proyecto.

---

## 0. Entregables de la entrega final (06/11/2026)

Dos documentos clave, ambos V1.0 y con versión `.docx` junto al `.md`:

| Documento | Ruta | Contenido |
|---|---|---|
| **Manual de instalación** | `Entregables_EntregaFinal\Manual_de_Instalacion_SolarPuesto_V1.md` | Instalación física del sistema solar (paneles, controlador, baterías, inversor, protecciones, puesta a tierra) + **Anexo A** de instalación de la app (Node 18+, `npm install`, `npm run dev`, `npm run build`, `npm test`). Incluye seguridad, secuencia de montaje, verificación, mantenimiento, solución de problemas, glosario y checklist final. |
| **Informe de pruebas** | `Entregables_FasePruebas\Informe_de_Pruebas_SolarPuesto_V1.md` | Suite de **113/113 pruebas aprobadas** (5 archivos: fórmulas 31, validaciones 26, almacén 15, componentes 6, caja negra 35), build de producción OK (43 módulos, 936 ms), **DEF-01 cerrado** (guía mostraba "Sin calcular"/`undefined`/`NaN`; se agregaron `ppanel`, `tension`, `dod` a `dimensionar()`), 9 capturas de evidencia. |

También en `Entregables_EntregaFinal\`: `Manual_de_Usuario_SolarPuesto_V1.md/.docx`.
Evidencias: `Entregables_FasePruebas\Evidencias_Pruebas\01_Inicio.png` … `09_Validacion_Errores.png`.

### 0.1 Manual de despliegue (añadido 13/11/2026)

Se creó el entregable independiente que la rúbrica pedía. Antes solo existía contenido de
despliegue **dentro** del Manual de Instalación (Parte II: §12–§20 y Anexo D); no había
`Manual_de_Despliegue_*` ni carpeta `Entregables_FaseDespliegue`.

| Archivo | Ruta |
|---|---|
| `.md` / `.docx` / `.pdf` | `Entregables_EntregaFinal\Manual_de_Despliegue_SolarPuesto_V1.*` |
| Copia del PDF para subir | `Entregables_EntregaFinal\DOCUMENTACION SUBIR\Manual_de_Despliegue_SolarPuesto_V1.pdf` |

Ficha: **SP-MD-002**, edición **1.0 — Edición inicial**, 13/11/2026. 29 páginas en PDF.
Contenido: qué se publica (`dist`), requisitos de construcción vs. publicación, secuencia
`npm test` → `npm run build` → `npm run preview` (:4173), procedimiento paso a paso para
**Nginx / Apache / IIS** en la raíz del sitio, nota sobre `base` de Vite para subcarpetas,
verificación posterior, diagnóstico, rollback, privacidad, anexos (comandos, estructura de
`dist`, glosario, checklist, trazabilidad M5/Acta 007). No duplica la Parte II; la referencia.

Generador reutilizado (fuera del repo):
`C:\Users\Heyner\AppData\Local\Temp\opencode\solarpuesto_manuales\`
- Nuevo `content_despliegue.py`; adaptados `content_comun.py` (`META_DESPLIEGUE` + ramas
  por `kind`), `assets.py` (portada/contraportada `despliegue`), `build_md.py` y `build.py`
  (tercer `kind`). `brand.py:435` ahora parametriza edición y fecha del encabezado/pie;
  los dos manuales anteriores conservan sus valores por defecto.
- Comandos: `python build_md.py despliegue` · `python build.py despliegue` ·
  `export_pdf.ps1 -Docx … -Pdf …`.

Verificación de la sesión: `npm test` **113/113** (5 archivos), `npm run build` 43 módulos,
`npm run preview` HTTP 200 en `:4173`, `dist/materiales` con 8 fotos, PDF sin mojibake y
con TOC actualizado. **Los dos manuales existentes quedaron byte-idénticos** (SHA-256
comprobado antes y después). Este entregable no tocó código de la app (el ajuste de
`app/vite.config.js` para excluir `e2e/**` de Vitest quedó de la sesión anterior). Sin commit.

> **Ojo:** las secciones 1–8 de abajo son históricas (Sprint 1/2, 70 pruebas). El estado
> vigente es 113 pruebas en verde y fase de entrega final.

---

## 1. Estado general

Sprint 1 y Sprint 2 están **cerrados y verificados**. La aplicación corre y muestra los cambios.

| Comprobación | Resultado |
|---|---|
| Suite de pruebas | **70/70 en verde** (4 archivos) |
| Build de producción | correcto — `dist/assets/index-CtAzTKqW.js` |
| Verificación en la app viva (DOM) | **20/20 comprobaciones** |
| Dev server | activo en <http://localhost:5173> |
| Commits | **ninguno**. Último: `2271680` |

---

## 2. Qué se incorporó

### Compromiso 1 — D-01, U-04 y D-07 (Sprint 2, 09/10/2026)
- `app/src/lib/formulas.js:19-24` — `horasDeUso()` ya **no** multiplica por la cantidad.
- `app/src/lib/formulas.js:34` — la cantidad se aplica **una sola vez**, sobre la potencia.
- `app/src/lib/formulas.js:7` — `DEFAULTS.tension: 24` (antes 12 V).
- `app/src/App.jsx:427` — etiqueta `por unidad (× N)` cuando la cantidad es mayor que 1.
- `app/src/lib/almacen.js:15` — `PARAMETROS_VERSION = 2`, migra tablas guardadas a 24 V sin perder datos.
- Pruebas: `formulas.test.js:20` (U-04 reescrita), `:31` (U-04b, 2016.67), `:66` (U-06b, 24 V).

### Compromiso 2 — cinco pruebas de valor exacto (Sprint 2, 09/10/2026)
- `app/tests/formulas.test.js:114-135` — ficha `ESPERADO` con 7 magnitudes por cada uno de los 5 casos del Acta 002.
- `app/tests/formulas.test.js:141` y `:154` — dos `it.each(CASOS)` generan 10 casos.

### Compromiso 3 — suite CRUD de la tabla (Sprint 2, 09/10/2026)
- `app/tests/App.test.jsx:51` registrar · `:71` editar · `:96` eliminar.
- Cierra el vacío del Sprint 1: la tabla CRUD estaba evidenciada por capturas, sin pruebas automáticas.

---

## 3. Cómo volver a verificar

```powershell
cd C:\Users\Heyner\Desktop\SolarPuesto\app
npm test                 # esperado: Test Files 4 passed, Tests 70 passed
npm run build            # esperado: built in ~0.5s, sin errores
npm run dev              # http://localhost:5173  (IPv6 ::1)
```

Verificación de la app viva con las 20 comprobaciones del DOM (requiere Chrome con
depuración en el puerto 9333):

```powershell
node C:\Users\Heyner\AppData\Local\Temp\opencode\capturar_acta05.mjs
# esperado: "=== TODAS LAS COMPROBACIONES PASARON ==="
```

### Recorrido visual para ver los cambios

1. **D-01** — caso *Puesto de jugos* (2 licuadoras de 550 W, 55 usos de 2 min).
   La fila debe mostrar `2 min × 55 usos · por unidad (× 2) · ≈ 2016,667 Wh/día`.
   Antes mostraba **4.033**. Bajar la cantidad a `1` debe dar exactamente la mitad: `≈ 1008,333`.
2. **D-07** — bloque *Banco de batería*: `24 V · DOD 50%` y **147 Ah** (antes 12 V / 293 Ah).
   El campo editable se llama **"Tensión batería (V)"** y abre en 24.
3. **Compromiso 2** — caso *Puesto mixto*: **645 W** y **1.471,667 Wh/día**, nocturno 460 Wh.
4. **Compromiso 3** — botón **+ Añadir aparato**: el KPI se recalcula solo; editar la potencia
   no duplica la fila; el botón 🗑 borra con confirmación.
5. Pie de página: **"Acta de Reunión No. 005"**.

---

## 4. Decisiones tomadas

- **El Acta 005 se queda en 67** ("solamente las 67"). **No se modifica.**
  - Las 67 del acta = suite sin `App.test.jsx` (26 + 15 + 26 = 67).
  - Las 70 actuales = esas 67 + los 3 casos CRUD del Compromiso 3.
  - No es contradicción de fondo: el acta registra el entorno antes de entregar el
    Compromiso 3, que ella misma crea. Pero un docente que lea acta → evidencia verá 67 vs 70.
  - *Pendiente opcional:* una línea en el documento de evidencia aclarándolo.
- **Actas 004 y 005 intactas desde el 26/09 10:56.** No se regeneraron.
- **Documentos sellados no modificados:** Modelo Matemático, Plan de Pruebas, Gantt.
- **Sin commit** en todo el trabajo.

---

## 5. Evidencia entregada

- `Evidencias_Acta_005/` — 8 capturas PNG.
- `Entregables_FaseDesarrollo/Evidencias_Capturas_Acta_005.docx` — 12 págs, 9 tablas,
  8 imágenes, 1.905 palabras, sin mojibake.
- `ACTA 5/Acta_Reunion_05_Cierre_Sprint_1.docx` — 4 compromisos, 6 págs, 0 tablas.

Las capturas se obtuvieron vía CDP de Chrome y cada una lleva aserciones sobre el DOM
ejecutadas en el momento del disparo: el contenido de la imagen está **verificado**, no solo observado.

---

## 6. Pendiente — Sprint 3 (W7, 12/10 → 16/10/2026)

Requiere **autorización explícita** para editar el Modelo Matemático, que es un documento sellado.

| Ítem | Ref. | Detalle |
|---|---|---|
| Corregir tabla §6 | **D-03** | §6 declara 657 W (jugos) y 665 W (mixto); las sumas reales son 635 W y 645 W. Las energías 1.408 y 1.472 Wh/día **sí** cuadran. Aparece igual en el Plan de Pruebas. |
| Controlador de carga | **D-06** | El Acta 005 lo registra como *requisito pendiente a comprometer* en el acta del Sprint 3, **no** como compromiso con fecha. Falta además exponer el voltaje de trabajo del panel, que la app hoy no muestra. |
| Manual de instalación y uso | **Compromiso 4** | Entrega 16/10/2026, antes de M4. Debe incluir: ejemplo de manipulación de un caso completo, manual por elementos (ubicación del panel, cableado, banco de baterías, inversor, puesta en marcha) y apartado de aprovechamiento (consumo nocturno, horas pico reales, uso de la batería). **Falta decidir** si va como archivo nuevo o como sección de la guía existente en el aplicativo. |

---

## 7. Higiene del repo — decisiones pendientes

- **Move sin commitear.** Estos archivos están borrados en la raíz pero presentes en
  `Entregables_FaseDiseño/`: `README.md`, `CONTEXTO_PROYECTO.md`,
  `1_Formato_Acta_Reunion_03.pdf`, `RESUMEN_INTERROGATORIO.docx`, `RESUMEN_INTERROGATORIO.md`,
  `SolarPuesto_Mockup_V1.0.zip`. Sin `git add -A` que registre el movimiento, git lo verá como
  borrados + altas sin relación.
- `.gitignore` **ya restaurado** en la raíz (regla `~$*` en lugar de dos específicas por
  extensión). El duplicado de `Entregables_FaseDiseño/.gitignore` se eliminó: dentro de un
  subdirectorio un `.gitignore` solo aplica a ese subárbol, así que nunca habría protegido
  `app/node_modules`.
- Lock files vivos que quedan: `~$SolarPuesto_Desarrollo_Gantt.xlsx` y
  `~$ta_Reunion_04_...docx` (documentos abiertos ahora mismo). Se van solos al cerrarlos;
  ya están ignorados por git.
- `ACTA 4/Acta_Reunion_04_Inicio_Fase_Desarrollo.ORIGINAL-con-tablas.docx` es un respaldo
  con las tablas. Borrar si no se quiere conservar.

---

## 8. Precauciones

- **Los generadores de Word necesitan BOM UTF-8.** PowerShell 5.1 corrupta los acentos si el
  `.ps1` está en UTF-8 sin BOM. Convertir antes de ejecutar:
  ```powershell
  $f = "ruta\generar_x.ps1"
  $t = [System.IO.File]::ReadAllText($f, (New-Object System.Text.UTF8Encoding($false)))
  [System.IO.File]::WriteAllText($f, $t, (New-Object System.Text.UTF8Encoding($true)))
  ```
- **En PowerShell, los paths con `~$` van entre comillas simples.** En comillas dobles
  `"~$archivo.docx"` expande `$archivo` como variable y el path queda mal.
- **`git check-ignore -q` no imprime nada** (por eso el `-q`). Para probarlo hay que mirar
  `$LASTEXITCODE`, no la salida. Un `if (git check-ignore -q ruta)` siempre da falso.
- `app/tests` usa `fireEvent`; no están instalados `@testing-library/user-event` ni
  `@testing-library/jest-dom`.

### Archivos auxiliares (fuera del repo)

| Ruta | Para qué |
|---|---|
| `…\Temp\opencode\generar_acta05.ps1` | regenera el Acta 005 |
| `…\Temp\opencode\generar_evidencias_005.ps1` | regenera el documento de evidencia |
| `…\Temp\opencode\capturar_acta05.mjs` | capturas + 20 aserciones DOM |
| `…\Temp\opencode\vitest_acta05.txt` | salida de la suite |
| `…\Temp\opencode\evid005_texto.txt` | texto plano del documento de evidencia |
| `…\Temp\opencode\acta05_texto.txt` | texto plano del Acta 005 |
