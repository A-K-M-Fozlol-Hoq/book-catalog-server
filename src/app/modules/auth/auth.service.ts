import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import {
  ILoginUser,
  ILoginUserResponse,
  ISignupUserResponse,
} from './auth.interface';

const signup = async (payload: IUser): Promise<ISignupUserResponse | null> => {
  const result = await User.create(payload);
  let newUserData = null;
  if (result) {
    newUserData = await User.findById(result._id);
  }
  const accessToken = jwtHelpers.createToken(
    { email: payload.email },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return { ...newUserData, accessToken };
};

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;
  console.log({ email, password });

  const isUserExist = await User.isUserExist(email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //create access token & refresh token

  const { email: userEmail } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { email },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userEmail },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    email,
  };
};

export const AuthService = {
  signup,
  loginUser,
};
