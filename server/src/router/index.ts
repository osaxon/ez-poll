import { Express } from 'express';
import rootRouter from '@/router/rootRouter';

enum Routes {
  ROOT = '/',
}

export const initRoutes = (app: Express) => {
  app.use(Routes.ROOT, rootRouter);
};
