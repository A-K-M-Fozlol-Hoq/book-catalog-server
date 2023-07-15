import express, { Router } from 'express';
// import { RequestHandler } from 'express-serve-static-core';
import auth from '../../middlewares/auth';
import { BookController } from './book.controller';

const router: Router = express.Router();

router.post(
  '/add-book',
  // validateRequest(BookValidation.createBookZodSchema),
  auth(),
  BookController.createBook
);

router.get('/', BookController.getAllBooks);

router.get('/:id', BookController.getSingleBook);

router.patch(
  '/:id',
  auth(),
  // validateRequest(BookValidation.updateBookZodSchema),
  // checkOwnership as RequestHandler,
  BookController.updateBook
);

router.patch('/', BookController.addReview);

router.delete(
  '/:id',
  auth(),
  // checkOwnership as RequestHandler,
  BookController.deleteBook
);

export const BookRoutes: Router = router;
