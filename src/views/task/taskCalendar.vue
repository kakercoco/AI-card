/*
 * @Author: zhangmengli
 * @Date: 2018-11-20 19:27:27
 * @Last Modified by: zhangmengli
 * @Last Modified time: 2018-11-20 19:27:27
 */
<template>
  <div class="calendar">
    <div class="task_calendar">
      <img src="../../assets/task/calendar_icon.png" class="calendar_icon" @click="clickCalndarIcon">
      <inline-calendar @on-change="change" :render-function="buildSlotFn" v-model="time" @on-select-single-date='choseDay' :show-last-month="false" :show-next-month="false" @on-view-change='useCustomFn'></inline-calendar>
    </div>
    <div>
      <p class="calendar_header">{{ date }}</p>
      <ul class="task_list">
        <li v-for="(item, index) in overdueTask" :key="index">
         <div class="task_left2">
           <img v-if="item.star === 0" src="../../assets/task/unmark.png" class="star_icon" @click="signStar(item)">
           <img v-if="item.star === 1" src="../../assets/task/mark.png" class="star_icon" @click="signStar(item)">
         </div>
          <div class="task_left" @click="taskDetail(item)">
            <p class="task_title">{{ item.title }}</p>
            <p>{{ item.his_time }}   <span v-if="item.expire === 1">已过期</span></p>
          </div>
          <div class="task_right">
            <p @click="signFinishTask(item)">完成</p>
           <!-- <x-icon type="ios-arrow-right" class="icon-right" @click="signFinishTask(item)"></x-icon>-->
          </div>
        </li>
      </ul>
      <div class="completed_task_list">
        <div :class="completedTask.length > 0 && isShow ? 'min-height': ''">
          <p class="completed_task_title" @click="clickCompletedTask(0)" v-if="completedTask.length > 0">{{ displayName }}</p>
          <x-icon type="ios-arrow-down" class="icon-down" v-if="completedTask.length > 0 && !isShow" @click="clickCompletedTask(0)"></x-icon>
          <x-icon type="ios-arrow-up" class="icon-down" v-if="completedTask.length > 0 && isShow" @click="clickCompletedTask(0)"></x-icon>
        </div>
        <ul class="task_list" v-show="isShow">
          <li v-for="(item, index) in completedTask" :key="index">
            <div class="task_left2">
              <img v-if="item.status === 0" src="../../assets/task/unselected.png" class="star_icon" @click="signFinishTask(item)">
              <img v-if="item.status === 1" src="../../assets/task/selected.png" class="star_icon" @click="signFinishTask(item)">
            </div>
            <div class="task_left" @click="taskDetail(item)">
              <p class="task_title">{{ item.title }}</p>
              <p>{{ item.his_time }}</p>
            </div>
            <div class="task_right" @click="taskDetail(item)">
              <!--<p>完成</p>-->
              <x-icon type="ios-arrow-right" class="icon-right" @click="taskDetail(item)"></x-icon>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div else>
      <div class="empty_calendar" v-if="taskLists.length  === 0">
        <img src="../../assets/task/empty_task.png">
        <p>新建一条任务，开始一天的工作吧</p>
      </div>
      <div class="calendar_footer" v-if="isShowButton">
        <x-button type="primary" class="task_button" @click.native="addTask">新建任务</x-button>
      </div>
    </div>
  </div>
</template>

<script>
import { InlineCalendar, PopupPicker, XButton, AlertModule } from 'vux'
import { getTaskList, getCalendarDays, signCompletedTask, signStarTask } from '@/api/task'
import { setCookie, getCookie } from '@/utils/auth'
import { formateDate } from '@/utils/base'
export default {
  name: 'taskCalendar',
  components: {
    InlineCalendar,
    PopupPicker,
    XButton,
    AlertModule
  },
  data () {
    return {
      buildSlotFn: () => '',
      time: `${new Date().getFullYear()}-${
        new Date().getMonth() + 1 < 10
          ? `0${new Date().getMonth() + 1}`
          : new Date().getMonth() + 1
      }-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()}`,
      date: `${new Date().getFullYear()}-${
        new Date().getMonth() + 1 < 10
          ? `0${new Date().getMonth() + 1}`
          : new Date().getMonth() + 1
      }-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()}`,
      expiredTask: 4,
      dayList: [],
      listQuery: {
        start_time: '',
        end_time: '',
        type: 5

      },
      taskLists: [],
      overdueTask: [],
      completedTask: [],
      isShow: true,
      displayName: '隐藏已完成任务',
      isShowButton: true
    }
  },
  methods: {
    clickCompletedTask (type) {
      if (type === 0) {
        this.isShow = !this.isShow
        if (this.isShow) {
          this.displayName = '隐藏已完成任务'
        } else {
          this.displayName = '显示已完成任务'
        }
      }
    },
    clickCalndarIcon () {
      this.$router.push({
        path: '/taskList'
      })
    },
    taskDetail (item) {
      this.$router.push({
        path: '/taskDetail',
        query: {
          id: item.id
        }
      })
    },
    addTask () {
      this.$router.push({
        path: '/addTask'
      })
    },
    signFinishTask (item) {
      let status = 0
      let content = ''
      if (item.status === 0) {
        status = 1 // 完成
        content = '此任务确定完成了吗？'
      } else {
        status = 0 // 取消
        content = '此任务确认取消完成？'
      }
      let this_ = this
      this.$vux.confirm.show({
        title: '提示',
        content: content,
        onCancel () { // 取消
        },
        onConfirm () { // 确定
          signCompletedTask({
            id: item.id,
            status: status
          }).then(res => {
            if (res.code === 200) {
              this_.getTaskLists()
            } else {
              AlertModule.show({
                title: '提示',
                content: res.msg
              })
            }
          })
        }
      })
    },
    signStar (item) {
      let star = 0
      if (item.star === 0) {
        star = 1
      } else {
        star = 0
      }
      signStarTask({
        id: item.id,
        star: star
      }).then(res => {
        if (res.code === 200) {
          this.getTaskLists()
        } else {
          AlertModule.show({
            title: '提示',
            content: res.msg
          })
        }
      })
    },
    change (val) {
    },
    choseDay (val) {
      this.date = formateDate(val)
      let currentTime = getCookie('current_time')
      if (val > currentTime || val === currentTime) {
        this.isShowButton = true
      } else {
        this.isShowButton = false
      }
      this.listQuery.start_time = val
      this.listQuery.end_time = val
      this.getTaskLists()
    },
    chooseChange (val) {
      this.listQuery.start_time = val
      this.listQuery.end_time = val
      this.getTaskLists()
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
      getCalendarDays(time).then(res => {
        if (res.code === 200) {
          that.dayList = res.data
          let arr = []
          for (var i in that.dayList) {
            arr.push(parseInt(that.dayList[i]))
          }
          that.buildSlotFn = (line, index, data) => {
            return arr.includes(data.date)
              ? '<div style="font-size:12px;text-align:center;"><span style="display:inline-block;width:20px;height:2px;background-color:#5977fe;"></span></div>'
              : '<div style="height:14px;"></div>'
          }
        }
      })
    },
    getTaskLists () {
      getTaskList(this.listQuery).then(res => {
        if (res.code === 200) {
          this.taskLists = res.data
          let completedTask = []
          let overdueTask = []
          if (res.data.length > 0) {
            this.taskLists.forEach(element => {
              if (element.status === 1) { // 完成
                completedTask.push(element)
              } else {
                overdueTask.push(element)
              }
            })
          }
          this.completedTask = completedTask
          this.overdueTask = overdueTask
        } else {
          AlertModule.show({
            title: '提示',
            content: res.msg
          })
        }
      })
    }
  },
  created () {
    this.listQuery.start_time = this.time
    this.listQuery.end_time = this.time
    setCookie('current_time', this.time)
    this.date = formateDate(this.date)
  },
  computed: {},
  mounted () {
    this.getTaskLists()
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.calendar {
  height: 100%;
  overflow: auto;
  .min-height{
    height: 1.1rem;
  }
  & /deep/ .inline-calendar {
    .calendar-header > div {
      float: left;
      width: 43%;
      text-align: center;
      overflow: hidden;
    }
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
    padding: 0 0.3rem 0.3rem 0.3rem;
    .calendar_icon{
      position: relative;
      top: 0.65rem;
      right: -6.2rem;
      width: 0.35rem;
      height: 0.37rem;
    }
  }
  .calendar_header{
    border-bottom: 1px solid #f4f4f4;
    height: 0.8rem;
    padding-left:0.3rem;
    line-height: 0.8rem;
    font-size: 0.32rem;
    font-family: SimHei, Microsoft YaHei, 'Avenir', Helvetica, Arial, sans-serif;
    font-weight: 500;
  }
  .calendar_footer{
    border-top: 5px solid #f4f4f4;
    padding-top: 0.3rem;
    padding-bottom: 0.5rem;
    .weui-btn:after {
      border-radius: 5px !important;
    }
    .weui-btn_primary {
      background-color: #3c7df0;
      height: 0.88rem;
      line-height: 0.88rem;
      border-radius: 5px;
      font-family: SimHei, Microsoft YaHei, 'Avenir', Helvetica, Arial, sans-serif;
      font-weight: 500;
    }
    .task_button{
      width: 90%;
    }
  }

  .task_list{
    padding: 0 0.4rem;
    li{
      height: 1.2rem;
      padding: 0.1rem 0 0.1rem 0;
      border-bottom: 1px solid #eee;
      font-family: SimHei, Microsoft YaHei, 'Avenir', Helvetica, Arial, sans-serif;
      font-weight: 500;
      .selected_icon{
        float: left;
        width: 0.42rem;
        height: 0.48rem;
        position: relative;
        top: 0.16rem;
      }
      .star_icon{
        float: left;
        width: 0.4rem;
        height: 0.4rem;
        position: relative;
        top: 0.2rem;
      }
      .task_left2{
        width: 8%;
        float: left;
        height: 100%;
        line-height: 0.5rem;
        overflow: hidden;
      }
      .task_left{
        width: 70%;
        float: left;
        height: 100%;
        line-height: 0.5rem;
        margin-left: 0.2rem;
        padding: 0.2rem 0;
        overflow: hidden;
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
          }
        }
        .task_title{
          font-size: 16px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          color: #353535;
        }
      }
      .task_right{
        width: 12%;
        float: right;
        p{
          width: 100%;
          color: #3b63c4;
          font-size: 0.3rem;
          position: relative;
          top: 0.24rem;
          left: -0.01rem;
        }
        .icon-right {
          position: relative;
          top: 0.25rem;
          right: -22px;
          width: 0.5rem;
          fill: #a9a9a9;
          display: inline-block;
        }
      }
    }
  }
  .completed_task_list{
    font-family: SimHei, Microsoft YaHei, 'Avenir', Helvetica, Arial, sans-serif;
    font-weight: 500;
    .completed_task_title{
      height: 1.1rem;
      background-color: #f4f4f4;
      font-size: 0.24rem;
      color: #4e70c7;
      line-height: 1.1rem;
      text-align: center;
    }
    .icon-down {
      position: relative;
      top: -0.8rem;
      left: 4.58rem;
      width: 0.3rem;
      fill: #4e70c7;
      display: inline-block;
      float: left;
    }
  }
  .empty_calendar{
    height: 2.45rem;
    // background:url('../../assets/task/empty_task.png') no-repeat center 0.3rem;
    img{
      width: 1.6rem;
      height: 1.32rem;
      position: relative;
      top: 0.4rem;
      left: 2.93rem;
    }
    p{
      top: 0.4rem;
      position: relative;
      text-align: center;
      color: #a9a9a9;
      font-size: 0.3rem;
      font-family: SimHei, Microsoft YaHei, 'Avenir', Helvetica, Arial, sans-serif;
    }
  }
}
</style>
