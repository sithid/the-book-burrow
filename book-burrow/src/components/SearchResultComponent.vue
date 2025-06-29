<template>
  <section class="book-card-mini">
    <p id="book-card-title">{{ props.item.volumeInfo.title }}</p>
    <div class="book-card-details">
      <img :src="`${getThumbnail(props.item)}`" />
      <section class="book-info">
        <p class="info-text">
          <span id="author">
            {{ getAuthors() }}
          </span>
          <span id="publish-year">
            {{ getPublishedDate() }}
          </span>
        </p>
        <article class="info-text">
          <span id="description">
            {{ getDescription() }}
          </span>
        </article>
      </section>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

function getThumbnail(item) {
  if (item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail)
    return item.volumeInfo.imageLinks.thumbnail
  else {
    return './assets/thumbnail-missing.jpg'
  }
}

function getAuthors() {
  if (props.item.volumeInfo.authors) {
    let authors = ''

    for (let key in props.item.volumeInfo.authors) {
      authors += `[${props.item.volumeInfo.authors[key]}] `
    }

    return authors
  } else {
    return 'Unknown Authors'
  }
}

function getDescription() {
  if (props.item.volumeInfo.description) {
    return props.item.volumeInfo.description
  } else {
    return 'No description availabile.'
  }
}

function getPublishedDate() {
  if (!props.item.volumeInfo.publishedDate) return 'Unknown Publish Date'

  const text = props.item.volumeInfo.publishedDate.split('-')

  if (!text) {
    return 'Unknown Publish Date'
  } else if (text.length != 3) {
    return text[0]
  } else {
    const year = text[0]
    const month = getMonth(Number(text[1]))

    const formatted = `${month}, ${year}`
    return formatted
  }
}

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
]

function getMonth(month) {
  let monthString = ''

  if (months[month - 1]) {
    return months[month - 1]
  }
}
</script>

<style scoped>
.book-card-mini {
  display: flex;
  flex-direction: column;
  padding: 10px;
  color: var(black);
  background-color: var(--color-secondary);
}

.book-card-mini img {
  width: 75%;
  align-self: center;
  max-width: 200px;
  max-height: 250px;
}

#book-card-title {
  font-size: 0.8rem;
  text-align: left;
  font-variant: small-caps;
  align-self: center;
}

.book-card-details {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.book-info {
  display: flex;
  flex-direction: column;
  align-items: left;
}

.info-text {
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
  font-size: 0.6rem;
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
    gap: 0;
  }

  #book-card-title {
    font-size: 0.5rem;
    text-align: left;
  }

  #author,
  #publish-year {
    padding-left: 10px;
    font-size: .8rem;
  }

  #description {
    text-align: justify;
    padding-left: 10px;
    font-size: 0.6rem;
  }
}
</style>
