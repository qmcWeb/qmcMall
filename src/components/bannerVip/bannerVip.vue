<template>
  <div class="bannerVip-wrapper">
    <!--悬浮浮层-->
    <div class="mask-wrap">
      <div class="mask-content right">
        <div class="mask-layer"></div>
        <!--1.已经登录-->
        <div class="mask-login" v-if="false">
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
            </p>
          </div>
          <div class="mine-equity">
            <div class="equityTitle">
              <span class="left">我的权益</span>
              <a href="javascript:;" class="right">全部会员权益</a>
            </div>
            <div class="equityShow">
              <ul>
                <li class="left">
                  <a href="javascript:;">
                    <div class="equity-item">
                      <div class="equityImg">
                        <span class="icon-rockets hasEquity"></span>
                      </div>
                      <div class="equityName">仓豆加速</div>
                    </div>
                  </a>
                </li>
                <li class="left">
                  <a href="javascript:;">
                    <div class="equity-item">
                      <div class="equityImg">
                        <span class="icon-cake hasEquity"></span>
                      </div>
                      <div class="equityName">生日礼包</div>
                    </div>
                  </a>
                </li>
                <li class="left">
                  <a href="javascript:;">
                    <div class="equity-item">
                      <div class="equityImg">
                        <span class="icon-gift hasEquity"></span>
                      </div>
                      <div class="equityName">节日福利</div>
                    </div>
                  </a>
                </li>
                <li class="left">
                  <a href="javascript:;">
                    <div class="equity-item">
                      <div class="equityImg">
                        <span class="icon-cup hasEquity"></span>
                      </div>
                      <div class="equityName">升级奖励</div>
                    </div>
                  </a>
                </li>
              </ul>
              <div class="equityMore">
                <a href="javascript:;">
                  <span class="icon-rightArrow"></span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <!--2.没有登录-->
        <div class="mask-noLogin" v-if="true">
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
      <div class="badge-content">
        <div class="badge-list">
          <ul>
            <!--<li :style="{ backgroundImage: 'url(' + str.url + ')' }">-->
            <li class="badge-item left" :class="badgeType" v-for="(badgeType,index) in badgeLight">
              <div class="badgeCrown" v-if=" index === grade-1  "></div>
              <div class="Badge">
                <div class="badgeGrade">V{{index + 1}}</div>
                <div class="badgeName">{{badge[index]}}</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="badge-hint">
          <p class="hint">再积累500成长值即可  升级为“{{badge[grade]}}” </p>
          <p class="goUpData"><a href="https://www.qianmancang.com/loan-list">马上升级</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const LENGTH = 8;
  const CLS_Gray = 'badgeTypeGray';
  const CLS_Light = 'badgeTypeLight';

  export default {
    data() {
      return {
        badgeType: false,
        grade: 5,
        hasCrown: false,
        badge: [
          '白手起家', '略有积蓄', '小康之家', '腰缠万贯',
          '锦衣玉食', '金钱满仓', '堆金如山', '富甲天下'
        ]
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
        return result;
      }


    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "bannerVip.styl";
</style>
