import {
  test,
  expect,
  irCarga,
  irA,
  anadir,
  cargarEjemplo,
  calcular,
  filasCarga,
  llenar,
  usarUsos,
  usarContinuo,
  usarRefri,
  usoTotal
} from "./fixtures.js";

test.describe("Caja negra · Carga de aparatos", () => {
  test("CAR-01: añadir aparato crea una fila vacía", async ({ page }) => {
    await irCarga(page);
    await expect(filasCarga(page)).toHaveCount(0);
    await irA(page, /Añadir aparato/i);
    await expect(filasCarga(page)).toHaveCount(1);
  });

  test("CAR-02: cargar un ejemplo llena la tabla con sus aparatos", async ({ page }) => {
    await cargarEjemplo(page, /Puesto de jugos/i);
    const filas = filasCarga(page);
    await expect(filas).toHaveCount(5);
    await expect(filas.nth(0).locator("input.nombre")).toHaveValue("Licuadora (jugos)");
    await expect(filas.nth(0).locator("input.potencia")).toHaveValue("550");
  });

  test("CAR-03: al editar, el uso total se recalcula en vivo", async ({ page }) => {
    await anadir(page);
    const fila = filasCarga(page).nth(0);
    await llenar(fila, { nombre: "Licuadora", potencia: "550" });
    await usarUsos(fila, { min: "2", usos: "55" });
    await expect(fila.locator(".celda-uso-total")).toContainText("1 h 50 min");
    await expect(fila.locator(".celda-uso-total")).toContainText(/1[. ]?008,3/);

    await fila.locator("input.potencia").fill("1100");
    await expect(fila.locator(".celda-uso-total")).toContainText(/2[. ]?016,6/);
  });

  test("CAR-04: eliminar borra solo la fila indicada", async ({ page }) => {
    await anadir(page);
    const primera = filasCarga(page).nth(0);
    await llenar(primera, { nombre: "Licuadora", potencia: "550" });
    await usarUsos(primera, { min: "2", usos: "55" });

    await irA(page, /Añadir aparato/i);
    const segunda = filasCarga(page).nth(1);
    await llenar(segunda, { nombre: "Radio", potencia: "40" });
    await usarContinuo(segunda, { horas: "6" });

    await primera.locator(".btn-eliminar").click();
    await expect(filasCarga(page)).toHaveCount(1);
    await expect(filasCarga(page).nth(0).locator("input.nombre")).toHaveValue("Radio");
  });

  test("CAR-05: la cantidad multiplica la potencia una sola vez (no duplica la energía)", async ({
    page
  }) => {
    await anadir(page);
    const fila = filasCarga(page).nth(0);
    await llenar(fila, { nombre: "Licuadora", cantidad: "2", potencia: "550" });
    await usarUsos(fila, { min: "2", usos: "55" });
    const total = await usoTotal(fila);
    expect(total).toMatch(/2[. ]?016,6/);
    expect(total).toContain("(× 2)");
  });

  test("CAR-06: vaciar todo deja la tabla limpia y borra lo guardado", async ({ page }) => {
    await cargarEjemplo(page, /Puesto de jugos/i);
    await expect(filasCarga(page)).toHaveCount(5);

    await irA(page, /Vaciar todo/i);
    await expect(filasCarga(page)).toHaveCount(0);

    await page.reload();
    await irCarga(page);
    await expect(filasCarga(page)).toHaveCount(0);
  });

  test("CAR-07: sin nombre no se puede calcular y aparece el resumen de errores", async ({
    page
  }) => {
    await anadir(page);
    const fila = filasCarga(page).nth(0);
    await llenar(fila, { potencia: "550" });
    await usarUsos(fila, { min: "2", usos: "55" });

    await calcular(page);
    await expect(page.getByRole("alert")).toBeVisible();
    await expect(page.getByRole("alert")).toContainText(/Escribe el nombre/i);
    await expect(
      page.getByRole("heading", { name: /Tabla de carga de aparatos de tu puesto/i })
    ).toBeVisible();
  });

  test("CAR-08: una potencia de 0 W es rechazada", async ({ page }) => {
    await anadir(page);
    const fila = filasCarga(page).nth(0);
    await llenar(fila, { nombre: "Aparato", potencia: "0" });
    await usarUsos(fila, { min: "1", usos: "1" });
    await calcular(page);
    await expect(page.getByRole("alert")).toContainText(/potencia debe ser mayor que 0/i);
  });

  test("CAR-09: una cantidad de 0 es rechazada", async ({ page }) => {
    await anadir(page);
    const fila = filasCarga(page).nth(0);
    await llenar(fila, { nombre: "Aparato", cantidad: "0", potencia: "10" });
    await usarUsos(fila, { min: "1", usos: "1" });
    await calcular(page);
    await expect(page.getByRole("alert")).toContainText(/cantidad debe ser 1 o más/i);
  });

  test("CAR-10: un nombre repetido es rechazado", async ({ page }) => {
    await anadir(page);
    const primera = filasCarga(page).nth(0);
    await llenar(primera, { nombre: "Licuadora", potencia: "550" });
    await usarUsos(primera, { min: "2", usos: "55" });

    await irA(page, /Añadir aparato/i);
    const segunda = filasCarga(page).nth(1);
    await llenar(segunda, { nombre: "licuadora", potencia: "300" });
    await usarUsos(segunda, { min: "2", usos: "10" });

    await calcular(page);
    await expect(page.getByRole("alert")).toContainText(/ya está en otra fila/i);
  });

  test("CAR-11: el ciclo de refrigeración fuera de 20–60 % es rechazado", async ({ page }) => {
    await anadir(page);
    const fila = filasCarga(page).nth(0);
    await llenar(fila, { nombre: "Nevera", potencia: "90" });
    await usarRefri(fila, { horasConectado: "12", ciclo: "70" });
    await calcular(page);
    await expect(page.getByRole("alert")).toContainText(/entre 20 y 60/i);
  });

  test("CAR-12: un aparato continuo con más de 24 h es rechazado", async ({ page }) => {
    await anadir(page);
    const fila = filasCarga(page).nth(0);
    await llenar(fila, { nombre: "Lámpara", potencia: "10" });
    await usarContinuo(fila, { horas: "25" });
    await calcular(page);
    await expect(page.getByRole("alert")).toContainText(/Máximo 24 horas/i);
  });

  test("CAR-13: un ejemplo cargado se puede editar y el cálculo usa lo editado", async ({
    page
  }) => {
    await cargarEjemplo(page, /Puesto de jugos/i);
    const fila = filasCarga(page).nth(0);
    await fila.locator("input.potencia").fill("1100");
    await expect(fila.locator(".celda-uso-total")).toContainText(/2[. ]?016,6/);
  });
});
