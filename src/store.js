/**
 * Created by sks on 2017/9/6.
 */
import Vue from 'vue'
import {setCookie, getCookie} from '@/common/js/cookie.js';
export default {
  state: {
    userInfo: '',
    indexData: '',
    listData: '',
    detailData: '',
    goodTypeData: '',
    listParamsData: '',
    loginShow: true,
    error: '',
    success: false,
    dynamic: '',
    noLogged: false,
    pageNumber: ''
  },
  actions: {

    //请求商品种类
    req_goodTypeData: function ({commit}) {
      Vue.http.get('/api/commodity/queryCommodityType.do').then(response => {
        commit('SET_type_data', {data: response.body.list});
      })
    },
    //设置用户信息
    req_userInfo: function ({commit}, infoData) {
      commit('SET_userInfo_data', {data: infoData});
    },
    //从cookie获取用户信息
    get_user_fromCk: function ({commit}) {
      var userInfo;
      if (getCookie('user_info')) {
        userInfo = JSON.parse(getCookie('user_info'))
        //有cookie  就是登录的
        commit('SET_NoLogged', false);
      } else {
        userInfo = '';
        //判断没有登录
        commit('SET_NoLogged', true);
      }
      commit('SET_userInfo_data', {data: userInfo});
    },
    //请求动态用户信息level，仓豆
    get_userInfo_dynamic: function ({commit}, userID) {
      return new Promise(function (resolve, reject) {
        Vue.http.get('/cjx/Associator_center/getAssociatorNewInfo.do', {params: userID}).then(response => {
          commit('SET_userInfo_dynamic', {data: response.body});
          console.log(response.body)
          resolve(response.body)
        }, response => {
          reject(response.status)
        })
      })

    },
    //请求首页列表数据
    req_indexData: function ({commit}) {
      Vue.http.get('/cjx/commodity/showIndexList.do').then(response => {
        commit('SET_indexData', {data: response.body});
      });
    },
    //请求不同的列表页
    req_listData: function ({commit}, reqparams) {
      return new Promise(function (resolve, reject) {
        Vue.http.get('/api/commodity/screenOrderCommodityList.do', {params: reqparams}).then(response => {
          commit('SET_listData', {data: response.body.dataBody});
          commit('SET_pageNumber', {data: response.body.pageNumber});
          console.log(response.body)
          resolve(response.body)
        }, response => {
          reject(response.status)
        })
      })
    },
    //设置商品详情 随是点击替换
    set_goodDetailData: function ({commit}, params) {
      commit('set_goodDetail', {data: params});
    },
    req_detailData: function ({commit}, {proId, user}) {
      return new Promise(function (resolve, reject) {
        Vue.http.get('/api/commodity/productDetails.do', {
          params: {
            product_id: proId,
            user_id: user
          }
        }).then(response => {
          resolve(response.body)
        }, response => {
          reject(response.status)
        })
      })
    },
    //设置更新购买错误信息
    set_error: function ({commit}, errorObj) {
      commit('change_error', {data: errorObj});
    },
    /*会员中心*/

  },
  getters: {
    new_index_data: state => {
      let new_list = {};
      let old_list = state.indexData;
      for (let i = 0; i < old_list.length; i++) {
        if (!new_list[old_list[i].type]) {
          new_list[old_list[i].type] = []
        }
      }
      for (let i = 0; i < old_list.length; i++) {
        new_list[old_list[i].type].push(old_list[i])
      }
      return new_list
    },
    /*new_type_data:state => {
     let new_type=[{con: '全部', select: true, call: 'all'}]
     let type_Arr_data = state.goodTypeData;
     for (let i = 0; i < type_Arr_data.length; i++) {
     new_type.push({con: type_Arr_data[i].name, select: false, call: type_Arr_data[i].id})
     }
     return new_type
     },*/
  },
  mutations: {
    //设置state
    SET_NoLogged: (state, bool) => {
      state.noLogged = bool
    },
    SET_type_data: (state, {data}) => {
      state.goodTypeData = data
    },
    SET_userInfo_data: (state, {data}) => {
      state.userInfo = data
    },
    SET_indexData: (state, {data}) => {
      state.indexData = data
    },
    SET_listParamsMinData: (state, message) => {
      state.listParamsData.priceMin = message
    },
    SET_listParamsMaxData: (state, message) => {
      state.listParamsData.priceMax = message
    },
    SET_listData: (state, {data}) => {
      state.listData = data
    },
    set_goodDetail: (state, {data}) => {
      state.detailData = data
    },
    increment (state) {
      state.loginShow = !state.loginShow;
    },
    change_error: (state, {data}) => {
      state.error = data
    },
    set_vipInfo: (state, {data}) => {
      state.vipInfo = data
    },
    set_right: (state, {data}) => {
      state.rightCards = data
    },
    set_success: (state, data) => {
      state.success = data
    },
    SET_userInfo_dynamic: (state, {data}) => {
      state.dynamic = data
    },
    SET_pageNumber: (state, {data}) => {
      state.pageNumber = data
    },
  }
}

