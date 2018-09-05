/*
 * @Author: kaker.xutianxing
 * @Date: 2018-08-28 10:53:27
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-05 17:37:48
 */
<template>
  <div class="calendar">
    <inline-calendar @on-change="change" :render-function="buildSlotFn"></inline-calendar>
    <div class="tac insert-btn">
      <p class="fr">
        <img src="@/assets/img/sort.png" alt="" class="fr sort-icon">
        <popup-picker :data="list" v-model="value"  @on-change="chooseChange" class="fr">
        </popup-picker>
      </p>
      <span>添加日程<x-icon type="ios-plus-outline" size="13"></x-icon></span>
    </div>
    <div class="insert-content">
      <p class="no-message" v-if="false">无日程 请添加</p>
      <ul>
        <li v-for="item in 4" :key="item" @click="gotoInsertCalendar">
          <span class="time">08:03</span>
          <img src="@/assets/img/calendar.png" alt="" class="icon-tag">
          <div>
            <h5>预约签单</h5>
            <p>备注：提醒客户起床</p>
          </div>
          <x-icon type="ios-arrow-right" class="icon-right"></x-icon>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { InlineCalendar, PopupPicker } from 'vux'
export default {
  name: 'calendar',
  components: {
    InlineCalendar, PopupPicker
  },
  data () {
    return {
      buildSlotFn: () => '',
      value: ['筛选'],
      list: [['日常', '预约', '会议', '拜访', '生日']]
    }
  },
  methods: {
    change (val) {
      console.log(val)
    },
    chooseChange () {

    },
    useCustomFn (val) {
      this.buildSlotFn = val
        ? (line, index, data) => {
          return /8/.test(data.date)
            ? '<div style="font-size:12px;text-align:center;"><span style="display:inline-block;width:5px;height:5px;background-color:red;border-radius:50%;"></span></div>'
            : '<div style="height:19px;"></div>'
        }
        : () => ''
    },
    gotoInsertCalendar () {
      this.$router.push({
        path: '/insertCalendar'
      })
    }
  },
  mounted () {}
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
  }
  .insert-content{
    margin-top: 0.8rem;
    .no-message{
      text-align: center;
      font-size: 0.28rem;
      color: #717171;
    }
    li{
      height: 1.7rem;
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
          line-height: 0.3rem;
          height: 0.3rem;
          overflow: hidden;
        }
        p{
          height: 0.3rem;
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
