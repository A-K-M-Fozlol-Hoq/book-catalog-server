import express from 'express';

import { AuthRoutes } from '../modules/auth/auth.route';
import { BookRoutes } from '../modules/book/book.route';
import { CurrentlyReadingRoutes } from '../modules/currentlyReading/currentlyReading.route';
import { UserRoutes } from '../modules/user/user.route';
import { WishListRoutes } from '../modules/wishList/wishList.route';

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
  {
    path: '/wish-list',
    route: WishListRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
