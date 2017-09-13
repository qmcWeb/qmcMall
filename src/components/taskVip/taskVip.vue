<template>
  <div class="taskVip-wrap">
    <div class="content-wrap">
      <div class="top-tabs">
        <div class="tab" @click="taskShow=true" :class="{active:taskShow}">会员任务</div>
        <div class="tab" @click="taskShow=false" :class="{active:!taskShow}">我的成长值</div>
      </div>
      <div class="tabs-content-wrap">
        <div class="content-wrap task" v-show="taskShow">
          <div class="noLogin" v-show="!logged">
            <img src="./noLogin-Avatar.png" alt="" class="award">
            <p class="text">登录查看会员任务</p>
            <router-link :to="{ path: '/login' }" class="btn">立即登录</router-link>
          </div>
          <div class="section" v-for="item in tasks" v-show="logged">
            <h3 class="title">{{item.title}}</h3>
            <ul class="task-list">
              <li class="item" v-for="task in item.list">
                <i :class="task.iconClass"></i>
                <h3 class="name">{{task.name}}</h3>
                <p class="desc">{{task.desc}}</p>
                <a href="#" v-if="task.complete" class="btn">已完成</a>
                <a href="#" class="btn No-complete" v-else>去完成</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="content-wrap growth" v-show="!taskShow">
          <div class="noLogin" v-show="!logged">
            <img src="./noLogin-Avatar.png" alt="" class="award">
            <p class="text">登录查看我的成长值</p>
            <router-link :to="{ path: '/login' }" class="btn">立即登录</router-link>
          </div>
          <div class="logged" v-show="logged">
            <div class="growth-value">
              您目前的成长值为<span class="gold">10300</span>，您的会员等级为：
              <sapn class="gold">腰缠万贯</sapn>
            </div>
            <div class="select-widget">
              <select name="" id="">
                <option value="">最近一个月</option>
              </select>
            </div>
            <table class="table2">
              <tr>
                <td class="bg">时间</td>
                <td class="bg">成长值</td>
                <td class="bg">来源</td>
                <td class="bg">详细说明</td>
              </tr>
              <tr v-for="item in growthList">
                <td>{{item.time}}</td>
                <td>{{item.value}}</td>
                <td>{{item.where}}</td>
                <td>{{item.desc}}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        tasks: [
          {
            title: '新手任务',
            list: [
              {iconClass: 'icon-real-name', name: '实名认证', desc: '成长值：＋100', complete: false},
              {iconClass: 'icon-recharge', name: '首次充值', desc: '成长值：＋100', complete: false},
              {iconClass: 'icon-measurement', name: '风险测评', desc: '成长值：＋100', complete: false},
            ]
          },
          {
            title: '投资任务',
            list: [
              {iconClass: 'icon-invest', name: '首次投资', desc: '成长值：＋n', complete: false},
              {
                iconClass: 'icon-project', name: '投资任意一个项目', desc: '投资资金越多，时间越长' +
              '成长值越多', complete: false
              },
            ]
          },
          {
            title: '邀请任务',
            list: [
              {iconClass: 'icon-inviteFriends', name: '邀请好友注册并实名认证', desc: '成长值：＋50', complete: false},
              {
                iconClass: 'icon-invite-invest', name: '好友投资', desc: '投资资金越多，时间越长' +
              '成长值越多', complete: false
              },
            ]
          },
          {
            title: '互动任务',
            list: [
              {iconClass: 'icon-sign', name: 'PC端签到', desc: '成长值：＋1', complete: false},
            ]
          }
        ],
        growthList: [
          {
            time: '2017-04-09 17:11:05',
            value: '+480',
            where: '投资成功',
            desc: '投资项目：典贷宝2017-023号；投资金额：20000元'
          }, {
            time: '2017-04-09 17:11:05',
            value: '+480',
            where: '投资成功',
            desc: '投资项目：典贷宝2017-023号；投资金额：20000元'
          }, {
            time: '2017-04-09 17:11:05',
            value: '+480',
            where: '投资成功',
            desc: '投资项目：典贷宝2017-023号；投资金额：20000元'
          }, {
            time: '2017-04-09 17:11:05',
            value: '+480',
            where: '投资成功',
            desc: '投资项目：典贷宝2017-023号；投资金额：20000元'
          }, {
            time: '2017-04-09 17:11:05',
            value: '+480',
            where: '投资成功',
            desc: '投资项目：典贷宝2017-023号；投资金额：20000元'
          }, {
            time: '2017-04-09 17:11:05',
            value: '+480',
            where: '投资成功',
            desc: '投资项目：典贷宝2017-023号；投资金额：20000元'
          }, {time: '2017-04-09 17:11:05', value: '+480', where: '投资成功', desc: '投资项目：典贷宝2017-023号；投资金额：20000元'},
        ],
        taskShow: true,
        logged: true
      }

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "taskVip.styl";

</style>


