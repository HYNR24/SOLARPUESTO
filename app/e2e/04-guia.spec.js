import {
  test,
  expect,
  irGuia,
  irA,
  cargarEjemplo,
  calcular
} from "./fixtures.js";

const abrirGuiaCalculada = async (page) => {
  await cargarEjemplo(page, /Puesto de jugos/i);
  await calcular(page);
  await irGuia(page);
};

test.describe("Caja negra · Guía de instalación", () => {
  test("GUI-01: sin cálculo la guía queda en espera y muestra 8 pasos", async ({ page }) => {
    await irGuia(page);
    await expect(page.getByText(/Paso 1 de 8/i)).toBeVisible();
    await expect(page.getByText(/Sin calcular/i).first()).toBeVisible();
  });

  test("GUI-02: el diagrama avisa que falta calcular", async ({ page }) => {
    await irGuia(page);
    await irA(page, /Siguiente/i);
    await expect(
      page.getByRole("heading", { name: /Diagrama único de tu sistema/i })
    ).toBeVisible();
    await expect(page.getByText(/Esperando cálculo/i)).toBeVisible();
  });

  test("GUI-03: tras calcular muestra el resumen personalizado y 10 pasos", async ({
    page
  }) => {
    await abrirGuiaCalculada(page);
    await expect(page.getByText(/Paso 1 de 10/i)).toBeVisible();
    await expect(page.getByText(/635 W/).first()).toBeVisible();
    await expect(page.getByText(/1408 Wh\/día/).first()).toBeVisible();
  });

  test("GUI-06: el resumen y el diagrama muestran tensión, capacidad y DOD reales", async ({
    page
  }) => {
    await abrirGuiaCalculada(page);
    await expect(page.getByText(/24 V · 147 Ah · ≥ 794 W/)).toBeVisible();

    await irA(page, /Siguiente/i);
    await expect(page.getByText(/2 × 450 Wp/).first()).toBeVisible();
    await expect(page.getByText(/24 V · 147 Ah \(DOD 50%\)/).first()).toBeVisible();
  });

  test("GUI-04: recorre los 6 capítulos, recomendaciones y el día de trabajo", async ({
    page
  }) => {
    await abrirGuiaCalculada(page);

    await irA(page, /Siguiente/i);
    await expect(
      page.getByRole("img", { name: /Diagrama del sistema solar autónomo/i })
    ).toBeVisible();

    const capitulos = [
      "Instala el panel solar",
      "Tiende el cableado",
      "Conecta el controlador de carga",
      "Arma y conecta el banco de baterías",
      "Conecta el inversor",
      "Conecta los aparatos y pon en marcha"
    ];
    for (const titulo of capitulos) {
      await irA(page, /Siguiente/i);
      await expect(
        page.getByRole("heading", { name: new RegExp(titulo, "i") })
      ).toBeVisible();
    }

    await irA(page, /Siguiente/i);
    await expect(page.getByRole("heading", { name: /Recomendaciones/i })).toBeVisible();

    await irA(page, /Siguiente/i);
    await expect(page.getByRole("heading", { name: /Un día de trabajo/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Siguiente/i })).toBeDisabled();
  });

  test("GUI-05: navega hacia atrás con el botón y con las flechas del teclado", async ({
    page
  }) => {
    await irGuia(page);
    await irA(page, /Siguiente/i);
    await expect(
      page.getByRole("heading", { name: /Diagrama único de tu sistema/i })
    ).toBeVisible();

    await irA(page, /Anterior/i);
    await expect(
      page.getByRole("heading", { name: /Guía de instalación personalizada/i })
    ).toBeVisible();

    await page.keyboard.press("ArrowRight");
    await expect(
      page.getByRole("heading", { name: /Diagrama único de tu sistema/i })
    ).toBeVisible();
  });
});
