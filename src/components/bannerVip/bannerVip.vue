<template>
  <div class="bannerVip-wrapper">
    <!--悬浮浮层-->
    <div class="mask-wrap">
      <div class="mask-content right" v-if="!rightShow">
        <div class="mask-layer"></div>
        <!--1.已经登录-->
        <div class="mask-login" v-if="logged">
          <!-- 签到浮层 -->
          <div class="sign-pop-up shadow">
            <div class="sign-pop-close">
              <span class="icon-close"></span>
            </div>
            <div class="sign-pop-title">
              <span class="icon-right"></span>
              签到成功！成长值＋2

            </div>
            <div class="sign-app-2wm">
              <img src="./qmc-wx-2wm.png" width="110" height="110" alt="app二维码">
              <p>手机扫描下载钱满仓APP</p>
            </div>
            <div class="sign-pop-hint">
              <span>温馨提示：</span>
              钱满仓APP签到每日成长值+2，连续签到有惊喜哦~

            </div>
          </div>
          <div class="login-title">
            <span class="left userName">Hi,139****0000</span>
            <a class="right signIn" href="javascript:;">
              <span class="icon-sign"></span>签到赢福利
            </a>
          </div>
          <div class="login-avatar">
            <img src="./W-Avatar.png" alt="女头像" width="86" height="86">
          </div>
          <div class="login-case">
            <p class="growthValue left">
              成长值：<span>150</span>
            </p>
            <p class="warehouseBean right">
              仓豆：<span>100</span>
              <span class="icon-question"></span>
              <span class="bean-hint">仓豆可在仓豆商城兑换奖品哦~</span>
            </p>
          </div>
          <div class="mine-equity">
            <div class="equityTitle">
              <span class="left">我的权益</span>
              <a href="javascript:;" class="right">全部会员权益</a>
            </div>
            <div class="equityShow">
              <div class="equityShow-ul">
                <ul :style="{marginLeft:marginLeft+'px'}">
                  <li class="left" v-for="item in equity">
                    <a href="javascript:;">
                      <div class="equity-item">
                        <div class="equityImg">
                          <span class="hasEquity" :class="item.iconClass"></span>
                        </div>
                        <div class="equityName">{{item.equityName}}</div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="equityMore-left">
                <a href="javascript:;">
                  <span class="icon-equityMore-left" @click="equityPrevMore" v-show="prevShow"></span>
                </a>
              </div>
              <div class="equityMore-right">
                <a href="javascript:;">
                  <span class="icon-equityMore-right" @click="equityNextMore" v-show="nextShow"></span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <!--2.没有登录-->
        <div class="mask-noLogin" v-if="!logged">
          <div class="login-title">Hi,欢迎来到钱满仓会员中心！</div>
          <div class="login-avatar">
            <img src="./noLogin-Avatar.png" alt="未登录" width="86" height="86">
          </div>
          <div class="Login-prompt">
            <p class="promptText">登录查看我的等级</p>
            <p class="promptBtn">
              <router-link :to="{ path: '/login',query:{where:'Vip'}}">立即登录</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!--徽章-->
    <div class="user-badge">
      <div class="badge-content" v-if="!rightShow && logged">
        <div class="badge-list">
          <ul>
            <li class="badge-item left" :class="[badgeType,index==grade-1?'activeType':'']"
                v-for="(badgeType,index) in badgeLight">
              <p class="badgeGrade">LV{{index + 1}}</p>
            </li>
          </ul>
        </div>
        <div class="badge-hint">
          <p class="hint">再积累500成长值即可  升级为“LV{{grade + 1}}” </p>
          <p class="goUpData"><a href="https://www.qianmancang.com/loan-list">马上升级</a></p>
        </div>
      </div>
      <img src="./bannerVip-noLogin.png" alt="" width="637" height="118" v-if="!logged" class="noLoginIMG">
      <div class="card-wrap" v-if="rightShow">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in cards">
              <i :class="item.iconClass"></i>
              <h3 class="name">{{item.name}}</h3>
              <p class="rightText">{{item.right}}</p>
              <p class="desc">{{item.desc}}</p>
            </div>
          </div>
        </div>
        <!-- Add Arrows -->
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';
  const LENGTH = 8;
  const CLS_Gray = 'badgeTypeGray';
  const CLS_Light = 'badgeTypeLight';
  export default {
    data() {
      return {
        badgeType: false,
        grade: 3,
        hasCrown: false,
        logged: true,
        cards: [
          {
            iconClass: 'icon-cake', name: '生日加息', right: '1%加息券', desc: '生日当天发放，有效期N天' +
          '无投资限制'
          },
          {
            iconClass: 'icon-cake', name: '生日加息', right: '1%加息券', desc: '生日当天发放，有效期N天' +
          '无投资限制'
          },
          {
            iconClass: 'icon-cake', name: '生日加息', right: '1%加息券', desc: '生日当天发放，有效期N天' +
          '无投资限制'
          },
          {
            iconClass: 'icon-cake', name: '生日加息', right: '1%加息券', desc: '生日当天发放，有效期N天' +
          '无投资限制'
          },
          {
            iconClass: 'icon-cake', name: '生日加息', right: '1%加息券', desc: '生日当天发放，有效期N天' +
          '无投资限制'
          }
        ],
        equity: [
          {iconClass: 'icon-rockets', equityName: '仓豆加速'},
          {iconClass: 'icon-cake', equityName: '生日好礼'},
          {iconClass: 'icon-cup', equityName: '升级礼包'},
          {iconClass: 'icon-gift', equityName: '节日福利'},
          {iconClass: 'icon-microphone', equityName: '高端沙龙'},
          {iconClass: 'icon-discount', equityName: '费用折扣'},
          {iconClass: 'icon-customer-service', equityName: '专属客服'},
          {iconClass: 'icon-Diamond-2', equityName: '专享订制标'},
          {iconClass: 'icon-balloon', equityName: '活动福利'}
        ],
        marginLeft: '',
        prevShow: false,
        nextShow: true
      }
    },
    methods: {
      equityNextMore(){
        if (this.marginLeft == -325) {
          this.nextShow = true;
          this.marginLeft = -325;
        } else {
          if (this.marginLeft == -260) {
            this.nextShow = false;
          } else {
            this.nextShow = true;
          }
          this.prevShow = true;
          this.marginLeft = this.marginLeft - 65;
        }
      },
      equityPrevMore(){
        if (this.marginLeft == 0) {
          this.prevShow = true;
          this.marginLeft = 0;
        } else {
          if (this.marginLeft == -65) {
            this.prevShow = false;
          } else {
            this.prevShow = true;
          }
          this.nextShow = true;
          this.marginLeft = this.marginLeft + 65;
        }
      }
    },
    computed: {
      badgeLight() {
        let result = [];
        for (let i = 0; i < this.grade; i++) {
          result.push(CLS_Light);
        }
        while (result.length < LENGTH) {
          result.push(CLS_Gray);
        }
        console.log(result, 122333);
        return result;
      },
      rightShow() {
        if (this.logged) {
          if (this.$route.path.indexOf('right') > -1) {
            return true;
          }
        }
      },
    },
    mounted() {
      //console.log('mounted', this);
      var swiper = new Swiper('.swiper-container', {
        paginationClickable: true,
        spaceBetween: 10,
        slidesPerView: 4,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
      });
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "bannerVip.styl";
</style>
