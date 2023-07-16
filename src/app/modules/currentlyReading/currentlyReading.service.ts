import { Types } from 'mongoose';
import Book from '../book/book.model';
import {
  ICurrentlyReading,
  ICurrentlyReadingBook,
} from './currentlyReading.interface';
import { CurrentlyReading } from './currentlyReading.model';

const addToCurrentlyReading = async (
  email: string,
  bookId: string
): Promise<ICurrentlyReading> => {
  try {
    // Check if a document exists for the given email
    let currentlyReading = await CurrentlyReading.findOne({ email });

    if (!currentlyReading) {
      // If no document exists, create a new one
      currentlyReading = await CurrentlyReading.create({
        email,
        books: [{ book: new Types.ObjectId(bookId), status: 'reading' }],
      });
    } else {
      // If a document exists, update the books array
      const isValidObjectId = Types.ObjectId.isValid(bookId);

      if (!isValidObjectId) {
        throw new Error('Invalid bookId');
      }

      const bookIndex = currentlyReading.books.findIndex(
        (item: ICurrentlyReadingBook) => item.book.equals(bookId)
      );

      if (bookIndex === -1) {
        currentlyReading.books.push({
          book: new Types.ObjectId(bookId),
          status: 'reading',
        });
      } else {
        currentlyReading.books[bookIndex].status = 'reading';
      }

      await currentlyReading.save();
    }

    return currentlyReading;
  } catch (error) {
    console.error('Error adding book to currently reading:', error);
    throw new Error('Error adding book to currently reading');
  }
};

const getCurrentlyReadingBooks = async (
  email: string
): Promise<ICurrentlyReading | null> => {
  try {
    // Find the CurrentlyReading document by email and populate the books details
    const currentlyReading = await CurrentlyReading.findOne({ email }).populate(
      {
        path: 'books.book',
        model: Book,
        select: '-reviews', // Exclude reviews from the book details
      }
    );

    return currentlyReading;
  } catch (error) {
    console.error('Error fetching currently reading books:', error);
    throw new Error('Error fetching currently reading books');
  }
};

const updateBookStatusByEmailAndId = async (
  email: string,
  bookId: string,
  status: string
): Promise<ICurrentlyReading | null> => {
  try {
    // Find the CurrentlyReading document by email
    const currentlyReading = await CurrentlyReading.findOne({ email });

    if (!currentlyReading) {
      throw new Error(`No currently reading books found for email: ${email}`);
    }

    // Check if the bookId is a valid ObjectId
    const isValidObjectId = Types.ObjectId.isValid(bookId);
    if (!isValidObjectId) {
      throw new Error('Invalid bookId');
    }

    // Find the index of the book with the given bookId
    const bookIndex = currentlyReading.books.findIndex(
      (item: ICurrentlyReadingBook) => item.book.equals(bookId)
    );

    if (bookIndex === -1) {
      throw new Error('Book not found in currently reading list');
    }

    // Update the status of the book
    currentlyReading.books[bookIndex].status = status;

    // Save the changes
    await currentlyReading.save();

    return currentlyReading;
  } catch (error) {
    console.error('Error updating book status:', error);
    throw new Error('Error updating book status');
  }
};

const removeBookFromCurrentlyReading = async (
  email: string,
  bookId: string
): Promise<ICurrentlyReading | null> => {
  try {
    // Find the CurrentlyReading document by email
    const currentlyReading = await CurrentlyReading.findOne({ email });

    if (!currentlyReading) {
      throw new Error(`No currently reading books found for email: ${email}`);
    }

    // Check if the bookId is a valid ObjectId
    const isValidObjectId = Types.ObjectId.isValid(bookId);
    if (!isValidObjectId) {
      throw new Error('Invalid bookId');
    }

    // Find the index of the book with the given bookId
    const bookIndex = currentlyReading.books.findIndex(
      (item: ICurrentlyReadingBook) => item.book.equals(bookId)
    );

    if (bookIndex === -1) {
      throw new Error('Book not found in currently reading list');
    }

    // Remove the book object from the books array
    currentlyReading.books.splice(bookIndex, 1);

    // Save the changes
    await currentlyReading.save();

    return currentlyReading;
  } catch (error) {
    console.error('Error removing book from currently reading:', error);
    throw new Error('Error removing book from currently reading');
  }
};

export const CurrentlyReadingService = {
  addToCurrentlyReading,
  getCurrentlyReadingBooks,
  updateBookStatusByEmailAndId,
  removeBookFromCurrentlyReading,
};
