/*
 * @Author: kaker.xutianxing
 * @Date: 2018-08-28 10:53:27
 * @Last Modified by: Jessica
 * @Last Modified time: 2018-11-01 09:55:45
 */
<template>
  <div class="calendar">
    <inline-calendar @on-change="change" :render-function="buildSlotFn" v-model="time" @on-select-single-date='choseDay' :show-last-month="false" :show-next-month="false" @on-view-change='useCustomFn'></inline-calendar>
    <div class="tac insert-btn">
      <p class="fr">
        <popup-picker :data="list" v-model="value" @on-change="chooseChange" class="fr" style='width: 1.3rem;'>
          <template slot="title" slot-scope="props">
            <!-- use scope="props" when vue < 2.5.0 -->
            <img src="@/assets/img/sort.png" alt="" class="fr sort-icon">
          </template>
        </popup-picker>
      </p>
      <span @click="gotoInsertCalendar">添加日程<x-icon type="ios-plus-outline" size="13"></x-icon></span>
    </div>
    <div class="insert-content">
      <p class="no-message" v-if="false">无日程 请添加</p>
      <ul>
        <li v-for="(item, index) in calendar" :key="index" @click="gotoDetail(item.id)">
          <span class="time">{{item.his_time}}</span>
          <img src="@/assets/img/calendar1.png" alt="" class="icon-tag" v-if="item.type === 0">
          <img src="@/assets/img/calendar2.png" alt="" class="icon-tag" v-if="item.type === 1">
          <img src="@/assets/img/calendar3.png" alt="" class="icon-tag" v-if="item.type === 2">
          <img src="@/assets/img/calendar4.png" alt="" class="icon-tag" v-if="item.type === 3">
          <img src="@/assets/img/calendar5.png" alt="" class="icon-tag" v-if="item.type === 4">
          <x-icon type="ios-arrow-right" class="icon-right"></x-icon>
          <div>
            <h5>{{item.title}}</h5>
            <p v-if="item.reference !==''">备注：{{item.reference}}</p>
          </div>

        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { InlineCalendar, PopupPicker } from 'vux'
import { calendarList, getDays } from '@/api/calendar'
import { setCookie, getCookie, removeCookie } from '@/utils/auth'
export default {
  name: 'calendar',
  components: {
    InlineCalendar,
    PopupPicker
  },
  data () {
    return {
      buildSlotFn: () => '',
      value: ['筛选'],
      list: [['全部', '日常', '预约', '会议', '拜访', '生日']],
      calendar: [],
      month: '',
      time: `${new Date().getFullYear()}-${
        new Date().getMonth() + 1 < 10
          ? `0${new Date().getMonth() + 1}`
          : new Date().getMonth() + 1
      }-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()}`,
      type: 99,
      chose_one: false,
      range: 1,
      dayList: []
    }
  },
  methods: {
    change (val) {
      this.type = 99
      this.value = ['筛选']
      this.time = val
      var arr = val.split('-')
      this.chose_day = arr[arr.length - 1]
    },
    choseDay (val) {
      this.time = val
      this.chose_one = true
      setCookie('chose_time', val)
      this.getSearchType()
      this.getCalendarList()
    },
    chooseChange (val) {
      this.getSearchType()
      this.getCalendarList()
    },
    useCustomFn (val, index) {
      var that = this
      var time
      if (val !== undefined) {
        if (val.month < 10) {
          val.month = '0' + val.month
        }
        time = val.year + '' + val.month
        this.month = val.year + '-' + val.month
      } else {
        var arr = this.time.split('-')
        time = arr[0] + arr[1]
        this.month = time
      }
      getDays(time).then(res => {
        if (res.code === 200) {
          that.dayList = res.data
          let arr = []
          that.dayList.forEach(r => {
            arr.push(parseInt(r.days))
          })
          that.buildSlotFn = (line, index, data) => {
            return arr.includes(data.date)
              ? '<div style="font-size:12px;text-align:center;"><span style="display:inline-block;width:20px;height:2px;background-color:#5977fe;"></span></div>'
              : '<div style="height:14px;"></div>'
          }
        }
      })
    },
    gotoInsertCalendar () {
      this.$router.push({
        path: '/insertCalendar',
        query: {
          date: this.time,
          month: this.month
        }
      })
    },
    gotoDetail (id) {
      this.$router.push({
        path: '/calendarDetail',
        query: {
          id: id,
          date: this.time
        }
      })
    },
    getSearchType () {
      if (this.value[0] === '日常') {
        this.type = 0
      } else if (this.value[0] === '预约') {
        this.type = 1
      } else if (this.value[0] === '会议') {
        this.type = 2
      } else if (this.value[0] === '拜访') {
        this.type = 3
      } else if (this.value[0] === '生日') {
        this.type = 4
      } else if (this.value[0] === '全部') {
        this.type = 99
      }
    },
    getCalendarList () {
      if (this.chose_one) {
        this.range = 1
      }
      const data = {
        time: this.time,
        type: this.type,
        days: this.range
      }
      calendarList(data).then(res => {
        this.calendar = res.data
      })
    }
  },
  // watch: {
  //   value () {
  //     this.getSearchType()
  //     this.getCalendarList()
  //   }
  // },
  created () {
    console.log(getCookie('chose_time'))
    if (getCookie('chose_time') !== undefined) {
      this.time = getCookie('chose_time')
      removeCookie('chose_time')
    } else {
      console.log(this.time)
    }
  },
  computed: {},
  mounted () {
    this.getCalendarList()
    // this.useCustomFn()
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.calendar {
  height: 100%;
  overflow: auto;
  padding: 0.3rem;
  & /deep/ .inline-calendar {
    .vux-prev-icon {
      border-color: #5977fe;
    }
    .vux-next-icon {
      border-color: #5977fe;
    }
    td.is-today {
      color: #5977fe;
    }
    td.current > span.vux-calendar-each-date {
      background-color: #5977fe;
    }
    .calendar-title:active {
      background-color: #5977fe;
    }
  }
  .sort-icon {
    width: 0.4rem;
    margin-left: 0.2rem;
  }
  .insert-btn {
    & > span {
      color: #5977fe;
      display: block;
      width: 1.8rem;
      margin: 0.5rem auto 0 auto;
      text-decoration: underline;
      .vux-x-icon {
        fill: #5977fe;
        width: 0.4rem;
        height: 0.4rem;
        float: right;
      }
    }
    .vux-cell-box {
      &::before {
        border: none;
      }
    }
    & /deep/ .weui-cell {
      padding: 0;
      .weui-cell__ft {
        padding-right: 0;
        &::after {
          display: none;
        }
      }
    }
  }
  .insert-content {
    margin-top: 0.8rem;
    .no-message {
      text-align: center;
      font-size: 0.28rem;
      color: #717171;
    }
    li {
      // height: 1.7rem;
      min-height: 1.7rem;
      padding: 0.25rem 0;
      position: relative;
      &::after {
        content: '';
        width: 0.2rem;
        height: 0.2rem;
        border-radius: 0.2rem;
        background-color: #5977fe;
        position: absolute;
        top: 0.3rem;
        left: 0;
      }
      & > span {
        float: left;
        color: #717171;
        font-size: 0.3rem;
        margin: 0 0.3rem;
        margin-left: 0.5rem;
      }
      .icon-tag {
        width: 0.35rem;
        float: left;
        margin-right: 0.3rem;
      }
      & > div {
        height: 100%;
        color: #717171;
        max-width: 3.5rem;
        overflow: hidden;
        margin-top: -0.03rem;
        h5 {
          font-size: 0.3rem;
          // line-height: 0.3rem;
          // height: 0.3rem;
          overflow: hidden;
          font-weight: normal;
        }
        p {
          // height: 0.3rem;
          overflow: hidden;
          font-size: 0.26rem;
          margin-top: 0.2rem;
        }
      }
      .icon-right {
        float: right;
        width: 0.4rem;
        fill: #717171;
      }
    }
  }
}
</style>
