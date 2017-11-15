<template>
  <div class="error-layer blackFixed" v-if="error">
    <div class="error-wrap midWrap">
      <h3>温馨提示</h3>
      <i class="close icon-close" @click="closeErrorLayer"></i>
      <div class="con" v-html="error.errorCon"></div>
      <div class="operate-widget">
        <router-link :to="{path:'/login',query:{redirect: this.$route.fullPath}}" v-if="error.errorType==='Nologged'"
                     class="iknow">立即登录
        </router-link>
        <a href="javascript:;" class="iknow" @click="closeErrorLayer" v-else>知道了</a>
        <a href="https://www.qianmancang.com" class="goQMC" v-if="error.errorType==='lessBeans'">投资挣仓豆></a>
      </div>
    </div>
  </div>
</template>

<script>
  import {isEmptyObj} from '@/common/js/isEmptyObj'
  export default{
    data() {
      return {

      }
    },
    computed: {
      error(){
        console.log(this.$store.state.error)
        return this.$store.state.error
      }
    },
    methods: {
      closeErrorLayer() {
        this.$store.dispatch('set_error', '')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "errorLayer.styl";
</style>


