import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { Bookshelf } from "@/Bookshelf.js";
import { config } from "@/config.js";
import { utility } from "@/utility.js";

export const useUserStore = defineStore(
  "user",
  () => {
    // this user store is specifically for managing the users data.
    // this includes everything from user preferences to their bookshelfs.

    // this is the default bookshelf list
    // this is how we will populate the users default bookshelfs
    // from here, it can be updated, added to, or removed from by the user
    // and the data will persist to localstorage thanks to pinia's persistence plugin
    // we wanna make sure we use the BookShelf constructor function which will set
    // the id with a uuid for us.
    const bookshelfs = ref([
      new Bookshelf(
        "To Be Read",
        "This bookshelf contains books you plan to read.",
        true
      ),
      new Bookshelf(
        "Currently Reading",
        "This bookshelf contains books you are currently reading.",
        true
      ),
      new Bookshelf(
        "Already Read",
        "This bookshelf contains books you have already read.",
        true
      ),
      new Bookshelf(
        "Wishlist",
        "This bookshelf contains books you want to buy in the future.",
        true
      ),
      new Bookshelf(
        "Already Owned",
        "This bookshelf contains books you own.",
        true
      ),
      new Bookshelf(
        "Favorites",
        "This bookshelf contains your favorite books.",
        true
      ),
    ]);

    const activeBookshelf = ref(null);
    const activeBookshelfId = ref(null);
    const maxResults = ref(40);
    const maxPages = ref(10);
    const defaultLanguage = ref('any');
    
    const isPrefsPanelOpen = ref(false);

    const Bookshelfs = computed(() => bookshelfs.value);
    const ActiveBookshelf = computed(() => activeBookshelf.value);
    const ActiveBookshelfId = computed(() => activeBookshelfId.value);
    const HasActiveBookshelf = computed(() => activeBookshelf.value !== null);
    const MaxResults = computed(() => maxResults.value);
    const MaxPages = computed(() => maxPages.value);

    const PrefsPanelOpen = computed(() => {
      return isPrefsPanelOpen.value;
    });

    const togglePrefsPanel = () => {
      isPrefsPanelOpen.value = !isPrefsPanelOpen.value;
    };

    // i treat these like setters
    const setMaxResults = (value) => {
      if (value < 10) value = 10;
      if (value > 40) value = 40;

      maxResults.value = value;
    };

    const setMaxPages = (value) => {
      if (value < 1) value = 1;
      if (value > 10) value = 10;

      maxPages.value = value;
    };

    const setActiveBookshelf = (bookshelf) => {
      if (!bookshelf || !(bookshelf instanceof Bookshelf) || !bookshelf.id) {
        config.FMT_PRINT_DEBUG(
          "user::setActiveBookshelf",
          "Invalid bookshelf provided to setActiveBookshelf.",
          true
        );
        return false;
      }

      activeBookshelf.value = bookshelf;
      activeBookshelfId.value = bookshelf.id;
      npm;
      return true;
    };

    const setActiveBookshelfById = (id) => {
      const bookshelf = bookshelfs.value.find((shelf) => shelf.id === id);

      if (bookshelf) {
        activeBookshelf.value = bookshelf;
        return true;
      } else {
        config.FMT_PRINT_DEBUG(
          "user::setActiveBookshelfById",
          `Bookshelf with id ${id} not found.`,
          true
        );
        return false;
      }
    };

    return {
      bookshelfs,
      activeBookshelf,
      activeBookshelfId,
      maxResults,
      maxPages,
      isPrefsPanelOpen,

      Bookshelfs,
      ActiveBookshelf,
      ActiveBookshelfId,
      HasActiveBookshelf,
      MaxResults,
      MaxPages,
      PrefsPanelOpen,

      setActiveBookshelf,
      setActiveBookshelfById,
      setMaxResults,
      setMaxPages,
      togglePrefsPanel,
    };
  },
  {
    persist: {
      paths: [
        "bookshelfs",
        "activeBookshelf",
        "activeBookshelfId",
        "maxResults",
        "maxPages",
        "isPrefsPanelOpen",
      ],
      serializer: {
        serialize: (state) => {
          const newState = {
            ...state,
            activeBookshelf: state.activeBookshelf
              ? { ...state.activeBookshelf }
              : null,
          };
          return JSON.stringify(newState);
        },
        deserialize: (str) => {
          const loadedState = JSON.parse(str);
          // set the bookshelfs array to the value returned from mapping the current value of loadedState.bookshelfs
          // to a new array of bookshelf objects created using the Bookshelf constructor.
          // this is necessary because the bookshelfs are stored as plain objects in localStorage,
          loadedState.bookshelfs = loadedState.Bookshelfs.map((bookshelf) => {
            return utility.getBookshelfFrom(bookshelf);
          });

          loadedState.ActiveBookshelf = setActiveBookshelfById(
            loadedState.ActiveBookshelfId
          );
          loadedState.MaxResults = setMaxResults(loadedState.MaxResults);
          loadedState.MaxPages = setMaxPages(loadedState.MaxPages);
          return loadedState;
        },
      },
    },
  }
);

/*
 * this is from when i was manually rebuilding the plain object.
 * the block of code is so huge, if i have to do this even twice
 * its worth making a function just for this purpose
 * 
 * utility.js
 
 
deserialize: (str) => {
          const loadedState = JSON.parse(str);
          // set the bookshelfs array to the value returned from mapping the current value of loadedState.bookshelfs
          // to a new array of bookshelf objects created using the Bookshelf constructor.
          // this is necessary because the bookshelfs are stored as plain objects in localStorage,
          loadedState.bookshelfs = loadedState.bookshelfs.map((bookshelf) => {
            return new Bookshelf(
              bookshelf.name,
              bookshelf.description,
              bookshelf.isDefault,
              bookshelf.id,
              bookshelf.books.map(
                (book) =>
                  new GoogleBook({
                    // every bookshelf contains an array of books, which must be carefully parsed
                    // we can't just map the book object directly because the GoogleBook constructor
                    // expects a specific structure. we need to ensure that the book object is correctly shaped for the GoogleBook constructor.
                    id: book.id,
                    selfLink: book.selfLink,
                    volumeInfo: {
                      title: book.title,
                      authors: book.authors,
                      categories: book.subject,
                      publisher: book.publisher,
                      publishedDate: book.publishedDate,
                      description: book.description,
                      industryIdentifiers: [
                        book.isbn10
                          ? { type: "ISBN_10", identifier: book.isbn10 }
                          : null,
                        book.isbn13
                          ? { type: "ISBN_13", identifier: book.isbn13 }
                          : null,
                      ].filter(Boolean),
                      pageCount: book.pageCount,
                      printedPageCount: book.printedPageCount,
                      averageRating: book.averageRating,
                      ratingCount: book.ratingCount,
                      maturityRating: book.maturityRating,
                      imageLinks: book.imageLinks,
                      language: book.language,
                      infoLink: book.infoLink,
                      canonicalVolumeLink: book.canonicalVolumeLink,
                      saleInfo: book.saleInfo,
                    },
                  })
              )
            );
          });
        },
      },
    },
  }
);

*/
