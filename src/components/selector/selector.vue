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
            <input type="number" v-model="route.priceMin">
          </div>
          <i class="to">-</i>
          <div class="widget">
            <i>￥</i>
            <input type="number" v-model="route.priceMax">
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
  import LStorage from '@/common/js/LStorage'
  export default{
    data (){
      return {
        type: [{con: "全部", select: true, call: 'all'},
          {con: "热兑商品", select: false, call: 1},
          {con: "健康美食", select: false, call: 2},
          {con: "时尚美妆", select: false, call: 3},
          {con: "优惠卡券", select: false, call: 4},
          {con: "家电数码", select: false, call: 5}],
        price: [
          {con: '全部', select: true, call: 'all'},
          {con: '我可兑换', select: false, call: 'convertible'}
        ],
        sort: [
          {con: '默认', select: true, call: 'default'},
          {con: '最新', select: false, call: 'newest'},
          {con: '热门', select: false, call: 'hot'},
          {con: '价格', select: false, call: 'priceUp'},
        ],
        priceMin: [],
        priceMax: [],
        route: ''
      }

    },
    computed: {

    },
    watch: {
      // 如果路由有变化，执行该方法
      '$route': 'RefreshDom'
    },
    created() {
      this.RefreshDom();
      this.route = this.$route.query
    },
    methods: {
      router(call, selected, index){
        if (call === 'priceUp') {
          this.sort[3].call = 'priceDown';
          call = 'priceDown'
        } else if (call === 'priceDown') {
          this.sort[3].call = 'priceUp'
          call = 'priceUp'
        }
        this.route[selected] = call;
        this.setParams()
      },
      setParams() {
        let route = this.route
        //神奇的傻逼
        this.$router.push({
          path: '/goodsList',
          query: {
            type: route.type,
            price: route.price,
            sort: route.sort,
            priceMin: route.priceMin,
            priceMax: 1000000
          }
        })
        this.$router.push({
          path: '/goodsList',
          query: {
            type: route.type,
            price: route.price,
            sort: route.sort,
            priceMin: route.priceMin,
            priceMax: route.priceMax
          }
        })
      },
      priceQuery(){
        this.setParams()
      },
      RefreshDom() {
        //请求获取数据
        this.route = this.$route.query
        let route = this.$route.query
        this.$store.dispatch('req_listData', route);
        for (let i in route) {
          if (String(route[i]).indexOf('price') > -1) {
            this.sort[3].call = route[i];
          }
          for (let n = 0; n < this[i].length; n++) {
            if (this[i][n]['call'] == route[i]) {
              this[i][n]['select'] = true
            } else {
              this[i][n]['select'] = false
            }
          }
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "selector.styl";
</style>


