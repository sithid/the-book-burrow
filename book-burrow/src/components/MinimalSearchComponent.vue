<template>
  <div class="search-component">
    <div class="search-container">
      <input id="search-input" type="text" v-model="search.basicQuery" @keyup.enter="searchBtnOnClick" class="search-input"
        required />
      <button @click="searchBtnOnClick" class="search-button">
        <i class="fa fa-search" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import FilterPanelComponent from "../components/FilterPanelComponent.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

import { useFilterStore } from "@/stores/filter";
import { useSearchStore } from "@/stores/search";

const filter = useFilterStore();
const search = useSearchStore();

const router = useRouter();

async function searchBtnOnClick() {
  if (search.basicQuery != '')
    await search.queryApiBasic(search.basicQuery, 10);
  else
    await search.queryApiBasic("subject:popular", 10)

  router.push("/search");
};
</script>
