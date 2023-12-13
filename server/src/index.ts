import 'dotenv/config';
import 'module-alias/register';
import { server } from './app';
import { initMigrations } from './db';

const PORT = process.env.PORT || 3000;

initMigrations().then(() => {
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
