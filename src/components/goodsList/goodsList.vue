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
  export default {
    data (){
      return {
        list: [],
        paramsSession: {}
      }
    },
    created() {
      //进来获取session
      this.paramsSession = JSON.parse(sessionStorage.paramsMsg);
      this.$http.get('/api/commodity/screenOrderCommodityList.do', {params: this.paramsSession}).then(response => {
        this.list = response.body.list
      });
    },
    components:{
      'v-crumbsBar':crumbsBar,
      'v-selector':selector,
      'v-paging':paging,
      'v-good': good
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      paramsSession: function (val, oldVal) {
        this.getMsg(this.paramsSession)
      },
      '$route': 'routeChange'
    },
    methods: {
      getMsg(msg) {
        //收到子组件的data，ajax请求回调改版items，从而改变用户选择的列表
        let data = msg
        this.$http.get(
          '/api/commodity/screenOrderCommodityList.do',
          {params: data}
        ).then(response => {
          this.list = response.body.list;
          console.log(this.list,'goodList');
        });
      },
      routeChange(){
        this.paramsSession = JSON.parse(sessionStorage.paramsMsg);
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "goodsList.styl";
</style>


