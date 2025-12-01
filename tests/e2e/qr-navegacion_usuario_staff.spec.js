import { test, expect } from '@playwright/test';

test('test entrar como staff y visualizar los paneles', async ({ page }) => {
  await page.goto('https://qr-uc-christus.app/admin');
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('dafne.valdivia@uc.cl');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('20.819.320-1');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.locator('div').filter({ hasText: 'Listado de SolicitudesMuestra' }).nth(3)).toBeVisible();
  await page.locator('div').filter({ hasText: 'Dashboard de' }).nth(3).click();
});

test('test ir al listado de solicitudes y visualizarlas', async ({ page }) => {
  await page.goto('https://qr-uc-christus.app/admin');
  await page.getByRole('textbox', { name: 'Email address' }).fill('dafne.valdivia@uc.cl');
  await page.getByRole('textbox', { name: 'Email address' }).click({
    modifiers: ['ControlOrMeta']
  });
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('20.819.320-1');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.locator('div').filter({ hasText: 'Listado de SolicitudesMuestra' }).nth(3)).toBeVisible();
  await page.getByRole('link', { name: 'Acceder arrow_right_alt' }).first().click();
  await expect(page.getByRole('heading', { name: 'Listado de solicitudes▶' })).toBeVisible();
  await expect(page.locator('section')).toBeVisible();
});


test('test ir al dashboard de metricas de solicitudes', async ({ page }) => {
  await page.goto('https://qr-uc-christus.app/admin');
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('dafne.valdivia@uc.cl');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('20.819.320-1');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('link', { name: 'Acceder arrow_right_alt' }).nth(1).click();
  await expect(page.locator('iframe[title="Google Looker Studio dashboard"]').contentFrame().getByText('Cantidad total de solicitudes realizadas. calendar_today Selecciona un periodo')).toBeVisible();
});