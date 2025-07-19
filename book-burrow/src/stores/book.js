import { defineStore } from "pinia";
import { ref, computed } from "vue";

// we could include this in search or filter, to some degree but
// i would prefer to separate concerns to keep things clean and
// easier to maintain.
export const useBookStore = defineStore("book", () => {
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
});
