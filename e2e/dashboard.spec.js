import { test, expect } from '@playwright/test';
import fs from 'fs';

test.describe.configure({ mode: 'serial' });

const apiUrl = process.env.VITE_API_URL;

test.beforeAll(async ({ request }) => {
  const { token } = JSON.parse(fs.readFileSync('.auth/session.json', 'utf-8'));
  const authHeaders = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  const customerRes = await request.post(`${apiUrl}/customers`, {
    headers: authHeaders,
    data: { name: 'Cliente Teste', phone: '11999990000', address: 'Rua Teste, 123' },
  });
  const customer = await customerRes.json();

  const ids = [];
  for (let i = 0; i < 5; i++) {
    const res = await request.post(`${apiUrl}/appointments`, {
      headers: authHeaders,
      data: {
        customer: customer._id,
        dateTime: new Date().toISOString(),
        serviceType: 'Corte de grama',
      },
    });
    const appointment = await res.json();
    ids.push(appointment._id);
  }

  await request.put(`${apiUrl}/appointments/${ids[3]}`, {
    headers: authHeaders,
    data: { status: 'completed' },
  });

  await request.put(`${apiUrl}/appointments/${ids[4]}`, {
    headers: authHeaders,
    data: { status: 'cancelled' },
  });
});

test.afterAll(async ({ request }) => {
  await request.delete(`${apiUrl}/seed/reset`);
});

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
  });

  test('deve exibir os stat cards corretamente', async ({ page }) => {
    await expect(page.getByTestId('stat-total')).toBeVisible();
    await expect(page.getByTestId('stat-hoje')).toBeVisible();
    await expect(page.getByTestId('stat-pendentes')).toBeVisible();
  });

  test('deve exibir agendamentos na view de tabela por padrão', async ({ page }) => {
    await expect(page.getByTestId('appointment-row').first()).toBeVisible();
  });

  test('deve alternar para view de grid', async ({ page }) => {
    await page.getByTestId('view-grid-button').click();
    await expect(page.getByTestId('appointment-card').first()).toBeVisible();
  });

  test('deve navegar para detalhes ao clicar em ver detalhes', async ({ page }) => {
    await page.getByTestId('appointment-row').first().getByText('Ver detalhes').click();
    await expect(page).toHaveURL(/agendamentos\/.+/);
  });
});

test.describe('Detalhes do agendamento', () => {
  test('deve exibir botões de cancelar e concluir para agendamento pendente', async ({ page }) => {
    await page.goto('/dashboard');
    await page.getByTestId('appointment-row').first().getByText('Ver detalhes').click();
    await expect(page.getByTestId('cancel-button')).toBeVisible();
    await expect(page.getByTestId('complete-button')).toBeVisible();
  });

  test('deve cancelar agendamento e voltar ao dashboard', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await page.getByTestId('appointment-row').first().getByText('Ver detalhes').click();
    await page.getByTestId('cancel-button').click();
    await expect(page).toHaveURL(/dashboard/);
  });

  test('deve concluir agendamento e voltar ao dashboard', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await page.getByTestId('appointment-row').nth(1).getByText('Ver detalhes').click();
    await page.getByTestId('complete-button').click();
    await expect(page).toHaveURL(/dashboard/);
  });

  test('agendamento concluído não deve exibir botões de ação', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await page.getByTestId('appointment-row')
      .filter({ has: page.getByText('Concluído') })
      .first()
      .getByText('Ver detalhes')
      .click();
    await expect(page.getByTestId('cancel-button')).not.toBeVisible();
    await expect(page.getByTestId('complete-button')).not.toBeVisible();
    await expect(page.getByText('Este agendamento não pode mais ser alterado.')).toBeVisible();
  });

  test('agendamento cancelado não deve exibir botões de ação', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await page.getByTestId('appointment-row')
      .filter({ has: page.getByText('Cancelado') })
      .first()
      .getByText('Ver detalhes')
      .click();
    await expect(page.getByTestId('cancel-button')).not.toBeVisible();
    await expect(page.getByTestId('complete-button')).not.toBeVisible();
    await expect(page.getByText('Este agendamento não pode mais ser alterado.')).toBeVisible();
  });
});
