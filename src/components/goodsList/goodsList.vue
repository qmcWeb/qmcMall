<template>
  <div class="list-wrapper">
    <v-crumbsBar></v-crumbsBar>
    <v-selector></v-selector>
    <v-goodsHome></v-goodsHome>
    <v-paging></v-paging>
  </div>

</template>

<script>
  import  selector from  '@/components/selector/selector'
  import  paging from  '@/components/paging/paging'
  import  goodsHome from  '@/components/goodsHome/goodsHome'
  import  crumbsBar from  '@/components/crumbsBar/crumbsBar'
  export default {
    components:{
      'v-crumbsBar':crumbsBar,
      'v-selector':selector,
      'v-paging':paging,
      'v-goodsHome':goodsHome
    }
  }
</script>

<style>

</style>


