import { GoogleBook } from "@/GoogleBook.js";

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

    // spread operator provides a shallow copy of the books arrays from both bookshelfs.
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

  getBookshelfFrom: (plainObject) => {
    // this is used to create a new bookshelf object from a plain object.
    // this is good for deserializing the bookshelf from localStorage.
    let newShelf = new Bookshelf(
      plainObject.name,
      plainObject.description,
      plainObject.isDefault,
      plainObject.id,
      [...plainObject.books]
    );

    config.FMT_PRINT_DEBUG("utility::constructBookshelfFromObject", newShelf);
    return newShelf;
  },

  getGBookFrom: (plainObject) => {
    // used to create a new google book object from a plain object.
    // this works great for deserializing the book from localStorage
    // because the book is stored as a plain object but the shape of it is that
    // of a GoogleBook object and not a google books api response object.

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
        imageLinks: plainObject.imageLinks, // { smallThumbnail, thumbnail, small, medium, large } :: { string, string, string, string, string }
        language: plainObject.language, // string
        infoLink: plainObject.infoLink, // string
        canonicalVolumeLink: plainObject.canonicalVolumeLink, // string
        saleInfo: plainObject.saleInfo, // { saleability, listPrice { amount, currencyCode } } :: { string, { number, string } }
      },
    };

    return new GoogleBook(gbook);
  },
};
