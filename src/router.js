// import Hello from '@/components/Hello'
import homeMall from './components/homeMall/homeMall'
import homeVip from './components/homeVip/homeVip'
import taskVip from './components/taskVip/taskVip'
import levelVip from './components/levelVip/levelVip'
import rightVip from './components/rightVip/rightVip'
import detail from './components/detail/detail'
import goodsList from './components/goodsList/goodsList'
import order from './components/order/order'
import success from './components/success/success'
import login from './components/login/login'
export default [
  {
    path: '/homeMall',
    component: homeMall
  },
  {
    path: '/homeVip',
    component: homeVip
  },
  {
    path: '/taskVip',
    component: taskVip
  },
  {
    path: '/levelVip',
    component: levelVip
  },
  {
    path: '/rightVip',
    component: rightVip
  },
  {
    path: '/detail',
    name: 'detail',
    component: detail
  },
  {
    path: '/order',
    name: 'order',
    component: order,
    meta: {
      // 添加该字段，表示进入这个路由是需要登录的
      requireAuth: true,
    },
  },
  {
    path: '/success',
    name: 'success',
    component: success
  },
  {
    path: '/goodsList',
    name: 'goodsList',
    component: goodsList
  },
  {
    path: '/login',
    name: 'login',
    component: login
  }
]
