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
    const maxPages = ref(8);
    const defaultLanguage = ref("any");

    const isPrefsPanelOpen = ref(false);

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
      if (value > 100) value = 100;

      maxPages.value = value;
    };

    const setDefaultLanguage = (language) => defaultLanguage.value = language;

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
      defaultLanguage,
      isPrefsPanelOpen,
      PrefsPanelOpen,

      setActiveBookshelf,
      setActiveBookshelfById,
      setMaxResults,
      setMaxPages,
      setDefaultLanguage,
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
        "defaultLanguage",
      ],
      serializer: {
        serialize: (state) => {
          const newState = {
            bookshelfs: state.bookshelfs.map((bookshelf) => {
              return utility.getBookshelfForm(bookshelf);
            }),
            activeBookshelf: state.activeBookshelf
              ? utility.getBookshelfForm(state.activeBookshelf)
              : null,
            activeBookshelfId: state.activeBookshelfId,
            maxResults: state.maxResults,
            maxPages: state.maxPages,
            isPrefsPanelOpen: state.isPrefsPanelOpen,
            defaultLanguage: state.defaultLanguage,
          };

          return JSON.stringify(newState);
        },
        deserialize: (str) => {
          const loadedState = JSON.parse(str);
          loadedState.bookshelfs = loadedState.Bookshelfs.map((bookshelf) => {
            return utility.getBookshelfFrom(bookshelf);
          });

          setActiveBookshelfById(loadedState.activeBookshelfId);
          setMaxResults(loadedState.maxResults);
          setMaxPages(loadedState.maxPages);
          setDefaultLanguage(loadedState.defaultLanguage);
          return loadedState;
        },
      },
    },
  }
);
