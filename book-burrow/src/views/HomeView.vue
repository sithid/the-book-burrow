<template>
  <div class="home">
    <div class="mini-search-component">
      <MinimalSearchComponent></MinimalSearchComponent>
    </div>
    <div id="nyt-lists-mobile">
      <h1>New York Times - Best Sellers</h1>
      <div v-if="nyt.nytBooklists.length > 0">
        <div v-for="list in nyt.nytBooklists" class="nyt-list-item">
          <NYTListMobileComponent :bookList="list"> </NYTListMobileComponent>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MinimalSearchComponent from "../components/MinimalSearchComponent.vue";
import NYTListMobileComponent from "../components/NYTListMobileComponent.vue";

import { onMounted } from "vue";
import { config } from "@/config.js";
import { utility } from "@/utility.js";  

import { useNytStore } from "@/stores/nyt.js";

const nyt = useNytStore();

onMounted(async () => {
  if (nyt.nytBooklists.length === 0) {
    await nyt.fetchNytBooklists();
  } else {
    if (nyt.lastFetched) {
      const lastFetched = nyt.lastFetched;
      const now = new Date();
      const timeDiff = now - lastFetched;

      if (timeDiff > 24 * 60 * 60 * 1000) {
        nyt.fetchNytBooklists();
      } else {
        config.FMT_PRINT_DEBUG(
          "NYT Store",
          `NYT book lists fetched recently at ${lastFetched.toLocaleString()}`
        );
      }
    } else {
      await nyt.fetchNytBooklists();
    }
  }
});
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.mini-search-component {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin: 0 0;
}

.nyt-list-item {
  margin: 0;
  padding: 0;
}

#nyt-lists-mobile {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#nyt-lists-mobile h1 {
  font-size: 1.5rem;
}

@media (min-width: 768px) {
  #nyt-lists-mobile {

  }
}
</style>
