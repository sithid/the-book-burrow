<template>
  <div class="user-preferences-panel">
    <div class="header">
      <h1>User Preferences & Data</h1>
    </div>
    <div class="pref-option">
      <label for="max-results" id="max-results-label">Results Per Page</label>
      <input
        id="max-results"
        type="number"
        min="10"
        max="40"
        v-model="maxResults"
      />
    </div>
    <div class="pref-option">
      <label for="max-pages" id="max-pages-label">Pages</label>
      <input
        id="max-pages"
        type="number"
        min="1"
        max="100"
        v-model="maxPages"
      />
    </div>
    <button type="button" @click="applyClick" aria-label="Apply Changes">
      Apply Changes
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user.js";

const user = useUserStore();
const maxPages = ref(user.maxPages);
const maxResults = ref(user.maxResults);

const applyClick = () => {
  user.setMaxPages(maxPages.value);
  user.setMaxResults(maxResults.value);

  maxPages.value = user.maxPages;
  maxResults.value = user.maxResults;
};

</script>

<style scoped>
.user-preferences-panel {
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 10px;

  color: var(--color-offset);
  background-color: var(--color-secondary);
}

.pref-option {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#max-results-label,
#max-pages-label {
  font-size: 0.8rem;
}

#max-results,
#max-pages {
  width: 10%;
  field-sizing: fixed;
  text-align: center;
}

@media (min-width: 768px) {
}
</style>
