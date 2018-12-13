/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-07 16:25:17
 * @Last Modified by: Jessica
 * @Last Modified time: 2018-10-16 20:19:08
 */
<template>
  <div class="client">
    <div style="height: 3rem;width:100%;background-color: #fff;position: fixed;top:0;z-index: -1;background: -webkit-gradient(linear, left top, left bottom, from(#b4ceff), to(#fff));
    background: linear-gradient(#b4ceff, #fff);"></div>
      <div class="card card-shadow">
        <div class="top">
          <img :src="clientInfor.wx_image" alt="" class="avatar">
          <div>
            <p><span class="name">{{clientInfor.wx_name}}</span></p>
            <p class="tag-list" v-if="clientInfor && clientInfor.tag.length > 0">
              <span v-if="clientInfor.tag.length === 1" class="tag-item2" @click="gotoTag">添加标签</span>
              <span v-if="clientInfor.tag.length === 1" class="tag-item2" @click="gotoTag">添加标签</span>
              <span v-if="clientInfor.tag.length === 2" class="tag-item2" @click="gotoTag">添加标签</span>
              <span class="tag-item1" v-for="(item, index) in clientInfor.tag" :key="index" v-if="index<3" @click="gotoTag">{{item}}</span>
              <span v-if="clientInfor.tag.length > 3" class="tag-item1" @click="gotoTag">...</span>
            </p>
            <p v-if="!clientInfor.tag|| clientInfor.tag.length <= 0" class="tag-list">
              <span class="tag-item2" @click="gotoTag">添加标签</span>
              <span class="tag-item2" @click="gotoTag">添加标签</span>
              <span class="tag-item2" @click="gotoTag">添加标签</span>
            </p>
          </div>
        </div>

        <div class="center clearfix">
          <p class="fr" @click="turnoverVisibility = true">
            <popup-picker :data="options1" v-model="option1" :show="turnoverVisibility" value-text-align="center" @on-change="customerSetTurnover" @on-show="pickerShow">
            </popup-picker>
            <span @click="turnoverVisibility = true">AI成交率</span>
            <img @click="turnoverVisibility = true" src="../../assets/img/set.png"/>
          </p>
          <p class="fl" @click="dateVisibility = true">
            <datetime v-model="clientInfor.turnover_date" :start-date="currentTime"  @on-confirm="customerSetTurnoverDate" :show.sync="dateVisibility"></datetime>
            <span @click="dateVisibility = true">预计成交日期</span>
            <img @click="dateVisibility = true" src="../../assets/img/set.png"/>
          </p>
        </div>
      </div>
    <div class="tab">
      <tab :line-width="2" v-model="$store.state.tab.active">
        <tab-item>互动</tab-item>
        <!--<tab-item>资料</tab-item>-->
        <tab-item>相关</tab-item>
        <tab-item>AI分析</tab-item>
        <tab-item>跟进记录</tab-item>
      </tab>
    </div>
    <div class="time-line" v-show="$store.state.tab.active ===0">
      <p v-if="visitList.length <= 0" style="text-align: center;">没有更多数据</p>
      <scroller lock-x height="-270" use-pullup :pullup-config="config" :bounce="true" ref="loadingMore" @on-pullup-loading="loadMore">
        <div>
          <timeline>
            <timeline-item v-for="(item, index) in visitList" :key="index">
              <p class="time">{{Global.parseTime(item.create_time, '{y}-{m}-{d}')}}</p>
              <div class="timeline-wrap">
                <p><i>{{item.wx_name}}</i>在7日内和你互动了<i>{{item.num}}</i>次</p>
              </div>
            </timeline-item>
          </timeline>
        </div>
      </scroller>
    </div>
    <div class="relevant" v-show="$store.state.tab.active === 1">
      <div class="task" @click="viewTaskList(1, '')">
        <div class="item-left">
          <img src="../../assets/img/task.png">
        </div>
        <div class="item-right">
          <p>任务</p>
          <p><span>{{taskTotal}}</span>个</p>
        </div>
      </div>
      <div class="task" @click="clickForm">
        <div class="item-left">
          <img src="../../assets/img/form.png">
        </div>
        <div class="item-right">
          <p>表单</p>
          <p><span>0</span>个</p>
        </div>
      </div>

    </div>
    <div class="client-chart" v-show="$store.state.tab.active ===2">
      <scroller lock-x height="-230" :bounce="true" ref="client-chart">
        <div>
          <div class="care clearfix">
            <div class="title">客户兴趣占比</div>
            <div id="care"></div>
            <ul>
              <li>对公司感兴趣</li>
              <li>对产品感兴趣</li>
              <li>对我感兴趣</li>
            </ul>
          </div>
          <div class="dynamic">
            <div class="title">近15日客户活跃度</div>
            <div id="dynamic"></div>
          </div>
          <div class="news-list-detail">
            <div class="title">客户与我互动</div>
            <p v-for="(item, index) in forMeList" :key="index" class="graph" v-if="item.nums > 0">
              <span>{{item.name}}</span>
              <strong>
                <i :style="{width: item.nums/forMeTotal*80 + '%'}"></i>
                <b>{{item.nums}}</b>
              </strong>
            </p>
            <!--<p v-for="(item, index) in forMeList" :key="index" class="graph" v-if="item.nums > 0">
              <span style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{item.name}}</span>
              <i :style="{width: item.nums/forMeTotal*80 + '%'}"></i>
              <b>{{item.nums}}</b>
            </p>-->
            <p class="tar"></p>
          </div>
        </div>
      </scroller>

    </div>
    <div class="time-line" v-show="$store.state.tab.active ===3">
      <scroller lock-x height="-270" use-pullup :pullup-config="config" :bounce="true" ref="loadingMoreFollow" @on-pullup-loading="loadMoreFollow">
        <div>
          <timeline>
            <timeline-item v-for="(item, index) in followList" :key="index">
              <p class="time">{{Global.parseTime(item.create_time, '{y}-{m}-{d}')}}</p>
              <div class="timeline-wrap">
                <p>{{item.content}}</p>
              </div>
            </timeline-item>
          </timeline>
        </div>
      </scroller>

    </div>
    <div class="client-tab" >
      <ul class="footer">
        <li @click="gotoInfor">
          <img src="../../assets/img/edit-icon.png" @click="gotoInfor">
          <p @click="gotoInfor">编辑资料</p>
        </li>
        <li @click="addTask">
          <img src="../../assets/img/task-icon.png" @click="addTask">
          <p @click="addTask">创建任务</p>
        </li>
        <li @click="gotoFollow">
          <img src="../../assets/img/follow-icon.png" @click="gotoFollow">
          <p @click="gotoFollow">添加跟进</p>
        </li>
        <li @click="gotoIM">
          <img src="../../assets/img/message-icon.png" @click="gotoIM">
          <p @click="gotoIM">发送消息</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {
  PopupRadio,
  PopupPicker,
  Group,
  Datetime,
  Timeline,
  TimelineItem,
  Tab,
  TabItem,
  Scroller
} from 'vux'
import {
  customerRead,
  customerSetTurnover,
  customerSetTurnoverDate,
  visitIndex,
  followIndex,
  AlertModule
} from '@/api/customer'
import { config } from '@/utils/base'
import { getTaskList } from '@/api/task'
import echarts from 'echarts'
/* const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/pie') */

export default {
  name: 'client',
  components: {
    PopupRadio,
    PopupPicker,
    Group,
    Timeline,
    TimelineItem,
    Tab,
    TabItem,
    Scroller,
    Datetime,
    AlertModule
  },
  data () {
    return {
      listQuery: {
        start_time: '',
        end_time: '',
        type: 5
      },
      taskTotal: 0,
      tabIndex: 0,
      currentTime: `${new Date().getFullYear()}-${
        new Date().getMonth() + 1 < 10
          ? `0${new Date().getMonth() + 1}`
          : new Date().getMonth() + 1
      }-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()}`,
      likeTotal: 0, // 兴趣总数
      isPicker: false,
      typeConfig: config,
      dateVisibility: false, // 成交时间是否显示
      turnoverVisibility: false, // 成交率是否显示
      clientInfor: {tag: []}, // 客户信息
      chartInfor: {}, // 客户图标信息
      forMeTotal: 0, // 图表互动总次数
      forMeList: [], // 图表互动列表
      lookData: [], // 圆饼图数据
      activeXData: [], // 折线图数据
      activeYData: [], // 折线图数据
      option1: ['0%'],
      active: 0,
      visitList: [], // 互动列表
      followList: [], // 跟进列表
      page: 1,
      pagesize: 10,
      followPage: 1,
      followPagesize: 10,
      id: 0,
      uid: this.$route.query.uid,
      config: {
        content: '请上拉刷新数据...',
        pullUpHeight: 60,
        height: 40,
        autoRefresh: false,
        downContent: '释放后加载',
        upContent: '请上拉刷新数据...',
        loadingContent: '加载中...',
        clsPrefix: 'xs-plugin-pullup-'
      },
      isFlag: false, // 互动列表上拉是否禁止
      isFlagFollow: false // 跟进记录上拉是否禁止
    }
  },
  methods: {
    clickForm () {
      this.$vux.alert.show({
        title: '温馨提示',
        content: '敬请期待！',
        onShow () {
        },
        onHide () {
        }
      })
    },
    viewTaskList (tabIndex, time) {
      this.$router.push({
        path: '/taskList',
        query: {
          tabIndex: tabIndex,
          time: time
        }
      })
    },
    getTaskLists () {
      getTaskList(this.listQuery).then(res => {
        if (res.code === 200) {
          this.taskTotal = res.data.length
        } else {
          AlertModule.show({
            title: '提示',
            content: res.msg
          })
        }
      })
    },
    addTask () {
      this.$router.push({
        path: '/addTask'
      })
    },
    sendMessage () {
      this.$router.push({
        path: '/messageIM'
      })
    },
    drawChart (option, dom) {
      var myChart = echarts.init(document.getElementById(dom))
      // 绘制图表
      myChart.clear()
      myChart.setOption(option)
    },
    drawCare () {
      const option = {
        color: ['#ff0000', '#feab2b', '#3ec4d2'],
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '75%',
            center: ['50%', '55%'],
            data: [
              {
                name: '公司',
                value: `${(
                  (this.lookData[0] / this.likeTotal) *
                  100
                ).toFixed(1)}`,
                label: {
                  normal: {
                    formatter: '{c}%'
                  }
                }
              },
              {
                name: '产品',
                value: `${(
                  (this.lookData[1] / this.likeTotal) *
                  100
                ).toFixed(1)}`,
                label: {
                  normal: {
                    formatter: '{c}%'
                  }
                }
              },
              {
                name: '个人',
                value: `${(
                  (this.lookData[2] / this.likeTotal) *
                  100
                ).toFixed(1)}`,
                label: {
                  normal: {
                    formatter: '{c}%'
                  }
                }
              }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label: {
              normal: {
                show: true
                // ,
                // position: 'inside'
              }
            }
          }
        ]
      }
      this.drawChart(option, 'care')
    },
    drawDynamic () {
      const option = {
        color: ['#5977fe'],
        xAxis: {
          type: 'category',
          data: this.activeXData
        },
        yAxis: {
          type: 'value'
          // splitLine: {
          //   show: false
          // }
        },
        grid: {
          top: '20',
          left: '15%'
        },
        series: [
          {
            data: this.activeYData,
            type: 'line',
            showSymbol: false
            // smooth: true
          }
        ]
      }
      this.drawChart(option, 'dynamic')
    },
    getCustomer () {
      const data = {
        id: this.uid
      }
      customerRead(data).then(res => {
        if (res.data.info.turnover_date === '' || res.data.info.turnover_date === undefined) {
          res.data.info.turnover_date = '未设置'
        }
        this.clientInfor = res.data.info
        this.chartInfor = res.data.analyze
        this.getForMeTotal(this.chartInfor.count.for_me)
        this.filterConfig(this.chartInfor.count.for_me)
        this.getLookData(this.chartInfor.interest)
        this.getActiveData(this.chartInfor.active)
        this.id = this.clientInfor.id
        this.option1 = [`${this.clientInfor.turnover}%`]
      })
    },
    pickerShow () {
      this.isPicker = true
    },
    customerSetTurnover (val) {
      if (!this.isPicker) {
        return false
      }
      const num = parseInt(val[0].substring(0, val[0].length - 1))
      const data = {
        id: this.id,
        turnover: num
      }
      customerSetTurnover(data).then(res => {
        this.followPage = 1
        this.getFollowIndex()
        this.$refs.loadingMoreFollow.reset({top: 0})
        if (this.isFlagFollow) {
          this.$refs.loadingMoreFollow.enablePullup() // 启用上拉
        }
      })
    },
    customerSetTurnoverDate (val) {
      const data = {
        id: this.id,
        date: val
      }
      customerSetTurnoverDate(data).then(res => {
        this.followPage = 1
        this.getFollowIndex()
        this.$refs.loadingMoreFollow.reset({top: 0})
        if (this.isFlagFollow) {
          this.$refs.loadingMoreFollow.enablePullup() // 启用上拉
        }
      })
    },
    getVisitIndex () {
      const data = {
        type: 'details',
        uid: this.uid,
        page: this.page,
        pagesize: this.pagesize
      }
      visitIndex(data).then(res => {
        this.visitList = res.data.rows
        /* this.$nextTick(()=>{
            this.$refs.loadingMore.reset()
        }) */
      })
    },
    loadMore () {
      this.page += 1
      const data = {
        type: 'details',
        uid: this.uid,
        page: this.page,
        pagesize: this.pagesize
      }
      visitIndex(data).then(res => {
        if (res.data.rows.length === 0) {
          this.$refs.loadingMore.disablePullup() // 禁用上拉
          this.isFlag = true
          return false
        } else {
          this.visitList = this.visitList.concat(res.data.rows)
          this.$refs.loadingMore.donePullup()
            /*this.$nextTick(()=>{
                this.$refs.loadingMore.reset()
            })*/
        }
      })
    },
    getFollowIndex () {
      const data = {
        uid: this.uid,
        page: this.followPage,
        pagesize: this.followPagesize
      }
      followIndex(data).then(res => {
        this.followList = res.data.rows
      })
    },
    loadMoreFollow () {
      this.followPage += 1
      const data = {
        uid: this.uid,
        page: this.followPage,
        pagesize: this.followPagesize
      }
      followIndex(data).then(res => {
        if (res.data.rows.length === 0) {
          this.$refs.loadingMoreFollow.disablePullup() // 禁用上拉
          this.isFlagFollow = true
          return false
        } else {
          this.followList = this.followList.concat(res.data.rows)
          this.$refs.loadingMoreFollow.donePullup()
        }
      })
    },
    getForMeTotal (arr) {
      arr.forEach(element => {
        this.forMeTotal += element.nums
      })
    },
    filterConfig (arr) {
      const reg = /<i>\W+<\/i>/g
      arr.forEach(element => {
        element.name = this.typeConfig[element.type].match(reg)
          ? this.typeConfig[element.type]
            .match(reg)
            .join('')
            .replace(/<i>/g, '')
            .replace(/<\/i>/g, '')
          : ''
      })
      this.forMeList = arr
    },
    getLookData (obj) {
      for (const key in obj) {
        if (key === 'look_web') {
          this.lookData[0] = obj[key]
        } else if (key === 'look_goods') {
          this.lookData[1] = obj[key]
        } else if (key === 'look_me') {
          this.lookData[2] = obj[key]
        }
      }
      this.likeTotal = this.lookData[0] + this.lookData[1] + this.lookData[2]
      if (this.likeTotal === 0) {
        this.likeTotal = 1
      }
    },
    getActiveData (arr) {
      for (const key in arr) {
        this.activeXData.push(key)
        this.activeYData.push(arr[key])
      }
    },
    gotoFollow () {
      this.$router.push({
        path: '/clientFollow',
        query: {
          id: this.id
        }
      })
    },
    gotoInfor () {
      this.$router.push({
        path: '/clientInfor',
        query: {
          id: this.clientInfor.id
        }
      })
    },
    gotoIM () {
      // 进入新的回话前，先清除老的
      this.$store.commit('chat/Clear_char_list')
      this.$store.commit('chat/Clear_img_list')
      if (this.clientInfor.message_id) {
        this.$router.push({
          path: '/messageIM',
          query: {
            id: this.clientInfor.message_id,
            wx_image: this.clientInfor.wx_image,
            uid: this.$route.query.uid
          }
        })
        this.$store.dispatch('chat/GetChat', this.clientInfor.message_id)
        this.$store.dispatch('chat/chat_record', {
          id: this.clientInfor.message_id,
          vm: this
        })
      }
    },
    gotoTag () {
      this.$router.push({
        path: '/clientTag',
        query: {
          uid: this.clientInfor.uid
        }
      })
    }
  },
  computed: {
    options1 () {
      let arr = []
      let probList = []
      for (let index = 1; index <= 100; index++) {
        arr.push(index + '%')
      }
      probList.push(arr)
      return probList
    }
  },
  watch: {
    '$store.state.tab.active' (val) {
      if (val === 2) {
        this.$nextTick(() => {
          this.drawDynamic()
          this.drawCare()
        })
      }
    }
  },
  mounted () {
    this.getCustomer()
    this.getVisitIndex()
    this.getFollowIndex()
    this.getTaskLists()
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.client {
  overflow: hidden;
  height: 100%;
  width: 100%;
  -webkit-overflow-scrolling: touch;
  .card2{
    height: 3rem;
    margin: 0.27rem 0.4rem;
    position: fixed;
    width: 89.5%;
    z-index: 1000;
    background-color: #fff;
    webkit-box-shadow: 2px 2px 18px 3px #ccc;
    -webkit-box-shadow: 2px 2px 18px 3px #ccc;
    box-shadow: 2px 2px 18px 3px #ccc;
    .top {
      padding: 0.3rem 0.3rem 0 0.3rem;
      height: 1.78rem;
      border-bottom: 1px solid #e5e5e5;
      .avatar {
        float: left;
        width: 1.15rem;
        height: 1.15rem;
        border-radius: 0.1rem;
      }
      & > div {
        width: 4.5rem;
        float: right;
        height: 100%;
        p {
          height: 50%;
          /*line-height: 0.8rem;*/
          .name {
            font-size: 0.36rem;
            line-height: 0.5rem;
            color: #353535;
            font-family: '黑体',serif;
            font-weight: bold;
          }
          .edit {
            width: 0.4rem;
            margin-top: 0.2rem;
          }
        }
        .tag-list {
          position: relative;
          overflow: hidden;
          top: -0.2rem;
          .tag-item1 {
            padding: 0 0.15rem;
            height: 0.4rem;
            line-height: 0.4rem;
            border: 1px solid #ff6600;
            border-radius: 0.4rem;
            color: #ff6600;
            float: left;
            font-size: 0.26rem;
            margin-right: 0.1rem;
            margin-top: 0.2rem;
          }
          .tag-item2 {
            padding: 0 0.15rem;
            height: 0.4rem;
            line-height: 0.4rem;
            border: 1px solid #d7d7d7;
            border-radius: 0.4rem;
            color: #999999;
            float: left;
            font-size: 0.26rem;
            margin-right: 0.1rem;
            margin-top: 0.2rem;
          }
          .icon-insert {
            position: absolute;
            top: 0.15rem;
            right: -0.06rem;
            fill: #5977fe;
            width: 0.5rem;
          }
        }
      }
    }
    .center {
      height: 1.2rem;
      & /deep/ .weui-cell {
        min-height: 0.32rem;
        padding: 0;
        .weui-cell__ft {
          padding: 0;
          text-align: center;
          &::after {
            display: none;
          }
        }
      }
      p {
        padding-top: 0.2rem;
        text-align: center;
        width: 50%;
        height: 1.2rem;
        span {
          color: #999999;
          font-size: 0.24rem;
          line-height: 0.5rem;
          font-family: '\9ED1\4F53',serif;
          padding-left: 0.1rem;
          position: relative;
          top: -0.1rem;
        }
        img{
          height: 0.33rem;
          width: 0.33rem;
          position: relative;
          top: -0.02rem;
          left: 0.4rem;
        }
        & /deep/ .vux-datetime-value {
          text-align: center;
          font-size: 0.33rem;
          line-height: 0.5rem;
          font-family: 'Arial Regular',serif;
          color: #353535;
        }
        & /deep/ .vux-cell-value{
          text-align: center;
          font-size: 0.33rem;
          line-height: 0.5rem;
          font-family: '黑体',serif;
          color: #353535;
        }
      }
      p:first-child{
        border-left: 1px solid #e5e5e5;
        padding-left: 0.4rem;
      }
    }
    .down {
      height: 1.2rem;
      p {
        width: 50%;
        height: 1.2rem;
        font-size: 0.3rem;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        img {
          width: 0.28rem;
          margin-left: 0.2rem;
        }
      }
      p:first-child{
        border-right: 1px solid #e5e5e5;
      }
    }
  }
  .card {
    margin: 0.27rem 0.4rem;
    height: 3rem;
    position: relative;
    z-index: 5;
    background-color: #fff;
    webkit-box-shadow: 2px 2px 18px 3px #ccc;
    box-shadow: 2px 2px 18px 3px #ccc;
    .top {
      padding: 0.3rem 0.3rem 0 0.3rem;
      height: 1.78rem;
      border-bottom: 1px solid #e5e5e5;
      .avatar {
        float: left;
        width: 1.15rem;
        height: 1.15rem;
        border-radius: 0.1rem;
      }
      & > div {
        width: 4.8rem;
        float: right;
        height: 100%;
        p {
          height: 50%;
          /*line-height: 0.8rem;*/
          .name {
            font-size: 0.36rem;
            line-height: 0.5rem;
            color: #353535;
            font-family: '黑体',serif;
            font-weight: bold;
          }
          .edit {
            width: 0.4rem;
            margin-top: 0.2rem;
          }
        }
        .tag-list {
          position: relative;
          overflow: hidden;
          top: -0.2rem;
          .tag-item1 {
            padding: 0 0.15rem;
            height: 0.4rem;
            line-height: 0.4rem;
            border: 1px solid #ff6600;
            border-radius: 0.4rem;
            color: #ff6600;
            float: left;
            font-size: 0.26rem;
            margin-right: 0.1rem;
            margin-top: 0.2rem;
            font-family: '黑体',serif;
          }
          .tag-item2 {
            padding: 0 0.15rem;
            height: 0.4rem;
            line-height: 0.4rem;
            border: 1px solid #d7d7d7;
            border-radius: 0.4rem;
            color: #999999;
            float: left;
            font-size: 0.26rem;
            margin-right: 0.1rem;
            margin-top: 0.2rem;
          }
          .icon-insert {
            position: absolute;
            top: 0.15rem;
            right: -0.06rem;
            fill: #5977fe;
            width: 0.5rem;
          }
        }
      }
    }
    .center {
      height: 1.2rem;
      & /deep/ .weui-cell {
        min-height: 0.32rem;
        padding: 0;
        .weui-cell__ft {
          padding: 0;
          text-align: center;
          &::after {
            display: none;
          }
        }
      }
      p {
        a{
          -webkit-tap-highlight-color: rgba(0,0,0,0);
        }
        padding-top: 0.2rem;
        text-align: center;
        width: 50%;
        height: 1.2rem;
        span {
          color: #999999;
          font-size: 0.24rem;
          line-height: 0.5rem;
          font-family: '\9ED1\4F53',serif;
          padding-left: 0.1rem;
          position: relative;
          top: -0.1rem;
        }
        img{
          height: 0.33rem;
          width: 0.33rem;
          position: relative;
          top: -0.02rem;
          left: 0.4rem;
        }
        & /deep/ .vux-datetime-value {
          text-align: center;
          font-size: 0.33rem;
          line-height: 0.5rem;
          font-family: '黑体',serif;
          color: #353535;
          background-color: #fff;
        }
        & /deep/ .vux-popup-picker-select {
          width: 100%;
          position: relative;
          background-color: #fff;
        }
        & /deep/ .vux-cell-value{
          text-align: center;
          font-size: 0.33rem;
          line-height: 0.5rem;
          font-family: '黑体',serif;
          color: #353535;
          background-color: #fff;
        }
      }
      p:first-child{
        border-left: 1px solid #e5e5e5;
        padding-left: 0.4rem;
      }
    }
    .down {
      height: 1.2rem;
      p {
        width: 50%;
        height: 1.2rem;
        font-size: 0.3rem;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        img {
          width: 0.28rem;
          margin-left: 0.2rem;
        }
      }
      p:first-child{
        border-right: 1px solid #e5e5e5;
      }
    }
  }
  .tab{
    margin-top: 0.44rem;
    border-top: 1px solid #e5e5e5;
  }
  .time-line {
    & /deep/ .vux-timeline {
      padding: 0.2rem;
      .vux-timeline-item-content {
        padding: 0 0 0.3rem 0.3rem;
      }
    }
    & /deep/ .vux-timeline-item-tail {
      background-color: #3f82ff;
    }
    & /deep/ .vux-timeline-item-color {
      background-color: #3f82ff;
    }
    .time{
      padding-left: 0.46rem;
      height: 0.8rem;
      font-size: 0.24rem;
      line-height: 0.5rem;
      font-family: 'Arial Regular',serif;
      color: #999999;
      padding-top: 0.3rem;
    }
    .timeline-wrap {
      padding-left: 0.46rem;
      p {
        font-size: 0.28rem;
        line-height: 0.5rem;
        color: #353535;
        font-family: '黑体',serif;
        i{
          color: #3e80f4;
        }
      }
    }
  }
  .relevant{
    display: flex;
    justify-content: space-between;
    padding: 0.3rem 0.24rem;
    .task{
      width: 3.2rem;
      height: 1.83rem;
      border: 1px solid #e6e5e5;
      border-radius: 0.1rem;
      padding-top: 0.51rem;
      padding-left: 0.41rem;
      .item-left{
        float: left;
        width: 35%;
        img{
          width: 0.52rem;
          height: 0.66rem;
        }
      }
      .item-right{
        float: right;
        width: 65%;
        p:nth-child(1){
          font-size: 0.33rem;
          height: 0.5rem;
          color: #353535;
          font-family: '黑体',serif;
        }
        p:nth-child(2){
          font-size: 0.24rem;
          height: 0.5rem;
          color: #999999;
          font-family: '黑体',serif;
          span{
            color: #3d83ff;
            font-family: 'Arial',serif;
          }
        }
      }
    }
    .form{
      width: 3.17rem;
      height: 1.83rem;
      border: 1px solid #e6e5e5;
      border-radius: 0.1rem;
    }
  }
  .client-tab {
    border-top: 1px solid #eee;
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    .footer{
      background-color: #f8f8f8;
      height: 1.08rem;
      padding: 0.2rem;
      li{
        width: 25%;
        float: left;
        display: inline-block;
        padding: 0 0.3rem;
        p {
          height: 0.22rem;
          line-height: 0.5rem;
          font-size: 0.22rem;
          color: #666666;
          font-family: '\9ED1\4F53',serif;
        }
        img{
          width: 0.36rem;
          height: 0.35rem;
          position: relative;
          left: 0.3rem;
        }
      }
    }
  }
  .client-action {
    & > p {
      text-align: center;
      margin-top: 0.4rem;
    }
    li {
      // height: 2.2rem;
      & > p {
        margin: 0.4rem 0;
        font-size: 0.3rem;
        color: #717171;
        text-decoration: underline;
        text-align: center;
      }
      & > div {
        display: flex;
        // height: 1.4rem;
        padding: 0.25rem;
        img {
          height: 100%;
          width: 0.9rem;
          float: left;
          margin-right: 0.3rem;
        }
        p {
          font-size: 0.3rem;
          color: #717171;
          height: 100%;
          // line-height: 0.9rem;
          float: left;
        }
      }
    }
  }
  .client-chart {
    .news-list-detail {
      padding-bottom: 1.5rem;
      .title{
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: left;
        font-size: 0.3rem;
        color: #353535;
        font-family: '黑体',serif;
        border-bottom: 1px solid #e5e5e5;
        padding-left: 0.25rem;
      }
      .graph{
        height: 0.7rem;
        line-height: 0.7rem;
        padding: 0.46rem 0.4rem 0 0.8rem;
        span{
          float: left;
          width: 1.5rem;
          position: relative;
          text-align: left;
          font-size: 0.24rem;
          line-height: 0.36rem;
          color: #666666;
          font-family: '黑体',serif;
        }
        strong{
          float: left;
          width: 4.2rem;
          height: 0.7rem;
          position: relative;
          top: -0.17rem;
          margin-left: 0.3rem;
          color: #717171;
          i{
            display: inline-block;
            height: 0.2rem;
            border-radius: 0.1rem;
            margin-right: 5px;
            min-width: 1px !important;

          }
        }
        &:nth-child(7n+1){
          i{
            background: linear-gradient(left, #5a55d3, #5a55d3);
            background: -webkit-linear-gradient(left, #5a55d3, #5a55d3);
          }
        }
        &:nth-child(7n+2){
          i{
            background: linear-gradient(left, #3e84ff, #3e84ff);
            background: -webkit-linear-gradient(left, #3e84ff, #3e84ff);
          }
        }
        &:nth-child(7n+3){
          i{
            background: linear-gradient(left, #0eae2c, #0eae2c);
            background: -webkit-linear-gradient(left, #0eae2c, #0eae2c);
          }
        }
        &:nth-child(7n+4){
          i{
            background: linear-gradient(left, #8fc31f, #8fc31f);
            background: -webkit-linear-gradient(left, #8fc31f, #8fc31f);
          }
        }
        &:nth-child(7n+5){
          i{
            background: linear-gradient(left, #00acc1, #00acc1);
            background: -webkit-linear-gradient(left, #00acc1, #00acc1);
          }
        }
        &:nth-child(7n+6){
          i{
            background: linear-gradient(left, #fb9505, #fb9505);
            background: -webkit-linear-gradient(left, #fb9505, #fb9505);
          }
        }
        &:nth-child(7n+7){
          i{
            background: linear-gradient(left, #ff2854, #ff2854);
            background: -webkit-linear-gradient(left, #ff2854, #ff2854);
          }
        }
      }
    }
    .care {
      border-top: 1px solid #f8f8f8;
      border-bottom: 0.1rem solid #f8f8f8;
      .title{
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: left;
        font-size: 0.3rem;
        color: #353535;
        font-family: '黑体',serif;
        border-bottom: 1px solid #e5e5e5;
        padding-left: 0.25rem;
      }
      #care {
        width: 100%;
        height: 3.6rem;
      }
      ul {
        padding: 0 0.2rem;
      }
      li {
        width: 33.33%;
        float: left;
        height: 0.5rem;
        font-size: 0.3rem;
        line-height: 0.5rem;
        text-align: center;
        color: #666666;
        position: relative;
        margin-bottom: 0.4rem;
        font-family: '黑体',serif;
        &::after {
          content: '';
          position: absolute;
          top: 0.14rem;
          left: 0;
          width: 0.22rem;
          height: 0.22rem;
          border-radius: 0.22rem;
        }
        &:nth-child(1)::after {
          background-color: #ff0000;
        }
        &:nth-child(2)::after {
          background-color: #feab2b;
        }
        &:nth-child(3)::after {
          background-color: #3ec4d2;
        }
      }
    }
    .dynamic {
      border-bottom: 0.1rem solid #f8f8f8;
      .title{
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: left;
        font-size: 0.3rem;
        color: #353535;
        font-family: '黑体',serif;
        border-bottom: 1px solid #e5e5e5;
        padding-left: 0.25rem;
      }
      #dynamic {
        width: 100%;
        height: 4rem;
      }
    }
  }
}
</style>
