<template>
  <div class="selector-wrap">
    <div class="content">
      <div class="top-wrap">
        <div class="byType">
          <div class="title">
            商品类别：
          </div>
          <a href="javascript:;" v-for="(item,index) in type" :class="{active:item.select}"
             @click="routerType(item.call,'type',index)">{{item.con}}</a>
        </div>
        <div class="byPrice">
          <div class="title">
            商品价格：
          </div>
          <a href="javascript:;" v-for="(item,index) in price" @click="routerPrice(item.call,'price',index)"
             :class="[{active:item.select},{'marginR-10':item.call==='convertible'}]">{{item.con}}</a>
          <div class="widget">
            <i>￥</i>
            <input type="number" v-model="select.priceMin">
          </div>
          <i class="to">-</i>
          <div class="widget">
            <i>￥</i>
            <input type="number" v-model="select.priceMax">
          </div>
          <a href="javascript:;" class="sure" @click="priceQuery">确定</a>
        </div>
      </div>
      <div class="bottom-wrap">
        <div class="title">
          排序：
        </div>
        <a href="javascript:;" v-for="(item,index) in sort" :class="{active:item.select}"
           @click="routerSort(item.call,'sort',index)">{{item.con}}</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data (){
      return {
        type: [
          {con: '全部', select: true, call: 'all'},
          {con: '优惠卡券', select: false, call: 'card'},
          {con: '健康美食', select: false, call: 'food'},
          {con: '时尚美妆', select: false, call: 'fashion'},
        ],
        price: [
          {con: '全部', select: true, call: 'all'},
          {con: '我可兑换', select: false, call: 'convertible'}
        ],
        sort: [
          {con: '默认', select: true, call: 'default'},
          {con: '最新', select: false, call: 'newest'},
          {con: '热门', select: false, call: 'hot'},
          {con: '价格', select: false, call: 'price'},
        ],
        priceMin: [{priceMin:0}],
        priceMax: [{priceMax:0}],
        select: {type: 'all', price: 'all', sort: 'default', priceMin: 0, priceMax: 100000}
      }
    },
    created () {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      routerType(call, selected, index){
        this.select[selected] = call;
        let route = this.$route.query;
        this.$router.push({path: '/goodsList',
          query: {
            type: this.select.type,
            price: route.price,
            sort: route.sort,
            priceMin: route.priceMin,
            priceMax: route.priceMax
          }
        });
      },
      routerPrice(call, selected, index){
        this.select[selected] = call;
        let route = this.$route.query;
        this.$router.push({path: '/goodsList',
          query: {
            type: route.type,
            price: this.select.price,
            sort: route.sort,
            priceMin: route.priceMin,
            priceMax: route.priceMax
          }
        });
      },
      routerSort(call, selected, index){
        this.select[selected] = call;
        let route = this.$route.query;
        this.$router.push({path: '/goodsList',
          query: {
            type: route.type,
            price: route.price,
            sort: this.select.sort,
            priceMin: route.priceMin,
            priceMax: route.priceMax
          }
        });
      },
      priceQuery(){
        let route = this.$route.query;
        this.$router.push({path: '/goodsList',
          query: {
            type: route.type,
            price: route.price,
            sort: route.sort,
            priceMin: this.select.priceMin,
            priceMax: this.select.priceMax
          }
        });
      },
      fetchData() {
        let route = this.$route.query;
        for (let i in route){
          for(let n = 0; n < this[i].length; n++){
            if(this[i][n].call === route[i]){
              this[i][n].select = true;
            }else{
              this[i][n].select = false;
            }
          }
        }
        //子组件给父组件传值
        this.$emit('listenChild', route);
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "selector.styl";
</style>


