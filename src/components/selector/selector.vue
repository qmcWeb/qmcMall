<template>
  <div class="selector-wrap">
    <div class="content">
      <div class="top-wrap">
        <div class="byType">
          <div class="title">
            商品类别：
          </div>
          <a href="javascript:;" v-for="(item,index) in type" :class="{active:item.select}"
             @click="router(item.call,'type',index)">{{item.con}}</a>
        </div>
        <div class="byPrice">
          <div class="title">
            商品价格：
          </div>
          <a href="javascript:;" v-for="(item,index) in price" @click="router(item.call,'price',index)"
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
           @click="router(item.call,'sort',index)">{{item.con}}</a>
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
        select: {type: 'all', price: 'all', sort: 'default', priceMin: 0, priceMax: 100000}
      }

    },
    methods: {
      router(call, selected, index){
        //组件内传值
        for (let i = 0; i < this[selected].length; i++) {
          this[selected][i].select = false
        }
        this[selected][index].select = true
        this.select[selected] = call;
        this.$router.push({path: '/goodsList',
          query: {
            type: this.select.type,
            price: this.select.price,
            sort: this.select.sort,
            priceMin: this.select.priceMin,
            priceMax: this.select.priceMax
          }
        })
        //子组件给父组件传值
        this.$emit('listenChild', this.select)
      },
      priceQuery(){
        this.$router.push({path: '/goodsList',
          query: {
            type: this.select.type,
            price: this.select.price,
            sort: this.select.sort,
            priceMin: this.select.priceMin,
            priceMax: this.select.priceMax
          }
        })
        //子组件给父组件传值
        this.$emit('listenChild', this.select)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "selector.styl";
</style>


