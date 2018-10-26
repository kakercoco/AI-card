/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-07 16:25:17
 * @Last Modified by: Jessica
 * @Last Modified time: 2018-10-16 20:19:08
 */
<template>
  <div class="client">
    <div style="height: 4rem;width:100%;background-color: #fff;position: fixed;top:0;z-index: 999"></div>
    <div :class="active ===2 ? 'card2 card-shadow' : 'card card-shadow'">
        <div class="top">
          <img :src="clientInfor.wx_image" alt="" class="avatar">
          <div>
            <p><span class="name">{{clientInfor.wx_name}}</span><img src="@/assets/icon/edit.png" class="fr edit" alt="" @click="gotoInfor"></p>
            <p class="tag-list">
              <span v-for="(item, index) in clientInfor.tag" :key="index" v-if="index<2">{{item}}</span>
              <span v-if="clientInfor.tag && clientInfor.tag.length>2">···</span>
              <x-icon type="ios-plus-outline" class="fr icon-insert" @click.native="gotoTag"></x-icon>
            </p>
          </div>
        </div>

        <div class="center clearfix">
          <p class="fl">
            <popup-picker :data="options1" v-model="option1" :show="turnoverVisibility" value-text-align="center" @on-change="customerSetTurnover" @on-show="pickerShow">
            </popup-picker>
            <span @click="turnoverVisibility = true">设置成交概率</span>
          </p>
          <p class="fr">
            <datetime v-model="clientInfor.turnover_date" @on-confirm="customerSetTurnoverDate" :show.sync="dateVisibility"></datetime>
            <span @click="dateVisibility = true">预设成交时间</span>
          </p>
        </div>
        <div class="down">
          <p class="fl" @click="gotoIM">
            <span>会话</span>
            <img src="@/assets/img/wchat.png" alt="">
          </p>
          <p class="fr" @click="gotoFollow">
            <span>跟进</span>
            <img src="@/assets/img/detail.png" alt="">
          </p>
        </div>
      </div>
    <div class="client-action" v-show="active ===0">
      <p v-if="visitList.length <= 0">没有更多数据</p>
      <scroller lock-x height="7.5rem" use-pullup :pullup-config="config" :bounce="true" ref="loadingMore" @on-pullup-loading="loadMore">
        <div>
          <ul>
            <li v-for="(item, index) in visitList" :key="index">
              <p class="time">{{Global.parseTime(item.create_time, '{y}-{m}-{d}')}}</p>
              <div class="card-shadow">
                <img :src="item.wx_image" alt="">
                <p>{{item.wx_name}}在7日内和你互动了{{item.num}}次</p>
              </div>
            </li>
          </ul>
        </div>
      </scroller>
    </div>
    <div class="time-line" v-show="active === 1">
      <scroller lock-x height="7.5rem" use-pullup :pullup-config="config" :bounce="true" ref="loadingMoreFollow" @on-pullup-loading="loadMoreFollow">
        <div>
          <timeline>
            <timeline-item v-for="(item, index) in followList" :key="index">
              <div class="timeline-wrap">
                <h4>{{item.content}}</h4>
                <p>{{Global.parseTime(item.create_time)}}</p>
              </div>
            </timeline-item>
          </timeline>
        </div>
      </scroller>
    </div>
    <div class="client-chart" v-show="active ===2">
      <div class="news-list-detail">
        <div class="tac">{{clientInfor.wx_name}}在7日内和你互动了{{forMeTotal}}次</div>
        <p v-for="(item, index) in forMeList" :key="index" class="graph" v-if="item.nums > 0">
          <span style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{item.name}}</span>
          <i :style="{width: item.nums/forMeTotal*80 + '%'}"></i>
          <b>{{item.nums}}</b>
        </p>
        <p class="tar"></p>
      </div>
      <div class="care clearfix">
        <h5 class="tac">客户兴趣</h5>
        <div id="care"></div>
        <ul>
          <li>对公司感兴趣</li>
          <li>对产品感兴趣</li>
          <li>对我感兴趣</li>
        </ul>
      </div>
      <div class="dynamic">
        <h5 class="tac">近15日客户活跃度</h5>
        <div id="dynamic"></div>
      </div>
    </div>
    <tab v-model="active" class="client-tab" :line-width="0">
      <tab-item><span>互动</span></tab-item>
      <tab-item><span>跟进记录</span></tab-item>
      <tab-item><span>分析</span></tab-item>
    </tab>
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
import echarts from 'echarts'
import {
  customerRead,
  customerSetTurnover,
  customerSetTurnoverDate,
  visitIndex,
  followIndex
} from '@/api/customer'
import { config } from '@/utils/base'

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
    Datetime
  },
  data () {
    return {
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
    active (val) {
      if (val === 2) {
        this.$nextTick(() => {
          this.drawCare()
          this.drawDynamic()
        })
      }
    }
  },
  mounted () {
    this.getCustomer()
    this.getVisitIndex()
    this.getFollowIndex()
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.client {
  padding: 0.5rem 0.3rem;
  padding-bottom: 45px;
  overflow: auto;
  height: 100%;
  width: 100%;
  -webkit-overflow-scrolling: touch;
  .card2{
    height: 3.8rem;
    padding: 0.3rem 0.25rem 0.3rem 0.25rem;
    position: fixed;
    top:0.5rem;
    z-index: 1000;
    width: 92%;
    background-color: #fff;
    .top {
      height: 1.6rem;
      .avatar {
        float: left;
        width: 1.6rem;
        height: 100%;
        border-radius: 0.1rem;
      }
      & > div {
        width: 4.5rem;
        float: right;
        height: 100%;
        p {
          height: 50%;
          line-height: 0.8rem;
          .name {
            font-size: 0.3rem;
          }
          .edit {
            width: 0.4rem;
            margin-top: 0.2rem;
          }
        }
        .tag-list {
          position: relative;
          overflow: hidden;
          span {
            padding: 0 0.15rem;
            height: 0.4rem;
            line-height: 0.4rem;
            border: 1px solid #a561fb;
            border-radius: 0.4rem;
            color: #a561fb;
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
      padding: 0.2rem 0;
      border-bottom: 1px solid #ddd;
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
        text-align: center;
        width: 2.5rem;
        height: 0.7rem;
        span {
          color: #717171;
        }
        & /deep/ .vux-datetime-value {
          color: #717171;
          min-height: 0.32rem;
        }
      }
    }
    .down {
      p {
        width: 2.5rem;
        height: 0.7rem;
        font-size: 0.3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 0.28rem;
          margin-left: 0.2rem;
        }
      }
    }
  }
  .card {
    height: 3.8rem;
    padding: 0.3rem 0.25rem;
    position: relative;
    z-index: 999;
    .top {
      height: 1.6rem;
      .avatar {
        float: left;
        width: 1.6rem;
        height: 100%;
        border-radius: 0.1rem;
      }
      & > div {
        width: 4.5rem;
        float: right;
        height: 100%;
        p {
          height: 50%;
          line-height: 0.8rem;
          .name {
            font-size: 0.3rem;
          }
          .edit {
            width: 0.4rem;
            margin-top: 0.2rem;
          }
        }
        .tag-list {
          position: relative;
          overflow: hidden;
          span {
            padding: 0 0.15rem;
            height: 0.4rem;
            line-height: 0.4rem;
            border: 1px solid #a561fb;
            border-radius: 0.4rem;
            color: #a561fb;
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
      padding: 0.2rem 0;
      border-bottom: 1px solid #ddd;
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
        text-align: center;
        width: 2.5rem;
        height: 0.7rem;
        span {
          color: #717171;
        }
        & /deep/ .vux-datetime-value {
          color: #717171;
          min-height: 0.32rem;
        }
      }
    }
    .down {
      p {
        width: 2.5rem;
        height: 0.7rem;
        font-size: 0.3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 0.28rem;
          margin-left: 0.2rem;
        }
      }
    }
  }
  .time-line {
    padding: 0;
    & /deep/ .vux-timeline {
      padding: 0.2rem;
      .vux-timeline-item-content {
        padding: 0 0 0.3rem 0.3rem;
      }
    }
    .timeline-wrap {
      padding-left: 0.35rem;
      color: #717171;
      p {
        margin-top: 0.1rem;
      }
      h4{
        font-weight: normal;
      }
    }
  }
  .client-tab {
    border-top: 1px solid #eee;
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    .vux-tab-item {
      span {
        display: inline-block;
        border-radius: 28px;
        height: 28px;
        line-height: 28px;
        padding: 0 0.2rem;
      }
    }
    .vux-tab-selected {
      span {
        border: 1px solid #5977fe;
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
    margin-top: 4.3rem;
    .news-list-detail {
      margin-top: 0.3rem;
      .avatar {
        display: block;
        margin: 0 auto;
        width: 1.5rem;
        height: 1.5rem;
      }
      // p{
      //   &:nth-of-type(2){
      //     margin: 0.4rem 0;
      //     font-size: 0.22rem;
      //     color: #717171;
      //   }
      //   &:last-child{
      //     height: 1rem;
      //     padding: 0 0.15rem;
      //   }
      //   .icon{
      //     fill: #999;
      //   }
      // }
      .graph {
        height: 0.7rem;
        line-height: 0.7rem;
        padding: 0 0.3rem;
        display: flex;
        align-items: center;
        span {
          width: 2rem;
          padding-left: 0.3rem;
          position: relative;
          &::after {
            content: '';
            width: 0.1rem;
            height: 0.1rem;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            transform: translateY(-60%);
            left: 0;
          }
        }
        i {
          display: inline-block;
          height: 0.2rem;
          border-radius: 0.1rem;
          margin-left: 0.5rem;
          margin-right: 0.1rem;
          max-width: 60%;
        }
        &:nth-of-type(3n+1) {
          span::after {
            background-color: #ff0000;
          }
        }
        &:nth-of-type(3n+2) {
          span::after {
            background-color: #653ffe;
          }
        }
        &:nth-of-type(3n+3) {
          span::after {
            background-color: #73a6fb;
          }
        }
        &:nth-of-type(5n + 1) {
          i {
            background: linear-gradient(left, #cc00ff, #b1181a);
            background: -webkit-linear-gradient(left, #cc00ff, #b1181a);
          }
        }
        &:nth-of-type(5n + 2) {
          i {
            background: linear-gradient(left, #cc00ff, #5747fe);
            background: -webkit-linear-gradient(left, #cc00ff, #5747fe);
          }
        }
        &:nth-of-type(5n + 3) {
          i {
            background: linear-gradient(left, #cc00ff, #6eaffb);
            background: -webkit-linear-gradient(left, #cc00ff, #6eaffb);
          }
        }
        &:nth-of-type(5n + 4) {
          i {
            background: linear-gradient(left, #cd01fd, #fd5b66);
            background: -webkit-linear-gradient(left, #cd01fd, #fd5b66);
          }
        }
        &:nth-of-type(5n + 5) {
          i {
            background: linear-gradient(left, #c781f9, #0fba40);
            background: -webkit-linear-gradient(left, #c781f9, #0fba40);
          }
        }
      }
    }
    .care {
      border-bottom: 1px solid #eee;
      border-top: 1px solid #eee;
      h5 {
        margin: 0.4rem 0 0rem;
        font-size: 0.3rem;
        color: #717171;
        font-weight: normal;
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
        line-height: 0.5rem;
        text-align: center;
        color: #717171;
        position: relative;
        margin-bottom: 0.4rem;
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
      h5 {
        margin: 0.4rem 0 0rem;
        font-size: 0.3rem;
        color: #717171;
        font-weight: normal;
      }
      #dynamic {
        width: 100%;
        height: 4rem;
      }
    }
  }
}
</style>
