<template>
  <div class="taskVip-wrap">
    <div class="content-wrap">
      <div class="top-tabs">
        <div class="tab" @click="taskShow=true" :class="{active:taskShow}">会员任务</div>
        <div class="tab" @click="taskShow=false" :class="{active:!taskShow}">我的成长值</div>
      </div>
      <div class="tabs-content-wrap">
        <div class="content-wrap task" v-show="taskShow">
          <div class="noLogin" v-if="noLogged">
            <img src="./noLogin-Avatar.png" alt="" class="award">
            <p class="text">登录查看会员任务</p>
            <router-link :to="{path: '/login',query:{where:'Vip'}}" class="btn">立即登录</router-link>
          </div>
          <div class="section" v-for="item in tasks" v-if="IsLogged">
            <h3 class="title">{{item.privilege_type}}</h3>
            <ul class="task-list">
              <li :class="['item',task.task_name==='APP端签到'?'app':'']" v-for="task in item.privilege_list">
                <div v-if="task.task_name==='APP端签到'" class="img-wrap">
                  <div class="img-wrap">
                    <img src="./2wm.png" alt="">
                    <p>手机扫描下载钱满仓APP</p>
                  </div>
                </div>
                <div class="card-wrap">
                  <i :class="task.className"></i>
                  <h3 class="name">{{task.task_name}}</h3>
                  <p class="desc" v-if="task.task_name!=='好友投资' && task.task_name!=='投资任意一个项目'">成长值：+ {{task.task_value}}</p>
                  <p class="desc" v-if="task.task_name==='好友投资'">投资资金越多，时间越长成长值越多</p>
                  <p class="desc" v-if="task.task_name==='投资任意一个项目'">投资资金越多，时间越长成长值越多</p>
                  <a href="JavaScript:;" v-if="task.complete && task.task_name!=='好友投资'" class="btn">已完成</a>
                  <router-link :to="{path: '/homeVip'}" class="btn No-complete"
                               v-if="!task.complete && task.task_name==='PC端签到'">去完成
                  </router-link>
                  <a :href="linkName(task.task_name)" v-if="!task.complete && task.task_name!=='PC端签到'"
                     class="btn No-complete">去完成</a>
                  <p class="signTxt" v-if="task.task_name==='APP端签到'">
                    连续签满5天／7天有惊喜哦～
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="content-wrap growth" v-show="!taskShow">
          <div class="noLogin" v-if="noLogged">
            <img src="./noLogin-Avatar.png" alt="" class="award">
            <p class="text">登录查看我的成长值</p>
            <router-link :to="{ path: '/login',query:{where:'Vip'}}" class="btn">立即登录</router-link>
          </div>
          <div class="logged" v-if="IsLogged">
            <div class="growth-value">
              您目前的成长值为<span class="gold">{{dynamic.growth_value}}</span>，您的会员等级为：
              <span class="gold">{{dynamic.privilege_name}}</span>
            </div>
            <div class="select-widget">
              <select name="" id="" @change="changeQuery(selected)" v-model="selected">
                <option :value="item.value" v-for="item in options" :name="item.value"> {{item.text}}</option>
              </select>
            </div>
            <table class="table2">
              <tr>
                <td class="bg">时间</td>
                <td class="bg">成长值</td>
                <td class="bg">来源</td>
                <td class="bg">详细说明</td>
              </tr>
              <tr v-for="item in growthList" v-if="growthList.length">
                <td>{{item.grow_time}}</td>
                <td>{{item.grow_value}}</td>
                <td>{{item.grow_source}}</td>
                <td>{{item.grow_info}}</td>
              </tr>
              <tr v-if="growthList.length===0">
                <td colspan="4">暂时未有成长值记录</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  export default{
    data(){
      return {
        tasks: [],
        qmcLink: [
          'https://www.qianmancang.com/shiming',
          'https://www.qianmancang.com/user/recharge',
          'https://www.qianmancang.com/user/riskEvaluation',
          'https://www.qianmancang.com/loan-list',
          'https://www.qianmancang.com/loan-list',
          'https://www.qianmancang.com/user/invitation_prize',
        ],
        growthList: [],
        taskShow: true,
        logged: true,
        selected: 1,
        options: [
          {text: '最近一个月', value: 1},
          {text: '最近三个月', value: 3},
          {text: '最近一年', value: 12}
        ],
      }

    },
    methods: {
      changeQuery: function (value) {
        var _this = this
        this.$http.get(this.cjx + '/Associator_center/getGrowthValueList.do', {
          params: {
            user_id: this.userInfo.user_id,
            flag: value
          }
        }).then(response => {
          console.log(response.body)
          _this.growthList = response.body.list
        }, response => {
          console.log(response.status)
        })
      },
      requestTask(){
        var _this = this
        this.$http.get(this.cjx + '/associatorTaskInfo/getUserTaskStatus.do', {
          params: {
            user_id: this.userInfo.user_id,
          }
        }).then(response => {
          this.tasks = response.body.taskInfo
          console.log(response.body)
          //_this.growthList=response.body.list
        }, response => {
          //console.log(response.status)
        })
      },
      linkName(name){
        switch (name) {
          case '实名认证':
            return this.qmcLink[0]
            break;
          case '首次充值':
            return this.qmcLink[1]
            break;
          case '风险测评':
            return this.qmcLink[2]
            break;
          case '首次投资':
            return this.qmcLink[3]
            break;
          case '投资任意一个项目':
            return this.qmcLink[4]
            break;
          case '邀请好友注册并实名认证':
            return this.qmcLink[5]
            break;
        }
      }
    },
    created(){
      if (this.userInfo) {
        this.changeQuery(1);
        this.requestTask();
      }
    },
    computed: {
      ...mapState([
        'userInfo', 'IsLogged', 'dynamic', 'noLogged'
      ]),

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "taskVip.styl";

</style>


