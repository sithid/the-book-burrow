import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { GoogleBook } from "../GoogleBook.js";

// we could include this in search or filter, to some degree but
// i would prefer to separate concerns to keep things clean and
// easier to maintain.
export const useBookStore = defineStore(
  "book",
  () => {
    const activeBook = ref(null); // we wont have book data yet

    // now that i understand the purpose of computed functions (cached) I
    // will use computed where possible, essentially when the output
    // is entirely dependent on other reactive state stuff and there
    // are no side effects.
    const hasActiveBook = computed(() => activeBook.value !== null);
    const getActiveBook = computed(() => activeBook.value);

    const setActiveBook = (book) => {
      activeBook.value = book;
    };

    const clearActiveBook = () => {
      activeBook.value = null;
    };

    return {
      activeBook,
      hasActiveBook,
      getActiveBook,
      setActiveBook,
      clearActiveBook,
    };
  },
  {
    // state persistence, automatically saves and loads state to/from localStorage
    persist: {
      paths: ["activeBook"],
      serializer: {
        // stringify the state, but we need to handle the GoogleBook object
        // deserialize manually, since it is a custom object.
        serialize: (state) => {
          const newState = {
            ...state,
            activeBook: state.activeBook ? { ...state.activeBook } : null,
          };
          return JSON.stringify(newState);
        },
        deserialize: (str) => {
          const loadedState = JSON.parse(str);

          // we previously had to stringify the book object, so we need to parse it back.
          if (loadedState.activeBook) {
            const plainObject = loadedState.activeBook;
            loadedState.activeBook = new GoogleBook({
              id: plainObject.id,
              selfLink: plainObject.selfLink,
              volumeInfo: {
                title: plainObject.title,
                authors: plainObject.authors,
                categories: plainObject.subject,
                publisher: plainObject.publisher,
                publishedDate: plainObject.publishedDate,
                description: plainObject.description,
                industryIdentifiers: [
                  plainObject.isbn10
                    ? { type: "ISBN_10", identifier: plainObject.isbn10 }
                    : null,
                  plainObject.isbn13
                    ? { type: "ISBN_13", identifier: plainObject.isbn13 }
                    : null,
                ].filter(Boolean), // i like how short this syntax is but some people would find it unclear
                pageCount: plainObject.pageCount,
                printedPageCount: plainObject.printedPageCount,
                averageRating: plainObject.averageRating,
                ratingCount: plainObject.ratingCount,
                maturityRating: plainObject.maturityRating,
                imageLinks: plainObject.imageLinks,
                language: plainObject.language,
                infoLink: plainObject.infoLink,
                canonicalVolumeLink: plainObject.canonicalVolumeLink,
                saleInfo: plainObject.saleInfo,
              },
            });
          } else {
            loadedState.activeBook = null;
          }
          return loadedState;
        },
      },
    },
  }
);
