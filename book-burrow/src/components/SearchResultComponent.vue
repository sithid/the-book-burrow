<template>
  <div class="book-card-mini">
    <p id="book-card-title">{{ props.item.volumeInfo.title}}</p>
    <div class="book-card-details">
      <img :src="`${getThumbnail(props.item)}`"/>
      <section class="book-info">
        <p class="info-text">
          <span id="author">
            {{ props.item.volumeInfo.authors[0] }}
          </span>
          <span id="publish-year">
            {{ formatDate() }}
          </span>
        </p>
        <article class="info-text">
          <span id="description">
            {{ props.item.volumeInfo.description }}
          </span>
        </article>
      </section>
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

function formatDate() {
  return parseDate(props.item.volumeInfo.publishedDate);
}

function parseDate( date ) {
  const text = date.split('-');

  const year = text[0];
  const month = getMonth(Number(text[1]));
  
  const formatted = `${month} ${year}`;

  console.log(formatDate);
  return formatted;
}

function getMonth( month ) {
  let monthString = '';

  const months = [
    'January',
    'Febuary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  return months[month-1];
}

</script>

<style scoped>
.book-card-mini {
  display: flex;
  flex-direction: column;
  border: 2px solid black;
  padding: 10px;
}

.book-card-mini img {
  width: 75%;
  align-self: center;
}

#book-card-title {
  font-size: .8rem;
  text-align: left;
  overflow: wrap;
  font-variant: small-caps;
  border-bottom: 1px solid rgba(0, 0, 0, .3);
  align-self: center;
}

.book-card-details {
  display: flex;
  flex-direction: column;
}

.book-info {
  display: flex;
  flex-direction: column;
  align-items: left;
}

.info-text {
  font-size: .5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 0;
}

#author,
#publish-year {
  padding-left: 10px;
  font-size: 0.8rem;
  font-weight: bold;
}

#description {
  padding-left: 10px;
  padding-right: 10px;
  font-size: 0.8rem;
  text-align: justify;
}

@media (min-width: 768px) {
  .book-card-mini {
    padding-left: 10px;
    padding-right: 10px;
  }

  .book-card-details {
    display: flex;
    flex-direction: row;
  }

  .book-card-details img {
    width: 25%;
  }
}


@media (min-width: 1024px) {
  #author,
  #publish-year {
    padding-left: 10px;
    font-size: 0.4rem;
  }

  #description {
    text-align: justify;
    padding-left: 10px;
    font-size: 0.3rem;
  }
}
</style>
