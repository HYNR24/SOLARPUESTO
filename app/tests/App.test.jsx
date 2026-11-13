import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { App } from "../src/App.jsx";

// Compromiso 3 del Acta No. 005 — tabla de entrada de aparatos (RFN-01):
// un caso por cada operacion de registrar, editar y eliminar.

// El separador de miles que devuelve toLocaleString("es") puede ser el punto o
// un espacio segun la version de ICU, por lo que las comparaciones numericas se
// hacen con un patron tolerante y los enteros se leen sin separador.
const norm = (s) => s.replace(/[\u00a0\u202f]/g, " ");

const filas = (container) => container.querySelectorAll("tbody tr");

const enteroDe = (texto) => {
  const d = norm(texto).replace(/[^\d]/g, "");
  return d === "" ? NaN : parseInt(d, 10);
};

const usoTotal = (fila) => norm(fila.querySelector(".celda-uso-total").textContent);

const rellenar = (fila, { nombre, potencia, cantidad }) => {
  if (nombre !== undefined) fireEvent.change(fila.querySelector("input.nombre"), { target: { value: nombre } });
  if (potencia !== undefined) fireEvent.change(fila.querySelector("input.potencia"), { target: { value: potencia } });
  if (cantidad !== undefined) fireEvent.change(fila.querySelector("input.cantidad"), { target: { value: cantidad } });
};

const porUso = (fila, { min, usos }) => {
  fireEvent.change(fila.querySelector("input.min_uso"), { target: { value: min } });
  fireEvent.change(fila.querySelector("input.usos_dia"), { target: { value: usos } });
};

const irCarga = () => {
  fireEvent.click(screen.getByRole("button", { name: /1\. Carga de aparatos/i }));
};

const anadir = () => {
  fireEvent.click(screen.getByRole("button", { name: /1\. Carga de aparatos/i }));
  fireEvent.click(screen.getByRole("button", { name: /Añadir aparato/i }));
};

const calcular = () => fireEvent.click(screen.getByRole("button", { name: /Calcular resultado/i }));

let confirmOriginal;

beforeEach(() => {
  localStorage.clear();
  confirmOriginal = window.confirm;
  window.confirm = () => true;
});

afterEach(() => {
  window.confirm = confirmOriginal;
  cleanup();
});

describe("Tabla de entrada de aparatos — registrar, editar y eliminar", () => {
  it("registra un aparato nuevo y calcula el resultado", () => {
    const { container } = render(<App />);
    irCarga();
    expect(filas(container)).toHaveLength(0);

    anadir();
    expect(filas(container)).toHaveLength(1);

    rellenar(filas(container)[0], { nombre: "Licuadora", potencia: "550" });
    porUso(filas(container)[0], { min: "2", usos: "55" });

    // (2/60) h x 55 usos = 1 h 50 min ; 550 W x 1,8333 h = 1.008,33 Wh/día
    expect(usoTotal(filas(container)[0])).toContain("1 h 50 min");
    expect(usoTotal(filas(container)[0])).toMatch(/1[. ]?008,3/);

    calcular();
    expect(enteroDe(container.querySelector(".kpi-w .valor").textContent)).toBe(550);
    expect(container.querySelector(".kpi-wh .valor").textContent).toMatch(/1[. ]?008,3/);
    expect(enteroDe(container.querySelector(".kpi-nocturno .valor").textContent)).toBe(0);
  });

  it("edita un aparato registrado y recalcula sin crear otra fila", () => {
    const { container } = render(<App />);
    irCarga();
    anadir();
    rellenar(filas(container)[0], { nombre: "Licuadora", potencia: "550" });
    porUso(filas(container)[0], { min: "2", usos: "55" });
    expect(usoTotal(filas(container)[0])).toMatch(/1[. ]?008,3/);

    fireEvent.change(filas(container)[0].querySelector("input.potencia"), { target: { value: "1100" } });

    expect(filas(container)).toHaveLength(1);
    expect(filas(container)[0].querySelector("input.nombre").value).toBe("Licuadora");
    expect(usoTotal(filas(container)[0])).toMatch(/2[. ]?016,6/);

    fireEvent.change(filas(container)[0].querySelector("input.cantidad"), { target: { value: "2" } });

    // 1.100 W x 2 unidades x 1,8333 h = 4.033,33 Wh/día: la cantidad se aplica
    // una sola vez, sobre la potencia (D-01). Antes del ajuste eran 8.066,67.
    expect(usoTotal(filas(container)[0])).toMatch(/4[. ]?033,3/);
    expect(usoTotal(filas(container)[0])).toContain("(× 2)");

    calcular();
    expect(enteroDe(container.querySelector(".kpi-w .valor").textContent)).toBe(2200);
    expect(container.querySelector(".kpi-wh .valor").textContent).toMatch(/4[. ]?033,3/);
  });

  it("elimina el aparato indicado y conserva los demas", () => {
    const { container } = render(<App />);
    irCarga();
    anadir();
    anadir();
    expect(filas(container)).toHaveLength(2);

    rellenar(filas(container)[0], { nombre: "Licuadora", potencia: "550" });
    porUso(filas(container)[0], { min: "2", usos: "55" });

    fireEvent.change(filas(container)[1].querySelector("select.tipo"), { target: { value: "continuo" } });
    rellenar(filas(container)[1], { nombre: "Refrigerador", potencia: "125" });
    fireEvent.change(filas(container)[1].querySelector("input.horas_dia"), { target: { value: "10" } });

    fireEvent.click(filas(container)[0].querySelector(".btn-eliminar"));

    expect(filas(container)).toHaveLength(1);
    expect(filas(container)[0].querySelector("input.nombre").value).toBe("Refrigerador");

    calcular();
    expect(enteroDe(container.querySelector(".kpi-w .valor").textContent)).toBe(125);
    expect(container.querySelector(".kpi-wh .valor").textContent).toMatch(/1[. ]?250/);
  });
});

// La guía se genera única para el sistema calculado. Sin cálculo queda en espera.
describe("Guía de instalación personalizada (carrusel)", () => {
  const abrirGuia = () => {
    fireEvent.click(screen.getByRole("button", { name: /^3\. Guía de instalación$/i }));
  };
  const siguiente = () => fireEvent.click(screen.getByRole("button", { name: /Siguiente/i }));

  it("espera el cálculo y muestra portada con resumen en ceros", () => {
    render(<App />);
    abrirGuia();
    expect(screen.getByRole("heading", { name: /Guía de instalación personalizada/i })).toBeTruthy();
    expect(screen.getByText(/Paso 1 de 8/i)).toBeTruthy();
    expect(screen.getAllByText(/Sin calcular/i).length).toBeGreaterThan(0);
  });

  it("muestra diagrama en espera hasta calcular", () => {
    render(<App />);
    abrirGuia();
    siguiente();
    expect(screen.getByRole("heading", { name: /Diagrama único de tu sistema/i })).toBeTruthy();
    expect(screen.getByText(/Esperando cálculo/i)).toBeTruthy();
    expect(screen.getByText(/Falta calcular el sistema/i)).toBeTruthy();
  });

  it("genera la guía única tras calcular desde la tabla", () => {
    const { container } = render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /1\. Carga de aparatos/i }));
    fireEvent.click(screen.getByRole("button", { name: /Añadir aparato/i }));
    const filas = container.querySelectorAll("tbody tr");
    const fila = filas[filas.length - 1];
    fireEvent.change(fila.querySelector("input.nombre"), { target: { value: "Lámparas" } });
    fireEvent.change(fila.querySelector("input.potencia"), { target: { value: "60" } });
    fireEvent.change(fila.querySelector("select.tipo"), { target: { value: "usos" } });
    const mins = fila.querySelectorAll("input[type=number]");
    // orden: cant? no, inputs in use cell
    fireEvent.change(mins[mins.length - 2], { target: { value: "180" } });
    fireEvent.change(mins[mins.length - 1], { target: { value: "1" } });
    fireEvent.change(fila.querySelector("select.horario"), { target: { value: "noche" } });
    fireEvent.click(screen.getByRole("button", { name: /Calcular resultado/i }));

    abrirGuia();
    expect(screen.getByText(/Potencia pico/i)).toBeTruthy();

    siguiente();
    expect(screen.getByRole("img", { name: /Diagrama del sistema solar autónomo/i })).toBeTruthy();
  });
});
