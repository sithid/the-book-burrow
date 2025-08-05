<template>
  <div class="book-list-container">
    <ul id="book-list" v-if="books && books.length > 0">
      <li
        @click="onBookClicked(book)"
        v-for="book in books"
        :key="book.id"
        class="list-item"
      >
        {{ book.fmtTitle() }}
      </li>
    </ul>
    <p v-else id="no-books">No books found in this bookshelf.</p>
  </div>
</template>

<script setup>
import { useBookStore } from "@/stores/book.js";
import { useRouter } from "vue-router";
import { config } from "../config.js";

const bookStore = useBookStore();
const router = useRouter();

const props = defineProps({
  books: {
    type: Array,
    required: true,
  },
});

const onBookClicked = (book) => {
  bookStore.setActiveBook(book);
  config.FMT_PRINT_DEBUG(
    "BookListComponent::onBookClicked",
    `Selected book: ${book.title}`
  );

  router.push("/details");
};
</script>

<style scoped>
.book-list-container {
  display: flex;
  flex-direction: column;
  justify-content: right;
}

.list-item {
  font-size: 0.9rem;
  text-align: left;
  overflow-wrap: break-word;
  color: var(--color-offset);
  font-weight: bold;
}

#no-books {
  text-align: center;
  color: var(--color-offset);
  font-size: 0.9rem;
}

@media (min-width: 768px) {
  .list-item {
    font-size: 1.2rem;
    text-align: left;
  }

  #no-books {
    font-size: 1rem;
  }

  li:hover {
    cursor: pointer;
    color: var(--color-primary);
  }
}
</style>
