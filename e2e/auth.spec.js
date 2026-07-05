import { test, expect } from '@playwright/test';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('deve exibir os elementos da tela de login', async ({ page }) => {
    await expect(page.getByTestId('email-input')).toBeVisible();
    await expect(page.getByTestId('password-input')).toBeVisible();
    await expect(page.getByTestId('login-button')).toBeVisible();
  });

  test('deve exibir erro com credenciais inválidas', async ({ page }) => {
    await page.getByTestId('email-input').fill('invalido@test.com');
    await page.getByTestId('password-input').fill('senhaerrada');
    await page.getByTestId('login-button').click();
    await expect(page.getByTestId('error-message')).toBeVisible();
  });

  test('deve redirecionar para o dashboard com credenciais válidas', async ({ page }) => {
    await page.getByTestId('email-input').fill(process.env.E2E_USER_EMAIL);
    await page.getByTestId('password-input').fill(process.env.E2E_USER_PASSWORD);
    await page.getByTestId('login-button').click();
    await page.waitForURL('**/dashboard');
    await expect(page).toHaveURL(/dashboard/);
  });
});

test.describe('Logout', () => {
  test('deve redirecionar para o login ao sair', async ({ page }) => {
    await page.goto('/login');
    await page.getByTestId('email-input').fill(process.env.E2E_USER_EMAIL);
    await page.getByTestId('password-input').fill(process.env.E2E_USER_PASSWORD);
    await page.getByTestId('login-button').click();
    await page.waitForURL('**/dashboard');
    await page.getByTestId('logout-button').click();
    await expect(page).toHaveURL(/login/);
  });
});

test.describe('Registro', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/registro');
  });

  test('deve exibir os elementos da tela de registro', async ({ page }) => {
    await expect(page.getByTestId('name-input')).toBeVisible();
    await expect(page.getByTestId('email-input')).toBeVisible();
    await expect(page.getByTestId('password-input')).toBeVisible();
    await expect(page.getByTestId('register-button')).toBeVisible();
  });

  test('deve exibir erro ao tentar registrar com email já cadastrado', async ({ page }) => {
    await page.getByTestId('name-input').fill('Teste');
    await page.getByTestId('email-input').fill(process.env.E2E_USER_EMAIL);
    await page.getByTestId('password-input').fill('senha12345');
    await page.getByTestId('register-button').click();
    await expect(page.getByTestId('error-message')).toBeVisible();
  });

  test('deve redirecionar para verificação com dados válidos', async ({ page }) => {
    await page.getByTestId('name-input').fill('Novo Usuario');
    await page.getByTestId('email-input').fill('novo@teste.com');
    await page.getByTestId('password-input').fill('senha12345');
    await page.getByTestId('register-button').click();
    await page.waitForURL('**/verificar**');
    await expect(page).toHaveURL(/verificar/);
  });
});

test.describe('Verificação', () => {
  test('deve exibir erro com código inválido', async ({ page }) => {
    await page.goto('/verificar?email=novo@teste.com');
    await page.getByTestId('verify-code-input').fill('000000');
    await page.getByTestId('verify-button').click();
    await expect(page.getByTestId('error-message')).toBeVisible();
  });
});
