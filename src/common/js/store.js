/**
 * Created by Administrator on 2017/9/8.
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    loginShow: true
  },
  mutations: {
    increment (state) {
      state.loginShow = !state.loginShow;
    }
  }
});
