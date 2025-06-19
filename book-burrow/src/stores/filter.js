import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useFilterStore = defineStore('filter', () => {
  const filterPanelOpen = ref(false);

  const isPanelOpen = computed(() => {
    return filterPanelOpen.value;
  });

  const toggleFilterPanel = computed(() => {
    filterPanelOpen.value = !filterPanelOpen.value;
    console.log( "filterPanelActive toggled: " + filterPanelOpen.value );
  });

  return {
    isPanelOpen,
    toggleFilterPanel,
  };
});