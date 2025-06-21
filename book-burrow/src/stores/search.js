import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useSearchStore = defineStore('search', () => {
  const items = ref({});

  function getItems() {
    return items.value;
  }

  return {
    items,
    getItems,
  }
});