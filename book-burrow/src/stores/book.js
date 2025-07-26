import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { utility } from "@/utility.js";

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
    const ActiveBook = computed(() => activeBook.value);
    const HasActiveBook = computed(() => activeBook.value !== null);

    const setActiveBook = (book) => {
      activeBook.value = book;
    };

    const clearActiveBook = () => {
      activeBook.value = null;
    };

    return {
      activeBook,
      ActiveBook,
      HasActiveBook,
      setActiveBook,
      clearActiveBook,
    };
  },
  {
    // state persistence, automatically saves and loads state to/from localStorage
    // this will persist the activeBook data across page reloads/refreshes.
    persist: {
      paths: ['activeBook'],
      // activeBook is the only property we worth persisting
      // the other 2 properties are computed from activeBook
      // as long as we can reload the active book, we can compute the values.
      serializer: {
        // this is were we serialize the book store.
        // we need to stringify the book object, so we can store it in localStorage.
        serialize: (state) => {
          const newState = {
            ...state,
            activeBook: state.activeBook ? { ...state.activeBook } : null,
          };
          return JSON.stringify(newState);
        },
        deserialize: (str) => {
          const loadedState = JSON.parse(str);

          // we previously had to stringify the book store, so we need to parse it back.
          const loadedActiveBook = loadedState.activeBook
            ? utility.getGBookFrom(loadedState.activeBook)
            : null;

          return {
            activeBook: loadedActiveBook,
          };
        },
      },
    },
  }
);
