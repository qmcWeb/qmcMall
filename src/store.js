/**
 * Created by sks on 2017/9/6.
 */
import Vue from 'vue'
export default {
  state: {
    userInfo: '',
    indexData: '',
    listData: '',
    detailData: '',
    goodTypeData: '',
    listParamsData: '',
    loginShow: true
  },
  actions: {
    //请求商品种类
    req_goodTypeData: function ({commit}) {
      Vue.http.get('/api/commodity/queryCommodityType.do').then(response => {
        commit('SET_type_data', {data: response.body.list});
      })
    },
    //请求用户信息
    req_userInfo: function ({commit}) {
      Vue.http.get('/api/associatorUser/getUser.do', {params: {user_id: 'admin'}}).then(response => {
        commit('SET_userInfo_data', {data: response.body});
      });
    },
    //请求首页列表数据
    req_indexData: function ({commit}) {
      Vue.http.get('/cjx/commodity/showIndexList.do').then(response => {
        commit('SET_indexData', {data: response.body.list});
      });
    },
    //存储列表查询参数
    set_listParamsData: function ({commit}, params) {
      commit('set_listParams', {data: params});
    },
    //请求不同的列表页
    req_listData: function ({commit}) {
      Vue.http.get('/api/commodity/screenOrderCommodityList.do', {params: this.state.listParamsData}).then(response => {
        commit('SET_listData', {data: response.body.list});
        console.log('请求不同的列表页')
      });
    },
    //设置商品详情 随是点击替换
    set_goodDetailData: function ({commit}, params) {
      commit('set_goodDetail', {data: params});
      console.log('存储列表查询参数')
    },

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
    SET_type_data: (state, {data}) => {
      state.goodTypeData = data
    },
    SET_userInfo_data: (state, {data}) => {
      state.userInfo = data
    },
    SET_indexData: (state, {data}) => {
      state.indexData = data
    },
    set_listParams: (state, {data}) => {
      state.listParamsData = data
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
    }
  }
}

