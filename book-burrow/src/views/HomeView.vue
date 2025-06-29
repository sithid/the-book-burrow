<template>
  <div class="home">
    <MinimalSearchComponent></MinimalSearchComponent>
  </div>
</template>

<script setup>
import MinimalSearchComponent from "../components/MinimalSearchComponent.vue";
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin: 0 0;
  color: black;
  background-color: var(--color-offset);
}
</style>
