import { test, expect } from '@playwright/test';

test('test hacer solicitud de forma correcta ', async ({ page }) => {
  await page.goto('https://qr-g1-front.vercel.app/?token=a3f5c2d8e9b14f6c8a0d3e4b9f2c1a7e');
  await expect(page.getByRole('link', { name: 'SOLICITUDES' })).toBeVisible();
  await page.getByRole('link', { name: 'SOLICITUDES' }).click();
  await expect(page.getByRole('heading', { name: 'ENVÍO DE SOLICITUD' })).toBeVisible();
  await expect(page.getByText('NOMBRE Y APELLIDO')).toBeVisible();
  await expect(page.locator('input[type="text"]')).toBeVisible();
  await expect(page.getByText('CORREO ELECTRÓNICO')).toBeVisible();
  await expect(page.locator('input[type="email"]')).toBeVisible();
  await expect(page.getByText('ÁREA DE LA SOLICITUD')).toBeVisible();
  await expect(page.getByRole('combobox')).toBeVisible();
  await expect(page.getByText('DETALLE DE LA SOLICITUD')).toBeVisible();
  await expect(page.locator('textarea')).toBeVisible();
  await page.locator('input[type="text"]').press('CapsLock');
  await page.locator('input[type="text"]').fill('PRUEBA');
  await page.locator('input[type="email"]').click();
  await page.locator('input[type="email"]').press('CapsLock');
  await page.locator('input[type="email"]').fill('prueba@gmail.com');
  await page.getByRole('combobox').selectOption('Asistencia Social');
  await page.locator('textarea').click();
  await page.locator('textarea').fill('asistencia');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Enviar Solicitud' }).click();
});


test('test hacer solicitud con mail erroneo por lo tanto no se envia', async ({ page }) => {
  await page.goto('https://qr-g1-front.vercel.app/?token=a3f5c2d8e9b14f6c8a0d3e4b9f2c1a7e');
  await expect(page.getByRole('link', { name: 'SOLICITUDES' })).toBeVisible();
  await page.getByRole('link', { name: 'SOLICITUDES' }).click();
  await expect(page.locator('input[type="text"]')).toBeVisible();
  await page.locator('input[type="text"]').click();
  await page.locator('input[type="text"]').fill('P');
  await page.locator('input[type="text"]').press('CapsLock');
  await page.locator('input[type="text"]').fill('Prueba');
  await page.locator('input[type="email"]').click();
  await page.locator('input[type="email"]').fill('mailerroneo');
  await page.getByRole('combobox').selectOption('Apoyo Espiritual');
  await page.getByRole('combobox').nth(1).selectOption('Solicita Oraciones para su Salud');
  await page.locator('textarea').click();
  await page.locator('textarea').fill('mala la solicitud');
  await page.getByRole('button', { name: 'Enviar Solicitud' }).click();
  await expect(page.getByText('Formato de correo inválido (')).toBeVisible();
});


test('test hacer solicitud sin llenar campos obligatorios de nombre y correo', async ({ page }) => {
  await page.goto('https://qr-g1-front.vercel.app/?token=a3f5c2d8e9b14f6c8a0d3e4b9f2c1a7e');
  await expect(page.getByRole('link', { name: 'SOLICITUDES' })).toBeVisible();
  await page.getByRole('link', { name: 'SOLICITUDES' }).click();
  await page.getByRole('combobox').selectOption('Apoyo Espiritual');
  await page.getByRole('combobox').nth(1).selectOption('Solicita Sacramento, Comunión y Confesión');
  await page.locator('textarea').click();
  await page.locator('textarea').fill('prueba ');
  await page.getByRole('button', { name: 'Enviar Solicitud' }).click();
  await expect(page.getByText('Ingresa tu nombre.')).toBeVisible();
  await page.getByText('Ingresa tu correo.').click();
});

test('test hacer solicitud sin ingresar nombre, por lo tanto no se envia', async ({ page }) => {
  await page.goto('https://qr-g1-front.vercel.app/?token=a3f5c2d8e9b14f6c8a0d3e4b9f2c1a7e');
  await expect(page.getByRole('link', { name: 'SOLICITUDES' })).toBeVisible();
  await page.getByRole('link', { name: 'SOLICITUDES' }).click();
  await page.locator('input[type="email"]').click();
  await page.locator('input[type="email"]').fill('mail@uc.cl');
  await page.getByRole('combobox').selectOption('Asistencia Social');
  await page.locator('textarea').click();
  await page.locator('textarea').fill('prueba erronea');
  await page.getByRole('button', { name: 'Enviar Solicitud' }).click();
  await expect(page.getByText('Ingresa tu nombre.')).toBeVisible();
});