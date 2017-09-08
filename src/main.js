// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import routerMap from './router';
import VueResource from 'vue-resource';
import Vuex from 'vuex';
import './common/js/validate.js';
import './common/js/LStorage.js';
//在main.js中引入Store实例
// 使用{}引入store实例，因为store是一个const变量

import store_vuex from './store'
Vue.use(Vuex);
const store = new Vuex.Store(store_vuex);
Vue.use(VueResource);
Vue.config.productionTip = false;

/* eslint-disable no-new */
Vue.use(VueRouter)
// 并且配置路由规则
const router = new VueRouter({
  routes: routerMap
});

// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

