import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSearchStore = defineStore('search', () => {
  const items = ref({});
  const keywords = ref('top 10');

  return {
    items,
    keywords,
  }
});