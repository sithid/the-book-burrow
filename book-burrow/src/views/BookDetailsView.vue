<template>
  <div class="book-details">
    <BookDetailsComponent v-if="book.activeBook"></BookDetailsComponent>
  </div>
  <div class="paged-bookshelf-container">
    <PagedBookshelfComponent :bookshelf="user.bookshelfs[0]"></PagedBookshelfComponent>
  </div>
</template>

<script setup>
import BookDetailsComponent from "../components/BookDetailsComponent.vue";
import { useBookStore } from "@/stores/book";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import PagedBookshelfComponent from "@/components/SingleBookshelfComponent.vue";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const book = useBookStore();
const user = useUserStore();

onMounted(() => {
  if (!book.activeBook) {
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

.paged-bookshelf-container{

}
</style>
