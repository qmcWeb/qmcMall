<template>
  <div class="homeVip-wrapper">
    <!--0.banner-->
    <v-banner></v-banner>
    <!--1.等级与权益-->
    <div class="homeVip-grade">
      <div class="homeVip-content">
        <div class="homeVip-title">
          <span class="icon-Diamond-1"></span>
          等级与权益
        </div>
        <!-- 图形 -->
        <div class="grade-course">
          <img src="./grad-circle.png" width="770" height="430" alt="" class="grad-circle">
          <div class="grad-shadow">
            <!--
                        <div class="top-lv"  @mousemove="mMove" @mouseout="mOut"></div>
            -->
            <div class="grad-LV-shadow" :class="'shadow-LV' + level"></div>
          </div>
          <div class="grade-award">
            <div class="grade-award-item" v-for="(item,index) in gradeAward[level-1]">
              <span data-v-7f04ebfa="" :class="[item.iconClass,item.status==='true'?'awardLight':'']"></span>
              <p>{{item.name}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--2.成长任务-->
    <div class="homeVip-growUp">
      <div class="homeVip-content">
        <div class="homeVip-title">
          <span class="icon-task"></span>
          成长任务
          <router-link class="right see-more" :to="{ path: '/taskVip'}">更多》</router-link>
        </div>
        <ul class="growUp-ul">
          <li class="left remove" v-for="(task,index) in growUp">
            <router-link :to="{ path: '/taskVip'}">
              <div class="growUp-li-item1">
                <img :src="growUp[index].src" alt="成长任务" width="132" height="130">
              </div>
              <div class="growUp-li-item2">
                <p class="taskName">{{task.taskName}}</p>
                <p class="taskAward">成长值：<span>{{task.taskAward}}</span></p>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <!--3.仓豆商城-->
    <div class="homeVip-beanMall">
      <div class="homeVip-content">
        <div class="homeVip-title">
          <span class="icon-mall"></span>
          仓豆商城
          <router-link class="right see-more" :to="{ path: '/homeMall'}">去仓豆商城看看》</router-link>
        </div>
        <div class="beanAD left shadow"></div>
        <div class="beanShow right">
          <ul class="beanMall-ul" v-if="beanMall.length">
            <li class="left" v-for="(goods,index) in beanMall">
              <router-link :to="{path: '/detail', query: {product_id: goods.id}}">
                <div class="remove beanMall-li-content shadow">
                  <div class="beanMall-li-item1">
                    <img :src="goods.picture_url" alt="" width="270" height="210">
                  </div>
                  <div class="beanMall-li-item2">
                    <p class="goodsName">{{goods.product_name}}</p>
                    <p class="goodsPrice">仓豆：<span>{{goods.product_price}}</span></p>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!--4.会员帮助-->
    <div class="homeVip-help">
      <div class="homeVip-content">
        <div class="homeVip-title">
          <span class="icon-question"></span>
          会员帮助
        </div>
        <div class="memberHelp left">
          <div class="help-title">
            会员体系 <a class="see-more right" href="javascript:;">更多></a>
          </div>
          <ul>
            <li><a href="javascript:;">1. 如何计算等级？</a></li>
            <li><a href="javascript:;">2. 如何获得成长值？</a></li>
            <li><a href="javascript:;">3. 什么是成长值？</a></li>
            <li><a href="javascript:;">4. 会员权益有哪些？</a></li>
          </ul>
        </div>
        <div class="beanHelp right">
          <div class="help-title">
            仓豆商城 <a class="see-more right" href="javascript:;">更多></a>
          </div>
          <ul>
            <li><a href="javascript:;">1. 什么是仓豆？</a></li>
            <li><a href="javascript:;">2. 仓豆和成长值的关系？</a></li>
            <li><a href="javascript:;">3. 如何获得仓豆？</a></li>
            <li><a href="javascript:;">4. 仓豆加速系数？</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import LStorage from   '@/common/js/LStorage.js';
  import {setCookie, getCookie} from '../../common/js/cookie.js';
  import {mapActions} from 'vuex';
  import {mapState, mapGetters} from 'vuex';
  import  bannerVip from  '@/components/bannerVip/bannerVip'
  const CLS_LIGHT = "haveAward";
  const LENGTH = 9;
  export default{
    data(){
      return {
        level: 1,
        award: 4, //会员获得权益个数
        gradeAward: [],
        growUp:[
          {src: '../../../static/img/growUpTask/growUpTask-1.png',taskName: '新手任务',taskAward:'100'},
          {src: '../../../static/img/growUpTask/growUpTask-2.png',taskName: '互动任务',taskAward:'100'},
          {src: '../../../static/img/growUpTask/growUpTask-3.png',taskName: '投资任务',taskAward:'100+'},
          {src: '../../../static/img/growUpTask/growUpTask-4.png',taskName: '邀请任务',taskAward:'100+'}
        ],
        beanMall: [],

      }
    },
    mounted(){
      this.lvImgAnimate()
    },
    methods: {
      //从本地获取userInfo
      getInfo: function () {
        if (this.userInfo) {
          this.$store.dispatch('get_userInfo_dynamic', {user_id: this.userInfo.user_id})
        }
      },
      lvImgAnimate(){
        let self = this;
        let lvTime = setInterval(function () {
          if (self.level >= 8) {
            self.level = 0
          }
          self.level++
        }, 2000)
      },
      mMove(ev){
      },
      mOut(){

      }
    },
    computed: {
      ...mapState([
        'userInfo', 'dynamic', 'noLogged'
      ]),
      ...mapGetters(['awardArr'])
    },
    created(){
      this.$http.get(this.cjx + '/Privilege_type/getPrivilegeType.do').then(response => {
        this.gradeAward = response.body.levels;
        console.log(this.gradeAward)
      });
      this.$http.get(this.cjx + '/commodity/showCenterList.do').then(response => {
        this.beanMall = response.body.list;
        console.log(this.beanMall)
      });
    },
    components: {
      'v-banner': bannerVip
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "homeVip.styl";
</style>


