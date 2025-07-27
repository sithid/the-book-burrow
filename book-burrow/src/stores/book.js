import { defineStore } from "pinia";
import { ref } from "vue";
import { utility } from "@/utility.js";

export const useBookStore = defineStore(
  "book",
  () => {
    const activeBook = ref(null);

    const setActiveBook = (book) => {
      activeBook.value = book;
    };

    const clearActiveBook = () => {
      activeBook.value = null;
    };

    return {
      activeBook,
      setActiveBook,
      clearActiveBook,
    };
  },
  {
    persist: {
      paths: ["activeBook"],
      serializer: {
        serialize: (state) => {
          const newState = {
            activeBook: state.activeBook,
          };

          return JSON.stringify(newState);
        },
        deserialize: (str) => {
          const loadedState = JSON.parse(str);

          if (loadedState.activeBook) {
            loadedState.activeBook = utility.getGBookFrom(loadedState.activeBook);
          }

          return loadedState;
        },
      },
    },
  }
);
