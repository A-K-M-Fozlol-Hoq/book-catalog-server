/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
export type IUser = {
  password: string;
  email: string;
};

export type UserModel = {
  isUserExist(phoneNumber: string): Promise<Pick<IUser, 'email' | 'password'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
