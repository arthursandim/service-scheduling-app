import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ override: true, path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../service-scheduling-api/.env') });

async function globalSetup() {
  const apiUrl = process.env.VITE_API_URL || 'http://localhost:3000';

  await fetch(`${apiUrl}/seed/reset`, { method: 'DELETE' });

  await fetch(`${apiUrl}/seed/professional`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: process.env.E2E_USER_EMAIL,
      password: process.env.E2E_USER_PASSWORD,
    }),
  });
}

export default globalSetup;
