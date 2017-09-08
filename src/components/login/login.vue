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
        <div class="login-form login-form1" v-show="pwdShow">
          <div class="item item1">
            <label for="loginname-code" class="login-label icon-phone login-label1"></label>
            <input  type="text" id="loginname-code" placeholder="手机号码" :maxlength="11"
              v-validate="'required|phoneCode'" name="phoneCode">
            <p class="formValidation phoneValidation" v-show="errors.has('phoneCode')">{{errors.first('phoneCode')}}</p>
          </div>
          <div class="item item2">
            <label for="loginpwd" class="login-label icon-message login-label2"></label>
            <input type="text" id="loginpwd" placeholder="短信验证码" :maxlength="6"
              v-validate="'required|messageCode'" name="messageCode">
            <span @click="showFigureCode" v-if="!countdownShow">获取</span>
            <span v-if="countdownShow">已发送…{{time}}s</span>
            <p class="formValidation messageValidation" v-show="errors.has('messageCode')">{{errors.first('messageCode')}}</p>
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
                <input type="text" placeholder="图片验证码" :maxlength="4"
                  v-validate="'required|picCode'" name="picCode">
                <span class="right"></span>
                <p class="formValidation phoneValidation" v-show="errors.has('picCode')">{{errors.first('picCode')}}</p>
              </div>
              <div class="figure-code-submit">
                <p @click="picCodeSubmit">提交</p>
              </div>
            </div>
          </div>
        </div>
        <!--密码登录-->
        <div class="login-form login-form2" v-show="codeShow">
          <div class="item item1">
            <label for="loginname-pwd" class="login-label icon-phone login-label1"></label>
            <input type="text" id="loginname-pwd" placeholder="手机号码" :maxlength="11"
              v-validate="'required|phonePwd'" name="phonePwd">
            <p class="formValidation phoneValidation" v-show="errors.has('phonePwd')">{{errors.first('phonePwd')}}</p>
          </div>
          <div class="item item2">
            <label for="logincode" class="login-label icon-suo login-label2"></label>
            <input type="password" id="logincode" placeholder="登录密码" :maxlength="12"
              v-validate="'required|password'" name="password">
            <p class="formValidation phoneValidation" v-show="errors.has('password')">{{errors.first('password')}}</p>
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
  export default {
      data() {
        return {
            selected: 0,
            tabs: ['密码登录','验证码登录'],
            pwdShow: true,
            codeShow: false,
            figureCodeShow: false,
            countdownShow: false,
            time: 60,
            phone: {
                test: /^1[34578]\d{9}$/,
                message: '电话号码格式不正确'
            },
            codeMessage:{
                test: /\d{6}/,
                message: '请输入正确的短信验证码'
            },
            codPic: {
              test: /\d{4}/,
              message: '请输入正确的图形验证码'
            },
            pwd: {
              test: /\d{6}/,
              message: '密码格式不正确'
            }
        }
      },
      methods: {
        show(index){
          if (index == 0) {
            index = 1;
            this.codeShow = true;
            this.pwdShow = false;
          } else {
            index = 0;
            this.pwdShow = true;
            this.codeShow = false;
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
            this.showFigureCode();
            let countdown = this;
            countdown.countdownShow = true;
            let interval = window.setInterval(function() {
              if ((countdown.time--) <= 0) {
                countdown.time = 60;
                countdown.countdownShow = false;
                window.clearInterval(interval);
              }
            }, 1000);
        },
        loginCode() {
          /*this.$http.post(
              'url()',
              { phone: this.phone, messageCode: this.messageCode }
          ).then( (response) => {
            /!* 请求成功执行函数 *!/
          },(response) =>{
            console.log(response);
          } );*/
          this.$router.push({
              path: '/'
          });
          //通过 store.commit 方法触发状态变更
          this.$store.commit('increment');
        },
        loginPwd() {
          /*this.$http.post(
            'url()',
            { phone: this.phone, password: this.password }
          ).then( (response) => {
            /!* 请求成功执行函数 *!/
          },(response) =>{
            console.log(response);
          } );*/
          this.$router.push({
            path: '/'
          });
        }
      }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "login.styl";
</style>
