<template>
  <div class="bookshelf-panel">
    <div class="bookshelf-content">
      <h1 id="bookshelf-name">{{ props.bookshelf.name }}</h1>
      <BookListComponent :books="props.bookshelf.books"></BookListComponent>
    </div>
  </div>
</template>

<script setup>
import BookListComponent from "./BookListComponent.vue";
import { Bookshelf } from "@/Bookshelf.js";
import { useUserStore } from "@/stores/user.js";

const user = useUserStore();

const props = defineProps({
  bookshelf: {
    type: Bookshelf,
    required: true,
  },
});
</script>

<style scoped>
.bookshelf-panel {
  display: flex;
  background-size: contain;
  flex-direction: column;
  justify-content: center;
  color: var(--color-offset);
  background-image: url("../assets/bookshelf-art.jpg");
  padding: 5px;
}

.bookshelf-content {
  display: flex;
  flex-direction: column;
  background-color: var(--color-secondary-transparent);
  height: 100vh;
}

h1 {
  text-align: center;
  padding-top: 0;
}

@media (min-width: 768px) {
  .bookshelf-panel {
    background-image: url("../assets/bookshelf-art.jpg");
    flex-direction: row;
    margin: 0 auto;
    width: 30vw;
    height: 100%;
  }

  .bookshelf-content {
    width: 25vw;
    height: 100%;
  }
}
</style>
