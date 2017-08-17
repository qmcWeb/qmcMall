
// import Hello from '@/components/Hello'
import home from './components/home/home'
import detail from './components/detail/detail'
import goodsList from './components/goodsList/goodsList'


export default [
  {
    path: '/',
    component: home
  },
  {
    path:'/detail/:id',
    name:'detail',
    component: detail
  },
  {
    path:'/goodsList',
    name:'goodsList',
    component: goodsList
  }
]
