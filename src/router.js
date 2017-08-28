
// import Hello from '@/components/Hello'
import home from './components/home/home'
import detail from './components/detail/detail'
import goodsList from './components/goodsList/goodsList'
import order from './components/order/order'

export default [
  {
    path: '/',
    component: home
  },
  {
    path: '/detail',
    name:'detail',
    component: detail
  },
  {
    path: '/order',
    name: 'order',
    component: order
  },
  {
    path:'/goodsList',
    name:'goodsList',
    component: goodsList
  }
]
