import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePrefsStore = defineStore('prefs', () => {
  const darkMode = ref(false);

  return {
    darkMode
  }
});