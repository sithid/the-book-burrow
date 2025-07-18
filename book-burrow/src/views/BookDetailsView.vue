<template>
  <div class="book-details-view">
    <h1>Book Details View</h1>
    <BookDetailsComponent v-if="book.hasActiveBook" :book="book.getActiveBook"></BookDetailsComponent>
  </div>
</template>

<script setup>
import BookDetailsComponent from "../components/BookDetailsComponent.vue";
import { useBookStore } from "@/stores/book";

const book = useBookStore();

</script>
<style>
.book-details-view {
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: var(--color-offset);
}
</style>
