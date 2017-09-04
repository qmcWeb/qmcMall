<template>
  <div class="goods-wrapper">
    <ul class="content-wrapper">
      <li class="goods-item" v-for="item in listArr">
        <div class="title-wrapper">
          <div class="title-icon">
            <img :src="imgSrc" alt="小图标" width="50" height="50">
            <span>{{item.num}}F</span>
          </div>
          <p class="product">{{item.con}}<span>{{item.des}}</span></p>
          <a class="goods-more" href="javascript:;" @click="router(item.call)">更多></a>
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
  import  good from  '@/components/good/good';
  export default {
    data (){
      return {
        list: [],
        imgSrc: [
          {src:'../../../static/img/Avatar.png'},
          {src:'../../../static/img/Avatar2.png'},
          {src:'../../../static/img/Avatar3.png'},
          {src:'../../../static/img/Avatar4.png'}
        ],
        listArr: [
          {num: '1',scon: '热兑商品',des: 'Popular', call: 'all'},
          {num: '2',con: '优惠卡券',des: 'Coupon', call: 'card'},
          {num: '3',con: '健康美食',des: 'Food',call: 'food'},
          {num: '4',con: '时尚美妆',des: 'Fashion', call: 'fashion'}
        ],
        selectPrice: 'all',
        slecetSort: 'default'
      }
    },
    created() {
      this.$http.get(
        '/api/commodity/screenOrderCommodityList.do'
      ).then(response => {
        // get body data
        this.list = response.body.list;
        console.log(this.list, 'goodHome')
      }, response => {
        // error callback
        console.log(response);
      });
    },
    methods: {
      router(typep){
        let paramsMsg = JSON.stringify({type: typep, price: 'all', sort: 'default', priceMin: 0, priceMax: 100000})
        sessionStorage.setItem('paramsMsg', paramsMsg);
        this.$router.push({
          path: '/goodsList',
          query: {
            type: typep,
            price: 'all',
            sort: 'default',
            priceMin: 0,
            priceMax: 100000
          }
        });
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
