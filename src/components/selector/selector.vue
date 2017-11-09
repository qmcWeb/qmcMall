<template>
  <div class="selector-wrap">
    <div class="content">
      <div class="top-wrap">
        <div class="byType">
          <div class="title">
            商品类别：
          </div>
          <a href="javascript:;" v-for="(item,index) in type" :class="{active:item.select}"
             @click="router(item.call,'type')">{{item.con}}</a>
        </div>
        <div class="byPrice">
          <div class="title">
            商品价格：
          </div>
          <a href="javascript:;" v-for="(item,index) in price" @click="router(item.call,'price')"
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
           @click="router(item.call,'sort')">{{item.con}}</a>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  export default{
    data (){
      return {
        type: [{con: "全部", select: true, call: 'all'}],
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
        route: '',
        pageNo: [],
        pageSize: [],
        user_id: []
      }

    },
    computed: {
      ...mapState([
        'userInfo'
      ]),

    },
    watch: {
      // 如果路由有变化，执行该方法
      '$route': 'RefreshDom'
    },
    created() {
      this.route = this.$route.query;

      this.$store.dispatch('req_goodTypeData').then((res) => {
        for (var i = 0; i < res.length; i++) {
          var obj = {con: res[i].name, select: false, call: res[i].id}
          this.type.push(obj)
        }
        this.$nextTick(function () {
          this.RefreshDom();
        })
      });
    },
    methods: {
      router(call, selected){
        if (call === 'priceUp') {
          this.sort[3].call = 'priceDown';
          call = 'priceDown'
        } else if (call === 'priceDown') {
          this.sort[3].call = 'priceUp'
          call = 'priceUp'
        }
        if (call === 'convertible') {
          if (this.userInfo) {
            this.route.user_id = this.userInfo.user_id
            console.log(this.route)
          }
        } else {
          delete this.route.user_id;
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
            priceMax: route.priceMax,
            user_id: route.user_id
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


