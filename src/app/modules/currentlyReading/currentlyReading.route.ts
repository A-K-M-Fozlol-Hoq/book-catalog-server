import express, { Router } from 'express';
import auth from '../../middlewares/auth';
import { CurrentlyReadingController } from './currentlyReading.controller';

const router: Router = express.Router();

router.post(
  '/add-book',
  // validateRequest(BookValidation.createBookZodSchema),
  auth(),
  CurrentlyReadingController.addToCurrentlyReading
);

router.get(
  '/:email',
  auth(),
  CurrentlyReadingController.getCurrentlyReadingBooks
);

router.patch(
  '/',
  auth(),
  // validateRequest(BookValidation.updateBookZodSchema),
  // checkOwnership as RequestHandler,
  CurrentlyReadingController.updateBookStatusByEmailAndId
);

router.delete(
  '/:email/:bookId',
  auth(),
  // checkOwnership as RequestHandler,
  CurrentlyReadingController.removeBookFromCurrentlyReading
);

export const CurrentlyReadingRoutes: Router = router;
