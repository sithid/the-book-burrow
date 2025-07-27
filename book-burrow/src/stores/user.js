import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { Bookshelf } from "@/Bookshelf.js";
import { config } from "@/config.js";
import { utility } from "@/utility.js";
import { v4 as uuidv4 } from "uuid";

export const useUserStore = defineStore(
  "user",
  () => {
    const bookshelfs = ref([
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
          
          if (loadedState.bookshelfs) {
            loadedState.bookshelfs = loadedState.bookshelfs.map((bookshelf) => {
              return utility.getBookshelfFrom(bookshelf);
            });
          }
          
          // Recreate active bookshelf if it exists
          if (loadedState.activeBookshelf) {
            loadedState.activeBookshelf = utility.getBookshelfFrom(loadedState.activeBookshelf);
          }
          
          return loadedState;
        },
      },
    },
  }
);
