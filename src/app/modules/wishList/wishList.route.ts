import express, { Router } from 'express';
import auth from '../../middlewares/auth';
import { WishListController } from './wishList.controller';

const router: Router = express.Router();

router.post(
  '/add-book',
  // validateRequest(BookValidation.createBookZodSchema),
  auth(),
  WishListController.addToWishList
);

router.get('/:email', auth(), WishListController.getWishListBooks);

router.delete(
  '/:email/:bookId',
  auth(),
  // checkOwnership as RequestHandler,
  WishListController.removeBookFromWishList
);

export const WishListRoutes: Router = router;
