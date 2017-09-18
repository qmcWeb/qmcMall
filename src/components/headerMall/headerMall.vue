<template>
  <div class="header">
    <div class="header-wrapper">
      <div class="logo">
        <a class="qmc" href="https://www.qianmancang.com">
          <img src="./logo.png" alt="" width="128" height="36">
        </a>
        <i class="seg"></i>
        <a class="cd" href="#">仓豆商城</a>
      </div>
      <ul class="nav">
        <li>
          <router-link :to="{path: '/homeMall'}">
            商城首页

          </router-link>
          <i class="arrow"></i>
        </li>
        <li class="goods">
          <router-link
            :to="{path: '/goodsList',query:{type: 'all',price: 'all',sort: 'default',priceMin: 0,priceMax: 100000}}">
            全部商品

          </router-link>
          <i class="arrow"></i>
          <ul class="list-wrapper">
            <li class="list" v-for="item in type_Arr">
              <a href="javascript:;" @click="router(item.id)">{{item.name}}</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="https://www.qianmancang.com">返回官方首页</a>
          <i class="arrow"></i>
        </li>
      </ul>
      <div class="user">
        <div class="logged" v-if="!loginShow">
          <i class="arrow"></i>
          <img src="./Avatar.png" alt="" width="50" height="50" class="avatar">
          <div class="info">
            <div class="name">王玲文先生</div>
            <div class="count"><span>999999</span>仓豆</div>
          </div>
          <ul class="sidebar">
            <li>
              <a href="#">我可兑的商品
                <i class="icon-rightArrow"></i>
              </a>
            </li>
            <li>
              <a href="#">我的兑换记录<i class="icon-rightArrow"></i></a>
            </li>
            <li>
              <a href="#">管理收货地址<i class="icon-rightArrow"></i></a>
            </li>
            <li>
              <a href="#">投资挣仓豆<i class="icon-rightArrow"></i></a>
            </li>
            <li>
              <a href="JavaScript:;" @click="exit">安全退出<i class="icon-exit"></i></a>
            </li>
          </ul>
        </div>
        <div class="login" v-if="loginShow">
          <img src="./Avatar.png" alt="" width="50" height="50">
          <router-link :to="{ path: '/login' }" class="log">登录</router-link>
          <i class="seg"></i>
          <a href="https://www.qianmancang.com/zhuce" class="reg">注册</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import LStorage from   '@/common/js/LStorage.js';
  import {setCookie, getCookie} from '../../common/js/cookie.js';
  import {mapActions} from 'vuex'
  import {mapState} from 'vuex'
  export default{
    data(){
      return {
        selectPrice: 'all',
        slecetSort: 'default'
      }
    },
    mounted(){
      /*页面挂载获取保存的cookie值，渲染到页面上*/
      let uname = getCookie('username')
      this.name = uname
      /*如果cookie不存在，则跳转到登录页*/
//      if (uname == "") {
//        this.$router.push('/')
//      }
    },
    created() {
      //商品种类 请求
      this.req_goodTypeData();
    },

    methods: {
      router(typep){
        this.$router.push({
          path: '/goodsList',
          query: {
            type: typep,
            price: 'all',
            sort: 'default',
            priceMin: 0,
            priceMax: 100000
          }
        })
      },
      exit() {
        this.$store.commit('increment');
        this.loginShow = this.$store.state.loginShow;
        /*删除cookie*/
        delCookie('username')
      },
      ...mapActions(['req_goodTypeData', 'req_userInfo', 'req_listData'])
    },
    computed: {
      loginShow: {
        // getter
        get: function () {
          return this.$store.state.loginShow;
        },
        // setter
        set: function (newValue) {
          return this.$store.state.loginShow = newValue;
        }
      },
      ...mapState({
        type_Arr: 'goodTypeData',
        userInfo: 'userInfo',
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "headerMall.styl";


</style>


