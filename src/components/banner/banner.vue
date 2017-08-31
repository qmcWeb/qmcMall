<template>
  <div class="swiper-container">
  <div class="swiper-wrapper">
    <div class="swiper-slide" v-for="str in listImg" :style="{ backgroundImage: 'url(' + str.url + ')' }">
    </div>
  </div>
  <div class="swiper-pagination swiper-pagination-white"></div>
</div>
</template>

<script>
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';
  export default {
    data () {
      return {
        listImg: [
          {
            'url': '../../../static/img/banner1.png'
          },
          {
            'url': '../../../static/img/banner2.jpg'
          }, {
            'url': '../../../static/img/banner3.jpg'
          }, {
            'url': '../../../static/img/banner4.jpg'
          },
          {
            'url': '../../../static/img/banner5.jpg'
          }
        ]
      }
    },
    mounted() {
      //console.log('mounted', this);
      var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        loop: true,
        speed: 600,
        autoplay: 4000,
        onTouchEnd: function() {
          swiper.startAutoplay()
        }
      });
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped="">
  @import "banner.styl";
</style>


