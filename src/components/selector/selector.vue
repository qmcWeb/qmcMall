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
            <input type="number" v-model="paramsSession.priceMin">
          </div>
          <i class="to">-</i>
          <div class="widget">
            <i>￥</i>
            <input type="number" v-model="paramsSession.priceMax">
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
    props: ['paramsSession'],
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
          {con: '价格', select: false, call: 'priceUp'},
        ],
        priceMin: [],
        priceMax: [],
      }

    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      paramsSession: function () {
        this.RefreshDom()
      }
    },
    created() {
      this.RefreshDom()
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
        this.paramsSession[selected] = call;
        this.setSession()
        //子组件给父组件传值
        //this.$emit('listenChild', this.select)
      },
      setSession() {
        let paramsMsg = JSON.stringify(this.paramsSession)
        sessionStorage.setItem('paramsMsg', paramsMsg);
        this.$router.push({path: '/goodsList',
          query: {
            type: this.paramsSession.type,
            price: this.paramsSession.price,
            sort: this.paramsSession.sort,
            priceMin: this.paramsSession.priceMin,
            priceMax: this.paramsSession.priceMax
          }
        })
      },
      priceQuery(){
        this.setSession()
        //子组件给父组件传值
        //this.$emit('listenChild', this.select)
      },
      RefreshDom() {
        console.log(this.sort[3].call, 1)
        let route = this.paramsSession
        console.log(route)
        for (let i in route) {
          if (route[i].indexOf('price') > -1) {
            this.sort[3].call = route[i];
          }
          for (let n = 0; n < this[i].length; n++) {
            if (this[i][n]['call'] === route[i]) {
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


