<template>
  <div class="success-wrapper">
    <div class="success-left left">
      <div class="success-hint">
        <p class="hint1">
          <img src="" alt="">
          兑换成功，商品已达…
        </p>
        <p class="hint2">本次兑换成功<span>+50</span>成长值</p>
        <p class="hint3">使用有疑问？您可在订单详情中查看具体使用说明。</p>
      </div>
      <div class="success-btn">
        <a href="javascript:;" class="left">查看订单详情</a>
        <router-link :to="{ path: '/' }" class="right">返回商城首页</router-link>
      </div>
    </div>
    <div class="success-right right">
      <div class="see-more">
        <span class="left look">随便看看</span>
        <span class="right batch">换一批</span>
      </div>
      <div class="lookAround">
        <div class="look-item left">
          <a href="javascript:;">
            <div class="item-wrapper">
              <div class="look-pic"></div>
              <div class="look-des">免费提现券</div>
              <div class="look-price"><span>1360</span>仓豆</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "success.styl";
</style>
