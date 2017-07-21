<template>
  <div class="home-wrapper">
    <v-banner></v-banner>
    <v-goods></v-goods>
  </div>

</template>

<script>
  import  banner from  '@/components/banner/banner'
  import  goods from  '@/components/goods/goods'
  export default {
    components:{
        'v-banner':banner,
        'v-goods':goods
    }
  }
</script>

<style>

</style>


