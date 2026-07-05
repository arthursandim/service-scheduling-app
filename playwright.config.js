// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ override: true, path: path.resolve(__dirname, '.env') });
dotenv.config({ path: path.resolve(__dirname, '../service-scheduling-api/.env') });

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:5173';

export default defineConfig({
    globalSetup: './e2e/global.setup.js',
    testDir: './e2e',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',

    use: {
        baseURL: BASE_URL,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        testIdAttribute: 'data-testid',
        locale: 'pt-BR',
    },

    projects: [
        {
            name: 'setup',
            testMatch: '**/auth.setup.js',
        },
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                storageState: '.auth/user.json',
            },
            dependencies: ['setup'],
        },
    ],


    webServer: [
        {
            command: 'npm run dev',
            url: 'http://localhost:5173',
            reuseExistingServer: !process.env.CI,
        },
        {
            command: 'npm run start:test',
            url: 'http://localhost:3000',
            cwd: path.resolve(__dirname, '../service-scheduling-api'),
            reuseExistingServer: false,
        },
    ],
});
