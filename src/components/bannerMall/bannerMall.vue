<template>
  <div class="banner-wrap">
    <swiper :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper">
      <!-- slides -->
      <swiper-slide v-for="str in listImg" :style="{ backgroundImage: 'url(' + str.picUrl + ')' }"
                    :key="str.id"></swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev">
      </div>
      <div class="swiper-button-next" slot="button-next">
      </div>
    </swiper>
  </div>
</template>

<script>
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';
  export default {
    data () {
      return {
        listImg: [],
        notNextTick: true,
        swiperOption: {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
        }
      }
    },
    created(){
      this.$http.get(this.cjx + '/banner/bannerList.do', {params: {product_id: this.$route.query.product_id}}).then(response => {
        this.listImg = response.body;
      });
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped="">
  @import "bannerMall.styl";
</style>


