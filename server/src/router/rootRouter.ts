import { HttpStatus } from '@/types/httpStatus.enum';
import { Request, Response, Router } from 'express';

const rootRouter = Router();

enum RootRoutes {
  ROOT = '/',
  PULSE = '/pulse',
}

const handleRoot = async (_req: Request, res: Response) => {
  const html = `<h1>Root Handler</h1>`;
  res.status(HttpStatus.OK).send(html);
};

rootRouter.get(RootRoutes.ROOT, handleRoot);
rootRouter.get(RootRoutes.PULSE, (_req: Request, res: Response) =>
  res.status(200).send({ pulse: 'ok' }),
);

export default rootRouter;
