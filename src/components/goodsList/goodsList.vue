<template>
  <div class="list-wrapper">
    <v-crumbsBar></v-crumbsBar>
    <v-selector></v-selector>
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
      return {}
    },
    computed: {
      list() {
        return this.$store.state.listData
      }
    },
    created() {

    },
    components: {
      'v-crumbsBar': crumbsBar,
      'v-selector': selector,
      'v-paging': paging,
      'v-good': good
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
    },
    methods: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "goodsList.styl";
</style>


