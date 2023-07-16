import express from 'express';

import { AuthRoutes } from '../modules/auth/auth.route';
import { BookRoutes } from '../modules/book/book.route';
import { CurrentlyReadingRoutes } from '../modules/currentlyReading/currentlyReading.route';
import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/books',
    route: BookRoutes,
  },
  {
    path: '/currently-reading',
    route: CurrentlyReadingRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
