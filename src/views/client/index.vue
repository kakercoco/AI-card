/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-07 16:25:17
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-19 21:36:27
 */
<template>
  <div class="client">
    <div class="card-shadow card">
      <div class="top">
        <img :src="clientInfor.wx_image" alt="" class="avatar">
        <div>
          <p><span class="name">{{clientInfor.wx_name}}</span><img src="@/assets/icon/edit.png" class="fr edit" alt="" @click="gotoInfor"></p>
          <p class="tag-list">
            <span v-for="(item, index) in clientInfor.tag" :key="index">{{item}}</span>
            <x-icon type="ios-plus-outline"  class="fr icon-insert" @click.native="gotoTag"></x-icon>
          </p>
        </div>
      </div>
      <div class="center clearfix">
        <p class="fl">
          <popup-picker :data="options1"  v-model="option1" value-text-align="center" @on-change="customerSetTurnover">
          </popup-picker>
          <span>设置成交概率</span>
        </p>
        <p class="fr">
            <datetime v-model="clientInfor.turnover_date" @on-confirm="customerSetTurnoverDate"></datetime>
          <span>预设成交时间</span>
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
    <div class="time-line" v-show="active === 1">
      <timeline>
        <timeline-item>
          <div class="timeline-wrap">
            <h4>【广东】 广州市 已发出</h4>
            <p >2016-04-17 12:00:00</p>
          </div>
        </timeline-item>
        <timeline-item>
          <div class="timeline-wrap">
            <h4>申通快递员 广东广州 收件员 xxx 已揽件</h4>
            <p>2016-04-16 10:23:00</p>
          </div>
        </timeline-item>
        <timeline-item>
          <div class="timeline-wrap">
            <h4> 商家正在通知快递公司揽件</h4>
            <p>2016-04-15 9:00:00</p>
          </div>
        </timeline-item>
      </timeline>
    </div>
    <div class="client-chart" v-show="active ===2">
      <div class="news-list-detail">
        <p class="title">
          <img src="@/assets/img/u112.png" alt="" class="avatar">
        </p>
        <p class="tac">T-Wan在7日内和你互动了80次</p>
        <p v-for="(item, index) in countObj" :key="index" class="graph">
          <span>{{item.name}}</span>
          <i :style="{width: item.num + '%'}"></i>
          <b>{{item.num}}</b>
        </p>
        <p class="tar" ></p>
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
import { PopupRadio, PopupPicker, Group, Datetime, Timeline, TimelineItem, Tab, TabItem } from 'vux'
import echarts from 'echarts'
import { customerRead, customerSetTurnover, customerSetTurnoverDate, visitIndex } from '@/api/customer'

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
    Datetime
  },
  data () {
    return {
      clientInfor: {}, // 客户信息
      option1: ['80%'],
      active: 2,
      visitList: [], // 互动列表
      id: 0,
      uid: 2,
      countObj: [{
        name: '查看名片',
        num: 50
      }, {
        name: '查看动态',
        num: 10
      }, {
        name: '查看官网',
        num: 10
      }, {
        name: '查看产品',
        num: 10
      }, {
        name: '拨打电话',
        num: 10
      }]
    }
  },
  methods: {
    drawChart (option, dom) {
      var myChart = echarts.init(document.getElementById(dom))
      // 绘制图表
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
            data: [
              {value: 335, name: '25%'},
              {value: 310, name: '40%'},
              {value: 234, name: '35%'}
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
                show: true,
                position: 'inside'
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
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
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
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          showSymbol: false
          // smooth: true
        }]
      }
      this.drawChart(option, 'dynamic')
    },
    getCustomer () {
      const data = {
        id: this.uid
      }
      customerRead(data)
        .then(res => {
          this.clientInfor = res.data.info
          this.id = this.clientInfor.id
          this.option1 = [`${this.clientInfor.turnover}%`]
        })
    },
    customerSetTurnover (val) {
      const num = parseInt(val[0].substring(0, val[0].length - 1))
      const data = {
        id: this.id,
        turnover: num
      }
      customerSetTurnover(data)
        .then(res => {

        })
    },
    customerSetTurnoverDate (val) {
      const data = {
        id: this.id,
        date: val
      }
      customerSetTurnoverDate(data)
        .then(res => {

        })
    },
    getVisitIndex () {
      const data = {
        type: 'details',
        uid: this.uid
      }
      visitIndex(data)
        .then(res => {
          this.visitList = res.data.rows
        })
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
      this.$router.push({
        path: '/messageIM'
      })
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
  mounted () {
    this.drawCare()
    this.drawDynamic()
    this.getCustomer()
    this.getVisitIndex()
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.client{
  padding: 0.5rem 0.3rem;
  padding-bottom: 45px;
  overflow: auto;
  height: 100%;
  .card{
    height: 4rem;
    padding: 0.3rem 0.25rem;
    .top{
      height: 1.6rem;
      .avatar{
        float: left;
        width: 1.6rem;
        height: 100%;
        border-radius: 0.1rem;
      }
      &>div{
        width: 4.5rem;
        float: right;
        height: 100%;
        p{
          height: 50%;
          line-height: 0.8rem;
          .name{
            font-size: 0.3rem;
          }
          .edit{
            width: 0.4rem;
            margin-top: 0.2rem;
          }
        }
        .tag-list{
          position: relative;
          overflow: hidden;
          span{
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
          .icon-insert{
            position: absolute;
            top: 0.15rem;
            right: -0.06rem;
            fill: #5977fe;
            width: 0.5rem;
            background-color: #fff;
          }
        }
      }
    }
    .center{
      padding: 0.2rem 0;
      border-bottom: 1px solid #ddd;
      & /deep/ .weui-cell{
        min-height: 0.32rem;
        padding: 0;
        .weui-cell__ft{
          padding: 0;
          text-align: center;
          &::after{
            display: none;
          }
        }
      }
      p{
        text-align: center;
        width: 2.5rem;
        height: 0.7rem;
        span{
          color: #717171;
        }
        & /deep/ .vux-datetime-value{
          color: #717171;
          min-height: 0.32rem;
        }
      }
    }
    .down{
      p{
        text-align: center;
        width: 2.5rem;
        height: 0.7rem;
        line-height: 0.8rem;
        font-size: 0.3rem;
        img{
          width: 0.28rem;
        }
      }
    }
  }
  .time-line{
    padding: 0.8rem 0;
    & /deep/ .vux-timeline{
      padding: 0;
      .vux-timeline-item-content{
        padding: 0 0 0.3rem 0.8rem;
      }
    }
    .timeline-wrap{
      height: 1.2rem;
      background-color: #f4f4f4;
      padding: 0.2rem;
      color: #717171;
      p{
        margin-top: 0.1rem;
      }
    }
  }
  .client-tab{
    border-top: 1px solid #eee;
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    .vux-tab-item{
      span{
        display: inline-block;
        border-radius: 28px;
        height: 28px;
        line-height: 28px;
        padding: 0 0.2rem;
      }
    }
    .vux-tab-selected{
      span{
        border: 1px solid #5977fe;
      }
    }
  }
  .client-action{
    &>p{
      text-align: center;
      margin-top: 0.4rem;
    }
    li{
      height: 2.2rem;
      &>p{
        margin: 0.4rem 0;
        font-size: 0.3rem;
        color: #717171;
        text-decoration: underline;
        text-align: center;
      }
      &>div{
        height: 1.4rem;
        padding: 0.25rem;
        img{
          height: 100%;
          width: 0.9rem;
          float: left;
          margin-right: 0.3rem;
        }
        p{
          font-size: 0.3rem;
          color: #717171;
          height: 100%;
          line-height: 0.9rem;
          float: left;
        }
      }
    }
  }
  .client-chart{
    .news-list-detail{
      margin-top: 0.3rem;
      .avatar{
        display: block;
        margin: 0 auto;
        width: 1.5rem;
        height: 1.5rem;
      }
      p{
        &:nth-of-type(2){
          margin: 0.4rem 0;
          font-size: 0.22rem;
          color: #717171;
        }
        &:last-child{
          height: 1rem;
          padding: 0 0.15rem;
        }
        .icon{
          fill: #999;
        }
      }
      .graph{
        height: 0.7rem;
        line-height: 0.7rem;
        padding: 0 0.3rem;
        span{
          width: 2rem;
          padding-left: 0.3rem;
          position: relative;
          &::after{
            content: '';
            width: 0.1rem;
            height: 0.1rem;
            border-radius: 50%;
            position: absolute;
            top: 0.1rem;
            left: 0;
          }
        }
        i{
          display: inline-block;
          height: 0.2rem;
          border-radius: 0.1rem;
          margin-left: 0.5rem;
        }
        &:nth-child(3){
          span::after{
            background-color: #ff0000;
          }
          i{
            background: linear-gradient(left, #cc00ff, #b1181a);
          }
        }
        &:nth-child(4){
          span::after{
            background-color: #653ffe;
          }
          i{
            background: linear-gradient(left, #cc00ff, #5747fe);
          }
        }
        &:nth-child(5){
          span::after{
            background-color: #73a6fb;
          }
          i{
            background: linear-gradient(left, #cc00ff, #6eaffb);
          }
        }
        &:nth-child(6){
          i{
            background: linear-gradient(left, #cd01fd, #fd5b66);
          }
        }
        &:nth-child(7){
          i{
            background: linear-gradient(left, #c781f9, #0fba40);
          }
        }
      }
    }
    .care{
      border-bottom: 1px solid #eee;
      border-top: 1px solid #eee;
      h5{
        margin: 0.4rem 0 0rem;
        font-size: 0.3rem;
        color: #717171;
        font-weight: normal;
      }
      #care{
        width: 100%;
        height: 3.6rem;
      }
      ul{
        padding: 0 0.2rem;
      }
      li{
        width: 33.33%;
        float: left;
        height: 0.5rem;
        line-height: 0.5rem;
        text-align: center;
        color: #717171;
        position: relative;
        margin-bottom: 0.4rem;
        &::after{
          content: '';
          position: absolute;
          top: 0.14rem;
          left: 0;
          width: 0.22rem;
          height: 0.22rem;
          border-radius: 0.22rem;
        }
        &:nth-child(1)::after{
          background-color: #ff0000;
        }
        &:nth-child(2)::after{
          background-color: #feab2b;
        }
        &:nth-child(3)::after{
          background-color: #3ec4d2;
        }
      }
    }
    .dynamic{
      h5{
        margin: 0.4rem 0 0rem;
        font-size: 0.3rem;
        color: #717171;
        font-weight: normal;
      }
      #dynamic{
        width: 100%;
        height: 4rem;
      }
    }
  }
}
</style>
