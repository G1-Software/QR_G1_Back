import { test, expect } from '@playwright/test';

test('test entrar al panel y visualizar las distintas opciones', async ({ page }) => {
  await page.goto('https://qr-uc-christus.app/admin');
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page
    .getByRole("textbox", { name: "Email address" })
    .fill(process.env.ADMIN_MAIL_LOGIN);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page
    .getByRole("textbox", { name: "Password" })
    .fill(process.env.ADMIN_PASSWORD_LOGIN);
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.locator('div').filter({ hasText: 'Editor de ContenidoPermite' }).nth(3)).toBeVisible();
  await expect(page.locator('div').filter({ hasText: 'Instructivo del' }).nth(3)).toBeVisible();
  await expect(page.locator('div').filter({ hasText: 'Listado de SolicitudesMuestra' }).nth(3)).toBeVisible();
  await expect(page.locator('div').filter({ hasText: 'Dashboard de' }).nth(5)).toBeVisible();
  await expect(page.locator('div').filter({ hasText: 'Dashboard de métricas' }).nth(5)).toBeVisible();
  await expect(page.locator('div').filter({ hasText: 'Dashboard de métricas ChatbotReúne métricas e indicadores sobre el uso del' }).nth(3)).toBeVisible();
});

test('test ir a instructivo del editor y ver el instructivo', async ({ page }) => {
  await page.goto('https://qr-uc-christus.app/admin');
  await page.getByRole('textbox', { name: 'Email address' }).fill(process.env.ADMIN_MAIL_LOGIN);
  await page.getByRole('textbox', { name: 'Email address' }).click({
    modifiers: ['ControlOrMeta']
  });
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(process.env.ADMIN_PASSWORD_LOGIN);
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('link', { name: 'Acceder arrow_right_alt' }).nth(1).click();
  await expect(page.getByText('# 📝 **Instructivo')).toBeVisible();
  await expect(page.locator('div').filter({ hasText: '📝 Instructivo Interactivo' }).nth(3)).toBeVisible();
});

test('test ir a listado de solicitudes y después pasarse al editor y más', async ({ page }) => {
  await page.goto('https://qr-uc-christus.app/admin');
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill(process.env.ADMIN_MAIL_LOGIN);
  await page.getByText('Password *').click();
  await page.getByRole('textbox', { name: 'Password' }).fill(process.env.ADMIN_PASSWORD_LOGIN);
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.locator('div').filter({ hasText: 'Listado de SolicitudesMuestra' }).nth(3)).toBeVisible();
  await page.getByRole('link', { name: 'Acceder arrow_right_alt' }).nth(2).click();
  await page.getByRole('button', { name: 'Siguiente →' }).click();
  await page.getByRole('button', { name: 'Siguiente →' }).click();
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('link', { name: 'Inicio' }).click();
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('link', { name: 'Editor' }).click();
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('link', { name: 'Inicio' }).click();
});