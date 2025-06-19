<template>
  <div class="header">
    <h1>The Book Burrow</h1>
    <nav class="nav-menu">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">Bookshelf</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </div>
  <RouterView />
</template>

<script setup>
  import { RouterLink, RouterView } from 'vue-router';
</script>

<style scoped>
  .header {
    display: flex;
    flex-direction: column;
    text-align: center;
    margin: 0 0;
    width: 100%;
    background-color: lightblue;
    border-bottom: 2px solid black;
  }

  .nav-menu {
    display: flex;
    flex-direction: row;
    gap: 10px;
    text-align: center;
    justify-content: center;
    margin-bottom: 20px;
  }
</style>