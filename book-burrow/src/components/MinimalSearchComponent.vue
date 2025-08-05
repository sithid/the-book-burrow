<template>
  <div class="search-component">
    <div class="search-container">
      <button @click="clearClick" class="clear-button">
        <i class="fa fa-cancel" aria-hidden="true"></i>
      </button>
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
import { useUserStore } from "@/stores/user";

const search = useSearchStore();
const user = useUserStore();
const router = useRouter();

function clearClick() {
  search.basicQuery = "";
  search.clearAll();
}

async function searchBtnOnClick() {
  if (search.basicQuery.length > 0) {
    router.push("/search");
    await search.queryApiBasic(search.basicQuery);
  }
}
</script>
