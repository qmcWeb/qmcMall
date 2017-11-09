// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
//定义api
Vue.prototype.api = '/api';
Vue.prototype.cjx = '/cjx';
import App from './App';
import VueRouter from 'vue-router';
import routerMap from './router';
import VueResource from 'vue-resource';
import Vuex from 'vuex';
import './common/js/validate.js';
import './common/js/LStorage.js';
import {isEmptyObj} from './common/js/isEmptyObj';
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)
import store_vuex from './store'
Vue.use(Vuex);
const store = new Vuex.Store(store_vuex);
Vue.use(VueResource);
Vue.config.productionTip = false;

/* eslint-disable no-new */
Vue.use(VueRouter)
// 并且配置路由规则
const router = new VueRouter({
  routes: routerMap,
  linkActiveClass: 'active'
});
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});
// 全局导航钩子
router.beforeEach((to, from, next) => {
  //store.dispatch('get_user_fromCk');
  // 判断该路由是否需要登录权限
  window.document.title = to.meta.title;
  next()
  /* if (to.meta.requireAuth) {
    // 通过vuex state获取当前的token是否存在
    // console.log(isEmptyObject(store.state.user))
    if (!isEmptyObj(store.state.userInfo)) {
      next();
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
   }*/

});
Vue.http.options.emulateJSON = true;
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

