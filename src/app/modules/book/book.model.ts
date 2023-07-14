import { Schema, model } from 'mongoose';
import { IBook } from './book.interfaces';

const bookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  publicationDate: {
    type: String,
    required: true,
  },
  publicationYear: {
    type: Number,
    required: true,
  },
  reviews: {
    type: [
      {
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    required: true,
  },
});

const Book = model<IBook>('Book', bookSchema);
export default Book;
