import { GoogleBook } from "@/GoogleBook.js";
import { Bookshelf } from "@/Bookshelf.js";
import { config } from "@/config.js";
import { v4 as uuidv4 } from "uuid";

/*
 * Feature: Create a function that accepts two or more input parameters and
 * returns a value that is calculated or determined by the inputs.
 *
 * getCombinedBookshelfs: Combine two bookshelves into a new, single, bookshelf.
 * This function takes two Bookshelf instances and combines their books into a new Bookshelf instance.
 * It also allows for custom naming and description of the new bookshelf.
 * If no name is supplied, it defaults to a combination of the two bookshelves' names.
 * If no description is supplied, it defaults to a combination of the two bookshelves' descriptions.
 *
 * This will allow me to have simple buttons for combining bookshelves into custom bookshelves within the ui
 * without having to repeat this code in multiple places.
 */
export const utility = {
  getCombinedBookshelfs: (
    bookshelf1,
    bookshelf2,
    newBookshelfName = `${bookshelf1.name} & ${bookshelf2.name}`,
    newBookshelfDescription = `${bookshelf1.description} & ${bookshelf2.description}`
  ) => {
    if (!bookshelf1 || !bookshelf2) {
      config.FMT_PRINT_DEBUG(
        "bookshelf::getCombinedBookshelfs",
        "One or both bookshelves are undefined.",
        true
      );
      return false;
    }

    const combinedBooks = [...bookshelf1.books, ...bookshelf2.books];

    if (combinedBooks.length === 0) {
      return new Bookshelf(
        newBookshelfName,
        newBookshelfDescription,
        false,
        uuidv4(),
        combinedBooks
      );
    }
  },

  getBookshelfForm: (bookshelf) => {
    return {
      id: bookshelf.id,
      name: bookshelf.name,
      description: bookshelf.description,
      isDefault: bookshelf.isDefault,
      books: bookshelf.books
    };
  },

  getBookshelfFrom: (plainObject) => {
    let newShelf = new Bookshelf(
      plainObject.name,
      plainObject.description,
      plainObject.isDefault,
      plainObject.id,
      plainObject.books
    );

    config.FMT_PRINT_DEBUG("utility::constructBookshelfFromObject", newShelf);
    return newShelf;
  },

  getGBookFrom: (plainObject) => {
    const gbook = {
      id: plainObject.id, // string
      selfLink: plainObject.selfLink, // string
      volumeInfo: {
        title: plainObject.title, // string
        authors: plainObject.authors, // string
        subject: plainObject.subject, // [string, ...]
        publisher: plainObject.publisher, // string
        publishedDate: plainObject.publishedDate, // Date
        description: plainObject.description, // string
        identifiers: {
          isbn10: plainObject.isbn10, // string
          isbn13: plainObject.isbn13, // string
        },
        pageCount: plainObject.pageCount, // string
        printedPageCount: plainObject.printedPageCount, // string
        averageRating: plainObject.averageRating, // number
        ratingCount: plainObject.ratingCount, // number
        maturityRating: plainObject.maturityRating, // string
        imageLinks: {
          smallThumbnail: plainObject.imageLinks.smallThumbnail, // string
          thumbnail: plainObject.imageLinks.thumbnail, // string
          small: plainObject.imageLinks.small, // string
          medium: plainObject.imageLinks.medium, // string
          large: plainObject.imageLinks.large, // string
        },
        language: plainObject.language, // string
        infoLink: plainObject.infoLink, // string
        canonicalVolumeLink: plainObject.canonicalVolumeLink, // string
        saleInfo: plainObject.saleInfo, // { saleability, listPrice { amount, currencyCode } } :: { string, { number, string } }
      },
    };

    return new GoogleBook(gbook);
  },
};
