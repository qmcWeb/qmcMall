<template>
  <div class="goods-wrapper">
    <ul class="content-wrapper">
      <li class="goods-item" v-for="(type,index) in type_Arr">
        <div class="title-wrapper">
          <div class="title-icon">
            <img :src="imgNum[index]" alt="floorNum" width="32" height="44">
            <span>{{index + 1}}F</span>
          </div>
          <p class="product">{{type.name}}<span>{{type.engname}}</span></p>
          <a class="goods-more" href="javascript:;" @click="router(type.id)">更多></a>
        </div>
        <ul class="goods">
          <li v-for="item in list_Arr" v-if="type.name===item.type">
              <v-good :item="item"></v-good>
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
    props: ['list_Arr', 'type_Arr'],
    data() {
      return {
        imgNum: [
          '../../../static/img/floorNum-1.png',
          '../../../static/img/floorNum-2.png',
          '../../../static/img/floorNum-3.png',
          '../../../static/img/floorNum-4.png',
        ]
      }
    },
    methods: {
      router(typep){
        LStorage.setItem('paramsMsg', {type: typep, price: 'all', sort: 'default', priceMin: 0, priceMax: 100000})
        this.$router.push({
          path: '/goodsList',
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
    components:{
      'v-good': good
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped="">
  @import "goodsHome.styl";
</style>
