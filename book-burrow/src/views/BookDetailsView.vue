<template>
  <div class="book-details-view">
    <div class="book-details">
      <BookDetailsComponent v-if="book.activeBook"></BookDetailsComponent>
    </div>
  </div>
</template>

<script setup>
import BookDetailsComponent from "../components/BookDetailsComponent.vue";
import { useBookStore } from "@/stores/book";
import { useRouter } from "vue-router";
import { onBeforeMount } from "vue";

const router = useRouter();
const book = useBookStore();

onBeforeMount(() => {
  if (!book.activeBook) {
    router.push("/search");
  }
});
</script>

<style scoped>
.book-details-view {
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: var(--color-background);
}

.book-details {
  display: flex;
  flex-direction: column;
  text-align: center;
  
  background-color: var(--color-offset);
}
</style>
