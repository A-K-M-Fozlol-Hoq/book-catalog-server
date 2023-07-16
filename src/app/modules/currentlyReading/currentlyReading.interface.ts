import { Types } from 'mongoose';

export type ICurrentlyReadingBook = {
  book: Types.ObjectId; // Use ObjectId type to reference the Book model
  status: string;
};

export type ICurrentlyReading = {
  books: ICurrentlyReadingBook[];
  email: string;
};
