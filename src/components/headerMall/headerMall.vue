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
          <router-link :to="{path: '/'}" exact>
            商城首页
          </router-link>
          <i class="arrow"></i>
        </li>
        <li class="goods">
          <router-link
            :to="{path: '/goodsList',query:{type: 'all',price: 'all',sort: 'default',priceMin: 0,priceMax: 100000,pageNo:1,pageSize:12}}">
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
      <div class="user" v-if="!isLoginCom">
        <div class="logged" :class="{'active':down}" v-if="dynamic" @click.stop="showUserMenu">
          <div class="divider">
            <i class="arrow"></i>
            <img src="./Avatar.png" alt="" width="50" height="50" class="avatar">
            <div class="info">
              <div class="name">{{userInfo.realname}}</div>
              <div class="count"><span>{{dynamic.cd_money}}</span>仓豆</div>
            </div>
            <ul class="sidebar">
              <li>
                <router-link
                  :to="{path: '/goodsList',query:{type: 'all',price: 'convertible',sort: 'default',priceMin: 0,priceMax: 100000,pageNo:1,pageSize:12}}">
                  我可兑的商品
                  <i class="icon-rightArrow"></i>
                </router-link>
              </li>
              <li>
                <a href="#">我的兑换记录<i class="icon-rightArrow"></i></a>
              </li>
              <li>
                <a href="#">管理收货地址<i class="icon-rightArrow"></i></a>
              </li>
              <li>
                <a href="https://www.qianmancang.com/loan-list">投资挣仓豆<i class="icon-rightArrow"></i></a>
              </li>
              <li>
                <a href="JavaScript:;" @click="exit">安全退出<i class="icon-exit"></i></a>
              </li>
            </ul>
          </div>
        </div>
        <div class="login" v-if="noLogged">
          <img src="./Avatar.png" alt="" width="50" height="50">
          <router-link :to="{ path: '/login',query:{redirect: this.$route.fullPath}}" class="log">登录</router-link>
          <i class="seg"></i>
          <a href="https://www.qianmancang.com/zhuce" class="reg">注册</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import LStorage from   '@/common/js/LStorage.js';
  import {setCookie, getCookie, delCookie} from '../../common/js/cookie.js';
  import {mapActions} from 'vuex'
  import {mapState} from 'vuex'
  export default{
    data(){
      return {
        selectPrice: 'all',
        slecetSort: 'default',
        down: false
      }
    },
    created() {
      //商品种类 请求
      this.req_goodTypeData();
      var self = this;
      document.body.addEventListener("click", function () {
        self.down = false
      })
    },

    methods: {
      showUserMenu(e){
        e.stopPropagation;
        this.down = true
      },
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
        this.$store.commit('SET_userInfo_dynamic', {data: ''});
        /*删除cookie*/
        delCookie('user_info');
        this.$store.dispatch('checkLogin');
      },
      ...mapActions(['req_goodTypeData', 'req_userInfo', 'req_listData'])
    },
    computed: {
      isLoginCom(){
        let path = this.$route.path;
        if (path.indexOf('login') > -1) {
          return true
        } else {
          return false
        }
      },
      ...mapState({
        type_Arr: 'goodTypeData',
        userInfo: 'userInfo',
        dynamic: 'dynamic',
        noLogged: 'noLogged',
        IsLogged: 'IsLogged'

      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "headerMall.styl";
</style>


