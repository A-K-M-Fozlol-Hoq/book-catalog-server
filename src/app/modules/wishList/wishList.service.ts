import { Types } from 'mongoose';
import Book from '../book/book.model';
import { IWishList, IWishListBook } from './wishList.interface';
import { WishList } from './wishList.model';

const addToWishList = async (
  email: string,
  bookId: string
): Promise<IWishList> => {
  try {
    // Check if a document exists for the given email
    let wishList = await WishList.findOne({ email });

    if (!wishList) {
      // If no document exists, create a new one
      wishList = await WishList.create({
        email,
        books: [{ book: new Types.ObjectId(bookId) }],
      });
    } else {
      // If a document exists, update the books array
      const isValidObjectId = Types.ObjectId.isValid(bookId);

      if (!isValidObjectId) {
        throw new Error('Invalid bookId');
      }

      const bookIndex = wishList.books.findIndex((item: IWishListBook) =>
        item.book.equals(bookId)
      );

      if (bookIndex === -1) {
        wishList.books.push({
          book: new Types.ObjectId(bookId),
        });
      }

      await wishList.save();
    }

    return wishList;
  } catch (error) {
    console.error('Error adding book to wishlist:', error);
    throw new Error('Error adding book to wishlist ');
  }
};

const getWishListBooks = async (email: string): Promise<IWishList | null> => {
  try {
    const wishList = await WishList.findOne({ email }).populate({
      path: 'books.book',
      model: Book,
      select: '-reviews', // Exclude reviews from the book details
    });

    return wishList;
  } catch (error) {
    console.error('Error fetching wishlist  books:', error);
    throw new Error('Error fetching wishlist  books');
  }
};

const removeBookFromWishList = async (
  email: string,
  bookId: string
): Promise<IWishList | null> => {
  try {
    // Find the wishlist document by email
    const wishList = await WishList.findOne({ email });

    if (!wishList) {
      throw new Error(`No wishlist books found for email: ${email}`);
    }

    // Check if the bookId is a valid ObjectId
    const isValidObjectId = Types.ObjectId.isValid(bookId);
    if (!isValidObjectId) {
      throw new Error('Invalid bookId');
    }

    // Find the index of the book with the given bookId
    const bookIndex = wishList.books.findIndex((item: IWishListBook) =>
      item.book.equals(bookId)
    );

    if (bookIndex === -1) {
      throw new Error('Book not found in wish list');
    }

    // Remove the book object from the books array
    wishList.books.splice(bookIndex, 1);

    // Save the changes
    await wishList.save();

    return wishList;
  } catch (error) {
    console.error('Error removing book from wishlist :', error);
    throw new Error('Error removing book from wishlist ');
  }
};

export const WishListService = {
  addToWishList,
  getWishListBooks,
  removeBookFromWishList,
};
