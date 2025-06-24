<template>
  <div class="search">
    <SearchComponent></SearchComponent>
  </div>
</template>

<script setup>
import SearchComponent from "../components/SearchComponent.vue";
</script>

<style scoped>
.search {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin: 0 0;
}
</style>
