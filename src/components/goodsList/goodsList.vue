<template>
  <div class="list-wrapper">
    <v-crumbsBar></v-crumbsBar>
    <v-selector @listenChild="fromChildMes"></v-selector>
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
        list: []
      }
    },
    created() {
      this.$http.get('/api/commodity/screenOrderCommodityList.do').then(response => {
        // get body data
        this.list = response.body.list;
      }, response => {
        // error callback
        console.log(response);
      });
    },
    components:{
      'v-crumbsBar':crumbsBar,
      'v-selector':selector,
      'v-paging':paging,
      'v-good': good
    },
    methods: {
      fromChildMes(data) {
        console.log(data)
        //收到子组件的data，ajax请求回调改版items，从而改变用户选择的列表
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "goodsList.styl";
</style>


