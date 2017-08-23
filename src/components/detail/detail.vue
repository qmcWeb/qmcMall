<template>
  <div class="detail-wrapper">
    <div class="product-intro">
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
            {{ result }}
            <span class="goods-amount icon-add" @click="addNum()"></span>
            <span>库存<b>485</b>件</span>
          </div>
          <div class="goods-btn">
            <a href="javascript:;">立即兑换</a>
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
        <div class="preview-recommended right">
          <div class="recommended-title">
            <div class="line"></div>
            <div class="text">优品推荐</div>
            <div class="line"></div>
          </div>
          <div class="recommended">
            <a href="javascript:;">
              <div class="recommended-img left">
                <img src="" alt="">
              </div>
              <div class="recommended-desc right">
                <div class="info-title">御泥坊黑玫瑰矿物蚕丝面膜</div>
                <div class="info-price"><span>5999</span>仓豆</div>
                <div class="info-num">库存：20</div>
              </div>
            </a>
          </div>
        </div>
        <div class="preview-history left">
          <div class="history-title">最近看过</div>
          <div class="history-clear">清空浏览记录</div>
          <div class="history-wrapper">
            <a href="javascript:;">
              <div class="history-item">
                <div class="item-pic"></div>
                <div class="item-desc">小狗家用超静音吸尘器</div>
                <div class="item-price"><span>9990</span>仓豆</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        result: 1

      }
    },
    created() {
      let good = this;
      good.goodInfoData = JSON.parse(sessionStorage.goodInfoData);
      console.log(good.goodInfoData);
      good.name = good.goodInfoData.product_name;
      good.desc = '荷兰进口刀头，性贴面设计，舒适切剃，剃须静音更舒心！';
      good.beans = good.goodInfoData.product_price;
      good.price = good.goodInfoData.selling_price;
    },
    methods: {
      reduceNum() {
        if (this.result <= 1) {
          return false;
        }
        this.result--;
        this.$emit('input', {res: this.result, other: '--'})
      },
      addNum() {
        if (this.result >= 5) {
          return false;
        }
        this.result++;
        this.$emit('input', {res: this.result, other: '++'})
      }

    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "detail.styl";
</style>



