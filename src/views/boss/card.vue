/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-12 19:33:04
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-28 21:16:38
 */
<template>
  <div class="boss-card">
    <div class="header-bg">
      <div class="self-card">
        <img :src="topTitleInfor.image" alt="">
        <div class="infor">
          <p>{{topTitleInfor.username}}</p>
          <p>{{topTitleInfor.job}} {{topTitleInfor.mobile}}</p>
          <p>{{topTitleInfor.address}}</p>
        </div>
        <div class="card">
          <img src="@/assets/img/card2.png" alt="" class="card-icon">
          <span>扫码名片</span>
          <img :src="topTitleInfor.image" alt="" class="code-icon">
          <!--<img src="@/assets/img/code.png" alt=""  >-->
        </div>
      </div>
    </div>
    <p class="line"></p>
    <div>
      <tab v-model="activeName" :line-width="0">
        <tab-item><span @click="selectedType(0)">雷达能力图</span></tab-item>
        <tab-item><span @click="selectedType(1)">数据分析</span></tab-item>
        <tab-item>
          <p class="action-name" @click="selectedType(2)">
            <popup-radio :options="options" v-model="option" value-text-align="center"></popup-radio>
          </p>
        </tab-item>
      </tab>
      <div v-show="activeName === 0" class="boss-power">
        <div id="top-chart"></div>
        <p class="tac">目前总排名列：第 <i style="color:red;">{{this.chartData.lv}}</i> 位</p>
        <ul>
          <li>
            <span>{{this.chartData.user_allnum}}</span>
            <i>客户总数</i>
          </li>
          <li>
            <span>{{this.chartData.follow_num}}</span>
            <i>跟进总数</i>
          </li>
          <li>
            <span>{{this.chartData.chat_num}}</span>
            <i>咨询总数</i>
          </li>
        </ul>
      </div>
      <div v-show="activeName === 1" class="boss-data">
        <tab v-model="dataTabIndex" :line-width="0">
          <tab-item ><span @click="choseTimeType(0)">汇总</span></tab-item>
          <tab-item ><span @click="choseTimeType(1)">昨日</span></tab-item>
          <tab-item ><span @click="choseTimeType(2)">近7天</span></tab-item>
          <tab-item ><span @click="choseTimeType(3)">当月</span></tab-item>
          <tab-item ><span style="border: none;" @click="choseTimeType(4)">近30天</span></tab-item>
        </tab>
        <div v-show="dataTabIndex === 0" class="second-tab-list">
          <ul>
            <li v-for="(item,index) in totalCustomer" :key="index">
              <span>{{item.title}}</span>
              <span>{{item.num}}</span>
            </li>
          </ul>
        </div>
        <div v-show="dataTabIndex === 1" class="second-tab-list second-nav-list-2">
          <ul>
            <li v-for="(item,index) in totalCustomer" :key="index">
              <span>{{item.title}}</span>
              <span class="blue">{{item.pertenage}}%</span>
              <span class="blue">{{item.num}}</span>
            </li>
          </ul>
        </div>
        <div v-show="dataTabIndex === 2" class="second-tab-list second-nav-list-2">
          <ul>
            <li v-for="(item,index) in totalCustomer" :key="index">
              <span>{{item.title}}</span>
              <span class="blue">{{item.pertenage}}%</span>
              <span class="blue">{{item.num}}</span>
            </li>
          </ul>
        </div>
        <div v-show="dataTabIndex === 3" class="second-tab-list second-nav-list-2">
          <ul>
            <li v-for="(item,index) in totalCustomer" :key="index">
              <span>{{item.title}}</span>
              <span class="blue">{{item.pertenage}}%</span>
              <span class="blue">{{item.num}}</span>
            </li>
          </ul>
        </div>
        <div v-show="dataTabIndex === 4" class="second-tab-list second-nav-list-2">
          <ul>
            <li v-for="(item,index) in totalCustomer" :key="index">
              <span>{{item.title}}</span>
              <span class="blue">{{item.pertenage}}%</span>
              <span class="blue">{{item.num}}</span>
            </li>
          </ul>
        </div>
        <p class="line"></p>
        <h3>成交率</h3>
        <div class="funnel clearfix">
          <div id="main">
            <p v-for="(item, index) in turnoverData" :key="index">{{item.num}}</p>
          </div>
          <p>成交概率区间</p>
          <ul>
            <li>0~50%</li>
            <li>50%~80%</li>
            <li>80%~99%</li>
            <li>100%</li>
          </ul>
        </div>
        <p class="line"></p>
        <h3>客户兴趣占比</h3>
        <div class="care clearfix">
          <div id="care"></div>
          <ul>
            <li>对公司感兴趣</li>
            <li>对产品感兴趣</li>
            <li>对我感兴趣</li>
          </ul>
        </div>
        <p class="line"></p>
        <h3>与我互动</h3>
        <div class="action">
          <p v-for="(item, index) in countObj" :key="index" class="graph">
            <span>{{item.name}}</span>
            <i :style="{width: item.num/forTotal*10 + '%'}"></i>
            <b>{{item.num}}</b>
          </p>
        </div>
        <p class="line"></p>
        <h3>近15日客户活跃度</h3>
        <div class="dynamic">
          <div id="dynamic"></div>
        </div>
      </div>
      <div v-show="activeName === 2" class="boss-action">
        <p class="tac time">●&nbsp;&nbsp; {{currentDate}}</p>
        <ul class="action-logs-list" v-if="option === '互动记录'">
          <li v-for="(item, index) in followData" :key="index">
            <img :src="item.wx_image" alt="">
            <div>
              {{item.username}} <i>拨打</i>了你的<i>手机号码</i>，{{item.content}}。
            </div>
            <span>{{ item.create_time.substr(item.create_time.indexOf(':')- 2, item.create_time.length) }}</span>
          </li>
        </ul>
        <ul class="follow-logs-list" v-else>
          <li v-for="(item, index) in followData" :key="index">
            <p>{{item.content}}</p>
            <p>{{item.create_time}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Tab, TabItem, PopupPicker, PopupRadio } from 'vux'
import echarts from 'echarts'
import { AIAnalyseDetail } from '@/api/boss'

export default {
  name: 'bossCard',
  components: {
    Tab,
    TabItem,
    PopupRadio,
    PopupPicker
  },
  data () {
    return {
      listQuery: {
        type: 1,
        date_type: 1,
        time_type: 0
      },
      chartData: [],
      drawCareData: [
        {value: 0, name: '25%'},
        {value: 0, name: '40%'},
        {value: 0, name: '35%'}
      ],
      employData: [],
      followData: [],
      currentDate: '',
      turnoverData: [
        {num: 0},
        {num: 0},
        {num: 0},
        {num: 0}
      ],
      forTotal: 0,
      topTitleInfor: [],
      pertenageData: [],
      totalCustomer: [],
      chartTopData: [],
      dynamicXData: [],
      dynamicYData: [],
      activeName: 0, // boss雷达主tab
      dataTabIndex: 0, // boss雷达日期tab
      option: '互动记录',
      options: ['互动记录', '跟进记录'],
      countObj: []
    }
  },
  watch: {
    option (val, oldval) {
      this.getDataType()
      this.getAIAnalyseDetail()
    }
  },
  methods: {
    getDataType () {
      if (this.option === '互动记录') {
        this.listQuery.date_type = 1
      } else {
        this.listQuery.date_type = 2
      }
    },
    setOverviewTotal (data) {
      let map = []
      for (const key in data) {
        let obj = { title: '客户总数', num: 0, pertenage: 0 }
        if (key === 'add_user') {
          obj.title = '新增客户数'
        } else if (key === 'user_follow') {
          obj.title = '跟进客户数'
        } else if (key === 'user_move') {
          obj.title = '被转发总数'
        } else if (key === 'user_save') {
          obj.title = '被保存总数'
        } else if (key === 'user_good') {
          obj.title = '被点赞总数'
        } else if (key === 'look_num') {
          obj.title = '浏览总数'
        }
        if (key === 'add_user' || key === 'user_follow' || key === 'user_move' || key === 'user_save' || key === 'user_good' || key === 'look_num') {
          obj.num = 0
          if (data[key].num !== undefined) {
            obj.num = data[key].num
          }
          if (data[key].pertenage !== undefined) {
            obj.pertenage = data[key].pertenage
          }
          map.push(obj)
        }
      }
      this.totalCustomer = map
    },
    setArawAITop (data) {
      if (data !== undefined) {
        this.chartTopData[0] = data.num_1
        this.chartTopData[1] = data.num_6
        this.chartTopData[2] = data.num_5
        this.chartTopData[3] = data.num_4
        this.chartTopData[4] = data.num_3
        this.chartTopData[5] = data.num_2
      }
    },
    choseTimeType (type) {
      this.listQuery.time_type = type
      this.getAIAnalyseDetail() // AI分析详情
    },
    selectedType (type) {
      this.listQuery.type = type + 1
      this.getAIAnalyseDetail()
    },
    getAIAnalyseDetail () { // AI分析详情
      AIAnalyseDetail(this.listQuery).then(res => {
        const param = this.listQuery
        if (res.code === 200) {
          if (param.type === 1) { // 雷达能力图
            if (res.data.ai_user.employ_lv !== undefined && res.data.ai_user.employ_lv.length > 0) {
              this.topTitleInfor = res.data.data
              this.chartData = res.data.ai_user.employ_lv[0]
              this.setArawAITop(this.chartData)
              this.drawAITop()
            }
          } else if (param.type === 2) {
            this.topTitleInfor = res.data.data
            const data = res.data.user_data
            this.employData = res.data.employ_data
            this.setForMeData(res.data.employ_res.for_me)
            this.setEmployData(this.employData)
            this.setOverviewTotal(this.employData)
            if (data !== undefined) {
              this.setData(data)
            }
          } else if (param.type === 3) {
            this.topTitleInfor = res.data.data
            this.followData = res.data.follow.rows
            this.setCurrentDate(this.followData)
          }
        }
      })
    },
    setCurrentDate (data) {
      const date = data[0].create_time.replace(/-/g, '/')
      console.log(date)
      if (data.length > 0) {
        if (data.length === 10) {
          this.currentDate = date + '00:00'
        } else {
          this.currentDate = date.substr(0, date.length)
        }
      }
    },
    setData (data) {
      let XData = []
      let YData = []
      // XData.push('')
      // YData.push(0)
      for (const key in data) {
        XData.push(key)
        YData.push(data[key])
      }
      this.dynamicXData = XData
      this.dynamicYData = YData
      this.drawDynamic()
    },
    setEmployData (data) {
      this.turnoverData[0].num = data.num_0.num
      this.turnoverData[1].num = data.num_1.num
      this.turnoverData[2].num = data.num_2.num
      this.turnoverData[3].num = data.num_3.num

      this.drawCareData[0].value = data.look_web.num
      this.drawCareData[1].value = data.look_goods.num
      this.drawCareData[2].value = data.look_me.num
      this.drawCare()
    },
    setForMeData (data) {
      let temp = []
      for (let i = 0; i < data.length; i++) {
        const element = data[i].nums
        const type = data[i].type
        if (element !== 0) {
          const obj = {
            name: '访问名片',
            num: element
          }
          if (type === 0) {
            obj.name = '访问名片'
          } else if (type === 1) {
            obj.name = '打电话'
          } else if (type === 2) {
            obj.name = '转发名片'
          } else if (type === 3) {
            obj.name = '保存名片'
          } else if (type === 4) {
            obj.name = '查看官网'
          } else if (type === 5) {
            obj.name = '查看产品'
          } else if (type === 6) {
            obj.name = '查看案列'
          } else if (type === 7) {
            obj.name = '访问动态'
          } else if (type === 8) {
            obj.name = '添加微信'
          }
          temp.push(obj)
        }
        this.forTotal += element
      }
      this.countObj = temp
    },
    drawChart (option, dom) {
      var myChart = echarts.init(document.getElementById(dom))
      // 绘制图表
      myChart.clear()
      myChart.setOption(option)
    },
    drawAITop () {
      const option = {
        tooltip: {

        },
        radar: {

        // shape: 'circle',
          name: {
            textStyle: {
              color: '#333',
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          radius: 50,
          indicator: [
            {name: '个人能力', max: 6500},
            {name: '获客能力', max: 16000},
            {name: '客户互动', max: 30000},
            {name: '官网推广', max: 38000},
            {name: '产品推广', max: 52000},
            {name: '销售主动性', max: 25000}
          ],

          axisLine: {
            lineStyle: {
              color: '#82abff'
            }
          },
          splitLine: {
            lineStyle: {
              color: '#82abff'
            }
          },
          splitArea: {
            areaStyle: {
              color: ['#fff']
            }
          }
        },
        series: [{

          name: '预算 vs 开销（Budget vs spending）',
          type: 'radar',
          areaStyle: {
            color: '#b9d0ff'
          },
          data: [

            {
              symbolSize: 0,
              value: this.chartTopData,
              name: '数量',
              label: {
                normal: {
                  show: false,
                  color: '#333'
                }
              },
              lineStyle: {
                width: 0
              }
            }
          ]
        }]
      }
      this.drawChart(option, 'top-chart')
    },
    drawCare () {
      const option = {
        color: ['#ff0000', '#feab2b', '#3ec4d2'],
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '75%',
            data: this.drawCareData,
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
          data: this.dynamicXData
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: false
          }
        },
        grid: {
          top: '20',
          left: '15%'
        },
        series: [{
          data: this.dynamicYData,
          type: 'line',
          showSymbol: false,
          smooth: true
        }]
      }
      this.drawChart(option, 'dynamic')
    }
  },
  mounted () {
    this.getAIAnalyseDetail()
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.boss-card{
  .header-bg{
    background: url('~@/assets/img/tabbar.png') no-repeat top;
    background-size: contain;
    position: relative;
    padding: 0.5rem 0;
  }
  .self-card{
    padding: 0.4rem;
    width: 6.5rem;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 0.1rem;
    box-shadow: 0 0 2px #aaa;
    &>img{
      float: left;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: .1rem;
      margin-bottom: 0.3rem;
    }
    .infor{
      float: left;
      width: calc(100% - 1.7rem);
      margin-left: 0.2rem;
      p{
        font-size: 0.28rem;
        color: #717171;
        &:first-child{
          font-size: 0.34rem;
          margin-bottom: 0.2rem;
        }
      }
    }
    .card{
      border-top: 1px solid #ddd;
      height: 0.9rem;
      line-height: 0.65rem;
      padding-top: 0.25rem;
      clear: both;
      .card-icon{
        float: left;
        width: 0.85rem;
        margin-right: 0.2rem;
      }
      span{
        color: #717171;
        font-size: 0.32rem;
      }
      .code-icon{
        float: right;
        width: 0.35rem;
        margin-top: 0.15rem;
      }
    }
  }
  .vux-tab-selected{
    & /deep/ .weui-cell__ft{
      color: #5977fe;
    }
  }
  .action-name{
    & /deep/ .weui-cell{
      padding: 0;
      .weui-cell__ft{
        width: 100%;
        text-align: center;
        &::after{
          content: " ";
          display: inline-block;
          height: 6px;
          width: 6px;
          border-width: 0px 2px 2px 0;
          border-color: #C8C8CD;
          border-style: solid;
          -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
          transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
          position: relative;
          top: -2px;
          position: absolute;
          top: 50%;
          margin-top: -0.16rem;
          right: 0.36rem;
        }
      }
    }
  }
  .line{
    background-color: #f3f3f3;
    height: 0.15rem;
  }
  .boss-power{
    #top-chart{
      height: 3.6rem;
    }
    p{
      margin-bottom: 0.3rem;
    }
    li{
      text-align: center;
      height: 1rem;
      float: left;
      width: 33.33%;
      span{
        display: block;
        color: #5977fe;
        font-size: 0.34rem;
      }
      i{
        font-size: 0.26rem;
        display: block;
        margin-top: 0.1rem;
      }
    }
  }
  .boss-data{
    .vux-tab-item{
      flex: 0 0 20%;
      span{
        height: 10px;
        width: 100%;
        float: left;
        line-height: 10px;
        margin-top: 15px;
        border-right: 1px solid #aaa;
      }
    }
    h3{
      height: 1.4rem;
      line-height: 1.4rem;
      text-align: center;
      font-size: 0.36rem;
      color: #717171;
    }
  }
  .second-tab-list{
    width: 100%;
    height: 6.5rem;
    padding: 0.3rem 0.2rem;
    li{
      width: 33.33%;
      float: left;
      padding:  0.1rem;
      margin-top: 0.3rem;
      text-align: center;
      height: 2.5rem;
      background: url('~@/assets/img/six.png') no-repeat center;
      background-size: contain;
      span{
        margin-top: 0.5rem;
        display: block;
        color: #717171;
        &.red{
          color: #ff0000;
        }
        &.blue{
          color: #00ea48;
        }
        &:first-child{
          font-size: 0.26rem;
        }
        &:last-child{
          font-size: 0.46rem;
        }
      }
    }
  }
  .second-nav-list-2{
    li{
      span{
        margin-top: 0;
        &:first-child{
          font-size: 0.26rem;
          margin-top: 0.5rem;
        }
        &:nth-of-type(2) {
          font-size: 0.36rem;
          margin-top: 0.2rem;
        }
        &:last-child{
          margin-top: 0.2rem;
          font-size: 0.28rem;
        }
      }
    }
  }
  .funnel{
    #main{
      width: 60%;
      height: 6rem;
      background: url('~@/assets/img/chart.png') no-repeat center;
      background-size: contain;
      margin: 0 auto;
      padding-top: 1.2rem;
      p{
        text-align: center;
        margin-bottom: 0.7rem;
        color: #fff;
      }
    }
    &>p{
      text-align: center;
      font-size: 0.26rem;
      color: #717171;
      margin-bottom: 0.4rem;
    }
    ul{
      padding: 0 0.2rem;
    }
    li{
      float: left;
      width: 25%;
      height: 0.5rem;
      text-align: center;
      line-height: 0.5rem;
      color: #adbaff;
      margin-bottom: 0.4rem;
      position: relative;
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
        background-color: #3ec4d2;
      }
      &:nth-child(2)::after{
        background-color: #0fd35d;
      }
      &:nth-child(3)::after{
        background-color: #feab2b;
      }
      &:nth-child(4)::after{
        background-color: #3ec4d2;
      }
    }
  }
  .care{
    border-bottom: 1px solid #eee;
    border-top: 1px solid #eee;
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
  .action{
    padding: 0.3rem;
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
          width: 0.2rem;
          height: 0.2rem;
          border-radius: 50%;
          position: absolute;
          top: 0.05rem;
          left: 0;
        }
      }
      i{
        display: inline-block;
        height: 0.2rem;
        border-radius: 0.1rem;
        margin-left: 0.5rem;
      }
      &:nth-child(1){
        span::after{
          background-color: #ff0000;
        }
        i{
          background: linear-gradient(left, #cc00ff, #b1181a);
          background: -webkit-linear-gradient(left, #cc00ff, #b1181a);
        }
      }
      &:nth-child(2){
        span::after{
          background-color: #653ffe;
        }
        i{
          background: linear-gradient(left, #cc00ff, #5747fe);
          background: -webkit-linear-gradient(left, #cc00ff, #5747fe);
        }
      }
      &:nth-child(3){
        span::after{
          background-color: #73a6fb;
        }
        i{
          background: linear-gradient(left, #cc00ff, #6eaffb);
          background: -webkit-linear-gradient(left, #cc00ff, #6eaffb);
        }
      }
      &:nth-child(4){
        i{
          background: linear-gradient(left, #cd01fd, #fd5b66);
          background: -webkit-linear-gradient(left, #cd01fd, #fd5b66);
        }
      }
      &:nth-child(5){
        i{
          background: linear-gradient(left, #c781f9, #0fba40);
          background: -webkit-linear-gradient(left, #c781f9, #0fba40);
        }
      }
    }
  }
  .dynamic{
    #dynamic{
      width: 100%;
      height: 4rem;
    }
  }
  .action-logs-list{
    padding: 0 0.2rem;
    li{
      height: 1.8rem;
      padding: 0.25rem 0;
      border-bottom: 1px solid #eee;
      img{
        float: left;
        height: 100%;
        width: 1.3rem;
      }
      div{
        width: 65%;
        float: left;
        height: 100%;
        line-height: 0.5rem;
        margin-left: 0.2rem;
        padding: 0.1rem 0;
        overflow: hidden;
        i{
          color: #f69600;
        }
      }
      span{
        float: right;
        width: 0.8rem;
        height: 100%;
        color: #717171;
        font-size: 0.22rem;
        line-height: .5rem;
      }
    }
  }
  .follow-logs-list{
    padding: 0 0.3rem;
    li{
      height: 1.2rem;
      padding-left: 0.6rem;
      position: relative;
      margin-bottom: 0.3rem;
      &::before{
        content: '';
        width: 0.2rem;
        height: 0.2rem;
        border-radius: 0.2rem;
        background-color: #5977fe;
        position: absolute;
        top: 0;
        left: 0;
      }
      p{
        height: 50%;
        line-height: 0.6rem;
        background-color: #f3f3f3;
        padding: 0 0.3rem;
        color: #717171;
        &:last-child{
          font-size: 0.26rem;
        }
      }
    }
  }
  .boss-action{
    .time{
      font-size: 0.32rem;
      line-height: 0.5rem;
      color: #717171;
      margin: 0.4rem 0;
    }
  }
}
</style>
