<template>
  <div class="about">
    <p>
      This website is a non-commercial student project created for educational
      purposes by <a href="http://sithid.github.io" target="_blank">James Glosser</a>.
    </p>
    <p>
      All literary works are works of their respective authors. Book information
      is provided by the <a href="https://developers.google.com/books" target="_blank">Google Books API</a>.
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
}

.about p a {
  font-size: 0.8rem;
  text-decoration: none;
  color: var(--color-secondary);
}

.about p a:hover {
  font-weight: bolder;
  color: var(--color-primary);
}
</style>
