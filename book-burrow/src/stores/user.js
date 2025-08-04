import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { Bookshelf } from "@/Bookshelf.js";
import { config } from "@/config.js";
import { utility } from "@/utility.js";
import { v4 as uuidv4 } from "uuid";

export const useUserStore = defineStore(
  "user",
  () => {
    const bookshelfs = ref(getDefaultBookshelfs()); // requires hosting to work properly.

    const maxResults = ref(40);
    const maxPages = ref(8);
    const defaultLanguage = ref("any");

    const isPrefsPanelOpen = ref(false);

    const togglePrefsPanel = () => {
      isPrefsPanelOpen.value = !isPrefsPanelOpen.value;
    };

    const setMaxResults = (value) => {
      if (value < 10) value = 10;
      if (value > 40) value = 40;

      maxResults.value = value;
    };

    const setMaxPages = (value) => {
      if (value < 1) value = 1;
      if (value > 100) value = 100;

      maxPages.value = value;
    };

    const setDefaultLanguage = (language) => (defaultLanguage.value = language);

    function getDefaultBookshelfs() {
      // Arrow syntax removed. I want this function to be hoisted.
      return [
        new Bookshelf(
          "To Be Read",
          "This bookshelf contains books you plan to read.",
          true,
          uuidv4()
        ),
        new Bookshelf(
          "Already Read",
          "This bookshelf contains books you have already read.",
          true,
          uuidv4()
        ),
        new Bookshelf(
          "Currently Reading",
          "This bookshelf contains books you are currently reading.",
          true,
          uuidv4()
        ),
        new Bookshelf(
          "Wishlist",
          "This bookshelf contains books you want to buy in the future.",
          true,
          uuidv4()
        ),
        new Bookshelf(
          "Already Owned",
          "This bookshelf contains books you own.",
          true,
          uuidv4()
        ),
        new Bookshelf(
          "Favorites",
          "This bookshelf contains your favorite books.",
          true,
          uuidv4()
        ),
      ];
    }

    function getBookshelfByName(name) {
      return bookshelfs.value.find((shelf) => shelf.name === name);
    }

    const addBookToBookshelf = (gBook, bookshelfId) => {
      const bookshelf = bookshelfs.value.find(
        (shelf) => shelf.id === bookshelfId
      );

      if (bookshelf) {
        bookshelf.addBook(gBook);
      }
    };

    const resetBookshelfsToDefault = () => {
      bookshelfs.value = getDefaultBookshelfs();
    };

    const clearAll = () => {
      resetBookshelfsToDefault();
      setMaxResults(40);
      setMaxPages(8);
      setDefaultLanguage("any");
      isPrefsPanelOpen.value = false;
    };

    return {
      bookshelfs,
      maxResults,
      maxPages,
      defaultLanguage,
      isPrefsPanelOpen,

      setMaxResults,
      setMaxPages,
      setDefaultLanguage,
      getDefaultBookshelfs,
      togglePrefsPanel,
      getBookshelfByName,
      addBookToBookshelf,
      resetBookshelfsToDefault,
      clearAll,
    };
  },
  {
    persist: {
      paths: [
        "bookshelfs",
        "maxResults",
        "maxPages",
        "isPrefsPanelOpen",
        "defaultLanguage",
      ],
      serializer: {
        serialize: (state) => {
          const newState = {
            bookshelfs: state.bookshelfs.map((bookshelf) => {
              return utility.getBookshelfForm(bookshelf);
            }),
            maxResults: state.maxResults,
            maxPages: state.maxPages,
            isPrefsPanelOpen: state.isPrefsPanelOpen,
            defaultLanguage: state.defaultLanguage,
          };

          return JSON.stringify(newState);
        },
        deserialize: (str) => {
          const loadedState = JSON.parse(str);

          if (loadedState.bookshelfs === undefined) {
            loadedState.bookshelfs = getDefaultBookshelfs();
          } else {
            loadedState.bookshelfs = loadedState.bookshelfs.map((bookshelf) => {
              return utility.getBookshelfFrom(bookshelf);
            });
          }

          if (loadedState.maxResults === undefined) {
            loadedState.maxResults = 40;
          }

          if (loadedState.maxPages === undefined) {
            loadedState.maxPages = 8;
          }

          if (loadedState.defaultLanguage === undefined) {
            loadedState.defaultLanguage = "any";
          }

          if (loadedState.isPrefsPanelOpen === undefined) {
            loadedState.isPrefsPanelOpen = false;
          }

          return loadedState;
        },
      },
    },
  }
);
