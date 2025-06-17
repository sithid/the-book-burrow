<template>
  <div class="header">
    <h1>Welcome</h1>
    <nav class="nav-menu">
      <RouterLink to="/">Home</RouterLink>
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
    margin: 0 10px;
    width: 100%;
  }

  .nav-menu {
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: center;
  }
</style>