/*
 * @Author: zhangmengli
 * @Date: 2018-11-20 19:27:27
 * @Last Modified by: zhangmengli
 * @Last Modified time: 2018-11-20 19:27:27
 */
<template>
  <div class="calendar">
    <div class="task_calendar">
      <inline-calendar @on-change="change" :render-function="buildSlotFn" v-model="time" @on-select-single-date='choseDay' :show-last-month="false" :show-next-month="false" @on-view-change='useCustomFn'></inline-calendar>
    </div>
    <div v-if="expiredTask < 0 || completedTask < 0">
      <p class="calendar_header">11月2日 周五</p>
      <ul class="task_list">
        <li v-for="(item, index) in expiredTask" :key="index">
          <img v-if="item.star === 0" src="../../assets/task/unmark.png" class="star_icon">
          <img else src="../../assets/task/mark.png" class="star_icon">
          <div class="task_left">
            <h6>处理西点军训项目的策划问题</h6>
            <p>星期四 18:36     <span>已过期</span></p>
          </div>
          <div class="task_right">
            <p>完成</p>
            <x-icon type="ios-arrow-right" class="icon-right"></x-icon>
          </div>
        </li>
      </ul>
      <div class="completed_task_list">
        <p class="completed_task_title">隐藏已完成任务</p>
        <x-icon type="ios-arrow-down" class="icon-down"></x-icon>
        <ul class="task_list">
          <li v-for="(item, index) in completedTask" :key="index">
            <img src="../../assets/task/selected.png" class="selected_icon">
            <div class="task_left">
              <h6>处理西点军训项目的策划问题 副本</h6>
              <p>星期四 18:36</p>
            </div>
            <div class="task_right">
              <!--<p>完成</p>-->
              <x-icon type="ios-arrow-right" class="icon-right"></x-icon>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div else>
      <div class="empty_calendar">
        <p>新建一条任务，开始一天的工作吧</p>
      </div>
      <div class="calendar_footer">
        <x-button type="primary" class="task_button">新建任务</x-button>
      </div>
    </div>
  </div>
</template>

<script>
import { InlineCalendar, PopupPicker, XButton } from 'vux'
import { setCookie } from '@/utils/auth'
export default {
  name: 'taskCalendar',
  components: {
    InlineCalendar,
    PopupPicker,
    XButton
  },
  data () {
    return {
      buildSlotFn: () => '',
      time: `${new Date().getFullYear()}-${
        new Date().getMonth() + 1 < 10
          ? `0${new Date().getMonth() + 1}`
          : new Date().getMonth() + 1
      }-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()}`,
      expiredTask: 4,
      completedTask: 4
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
    },
    chooseChange (val) {
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
    }
  },
  created () {
  },
  computed: {},
  mounted () {
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.calendar {
  height: 100%;
  overflow: auto;
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
  .task_calendar{
    border-bottom: 0.2rem solid #f4f4f4;
    padding: 0.3rem;
  }
  .calendar_header{
    border-bottom: 1px solid #f4f4f4;
    height: 0.8rem;
    padding-left:0.3rem;
    line-height: 0.8rem;
    font-size: 0.32rem;
    font-weight: bolder;
  }
  .calendar_footer{
    border-top: 5px solid #f4f4f4;
    padding-top: 0.2rem;
    padding-bottom: 0.3rem;
    .weui-btn:after {
      border-radius: 5px !important;
    }
    .weui-btn_primary {
      background-color: #3c7df0;
      height: 0.88rem;
      line-height: 0.88rem;
      border-radius: 5px;
    }
    .task_button{
      width: 90%;
    }
  }

  .task_list{
    padding: 0.2rem 0.3rem;
    li{
      height: 1.4rem;
      border-bottom: 1px solid #eee;
      .selected_icon{
        float: left;
        width: 0.42rem;
        height: 0.48rem;
        position: relative;
        top: 0.16rem;
      }
      .star_icon{
        float: left;
        width: 0.32rem;
        height: 0.3rem;
        position: relative;
        top: 0.16rem;
      }
      .task_left{
        width: 78%;
        float: left;
        height: 100%;
        line-height: 0.5rem;
        margin-left: 0.2rem;
        padding: 0.1rem 0;
        overflow: hidden;
        h6{
          font-size: 16px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
        i{
          color: #f69600;
        }
        p{
          color: #a9a9a9;
          font-size: 0.24rem;
          line-height: 0.36rem;
          span{
            color: #ff4d42;
            padding-left:0.4rem;
            font-weight: bolder;
          }
        }
      }
      .task_right{
        width: 12%;
        float: right;
        p{
          width: 100%;
          color: #3b63c4;
          font-size: 0.3rem;
          font-weight: bolder;
          position: relative;
          top: 23px;
          left: -12px;
        }
        .icon-right {
          position: relative;
          top: 0.05rem;
          right: -22px;
          width: 0.5rem;
          fill: #a9a9a9;
          display: inline-block;
        }
      }
    }
  }
  .completed_task_list{
    .completed_task_title{
      height: 1.1rem;
      background-color: #f4f4f4;
      font-size: 0.24rem;
      color: #4e70c7;
      line-height: 1.1rem;
      text-align: center;
      font-weight: bolder;
    }
    .icon-down {
      position: relative;
      top: -0.78rem;
      left: 229px;
      width: 0.3rem;
      fill: #4e70c7;
      display: inline-block;
    }
  }
  .empty_calendar{
    height: 6rem;
    background:url('../../assets/task/empty_icon.png') no-repeat center center;
    p{
      padding-top: 5.3rem;
      text-align: center;
      color: #a9a9a9;
      font-size: 0.3rem;
    }
  }
}
</style>
