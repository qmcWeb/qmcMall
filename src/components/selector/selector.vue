<template>
  <div class="selector-wrap">
    <div class="content">
      <div class="top-wrap">
        <div class="byType">
          <div class="title">
            商品类别：
          </div>
          <a href="javascript:;"  class="all ">全部</a>
          <a href="javascript:;">优惠卡券</a>
          <a href="javascript:;" class="active">健康美食</a>
          <a href="javascript:;">时尚美妆</a>
        </div>
        <div class="byPrice">
          <div class="title">
            商品价格：
          </div>
          <a href="javascript:;" class="all active">全部</a>
          <a href="javascript:;" class="marginR-10">我可兑换</a>
          <div class="widget">
            <i>￥</i>
            <input type="number">
          </div>
          <i class="to">-</i>
          <div class="widget">
            <i>￥</i>
            <input type="number">
          </div>
          <a href="javascript:;" class="sure">确定</a>
        </div>
      </div>
      <div class="bottom-wrap">
        <div class="title">
          排序：
        </div>
        <a href="javascript:;" class="active">默认</a>
        <a href="javascript:;">最新</a>
        <a href="javascript:;">热门</a>
        <a href="javascript:;">价格</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default{}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "selector.styl";

</style>


