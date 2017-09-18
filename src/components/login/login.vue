<template>
  <div class="login-wrapper">
    <div class="login-content">
      <div class="login-wrap">
        <div class="login-tab">
          <p class="left">登录钱满仓</p>
          <p class="right" v-for="(item,index) in tabs" :class="{active:index == selected}"
             @click="show(index)">
            {{item}}
            <span class="icon-go-right"></span>
          </p>
        </div>
        <!--验证码登录-->
        <div class="login-form login-form1" v-show="codeShow">
          <div class="login-tips">{{hintCode}}</div>
          <div class="item item1">
            <label for="loginname-code" class="login-label icon-phone login-label1"></label>
            <input type="text" id="loginname-code" placeholder="手机号码" :maxlength="11" v-model="phoneCode" @focus="clear">
          </div>
          <div class="item item2">
            <label for="loginpwd" class="login-label icon-message login-label2"></label>
            <input type="text" id="loginpwd" placeholder="短信验证码" :maxlength="6" v-model="codeMessage" @focus="clear">
            <span @click="showFigureCode" v-if="!countdownShow">获取</span>
            <span v-if="countdownShow" class="huoQu">已发送…{{time}}s</span>
          </div>
          <div class="remember-me">
            <input class="login-check" type="checkbox" checked="checked">
            <span>记住手机号</span>
          </div>
          <div class="immediately-login">
            <a href="javascript:;" @click="loginCode()">立即登录</a>
          </div>
          <div class="registration">
            <a href="https://www.qianmancang.com/zhuce">没有账号？注册享投资好礼></a>
          </div>
        </div>
        <!--验证码登录-图形验证浮层-->
        <div class="figure-code" v-show="figureCodeShow">
          <div class="figure-code-wrap">
            <div class="figure-code-title">
              <span>请先验证</span>
              <p class="close" @click="showFigureCode">×</p>
            </div>
            <div class="figure-code-content">
              <div class="figure-code-item">
                <input type="text" placeholder="图片验证码" :maxlength="4" @click="clear">
                <span class="right"></span>
                <p class="formValidation phoneValidation">{{hintPicCode}}</p>
              </div>
              <div class="figure-code-submit">
                <p @click="picCodeSubmit">提交</p>
              </div>
            </div>
          </div>
        </div>
        <!--密码登录-->
        <div class="login-form login-form2" v-show="pwdShow">
          <div class="login-tips">{{hintPwd}}</div>
          <div class="item item1">
            <label for="loginname-pwd" class="login-label icon-phone login-label1"></label>
            <input type="text" id="loginname-pwd" placeholder="手机号码" :maxlength="11" @click="clear">
          </div>
          <div class="item item2">
            <label for="logincode" class="login-label icon-suo login-label2"></label>
            <input type="password" id="logincode" placeholder="登录密码" :maxlength="12" @click="clear">
          </div>
          <div class="remember-me">
            <input class="login-check" type="checkbox" checked="checked">
            <span>记住手机号</span>
            <a class="right" href="https://www.qianmancang.com/find_login-password">忘记密码？</a>
          </div>
          <div class="immediately-login">
            <a href="javascript:;" @click="loginPwd">立即登录</a>
          </div>
          <div class="registration">
            <a href="https://www.qianmancang.com/zhuce">没有账号？注册享投资好礼></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {setCookie, getCookie} from '../../common/js/cookie.js';
  export default {
    data() {
      return {
        selected: 0,
        tabs: ['密码登录', '验证码登录'],
        hintCode: '', //短信验证提示
        hintPwd:'', //密码验证提示
        hintPicCode:'', //图形验证码验证提示
        pwdShow: false, //密码登录显示
        codeShow: true, //验证码登录显示
        figureCodeShow: false, //图形验证码显示
        countdownShow: false, //倒计时显示
        time: 60, //倒计时时间
        phoneCode: '', //验证码登录手机号
        phonePwd: '', //密码登录手机号
        codeMessage:'', //短信验证码
        codPic:'', //图形验证码
        pwd: '' //密码
      }
    },
    mounted(){
      /*页面挂载获取cookie，如果存在phone的cookie，则跳转到主页，不需登录*/
      if (getCookie('phone')) {
        this.$router.push('/');
      }
    },
    methods: {
      show(index){
        if (index == 0) {
          index = 1;
          this.codeShow = false;
          this.pwdShow = true;
        } else {
          index = 0;
          this.pwdShow = false;
          this.codeShow = true;
        }
        this.selected = index;
      },
      showFigureCode(){
        this.figureCodeShow = !this.figureCodeShow;
      },
      picCodeSubmit() {
        /*this.$http.post(
         'url',
         { picCode: this.picCode },
         { timeout: 7000 }
         ).then( (reponse) => {
         //成功后，倒计时60秒
         },(reponse) =>{} );*/
        let codePicReg = /\d{6}/;
        if (!codePicReg.test(this.codPic)) {
          this.hintPicCode = "请输入正确格式的图形验证码";
        }else {
          let data = {'codePhone': this.codePhone, 'codeMessage': this.codeMessage};
          this.$http.post(
            '/api/associatorUser/getUser.do',
            data,
          ).then((res) => {
            if (res.data == 1) {
              this.hintPicCode = '图形验证码无效';
            }else{
              this.showFigureCode();
              let countdown = this;
              countdown.countdownShow = true;
              let interval = window.setInterval(function () {
                if ((countdown.time--) <= 0) {
                  countdown.time = 60;
                  countdown.countdownShow = false;
                  window.clearInterval(interval);
                }
              }, 1000);
            }
          });
        }
      },
      loginCode() {
        let phoneReg = /^1[34578]\d{9}$/;
        let codeMessageReg = /\d{6}/;
        if(!phoneReg.test(this.phoneCode)){
          this.hintCode = '请输入正确格式的手机号码';
        }else {
          let data = {'codePhone': this.codePhone, 'codeMessage': this.codeMessage};
          // 接口请求
          this.$http.post(
            '/api/associatorUser/getUser.do',
            data,
          ).then((res) => {
            if (res.data == 0) {
              this.hintcode = "该手机号未注册";
            } else if (!codeMessageReg.test(this.codeMessage)) {
              this.hintcode = "请输入正确格式的短信验证码";
            } else {
              if (res.data == 1) {
                this.hintcode = "短信验证码无效";
              }else {
                this.hintcode = "登录成功";
                setCookie('phoneCode', this.phoneCode, 1000 * 60);
                setTimeout(function () {
                  this.$router.push('/');
                }.bind(this), 1000);
                //通过 store.commit 方法触发状态变更
                this.$store.commit('increment');
              }
            }
          });
        }
      },
      loginPwd() {
        let phoneReg = /^1[34578]\d{9}$/;
        let pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
        if(!phoneReg.test(this.phonePwd)){
          this.hintPwd = '请输入正确格式的手机号码';
        }else {
          let data = {'codePhone': this.phonePwd, 'pwd': this.pwd};
          // 接口请求
          this.$http.post(
            '/api/associatorUser/getUser.do',
            data,
          ).then((res) => {
            if (res.data == 0) {
              this.hintPwd = "该手机号未注册";
            } else if (!pwdReg.test(this.pwd)) {
              this.hintPwd = "登录密码无效";
            } else {
              if (res.data == 2) {
                this.hintPwd = "登录密码无效";
              }else {
                this.hintPwd = "登录成功";
                setCookie('phonePwd', this.phonePwd, 1000 * 60);
                setTimeout(function () {
                  this.$router.push('/');
                }.bind(this), 1000);
                //通过 store.commit 方法触发状态变更
                this.$store.commit('increment');
              }
            }
          });
        }
      },
      clear() {
        this.hintCode = '';
        this.hintPwd = '';
        this.hintPicCode = '';
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "login.styl";
</style>
