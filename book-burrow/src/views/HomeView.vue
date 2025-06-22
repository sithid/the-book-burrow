<script setup>
import SearchComponent from "../components/SearchComponent.vue";
</script>

<template>
  <div class="home">
    <h1>Welcome!</h1>
    <SearchComponent />
  </div>
</template>

<style>
@media (min-width: 768) {
  .home {
    min-height: 100vh;
    display: flex;
    justify-content: center;
  }
}
</style>
