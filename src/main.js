// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
// eslint-disable-next-line import/first
import '@fortawesome/fontawesome-free/css/all.css';
// eslint-disable-next-line import/first
import VueCurrencyInput from 'vue-currency-input';
// eslint-disable-next-line import/first
import Vuelidate from 'vuelidate';


const pluginOptions = {
  /* see config reference */
  globalOptions: { currency: 'EUR' },
};
// eslint-disable-next-line import/extensions
// import '@fortawesome/fontawesome-free/js/all.js';


Vue.config.productionTip = false;
Vue.use(VueCurrencyInput, pluginOptions);
Vue.use(Vuelidate);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
});
