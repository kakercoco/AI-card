/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-12 09:25:21
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-12 20:44:48
 */
<template>
  <div class="boss">
    <p class="search clearfix">
      <span>
        <input type="text" placeholder="搜索">
        <x-icon type="ios-search-strong"></x-icon>
      </span>
      <i @click="showDepartment = true">选择部门</i>
    </p>
    <p class="department">
      <span>当前查看：</span>
      <popup-picker class="fl" :data="departmentList" v-model="department" :columns="3" show-name :show.sync="showDepartment"></popup-picker>
    </p>
    <tab v-model="activeTab">
      <tab-item><span @click="choseActive(1)">总览</span></tab-item>
      <tab-item><span @click="choseActive(2)">销售排行</span></tab-item>
      <tab-item><span @click="choseActive(3)">AI分析</span></tab-item>
    </tab>
    <p class="line"></p>
    <div v-show="activeTab === 0" class="nav-tab">
      <tab v-model="tabIndex">
        <tab-item><span @click="choseTimeType(0)">汇总</span></tab-item>
        <tab-item><span @click="choseTimeType(1)">昨日</span></tab-item>
        <tab-item><span @click="choseTimeType(2)">近七天</span></tab-item>
        <tab-item><span @click="choseTimeType(3)">本月</span></tab-item>
        <tab-item><span @click="choseTimeType(4)">近30天</span></tab-item>
      </tab>
      <div v-show="tabIndex === 0" class="second-tab-list">
        <ul>
          <li v-for="(item,index) in totalCustomer" :key="index">
            <span>{{item.title}}</span>
            <span>{{item.num}}</span>
          </li>
        </ul>
      </div>
      <div v-show="tabIndex === 1" class="second-tab-list second-nav-list-2">
        <ul>
          <li v-for="(item,index) in totalCustomer" :key="index">
            <span>{{item.title}}</span>
            <span class="blue">{{item.pertenage}}</span>
            <span class="blue">{{item.num}}</span>
          </li>
        </ul>
      </div>
      <div v-show="tabIndex === 2" class="second-tab-list second-nav-list-2">
        <ul>
          <li v-for="(item,index) in totalCustomer" :key="index">
            <span>{{item.title}}</span>
            <span class="blue">{{item.pertenage}}</span>
            <span class="blue">{{item.num}}</span>
          </li>
        </ul>
      </div>
      <div v-show="tabIndex === 3" class="second-tab-list second-nav-list-2">
        <ul>
          <li v-for="(item,index) in totalCustomer" :key="index">
            <span>{{item.title}}</span>
            <span class="blue">{{item.pertenage}}</span>
            <span class="blue">{{item.num}}</span>
          </li>
        </ul>
      </div>
      <div v-show="tabIndex === 4" class="second-tab-list second-nav-list-2">
        <ul>
          <li v-for="(item,index) in totalCustomer" :key="index">
            <span>{{item.title}}</span>
            <span class="blue">{{item.pertenage}}</span>
            <span class="blue">{{item.num}}</span>
          </li>
        </ul>
      </div>
      <p class="line"></p>
      <h3>成交率</h3>
      <div class="funnel clearfix">
        <div id="main">
          <p>{{downChartInfor.num_1}}</p>
          <p>{{downChartInfor.num_2}}</p>
          <p>{{downChartInfor.num_3}}</p>
          <p>{{downChartInfor.num_4}}</p>
        </div>
        <p>成交概率区间</p>
        <ul>
          <li>0~50%</li>
          <li>50%~80%</li>
          <li>80%~99%</li>
          <li>100%</li>
        </ul>
      </div>
      <h3>客户统计</h3>
      <div class="client clearfix">
        <div id="client"></div>
        <tab v-model="clientTabIndex" :line-width="0">
          <tab-item ><span @click="choseCustomerType(1)">新增客户数</span></tab-item>
          <tab-item ><span @click="choseCustomerType(2)">跟进客户数</span></tab-item>
          <tab-item ><span style="border: none;" @click="choseCustomerType(3)">咨询客户数</span></tab-item>
        </tab>
        <div v-show="clientTabIndex === 0" class="client-date-tab clearfix">
          <ul>
            <li @click="changeClientDate1(index)" :class="{active: clientDateIndex1 === index}" v-for="(item, index) in clientDate1" :key="index">{{item}}</li>
          </ul>
          <div id="clientDate1"></div>
        </div>
        <div v-show="clientTabIndex === 1" class="client-date-tab clearfix">
          <ul>
            <li @click="changeClientDate2(index)" :class="{active: clientDateIndex2 === index}" v-for="(item, index) in clientDate2" :key="index">{{item}}</li>
          </ul>
          <div id="clientDate2"></div>
        </div>
        <div v-show="clientTabIndex === 2" class="client-date-tab clearfix">
          <ul>
            <li @click="changeClientDate3(index)" :class="{active: clientDateIndex3 === index}" v-for="(item, index) in clientDate3" :key="index">{{item}}</li>
          </ul>
          <div id="clientDate3"></div>
        </div>
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
    <div v-show="activeTab === 1" class="sell">
      <tab v-model="sellTabIndex">
        <tab-item ><span @click="choseType(1)">按客户人数</span></tab-item>
        <tab-item ><span @click="choseType(2)">按互动频率</span></tab-item>
        <tab-item ><span style="border: none;" @click="choseType(3)">按成交概率</span></tab-item>
      </tab>
      <div v-show="sellTabIndex === 0">
        <tab v-model="sellClientTabIndex" :line-width="0">
          <tab-item ><span @click="selectedUserType(1)">客户总数</span></tab-item>
          <tab-item ><span style="border: none;" @click="selectedUserType(2)">新增客户</span></tab-item>
        </tab>
      </div>
      <div v-show="sellTabIndex === 1">
        <tab v-model="sellActionTabIndex" :line-width="0">
          <tab-item><span @click="selectedInteraction(1)">跟进总数</span></tab-item>
          <tab-item ><span style="border: none;" @click="selectedInteraction(2)">咨询总数</span></tab-item>
        </tab>
        <tab v-model="sellDateTabIndex" :line-width="0">
          <tab-item><span @click="selectedInteractionTime(1)">昨日</span></tab-item>
          <tab-item><span @click="selectedInteractionTime(2)">近七天</span></tab-item>
          <tab-item><span @click="selectedInteractionTime(3)">当月</span></tab-item>
          <tab-item><span @click="selectedInteractionTime(4)">近30天</span></tab-item>
        </tab>
      </div>
      <div v-show="sellTabIndex === 2">
        <tab v-model="sellProbTabIndex" :line-width="0">
          <tab-item><span @click="selectedProbability(1)">1%~50%</span></tab-item>
          <tab-item><span @click="selectedProbability(2)">51%~80%</span></tab-item>
          <tab-item><span @click="selectedProbability(3)">81%~99%</span></tab-item>
          <tab-item><span @click="selectedProbability(4)">100%</span></tab-item>
        </tab>
      </div>
      <div class="sell-list">
        <p class="self">
          <span class="fl">{{firstRankRow.lv}}</span>
          <img :src="firstRankRow.image" alt="">
          <span>{{firstRankRow.username}}</span>
          <span class="fr">{{firstRankRow.num}}</span>
        </p>
        <ul>
          <li v-for="(item, index) in salesRankList" :key="index">
            <span class="fl">{{item.lv}}</span>
            <img :src="item.image" alt="" class="avatar">
            <span>{{item.username}}</span>
            <span class="fr">{{item.num}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div v-show="activeTab === 2" class="AI">
      <ul>
        <li v-for="(item, index) in AIList" :key="index" :class="{'first-item': index ===0 }" @click="gotoCard">
          <img src="@/assets/icon/top.png" alt="" class="icon-champion" v-if="index ===0">
          <span class="fl">{{index+1}}</span>
          <img :src="item.image" alt="" class="fl avatar">
          <p class="fl">
            <span class="name">{{item.username}}</span>
            <span class="job">{{item.job}}</span>
          </p>
          <x-icon type="ios-arrow-right" class="fr"></x-icon>
          <p :id="getChartId(index)" v-if="index !==0" class="charts fr"></p>
          <div id="top-chart" v-if="index === 0"></div>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
import { Tab, TabItem, PopupPicker } from 'vux'
import echarts from 'echarts'
import { bossOverview, bossOverviewTotal, customerStatistics, salesRanking, AIAnalyse } from '@/api/boss'

export default {
  name: 'boss',
  components: {
    Tab,
    TabItem,
    PopupPicker
  },
  data () {
    return {
      listQuery: {
        dept: 1,
        active: 1,
        time_type: 0,
        user_type: 1
      },
      listQuery2: {
        dept: 1,
        active: 2,
        type: 1,
        user_type: 1,
        interaction: 1,
        probability_type: 1,
        interaction_time: 1
      },
      listQuery3: {
        dept: 1,
        time_type: 0
      },
      listQuery4: {
        dept: 1,
        type: 1,
        user_type: 1
      },
      listQuery5: {
        dept: 1,
        active: 3
      },
      overviewTotal: [],
      forTotal: 0,
      salesRankList: [],
      salesRankAllList: [],
      firstRankRow: [],
      totalCustomer: [],
      AIList: [],
      downChartInfor: {
        like_company: 0,
        like_me: 0,
        like_product: 0,
        look_card: 0,
        look_dynamic: 0,
        look_phone: 0,
        look_product: 0,
        look_web: 0,
        num_1: 0,
        num_2: 0,
        num_3: 0,
        num_4: 0,
        user_avtive: {}
      },
      chartTopData: [50, 50, 50, 50, 50, 50],
      dynamicXData: [],
      dynamicYData: [],
      clientCountXData: [],
      clientCountYData: [],
      activeTab: 0, // boss雷达主tab
      tabIndex: 0, // 总览统计tab
      clientTabIndex: 0, // 客户统计tab
      sellTabIndex: 0, // 销售排行分类tab
      sellClientTabIndex: 0, // 销售排行下客户分类tab
      sellDateTabIndex: 0, // 销售排行下的日期tab
      sellActionTabIndex: 0, // 销售排行下的互动频率tab
      sellProbTabIndex: 0, // 销售排行下的成交概率tab
      clientDate1: ['当日', '近7日', '当月', '近30天'],
      clientDate2: ['当日', '近7日', '当月', '近30天'],
      clientDate3: ['当日', '近7日', '当月', '近30天'],
      clientDateIndex1: 0,
      clientDateIndex2: 0,
      clientDateIndex3: 0,
      countObj: [{ // 与我互动
        name: '查看名片',
        num: 0
      }, {
        name: '查看动态',
        num: 0
      }, {
        name: '查看官网',
        num: 0
      }, {
        name: '查看产品',
        num: 0
      }, {
        name: '拨打电话',
        num: 0
      }],
      showDepartment: false,
      department: ['1'],
      departmentList: [
        {
          name: '上海',
          value: '1',
          parent: 0
        },
        {
          name: '广州',
          value: '2',
          parent: 0
        },
        {
          name: '深圳',
          value: '3',
          parent: 0
        },
        {
          name: '苏州',
          value: '4',
          parent: 0
        },
        {
          name: '营销一部',
          value: '1-1',
          parent: '1'
        },
        {
          name: '营销二部',
          value: '1-2',
          parent: '1'
        },
        {
          name: '营销三部',
          value: '1-3',
          parent: '1'
        },
        {
          name: '营销四部',
          value: '1-4',
          parent: '1'
        },
        {
          name: '营销一部',
          value: '2-1',
          parent: '2'
        },
        {
          name: '营销一组',
          value: '1-1-1',
          parent: '1-1'
        },
        {
          name: '营销二组',
          value: '1-1-2',
          parent: '1-1'
        },
        {
          name: '营销一组',
          value: '1-2-1',
          parent: '2-1'
        }
      ]
    }
  },
  methods: {
    choseActive (type) {
      if (type === 1) { // 总览
        this.getBossOverview() // Boss雷达-总览
        this.bossOverviewTotal() // Boss雷达-总览-总数
        this.customerStatistics() // Boss雷达-总览-客户统计
      } else if (type === 2) { // 销售排
        this.getSalesRanking()
      } else if (type === 3) { // AI分析
        this.AIAnalyse()
      }
    },
    choseCustomerType (type) {
      this.listQuery4.type = type
      this.customerStatistics() // 销售总览-客户统计
    },
    choseType (type) {
      this.listQuery2.type = type
      this.getSalesRanking()
    },
    selectedUserType (type) { // user_type 默认1：客户总数 ,2:新增客户
      this.listQuery2.user_type = type
      this.getSalesRanking()
    },
    selectedInteraction (type) { // interaction 默认1：跟进总数 ,2:咨询总数
      this.listQuery2.interaction = type
      this.getSalesRanking()
    },
    selectedProbability (type) { // probability_type 百分比类型 默认1：0-50 ,2:51-80,3:81-99,4:100
      this.listQuery2.probability_type = type
      this.getSalesRanking()
    },
    selectedInteractionTime (type) { // interaction_time 默认1：昨日，2：近七天，3：当月，4：近30天
      this.listQuery2.interaction_time = type
      this.getSalesRanking()
    },
    choseTimeType (type) {
      this.listQuery3.time_type = type
      this.bossOverviewTotal() // 总览总数
    },
    setTotalCustomer (data) {
      this.forTotal = data.look_card.num + data.look_dynamic.num + data.look_web.num + data.look_product.num + data.look_phone.num
      this.countObj[0].num = data.look_card.num
      this.countObj[1].num = data.look_dynamic.num
      this.countObj[2].num = data.look_web.num
      this.countObj[3].num = data.look_product.num
      this.countObj[4].num = data.look_phone.num
    },
    setOverviewTotal (data) {
      let map = []
      for (const key in data) {
        let obj = { title: '客户总数', num: 0, pertenage: 0 }
        if (key === 'user_num') {
          obj.title = '客户总数'
        } else if (key === 'follow_num') {
          obj.title = '跟进总数'
        } else if (key === 'look_num') {
          obj.title = '浏览总数'
        } else if (key === 'transmit_num') {
          obj.title = '被转发总数'
        } else if (key === 'save_num') {
          obj.title = '被保存总数'
        } else if (key === 'good_num') {
          obj.title = '被点赞总数'
        }
        obj.num = data[key].num
        if (data[key].pertenage !== undefined) {
          obj.pertenage = data[key].pertenage
        }
        map.push(obj)
      }
      this.totalCustomer = map
    },
    setData (data, num) {
      let XData = []
      let YData = []
      // XData.push('')
      // YData.push(0)
      for (const key in data) {
        XData.push(key)
        YData.push(data[key])
      }
      if (num === 1) {
        this.dynamicXData = XData
        this.dynamicYData = YData
        this.drawDynamic()
      } else if (num === 2) {
        this.clientCountXData = XData
        this.clientCountYData = YData
        let type = this.listQuery4.type
        let id = 'clientDate1'
        if (type === 2) {
          id = 'clientDate2'
        } else if (type === 3) {
          id = 'clientDate3'
        }
        this.drawClientCount(id)
      }
    },
    getSalesRanking () { // 销售排行
      salesRanking(this.listQuery2).then(res => {
        let param = this.listQuery2
        if (res.code === 200) {
          let dataList = res.data.user_all_num
          if (param.type === 1) { // 按客户人数
            if (param.user_type === 2) {
              dataList = res.data.user_add_num // 2:新增客户
            } else if (param.user_type === 1) {
              dataList = res.data.user_all_num // 1：客户总数
            }
          } else if (param.type === 2) { // 按互动频率
            if (param.interaction === 1) {
              dataList = res.data.interaction_num // 1：跟进总数
            } else if (param.interaction === 2) {
              dataList = res.data.interaction_user // 2：咨询总数
            }
          } else if (param.type === 3) { // 按成交概率
            dataList = res.data.probability
          }
          if (dataList !== undefined) {
            if (dataList.list !== undefined) {
              this.salesRankList = dataList.list
            } else {
              this.salesRankList = []
            }
            if (dataList.me !== undefined) {
              this.firstRankRow = dataList.me
            } else {
              this.firstRankRow = []
            }
          }
        }
      })
    },
    bossOverviewTotal () { // 销售总览-总数
      bossOverviewTotal(this.listQuery3).then(res => {
        if (res.code === 200) {
          this.overviewTotal = res.data
          this.setOverviewTotal(this.overviewTotal)
        }
      })
    },
    customerStatistics () { // 销售总览-客户统计
      customerStatistics(this.listQuery4).then(res => {
        let param = this.listQuery4
        let listData = []
        if (res.code === 200) {
          if (param.type === 1) {
            listData = res.data.new_user
          } else if (param.type === 2) {
            listData = res.data.follow_user
          } else if (param.type === 3) {
            listData = res.data.consult_user
          }
        }
        if (listData !== undefined) {
          this.setData(listData, 2)
        } else {
          listData = []
        }
      })
    },
    getBossOverview () { // 销售总览
      bossOverview(this.listQuery).then(res => {
        if (res.code === 200) {
          this.downChartInfor = res.data
          this.setTotalCustomer(res.data)
          let userActive = res.data.user_avtive
          if (userActive !== undefined) {
            this.setData(userActive, 1)
          }
        }
      })
    },
    AIAnalyse () { // AI分析
      AIAnalyse(this.listQuery5).then(res => {
        if (res.code === 200) {
          if (res.data.ai_user !== undefined) {
            this.AIList = res.data.ai_user.employ_lv
            this.setArawAITop(this.AIList)
          }
        }
      })
    },
    setArawAITop (data) {
      if (data !== undefined && data.length > 1) {
        let firstRow = data[0]
        this.chartTopData[0] = firstRow.num_1
        this.chartTopData[1] = firstRow.num_6
        this.chartTopData[2] = firstRow.num_5
        this.chartTopData[3] = firstRow.num_4
        this.chartTopData[4] = firstRow.num_3
        this.chartTopData[5] = firstRow.num_2
      }
    },
    changeClientDate1 (index) {
      this.clientDateIndex1 = index
      this.listQuery4.user_type = index + 1
      this.customerStatistics()
    },
    changeClientDate2 (index) {
      this.clientDateIndex2 = index
      this.listQuery4.user_type = index + 1
      this.customerStatistics()
    },
    changeClientDate3 (index) {
      this.clientDateIndex3 = index
      this.listQuery4.user_type = index + 1
      this.customerStatistics()
    },
    drawChart (option, dom) {
      if (document.getElementById(dom) !== null) {
        var myChart = echarts.init(document.getElementById(dom))
        // 绘制图表
        myChart.clear()
        myChart.setOption(option)
      }
    },
    drawClientCount (id) {
      const option = {
        color: ['#5977fe'],
        xAxis: {
          type: 'category',
          data: this.clientCountXData
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
          data: this.clientCountYData,
          type: 'line',
          showSymbol: false,
          smooth: true
        }]
      }
      this.drawChart(option, id)
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
              {value: this.downChartInfor.like_company, name: '25%'},
              {value: this.downChartInfor.like_product, name: '40%'},
              {value: this.downChartInfor.like_me, name: '35%'}
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
            {name: '个人能力', max: 100},
            {name: '获客能力', max: 100},
            {name: '客户互动', max: 100},
            {name: '官网推广', max: 100},
            {name: '产品推广', max: 100},
            {name: '销售主动性', max: 100}
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
    getChartId (index) {
      return `chart-${index}`
    },
    gotoCard () {
      this.$router.push({
        path: '/bossCard'
      })
    }
  },
  mounted () {
    this.getBossOverview() // Boss雷达-总览
    this.bossOverviewTotal() // Boss雷达-总览-总数
    this.customerStatistics() // Boss雷达-总览-客户统计
    this.drawCare()
    setTimeout(() => {
      this.drawAITop()
      const option = {
        tooltip: {

        },
        radar: {

        // shape: 'circle',
          name: {
            show: false,
            textStyle: {
              color: '#333',
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          radius: 20,
          indicator: [
            {name: '个人能力', max: 100},
            {name: '获客能力', max: 100},
            {name: '客户互动', max: 100},
            {name: '官网推广', max: 100},
            {name: '产品推广', max: 100},
            {name: '销售主动性', max: 100}
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
      for (let i = 0; i < 4; i++) {
        this.drawChart(option, `chart-${i}`)
      }
    }, 2000)
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.boss{
  overflow: auto;
  height: 100%;
  .line{
    height: 0.15rem;
    background-color: #f3f3f3;
  }
  .search{
    padding: 0.3rem;
    &>span{
      float: left;
      width: 5rem;
      height: 0.7rem;
      background-color: #f3f3f3;
      border-radius: 0.1rem;
      input{
        width: 80%;
        height: 98%;
        float: left;
        border: none;
        outline: none;
        background-color: #f3f3f3;
        padding-left: 0.2rem;
      }
      .vux-x-icon{
        float: right;
        margin-top: 0.1rem;
        margin-right: 0.2rem;
        fill: #717171;
      }
    }
    &>i{
      width: 1.7rem;
      height: 0.7rem;
      background-color: #f3f3f3;
      color: #5977fe;
      font-size: 0.3rem;
      float: right;
      text-align: center;
      border-radius: 0.1rem;
      line-height: 0.7rem;
    }
  }
  .department{
    height: 0.6rem;
    background-color: #f3f3f3;
    padding: 0 0.3rem;
    line-height: 0.6rem;
    & /deep/ .weui-cell{
      padding: 0;
      .weui-cell__ft{
        &::after{
          display: none;
        }
      }
    }
    span{
      float: left;
      color: #717171;
    }
  }
  .nav-tab{
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
  .client{
    .vux-tab-item{
      flex: 0 0 33.33%;
    }
  }
  .client-date-tab{
    ul{
      height: 0.9rem;
    }
    li{
      width: 25%;
      float: left;
      height: 0.9rem;
      line-height: 0.9rem;
      text-align: center;
      font-size: 0.28rem;
      &.active{
        color: #5977fe;
      }
    }
    #clientDate1,#clientDate2,#clientDate3{
      width: 100%;
      height: 4rem;
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
        }
      }
      &:nth-child(2){
        span::after{
          background-color: #653ffe;
        }
        i{
          background: linear-gradient(left, #cc00ff, #5747fe);
        }
      }
      &:nth-child(3){
        span::after{
          background-color: #73a6fb;
        }
        i{
          background: linear-gradient(left, #cc00ff, #6eaffb);
        }
      }
      &:nth-child(4){
        i{
          background: linear-gradient(left, #cd01fd, #fd5b66);
        }
      }
      &:nth-child(5){
        i{
          background: linear-gradient(left, #c781f9, #0fba40);
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
  .sell{
    .vux-tab-item{
      span{
        height: 10px;
        width: 100%;
        float: left;
        line-height: 10px;
        margin-top: 15px;
        border-right: 1px solid #aaa;
      }
    }
  }
  .sell-list{
    .self{
      height: 2rem;
      padding: 0.25rem 0.3rem;
      line-height: 1.4rem;
      span{
        height: 100%;
        color: #5977fe;
        font-size: 0.32rem;
      }
      img{
        width: 1.5rem;
        height: 1.5rem;
        float: left;
        margin: 0 0.5rem;
        border-radius: 0.1rem;
      }
    }
    li{
      height: 1.8rem;
      padding: 0.4rem 0.3rem;
      line-height: 1rem;
      border-top: 1px solid #eee;
      position: relative;
      .avatar{
        width: 1rem;
        height: 1rem;
        border-radius: 0.1rem;
        margin: 0 0.5rem;
        float: left;
      }
      .icon-top{
        width: 0.35rem;
        height: 0.35rem;
        float: left;
        margin-top: 0.4rem;
      }
      .icon-champion{
        position: absolute;
        top: 0.25rem;
        left: 1rem;
        width: 0.5rem;
      }
      span{
        height: 100%;
        color: #333;
        font-size: 0.32rem;
        &:first-child{
          width: 0.35rem;
          text-align: center;
        }
        &.top1{
          color: #ff5f1a;
        }
        &.top2{
          color: #feab2b;
        }
        &.top3{
          color: #e7d59a;
        }
      }
    }
  }
  .AI{
    li{
      height: 2.2rem;
      border-bottom: 1px solid #eee;
      padding: 0.5rem 0.3rem;
      position: relative;
      &.first-item{
        height: 5.7rem;
        padding-bottom: 0;
      }
      .icon-top{
        width: 0.35rem;
        margin-top: 0.4rem;
      }
      .avatar{
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 0.1rem;
        margin-left: 0.5rem;
        margin-right: 0.3rem;
      }
      .icon-champion{
        position: absolute;
        top: 0.35rem;
        left: 1rem;
        width: 0.5rem;
      }
      &>span{
        width: 0.35rem;
        text-align: center;
        line-height: 1.2rem;
      }
      p{
        height: 1.2rem;
      }
      .name{
        display: block;
        font-size: 0.32rem;
      }
      .job{
        display: block;
        font-size: 0.26rem;
        color: #717171;
        margin-top: 0.3rem;
      }
      .charts{
        width: 1.5rem;
        height: 1.2rem;
        margin-right: 0.5rem;
      }
      .vux-x-icon{
        fill: #717171;
        margin-top: 0.4rem;
        width: 0.5rem;
        height: 0.5rem;
      }
      #top-chart{
        border-top: 1px solid #eee;
        height: 3.6rem;
        clear: both;
        margin-top: 1.5rem;
      }
    }
  }
}
</style>
