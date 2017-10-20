<template>
  <div>
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
              <input type="text" name="name" class="name" v-model="user_name">
              <div>手机号码</div>
              <input type="tel" name="phone" class="phone" maxlength="11" v-model="phone_number">
            </div>
            <div class="select-widget">
              <div>收获地址</div>
              <v-distpicker @province="selectProvince" @city="selectCity" @area="selectArea"
                            :province="select.province.value" :city="select.city.value"
                            :area="select.area.value">
              </v-distpicker>
            </div>
            <textarea name="area" id="" cols="30" rows="10" placeholder="请输入您的具体地址"
                      v-model="detailed_address"></textarea>
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
                  <dd>{{site_info}}</dd>
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
      <div class="address-wrap" v-if="listDomFlag">
        <h3 class="title">寄送地址</h3>
        <ul class="address-list">
          <li v-for="(item, index) in addressList" class="item" :class="item.default_status>0?'default':''"
              v-if="addressList.length>0" @click="set_default(index)" ref="site">
            <div class="userCName">{{item.user_name}}</div>
            <div class="userCPhone">{{item.phone_number}}</div>
            <div class="userCSite">
              {{item.province_value + item.city_value + item.county_value + item.detailed_address}}

            </div>
            <div class="modify" @click="modifySite(index)">修改</div>
            <div class="default-operation Default" v-if="item.default_status>0">默认地址</div>
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
      <div class="orderInfo-wrap" v-if="name">
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
            <li>{{inventory}}</li>
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
  import LStorage from '@/common/js/LStorage'
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        result: 1,
        addressList: [],
        newAddressLayer: false,
        select: {province: {code: '', value: ''}, city: {code: '', value: ''}, area: {code: '', value: ''}},
        user_name: '',
        phone_number: '',
        detailed_address: '',
        newAddress: [],
        count: 1,
        product_id: '',
        requirement: '',
        totalBeans: 1,
        inventory: '',
        name: '',
        desc: '',
        beans: '',
        price: '',
        inventory: '',
        totalBeans: '',
        siteLayerTitle: '添加新地址',
        siteIndex: -1,
        errorTips: '',
        addMessBtnShow: true,
        addMessInputShow: false,
        orderLayerShow: false,
        errorCon: 'Vx级以上会员才能兑换该商品哦，<a href="baidu">快去看看如何升级吧</a>',
        errorType: 'lessBeans',
        errorlayerSHow: false,
        id: '',
        site_info: '',
        listDomFlag: false,
        entity: false
      }
    },
    created() {
      let good = this;
      let queryData = this.$route.query;
      var userID;
      this.userInfo ? userID = this.userInfo.user_id : userID = ''
      this.$store.dispatch('req_detailData', {proId: queryData.product_id, user: userID}).then(
        (value) => {
          //商品详情
          console.log(value.detail)
          good.goodInfoData = value.detail;
          good.name = good.goodInfoData.product_name;
          good.desc = good.goodInfoData.synopsis_info;
          good.beans = good.goodInfoData.product_price;
          good.price = good.goodInfoData.selling_price;
          good.inventory = good.goodInfoData.inventory;
          if (queryData.count) {
            good.count = queryData.count;
          }
          if (queryData.product_type === 'entity') {
            good.entity = true
          }
          good.totalBeans = good.beans * good.count;
        },
        (err) => {
          console.log(err)
        }
      )
      //请求地址
      this.req_site()
      //初始化设置地址id
    },
    computed: {
      ...mapState([
        'userInfo', 'success', 'dynamic'
      ])
    },
    methods: {
      //选择送货地址
      set_default(index){
        var siteObj = this.$refs.site;
        for (let i = 0; i < siteObj.length; i++) {
          siteObj[i].className = 'item'
        }
        siteObj[index].className = 'item default',
          this.id = this.addressList[index].id,
          this.site_info = this.addressList[index].province_value + this.addressList[index].city_value + this.addressList[index].county_value + this.addressList[index].detailed_address + '   ' + this.addressList[index].user_name + '   ' + this.addressList[index].phone_number
      },
      req_site(){
        this.$http.get('/cjx/clientinfolist/addressList.do', {params: {user_id: this.userInfo.user_id}}).then((res) => {
          this.addressList = res.body.list;
          //地址Dom 可以显示
          this.listDomFlag = true
          for (let i = 0; i < this.addressList.length; i++) {
            if (this.addressList[i].default_status == 1) {
              this.id = this.addressList[i].id;
              this.site_info = this.addressList[i].province_value + this.addressList[i].city_value + this.addressList[i].county_value + this.addressList[i].detailed_address + '   ' + this.addressList[i].user_name + '   ' + this.addressList[i].phone_number
            }
          }
        })
      },
      reduceNum() {
        if (this.count <= 1) {
          return false;
        }
        this.count--;
        this.totalBeans = this.count * this.beans
      },
      addNum() {
        this.count++;
        this.totalBeans = this.count * this.beans
      },
      addSite() {
        this.siteIndex = -1;
        this.siteLayerTitle = '添加新地址';
        this.user_name = '';
        this.phone_number = '';
        this.detailed_address = '';
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
        this.orderLayerShow = false;
      },
      selectProvince(value) {
        this.select.province = value;
      },
      selectCity(value) {
        this.select.city = value;
      },
      selectArea(value) {
        this.select.area = value;
      },
      saveAddress() {
        //表单检验
        let phoneReg = /^1[34578]\d{9}$/;
        if (!this.user_name.length) {
          this.errorTips = '请填写收件人';
          return false;
        }
        if (!phoneReg.test(this.phone_number)) {
          this.errorTips = '请输入有效的手机号码';
          return false;
        }
        if (!this.select.province.code) {
          this.errorTips = '请选择省份';
          return false;
        }
        if (!this.select.city.code) {
          this.errorTips = '请选择市';
          return false;
        }
        if (!this.select.area.code) {
          this.errorTips = '请选择区县';
          return false;
        }
        if (!this.detailed_address.length) {
          this.errorTips = '请填写具体地址';
          return false;
        }
        this.errorTips = '';
        let index = this.siteIndex
        if (index > -1) {
          this.addressList[index].user_name = this.user_name;
          this.addressList[index].phone_number = this.phone_number;
          this.addressList[index].detailed_address = this.detailed_address;
          this.addressList[index].province = this.select.province.code;
          this.addressList[index].city = this.select.city.code;
          this.addressList[index].county = this.select.area.code;
          this.addressList[index].province_value = this.select.province.value;
          this.addressList[index].city_value = this.select.city.value;
          this.addressList[index].county_value = this.select.area.value;
          this.$http.get('/cjx/clientinfolist/modifyAddr.do', {params: {json: JSON.stringify(this.addressList[index])}}).then((res) => {
          })
        } else {
          let data = {
            user_name: this.user_name,
            phone_number: this.phone_number,
            detailed_address: this.detailed_address,
            province: this.select.province.code,
            city: this.select.city.code,
            county: this.select.area.code,
            province_value: this.select.province.value,
            city_value: this.select.city.value,
            county_value: this.select.area.value,
            user_id: this.userInfo.user_id,
            default_status: 0,
            addr_number: '',
            postcode: ''
          }
          this.$http.get('/cjx/clientinfolist/addAddr.do', {params: {json: JSON.stringify(data)}}).then((res) => {
            if (res.body.message == '操作成功') {
              this.req_site()
            }
          })
        }
        this.closeSiteLayer()
      },
      setDefault(index) {
        for (let i = 0; i < this.addressList.length; i++) {
          this.addressList[i].default_status = 0
        }
        this.addressList[index].default_status = 1;
        this.$http.get('/cjx/clientinfolist/changeAddr.do', {params: {json: JSON.stringify(this.addressList[index])}}).then((res) => {
        })
      },
      modifySite(index) {
        this.siteIndex = index;
        this.user_name = this.addressList[index].user_name;
        this.phone_number = this.addressList[index].phone_number;
        this.detailed_address = this.addressList[index].detailed_address;
        this.select.province.code = this.addressList[index].province;
        this.select.city.code = this.addressList[index].city;
        this.select.area.code = this.addressList[index].county;
        this.select.province.value = this.addressList[index].province_value;
        this.select.city.value = this.addressList[index].city_value;
        this.select.area.value = this.addressList[index].county_value;
        this.siteLayerTitle = '修改地址';
        this.newAddressLayer = !this.newAddressLayer
      },
      back() {
        this.$router.go(-1)
      },
      openOrderPop() {
        if (this.totalBeans > this.dynamic.cd_money) {
          this.$store.dispatch('set_error', {errorCon: '仓豆不够啦 >_<', errorType: 'lessBeans'})
          return false
        }
        this.orderLayerShow = !this.orderLayerShow
      },
      confirmOrder() {
        let data = {
          user_id: this.userInfo.user_id,
          product_id: this.$route.query.product_id,
          purchase_count: this.count,
          customer_message: this.requirement,
          acquisition_addr: this.id,
          totalBeans: this.totalBeans
        }
        console.log(this.requirement);
        //good.recordInfo.product_type = good.goodInfoData.product_type;
        this.$http.post('/api/orderAdminList/orderAdminListInsert.do', data).then((res) => {
          console.log(res.body)
          if (res.body.message == '兑换成功') {
            this.$router.push({path: '/success', query: this.$route.query})
          }
        }, () => {
        })

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

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "order.styl";
</style>



