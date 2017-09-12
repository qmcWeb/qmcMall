<template>
  <div class="home-wrapper">
    <v-banner></v-banner>
    <v-goodsHome></v-goodsHome>
  </div>
</template>
<script>
  import  bannerMall from  '@/components/bannerMall/bannerMall'
  import  goodsHome from  '@/components/goodsHome/goodsHome'
  import {mapActions} from 'vuex'
  export default {
    data (){
      return {

      }
    },
    methods: {
      ...mapActions(['req_indexData'])
    },
    created() {
      //首页列表 请求
      this.$store.dispatch('req_indexData');
    },
    components: {
      'v-banner': bannerMall,
      'v-goodsHome': goodsHome
    }
  }
</script>

<style>

</style>


