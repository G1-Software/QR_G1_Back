import { test, expect } from '@playwright/test';

test('test comprobar filtros listado de solicitudes', async ({ page }) => {
  await page.goto("https://qr-uc-christus.app/admin");
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole("textbox", { name: "Email address" }).fill(process.env.ADMIN_MAIL_LOGIN);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page
    .getByRole("textbox", { name: "Password" })
    .fill(process.env.ADMIN_PASSWORD_LOGIN);
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('link', { name: 'Acceder arrow_right_alt' }).nth(2).click();
  await page.getByLabel('ÁreaTodasNutriciónMantenció').selectOption('Nutrición');
  await expect(page.getByRole('cell', { name: 'Nutrición' }).first()).toBeVisible();
  await page.getByLabel('SubáreaTodasDemora Entrega').selectOption('Necesito Visita Nutricionista');
  await expect(page.getByRole('cell', { name: 'Necesito Visita Nutricionista' }).first()).toBeVisible();
  await page.getByLabel('EstadoTodosPendienteEn').selectOption('Pendiente');
  await expect(page.getByRole('cell', { name: 'Pendiente' }).first()).toBeVisible();
  await page.getByRole('textbox', { name: 'Inicio' }).fill('2025-11-04');
  await expect(page.getByRole('cell', { name: '/13/2025, 3:36:32 PM' }).first()).toBeVisible();
});