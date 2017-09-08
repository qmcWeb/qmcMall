<template>
  <div class="home-wrapper">
    <v-banner></v-banner>
    <v-goodsHome></v-goodsHome>
  </div>
</template>
<script>
  import  banner from  '@/components/banner/banner'
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
      'v-banner': banner,
      'v-goodsHome': goodsHome
    }
  }
</script>

<style>

</style>


