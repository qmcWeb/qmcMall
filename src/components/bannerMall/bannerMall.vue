<template>
  <div class="banner-wrap">
    <swiper :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper">
      <!-- slides -->
      <swiper-slide v-for="str in listImg" :style="{ backgroundImage: 'url(' + str.picUrl + ')' }"
                    :key="str.id"></swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>

    </swiper>
    <div class="limit">
      <div class="swiper-button-prev " slot="button-prev">
      </div>
      <div class="swiper-button-next" slot="button-next">
      </div>
    </div>
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
  .swiper-button-prev, .swiper-button-next
    top: 188px;

  .swiper-button-prev
    background url(./left.png)
    left -100px
    width 40px;
    height 67px

  .swiper-button-next
    right -100px
    background url(./right.png)
    width 40px;
    height 67px

</style>
<style lang="stylus" rel="stylesheet/stylus">
  .swiper-pagination-bullet
    width 12px;
    height 12px;
    background #fff
    opacity 0.6

  .swiper-pagination-bullet-active
    background #000 !important
    opacity 0.6 !important
</style>



