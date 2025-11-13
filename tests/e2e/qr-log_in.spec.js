import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

test("test login con cuenta que no existe por lo tanto no debe dejar entrar", async ({
  page,
}) => {
  await page.goto("https://qr-g1-front.vercel.app/admin");
  await page.getByRole("textbox", { name: "Email address" }).click();
  await page
    .getByRole("textbox", { name: "Email address" })
    .fill("testmalouc.cl");
  await page.getByRole("textbox", { name: "Password" }).click();
  await page.getByRole("textbox", { name: "Password" }).fill("falso");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.getByText("Wrong email or password")).toBeVisible();
});

test("test LOGIN cuenta admin exitoso", async ({ page }) => {
  await page.goto("https://qr-g1-front.vercel.app/admin");
  await page.getByRole("textbox", { name: "Email address" }).click();
  await page.getByRole("textbox", { name: "Email address" }).fill("");
  await page.getByRole("textbox", { name: "Email address" }).press("CapsLock");
  await page
    .getByRole("textbox", { name: "Email address" })
    .fill(process.env.ADMIN_MAIL_LOGIN);
  await page.getByRole("textbox", { name: "Password" }).click();
  await page
    .getByRole("textbox", { name: "Password" })
    .fill(process.env.ADMIN_PASSWORD_LOGIN);
  await page.getByRole("textbox", { name: "Password" }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(
    page.getByRole("heading", {
      name: "Panel de Administración QR UC CHRISTUS",
    })
  ).toBeVisible();
});
