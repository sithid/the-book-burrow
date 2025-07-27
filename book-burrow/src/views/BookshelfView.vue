<template>
  <div class="bookshelfs">
    <div v-for="shelf of user.bookshelfs" class="single-shelf">
      <h1>{{ shelf.name }}</h1>
      <p>{{ shelf.description }}</p>
      <div v-for="book in shelf.books" class="single-book">
        <p>{{ book.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import { useSearchStore } from "@/stores/search";

const search = useSearchStore();
const user = useUserStore();
</script>

<style>
.bookshelfs {
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: space-between;
  min-width: 100%;
  min-height: 100%;
  background-color: var(--color-offset);
}

.single-shelf {
  display: flex;
  flex-direction: column;
  background-color: var(--color-secondary);
  border: 1px solid var(--color-offset);
}

.single-book {
}
</style>
