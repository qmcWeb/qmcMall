<template>
  <div class="list-wrapper">
    <v-crumbsBar></v-crumbsBar>
    <v-selector></v-selector>
    <div v-if="list.length">
      <ul class="goodList-wrap">
        <li v-for="item in list">
          <v-good :item="item"></v-good>
        </li>
        <li class="clearBoth"></li>
      </ul>
      <v-paging></v-paging>
    </div>
    <div v-if="blank" class="blank">
      未找到符合条件的商品

    </div>
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
        console.log(this.$store.state.listData)
        return this.$store.state.listData
      },
      blank() {
        return this.$store.state.blank
      },
    },
    created() {

    },
    components: {
      'v-crumbsBar': crumbsBar,
      'v-selector': selector,
      'v-paging': paging,
      'v-good': good
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "goodsList.styl";
</style>


