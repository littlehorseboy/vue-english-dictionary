<template>
  <div>
    {{ words }}
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'InsertEnglish',
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters({
      words: 'getWords',
    }),
  },
  methods: {
    createWord() {
      this.$store.dispatch('createWord', this.word);
    },
  },
};
</script>

<style scoped>
</style>
