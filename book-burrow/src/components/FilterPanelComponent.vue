<template>
  <div v-if="filter.isPanelOpen" class="filter-options-panel">
    <ul class="pref-list">
      <li>
        <input id="dark-mode" type="checkbox" name="darkmode" />
        <label for="dark-mode" name="dark-mode">Dark Mode</label>
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
  top: 0px;
  left: 10px;
  width: 95%;
  height: 100vh;
  background-color: var(--color-secondary);
  border: 1px solid black;
  z-index: 10;
}

.pref-list {
  display: flex;
  justify-content: left;
  list-style-type: none;
  text-align: left;
  color: black;
}

@media (min-width: 768px) {
  .filter-options-panel {
    left: 11px;
    width: 98%;
    height: 50vh;
  }
}
</style>