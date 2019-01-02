/*
 * @Author: zhangmengli
 * @Date: 2018-11-19 10:49:27
 * @Last Modified by: zhangmengli
 * @Last Modified time: 2018-11-19 10:49:27
 */
<template>
  <div class="task">
    <div class="task_header">
      <div class="task_tab">
        <tab :line-width="2" v-model="tabIndex">
          <tab-item @on-item-click="onItemClick">今天</tab-item>
          <tab-item @on-item-click="onItemClick">全部</tab-item>
        </tab>
      </div>
      <img src="../../assets/task/calendar.png" class="task_img" @click="gotoCalendar">
    </div>
    <div class="task_list_swarp">
      <div v-show="tabIndex === 0">
        <ul class="task_list">
          <li v-for="(item, index) in overdueTask" :key="index">
            <div class="task_left2">
              <img v-if="item.star === 0" src="../../assets/task/unmark.png" class="star_icon" @click="signStar(item)">
              <img v-if="item.star === 1" src="../../assets/task/mark.png" class="star_icon" @click="signStar(item)">
            </div>
            <div class="task_left" @click="taskDetail(item)">
              <p class="task_title"> {{ item.title }}</p>
              <p> {{Global.parseTime(item.his_time, '{y}-{m}-{d} {h}:{i}')}}     <span v-if="item.expire === 1">已过期</span></p>
            </div>
            <div class="task_right">
              <p @click="signFinishTask(item)">完成</p>
              <!--<x-icon type="ios-arrow-right" class="icon-right" @click="signFinishTask(item)"></x-icon>-->
            </div>
          </li>
        </ul>
        <div class="completed_task_list">
          <div :class="completedTask.length > 0 && isShow ? 'min-height': ''">
            <p class="completed_task_title" @click="clickCompletedTask(0)" v-if="completedTask.length > 0">{{ displayName1 }}</p>
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
                <p class="task_title"> {{ item.title }}</p>
                <p> {{Global.parseTime(item.his_time, '{y}-{m}-{d} {h}:{i}')}}</p>
              </div>
              <div class="task_right" @click="taskDetail(item)">
                <!--<p>完成</p>-->
                <x-icon type="ios-arrow-right" class="icon-right" @click="taskDetail(item)"></x-icon>
              </div>
            </li>
          </ul>
        </div>
        <div style="height: 1.5rem;"></div>
        <div class="yyf_new_btn" style="border-top: 1px #e3e3e3 solid">
          <x-button type="primary" class="task_button" @click.native="addTask">新建任务</x-button>
        </div>
        <!--<div class="task_footer">
          <x-button type="primary" class="task_button" @click.native="addTask">新建任务</x-button>
        </div>-->
      </div>
      <div v-show="tabIndex === 1">
        <ul class="task_list">
          <li v-for="(item, index) in overdueTask" :key="index">
            <div class="task_left2">
              <img v-if="item.star === 0" src="../../assets/task/unmark.png" class="star_icon" @click="signStar(item)">
              <img v-if="item.star === 1" src="../../assets/task/mark.png" class="star_icon" @click="signStar(item)">
            </div>
            <div class="task_left" @click="taskDetail(item)">
              <p class="task_title"> {{ item.title }}</p>
              <p> {{Global.parseTime(item.his_time, '{y}-{m}-{d} {h}:{i}')}}     <span v-if="item.expire === 1">已过期</span></p>
            </div>
            <div class="task_right">
              <p @click="signFinishTask(item)">完成</p>
              <!--<x-icon type="ios-arrow-right" class="icon-right" @click="signFinishTask(item)"></x-icon>-->
            </div>
          </li>
        </ul>
        <div class="completed_task_list">
         <div :class="completedTask.length > 0 && isShow2 ? 'min-height': ''">
           <p class="completed_task_title" @click="clickCompletedTask(1)" v-if="completedTask.length > 0">{{ displayName2 }}</p>
           <x-icon type="ios-arrow-down" class="icon-down" v-if="completedTask.length > 0 && !isShow2" @click="clickCompletedTask(1)"></x-icon>
           <x-icon type="ios-arrow-up" class="icon-down" v-if="completedTask.length > 0 && isShow2" @click="clickCompletedTask(1)"></x-icon>
         </div>
          <ul class="task_list" v-show="isShow2">
            <li v-for="(item, index) in completedTask" :key="index">
              <div class="task_left2">
                <img v-if="item.status === 0" src="../../assets/task/unselected.png" class="star_icon" @click="signFinishTask(item)">
                <img v-if="item.status === 1" src="../../assets/task/selected.png" class="star_icon" @click="signFinishTask(item)">
              </div>
              <div class="task_left" @click="taskDetail(item)">
                <p class="task_title"> {{ item.title }}</p>
                <p> {{Global.parseTime(item.his_time, '{y}-{m}-{d} {h}:{i}')}}</p>
              </div>
              <div class="task_right" @click="taskDetail(item)">
                <!--<p>完成</p>-->
                <x-icon type="ios-arrow-right" class="icon-right" @click="taskDetail(item)"></x-icon>
              </div>
            </li>
          </ul>
        </div>
        <div style="height: 1.5rem;"></div>
        <div class="yyf_new_btn" style="border-top: 1px #e3e3e3 solid">
          <x-button type="primary" class="task_button" @click.native="addTask">新建任务</x-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Tab,
  TabItem,
  XButton,
  AlertModule
} from 'vux'
import { getTaskList, signCompletedTask, signStarTask } from '@/api/task'
import { dateFtt } from '@/utils/base'
export default {
  name: 'taskList',
  components: {
    XButton,
    Tab,
    TabItem,
    AlertModule
  },
  data () {
    return {
      tabIndex: this.$route.query.tabIndex !== undefined && this.$route.query.tabIndex !== '' ? this.$route.query.tabIndex : 1,
      currentTime: dateFtt('yyyy-MM-dd', new Date()),
      taskLists: [],
      overdueTask: [],
      completedTask: [],
      listQuery: {
        start_time: this.$route.query.time !== undefined ? this.$route.query.time : '',
        end_time: this.$route.query.time !== undefined ? this.$route.query.time : '',
        type: 5,
        uid: this.$route.query.uid !== undefined ? this.$route.query.uid : ''
      },
      isShow: true,
      isShow2: true,
      displayName1: '隐藏已完成任务',
      displayName2: '隐藏已完成任务'
    }
  },
  methods: {
    clickCompletedTask (type) {
      if (type === 0) {
        this.isShow = !this.isShow
        if (this.isShow) {
          this.displayName1 = '隐藏已完成任务'
        } else {
          this.displayName1 = '显示已完成任务'
        }
      } else {
        this.isShow2 = !this.isShow2
        if (this.isShow2) {
          this.displayName2 = '隐藏已完成任务'
        } else {
          this.displayName2 = '显示已完成任务'
        }
      }
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
    addTask () {
      this.$router.push({
        path: '/addTask'
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
    },
    onItemClick (index) {
      this.tabIndex = index
      if (index === 0) {
        this.listQuery.start_time = this.currentTime
        this.listQuery.end_time = this.currentTime
      } else {
        this.listQuery.start_time = ''
        this.listQuery.end_time = ''
      }
      this.getTaskLists()
    },
    taskDetail (item) {
      this.$router.push({
        path: '/taskDetail',
        query: {
          id: item.id
        }
      })
    },
    gotoCalendar (item) {
      this.$router.push({
        path: '/taskCalendar'
        /* query: {
          uid: item.uid
        } */
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
  },
  computed: {},
  mounted () {
    this.getTaskLists()
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.task {
  height: 100%;

  & /deep/ .vux-tab-item{
    font-size: 16px;
  }
  & /deep/ .vux-tab .vux-tab-item {
    background: #fff;
  }
  & /deep/ .vux-tab .vux-tab-item.vux-tab-selected {
    color: #3b63c4;
    border-bottom: 3px solid #3b63c4;
  }
  .min-height{
    height: 1.1rem;
  }
  .task_header{
    border-bottom: 1px solid #e5e5e5;
    padding: 0 10%;
    font-family: Microsoft YaHei, 'Avenir', Helvetica, Arial, sans-serif;
    .task_tab{
      width: 80%;
      margin: 0 auto;
    }
    .task_img{
      height: 0.35rem;
      width: 0.39rem;
      position: absolute;
      top: 0.29rem;
      right: 0.4rem;
    }
  }
  .task_list_swarp{
    // margin-top:0.44rem;
    height: 100%;
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
            height: 0.4rem;
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
        height: 100%;
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
    .task_footer{
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
        font-family: SimHei, Microsoft YaHei, 'Avenir', Helvetica, Arial, sans-serif;
        font-weight: 500;
      }
      .task_button{
        width: 90%;
      }
    }
  }
}
</style>
