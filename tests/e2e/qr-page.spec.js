import { test, expect } from '@playwright/test';

test('qr detail page loads', async ({ page }) => {
  const response = await page.goto('/');
  expect(response && response.ok()).toBeTruthy();
  await expect(page.locator('body')).toBeVisible();
});

/*test('revisar contenido landing page', async ({ page }) => {
  await page.goto('https://qr-g1-front.vercel.app/1');
  await expect(page.getByRole('link', { name: 'INFORMACIÓN CLINICA AL PACIENTE' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'INFORMACIÓN ADMINISTRATIVA Y PAGOS' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'ACOMPAÑANTES, VISITAS Y' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'SOLICITUDES' })).toBeVisible();
  await expect(page.getByRole('contentinfo')).toContainText('Habitación 302 A - 3 / Cama 1');
  await expect(page.getByText('Hospital UC - MQ')).toBeVisible();
  await page.getByText('Hospital UC - MQ').click();
  await expect(page.getByText('Por favor indíquenos de qué área es su consulta')).toBeVisible();
});*/