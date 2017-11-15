<template>
  <div class="detail-wrapper">
    <v-crumbsBar></v-crumbsBar>
    <v-errorLayer></v-errorLayer>
    <div class="product-intro" v-if="name">
      <div class="preview-top">
        <div class="preview-img left">
          <img :src="picture_url" alt="">
        </div>
        <div class="preview-des right">
          <div class="goods-title">{{name}}</div>
          <div class="goods-summary">{{product_synopsis}}</div>
          <div class="goods-features">
            <span>正品保证</span>
            <span>售后服务</span>
            <span>极速发货</span>
            <span>免邮费</span>
          </div>
          <div class="goods-price">
            售价：<span class="goods-cangdou">{{beans}}</span>仓豆<span>市场价：{{price}}元</span>
          </div>
          <div class="goods-number">
            数量：<span :class="['goods-amount','icon-reduce',min?'min':'']" @click="reduceNum()"></span>
            {{ count }}
            <span :class="['goods-amount','icon-add']" @click="addNum()"></span>
            <span>库存<b>{{inventory}}</b>件</span>

          </div>
          <div class="goods-btn">
            <a href="javascript:;" @click="exchange" v-if="inventory>0">立即兑换</a>
            <a href="javascript:;" class="soldOut" v-else>已售罄</a>
          </div>
          <div class="goods-tips">该商品由{{merchantName}}提供</div>
        </div>
      </div>
      <div class="preview-center">
        <div class="preview-details left">
          <div class="details-title">商品详情</div>
          <div class="details-pic" v-html="details_info"></div>
          <div class="details-tips">
            <p class="tips-title">兑换须知</p>
            <div v-html="conversion_info" class="convertibleTxt"></div>
          </div>
        </div>
        <div class="preview-recommended right" v-if="promotion.length">
          <div class="recommended-title">
            <div class="line"></div>
            <div class="text">优品推荐</div>
            <div class="line"></div>
          </div>
          <router-link v-for="item in promotion" :to="{path: '/detail', query: {product_id: item.product_id}}"
                       :key="item.id" class="recommended">
              <div class="recommended-img left">
                <img :src="item.picture_url" alt="">
              </div>
              <div class="recommended-desc right">
                <div class="info-title">{{item.product_name}}</div>
                <div class="info-price"><span>{{item.product_price}}</span>仓豆</div>
                <div class="info-num">库存：{{item.inventory}}</div>
              </div>
          </router-link>
        </div>
        <div class="preview-history left" v-if="history.length">
          <div class="history-title">最近看过</div>
          <div class="history-clear" @click="deleteHistory">清空浏览记录</div>
          <div class="history-wrapper">
            <router-link v-for="item in history" :to="{path: '/detail', query: {product_id: item.product_id}}"
                         :key="item.id">
              <div class="history-item">
                <div class="wrap">
                  <div class="item-pic">
                    <img :src="item.picture_url" alt="">
                  </div>
                  <div class="item-desc">{{item.product_name}}</div>
                  <div class="item-price"><span>{{item.product_price}}</span>仓豆</div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import  crumbsBar from  '@/components/crumbsBar/crumbsBar'
  import  errorLayer from  '@/components/errorLayer/errorLayer'
  import LStorage from '@/common/js/LStorage'
  import {mapState} from 'vuex'
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
        merchantName: '',
        inventory: '',
        totalBeans: '',
        level_limits: '',
        history: [],
        promotion: [],
        recordInfo: {count: 1, product_type: ''},
        product_type: '',
      }
    },
    computed: {
      ...mapState([
        'userInfo', 'IsLogged', 'dynamic'
      ]),
      min(){
        if (this.count <= 1) {
          return true;
        } else {
          return false;
        }
      }
    },
    watch: {
      // 如果路由有变化，执行该方法
      '$route': 'reqProInfo'
    },
    created() {
      this.reqProInfo()
    },
    methods: {
      //根据productid请求商品信息
      reqProInfo(){
        let good = this;
        var userID;
        good.name = ''
        this.userInfo ? userID = this.userInfo.user_id : userID = '';
        this.$store.dispatch('req_detailData', {proId: this.$route.query.product_id, user: userID}).then(
          (value) => {
            //商品详情
            good.goodInfoData = value.detail;
            console.log(value.detail)
            //浏览历史
            good.history = value.history;
            console.log(value.history)
            //商品推介
            good.promotion = value.promotion;
            console.log(value.promotion)
            good.name = good.goodInfoData.product_name;
            good.merchantName = good.goodInfoData.merchantName;
            good.level_limits = good.goodInfoData.level_limits;
            good.product_synopsis = good.goodInfoData.product_synopsis;
            good.beans = good.goodInfoData.product_price;
            good.picture_url = good.goodInfoData.picture_url;
            good.details_info = good.goodInfoData.details_info;
            good.conversion_info = good.goodInfoData.conversion_info;
            good.price = good.goodInfoData.selling_price;
            good.inventory = good.goodInfoData.inventory;
            good.totalBeans = good.beans * good.count
            good.product_type = good.goodInfoData.product_type;
            good.purchase_limitation = good.goodInfoData.purchase_limitation;
            good.userPurchasedCount = good.goodInfoData.userPurchasedCount;
          },
          (err) => {
            console.log(err)
          }
        )
      },
      reduceNum() {
        if (this.count <= 1) {
          return
        }
        this.count--;
      },
      addNum() {
        this.count++;
      },
      goVip(){
        this.$router.push({
          path: '/homeVip',
        })
      },
      exchange() {
        let good = this;
        if (!good.IsLogged) {
          this.$store.dispatch('set_error', {errorCon: '请先登录， 即可兑换心仪商品', errorType: 'Nologged'})
          return false
        }
        if (good.count > good.inventory) {
          this.$store.dispatch('set_error', {errorCon: '很抱歉，库存数量不足，我们将尽快补货 ^_^', errorType: 'normal'})
          return false
        }
        if (good.beans * good.count > this.dynamic.cd_money) {
          this.$store.dispatch('set_error', {errorCon: '仓豆不够啦 >_<', errorType: 'lessBeans'})
          return false
        }
        console.log(this.userPurchasedCount)
        if ((this.userPurchasedCount - 0) + (this.count - 0) > this.purchase_limitation) {
          this.$store.dispatch('set_error', {
            errorCon: '该商品每人限兑 ' + this.purchase_limitation + ' 件哦 ^_^',
            errorType: 'normal'
          })
          this.orderLayerShow = !this.orderLayerShow
          return false
        }
        if (good.level_limits > this.dynamic.level) {
          this.$store.dispatch('set_error', {
            errorCon: 'Vx级以上会员才能兑换该商品哦，<a href="javascript:;" @click="goVip">快去看看如何升级吧</a>',
            errorType: 'normal'
          })
          return false
        }
        //记录购买仓豆数量

        this.$router.push({
          path: '/order',
          query: {product_id: good.$route.query.product_id, count: this.count, product_type: this.product_type}
        })
      },
      deleteHistory(){
        this.$http.post(this.api + '/commodity/clearBrowsingHistory.do', {user_id: this.userInfo.user_id}).then(response => {
          this.history = [];
        }, response => {
          console.log(response)
        });
      }
    },
    components: {
      'v-crumbsBar': crumbsBar,
      'v-errorLayer': errorLayer,
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped="">
  @import "detail.styl";
</style>
<style lang="stylus" rel="stylesheet/stylus">
  .convertibleTxt
    color: #92979B
    line-height 26px;
</style>



