import { test, expect } from '@playwright/test';

test('test sobre menu información clinica del paciente', async ({ page }) => {
  await page.goto('https://qr-g1-front.vercel.app/1');
  await page.getByRole('link', { name: 'INFORMACIÓN CLINICA AL' }).click();
  await expect(page.getByRole('heading')).toContainText('INFORMACIÓN CLÍNICA');
  await expect(page.getByRole('heading', { name: 'INFORMACIÓN CLÍNICA' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'RESULTADOS DE EXÁMENES (LABORATORIOS E IMÁGENES)' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'DOCUMENTACIÓN CLINICA (FICHA CLÍNICA, EPICRISIS, ETC)' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'INFORMACIÓN SOBRE DIÁGNOSTICO O DE TRATAMIENTO MÉDICO' })).toBeVisible();
  await expect(page.getByRole('link', { name: '¿DÓNDE AGENDO UNA CITA POST HOSPITALIZACIÓN?' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'HORARIO VISITAS Y BANCO SANGRE' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'CUIDADOS EN EL ALTA' })).toBeVisible();
});