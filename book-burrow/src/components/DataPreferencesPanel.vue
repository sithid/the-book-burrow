<template>
  <div class="user-preferences-panel">
    <div class="header">
      <h1 id="user-preferences-header">User Preferences & Data</h1>
    </div>
    <div class="pref-option">
      <label for="language-select" id="language-label">Default Language for Results</label>
      <select id="language-select" v-model="defaultLanguage">
        <option value="any">Any</option>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="it">Italian</option>
        <option value="ja">Japanese</option>
        <option value="ko">Korean</option>
        <option value="zh">Chinese(Simplified)</option>
        <option value="zh-Hant">Chinese(Traditional)</option>
        <option value="pt">Portuguese</option>
        <option value="ru">Russian</option>
        <option value="ar">Arabic</option>
        <option value="nl">Dutch</option>
        <option value="hi">Hindi</option>
        <option value="ur">Urdu</option>
        <option value="id">Indonesian</option>
        <option value="th">Thai</option>
        <option value="tr">Turkish</option>
        <option value="vi">Vietnamese</option>
      </select>
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
      <input id="max-pages" type="number" min="1" max="10" v-model="maxPages" />
    </div>
    <hr />
    <div class="pref-option">
      <label for="minimize-usage-checkbox" id="minimize-usage-label"
        >Minimize Google API Usage - Use NYT Data</label
      >
      <input id="minimize-usage-checkbox" type="checkbox" />
    </div>
    <hr />
    <div class="pref-option">
      <label for="clear-data-checkbox" id="clear-data-label"
        >Clear All Data</label
      >
      <input id="clear-data-checkbox" type="checkbox" />
    </div>
    <hr />
    <button type="button" @click="applyClick" aria-label="Apply Changes">
      Apply Changes
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { utility } from "@/utility.js";
import { useUserStore } from "@/stores/user.js";
import { useSearchStore } from "@/stores/search.js";
import { useRouter } from "vue-router";

const user = useUserStore();
const search = useSearchStore();
const maxPages = ref(user.maxPages);
const maxResults = ref(user.maxResults);
const defaultLanguage = ref(user.defaultLanguage);
const minizeApiUsage = ref(search.minimizeApiRequests);
const router = useRouter();

const applyClick = () => {
  user.setMaxPages(maxPages.value);
  user.setMaxResults(maxResults.value);
  user.setDefaultLanguage(defaultLanguage.value);

  const clearDataChecked = document.getElementById(
    "clear-data-checkbox"
  ).checked;

  if (clearDataChecked) {
    utility.clearAllData();
  }

  const minizeApiUsage = document.getElementById(
    "minimize-usage-checkbox"
  ).checked;

  if (minizeApiUsage) {
    search.minimizeApiRequests = true;
  } else {
    search.minimizeApiRequests = false;
  }
  user.togglePrefsPanel();
  router.go(0);
};

onMounted(() => {
  document.getElementById("minimize-usage-checkbox").checked =
    minizeApiUsage.value;
});
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

#user-preferences-header {
  text-align: center;
}

#max-results-label,
#max-pages-label {
  font-size: 0.7rem;
}

#max-results,
#max-pages {
  width: 45px;
  text-align: right;
}

#language-select,
#language-label {
  font-size: 0.7rem;
}

#minimize-usage-label,
#clear-data-label {
  font-size: 0.7rem;
}

hr {
  border: none;
  border-top: 2px solid var(--color-offset);
  width: 100%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .user-preferences-panel {
    margin: 10px auto;
    border: 10px solid var(--color-offset);
    border-top: 0;
    border-bottom: 0;
    border-radius: 10px;
  }

  #max-results-label,
  #max-pages-label {
    font-size: 0.9rem;
  }

  #max-results,
  #max-pages {
    font-size: 0.9rem;
    width: 70px;
  }

  #language-select,
  #language-label {
    font-size: 0.9rem;
  }
}
</style>
