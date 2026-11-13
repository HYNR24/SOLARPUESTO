import {
  test,
  expect,
  irResultado,
  irA,
  cargarEjemplo,
  calcular,
  filasDesglose,
  kpi,
  norm,
  enteroDe,
  valorParametro,
  cambiarParametro
} from "./fixtures.js";

test.describe("Caja negra · Resultado", () => {
  test("RES-01: el caso de jugos produce los KPIs esperados", async ({ page }) => {
    await cargarEjemplo(page, /Puesto de jugos/i);
    await calcular(page);
    expect(enteroDe(await kpi(page, ".kpi-w .valor"))).toBe(635);
    expect(await kpi(page, ".kpi-wh .valor")).toMatch(/1[. ]?408,3/);
    expect(enteroDe(await kpi(page, ".kpi-nocturno .valor"))).toBe(340);
  });

  test("RES-02: el desglose muestra una fila por aparato y coincide con el total", async ({
    page
  }) => {
    await cargarEjemplo(page, /Puesto de jugos/i);
    await calcular(page);
    const filas = filasDesglose(page);
    await expect(filas).toHaveCount(5);
    let suma = 0;
    for (let i = 0; i < (await filas.count()); i += 1) {
      const texto = norm(await filas.nth(i).locator("td").nth(3).innerText());
      suma += parseFloat(
        texto.replace(/Wh/gi, "").replace(/\./g, "").replace(",", ".").trim()
      );
    }
    expect(Math.round(suma)).toBe(1408);
  });

  test("RES-03: los parámetros configurables abren con los valores por defecto", async ({
    page
  }) => {
    await irResultado(page);
    expect(await valorParametro(page, "Horas pico solar")).toBe("4.5");
    expect(await valorParametro(page, "Eficiencia del sistema")).toBe("0.8");
    expect(await valorParametro(page, "Margen de pérdidas")).toBe("25");
    expect(await valorParametro(page, "Tensión batería")).toBe("24");
    expect(await valorParametro(page, "Profundidad de descarga")).toBe("50");
    expect(await valorParametro(page, "Potencia del panel")).toBe("450");
    expect(await valorParametro(page, "Voltaje de trabajo del panel")).toBe("24");
  });

  test("RES-04: cambiar las HSP recalcula el número de paneles", async ({ page }) => {
    await cargarEjemplo(page, /Puesto de jugos/i);
    await calcular(page);
    await expect(page.getByText(/2 panel\(es\)/).first()).toBeVisible();
    await cambiarParametro(page, "Horas pico solar", "6");
    await expect(page.getByText(/1 panel\(es\)/).first()).toBeVisible();
  });

  test("RES-05: subir la tensión del banco reduce los Ah exigidos", async ({ page }) => {
    await cargarEjemplo(page, /Puesto de jugos/i);
    await calcular(page);
    await expect(page.getByText(/147 Ah/).first()).toBeVisible();
    await cambiarParametro(page, "Tensión batería", "48");
    await expect(page.getByText(/73 Ah/).first()).toBeVisible();
  });

  test("RES-06: sin aparatos los KPIs se muestran como guion", async ({ page }) => {
    await irResultado(page);
    await expect(page.locator(".kpi-w .valor")).toHaveText("—");
    await expect(page.locator(".kpi-wh .valor")).toHaveText("—");
    await expect(page.locator(".kpi-nocturno .valor")).toHaveText("—");
  });

  test("RES-07: el botón Imprimir/PDF dispara la impresión del navegador", async ({ page }) => {
    await irResultado(page);
    await irA(page, /Imprimir \/ PDF/i);
    expect(await page.evaluate(() => window.__impresiones)).toBe(1);
  });
});
