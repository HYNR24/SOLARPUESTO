import {
  test,
  expect,
  irCarga,
  irResultado,
  anadir,
  cargarEjemplo,
  calcular,
  filasCarga,
  llenar,
  usarUsos,
  valorParametro,
  cambiarParametro
} from "./fixtures.js";

test.describe("Caja negra · Persistencia y elementos generales", () => {
  test("GEN-01: la tabla se conserva al cerrar y volver a abrir la app", async ({
    page
  }) => {
    await anadir(page);
    const fila = filasCarga(page).nth(0);
    await llenar(fila, { nombre: "Licuadora", potencia: "550" });
    await usarUsos(fila, { min: "2", usos: "55" });

    await page.waitForFunction(() => !!localStorage.getItem("solarpuesto:v1"));
    await page.reload();
    await irCarga(page);

    const filas = filasCarga(page);
    await expect(filas).toHaveCount(1);
    await expect(filas.nth(0).locator("input.nombre")).toHaveValue("Licuadora");
    await expect(filas.nth(0).locator("input.potencia")).toHaveValue("550");
  });

  test("GEN-02: los parámetros editados se conservan al reabrir la app", async ({
    page
  }) => {
    await cargarEjemplo(page, /Puesto de jugos/i);
    await calcular(page);
    await cambiarParametro(page, "Horas pico solar", "6");

    await page.waitForFunction(() => {
      const bruto = localStorage.getItem("solarpuesto:v1");
      if (!bruto) return false;
      try {
        return Number(JSON.parse(bruto).params.hsp) === 6;
      } catch {
        return false;
      }
    });
    await page.reload();
    await irResultado(page);
    expect(await valorParametro(page, "Horas pico solar")).toBe("6");
  });

  test("GEN-03: las cinco pestañas son accesibles desde la navegación", async ({
    page
  }) => {
    await expect(page.getByRole("button", { name: /^Inicio$/i })).toBeVisible();
    await expect(
      page.getByRole("button", { name: /1\. Carga de aparatos/i })
    ).toBeVisible();
    await expect(page.getByRole("button", { name: /^2\. Resultado$/i })).toBeVisible();
    await expect(
      page.getByRole("button", { name: /^3\. Guía de instalación$/i })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /^4\. Presupuesto$/i })
    ).toBeVisible();
  });

  test("GEN-04: el pie de página identifica el acta de la entrega", async ({ page }) => {
    await expect(page.getByText(/Acta de Reunión No\. 006/i)).toBeVisible();
  });
});
