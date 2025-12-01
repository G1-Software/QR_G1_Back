

import { test, expect } from '@playwright/test';
/* 
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
  await page.getByLabel('EstadoTodosPendienteEn').selectOption('Pendiente');
  await expect(page.getByRole('cell', { name: 'Pendiente' }).first()).toBeVisible();
  await page.getByRole('textbox', { name: 'Inicio' }).fill('2025-11-04');
  
});

*/


test('test filtros de listado de solicitudes', async ({ page }) => {
  await page.goto("https://qr-uc-christus.app/admin");
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole("textbox", { name: "Email address" }).fill(process.env.ADMIN_MAIL_LOGIN);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page
    .getByRole("textbox", { name: "Password" })
    .fill(process.env.ADMIN_PASSWORD_LOGIN);
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('link', { name: 'Acceder arrow_right_alt' }).nth(2).click();
  await expect(page.locator('section')).toBeVisible();
  await expect(page.getByText('InstituciónTodasClínica')).toBeVisible();
  await expect(page.getByText('EdificioTodosABCCUCDE')).toBeVisible();
  await expect(page.getByText('PisoTodos1023456789')).toBeVisible();
  await expect(page.getByLabel('ServicioTodosIntermedioMQMaternidadOncologíaOncopediatría')).toBeVisible();
  await expect(page.getByText('HabitaciónTodas100110021003100410051006100710081009101010111012201201-1201-')).toBeVisible();
  await page.getByText('CamaTodas1234').click();
  await expect(page.getByText('CamaTodas1234')).toBeVisible();
  await expect(page.getByText('ÁreaTodasMantenciónNutrició')).toBeVisible();
  await expect(page.getByText('SubáreaTodas')).toBeVisible();
  await expect(page.getByText('EstadoTodosPendienteEn')).toBeVisible();
  await expect(page.getByText('Rango de creación')).toBeVisible();
  await expect(page.locator('section').getByText('Inicio')).toBeVisible();
  await expect(page.getByText('Término')).toBeVisible();
});