<template>
  <div id="app">
    <v-headerMall v-if="headMallShow"></v-headerMall>
    <v-headerVip v-else></v-headerVip>
    <router-view></router-view>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import  headerMall from  './components/headerMall/headerMall'
  import  headerVip from  './components/headerVip/headerVip'
  import  footer from  './components/footer/footer'
  import {mapState} from 'vuex'
  export default {
    name: 'app',
    data() {
      return {

      }
    },
    components: {
      'v-headerMall': headerMall,
      'v-headerVip': headerVip,
      'v-footer': footer,
    },
    created(){
      this.$store.dispatch('checkLogin');
    },
    computed: {
      headMallShow() {
        let path = this.$route.path;
        let pathReg = /Vip/;
        if (!pathReg.test(path)) {
          if (pathReg.test(this.$route.query.redirect)) {
            return false;
          }
          return true;
        } else {
          return false;
        }
      },
      ...mapState([
        'userInfo'
      ])
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/css/reset.css";
  @import "./common/css/animate.css";
  @import "./common/stylus/icon.styl";
</style>
