<template>
  <div class="error-layer blackFixed" v-show="ErrorLayerShow">
    <div class="error-wrap midWrap">
      <h3>温馨提示</h3>
      <i class="close" @click="closeErrorLayer">×</i>
      <div class="con" v-html="errorCon"></div>
      <div class="operate-widget">
        <a href="javascript:;" class="iknow" @click="closeErrorLayer">知道了</a>
        <a href="https://www.qianmancang.com" class="goQMC" v-if="errorType==='lessBeans'">投资挣仓豆></a>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    props: ['errorCon', 'errorType', 'errorlayerSHow'],
    data() {
      return {
        ErrorLayerShow: this.errorlayerSHow
      }
    },
    watch: {
      'errorCon' (a, b){
        this.errorCon = a
        console.log(a)
      },
      'errorType' (a, b){
        this.errorType = a
      },
      'errorlayerSHow' (a, b){
        this.ErrorLayerShow = a
        console.log(a)
      },
    },
    methods: {
      closeErrorLayer() {
        this.ErrorLayerShow = !this.ErrorLayerShow
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "errorLayer.styl";
</style>


