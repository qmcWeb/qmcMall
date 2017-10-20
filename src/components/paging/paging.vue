<template>
  <div class="page-wrap">
    <ul>
      <li v-for="item in pageNumber">
        <a href="javascript:;" @click="query(item)" :class="pageNo==item?'active':''">{{item}}</a>
      </li>
      {{this.pageNumber}}

      <li>
        <a href="javascript:;" @click="query('end')" :class="pageNo=='end'?'active':''">尾页</a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default{
    computed: {
      pageNumber() {
        return this.$store.state.pageNumber
      },
      pageNo(){
        return this.$route.query.pageNo
      }
    },
    methods: {
      query(num){
        console.log(num)
        let _query = Object.assign(this.$route.query, {pageNo: num, pageSize: 2});
        console.log(_query)
        //神奇的傻逼
        this.$router.push({
          path: '/goodsList',
          query: {
            type: this.$route.query.type,
            price: this.$route.query.price,
            sort: this.$route.query.sort,
            priceMin: this.$route.query.priceMin,
            priceMax: 1000000
          }
        })
        //傻逼结束
        this.$router.push({
          path: '/goodsList',
          query: _query
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .page-wrap
    overflow auto
    margin: 0 auto 30px
    width: 1200px;
    ul
      float right
      font-size: 0
      li
        margin-right: 10px;
        display: inline-block
        &:last-child
          margin 0
        a
          display block
          width 50px;
          height 30px;
          line-height 30px;
          text-align: center
          color: #264C65
          background: #F9F9F9;
          border-radius: 5px;
          font-size: 14px;
          &.active
            background: #264C65;
            color: #F9F9F9


</style>


