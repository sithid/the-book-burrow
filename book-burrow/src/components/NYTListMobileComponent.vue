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
  
  await search.loadNYTResults(props.bookList);
};
</script>

<style scoped>
.nyt-list-component {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-secondary);
  border: 10px solid var(--color-offset);
  border-radius: 10px;
}

@media (min-width: 768px) {
}
</style>
