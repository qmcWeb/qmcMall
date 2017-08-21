<template>
  <div class="goods-wrapper">
    <ul class="content-wrapper">
      <li class="goods-item" v-for="index in 4">
        <div class="title-wrapper">
          <div class="title-icon">
            <img src="./Avatar.png" alt="小图标" width="32" height="44">
            <span>1F</span>
          </div>
          <p class="product">热兑商品<span>Popular</span></p>
          <a class="goods-more" href="">更多></a>
        </div>
        <ul class="goods">
          <li v-for="index in 4">
            <router-link :to="{path:`/detail/${index}`}" class="introduce-img">
              <img src="./Avatar.png" alt="" width="285" height="231">
            </router-link>
            <!--<p class="introduce-sellout" v-if="">已售罄</p>-->
            <div class="good-introduce">
              <p class="goods-name">
                <router-link :to="{path:`/detail/${index}`}">
                  飞利浦智能充电式剃须刀

                </router-link>
              </p>
              <div class="goods-price">
                <p class="cang-beans">5999<span>仓豆</span></p>
                <p class="market-price">市场价：360元</p>
              </div>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
  export default{}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped="">
  @import "goods.styl";
</style>
