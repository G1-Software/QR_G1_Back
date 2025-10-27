import { defineConfig } from '@playwright/test';

export default defineConfig({
  expect: {
    timeout: 10000
  },
  use: {
    baseURL: 'https://qr-g1-front.vercel.app/1', // acá pongo la url y con el /1 estoy en el qr 1 ya que no puedo escanear un qr en e2e
    headless: process.env.CI ? true : false,     // en CI lo corro en headless, local no
  },
  testDir: 'tests/e2e',
});
