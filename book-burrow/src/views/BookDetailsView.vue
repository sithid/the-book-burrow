<template>
  <div class="book-details-view">
    <BookDetailsComponent v-if="book.hasActiveBook"></BookDetailsComponent>
  </div>
</template>

<script setup>
import BookDetailsComponent from "../components/BookDetailsComponent.vue";
import { useBookStore } from "@/stores/book";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { config } from "../config.js";

const router = useRouter();
const book = useBookStore();


onMounted(() => {
  if (!book.activeBook) {
    router.push("/search");
  }
});

</script>
<style>
.book-details-view {
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: var(--color-offset);
}
</style>
