<template>
  <div class="header">
    <div class="header-wrapper">
      <div class="logo">
        <a class="qmc" href="https://www.qianmancang.com">
          <img src="./logo.png" alt="" width="128" height="36">
        </a>
        <i class="seg"></i>
        <router-link :to="{ path: '/homeVip'}" class="cd">
          会员中心

        </router-link>
      </div>

      <ul class="nav">
        <li v-for="(item,index) in nav" class="item" @mouseover="mEnter(index)" @mouseout="mOut">
          <router-link :to="{ path: item.path}">
            {{item.name}}
          </router-link>
        </li>
        <li class="slider" :style="{left:slideLeft}" v-if="slideLeft.length"></li>
      </ul>
      <a href="https://www.qianmancang.com/" class="back-qmc">返回官方首页</a>
    </div>
  </div>
</template>

<script>
  import LStorage from   '@/common/js/LStorage.js';
  import {setCookie, getCookie} from '../../common/js/cookie.js';
  import {mapActions} from 'vuex'
  export default{
    data(){
      return {
        nav: [
          {name: '会员首页', path: '/homeVip'},
          {name: '会员等级', path: '/levelVip'},
          {name: '会员权益', path: '/rightVip'},
          {name: '成长任务', path: '/taskVip'},
        ],
        slideLeft: ''
      }
    },
    watch: {
      '$route': 'changePath'
    },
    created() {
      this.changePath();
      this.$store.dispatch('get_user_fromCk');
      if (this.userInfo) {
        console.log(1111)
        this.$store.dispatch('get_userInfo_dynamic', {user_id: this.userInfo.user_id})
      }
    },
    methods: {
      mEnter(index) {
        this.slideLeft = index * 112 + 24 + 'px';
      },
      mOut() {
        this.changePath()
      },
      changePath(){
        let path = this.$route.path;
        if (path != '/login') {
          for (var i = 0; i < this.nav.length; i++) {
            if (this.nav[i].path == path) {
              this.slideLeft = i * 112 + 24 + 'px';
              return
            }
          }
        } else {
          this.slideLeft = ''
        }

      }
    },


  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "headerVip.styl";


</style>


