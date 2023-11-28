import 'dotenv/config';
import { closeDatabaseConnection, initMigrations } from './db';

initMigrations().then(() => closeDatabaseConnection());
