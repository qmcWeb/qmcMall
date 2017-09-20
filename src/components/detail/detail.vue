<template>
  <div class="detail-wrapper">
    <v-crumbsBar></v-crumbsBar>
    <v-errorLayer></v-errorLayer>
    <div class="product-intro" v-if="name">
      <div class="preview-top">
        <div class="preview-img left">
          <img src="" alt="">
        </div>
        <div class="preview-des right">
          <div class="goods-title">{{name}}</div>
          <div class="goods-summary">{{desc}}</div>
          <div class="goods-features"></div>
          <div class="goods-price">
            售价：<span class="goods-cangdou">{{beans}}</span>仓豆<span>市场价：{{price}}元</span>
          </div>
          <div class="goods-number">
            数量：<span class="goods-amount icon-reduce" @click="reduceNum()"></span>
            {{ count }}
            <span class="goods-amount icon-add" @click="addNum()"></span>
            <span>库存<b>{{inventory}}</b>件</span>

          </div>
          <div class="goods-btn">
            <a href="javascript:;" @click="exchange">立即兑换</a>
          </div>
          <div class="goods-tips">该商品由京东自营负责发货，并提供售后服务。</div>
        </div>
      </div>
      <div class="preview-center">
        <div class="preview-details left">
          <div class="details-title">商品详情</div>
          <div class="details-pic"></div>
          <div class="details-tips">
            <p class="tips-title">兑换须知</p>
            <p></p>
          </div>
        </div>
        <div class="preview-recommended right" v-if="promotion.length">
          <div class="recommended-title">
            <div class="line"></div>
            <div class="text">优品推荐</div>
            <div class="line"></div>
          </div>
          <div class="recommended" v-for="item in promotion">
              <div class="recommended-img left">
                <img src="" alt="">
              </div>
              <div class="recommended-desc right">
                <div class="info-title">{{item.product_name}}</div>
                <div class="info-price"><span>{{item.product_price}}</span>仓豆</div>
                <div class="info-num">库存：{{item.inventory}}</div>
              </div>
          </div>
        </div>
        <div class="preview-history left" v-if="history.length">
          <div class="history-title">最近看过</div>
          <div class="history-clear">清空浏览记录</div>
          <div class="history-wrapper">

            <a href="javascript:;" v-for="item in history">
              <div class="history-item">
                <div class="item-pic"></div>
                <div class="item-desc">{{item.product_name}}</div>
                <div class="item-price"><span>{{item.product_price}}</span>仓豆</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import  crumbsBar from  '@/components/crumbsBar/crumbsBar'
  import  errorLayer from  '@/components/errorLayer/errorLayer'
  import  LStorage from '@/common/js/LStorage'
  export default {
    data() {
      return {
        count: 1,
        errorCon: 'Vx级以上会员才能兑换该商品哦，<a href="baidu">快去看看如何升级吧</a>',
        errorType: 'lessBeans',
        errorlayerSHow: false,
        name: '',
        desc: '',
        beans: '',
        price: '',
        inventory: '',
        totalBeans: '',
        history: [],
        promotion: [],
      }
    },
    computed: {
      userInfo() {
        return this.$store.state.userInfo
      }
    },
    created() {
      let good = this;
      this.$store.dispatch('req_detailData', this.$route.query.product_id).then(
        (value) => {
          //商品详情
          good.goodInfoData = value.detail;
          //浏览历史
          good.history = value.history;
          //商品推介
          good.promotion = value.promotion;
          good.name = good.goodInfoData.product_name;
          good.desc = good.goodInfoData.synopsis_info;
          good.beans = good.goodInfoData.product_price;
          good.price = good.goodInfoData.selling_price;
          good.inventory = good.goodInfoData.inventory;
          good.totalBeans = good.beans * good.count
        },
        (err) => {
          console.log(err)
        }
      )
    },
    methods: {
      reduceNum() {
        if (this.count <= 1) {
          return false;
        }
        this.count--;
      },
      addNum() {
        if (this.count >= 5) {
          return false;
        }
        this.count++;
      },
      exchange() {
        let good = this;
        if (good.count > good.inventory) {
          this.$store.dispatch('set_error', {errorCon: '很抱歉，库存数量不足，我们将尽快补货 ^_^', errorType: 'normal'})
          return false
        }
        if (good.beans * good.count > this.userInfo.cd_money) {
          this.$store.dispatch('set_error', {errorCon: '仓豆不够啦 >_<', errorType: 'lessBeans'})
          return false
        }
        good.goodInfoData.goodCount = good.count;
        LStorage.setItem('goodInfoData', good.goodInfoData)
        this.$router.push({path: '/order', query: {product_id: good.$route.query.product_id}})
      }
    },
    components: {
      'v-crumbsBar': crumbsBar,
      'v-errorLayer': errorLayer,
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "detail.styl";
</style>



