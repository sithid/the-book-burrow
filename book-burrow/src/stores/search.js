import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useSearchStore = defineStore('search', () => {
  const items = ref({});
  
  const basicQuery = ref('recommended');
  const advancedQuery = ref('recommended');

  const title = ref('');
  const author = ref('');
  const publisher = ref('');
  const published = ref('');
  const genre = ref('');


  return {
    items,
    basicQuery,
    advancedQuery,
    title,
    author,
    publisher,
    published,
    genre
  }
});