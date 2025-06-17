<template>
  <div class="counter-container">
    <h1>Count: {{ counterStore.count }}</h1>
    <button @click="counterStore.increment()">Increment</button>
  </div>
</template>

<script setup>
  import { useCounterStore } from '../stores/counter.js';
  const counterStore = useCounterStore();
</script>

<style scoped>
  .counter-container {
    justify-content: center;
    text-align: center;
  }

  .counter-container button {
    max-width: 100px;
    max-height: 50px;
  }
</style>