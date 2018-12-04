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
            <img v-if="item.star === 0" src="../../assets/task/unmark.png" class="star_icon" @click="signStar(item)">
            <img v-if="item.star === 1" src="../../assets/task/mark.png" class="star_icon" @click="signStar(item)">
            <div class="task_left">
              <p class="task_title"> {{ item.title }}</p>
              <p> {{ item.his_time }}     <span v-if="item.expire === 1">已过期</span></p>
            </div>
            <div class="task_right">
              <p @click="signFinishTask(item)">完成</p>
              <x-icon type="ios-arrow-right" class="icon-right" @click="taskDetail(item)"></x-icon>
            </div>
          </li>
        </ul>
        <div class="completed_task_list">
          <p class="completed_task_title" @click="clickTask">显示已完成任务</p>
          <x-icon type="ios-arrow-down" class="icon-down"></x-icon>
          <ul class="task_list" v-show="isShow">
            <li v-for="(item, index) in completedTask" :key="index">
              <img v-if="item.status === 0" src="../../assets/task/unselected.png" class="star_icon" @click="signFinishTask(item)">
              <img v-if="item.status === 1" src="../../assets/task/selected.png" class="star_icon" @click="signFinishTask(item)">
              <div class="task_left">
                <p class="task_title"> {{ item.title }}</p>
                <p> {{ item.his_time }}</p>
              </div>
              <div class="task_right">
                <!--<p>完成</p>-->
                <x-icon type="ios-arrow-right" class="icon-right" @click="taskDetail(item)"></x-icon>
              </div>
            </li>
          </ul>
        </div>
        <div class="task_footer">
          <x-button type="primary" class="task_button" @click.native="addTask">新建任务</x-button>
        </div>
      </div>
      <div v-show="tabIndex === 1">
        <ul class="task_list">
          <li v-for="(item, index) in overdueTask" :key="index">
            <img v-if="item.star === 0" src="../../assets/task/unmark.png" class="star_icon" @click="signStar(item)">
            <img v-if="item.star === 1" src="../../assets/task/mark.png" class="star_icon" @click="signStar(item)">
            <div class="task_left">
              <p class="task_title"> {{ item.title }}</p>
              <p> {{ item.his_time }}     <span v-if="item.expire === 1">已过期</span></p>
            </div>
            <div class="task_right">
              <p @click="signFinishTask(item)">完成</p>
              <x-icon type="ios-arrow-right" class="icon-right" @click="taskDetail(item)"></x-icon>
            </div>
          </li>
        </ul>
        <div class="completed_task_list">
          <p class="completed_task_title" @click="isShow2 = !isShow2">显示已完成任务</p>
          <x-icon type="ios-arrow-down" class="icon-down"></x-icon>
          <ul class="task_list" v-show="isShow2">
            <li v-for="(item, index) in completedTask" :key="index">
              <img v-if="item.status === 0" src="../../assets/task/unselected.png" class="star_icon" @click="signFinishTask(item)">
              <img v-if="item.status === 1" src="../../assets/task/selected.png" class="star_icon" @click="signFinishTask(item)">
              <div class="task_left">
                <p class="task_title"> {{ item.title }}</p>
                <p> {{ item.his_time }}</p>
              </div>
              <div class="task_right">
                <!--<p>完成</p>-->
                <x-icon type="ios-arrow-right" class="icon-right" @click="taskDetail(item)"></x-icon>
              </div>
            </li>
          </ul>
        </div>
        <div class="task_footer">
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
      tabIndex: 1,
      currentTime: dateFtt('yyyy-MM-dd', new Date()),
      taskLists: [],
      overdueTask: [],
      completedTask: [],
      listQuery: {
        start_time: '',
        end_time: '',
        type: 5

      },
      isShow: false,
      isShow2: false
    }
  },
  methods: {
    clickTask () {
    },
    signFinishTask (item) {
      let status = 0
      let content = ''
      if (item.status === 0) {
        status = 1 // 完成
        content = '此任务确定完成了吗？'
      } else {
        status = 0 // 取消
        content = '此任务确定取消了吗？'
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
  .task_header{
    height: 0.44rem;
    padding: 0 10%;
    font-family: Microsoft YaHei, 'Avenir', Helvetica, Arial, sans-serif;
    .task_tab{
      width: 80%;
      margin: 0 auto;
    }
    .task_img{
      height: 0.43rem;
      width: 0.4rem;
      position: absolute;
      top: 0.22rem;
      right: 0.3rem;
    }
  }
  .task_list_swarp{
    margin-top:0.44rem;
    height: 100%;
    border-top: 1px solid #e5e5e5;
    .task_list{
      padding: 0 0.4rem;
      li{
        height: 1.4rem;
        padding: 0.2rem 0;
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
        top: -0.78rem;
        left: 229px;
        width: 0.3rem;
        fill: #4e70c7;
        display: inline-block;
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
