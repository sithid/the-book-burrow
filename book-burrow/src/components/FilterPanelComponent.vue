<template>
  <div v-if="filter.isPanelOpen" class="filter-options-panel">
    <p>
      testing all this stuff to see what works and what doesnt this is just temp
      text bleh bleh bleh
    </p>
  </div>
</template>

<script setup>
import { useFilterStore } from "@/stores/filter";

const filter = useFilterStore();

</script>

<style scoped>
.filter-options-panel {
  box-sizing: border-box;
  position: relative;
  top: 0px;
  left: 10px;
  width: 95%;
  height: 100vh;
  background-color: white;
  border: 1px solid black;
  z-index: 10;
}

@media (min-width: 768px) {
  .filter-options-panel {
    left: 11px;
    width: 98%;
    height: 50vh;
  }
}
</style>