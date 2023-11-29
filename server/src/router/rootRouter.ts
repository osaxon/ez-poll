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
rootRouter.get(RootRoutes.TOKEN, async (_req: Request, res: Response) => {
  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: process.env.AUTH0_CLIENT_ID || '',
    client_secret: process.env.AUTH0_CLIENT_SECRET || '',
    audience: process.env.AUTH0_AUDIENCE || 'http://localhost:3000',
  });
  console.log(body, '<--- the body');
  try {
    const tokenResponse = await fetch(
      `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
      {
        method: 'POST', // Specify the HTTP method
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body,
      },
    );

    const tokenData = await tokenResponse.json();

    // Do something with the access token, maybe send it in the response or store it for later use

    return res.json({ tokenData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default rootRouter;
