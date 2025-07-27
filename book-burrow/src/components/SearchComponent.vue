<template>
  <div class="search-component">
    <div v-if="!filter.isPanelOpen" class="search-container">
      <button @click="toggleFilterPanel" class="filter-button">
        <i class="fa fa-filter" aria-hidden="true"></i>
      </button>
      <button @click="clearClick" class="clear-button">
        <i class="fa fa-cancel" aria-hidden="true"></i>
      </button>
      <input id="search-input" type="text" v-model="search.basicQuery" @keyup.enter="onSearch" class="search-input"
        placeholder="Search Terms Required" />
      <button v-if="!filter.isPanelOpen" @click="onSearch" class="search-button">
        <i class="fa fa-search" aria-hidden="true"></i>
      </button>
    </div>
    <div v-if="filter.isPanelOpen" class="filter-options-panel">
      <FilterPanelComponent></FilterPanelComponent>
    </div>
    <div class="component-container">
      <div class="to-read-container">
        <BookshelfSidePanelComponent :bookshelf="toBeRead"></BookshelfSidePanelComponent>
      </div>
      <div class="result-container">
        <div v-if="search.resultPages.length > 0">
          <div class="paging">
            <button @click="prevPage" :disabled="search.currentPageIndex === 0">
              Previous
            </button>

            <h1 id="page-result-info">
              Displaying page {{ search.currentPageIndex + 1 }} of
              {{ search.resultPages.length }} for
              {{ search.googleBookResults.length }} results.
            </h1>

            <button @click="nextPage" :disabled="
                search.currentPageIndex >= search.resultPages.length - 1
              ">
              Next
            </button>
          </div>
          <div v-for="book in currentResults" v-if="currentResults && currentResults.length > 0">
            <SearchResultComponent :book="book"></SearchResultComponent>
          </div>
          <p id="no-books" v-else>No books found on this page.</p>
        </div>
        <p id="perform-search" v-else>
          Please perform a search to see results.
        </p>
      </div>
      <div class="read-container">
        <BookshelfSidePanelComponent :bookshelf="alreadyRead"></BookshelfSidePanelComponent>
      </div>
    </div>
  </div>
</template>

<script setup>
import SearchResultComponent from "../components/SearchResultComponent.vue";
import FilterPanelComponent from "../components/FilterPanelComponent.vue";
import BookshelfSidePanelComponent from "../components/BookshelfSidePanelComponent.vue";

import { computed } from "vue";

import { useFilterStore } from "@/stores/filter";
import { useSearchStore } from "@/stores/search";
import { useUserStore } from "@/stores/user";

const filter = useFilterStore();
const search = useSearchStore();
const user = useUserStore();

const toBeRead = user.bookshelfs[0];
const alreadyRead = user.bookshelfs[1];

const toggleFilterPanel = () => {
  filter.toggleFilterPanel();

  if (filter.isPanelOpen) {
    if (user.PrefsPanelOpen) {
      user.togglePrefsPanel();
    }
  }
};

const prevPage = () => {
  if (search.currentPageIndex > 0) {
    search.currentPageIndex--;
  }
};

const nextPage = () => {
  if (search.currentPageIndex < search.resultPages.length - 1) {
    search.currentPageIndex++;
  }
};

const currentResults = computed(() => {
  if (
    search.resultPages.length > 0 &&
    search.currentPageIndex < search.resultPages.length
  ) {
    return search.resultPages[search.currentPageIndex].results;
  }
  return null;
});

async function onSearch() {
  if (!filter.isPanelOpen && search.basicQuery.length > 0) {
    await search.queryApiBasic(search.basicQuery);
  }
}

function clearClick() {
  search.clear();
}
</script>

<style scoped>
.component-container {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 5px;
}

.results-container {
  display: flex;
  flex-direction: row;
}

.paging {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 0px 10px 10px 10px;
  height: 50px;
  background-color: var(--color-secondary);
}

.result-cards {
  display: flex;
  flex-direction: column;
}

.to-read-container,
.read-container {
  display: none;
}

.to-read-container h1,
.to-read-container p,
.read-container h1,
.read-container p {
  padding: 10px;
  margin: 10px;
  border: 1px solid var(--color-offset);
  background-color: #fff;
}

.filter-options-panel {
  display: flex;
  flex-direction: row;
  position: relative;
  background-color: var(--color-secondary);
}

#page-result-info {
  margin: 5px;
}

#no-books,
#perform-search {
  color: var(--color-text);
  background-color: var(--secondary);
}
@media (min-width: 1024px) {
  .component-container {
    display: flex;
    flex-direction: row;
  }

  .result-container {
    width: 50%;
  }

  .to-read-container,
  .read-container {
    display: flex;
    flex-direction: column;
    width: 25%;
  }

  .filter-options-panel {
    display: flex;
    flex-direction: row;
    position: relative;
    background-color: var(--color-secondary);
  }

  #page-result-info {
    margin: 10px;
  }
}
</style>
