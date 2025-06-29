<template>
  <div v-if="filter.isPanelOpen" class="filter-options-panel">
    <p>Advanced Search Filter</p>
    <ul class="filter-list">
      <li>
        <input id="genre" type="checkbox" name="genre" />
        <label for="genre" name="genre">By Genre</label>
      </li>
    </ul>
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
  width: 100%;
  justify-content: center;
  background-color: var(--color-secondary);
  z-index: 10;
}

.filter-list {
  display: flex;
  flex-direction: row;
  justify-content: left;
  list-style-type: none;
  text-align: left;
  color: black;
}
</style>