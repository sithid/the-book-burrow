<template>
  <div class="user-preferences-panel">
    <!--- Theres not much to display right now... --->
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
        v-model=maxResults
      />
    </div>
    <div class="pref-option">
      <label for="max-pages" id="max-pages-label">Pages</label>
      <input id="max-pages" type="number" min="1" max="10" v-model=maxPages />
    </div>
    <button type="button" @click="applyClick" aria-label="Apply Changes">
      Apply Changes
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/user.js";

const user = useUserStore();

const maxPages = ref(user.maxPages);
const maxResults = ref(user.maxResults);

const applyClick = () => {
  // we could do everything we need from here
  // but i prefer to use the logic predefined
  // in the store for consistency, these values
  // will always be set the same way.
  user.setMaxPages(maxPages.value);
  user.setMaxResults(maxResults.value);

  // because we used the stores setters we know
  // the values will have been clamped to our
  // min and max so we need to update what is displayed
  // to match the store.  the user will be able to see
  // the value change if its outside our range.
  maxPages.value = user.MaxPages;
  maxResults.value = user.MaxResults;
}
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
