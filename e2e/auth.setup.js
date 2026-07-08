import { test as setup } from '@playwright/test';
import fs from 'fs';

setup('autenticar usuário de teste', async ({ request, page, context }) => {
  await request.delete(`${process.env.PLAYWRIGHT_API_URL}/seed/reset`);

  await request.post(`${process.env.PLAYWRIGHT_API_URL}/seed/professional`, {
    data: {
      email: process.env.E2E_USER_EMAIL,
      password: process.env.E2E_USER_PASSWORD,
    },
  });

  await page.goto('/login');
  await page.getByTestId('email-input').fill(process.env.E2E_USER_EMAIL);
  await page.getByTestId('password-input').fill(process.env.E2E_USER_PASSWORD);
  await page.getByTestId('login-button').click();
  await page.waitForURL('**/dashboard');

  const token = await page.evaluate(() => localStorage.getItem('token'));
  fs.writeFileSync('.auth/session.json', JSON.stringify({ token }));

  await context.storageState({ path: '.auth/user.json' });
});
