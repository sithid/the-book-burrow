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
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: var(--color-offset);
}
</style>
