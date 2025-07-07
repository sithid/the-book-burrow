<template>
  <div class="search-component">
    <div class="search-container">
      <input
        id="search-input-mini"
        type="text"
        v-model="search.basicQuery"
        @keyup.enter="searchBtnOnClick"
        class="search-input"
        placeholder="Search Terms Required"
      />
      <button @click="searchBtnOnClick" class="search-button">
        <i class="fa fa-search" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

import { useSearchStore } from "@/stores/search";

const search = useSearchStore();

const router = useRouter();

async function searchBtnOnClick() {
  if (search.basicQuery.length > 0) {
    await search.queryApiBasic(search.basicQuery, 10);
    router.push("/search");
  }
}
</script>
