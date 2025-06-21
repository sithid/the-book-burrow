import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useResponseStore = defineStore('response', () => {
  const lastObjectResponse = ref({});

  return {
    lastObjectResponse,
  };
});