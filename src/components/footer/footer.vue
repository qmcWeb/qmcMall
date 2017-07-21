<template>
  <div class="footer-wrapper">
    <div class="footer-content">
      <div class="footer-left left">
        <ul class="footer-info left">
          <h2>关于钱满仓</h2>
          <li><a href="https://www.qianmancang.com/about_us?1">公司简介</a></li>
          <li><a href="https://www.qianmancang.com/about_us?3">团队介绍</a></li>
          <li><a href="https://www.qianmancang.com/about_us?5">联系我们</a></li>
          <li><a href="https://www.qianmancang.com/node/flsm/20">法律法规</a></li>
        </ul>
        <ul class="footer-info left">
          <h2>帮助中心</h2>
          <li><a href="https://www.qianmancang.com/node/helpCenter/hc1">常见中心</a></li>
          <li><a href="https://www.qianmancang.com/node/helpCenter/hc2">充值提现</a></li>
          <li><a href="https://www.qianmancang.com/node/helpCenter/hc5">投资还款</a></li>
          <li><a href="https://www.qianmancang.com/node/helpCenter/hc4">账户问题</a></li>
          <li><a href="https://www.qianmancang.com/node/spage/htmb">合同模板</a></li>
        </ul>
        <ul class="footer-info left">
          <h2>业务介绍</h2>
          <li><a href="https://www.qianmancang.com/pattern_duan">短融宝</a></li>
          <li><a href="https://www.qianmancang.com/pattern_dian">房贷宝</a></li>
          <li><a href="https://www.qianmancang.com/order">高端订制</a></li>
        </ul>
        <ul class="footer-info left">
          <h2>友情链接</h2>
          <li><a href="http://dh.wdlm.cn/" target="_blank">网贷联盟网</a></li>
          <li><a href="http://www.wukongshuo.com/caijing/" target="_blank">财经新闻</a></li>
          <li><a href="http://beijing.99dai.cn/" target="_blank">北京信用贷款</a></li>
          <li><a href="http://www.p2ptouhang.com/" target="_blank">网贷投行</a></li>
          <li><a href="http://www.wdzj.com/" target="_blank">网贷之家</a></li>
          <li><a href="http://www.p2peye.com/" target="_blank">网贷天眼</a></li>
        </ul>
      </div>
      <div class="footer-middle left">
        <h2>APP下载</h2>
        <img src="./app-download.png" alt="下载" width="100" height="100" />
      </div>
      <div class="footer-right left">
        <h2>客服热线</h2>
        <h1>400-135-1766</h1>
        <h3>服务时间：09:00-21:00</h3>
        <p>
          <i class="icon-wechat"></i>
          <img src="./qianmc.png" width="114" height="122" alt="" />
        </p>
        <p>
          <i class="icon-sina-weibo"></i>
          <span>新浪微博</span>
        </p>
      </div>
      <div class="footer-bottom left">
        <div class="manage-warn left">
          京ICP备14053053号−1 / @2017 北京佛尔斯特金融信息服务有限公司 /
          <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010102002289" target="_blank">
            <img src="./jgwa.png" width="20" height="20" alt="">
            京公网安备 11010102001399号
          </a><br />
          钱满仓提醒您：市场有风险，投资需谨慎
        </div>
        <div class="left auth-link-new">
          <ul>
            <li  class="auth-link-new1">
              <img class="img-encryption" @mouseenter="enter" @mouseleave="leave"
                   src="https://seal.wosign.com/Signature/Profiles/Icon/CN/EV_tp1_cn.png" width="124" height="34" alt="" />
              <div class="data-encryption" ref="encryption">
                <iframe id="frameBig62722369" src="https://seal.wosign.com/Signature/Profiles/mp/CN/4702bfc1df68493382bbbdc49a4acb6f.htm?ref=aHR0cHM6Ly93d3cucWlhbm1hbmNhbmcuY29t"
                        width="250" height="300" frameborder="0" style="border:0px;margin:0px;padding:0px;" scrolling="no">
                </iframe>
              </div>
            </li>
            <li class="auth-link-new2">
              <a target="_blank" href="http://www.anquan.org/authenticate/cert/?site=www.qianmancang.com&amp;at=business">
              </a>
            </li>
            <li class="auth-link-new3">
              <a href="http://webscan.360.cn/index/checkwebsite/url/www.qianmancang.com" target="_blank">
              </a>
            </li>
            <li class="auth-link-new4">
              <a href="http://si.trustutn.org/info?sn=962150505000134255427" target="_blank">
              </a>
            </li>
            <li class="auth-link-new5">
              <a href="https://search.szfw.org/cert/l/CX20150326007221007337" target="_blank">
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    methods: {
      enter(){
          this.$refs.encryption.style.cssText = 'opacity:1;z-index:1;';
      },
      leave(){
        setTimeout(() => {
          this.$refs.encryption.style.cssText = 'opacity:0;z-index:-1;';
        },3000);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped="">
  @import "footer.styl";
</style>

