<template>
  <div class="list-wrapper">
    <v-crumbsBar></v-crumbsBar>
    <v-selector :paramsSession="paramsSession"></v-selector>
    <ul class="goodList-wrap">
      <li v-for="item in list">
        <v-good :item="item"></v-good>
      </li>
      <li class="clearBoth"></li>
    </ul>
    <v-paging></v-paging>
  </div>

</template>

<script>
  import  selector from  '@/components/selector/selector'
  import  paging from  '@/components/paging/paging'
  import  good from  '@/components/good/good'
  import  crumbsBar from  '@/components/crumbsBar/crumbsBar'
  import LStorage from '@/common/js/LStorage'
  export default {
    data (){
      return {
        list: [],
        paramsSession: {}
      }
    },
    created() {
      //进来获取LStorage
      this.routeChange()
    },
    components: {
      'v-crumbsBar': crumbsBar,
      'v-selector': selector,
      'v-paging': paging,
      'v-good': good
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'routeChange'
    },
    methods: {
      getMsg(msg) {
        this.$http.get('/api/commodity/screenOrderCommodityList.do', {params: msg}).then(response => {
          this.list = response.body.list
        });
      },
      routeChange(){
        this.paramsSession = LStorage.getItem('paramsMsg')
        this.getMsg(this.paramsSession)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "goodsList.styl";
</style>


