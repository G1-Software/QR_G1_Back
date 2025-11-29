import { test, expect } from '@playwright/test';


test('test uso general', async ({ page }) => {
  await page.goto('https://qr-uc-christus.app/?token=d48376bb1c6b45e73d0e88946b151813');
  await expect(page.getByRole('link', { name: 'INFORMACIÓN CLÍNICA AL' })).toBeVisible();
  await page.getByRole('link', { name: 'INFORMACIÓN CLÍNICA AL' }).click();
  await page.getByRole('link', { name: 'HORARIO VISITAS Y BANCO SANGRE' }).click();
  await page.getByRole('button', { name: 'arrow_back_ios' }).click();
  await page.getByRole('link', { name: 'PROCESO Y CUIDADOS EN EL ALTA' }).click();
  await expect(page.getByText('Tu médico tratante será quien')).toBeVisible();
  await expect(page.getByText('Hola, ¿Cómo puedo ayudarte?')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
  await page.getByRole('link', { name: 'Home' }).click();
  await expect(page.getByText('INFORMACIÓN CLÍNICA AL PACIENTEINFORMACIÓN ADMINISTRATIVA Y PAGOSACOMPAÑANTES,')).toBeVisible();
});


test('test uso general 2 con intento de solicitud fallida', async ({ page }) => {
  await page.goto('https://qr-uc-christus.app/?token=d48376bb1c6b45e73d0e88946b151813');
  await expect(page.getByRole('link', { name: 'SOLICITUDES (LIMPIEZA,' })).toBeVisible();
  await page.getByRole('link', { name: 'SOLICITUDES (LIMPIEZA,' }).click();
  await page.getByText('NOMBRE Y APELLIDOCORREO').click();
  await page.getByText('NOMBRE Y APELLIDOCORREO').click();
  await page.locator('input[type="text"]').click();
  await page.locator('input[type="text"]').press('CapsLock');
  await page.locator('input[type="text"]').press('CapsLock');
  await page.locator('input[type="text"]').fill('H');
  await page.locator('input[type="text"]').press('CapsLock');
  await page.locator('input[type="text"]').fill('Halll');
  await page.locator('input[type="email"]').click();
  await page.locator('input[type="email"]').fill('ande@uc.cl');
  await page.locator('input[type="email"]').click();
  await page.locator('input[type="email"]').fill('nooo');
  await page.getByRole('combobox').selectOption('Limpieza de Habitación');
  await page.getByRole('combobox').nth(1).selectOption('Derrame de Líquidos');
  await page.locator('textarea').click();
  await page.locator('textarea').fill('se me cayó el agua');
  await page.getByRole('button', { name: 'Enviar Solicitud' }).click();
  await expect(page.getByText('Formato de correo inválido (')).toBeVisible();
  await page.getByRole('button', { name: 'arrow_back_ios' }).click();
  await page.getByRole('link', { name: 'INFORMACIÓN CLÍNICA AL' }).click();
  await page.getByRole('link', { name: 'HORARIO VISITAS Y BANCO SANGRE' }).click();
});


test('test información cuidador externo y ingreso de perros', async ({ page }) => {
  await page.goto('https://qr-uc-christus.app/?token=d48376bb1c6b45e73d0e88946b151813');
  await page.getByRole('link', { name: 'ACOMPAÑANTES, VISITAS Y' }).click();
  await page.getByRole('link', { name: 'INFORMACIÓN GENERAL DE ACOMPA' }).click();
  await expect(page.getByRole('link', { name: 'CUIDADOR DE EMPRESA EXTERNA' })).toBeVisible();
  await page.getByRole('link', { name: 'CUIDADOR DE EMPRESA EXTERNA' }).click();
  await expect(page.getByText('CUIDADOR DE EMPRESA EXTERNA ¿')).toBeVisible();
  await page.getByRole('heading', { name: 'Requisitos' }).click();
  await page.getByText('Salud: Sin patologías agudas').click();
  await page.getByText('Edad: Entre 18 y 65 años. Salud: Sin patologías agudas ni contagiosas. Vacunas').click();
  await page.locator('ol').click();
  await page.getByRole('button', { name: 'arrow_back_ios' }).click();
  await page.getByRole('link', { name: 'INGRESO DE PERROS DE' }).click();
  await expect(page.getByRole('heading', { name: 'Requisitos para el Ingreso:' })).toBeVisible();
  await page.getByRole('button', { name: 'arrow_back_ios' }).click();
});


test('test hacer solicitud de asistencia social y ver sugerencias y reclamos', async ({ page }) => {
  await page.goto('https://qr-uc-christus.app/?token=d48376bb1c6b45e73d0e88946b151813');
  await expect(page.getByText('Por favor indíquenos de qué área es su consultaINFORMACIÓN CLÍNICA AL')).toBeVisible();
  await page.getByText('Hospital UC - MQ').click();
  await page.getByRole('link', { name: 'SOLICITUDES (LIMPIEZA,' }).click();
  await page.locator('input[type="text"]').click();
  await page.locator('input[type="text"]').press('CapsLock');
  await page.locator('input[type="text"]').fill('t');
  await page.locator('input[type="text"]').press('CapsLock');
  await page.locator('input[type="text"]').fill('T');
  await page.locator('input[type="text"]').press('CapsLock');
  await page.locator('input[type="text"]').press('CapsLock');
  await page.locator('input[type="text"]').press('CapsLock');
  await page.locator('input[type="text"]').fill('Tarek ');
  await page.locator('input[type="text"]').press('CapsLock');
  await page.locator('input[type="text"]').fill('Tarek H');
  await page.locator('input[type="text"]').press('CapsLock');
  await page.locator('input[type="email"]').click();
  await page.locator('input[type="email"]').fill('tarekaboid@gmail.com');
  await page.getByRole('combobox').selectOption('Asistencia Social');
  await page.locator('textarea').click();
  await page.locator('textarea').press('CapsLock');
  await page.locator('textarea').fill('necesito asistencia ');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Enviar Solicitud' }).click();
  await page.getByRole('button', { name: 'arrow_back_ios' }).click();
  await expect(page.getByRole('link', { name: 'INFORMACIÓN ADMINISTRATIVA Y' })).toBeVisible();
  await page.getByRole('link', { name: 'INFORMACIÓN ADMINISTRATIVA Y' }).click();
  await page.getByRole('link', { name: 'SUGERENCIAS, RECLAMOS Y' }).click();
  await expect(page.getByRole('heading', { name: '¿Tienes alguna sugerencia,' })).toBeVisible();
});