import { Schema, Types, model } from 'mongoose';
import { IWishList } from './wishList.interface';

const wishListSchema = new Schema<IWishList>(
  {
    books: [
      {
        book: {
          type: Types.ObjectId, // Use ObjectId type to reference the Book model
          ref: 'Book', // This should match the model name of the Book
        },
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

export const WishList = model<IWishList>('WishList', wishListSchema);
