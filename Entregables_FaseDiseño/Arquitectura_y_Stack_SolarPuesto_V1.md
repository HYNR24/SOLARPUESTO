# Arquitectura y Stack Tecnológico — SolarPuesto V1.0

**Asignatura:** Ingeniería de Software II (XP — desarrollo guiado por pruebas, programación en parejas)
**Entregable:** Acta 003, Eje 3 (Arquitectura y Stack) + compromiso 1 del Acta 002.
**Fecha de diseño:** semana de revisión del hito M2 (25/09/2026).

---

## 1. Objetivo de la arquitectura

Soportar un MVP que: registre los aparatos del puesto (CRUD), calcule P(W) y E(Wh/día) según el **uso real** por elemento, dimensione paneles/batería/inversor con refinio del consumo nocturno, y muestre una guía de instalación — todo ello **usable por un vendedor sin formación técnica en su celular** (RFN-01 y RFN-02).

## 2. Patrón arquitectónico

**SPA por capas orientada al dominio, con módulos de cálculo puros:**

```
┌─────────────────────────────────────────────────────────┐
│  P R E S E N T A C I Ó N   (React)                        │
│  Pantallas: Carga · Resultado · Guía                      │
│  Componentes: TablaCarga, Desglose, Dimensionamiento,     │
│               ParametrosConfigurables, GuiaCasos          │
├─────────────────────────────────────────────────────────┤
│  DOMINIO / LÓGICA   (módulos puros, sin UI → TDD)         │
│  lib/formulas.js   → P(W), E(Wh), paneles, batería,       │
│                      inversor, consumo nocturno           │
│  lib/validaciones.js → reglas de datos (RFN-04)           │
│  lib/casos.js      → 5 casos de referencia editables      │
├─────────────────────────────────────────────────────────┤
│  DATOS   (persistencia local, RFN-05 – sin datos          │
│           personales ni servidor)                         │
│  localStorage ↔ repositorio (leer/guardar lista de        │
│  aparatos y parámetros configurables de la sesión)        │
└─────────────────────────────────────────────────────────┘
```

Reglas del patrón:
- **La capa de lógica no importa React** → 100 % testable (Vitest) sin DOM.
- Los componentes llaman a `dimensionar(aparatos, parametros)` y reciben un resultado puro que solo se renderiza/imprime.
- La persistencia se encapsula en un módulo de datos, de modo que el mockup pueda migrar a IndexedDB o a una API futura sin tocar la lógica.

## 3. Stack seleccionado

| Capa | Tecnología | Justificación |
|---|---|---|
| Interfaz | **React 18 + Vite** | SPA rápida, ecosistema amplio, componentes reutilizables para las pantallas del MVP |
| Aplicación | JavaScript (ESModules) | JS estándar del navegador; sin build complejo para 2 devs en XP |
| Estilos | CSS3 (CSS Grid/Flexbox, tema solar) | Responsive: **tabla con scroll horizontal en móvil** (RFN-02) |
| Pruebas | **Vitest + React Testing Library + jsdom** | Actualización rápida, integrado con Vite, ideal para TDD |
| Persistencia | **localStorage** | RFN-05: sin datos personales; almacenamiento local del registro de aparatos y parámetros configurables |
| Control de versiones | Git (repositorio en `SolarPuesto/`) | Entorno para programación en parejas |


## 4. Modelo de datos

### 4.1 Aparato
```js
{
  id: string,
  nombre: string,
  cantidad: number,      // ≥ 1 entero
  potencia: number,      // W por unidad (etiqueta), > 0
  tipo: 'usos' | 'continuo' | 'refri',
  horario: 'dia' | 'noche' | 'ambos',
  // específicos por tipo:
  min?: number,          // usos: minutos por uso
  usos?: number,         // usos: usos al día
  horas?: number,        // continuo: horas encendido/día
  horasConectado?: number, // refri: horas conectado/día
  ciclo?: number         // refri: % ciclo de trabajo (20–60)
}
```

### 4.2 Parámetros configurables (RFN-05, persistidos)
```js
{
  hsp: 4.5,      // horas pico solar (Neiva)
  eff: 0.80,     // eficiencia del sistema
  margen: 0.25,  // margen de pérdidas
  tension: 12,   // V del banco
  dod: 0.50,     // profundidad de descarga
  ppanel: 450    // Wp por panel comercial
}
```

### 4.3 Salida del cálculo (puro)
```js
{
  filas, totalW, totalWh, pico,
  wp, nPaneles, ah, watInversor,
  nocturnoWh
}
```

## 5. Entorno de desarrollo (TDD)

- Repositorio: `C:\Users\Heyner\Desktop\SolarPuesto` (raíz git).
- Estructura inicial:

```
SolarPuesto/
├─ ACTA 1/  ACTA 2/  ACTA3/          # actas y prototipo
├─ Entregables_FaseDiseño/           # documentación de diseño
├─ app/                              # aplicación React + Vite
│  ├─ index.html
│  ├─ package.json
│  ├─ vite.config.js
│  ├─ src/
│  │  ├─ main.jsx · App.jsx
│  │  ├─ lib/formulas.js · validaciones.js · casos.js
│  │  └─ components/...
│  └─ tests/
│     └─ formulas.test.js
├─ README.md
└─ .gitignore
```

- Ciclo XP: escribir el test → verificar que falla → implementar en `lib/` → test verde → refactor.
- Comandos: `npm install` · `npm run dev` · `npm test`.

## 6. Decisiones de diseño relevantes

1. **Potencia por unidad:** el campo `potencia` es la de etiqueta de un aparato; `cantidad` multiplica.
2. **Uso real por tipo:** por usos (min×usos), continuo (horas), refrigeración (ciclo). Evita sobredimensionar/estimar mal.
3. **Refinio nocturno:** el `horario` distingue día/noche/ambos; la batería garantiza cubrir `E_noche` y los paneles recargan dentro de las HSP de Neiva.
4. **Responsive: tabla con scroll horizontal en móvil** (decisión Acta/diseño 25/09).
5. **Sin autenticación ni backend en el MVP** (RFN-05); el modelo de datos deja la puerta abierta a una API futura.