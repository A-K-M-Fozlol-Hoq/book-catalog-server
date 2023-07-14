export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  publicationYear: number;
  reviews: {
    comment: string;
  }[];
};
export const bookFilterableFields: string[] = [
  'searchTerm',
  'title',
  'author',
  'genre',
  'publicationYear',
];

export type IBookFilters = {
  searchTerm?: string;
  title?: string;
  author?: string;
  genre?: string;
  publicationYear?: number;
};