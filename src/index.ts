import 'dotenv/config';
import 'module-alias/register';
import { initMigrations } from '@/db';
import { app } from './app';

const PORT = process.env.PORT || 3000;

initMigrations().then(() =>
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`)),
);
