/*
 * @Author: kaker.xutianxing
 * @Date: 2018-08-28 10:53:27
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-29 11:10:33
 */
<template>
  <div class="calendar">
    <inline-calendar @on-change="change" :render-function="buildSlotFn" v-model="time"></inline-calendar>
    <div class="tac insert-btn">
      <p class="fr">
        <img src="@/assets/img/sort.png" alt="" class="fr sort-icon">
        <popup-picker :data="list" v-model="value"  @on-change="chooseChange" class="fr">
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
          <div>
            <h5>{{item.title}}</h5>
            <p>备注：{{item.reference}}</p>
          </div>
          <x-icon type="ios-arrow-right" class="icon-right"></x-icon>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { InlineCalendar, PopupPicker } from 'vux'
import { calendarList } from '@/api/calendar'

export default {
  name: 'calendar',
  components: {
    InlineCalendar, PopupPicker
  },
  data () {
    return {
      buildSlotFn: () => '',
      value: ['筛选'],
      list: [['全部', '日常', '预约', '会议', '拜访', '生日']],
      calendar: [],
      time: `${new Date().getFullYear()}-${new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1}-${new Date().getDate()}`,
      type: 99
    }
  },
  methods: {
    change (val) {
      this.time = val
      this.getCalendarList()
    },
    chooseChange (val) {
      console.log(val)
    },
    useCustomFn (val) {
      this.buildSlotFn =
         (line, index, data) => {
           return /8/.test(data.date)
             ? '<div style="font-size:12px;text-align:center;"><span style="display:inline-block;width:20px;height:2px;background-color:red;"></span></div>'
             : '<div style="height:14px;"></div>'
         }
    },
    gotoInsertCalendar () {
      this.$router.push({
        path: '/insertCalendar',
        query: {
          date: this.time
        }
      })
    },
    gotoDetail (id) {
      this.$router.push({
        path: '/calendarDetail',
        query: {
          id
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
      const data = {
        time: this.time,
        type: this.type
      }
      calendarList(data)
        .then(res => {
          this.calendar = res.data
        })
    }
  },
  watch: {
    value () {
      this.getSearchType()
      this.getCalendarList()
    }
  },
  computed: {
  },
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
  & /deep/ .inline-calendar{
    .vux-prev-icon{
      border-color: #5977fe;
    }
    .vux-next-icon{
      border-color: #5977fe;
    }
    td.is-today{
      color: #5977fe;
    }
    td.current > span.vux-calendar-each-date{
      background-color: #5977fe;
    }
    .calendar-title:active{
      background-color: #5977fe;
    }
  }
  .sort-icon{
    width: 0.4rem;
    margin-left: 0.2rem;
  }
  .insert-btn{
    margin-top: 0.5rem;
    &>span{
      color: #5977fe;
      display: block;
      width: 1.8rem;
      margin: 0 auto;
      text-decoration: underline;
      .vux-x-icon{
        fill: #5977fe;
        width: 0.3rem;
        height: 0.3rem;
        float: right;
        margin-top: 0.05rem;
      }
    }
    .vux-cell-box{
      &::before{
        border: none;
      }
    }
    & /deep/ .weui-cell{
      padding: 0;
      .weui-cell__ft{
        padding-right: 0;
        &::after{
          display: none;
        }
      }
    }
  }
  .insert-content{
    margin-top: 0.8rem;
    .no-message{
      text-align: center;
      font-size: 0.28rem;
      color: #717171;
    }
    li{
      // height: 1.7rem;
      min-height: 1.7rem;
      padding: 0.25rem 0;
      position: relative;
      &::after{
        content: '';
        width: 0.2rem;
        height: 0.2rem;
        border-radius: 0.2rem;
        background-color: #5977fe;
        position: absolute;
        top: 0.3rem;
        left: 0;
      }
      &>span{
        float: left;
        color: #717171;
        font-size: 0.22rem;
        margin: 0 0.3rem;
        margin-left: 0.5rem;
      }
      .icon-tag{
        width: 0.35rem;
        float: left;
      }
      &>div{
        height: 100%;
        float: left;
        color: #717171;
        margin: 0 0.3rem;
        max-width: 3.5rem;
        overflow: hidden;
        h5{
          font-size: 0.3rem;
          // line-height: 0.3rem;
          // height: 0.3rem;
          overflow: hidden;
        }
        p{
          // height: 0.3rem;
          overflow: hidden;
          font-size: 0.26rem;
          margin-top: 0.2rem;
        }
      }
      .icon-right{
        float: right;
        width: 0.4rem;
        fill: #717171;
      }
    }
  }
}
</style>
