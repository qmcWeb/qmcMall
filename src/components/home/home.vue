<template>
  <div class="home-wrapper">
    <v-banner></v-banner>
    <v-goodsHome :list="list"></v-goodsHome>
  </div>

</template>

<script>
  import  banner from  '@/components/banner/banner'
  import  goodsHome from  '@/components/goodsHome/goodsHome'
  export default {
    data (){
      return {
        "list": []
      }
    },
    components:{
        'v-banner':banner,
        'v-goodsHome':goodsHome
    }
  }
</script>

<style>

</style>


