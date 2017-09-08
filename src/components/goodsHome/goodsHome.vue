<template>
  <div class="goods-wrapper">
    <ul class="content-wrapper">
      <li class="goods-item" v-for="(value, key, index) in new_list" v-if="value.length>0">
        <div class="title-wrapper">
          <div class="title-icon">
            <img :src="imgNum[index]" alt="floorNum" width="32" height="44">
            <span>{{index + 1}}F</span>
          </div>
          <p class="product" v-if="type_Arr.length">{{type_Arr[index].name}}<span>{{type_Arr[index].engname}}</span></p>
          <a class="goods-more" href="javascript:;" @click="router(type_Arr[index].id)">更多></a>
        </div>
        <ul class="goods">
          <li v-for="item in value">
            <v-good :item="item"></v-good>
          </li>
          <li v-if="value.length<3">
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
          '../../../static/img/floorNum-1.png',
          '../../../static/img/floorNum-2.png',
          '../../../static/img/floorNum-3.png',
          '../../../static/img/floorNum-4.png',
          '../../../static/img/floorNum-5.png',
        ],
      }
    },
    computed: {
      new_list () {
        return this.$store.getters.new_index_data
      },
      type_Arr(){
        return this.$store.state.goodTypeData
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
