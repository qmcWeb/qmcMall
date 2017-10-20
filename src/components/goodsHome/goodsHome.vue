<template>
  <div class="goods-wrapper">
    <ul class="content-wrapper" v-if="index_list.length>0">
      <li class="goods-item" v-for="(item,index) in index_list">
        <div class="title-wrapper">
          <div class="title-icon">
            <img :src="imgNum[index]" alt="floorNum" width="32" height="44">
            <span>{{index + 1}}F</span>
          </div>
          <p class="product">{{item.commodityType}}<span>{{item.engname}}</span></p>
          <a class="goods-more" href="javascript:;" @click="router(item.id)">更多></a>
        </div>
        <ul class="goods">
          <li v-for="item in item.commodityList">
            <v-good :item="item"></v-good>
          </li>
          <li v-if="item.commodityList.length<4" v-for="waitItem in 4-item.commodityList.length">
            <div class="waitInfo">
              更多商品敬请期待...
            </div>
          </li>
          <li class="clearBoth"></li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
  import  good from  '@/components/good/good';
  import LStorage from '@/common/js/LStorage'
  export default {
    data() {
      return {
        imgNum: [
          './static/img/floorNum-1.png',
          './static/img/floorNum-2.png',
          './static/img/floorNum-3.png',
          './static/img/floorNum-4.png',
          './static/img/floorNum-5.png',
        ],
        colorArr: ['']
      }
    },
    computed: {
      index_list () {
        console.log(this.$store.state.indexData)
        return this.$store.state.indexData
      }
    },
    methods: {
      router(typep){
        this.$router.push({
          path: 'goodsList',
          query: {
            type: typep,
            price: 'all',
            sort: 'default',
            priceMin: 0,
            priceMax: 100000
          }
        })
      }
    },
    components: {
      'v-good': good
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped="">
  @import "goodsHome.styl";
</style>
