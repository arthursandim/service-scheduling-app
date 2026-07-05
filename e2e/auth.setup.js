import { test as setup } from '@playwright/test';

setup('autenticar usuário de teste', async ({ page, context }) => {
  await page.goto('/login');
  await page.getByTestId('email-input').fill(process.env.E2E_USER_EMAIL);
  await page.getByTestId('password-input').fill(process.env.E2E_USER_PASSWORD);
  await page.getByTestId('login-button').click();
  await page.waitForURL('**/dashboard');

  await context.storageState({ path: '.auth/user.json' });
});
