// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routerMap from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(VueRouter)
// 并且配置路由规则
const router = new VueRouter({
  routes: routerMap
})

// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

