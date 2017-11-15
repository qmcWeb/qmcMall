<template>
  <div class="curmbsBar-wrapper" v-if="curmbsBarShow">
    <span class="icon-currentPosition"></span>仓豆商城 <i> > </i>
    <span v-if="listTxtShow">商品列表</span>
    <span v-if="detailTxtShow">商品详情</span>
  </div>
</template>

<script>
  export default{
    data() {
      return {
        curmbsBarShow: false,
        listTxtShow: false,
        detailTxtShow: false
      }
    },
    created() {
      this.getPath()
    },
    methods: {
      getPath() {
        let PATH = this.$route.path;
        if (/detail|goodsList/.test(PATH)) {
          this.curmbsBarShow = true
        }
        if (/goodsList/.test(PATH)) {
          this.listTxtShow = true
          this.detailTxtShow = false
        }
        if (/detail/.test(PATH)) {
          this.listTxtShow = false
          this.detailTxtShow = true
        }
      }
    },
    watch: {
      '$route': 'getPath'
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .curmbsBar-wrapper
    margin: 0 auto;
    width: 1200px;
    line-height: 44px;
    font-size: 12px;
    color: #264C65;
    i
      font-style: normal
    span
      color: #9FA3A7;
    .icon-currentPosition
      color: #264C65
      font-size 17px
      margin-right 3px
</style>


