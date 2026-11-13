import { test, expect, irA } from "./fixtures.js";

test.describe("Caja negra · Inicio", () => {
  test("INI-01: muestra el hero y los tres pasos del flujo", async ({ page }) => {
    await test.step("Verificar el título principal", async () => {
      await expect(
        page.getByRole("heading", {
          name: /La energía solar de tu puesto, calculada en minutos/i
        })
      ).toBeVisible();
    });

    await test.step("Verificar los tres pasos", async () => {
      await expect(page.getByText(/1\. Registra tus aparatos/i).first()).toBeVisible();
      await expect(page.getByText(/2\. Calcula tu sistema/i).first()).toBeVisible();
      await expect(page.getByText(/3\. Instala con seguridad/i).first()).toBeVisible();
    });
  });

  test("INI-02: el botón principal abre la pestaña de carga", async ({ page }) => {
    await irA(page, /Empezar con mi tabla de aparatos/i);
    await expect(
      page.getByRole("heading", { name: /Tabla de carga de aparatos de tu puesto/i })
    ).toBeVisible();
  });

  test("INI-03: el botón secundario abre la guía de instalación", async ({ page }) => {
    await irA(page, /Ver guía de instalación/i);
    await expect(
      page.getByRole("heading", { name: /Guía de instalación personalizada/i })
    ).toBeVisible();
  });
});
