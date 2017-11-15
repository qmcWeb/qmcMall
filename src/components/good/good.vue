<template>
   <div class="good-wrap">
     <a href="javascript:;" class="introduce-img" @click="routerLink">
       <div class="soldOut" v-if="item.inventory===0">
         已售罄
       </div>
       <img :src="item.picture_url" alt="">
     </a>
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
   </div>
</template>

<script>
  export default{
    props: ['item'],
    methods: {
      routerLink (){
        this.$router.push({path: '/detail', query: {product_id: this.item.product_id}});
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "good.styl";
</style>


