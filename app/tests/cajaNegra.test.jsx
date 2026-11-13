import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { App } from "../src/App.jsx";

// ============================================================================
// PRUEBAS DE CAJA NEGRA — SolarPuesto V1.0
// ----------------------------------------------------------------------------
// La aplicación se trata como una caja opaca: solo se interactúa con lo que el
// usuario ve (botones, campos, textos y tablas). No se importa ni se inspecciona
// ningún módulo interno (formulas.js, validaciones.js, almacen.js, casos.js):
// la única dependencia es el componente raíz <App />.
//
// Cada bloque corresponde a un apartado real de la interfaz:
//   Inicio · Carga de aparatos · Resultado · Guía de instalación ·
//   Presupuesto · Persistencia · Pie de página.
// ============================================================================

const norm = (s) => String(s).replace(/[\u00a0\u202f]/g, " ");

const aEntero = (texto) => {
  const d = norm(texto).replace(/[^\d]/g, "");
  return d === "" ? NaN : parseInt(d, 10);
};

const filasCarga = (container) => container.querySelectorAll(".tabla-wrap tbody tr");
const filasDesglose = (container) => container.querySelectorAll("#desglose tbody tr");
const filasPresupuesto = (container) =>
  container.querySelectorAll(".presupuesto-tabla tbody tr");

const ir = (nombre) => fireEvent.click(screen.getByRole("button", { name: nombre }));
const irCarga = () => ir(/1\. Carga de aparatos/i);
const irResultado = () => ir(/^2\. Resultado$/i);
const irGuia = () => ir(/^3\. Guía de instalación$/i);
const irPresupuesto = () => ir(/^4\. Presupuesto$/i);

const anadir = () => {
  irCarga();
  ir(/Añadir aparato/i);
};

const cargarEjemplo = (nombre) => {
  irCarga();
  ir(nombre);
};

const calcular = () => ir(/Calcular resultado/i);

const llenar = (fila, { nombre, cantidad, potencia }) => {
  if (nombre !== undefined)
    fireEvent.change(fila.querySelector("input.nombre"), { target: { value: nombre } });
  if (cantidad !== undefined)
    fireEvent.change(fila.querySelector("input.cantidad"), { target: { value: cantidad } });
  if (potencia !== undefined)
    fireEvent.change(fila.querySelector("input.potencia"), { target: { value: potencia } });
};

const usarUsos = (fila, { min, usos }) => {
  fireEvent.change(fila.querySelector("input.min_uso"), { target: { value: min } });
  fireEvent.change(fila.querySelector("input.usos_dia"), { target: { value: usos } });
};

const usarContinuo = (fila, { horas }) => {
  fireEvent.change(fila.querySelector("select.tipo"), { target: { value: "continuo" } });
  fireEvent.change(fila.querySelector("input.horas_dia"), { target: { value: horas } });
};

const usarRefri = (fila, { horasConectado, ciclo }) => {
  fireEvent.change(fila.querySelector("select.tipo"), { target: { value: "refri" } });
  fireEvent.change(fila.querySelector("input.horas_conn"), {
    target: { value: horasConectado }
  });
  fireEvent.change(fila.querySelector("input.ciclo"), { target: { value: ciclo } });
};

const usoTotal = (fila) => norm(fila.querySelector(".celda-uso-total").textContent);
const kpi = (container, clase) => norm(container.querySelector(clase).textContent);

const valorParametro = (container, etiqueta) => {
  const campos = [...container.querySelectorAll(".parametros .campo")];
  const campo = campos.find((c) => norm(c.querySelector("label").textContent).includes(etiqueta));
  return campo ? campo.querySelector("input").value : null;
};

const cambiarParametro = (container, etiqueta, valor) => {
  const campos = [...container.querySelectorAll(".parametros .campo")];
  const campo = campos.find((c) => norm(c.querySelector("label").textContent).includes(etiqueta));
  fireEvent.change(campo.querySelector("input"), { target: { value: valor } });
};

let confirmOriginal;
let printOriginal;

beforeEach(() => {
  localStorage.clear();
  confirmOriginal = window.confirm;
  printOriginal = window.print;
  window.confirm = () => true;
});

afterEach(() => {
  window.confirm = confirmOriginal;
  window.print = printOriginal;
  cleanup();
});

// ---------------------------------------------------------------------------
// 0. INICIO
// ---------------------------------------------------------------------------
describe("Caja negra · Inicio", () => {
  it("INI-01: muestra el hero y los tres pasos del flujo", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: /La energía solar de tu puesto, calculada en minutos/i })
    ).toBeTruthy();
    expect(screen.getByText(/1\. Registra tus aparatos/i)).toBeTruthy();
    expect(screen.getByText(/2\. Calcula tu sistema/i)).toBeTruthy();
    expect(screen.getByText(/3\. Instala con seguridad/i)).toBeTruthy();
  });

  it("INI-02: el botón principal abre la pestaña de carga", () => {
    render(<App />);
    ir(/Empezar con mi tabla de aparatos/i);
    expect(
      screen.getByRole("heading", { name: /Tabla de carga de aparatos de tu puesto/i })
    ).toBeTruthy();
  });

  it("INI-03: el botón secundario abre la guía de instalación", () => {
    render(<App />);
    ir(/Ver guía de instalación/i);
    expect(
      screen.getByRole("heading", { name: /Guía de instalación personalizada/i })
    ).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// 1. CARGA DE APARATOS
// ---------------------------------------------------------------------------
describe("Caja negra · Carga de aparatos", () => {
  it("CAR-01: añadir aparato crea una fila vacía", () => {
    const { container } = render(<App />);
    irCarga();
    expect(filasCarga(container)).toHaveLength(0);
    ir(/Añadir aparato/i);
    expect(filasCarga(container)).toHaveLength(1);
  });

  it("CAR-02: cargar un ejemplo llena la tabla con sus aparatos", () => {
    const { container } = render(<App />);
    cargarEjemplo(/Puesto de jugos/i);
    const filas = filasCarga(container);
    expect(filas).toHaveLength(5);
    expect(filas[0].querySelector("input.nombre").value).toBe("Licuadora (jugos)");
    expect(filas[0].querySelector("input.potencia").value).toBe("550");
  });

  it("CAR-03: al editar, el uso total se recalcula en vivo", () => {
    const { container } = render(<App />);
    anadir();
    const fila = filasCarga(container)[0];
    llenar(fila, { nombre: "Licuadora", potencia: "550" });
    usarUsos(fila, { min: "2", usos: "55" });
    expect(usoTotal(fila)).toContain("1 h 50 min");
    expect(usoTotal(fila)).toMatch(/1[. ]?008,3/);

    fireEvent.change(fila.querySelector("input.potencia"), { target: { value: "1100" } });
    expect(usoTotal(fila)).toMatch(/2[. ]?016,6/);
  });

  it("CAR-04: eliminar borra solo la fila indicada", () => {
    const { container } = render(<App />);
    anadir();
    const primera = filasCarga(container)[0];
    llenar(primera, { nombre: "Licuadora", potencia: "550" });
    usarUsos(primera, { min: "2", usos: "55" });

    ir(/Añadir aparato/i);
    const segunda = filasCarga(container)[1];
    llenar(segunda, { nombre: "Radio", potencia: "40" });
    usarContinuo(segunda, { horas: "6" });

    fireEvent.click(primera.querySelector(".btn-eliminar"));
    expect(filasCarga(container)).toHaveLength(1);
    expect(filasCarga(container)[0].querySelector("input.nombre").value).toBe("Radio");
  });

  it("CAR-05: la cantidad multiplica la potencia una sola vez (no duplica la energía)", () => {
    const { container } = render(<App />);
    anadir();
    const fila = filasCarga(container)[0];
    llenar(fila, { nombre: "Licuadora", cantidad: "2", potencia: "550" });
    usarUsos(fila, { min: "2", usos: "55" });
    // 550 W × 2 unidades × 1,8333 h = 2.016,7 Wh/día (antes del arreglo D-01 eran 4.033)
    expect(usoTotal(fila)).toMatch(/2[. ]?016,6/);
    expect(usoTotal(fila)).toContain("(× 2)");
  });

  it("CAR-06: vaciar todo deja la tabla limpia y borra lo guardado", () => {
    const { container, unmount } = render(<App />);
    cargarEjemplo(/Puesto de jugos/i);
    expect(filasCarga(container)).toHaveLength(5);

    ir(/Vaciar todo/i);
    expect(filasCarga(container)).toHaveLength(0);

    unmount();
    const segunda = render(<App />);
    irCarga();
    expect(filasCarga(segunda.container)).toHaveLength(0);
  });

  it("CAR-07: sin nombre no se puede calcular y aparece el resumen de errores", () => {
    const { container } = render(<App />);
    anadir();
    const fila = filasCarga(container)[0];
    llenar(fila, { potencia: "550" });
    usarUsos(fila, { min: "2", usos: "55" });

    calcular();
    expect(screen.getByRole("alert")).toBeTruthy();
    expect(screen.getByRole("alert").textContent).toMatch(/Escribe el nombre/i);
    expect(
      screen.getByRole("heading", { name: /Tabla de carga de aparatos de tu puesto/i })
    ).toBeTruthy();
  });

  it("CAR-08: una potencia de 0 W es rechazada", () => {
    const { container } = render(<App />);
    anadir();
    const fila = filasCarga(container)[0];
    llenar(fila, { nombre: "Aparato", potencia: "0" });
    usarUsos(fila, { min: "1", usos: "1" });
    calcular();
    expect(screen.getByRole("alert").textContent).toMatch(/potencia debe ser mayor que 0/i);
  });

  it("CAR-09: una cantidad de 0 es rechazada", () => {
    const { container } = render(<App />);
    anadir();
    const fila = filasCarga(container)[0];
    llenar(fila, { nombre: "Aparato", cantidad: "0", potencia: "10" });
    usarUsos(fila, { min: "1", usos: "1" });
    calcular();
    expect(screen.getByRole("alert").textContent).toMatch(/cantidad debe ser 1 o más/i);
  });

  it("CAR-10: un nombre repetido es rechazado", () => {
    const { container } = render(<App />);
    anadir();
    const fila = filasCarga(container)[0];
    llenar(fila, { nombre: "Licuadora", potencia: "550" });
    usarUsos(fila, { min: "2", usos: "55" });

    ir(/Añadir aparato/i);
    const fila2 = filasCarga(container)[1];
    llenar(fila2, { nombre: "licuadora", potencia: "300" });
    usarUsos(fila2, { min: "2", usos: "10" });

    calcular();
    expect(screen.getByRole("alert").textContent).toMatch(/ya está en otra fila/i);
  });

  it("CAR-11: el ciclo de refrigeración fuera de 20–60 % es rechazado", () => {
    const { container } = render(<App />);
    anadir();
    const fila = filasCarga(container)[0];
    llenar(fila, { nombre: "Nevera", potencia: "90" });
    usarRefri(fila, { horasConectado: "12", ciclo: "70" });
    calcular();
    expect(screen.getByRole("alert").textContent).toMatch(/entre 20 y 60/i);
  });

  it("CAR-12: un aparato continuo con más de 24 h es rechazado", () => {
    const { container } = render(<App />);
    anadir();
    const fila = filasCarga(container)[0];
    llenar(fila, { nombre: "Lámpara", potencia: "10" });
    usarContinuo(fila, { horas: "25" });
    calcular();
    expect(screen.getByRole("alert").textContent).toMatch(/Máximo 24 horas/i);
  });

  it("CAR-13: un ejemplo cargado se puede editar y el cálculo usa lo editado", () => {
    const { container } = render(<App />);
    cargarEjemplo(/Puesto de jugos/i);
    const fila = filasCarga(container)[0];
    fireEvent.change(fila.querySelector("input.potencia"), { target: { value: "1100" } });
    expect(usoTotal(fila)).toMatch(/2[. ]?016,6/);
  });
});

// ---------------------------------------------------------------------------
// 2. RESULTADO
// ---------------------------------------------------------------------------
describe("Caja negra · Resultado", () => {
  it("RES-01: el caso de jugos produce los KPIs esperados", () => {
    const { container } = render(<App />);
    cargarEjemplo(/Puesto de jugos/i);
    calcular();
    expect(aEntero(kpi(container, ".kpi-w .valor"))).toBe(635);
    expect(kpi(container, ".kpi-wh .valor")).toMatch(/1[. ]?408,3/);
    expect(aEntero(kpi(container, ".kpi-nocturno .valor"))).toBe(340);
  });

  it("RES-02: el desglose muestra una fila por aparato y coincide con el total", () => {
    const { container } = render(<App />);
    cargarEjemplo(/Puesto de jugos/i);
    calcular();
    const filas = filasDesglose(container);
    expect(filas).toHaveLength(5);
    const suma = [...filas]
      .map((f) =>
        parseFloat(
          norm(f.children[3].textContent)
            .replace(/Wh/gi, "")
            .replace(/\./g, "")
            .replace(",", ".")
            .trim()
        )
      )
      .reduce((s, v) => s + v, 0);
    expect(Math.round(suma)).toBe(1408);
  });

  it("RES-03: los parámetros configurables abren con los valores por defecto", () => {
    const { container } = render(<App />);
    irResultado();
    expect(valorParametro(container, "Horas pico solar")).toBe("4.5");
    expect(valorParametro(container, "Eficiencia del sistema")).toBe("0.8");
    expect(valorParametro(container, "Margen de pérdidas")).toBe("25");
    expect(valorParametro(container, "Tensión batería")).toBe("24");
    expect(valorParametro(container, "Profundidad de descarga")).toBe("50");
    expect(valorParametro(container, "Potencia del panel")).toBe("450");
    expect(valorParametro(container, "Voltaje de trabajo del panel")).toBe("24");
  });

  it("RES-04: cambiar las HSP recalcula el número de paneles", () => {
    const { container } = render(<App />);
    cargarEjemplo(/Puesto de jugos/i);
    calcular();
    expect(container.textContent).toMatch(/2 panel\(es\)/);
    cambiarParametro(container, "Horas pico solar", "6");
    expect(container.textContent).toMatch(/1 panel\(es\)/);
  });

  it("RES-05: subir la tensión del banco reduce los Ah exigidos", () => {
    const { container } = render(<App />);
    cargarEjemplo(/Puesto de jugos/i);
    calcular();
    expect(container.textContent).toMatch(/147 Ah/);
    cambiarParametro(container, "Tensión batería", "48");
    expect(container.textContent).toMatch(/73 Ah/);
  });

  it("RES-06: sin aparatos los KPIs se muestran como guion", () => {
    const { container } = render(<App />);
    irResultado();
    expect(container.querySelector(".kpi-w .valor").textContent).toBe("—");
    expect(container.querySelector(".kpi-wh .valor").textContent).toBe("—");
    expect(container.querySelector(".kpi-nocturno .valor").textContent).toBe("—");
  });

  it("RES-07: el botón Imprimir/PDF dispara la impresión del navegador", () => {
    render(<App />);
    const imprimir = vi.fn();
    window.print = imprimir;
    irResultado();
    ir(/Imprimir \/ PDF/i);
    expect(imprimir).toHaveBeenCalledTimes(1);
  });
});

// ---------------------------------------------------------------------------
// 3. GUÍA DE INSTALACIÓN
// ---------------------------------------------------------------------------
describe("Caja negra · Guía de instalación", () => {
  it("GUI-01: sin cálculo la guía queda en espera y muestra 8 pasos", () => {
    render(<App />);
    irGuia();
    expect(screen.getByText(/Paso 1 de 8/i)).toBeTruthy();
    expect(screen.getAllByText(/Sin calcular/i).length).toBeGreaterThan(0);
  });

  it("GUI-02: el diagrama avisa que falta calcular", () => {
    render(<App />);
    irGuia();
    ir(/Siguiente/i);
    expect(screen.getByRole("heading", { name: /Diagrama único de tu sistema/i })).toBeTruthy();
    expect(screen.getByText(/Esperando cálculo/i)).toBeTruthy();
  });

  it("GUI-03: tras calcular muestra el resumen personalizado y 10 pasos", () => {
    render(<App />);
    cargarEjemplo(/Puesto de jugos/i);
    calcular();
    irGuia();
    expect(screen.getByText(/Paso 1 de 10/i)).toBeTruthy();
    expect(screen.getByText(/635 W/)).toBeTruthy();
    expect(screen.getByText(/1408 Wh\/día/)).toBeTruthy();
  });

  it("GUI-06: el resumen y el diagrama muestran tensión, capacidad y DOD reales", () => {
    render(<App />);
    cargarEjemplo(/Puesto de jugos/i);
    calcular();
    irGuia();
    // Defecto DEF-01 (corregido): el banco mostraba «Sin calcular» porque el
    // dimensionamiento no exponía tensión ni DOD.
    expect(screen.getByText(/24 V · 147 Ah · ≥ 794 W/)).toBeTruthy();

    ir(/Siguiente/i);
    expect(screen.getAllByText(/2 × 450 Wp/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/24 V · 147 Ah \(DOD 50%\)/).length).toBeGreaterThan(0);
  });

  it("GUI-04: recorre los 6 capítulos, recomendaciones y el día de trabajo", () => {
    render(<App />);
    cargarEjemplo(/Puesto de jugos/i);
    calcular();
    irGuia();

    ir(/Siguiente/i); // diagrama
    expect(screen.getByRole("img", { name: /Diagrama del sistema solar autónomo/i })).toBeTruthy();

    const capitulos = [
      "Instala el panel solar",
      "Tiende el cableado",
      "Conecta el controlador de carga",
      "Arma y conecta el banco de baterías",
      "Conecta el inversor",
      "Conecta los aparatos y pon en marcha"
    ];
    for (const titulo of capitulos) {
      ir(/Siguiente/i);
      expect(screen.getByRole("heading", { name: new RegExp(titulo, "i") })).toBeTruthy();
    }

    ir(/Siguiente/i);
    expect(screen.getByRole("heading", { name: /Recomendaciones/i })).toBeTruthy();

    ir(/Siguiente/i);
    expect(screen.getByRole("heading", { name: /Un día de trabajo/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /Siguiente/i }).disabled).toBe(true);
  });

  it("GUI-05: navega hacia atrás con el botón y con las flechas del teclado", () => {
    render(<App />);
    irGuia();
    ir(/Siguiente/i);
    expect(screen.getByRole("heading", { name: /Diagrama único de tu sistema/i })).toBeTruthy();

    ir(/Anterior/i);
    expect(
      screen.getByRole("heading", { name: /Guía de instalación personalizada/i })
    ).toBeTruthy();

    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(screen.getByRole("heading", { name: /Diagrama único de tu sistema/i })).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// 4. PRESUPUESTO
// ---------------------------------------------------------------------------
describe("Caja negra · Presupuesto", () => {
  it("PRE-01: sin cálculo muestra el estado de espera", () => {
    render(<App />);
    irPresupuesto();
    expect(screen.getByText(/Sin dimensionamiento/i)).toBeTruthy();
    expect(
      screen.getByRole("heading", { name: /Presupuesto en pesos colombianos/i })
    ).toBeTruthy();
  });

  it("PRE-02: con cálculo lista los componentes y un total mayor que cero", () => {
    const { container } = render(<App />);
    cargarEjemplo(/Puesto de jugos/i);
    calcular();
    irPresupuesto();

    const filas = filasPresupuesto(container);
    expect(filas).toHaveLength(8);
    expect(container.textContent).toMatch(/Paneles fotovoltaicos/i);
    expect(container.textContent).toMatch(/Banco de baterías/i);
    expect(container.textContent).toMatch(/Controlador de carga/i);

    const total = aEntero(container.querySelector(".presupuesto-total-card strong").textContent);
    expect(total).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// 5. PERSISTENCIA Y ELEMENTOS GENERALES
// ---------------------------------------------------------------------------
describe("Caja negra · Persistencia y elementos generales", () => {
  it("GEN-01: la tabla se conserva al cerrar y volver a abrir la app", () => {
    const { container, unmount } = render(<App />);
    anadir();
    const fila = filasCarga(container)[0];
    llenar(fila, { nombre: "Licuadora", potencia: "550" });
    usarUsos(fila, { min: "2", usos: "55" });

    unmount();
    const segunda = render(<App />);
    irCarga();
    const filas = filasCarga(segunda.container);
    expect(filas).toHaveLength(1);
    expect(filas[0].querySelector("input.nombre").value).toBe("Licuadora");
    expect(filas[0].querySelector("input.potencia").value).toBe("550");
  });

  it("GEN-02: los parámetros editados se conservan al reabrir la app", () => {
    const { container, unmount } = render(<App />);
    cargarEjemplo(/Puesto de jugos/i);
    calcular();
    cambiarParametro(container, "Horas pico solar", "6");

    unmount();
    const segunda = render(<App />);
    irResultado();
    expect(valorParametro(segunda.container, "Horas pico solar")).toBe("6");
  });

  it("GEN-03: las cinco pestañas son accesibles desde la navegación", () => {
    render(<App />);
    expect(screen.getByRole("button", { name: /^Inicio$/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /1\. Carga de aparatos/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /^2\. Resultado$/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /^3\. Guía de instalación$/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /^4\. Presupuesto$/i })).toBeTruthy();
  });

  it("GEN-04: el pie de página identifica el acta de la entrega", () => {
    render(<App />);
    expect(screen.getByText(/Acta de Reunión No\. 006/i)).toBeTruthy();
  });
});
