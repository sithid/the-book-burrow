<template>
  <div class="book-details">
    <BookDetailsComponent v-if="book.HasActiveBook"></BookDetailsComponent>
  </div>
</template>

<script setup>
import BookDetailsComponent from "../components/BookDetailsComponent.vue";
import { useBookStore } from "@/stores/book";
import { useRouter } from "vue-router";
import { onMounted } from "vue";

const router = useRouter();
const book = useBookStore();


onMounted(() => {
  if (!book.ActiveBook) {
    router.push("/search");
  }
});

</script>

<style scoped>
.book-details {
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: var(--color-offset);
}
</style>
