<template>
  <div id="app">
    <v-headerMall v-if="headMallShow"></v-headerMall>
    <v-headerVip v-if="headVipShow"></v-headerVip>
    <router-view></router-view>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import  headerMall from  './components/headerMall/headerMall'
  import  headerVip from  './components/headerVip/headerVip'
  import  footer from  './components/footer/footer'
  export default {
    name: 'app',
    data() {
      return {
        headMallShow: false,
        headVipShow: false,
      }
    },
    components: {
      'v-headerMall': headerMall,
      'v-headerVip': headerVip,
      'v-footer': footer,
    },
    watch: {
      '$route': 'changePath'
    },
    methods: {
      changePath () {
        let path = this.$route.path;
        let pathReg = /Vip/;
        if (!pathReg.test(path)) {
          this.headMallShow = true;
          this.headVipShow = false;
        } else {
          this.headVipShow = true;
          this.headMallShow = false;
        }
      }
    },
    created() {
      this.changePath()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/css/reset.css";
  @import "./common/css/animate.css";
  @import "./common/stylus/icon.styl";
</style>
