import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IWishList } from './wishList.interface';
import { WishListService } from './wishList.service';

const addToWishList = catchAsync(async (req: Request, res: Response) => {
  const { email, bookId } = req.body;
  const result = await WishListService.addToWishList(email, bookId);

  sendResponse<IWishList>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'data added successfully',
    data: result,
  });
});

const getWishListBooks = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.params;
  const result = await WishListService.getWishListBooks(email);

  sendResponse<IWishList>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'wishlist fetched successfully',
    data: result,
  });
});

const removeBookFromWishList = catchAsync(
  async (req: Request, res: Response) => {
    const { email, bookId } = req.params;
    const result = await WishListService.removeBookFromWishList(email, bookId);

    sendResponse<IWishList>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book deleted successfully',
      data: result,
    });
  }
);

export const WishListController = {
  addToWishList,
  getWishListBooks,
  removeBookFromWishList,
};
