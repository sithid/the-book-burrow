import { config } from "@/config.js";

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * We could carry around the entire object that is returned from the google books api, but
 * there are up to 40 results, all containing data for fields were not using and I don't think
 * we really need to pass all that around to each result container.
 *
 * Instead, we will build a book based on the google response object returned from our api query
 * to the google books api but we will only use properties we care about, the rest will be lost.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
export class GoogleBook {
  // this constructor is used to create a new google book object from the api response object
  // this constructor is good for creating a new google book object from the api response object
  // for use within the application itself.
  constructor( apiResponseObject) {
    this.id = apiResponseObject.id; // string
    this.selflink = apiResponseObject.selflink; // string
    this.title = apiResponseObject.volumeInfo.title; // string
    this.authors = apiResponseObject.volumeInfo.authors; // string
    this.subject = apiResponseObject.volumeInfo.categories; // [string, ...]
    this.publisher = apiResponseObject.volumeInfo.publisher; // string
    this.publishedDate = apiResponseObject.volumeInfo.publishedDate; // Date
    this.description = apiResponseObject.volumeInfo.description; // string

    const identifiers = apiResponseObject.volumeInfo?.industryIdentifiers;

    const isbn10Identifier = identifiers?.find((id) => id.type === "ISBN_10");
    this.isbn10 = isbn10Identifier?.identifier;
    
    const isbn13Identifier = identifiers?.find((id) => id.type === "ISBN_13");
    this.isbn13 = isbn13Identifier?.identifier;

    this.pageCount = apiResponseObject.volumeInfo.pageCount; // string
    this.printedPageCount = apiResponseObject.volumeInfo.printedPageCount; // string
    this.averageRating = apiResponseObject.volumeInfo.averageRating; // number
    this.ratingCount = apiResponseObject.volumeInfo.ratingCount; // number
    this.maturityRating = apiResponseObject.volumeInfo.maturityRating; // string

    this.imageLinks = apiResponseObject.volumeInfo.imageLinks; // { smallThumbnail, thumbnail, small, medium, large } :: { string, string, string, string, string }
    this.language = apiResponseObject.volumeInfo.language; // string
    this.infoLink = apiResponseObject.volumeInfo.infoLink; // string
    this.canonicalVolumeLink = apiResponseObject.volumeInfo.canonicalVolumeLink; // string
    this.saleInfo = apiResponseObject.volumeInfo.saleInfo; // { saleability, listPrice { amount, currencyCode } } :: { string, { number, string } }
  }

  fmtAuthors() {
    if (!this.authors) return "Unknown Author";

    let fmtString = this.authors.join();
    return fmtString.replaceAll(",", " & ");
  }

  fmtPublisher() {
    if (!this.publisher) return "Unknown Publisher";

    return this.publisher;
  }
  fmtDescription() {
    if (this.description) {
      return this.description;
    } else {
      return "There is no description availible for this book.";
    }
  }

  // we only really care about the thumbnail, but we will
  // return the first image link that is defined, otherwise
  // we will return a placeholder image that is 200x250px 
  // with a message that the thumbnail is missing
  fmtThumbnail() {
    if (this.imageLinks != undefined) {
      if (this.imageLinks.thumbnail != undefined) {
        return this.imageLinks.thumbnail;
      } else if (this.imageLinks.smallThumbnail != undefined) {
        return this.imageLinks.smallThumbnail;
      } else if (this.imageLinks.small != undefined) {
        return this.imageLinks.small;
      } else if (this.imageLinks.medium != undefined) {
        return this.imageLinks.medium; 
      } else if (this.imageLinks.large != undefined) {
        return this.imageLinks.large;
      } else {
        return `https://place-hold.it/200x250?text="thumbnail%20missing"&fontsize=16`;
      }
    } else {
      return `https://place-hold.it/200x250?text=thumbnail%20missing&fontsize=16`;
    }
  }

  fmtPublishedDate() {
    if (!this.publishedDate) return "Unknown Publish Date";

    const text = this.publishedDate.split("-");

    if (!text) {
      return "Unknown Publish Date";
    } else if (text.length != 3) {
      if (text.length === 2) {
        const year = text[0];
        const month = this.fmtMonth(Number(text[1]));

        return `${month}, ${year}`;
      } else {
        return text[0];
      }
    } else {
      const year = text[0];
      const month = this.fmtMonth(Number(text[1]));
      const day = text[2];
      return `${month} ${day}, ${year}`;
    }
  }

  fmtMonth(month) {
    const months = [
      "January",
      "Febuary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    if (months[month - 1]) {
      return months[month - 1];
    } else {
      return "Unknown";
    }
  }

  fmtSubject() {
    if (!this.subject) return "[Unknown Authors]";

    return this.subject.join();
  }

  debugPrintBook() {
    let output = "object\n\r";

    const pad = 20;
    const bufMax = 80;

    output += this.title + "\n\r";
    output += "\n\rDebug Book: properties\n\r";

    for (const attr in this) {
      let key = `${attr}`;
      let val = `${this[key]}`;

      if (key === "description" && val.length > bufMax)
        val = val.slice(0, bufMax) + "...";

      output += "\t" + key.padEnd(pad, " ") + `= ${val}\n\r`;
    }

    output += "\n\rDebug Book: functions\n\r";

    output +=
      "\tfmtAuthors".padEnd(pad, " ") + " = " + this.fmtAuthors() + "\n\r";
    output +=
      "\tfmtPublishedDate".padEnd(pad, " ") +
      " = " +
      this.fmtPublishedDate() +
      "\n\r";
    output +=
      "\tfmtDescription".padEnd(pad, " ") +
      " = " +
      this.fmtDescription().slice(0, bufMax) +
      "..." +
      "\n\r";
    output +=
      "\tfmtThumbnail".padEnd(pad, " ") + " = " + this.fmtThumbnail() + "\n\r";
    output +=
      "\tfmtPublisher".padEnd(pad, " ") + " = " + this.fmtPublisher() + "\n\r";

    config.FMT_PRINT_DEBUG("gbook", output);
  }
}
