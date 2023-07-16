import { Schema, Types, model } from 'mongoose';
import { ICurrentlyReading } from './currentlyReading.interface';

const currentlyReadingSchema = new Schema<ICurrentlyReading>(
  {
    books: [
      {
        book: {
          type: Types.ObjectId, // Use ObjectId type to reference the Book model
          ref: 'Book', // This should match the model name of the Book
        },
        status: String,
      },
    ],
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const CurrentlyReading = model<ICurrentlyReading>(
  'CurrentlyReading',
  currentlyReadingSchema
);
