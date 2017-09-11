<template>
  <div class="header">
    <div class="header-wrapper">
      <div class="logo">
        <a class="qmc" href="https://www.qianmancang.com">
          <img src="./logo.png" alt="" width="128" height="36">
        </a>
        <i class="seg"></i>
        <a class="cd" href="#">会员中心</a>
      </div>
      <ul class="nav">
        <li>
          <router-link :to="{ path: '/homeVip'}">
            会员首页

          </router-link>
        </li>
        <li>
          <a href="javascript:;">
            会员等级
          </a>
        </li>
      </ul>

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
        nav: [
          {name: '会员首页', path: '/homeVip'},
          {name: '会员等级', path: '/levelVip'},
          {name: '会员权益', path: '/rightVip'},
          {name: '成长任务', path: '/taskVip'},
        ]
      }
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "headerVip.styl";


</style>


