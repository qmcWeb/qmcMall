<template>
  <div class="list-wrapper">
    <v-crumbsBar></v-crumbsBar>
    <v-selector @listenChild="fromChildMes"></v-selector>
    <ul class="goodList-wrap">
      <li v-for="item in list">
        <v-good :item="item"></v-good>
      </li>
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
        "list": [
          {
            "id": "1",
            "sell_id": "2",
            "product_price": "5",
            "selling_price": 1.0,
            "product_name": "1"
          },
          {
            "id": "10",
            "sell_id": "3",
            "product_price": "565",
            "selling_price": 1.0,
            "product_name": "1"
          },
          {
            "id": "11",
            "sell_id": "1",
            "product_price": "3",
            "selling_price": 1.0,
            "product_name": "1"
          },
          {
            "id": "12",
            "sell_id": "1",
            "product_price": "3",
            "selling_price": 1.0,
            "product_name": "1"
          },
          {
            "id": "2",
            "sell_id": "3",
            "product_price": "66",
            "selling_price": 1.0,
            "product_name": "1"
          },
          {
            "id": "23",
            "product_price": "5",
            "selling_price": 1.0,
            "product_name": "iPhone八"
          },
          {
            "id": "3",
            "sell_id": "3",
            "product_price": "44",
            "selling_price": 1.0,
            "product_name": "未人"
          },
          {
            "id": "4",
            "sell_id": "2",
            "product_price": "33",
            "selling_price": 1.0,
            "product_name": "裤子"
          },
          {
            "id": "5",
            "sell_id": "3",
            "product_price": "6555",
            "selling_price": 1.0,
            "product_name": "速度发顺丰"
          },
          {
            "id": "6",
            "sell_id": "2",
            "product_price": "343",
            "selling_price": 1.0,
            "product_name": "1"
          },
          {
            "id": "7",
            "sell_id": "1",
            "product_price": "34",
            "selling_price": 1.0,
            "product_name": "1"
          },
          {
            "id": "8",
            "sell_id": "2",
            "product_price": "655",
            "selling_price": 1.0,
            "product_name": "1"
          },
          {
            "id": "9",
            "sell_id": "1",
            "product_price": "5",
            "selling_price": 1.0,
            "product_name": "iPhone八"
          }
        ]
      }
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


