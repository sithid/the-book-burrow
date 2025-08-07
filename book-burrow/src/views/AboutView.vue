<template>
  <div class="about">
    <div id="how-to-use">
      <h2>How to Use This Website</h2>
      <p id="how-to-use-text">
        Welcome to the Book Burrow! This website allows you to search for books
        using various filters and view detailed information about them. You can
        also check the New York Times best seller lists. To get started, use the
        search bar at the top of the page to enter keywords related to the book
        you are looking for, such as the title, author, or subject. You can
        filter by title, author, publisher, subject and more using the advanced
        search options available in the filter panel. You can also search for
        books by ISBN, which is a unique identifier for books. To do this, enter
        the ISBN number in the ISBN field and click the search button. If you
        want to clear all filters and any search results showing, click the
        "Clear" button. Clicking the "Cancel" button closes the filter panel and
        clears the filters. Clicking the "Close" button will close the filter
        panel without clearing the filters or search results. Click on a book
        title to view more details, including a summary, reviews, and links to
        purchase on either
        <a href="https://www.amazon.com" target="_blank">Amazon</a> or
        <a href="https://www.google.com/books" target="_blank">Google Books</a>.
        
      </p>
    </div>
    <div id="misc-disclaimers">
      <h2>Miscellaneous Disclaimers</h2>
      <p id="misc-disclaimers-text">
        This website is a non-commercial student project created for educational
        purposes by
        <a href="http://sithid.github.io" target="_blank">James Glosser</a>. All
        literary works are works of their respective authors. Best seller lists
        are provided by the
        <a
          href="https://developer.nytimes.com/docs/books-product/1/"
          target="_blank"
          >New York Times Books API</a
        >. Not all books listed on the best seller lists are available on Google
        Books. Detailed book information is provided by the
        <a href="https://developers.google.com/books" target="_blank"
          >Google Books API</a
        >. This website is not affiliated with Google or the New York Times.
      </p>
    </div>
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

hr {
  border: none;
  border-top: 2px solid var(--color-offset);
  width: 100%;
  margin: 20px auto;
}

#misc-disclaimers-text,
#how-to-use-text {
  text-align: justify;
  margin: 30px 30px;
  text-wrap: wrap;
}
</style>
