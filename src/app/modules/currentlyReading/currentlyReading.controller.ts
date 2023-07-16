import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ICurrentlyReading } from './currentlyReading.interface';
import { CurrentlyReadingService } from './currentlyReading.service';

const addToCurrentlyReading = catchAsync(
  async (req: Request, res: Response) => {
    const { email, bookId } = req.body;
    const result = await CurrentlyReadingService.addToCurrentlyReading(
      email,
      bookId
    );

    sendResponse<ICurrentlyReading>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'data added successfully',
      data: result,
    });
  }
);

const getCurrentlyReadingBooks = catchAsync(
  async (req: Request, res: Response) => {
    const { email } = req.params;
    const result = await CurrentlyReadingService.getCurrentlyReadingBooks(
      email
    );

    sendResponse<ICurrentlyReading>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book fetched successfully',
      data: result,
    });
  }
);

const updateBookStatusByEmailAndId = catchAsync(
  async (req: Request, res: Response) => {
    const { email, bookId, status } = req.body;
    const result = await CurrentlyReadingService.updateBookStatusByEmailAndId(
      email,
      bookId,
      status
    );

    sendResponse<ICurrentlyReading>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'List updated successfully',
      data: result,
    });
  }
);

const removeBookFromCurrentlyReading = catchAsync(
  async (req: Request, res: Response) => {
    const { email, bookId } = req.params;
    const result = await CurrentlyReadingService.removeBookFromCurrentlyReading(
      email,
      bookId
    );

    sendResponse<ICurrentlyReading>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book deleted successfully',
      data: result,
    });
  }
);

export const CurrentlyReadingController = {
  addToCurrentlyReading,
  getCurrentlyReadingBooks,
  updateBookStatusByEmailAndId,
  removeBookFromCurrentlyReading,
};
