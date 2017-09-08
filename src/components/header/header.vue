<template>
  <div class="header">
    <div class="header-wrapper">
      <div class="logo">
        <a class="qmc" href="https://www.qianmancang.com">
          <img src="./logo.png" alt="" width="160" height="47">
        </a>
        <i class="seg"></i>
        <a class="cd" href="#">仓豆商城</a>
      </div>
      <ul class="nav">
        <li>
          <router-link :to="{ path: '/' }">
            商城首页
          </router-link>
          <i class="arrow"></i>
        </li>
        <li class="goods">
          <a href="javascript:;" @click="router('all')">
            全部商品
          </a>
          <ul class="list-wrapper">
            <li class="list" v-for="item in type_Arr">
              <a href="javascript:;" @click="router(item.id)">{{item.name}}</a>
            </li>
          </ul>
          <i class="arrow"></i>
        </li>
        <li>
          <a href="https://www.qianmancang.com">返回官方首页</a>
          <i class="arrow"></i>
        </li>
      </ul>
      <div class="user">
        <div class="logged" v-if="Object.keys(userInfo).length">
          <i class="arrow"></i>
          <img src="./Avatar.png" alt="" width="50" height="50" class="avatar">
          <div class="info">
            <div class="name">{{userInfo.username}}</div>
            <div class="count"><span>{{userInfo.cd_money}}</span>仓豆</div>
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
              <a href="#">安全退出<i class="icon-exit"></i></a>
            </li>
          </ul>
        </div>
        <div class="login" v-else>
          <img src="./Avatar.png" alt="" width="50" height="50">
          <a href="https://www.qianmancang.com/memberLoginPage" class="log">登录</a>
          <i class="seg"></i>
          <a href="https://www.qianmancang.com/zhuce" class="reg">注册</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import LStorage from '@/common/js/LStorage';
  import {mapActions} from 'vuex'
  import {mapState} from 'vuex'
  export default{
    data(){
      return {
      }
    },
    computed: {
      ...mapState({
        type_Arr: 'goodTypeData',
        userInfo: 'userInfo',
      })
    },
    mounted() {
      //商品种类 请求
      this.req_goodTypeData();
      //用户信息 请求
      this.req_userInfo();
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
      getPath() {
        //this.req_listData();
      },
      ...mapActions(['req_goodTypeData', 'req_userInfo', 'req_listData'])
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "header.styl";


</style>


