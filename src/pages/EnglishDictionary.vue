<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link :to="{ name: 'Index'}" class="navbar-brand">首頁</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse"
        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
        aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link :to="{ name: 'SelectEnglish'}" class="nav-link">單字清單</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'InsertEnglish'}" class="nav-link">新增單字</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
        </ul>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'EnglishDictionary',
  data() {
    return {
    };
  },
};
</script>

<style scoped>
  .router-link-active:not(.navbar-brand) {
    color: green !important;
  }
</style>
