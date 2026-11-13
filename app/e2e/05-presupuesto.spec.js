import {
  test,
  expect,
  irPresupuesto,
  cargarEjemplo,
  calcular,
  filasPresupuesto,
  enteroDe
} from "./fixtures.js";

test.describe("Caja negra · Presupuesto", () => {
  test("PRE-01: sin cálculo muestra el estado de espera", async ({ page }) => {
    await irPresupuesto(page);
    await expect(page.getByText(/Sin dimensionamiento/i)).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /Presupuesto en pesos colombianos/i })
    ).toBeVisible();
  });

  test("PRE-02: con cálculo lista los componentes y un total mayor que cero", async ({
    page
  }) => {
    await cargarEjemplo(page, /Puesto de jugos/i);
    await calcular(page);
    await irPresupuesto(page);

    await expect(filasPresupuesto(page)).toHaveCount(8);
    await expect(page.getByText(/Paneles fotovoltaicos/i).first()).toBeVisible();
    await expect(page.getByText(/Banco de baterías/i).first()).toBeVisible();
    await expect(page.getByText(/Controlador de carga/i).first()).toBeVisible();

    const total = enteroDe(
      await page.locator(".presupuesto-total-card strong").innerText()
    );
    expect(total).toBeGreaterThan(0);
  });
});
