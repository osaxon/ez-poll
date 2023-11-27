import 'dotenv/config';
import 'module-alias/register';

import express from 'express';

import { expressSession } from '@/middleware/auth';
import { initRoutes } from '@/router';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressSession);

initRoutes(app);

export { app };
