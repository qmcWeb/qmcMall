<template>
  <div>
    <v-crumbsBar></v-crumbsBar>
    <v-errorLayer :errorCon="errorCon" :errorType="errorType" :errorlayerSHow="errorlayerSHow"></v-errorLayer>
    <div class="order-wrap">
      <!--新地址浮层-->
      <div class="newAddress-layer blackFixed" v-show="newAddressLayer">
        <div class="fill-wrap midWrap">
          <i class="close" @click="closeSiteLayer">×</i>
          <h3>{{siteLayerTitle}}</h3>
          <div class="fill-content">
            <div class="s-title">寄送地址</div>
            <div class="name-phone-widget">
              <div>收件人</div>
              <input type="text" name="name" class="name" v-model="userName">
              <div>手机号码</div>
              <input type="tel" name="phone" class="phone" maxlength="11" v-model="userPhone">
            </div>
            <div class="select-widget">
              <div>收获地址</div>
              <v-distpicker @province="selectProvince" @city="selectCity" @area="selectArea"
                            :province="select.province.value" :city="select.city.value"
                            :area="select.area.value"></v-distpicker>
            </div>
            <textarea name="area" id="" cols="30" rows="10" placeholder="请输入您的具体地址" v-model="userSite"></textarea>
            <div class="errorTips">
              {{errorTips}}



            </div>
            <div class="operate-btn-wrap">
              <a class="save" href="javascript:;" @click="saveAddress">保存</a>
              <a class="cancel" href="javascript:;" @click="closeSiteLayer">取消</a>
            </div>
          </div>
        </div>
      </div>
      <!--订单确认浮层-->
      <div class="orderSure-layer blackFixed" v-show="orderLayerShow">
        <div class="orderSure-wrap midWrap">
          <i class="close" @click="closeOrderLayer">×</i>
          <h3>订单信息</h3>
          <div class="orderSure-content">
            <div class="s-title">订单信息</div>
            <div class="info-box">
              <div class="top">
                <dl>
                  <dt class="justify">商品名称：</dt>
                  <dd>{{name}}</dd>
                </dl>
                <dl>
                  <dt>交易数量：</dt>
                  <dd>{{count}}</dd>
                </dl>
                <dl>
                  <dt>订单总价：</dt>
                  <dd>{{totalBeans}}仓豆</dd>
                </dl>
              </div>
              <div class="mid">
                <dl>
                  <dt class="justify">配&nbsp&nbsp送&nbsp&nbsp至：</dt>
                  <dd>北京市东城区安德里北街22号恒通伟业大厦9层      松松      13500000000</dd>
                </dl>
              </div>
              <div class="bot">
                <dl>
                  <dt class="justify">留&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp言：</dt>
                  <dd>{{requirement}}</dd>
                </dl>
              </div>
            </div>
            <div class="s-title margin-46">注意事项</div>
            <div class="attention">
              1.请您仔细核实商品订单信息，兑换成功后，除商品在运输途中发生损坏或本身存在残次问题外，恕不允许退货或换货。<br>
              2.兑换成功后，您的商品将在3个工作日内寄出，您可在 我的账户-仓豆商城账户-兑换记录中点击订单详情查询配送信息。
            </div>
            <div class="lastOperation">
              <a class="last-sure" href="javascript:;" @click="confirmOrder">确认支付</a>
              <a class="last-cancel" href="javascript:;" @click="closeOrderLayer">放弃兑换</a>
            </div>
          </div>
        </div>
      </div>
      <div class="address-wrap">
        <h3 class="title">寄送地址</h3>
        <ul class="address-list">
          <li v-for="(item, index) in addressList" class="item">
            <div class="userName">{{item.userName}}</div>
            <div class="userPhone">{{item.userPhone}}</div>
            <div class="userSite">{{item.userSite}}</div>
            <div class="modify" @click="modifySite(index)">修改</div>
            <div class="default-operation Default" v-if="item.defaultWhether">默认地址</div>
            <div class="default-operation" v-else @click="setDefault(index)">
              设为默认
            </div>
          </li>
          <li class="item addNew" @click="addSite" v-if="addressList.length<3">
            <i class="icon-add"></i>
            <p>添加新地址</p>
          </li>
        </ul>
      </div>
      <div class="orderInfo-wrap">
        <h3 class="title">兑换商品</h3>
        <div class="orderInfo-content">
          <ul class="tits">
            <li></li>
            <li>商品名称</li>
            <li>商品属性</li>
            <li>兑换数量</li>
            <li>库存数量</li>
            <li>单价</li>
          </ul>
          <ul class="infos">
            <li class="good-img-s"><img src="./fx.png" alt=""></li>
            <li>{{name}}</li>
            <li>实体商品</li>
            <li class="count-widget"><span class="countIcon icon-reduce" @click="reduceNum()"></span>
              <span class="number">{{ count }}</span>
              <span class="countIcon icon-add" @click="addNum()"></span></li>
            <li>{{stockNum}}</li>
            <li><span class="orange">{{beans}}</span>仓豆</li>
          </ul>
        </div>
        <div class="requireFill">
          <transition name="addMessBtn" leave-active-class="animated fadeOutLeft">
            <div class="addMessBtn" v-if="addMessBtnShow"
                 @click="addMessBtnShow=!addMessBtnShow;addMessInputShow=!addMessInputShow">添加留言

            </div>
          </transition>
          <transition name="addMessInput" enter-active-class="animated shake">
            <input type="text" v-model="requirement" v-if="addMessInputShow" placeholder="请您简要描述您的需求（限50字，非必填）"
                   class="addMessInput">
          </transition>
        </div>
        <div class="totalBeans-wrap">
          需支付：<span class="orange">{{totalBeans}}</span>仓豆
        </div>
        <div class="order-sub-widget">
          <a href="javascript:;" class="cancel" @click="back">取消</a>
          <a href="javascript:;" class="open-pop" @click="openOrderPop">确认兑换</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import VDistpicker from 'v-distpicker';
  import  crumbsBar from  '@/components/crumbsBar/crumbsBar'
  import  errorLayer from  '@/components/errorLayer/errorLayer'
  export default {
    data() {
      return {
        result: 1,
        addressList: [],
        newAddressLayer: false,
        select: {province: '', city: '', area: ''},
        userName: '',
        userPhone: '',
        userSite: '',
        newAddress: [],
        count: 1,
        requirement: '',
        totalBeans: 1,
        stockNum: 10,
        siteLayerTitle: '添加新地址',
        siteIndex: -1,
        errorTips: '',
        addMessBtnShow: true,
        addMessInputShow: false,
        orderLayerShow: false,
        errorCon: 'Vx级以上会员才能兑换该商品哦，<a href="baidu">快去看看如何升级吧</a>',
        errorType: 'lessBeans',
        errorlayerSHow: false
      }
    },
    created() {
      let good = this;
      good.goodInfoData = JSON.parse(sessionStorage.goodInfoData);
      console.log(good.goodInfoData);
      good.name = good.goodInfoData.product_name;
      good.desc = '荷兰进口刀头，性贴面设计，舒适切剃，剃须静音更舒心！';
      good.beans = good.goodInfoData.product_price;
      good.price = good.goodInfoData.selling_price;
      good.count = good.goodInfoData.goodCount;
      good.totalBeans = good.beans * good.count
    },
    methods: {
      reduceNum() {
        if (this.count <= 1) {
          return false;
        }
        this.count--;
        this.totalBeans = this.count * this.beans
      },
      addNum() {
        if (this.count >= this.stockNum) {
          return false;
        }
        this.count++;
        this.totalBeans = this.count * this.beans
      },
      addSite() {
        this.siteIndex = -1;
        this.siteLayerTitle = '添加新地址';
        this.userName = '';
        this.userPhone = '';
        this.userSite = '';
        this.select.province = ''
        this.select.city = ''
        this.select.area = ''
        this.newAddressLayer = !this.newAddressLayer

      },
      closeSiteLayer() {
        this.newAddressLayer = false;
        this.errorTips = '';
      },
      closeOrderLayer() {
        this.orderLayerShow = false
      },
      selectProvince(value) {
        this.select.province = value
        console.log(value);
      },
      selectCity(value) {
        this.select.city = value
        console.log(value);
      },
      selectArea(value) {
        this.select.area = value
        console.log(value);
      },
      saveAddress() {
        //表单检验
        let phoneReg = /^1[34578]\d{9}$/;
        if (!this.userName.length) {
          this.errorTips = '请填写收件人';
          return false;
        }
        if (!phoneReg.test(this.userPhone)) {
          this.errorTips = '请输入有效的手机号码';
          return false;
        }
        if (!this.select.province) {
          this.errorTips = '请选择省份';
          return false;
        }
        if (!this.select.city) {
          this.errorTips = '请选择市';
          return false;
        }
        if (!this.select.area) {
          this.errorTips = '请选择区县';
          return false;
        }
        if (!this.userSite.length) {
          this.errorTips = '请填写具体地址';
          return false;
        }
        this.errorTips = '';
        let index = this.siteIndex
        if (index > -1) {
          this.addressList[index].userName = this.userName;
          this.addressList[index].userPhone = this.userPhone;
          this.addressList[index].userSite = this.userSite;
          this.addressList[index].province = this.select.province
          this.addressList[index].city = this.select.city
          this.addressList[index].area = this.select.area
        } else {
          this.addressList.push({
            userName: this.userName,
            userPhone: this.userPhone,
            userSite: this.userSite,
            province: this.select.province,
            city: this.select.city,
            area: this.select.area,
            defaultWhether: false
          })
        }
        console.log(this.select)
        this.closeSiteLayer()
      },
      setDefault(index) {
        for (let i = 0; i < this.addressList.length; i++) {
          this.addressList[i].defaultWhether = false
        }
        this.addressList[index].defaultWhether = true;
        //let defaultSite = this.addressList.splice(index, 1);
        // this.addressList=defaultSite.concat(this.addressList)
      },
      modifySite(index) {
        this.siteIndex = index;
        console.log(this.addressList[index])
        this.userName = this.addressList[index].userName;
        this.userPhone = this.addressList[index].userPhone;
        this.userSite = this.addressList[index].userSite;
        this.select.province = this.addressList[index].province;
        this.select.city = this.addressList[index].city;
        this.select.area = this.addressList[index].area;
        this.siteLayerTitle = '修改地址';
        this.newAddressLayer = !this.newAddressLayer
      },
      back() {
        this.$router.go(-1)
      },
      openOrderPop() {
        this.orderLayerShow = !this.orderLayerShow
      },
      confirmOrder() {
        this.$router.push({path: '/success', query: {goodId: this.goodInfoData.id}})
      }
    },
    components: {
      'v-distpicker': VDistpicker,
      'v-crumbsBar': crumbsBar,
      'v-errorLayer': errorLayer,
    },
    watch: {
      addressList: function () {

      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "order.styl";
</style>



