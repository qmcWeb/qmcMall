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
    component: homeMall,
    meta: {
      title: '钱满仓_积分商城'
    },
  },
  {
    path: '/homeVip',
    component: homeVip,
    meta: {
      title: '钱满仓_会员中心'
    },
  },
  {
    path: '/taskVip',
    component: taskVip,
    meta: {
      title: '钱满仓_成长任务'
    },
  },
  {
    path: '/levelVip',
    component: levelVip,
    meta: {
      title: '钱满仓_会员等级'
    },
  },
  {
    path: '/rightVip',
    component: rightVip,
    meta: {
      title: '钱满仓_会员权益'
    },
  },
  {
    path: '/detail',
    name: 'detail',
    component: detail,
    meta: {
      title: '钱满仓_商品详情'
    },
  },
  {
    path: '/order',
    name: 'order',
    component: order,
    meta: {
      // 添加该字段，表示进入这个路由是需要登录的
      requireAuth: true,
      title: '钱满仓_订单详情'
    },
  },
  {
    path: '/success',
    name: 'success',
    component: success,
    meta: {
      title: '钱满仓_购买成功'
    },
  },
  {
    path: '/goodsList',
    name: 'goodsList',
    component: goodsList,
    meta: {
      title: '钱满仓_商品列表'
    },
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      title: '登录'
    },
  }
]
