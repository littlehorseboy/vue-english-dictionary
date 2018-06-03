<template>
  <div class="container">
    <router-link :to="{ name: 'SelectEnglish'}">自建字庫</router-link>
  </div>
</template>

<script>
export default {
  name: 'EnglishDictionary',
  data() {
    return {
    };
  },
  created() {
    this.$store.dispatch('getWords');
  },
};
</script>

<style scoped>
</style>
