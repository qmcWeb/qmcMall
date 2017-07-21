
// import Hello from '@/components/Hello'
import home from './components/home/home'
import detail from './components/detail/detail'


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

]
