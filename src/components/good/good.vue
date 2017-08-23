<template>
   <div class="good-wrap">
     <router-link :to="{path:`/detail/${item.id}`}" class="introduce-img">
       <img src="./Avatar.png" alt="" width="285" height="231">
       <!--<p class="introduce-sellout" v-if="">已售罄</p>-->
       <div class="good-introduce">
         <p class="goods-name">
           {{item.product_name}}
         </p>
         <div class="goods-price">
           <p class="cang-beans">{{item.product_price}}<span>仓豆</span></p>
           <p class="market-price">市场价：{{item.selling_price}}元</p>
         </div>
       </div>
     </router-link>
   </div>
</template>

<script>
  export default{
    props:['item']
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "good.styl";
</style>


