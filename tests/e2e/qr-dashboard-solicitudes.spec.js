import { test, expect } from '@playwright/test';

/*
test('test', async ({ page }) => {
  await page.goto("https://qr-uc-christus.app/admin");
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole("textbox", { name: "Email address" }).fill(process.env.ADMIN_MAIL_LOGIN);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page
    .getByRole("textbox", { name: "Password" })
    .fill(process.env.ADMIN_PASSWORD_LOGIN);
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('link', { name: 'Acceder arrow_right_alt' }).nth(3).click();
  await expect(page.locator('iframe[title="Google Looker Studio dashboard"]').contentFrame().getByRole('button', { name: 'Edificio ▼' })).toBeVisible();
  await expect(page.locator('iframe[title="Google Looker Studio dashboard"]').contentFrame().getByRole('button', { name: 'Estado ▼' })).toBeVisible();
  await expect(page.locator('iframe[title="Google Looker Studio dashboard"]').contentFrame().getByRole('button', { name: 'Pieza ▼' })).toBeVisible();
  await expect(page.locator('iframe[title="Google Looker Studio dashboard"]').contentFrame().getByRole('button', { name: 'Piso ▼' })).toBeVisible();
  await expect(page.locator('iframe[title="Google Looker Studio dashboard"]').contentFrame().getByRole('button', { name: 'Cama ▼' })).toBeVisible();
  await expect(page.locator('iframe[title="Google Looker Studio dashboard"]').contentFrame().getByRole('button', { name: 'Servicio ▼' })).toBeVisible();
  await expect(page.locator('iframe[title="Google Looker Studio dashboard"]').contentFrame().getByRole('button', { name: 'getDateText()' })).toBeVisible();
  await expect(page.locator('iframe[title="Google Looker Studio dashboard"]').contentFrame().getByRole('button', { name: 'Subárea ▼' })).toBeVisible();
  await expect(page.locator('iframe[title="Google Looker Studio dashboard"]').contentFrame().getByRole('button', { name: 'Área ▼', exact: true })).toBeVisible();
  await expect(page.locator('iframe[title="Google Looker Studio dashboard"]').contentFrame().locator('#body iframe').contentFrame().getByRole('img')).toBeVisible();
}); */

/*
test('test filtros dashboard solicitudes', async ({ page }) => {
  await page.goto("https://qr-uc-christus.app/admin");
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole("textbox", { name: "Email address" }).fill(process.env.ADMIN_MAIL_LOGIN);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page
    .getByRole("textbox", { name: "Password" })
    .fill(process.env.ADMIN_PASSWORD_LOGIN);
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.locator('div').filter({ hasText: 'Dashboard de' }).nth(3)).toBeVisible();
  await page.getByRole('link', { name: 'Acceder arrow_right_alt' }).nth(3).click();
  await expect(page.locator('iframe[title="Google Looker Studio dashboard"]').contentFrame().getByText('Cantidad total de solicitudes realizadas.')).toBeVisible();
  await expect(page.locator('iframe[title="Google Looker Studio dashboard"]').contentFrame().getByText('Cantidad total de solicitudes realizadas.')).toBeVisible();
  await page.locator('iframe[title="Google Looker Studio dashboard"]').contentFrame().getByRole('button', { name: 'Piso ▼' }).click();
  await page.locator('iframe[title="Google Looker Studio dashboard"]').contentFrame().getByLabel('Piso').click();
  await page.locator('iframe[title="Google Looker Studio dashboard"]').contentFrame().locator('.popup-backdrop').click();
  await page.locator('iframe[title="Google Looker Studio dashboard"]').contentFrame().getByRole('button', { name: 'nov 2025' }).nth(2).click();
  await page.locator('iframe[title="Google Looker Studio dashboard"]').contentFrame().getByRole('button', { name: '17 nov' }).nth(1).click();
  await page.locator('iframe[title="Google Looker Studio dashboard"]').contentFrame().getByRole('button', { name: 'Aplicar' }).click();
  await expect(page.locator('iframe[title="Google Looker Studio dashboard"]').contentFrame().locator('#body iframe').contentFrame().getByRole('img')).toBeVisible();
  await expect(page.locator('iframe[title="Google Looker Studio dashboard"]').contentFrame().locator('#body iframe').contentFrame().getByRole('img')).toBeVisible();
  await page.locator('iframe[title="Google Looker Studio dashboard"]').contentFrame().getByRole('button', { name: 'Edificio ▼' }).click();
  await page.locator('iframe[title="Google Looker Studio dashboard"]').contentFrame().locator('.popup-backdrop').click();
  await page.locator('iframe[title="Google Looker Studio dashboard"]').contentFrame().getByRole('button', { name: 'Pieza ▼' }).click();
  await page.locator('iframe[title="Google Looker Studio dashboard"]').contentFrame().locator('.popup-backdrop').click();
  await page.locator('iframe[title="Google Looker Studio dashboard"]').contentFrame().getByLabel('Piso').click();
  await page.locator('iframe[title="Google Looker Studio dashboard"]').contentFrame().locator('.popup-backdrop').click();
  await page.locator('iframe[title="Google Looker Studio dashboard"]').contentFrame().getByRole('checkbox', { name: 'En Proceso' }).click();
  await page.locator('iframe[title="Google Looker Studio dashboard"]').contentFrame().locator('.popup-backdrop').click();
  await expect(page.locator('iframe[title="Google Looker Studio dashboard"]').contentFrame().getByRole('button', { name: 'Subárea ▼' })).toBeVisible();
  await expect(page.locator('iframe[title="Google Looker Studio dashboard"]').contentFrame().getByRole('button', { name: 'Área ▼', exact: true })).toBeVisible();
  await expect(page.locator('iframe[title="Google Looker Studio dashboard"]').contentFrame().getByRole('button', { name: 'Excluir En Proceso (1) ▼' })).toBeVisible();
  await expect(page.locator('iframe[title="Google Looker Studio dashboard"]').contentFrame().getByRole('button', { name: 'Cama ▼' })).toBeVisible();
  await expect(page.locator('iframe[title="Google Looker Studio dashboard"]').contentFrame().getByRole('button', { name: 'Pieza ▼' })).toBeVisible();
  await expect(page.locator('iframe[title="Google Looker Studio dashboard"]').contentFrame().getByRole('button', { name: 'Piso ▼' })).toBeVisible();
  await expect(page.locator('iframe[title="Google Looker Studio dashboard"]').contentFrame().getByRole('button', { name: 'Servicio ▼' })).toBeVisible();
});
*/