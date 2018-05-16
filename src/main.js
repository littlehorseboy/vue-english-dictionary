// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VeeValidate from 'vee-validate';
import VeeValidatezhTW from 'vee-validate/dist/locale/zh_TW';
import 'bootstrap/scss/bootstrap.scss';
import 'open-iconic/font/css/open-iconic-bootstrap.scss';
import 'bootstrap';
import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(VeeValidate, {
  locale: 'zh_TW',
  dictionary: {
    zh_TW: VeeValidatezhTW,
  },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
