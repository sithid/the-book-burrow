import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useScreenStore = defineStore('screen', () => {
  const viewportWidth = ref(0);
  const viewportHeight = ref(0);

  const isLargeScreenOrTablet = computed(() => {
    return viewportWidth.value >= 768;
  });

  const isLargeScreen = computed(() => {
    return viewportWidth.value >= 1024;
  });

  const isTablet = computed(() => {
    return viewportWidth.value >= 768 && viewportWidth.value < 1024;
  });

  const isMobile = computed(() => {
    return viewportWidth.value < 768;
  });

  const updateScreenDimensions = () => {
    viewportWidth.value = window.innerWidth;
    viewportHeight.value = window.innerHeight;
  };

  return {
    viewportWidth,
    viewportHeight,
    isLargeScreenOrTablet,
    isLargeScreen,
    isTablet,
    isMobile,
    updateScreenDimensions,
  };
});

/*

Ways to use the stores:

import { onMounted, onBeforeUnmount } from 'vue';
import { useScreenStore } from '@/stores/screen';

const screenStore = useScreenStore();

onMounted(() => {
  screenStore.updateScreenDimensions(); 
  window.addEventListener('resize', screenStore.updateScreenDimensions);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', screenStore.updateScreenDimensions);
});
*/