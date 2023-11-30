import { HttpStatus } from '@/types/httpStatus.enum';
import { Request, Response, Router } from 'express';
import { checkJwt } from '@/middleware/authz.middleware';

const rootRouter = Router();

enum RootRoutes {
  ROOT = '/',
  PULSE = '/pulse',
  TOKEN = '/token',
}

const handleRoot = async (_req: Request, res: Response) => {
  const html = `<h1>Root Handler</h1>`;
  res.status(HttpStatus.OK).send(html);
};

rootRouter.get(RootRoutes.ROOT, handleRoot);
rootRouter.get(RootRoutes.PULSE, checkJwt, (_req: Request, res: Response) =>
  res.status(200).send({ pulse: 'ok' }),
);

export default rootRouter;
