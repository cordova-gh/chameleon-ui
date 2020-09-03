import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showSpinner: false,
  },
  mutations: {
    showSpinner(state) {
      state.showSpinner = true;
    },
    hiddenSpinner(state) {
      state.showSpinner = false;
    },

  },
  actions: {},
  modules: {},
});
