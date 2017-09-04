<template>
  <div class="home-wrapper">
    <v-banner></v-banner>
    <v-goodsHome :list_Arr="list_Arr" :type_Arr="type_Arr"></v-goodsHome>
  </div>
</template>
<script>
  import  banner from  '@/components/banner/banner'
  import  goodsHome from  '@/components/goodsHome/goodsHome'
  export default {
    data (){
      return {
        "list_Arr": [],
        "type_Arr": []
      }
    },
    created() {
      this.$http.get('/cjx/commodity/showIndexList.do').then(response => {
        this.list_Arr = response.body.list
        console.log(this.list_Arr)
      });
      this.$http.get('/api/commodity/queryCommodityType.do').then(response => {
        this.type_Arr = response.body.list;
      });
    },
    components: {
      'v-banner': banner,
      'v-goodsHome': goodsHome
    }
  }
</script>

<style>

</style>


