<template>
  <div class="success-wrapper">
    <div class="success-left left">
      <div class="success-hint">
        <div class="entity-wrap" v-if="type">
          <p class="hint1">
            <img src="./icon-car.png" alt="">
            订单提交成功，商品即将到达...
          </p>
          <p class="hint2">我们将尽快发货，请您耐心等待^_^</p>
          <p class="hint3">还有需求没说清？立即联系客服 ></p>
        </div>
        <div class="virtual-wrap" v-else>
          <p class="hint1">
            <img src="./icon-hook.png" alt="">
            兑换成功，商品已达…
          </p>
          <p class="hint3">使用有疑问？您可在订单详情中查看具体使用说明。</p>
        </div>
      </div>
      <div class="success-btn">
        <a href="javascript:;" class="left">查看订单详情</a>
        <router-link :to="{path: '/homeMall'}" class="right">返回商城首页</router-link>
      </div>
    </div>
    <div class="success-right right" v-if="lookData.length">
      <div class="see-more">
        <span class="left look">随便看看</span>
        <span class="right batch">换一批</span>
      </div>
      <div class="lookAround">
        <div class="look-item left" v-for="item in lookData">
          <router-link :to="{path: '/detail', query: {product_id: item.product_id}}">
            <div class="item-wrapper">
              <div class="look-pic"></div>
              <div class="look-des">{{item.product_name}}</div>
              <div class="look-price"><span>{{item.product_price}}</span>仓豆</div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  export default{
    data(){
      return {
        lookData: ''
      }
    },
    created(){
      this.$store.dispatch('get_userInfo_dynamic', {user_id: this.userInfo.user_id});
      this.$http.get('/api/commodity/randCommodity.do', {params: {product_id: this.$route.query.product_id}}).then(response => {
        this.lookData = response.body.list;
        console.log(this.lookData)
      });
    },
    computed: {
      ...mapState([
        'userInfo'
      ]),
      type(){
        let queryData = this.$route.query;
        if (queryData.product_type === 'entity') {
          return 1
        } else {
          return 0
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "success.styl";
</style>
