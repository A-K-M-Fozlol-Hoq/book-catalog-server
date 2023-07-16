import { Types } from 'mongoose';

export type IWishListBook = {
  book: Types.ObjectId; // Use ObjectId type to reference the Book model
};

export type IWishList = {
  books: IWishListBook[];
  email: string;
};
