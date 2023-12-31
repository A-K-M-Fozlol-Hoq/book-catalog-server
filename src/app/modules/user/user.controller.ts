import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { UserService } from './user.service';

const getMyprofile = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getMyprofile(req.user?.email);
  console.log(req.user);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User's information retrieved successfully",
    data: result,
  });
});

export const UserController = {
  getMyprofile,
};
