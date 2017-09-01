<template>
  <div class="goods-wrapper">
    <ul class="content-wrapper">
      <li class="goods-item" v-for="index in 4">
        <div class="title-wrapper">
          <div class="title-icon">
            <img src="./Avatar.png" alt="小图标" width="50" height="50">
            <span>1F</span>
          </div>
          <p class="product">热兑商品<span>Popular</span></p>
          <a class="goods-more" href="">更多></a>
        </div>
        <ul class="goods">
          <li v-for="item in list">
            <v-good :item="item"></v-good>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
  import  good from  '../goods/goods';
  export default {
    props: {
      list: Array
    },
    data() {
      return {}
    },
    components:{
      'v-good': good
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped="">
  @import "goodsHome.styl";
</style>
