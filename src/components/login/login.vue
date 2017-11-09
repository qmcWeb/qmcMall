<template>
  <div class="login-wrapper">
    <div class="login-content">
      <div class="login-wrap">
        <div class="login-tab">
          <p class="left">登录钱满仓</p>
          <p class="right" v-for="(item,index) in tabs" v-if="index == selected"
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
            <input type="text" id="loginname-code" placeholder="手机号码" :maxlength="11" v-model="phoneCode"
                   @focus="clear">
          </div>
          <div class="item item2">
            <label for="loginpwd" class="login-label icon-message login-label2"></label>
            <input type="text" id="loginpwd" placeholder="短信验证码" maxlength="6" @keyup.enter="loginPwd"
                   v-model="codeMessage" @focus="clear">
            <span @click="getImgCode" v-if="!countdownShow">获取</span>
            <span v-if="countdownShow" class="huoQu">已发送…{{time}}s</span>
          </div>
          <div class="remember-me">
            <label> <input class="login-check" type="checkbox" v-model="remember"><span>记住手机号</span></label>

          </div>
          <div class="immediately-login">
            <a href="javascript:;" @click="loginCode()">立即登录</a>
          </div>
          <div class="registration">
            <a href="http://121.42.209.253:28182/zhuce">没有账号？注册享投资好礼></a>
          </div>
        </div>
        <!--验证码登录-图形验证浮层-->
        <div class="figure-code" v-show="figureCodeShow">
          <div class="figure-code-wrap">
            <div class="figure-code-title">
              <span>请先验证</span>
              <p class="close" @click="closeImgCodeMask">×</p>
            </div>
            <div class="figure-code-content">
              <div class="figure-code-item">
                <input type="number" placeholder="图片验证码" :maxlength="4" v-model="codPic" @click="clear">
                <img :src="imgSrc" class="right" @click="requestImgCode"></img>
                <p class="formValidation phoneValidation">{{hintPicCode}}</p>
              </div>
              <div class="figure-code-submit">
                <p @click="imgCodeSubmit">提交</p>
              </div>
            </div>
          </div>
        </div>
        <!--密码登录-->
        <div class="login-form login-form2" v-show="pwdShow">
          <div class="login-tips">{{hintPwd}}</div>
          <div class="item item1">
            <label for="loginname-pwd" class="login-label icon-phone login-label1"></label>
            <input type="tel" id="loginname-pwd" placeholder="手机号码" @keyup.enter="loginPwd" maxlength="11"
                   v-model="phone" @click="clear">
          </div>
          <div class="item item2">
            <label for="logincode" class="login-label icon-suo login-label2"></label>
            <input type="password" name="txtPassword" style="display:none">
            <input type="password" id="logincode" name="txtPassword" placeholder="登录密码" @keyup.enter="loginPwd"
                   @click="clear" v-model="pwd">
          </div>
          <div class="remember-me">
            <label><input class="login-check" type="checkbox" checked="checked" v-model="remember"><span>记住手机号
</span></label>
            <a class="right" href="http://121.42.209.253:28182/find_login-password">忘记密码？</a>
          </div>
          <div class="immediately-login">
            <a href="javascript:;" @click="loginPwd">立即登录</a>
          </div>
          <div class="registration">
            <a href="http://121.42.209.253:28182/zhuce">没有账号？注册享投资好礼></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const phoneReg = /^1[134578]\d{9}$/;
  import {setCookie, getCookie, delCookie} from '../../common/js/cookie.js';
  export default {
    data() {
      return {
        remember: true,
        selected: 0,
        tabs: ['验证码登录', '密码登录'],
        hintCode: '', //短信验证提示
        hintPwd: '', //密码验证提示
        hintPicCode: '', //图形验证码验证提示
        pwdShow: true, //密码登录显示
        codeShow: false, //验证码登录显示
        figureCodeShow: false, //图形验证码显示
        countdownShow: false, //倒计时显示
        time: 60, //倒计时时间
        phoneCode: '', //验证码登录手机号
        phone: '', //密码登录手机号
        codeMessage: '', //短信验证码
        codPic: '', //图形验证码
        pwd: '', //密码
        imgSrc: ''
      }
    },
    mounted(){
      /*页面挂载获取cookie，如果存在phone的cookie，则跳转到主页，不需登录*/

      let Isremember = getCookie('phone')
      if (Isremember) {
        this.phone = Isremember
        this.phoneCode = Isremember
      }
    },
    methods: {
      requestImgCode(){
        this.$http.post(this.api + '/associatorUser/getImgCodeUrl.do', {mobile_number: this.phoneCode}).then(res => {
          console.log(this.api, res.body.dataBody.imgCodeUrl)
          this.imgSrc = res.body.dataBody.imgCodeUrl + '?v=' + new Date().getTime() + '&mobile_number=' + this.phoneCode;
          console.log(getCookie('JSESSIONID'))
        })
      },
      closeImgCodeMask(){
        this.figureCodeShow = !this.figureCodeShow;
      },
      show(index){
        if (index == 0) {
          index = 1;
          this.pwdShow = false;
          this.codeShow = true;
        } else {
          index = 0;
          this.codeShow = false;
          this.pwdShow = true;
        }
        this.selected = index;
      },
      getImgCode(){
        if (!phoneReg.test(this.phoneCode)) {
          this.hintCode = '请输入正确格式的手机号码';
          return false
        }
        this.$http.post(
          this.api + '/associatorUser/verifyUser.do',
          {mobile_number: this.phoneCode},
        ).then((res) => {
          if (res.body.message === "用户不存在") {
            this.hintCode = '该用户不存在';
            return
          }
          if (res.body.message === '成功') {
            this.requestImgCode()
            this.figureCodeShow = !this.figureCodeShow;
          }
        })
      },
      imgCodeSubmit() {
        let codePicReg = /\d{4}/;
        if (!codePicReg.test(this.codPic)) {
          this.hintPicCode = "请输入正确格式的图形验证码";
        } else {
          let data = {mobile_number: this.phoneCode, 'imgCode': this.codPic};
          console.log(data)
          this.$http.post(
            this.api + '/associatorUser/sendAuthCode.do',
            data,
          ).then((res) => {
            console.log(res.body)
            if (res.body.message === '验证码发送成功') {
              this.figureCodeShow = !this.figureCodeShow;
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
        let codeMessageReg = /\d{6}/;
        if (!phoneReg.test(this.phoneCode)) {
          this.hintCode = '请输入正确格式的手机号码';
          return
        }
        if (!codeMessageReg.test(this.codeMessage)) {
          this.hintCode = '请输入正确格式的短信验证码';
          return
        }
        let data = {'mobile_number': this.phoneCode, 'auth_code': this.codeMessage};
        // 接口请求
        console.log(data)
        this.$http.post(
          this.api + '/associatorUser/loginByAuthCode.do',
          data,
        ).then((res) => {
          var result = res.body
          if (result.message == '登录成功') {
            this.$store.dispatch('set_error', '')
            setCookie('user_info', JSON.stringify(result), 14);
            if (this.remember) {
              setCookie('phone', this.phone, 30);
            } else {
              delCookie('phone');
            }
            this.$store.commit('SET_checkLogin', true)
            this.$store.dispatch('checkLogin');
            //this.$store.dispatch('get_userInfo_dynamic', {user_id: result.user_id});
            if (this.$route.query) {
              this.$router.push(this.$route.query.redirect);
            }
          }

        });

      },
      loginPwd() {
        let pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
        if (!phoneReg.test(this.phone)) {
          this.hintPwd = '请输入正确格式的手机号码';
        } else {
          let data = {'mobile_number': this.phone, 'password': this.pwd};
          console.log(data)
          // 接口请求
          var _this = this;
          this.$http.post(
            this.api + '/associatorUser/login.do', data
          ).then((res) => {
            console.log(res.body)
            var result = res.body
            if (result.error) {
              _this.hintPwd = result.error;
              return false
            }
            if (result.message == '登录成功') {
              this.$store.dispatch('set_error', '')
              this.$store.commit('SET_checkLogin', true)
              setCookie('user_info', JSON.stringify(result), 14);
              if (this.remember) {
                setCookie('phone', this.phone, 30);
              } else {
                delCookie('phone');
              }

              this.$store.dispatch('checkLogin');
              // this.$store.dispatch('get_userInfo_dynamic', {user_id: result.user_id});
              if (this.$route.query) {
                this.$router.push(this.$route.query.redirect);
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
