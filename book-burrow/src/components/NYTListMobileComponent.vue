<template>
  <div class="nyt-list-component">
    <p @click="onListClick">{{ props.bookList.display_name }}</p>
  </div>
</template>

<script setup>
import { useSearchStore } from "@/stores/search.js";
import { useRouter } from "vue-router";
import { useNytStore } from "@/stores/nyt";

const nytStore = useNytStore();
const search = useSearchStore();
const router = useRouter();

const props = defineProps({
  bookList: {
    type: Object,
    required: true,
  },
});

const onListClick = async () => {
  nytStore.activeNytList = props.bookList;
  router.push("/search");
  await search.loadNYTResults(nytStore.activeNytList);
};
</script>

<style scoped>
.nyt-list-component {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10px 0 10px;
  background-color: var(--color-primary);
  border: 10px solid var(--color-offset);
  border-radius: 10px;
}
.nyt-list-component:hover {
  background-color: var(--color-secondary);
}
</style>
