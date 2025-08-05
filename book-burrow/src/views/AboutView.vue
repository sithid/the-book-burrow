<template>
  <div class="about">
    <p>
      This website is a non-commercial student project created for educational
      purposes by
      <a href="http://sithid.github.io" target="_blank">James Glosser</a>.
    </p>
    <p>All literary works are works of their respective authors.</p>
    <p>
      Best seller lists are provided by the
      <a href="https://developer.nytimes.com/docs/books-product/1/" target="_blank">New York Times Books
        API</a>.
    </p>
    <p>
      Not all books listed on the best seller lists are available on Google Books.
    </p>
    <p>
      Detailed book information is provided by the
      <a href="https://developers.google.com/books" target="_blank">Google Books API</a>.
    </p>
    <p>
      This website is not affiliated with Google or the New York Times.
    </p>
  </div>
</template>

<style>
.about {
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: var(--color-secondary);
}

.about p {
  font-size: 0.8rem;
  margin: 0 20px;
}

.about p a {
  font-size: 0.8rem;
  text-decoration: none;
  color: var(--color-offset);
}

.about p a:hover {
  font-weight: bolder;
  color: var(--color-primary);
}
</style>
