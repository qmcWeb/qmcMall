<template>
  <div class="levelVip-wrap">
    <v-banner></v-banner>
    <div class="computed-wrap section">
      <h3 class="title">如何计算等级？</h3>
      <p class="content">
        钱满仓会员中心包含8个会员等级，会员等级由用户的成长值决定，当累计成长值达到升级条件时，立即升级。成长值越多，等级越高，享受到的权益越多。用户可通过投资等行为获得大量成长值。
        <router-link :to="{path:'/taskVip'}" class="gold">查看我的成长值</router-link>
      </p>
      <table align="center" valign="middle">
        <tr>
          <td>等级</td>
          <td>LV1</td>
          <td>LV2</td>
          <td>LV3</td>
          <td>LV4</td>
          <td>LV5</td>
          <td>LV6</td>
          <td>LV7</td>
          <td>LV8</td>
        </tr>
        <tr>
          <td>成长值</td>
          <td>0～150</td>
          <td>151～250</td>
          <td>251～500</td>
          <td>501～1000</td>
          <td>1001～2500</td>
          <td>2501～5000</td>
          <td>5001～25000</td>
          <td>25000以上</td>
        </tr>
      </table>
    </div>
    <div class="get-wrap section">
      <h3 class="title">如何获得成长值？</h3>
      <p class="content">
        会员可通过完成不同的任务来获得相应的成长值，成长值达到升级条件，即可升为更高一级的会员。</p>
      <table class="table2">
        <tr>
          <td class="width25 bg">任务类型</td>
          <td class="bg">任务</td>
          <td class="width25 bg">成长值</td>
        </tr>
        <tr>
          <td rowspan="3">新手任务</td>
          <td>实名认证</td>
          <td>100</td>
        </tr>
        <tr>
          <td>首次充值</td>
          <td>30</td>
        </tr>
        <tr>
          <td>完成风险测评</td>
          <td>20</td>
        </tr>
        <tr>
          <td rowspan="2">投资任务</td>
          <td>首次投资额外增加</td>
          <td>50</td>
        </tr>
        <tr>
          <td>投资项目</td>
          <td>投资金额＊投资时间＊0.4%</td>
        </tr>
        <tr>
          <td rowspan="2">邀请任务</td>
          <td>邀请好友注册并实名认证</td>
          <td>50</td>
        </tr>
        <tr>
          <td>好友首次投资</td>
          <td>投资金额＊投资时间＊0.1%</td>
        </tr>
        <tr>
          <td rowspan="2">互动任务</td>
          <td>pc端签到</td>
          <td>1</td>
        </tr>
        <tr>
          <td>App端签到</td>
          <td>2</td>
        </tr>
      </table>
    </div>
    <div class="better-wrap section">
      <h3 class="title">如何升级与保级？</h3>
      <h4 class="s-title">如何升级？</h4>
      <p class="content">
        会员可通过完成不同的任务来获得相应的成长值，成长值达到升级条件，即可升为更高一级的会员。</p>
      <h4 class="s-title">会员等级有效期？</h4>
      <p class="content">
        自会员升级之日起，到下一次核算等级时间止，都为该等级有效期。<br>
        每年3月31日、6月30日、9月30日和12月31日将会根据会员的投资情况对等级进行重新核算，并根据剩余成长值计算级别。<br/>
        新注册用户不参加首次等级核算</p>
    </div>
  </div>
</template>

<script>
  import  bannerVip from  '@/components/bannerVip/bannerVip'
  export default{
    components: {
      'v-banner': bannerVip
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "levelVip.styl";

</style>


