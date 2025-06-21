<template>
  <div class="book-card-mini">
    <p id="book-card-title">{{ props.item.volumeInfo.title}}</p>
    <div class="book-card-details">
      <img :src="`${getThumbnail(props.item)}`"/>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  }
});

function getThumbnail(item) {
  return item.volumeInfo.imageLinks.thumbnail;
}
</script>

<style scoped>
.book-card-mini {
  display: flex;
  flex-direction: column;
}

.book-card-mini img {
  width: 25%;
}

#book-card-title {
  font-size: .8rem;
  text-align: left;
  overflow: wrap;
  font-variant: small-caps;
  border-bottom: 1px solid rgba(0, 0, 0, .3);
}

@media (min-width: 768px) {
  .book-card-mini {
    padding-left: 10px;
    padding-right: 10px;
  }

  .book-card-details img {
    width: 25%;
  }
}
</style>
