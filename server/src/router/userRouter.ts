import { Router } from 'express';
import { createUser, userLogin, userLogout } from '@/repository/user';
import { isAuthenticated } from '@/middleware/auth';
import { Role } from '@/db/schema';
import { getUsers, validate } from '@/controllers/users.controllers';

const userRouter = Router();

enum UserRoutes {
  LOGIN = '/login',
  AUTH = '/auth',
  LOGOUT = '/logout',
  ALL = '/all',
  ROOT = '/',
}

userRouter.get(UserRoutes.ALL, isAuthenticated([Role.Admin]), getUsers);
userRouter.get(UserRoutes.AUTH, isAuthenticated([Role.Admin]), validate);
userRouter.post(UserRoutes.LOGIN, userLogin);
userRouter.post(UserRoutes.LOGOUT, userLogout);
// remove the auth middleware to create a test user via REST call
userRouter.post(UserRoutes.ROOT, isAuthenticated([Role.Admin]), createUser);

export default userRouter;
