import { config } from "@/config.js";

export class GoogleBook {
  constructor(apiResponseObject) {
    // we need to flatten the api response some
    // theres still a couple nested objects, but this
    // is better than the original api response
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

  fmtTitle() {
    if (!this.title) return "Unknown Title";

    return this.title;
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

    // NYT books have a different format for publishedDate.
    // everything after the T can be ignored, its just the time
    // but we only really need the date.
    if (this.publishedDate.split("T").length > 1) {
      const text = this.publishedDate.split("T")[0];

      if (!text) {
        return "Unknown Publish Date";
      } else if (text.length != 10) {
        return text;
      } else {
        const year = text.slice(0, 4);
        const month = this.fmtMonth(Number(text.slice(5, 7)));
        const day = text.slice(8, 10);
        return `${month} ${day}, ${year}`;
      }
    } else {
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
