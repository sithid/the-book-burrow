<template>
  <div class="user-preferences-panel">
    <div class="header">
      <h1 id="user-preferences-header">User Preferences & Data</h1>
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
    <div class="pref-option">
      <label for="language-select" id="language-label">Language</label>
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
const defaultLanguage = ref(user.defaultLanguage);

const applyClick = () => {
  user.setMaxPages(maxPages.value);
  user.setMaxResults(maxResults.value);
  user.setDefaultLanguage(defaultLanguage.value);
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
