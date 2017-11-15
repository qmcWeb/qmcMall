<template>
  <div class="bannerVip-wrapper">
    <div>
      <!--没有登录-->
      <div class="mask-wrap" v-if="noLogged">
        <div class="bannerVip-left left">
          <img src="./bannerVip-noLogin.png" alt="" width="637" height="118" style="margin: 93px 0 0 81px;"
               class="noLoginIMG">
        </div>
        <div class="mask-content right">
          <div class="mask-layer"></div>
          <!--2.没有登录-->
          <div class="mask-noLogin">
            <div class="login-title">Hi,欢迎来到钱满仓会员中心！</div>
            <div class="login-avatar">
              <img src="./noLogin-Avatar.png" alt="未登录" width="86" height="86">
            </div>
            <div class="Login-prompt">
              <p class="promptText">登录查看我的等级</p>
              <p class="promptBtn">
                <router-link :to="{ path: '/login',query:{redirect: this.$route.fullPath}}">立即登录</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <!--已经登录普通-->
      <div class="mask-wrap" v-if="dynamic && !rightShow">
        <div class="bannerVip-left left">
          <div class="badge-content">
            <div class="badge-list">
              <ul>
                <li class="badge-item left" :class="[badgeType,index==dynamic.level-1?'activeType':'']"
                    v-for="(badgeType,index) in badgeLight">
                  <p class="badgeGrade">LV{{index + 1}}</p>
                </li>
              </ul>
            </div>
            <div class="badge-hint">
              <p class="hint">再积累{{dynamic.next_growth_value}}成长值即可  升级为“LV{{dynamic.level + 1}}” </p>
              <p class="goUpData"><a href="https://www.qianmancang.com/loan-list">马上升级</a></p>
            </div>
          </div>
        </div>
        <div class="mask-content right">
          <div class="mask-layer"></div>
          <div class="mask-login">
            <!-- 签到浮层 -->
            <div class="sign-pop-up shadow" v-show="signShow">
              <div class="sign-pop-close">
                <span class="icon-close" @click="signPopUpHide"></span>
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
              <span class="left userName">Hi,{{userInfo.realname}}</span>
              <p class="right signIn" @click="signPopUpShow" v-if="whetherSign.noSign">
                <span class="icon-sign"></span>签到赢福利
            </p>
              <p class="right signIn signOver" v-if="whetherSign.signed">
                <span class="icon-sign"></span>今日已签到
            </p>
            </div>
            <div class="login-avatar">
              <img src="./W-Avatar.png" alt="女头像" width="86" height="86">
            </div>
            <div class="login-case">
              <p class="growthValue left">
                成长值：<span>{{dynamic.growth_value}}</span>
              </p>
              <p class="warehouseBean right">
                仓豆：<span>{{dynamic.cd_money}}</span>
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
                    <li class="left" v-for="item in dynamic.privileges">
                      <a href="javascript:;">
                        <div class="equity-item">
                          <div class="equityImg">
                            <span class="hasEquity" :class="item.iconClass"></span>
                          </div>
                          <div class="equityName">{{item.privilege_name_ty}}</div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="equityMore-left" v-if="dynamic.privileges.length>4">
                  <a href="javascript:;">
                    <span class="icon-equityMore-left" @click="equityPrevMore" v-show="prevShow"></span>
                  </a>
                </div>
                <div class="equityMore-right" v-if="dynamic.privileges.length>4">
                  <a href="javascript:;">
                    <span class="icon-equityMore-right" @click="equityNextMore" v-show="nextShow"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--已经登录权益-->
      <div class="mask-wrap" v-if="dynamic && rightShow">
        <div class="card-wrap">
          <swiper :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper">
            <!-- slides -->
            <swiper-slide v-for="item in dynamic.privileges" :key="item.id">
              <i :class="item.iconClass"></i>
              <h3 class="name">{{item.privilege_name_ty}}</h3>
              <!-- <p class="rightText" v-if="item.privilege_name_ty==='仓豆加速'">{{dynamic.cdjs}}倍</p>
               <p class="rightText" v-if="item.privilege_name_ty==='生日好礼'">{{dynamic.srhl}}%</p>
               <p class="rightText" v-if="item.privilege_name_ty==='升级礼包'">{{dynamic.sjlb}}成长值</p>-->
              <p class="rightText">{{item.p_value}}</p>

              <p class="desc">{{item.privilege_info}}</p>
            </swiper-slide>
          </swiper>
          <!-- Optional controls -->
          <div class="swiper-button-prev" slot="button-prev">
          </div>
          <div class="swiper-button-next" slot="button-next">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';
  import {mapState} from 'vuex'
  const LENGTH = 8;
  const CLS_Gray = 'badgeTypeGray';
  const CLS_Light = 'badgeTypeLight';
  export default {
    data() {
      return {
        notNextTick: true,
        swiperOption: {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          slidesPerView: 4,
          spaceBetween: 10,
        },
        badgeType: false,
        hasCrown: false,
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
        nextShow: true,
        signShow: false,
        noSign: true
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
      },
      signPopUpShow(){
        this.$http.get(this.cjx + '/Associator_center/signDay.do', {params: {user_id: this.userInfo.user_id}}).then(response => {
          if (response.body.message !== '成功') {
            this.signShow = true;
            this.noSign = false;
          }
          console.log(response.body);
        });

      },
      signPopUpHide(){
        this.signShow = false;
        this.whetherSign.signed = true;
        this.whetherSign.noSign = false;
      }
    },
    computed: {
      badgeLight() {
        let result = [];
        for (let i = 0; i < this.dynamic.level; i++) {
          result.push(CLS_Light);
        }
        while (result.length < LENGTH) {
          result.push(CLS_Gray);
        }
        return result;
      },
      rightShow() {
        if (this.$route.path.indexOf('right') > -1) {
          return true;
        } else {
          return false
        }
      },
      ...mapState([
        'userInfo', 'IsLogged', 'dynamic', 'noLogged'
      ]),
      whetherSign(){
        let obj = {signed: false, noSign: false}
        if (this.dynamic.sign === '已签到') {
          obj.signed = true;
          obj.noSign = false;
        } else {
          obj.signed = false;
          obj.noSign = true;
        }
        return obj
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "bannerVip.styl";
</style>
