import { test, expect } from '@playwright/test';

test('test ir a info admin y buscar información del GES', async ({ page }) => {
  await page.goto('https://qr-g1-front.vercel.app/1');
  await expect(page.getByRole('link', { name: 'INFORMACIÓN ADMINISTRATIVA Y PAGOS' })).toBeVisible();
  await page.getByRole('link', { name: 'INFORMACIÓN ADMINISTRATIVA Y PAGOS' }).click();
  await expect(page.getByRole('link', { name: 'INFORMACIÓN GES - CAEC - LEY' })).toBeVisible();
  await page.getByRole('link', { name: 'INFORMACIÓN GES - CAEC - LEY' }).click();
  await expect(page.getByRole('link', { name: 'GES' })).toBeVisible();
  await page.getByRole('link', { name: 'GES' }).click();
  // FALTA HACER ASSERT DE CONTENIDO ESPECIFICO DE GES YA QUE AÚN NO ESTA.
});

test('test ir a info admin y buscar información de CAEC', async ({ page }) => {
  await page.goto('https://qr-g1-front.vercel.app/1');
  await expect(page.getByRole('link', { name: 'INFORMACIÓN ADMINISTRATIVA Y PAGOS' })).toBeVisible();
  await page.getByRole('link', { name: 'INFORMACIÓN ADMINISTRATIVA Y PAGOS' }).click();
  await expect(page.getByRole('link', { name: 'INFORMACIÓN GES - CAEC - LEY' })).toBeVisible();
  await page.getByRole('link', { name: 'INFORMACIÓN GES - CAEC - LEY' }).click();
  await expect(page.getByRole('link', { name: 'CAEC' })).toBeVisible();
  await page.getByRole('link', { name: 'CAEC' }).click();
    // FALTA HACER ASSERT DE CONTENIDO ESPECIFICO DE CAEC YA QUE AÚN NO ESTA.
});

test('testir a info admin y buscar información de ley de urgencias', async ({ page }) => {
  await page.goto('https://qr-g1-front.vercel.app/1');
  await expect(page.getByRole('link', { name: 'INFORMACIÓN ADMINISTRATIVA Y PAGOS' })).toBeVisible();
  await page.getByRole('link', { name: 'INFORMACIÓN ADMINISTRATIVA Y PAGOS' }).click();
  await expect(page.getByRole('link', { name: 'INFORMACIÓN GES - CAEC - LEY' })).toBeVisible();
  await page.getByRole('link', { name: 'INFORMACIÓN GES - CAEC - LEY' }).click();
  await expect(page.getByRole('link', { name: 'LEY DE URGENCIA' })).toBeVisible();
  await page.getByRole('link', { name: 'LEY DE URGENCIA' }).click();
    // FALTA HACER ASSERT DE CONTENIDO ESPECIFICO DE LEY DE URGENCIA YA QUE AÚN NO ESTA.
});
