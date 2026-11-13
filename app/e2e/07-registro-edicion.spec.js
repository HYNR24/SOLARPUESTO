import {
  test,
  expect,
  irGuia,
  irA,
  anadir,
  calcular,
  filasCarga,
  llenar,
  usarUsos,
  usarContinuo,
  usoTotal,
  enteroDe,
  kpi
} from "./fixtures.js";

test.describe("App · Registrar, editar y eliminar aparatos", () => {
  test("APP-01: registra un aparato nuevo y calcula el resultado", async ({ page }) => {
    await anadir(page);
    const fila = filasCarga(page).nth(0);
    await llenar(fila, { nombre: "Licuadora", potencia: "550" });
    await usarUsos(fila, { min: "2", usos: "55" });

    const total = await usoTotal(fila);
    expect(total).toContain("1 h 50 min");
    expect(total).toMatch(/1[. ]?008,3/);

    await calcular(page);
    expect(enteroDe(await kpi(page, ".kpi-w .valor"))).toBe(550);
    expect(await kpi(page, ".kpi-wh .valor")).toMatch(/1[. ]?008,3/);
    expect(enteroDe(await kpi(page, ".kpi-nocturno .valor"))).toBe(0);
  });

  test("APP-02: edita un aparato registrado y recalcula sin crear otra fila", async ({
    page
  }) => {
    await anadir(page);
    const fila = filasCarga(page).nth(0);
    await llenar(fila, { nombre: "Licuadora", potencia: "550" });
    await usarUsos(fila, { min: "2", usos: "55" });
    expect(await usoTotal(fila)).toMatch(/1[. ]?008,3/);

    await fila.locator("input.potencia").fill("1100");
    await expect(filasCarga(page)).toHaveCount(1);
    await expect(fila.locator("input.nombre")).toHaveValue("Licuadora");
    expect(await usoTotal(fila)).toMatch(/2[. ]?016,6/);

    await fila.locator("input.cantidad").fill("2");
    const conCantidad = await usoTotal(fila);
    expect(conCantidad).toMatch(/4[. ]?033,3/);
    expect(conCantidad).toContain("(× 2)");

    await calcular(page);
    expect(enteroDe(await kpi(page, ".kpi-w .valor"))).toBe(2200);
    expect(await kpi(page, ".kpi-wh .valor")).toMatch(/4[. ]?033,3/);
  });

  test("APP-03: elimina el aparato indicado y conserva los demás", async ({ page }) => {
    await anadir(page);
    await irA(page, /Añadir aparato/i);
    await expect(filasCarga(page)).toHaveCount(2);

    const primera = filasCarga(page).nth(0);
    await llenar(primera, { nombre: "Licuadora", potencia: "550" });
    await usarUsos(primera, { min: "2", usos: "55" });

    const segunda = filasCarga(page).nth(1);
    await usarContinuo(segunda, { horas: "10" });
    await llenar(segunda, { nombre: "Refrigerador", potencia: "125" });

    await primera.locator(".btn-eliminar").click();
    await expect(filasCarga(page)).toHaveCount(1);
    await expect(filasCarga(page).nth(0).locator("input.nombre")).toHaveValue(
      "Refrigerador"
    );

    await calcular(page);
    expect(enteroDe(await kpi(page, ".kpi-w .valor"))).toBe(125);
    expect(await kpi(page, ".kpi-wh .valor")).toMatch(/1[. ]?250/);
  });
});

test.describe("App · Guía de instalación personalizada (carrusel)", () => {
  test("APP-04: espera el cálculo y muestra portada con resumen en ceros", async ({
    page
  }) => {
    await irGuia(page);
    await expect(
      page.getByRole("heading", { name: /Guía de instalación personalizada/i })
    ).toBeVisible();
    await expect(page.getByText(/Paso 1 de 8/i)).toBeVisible();
    await expect(page.getByText(/Sin calcular/i).first()).toBeVisible();
  });

  test("APP-05: muestra diagrama en espera hasta calcular", async ({ page }) => {
    await irGuia(page);
    await irA(page, /Siguiente/i);
    await expect(
      page.getByRole("heading", { name: /Diagrama único de tu sistema/i })
    ).toBeVisible();
    await expect(page.getByText(/Esperando cálculo/i)).toBeVisible();
    await expect(page.getByText(/Falta calcular el sistema/i)).toBeVisible();
  });

  test("APP-06: genera la guía única tras calcular desde la tabla", async ({ page }) => {
    await anadir(page);
    const fila = filasCarga(page).nth(0);
    await llenar(fila, { nombre: "Lámparas", potencia: "60" });
    await fila.locator("select.tipo").selectOption("usos");
    await usarUsos(fila, { min: "180", usos: "1" });
    await fila.locator("select.horario").selectOption("noche");
    await calcular(page);

    await irGuia(page);
    await expect(page.getByText(/Potencia pico/i).first()).toBeVisible();

    await irA(page, /Siguiente/i);
    await expect(
      page.getByRole("img", { name: /Diagrama del sistema solar autónomo/i })
    ).toBeVisible();
  });
});
