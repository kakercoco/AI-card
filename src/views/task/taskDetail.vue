/*
* @Author: zhangmengli
* @Date: 2018-11-23 16:00:16
* @Last Modified by: zhangmengli
* @Last Modified time: 2018-11-23 16:00:16
*/
<template>
  <div class="task_detail">
    <ul class="task_form">
      <li>
        <p>任务标题</p>
      </li>
      <li>
        <p>{{ taskInfo.title }}</p>
      </li>
      <li>
        <p>任务时间</p>
      </li>
      <li>
        <p>{{Global.parseTime(taskInfo.his_time, '{y}-{m}-{d} {h}:{i}')}}</p>
      </li>
      <li>
        <p>备注</p>
      </li>
      <li style="height: auto;padding-bottom: 0.3rem;">
        <p>{{ taskInfo.reference }}</p>
      </li>
    </ul>
    <div class="task_detail_client">
      <p class="client_title">关联客户</p>
      <ul v-for="(item,index) in taskInfo.users" :index="index">
        <li>
          <div class="client_image">
            <img :src="item.wx_image !== '' && item.wx_image !== undefined ? item.wx_image: '../../assets/img/u112.png'">
          </div>
          <div>
            <p class="send_message" @click="gotoIM(item)">发消息</p>
          </div>
          <div>
            <p>{{ item.re_name ? item.re_name : item.wx_name }}</p>
            <p><span style="padding-right: 0.1rem">最近活跃</span>{{ item.visit_time }} </p>
          </div>
        </li>
      </ul>
    </div>
    <div style="height: 1.5rem;"></div>
    <div class="yyf_new_btn task_detail_btn" style="border-top: 1px #e3e3e3 solid">
      <p @click="deleteTask">删除</p>
      <p @click="editTask">编辑</p>
    </div>
  </div>
</template>

<script>
import {
  XButton,
  Search,
  AlertModule
} from 'vux'
import { getTaskDetail, deleteTask } from '@/api/task'
import { formatatTime } from '@/utils/base'

export default {
  name: 'taskDetail',
  components: {
    XButton,
    Search,
    AlertModule
  },
  data () {
    return {
      taskInfo: {},
      id: this.$route.query.id
    }
  },
  methods: {
    deleteTask () {
      let this_ = this
      this.$vux.confirm.show({
        title: '提示',
        content: '确定要删除吗？',
        onCancel () { // 取消
        },
        onConfirm () { // 确定
          let data = {
            id: this_.id
          }
          if (data.id !== '' && data.id !== undefined) {
            deleteTask(data).then(res => {
              if (res.code === 200) {
                this_.$router.back(-1)
              } else {
                AlertModule.show({
                  title: '提示',
                  content: res.msg
                })
              }
            })
          } else {
            AlertModule.show({
              title: '提示',
              content: '删除异常！'
            })
          }
        }
      })
    },
    editTask () {
      this.$router.push({
        path: '/addTask',
        query: {
          id: this.id
        }
      })
    },
    getTaskInfo () {
      this.$vux.loading.show({
        text: 'Loading'
      })
      getTaskDetail(this.id).then(res => {
        if (res.code === 200) {
          this.$vux.loading.hide()// 隐藏
          if (res.data.users) {
            res.data.users.forEach(item => {
              if (item.visit_time === '0') {
                item.visit_time = '刚刚'
              } else {
                item.visit_time = formatatTime(item.visit_time, '{y}-{m}-{d} {h}:{i}:{s}')
              }
            })
          }
          this.taskInfo = res.data
          // this.$router.back(-1)
        } else {
          AlertModule.show({
            title: '提示',
            content: res.msg
          })
        }
      })
    },
      gotoIM (item) {
          const message_id = item.message_id
          const wx_image = item.wx_image
          const wx_name = item.wx_name
          const uid = item.uid
          // 进入新的回话前，先清除老的
          this.$store.commit('chat/Clear_char_list')
          this.$store.commit('chat/Clear_img_list')

          if (message_id) {
              this.$store.dispatch('chat/GetChat', message_id)
              this.$store.dispatch('chat/chat_record', {
                  id: message_id,
                  vm: this
              })

              this.$router.push({
                  path: `/messageIM`,
                  query: {
                      id: message_id,
                      wx_image,
                      wx_name,
                      uid
                  }
              })
          } else {
              this.$vux.alert.show({
                  title: '提示',
                  content: '缺少message_id！'
              })
          }
    },
  },
  watch: {
  },
  mounted () {
    this.getTaskInfo()
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
  .task_detail {
    background-color: #f8f8f8;
    height: 100%;
    overflow: auto;
    position: relative;
    -webkit-overflow-scrolling: touch;
    .task_form{
      background-color: #fff;
      font-family: SimHei, Microsoft YaHei, 'Avenir', Helvetica, Arial, sans-serif;
      li:nth-child(2n){
        padding: 0 0.4rem 0 0.4rem;
        height: 0.8rem;
        border-bottom: 1px solid #f3f3f3;
        font-size: 0.33rem;
        font-weight: 500;
      }
      li:nth-child(2n+1){
        padding: 0 0.4rem 0 0.4rem;
        height: 0.8rem;
        line-height: 0.8rem;
        font-size: 0.3rem;
        color: #b0b0b0;
      }
    }
    .task_detail_client{
      min-height: 2.5rem;
      padding: 0 0.4rem;
      background-color: #fff;
      font-family: SimHei, Microsoft YaHei, 'Avenir', Helvetica, Arial, sans-serif;
      .client_title{
        height: 0.8rem;
        line-height: 0.8rem;
        font-size: 0.3rem;
        color: #b0b0b0;
      }
      ul{
        li{
          padding: 0.2rem 0;
          border-bottom: 1px solid #f0f0f0;
          .client_image{
            border: 1px solid #f3f3f3;
            border-radius: 0.1rem;
            img{
              height: 1rem;
              width: 1rem;
              border-radius: 0.1rem;
              float: left;
            }
          }
          div{
            height: 100%;
            margin-left: 0.2rem;
            line-height: 0.5rem;
            overflow: hidden;
            p{
              color: #717171;
              padding-left: 0.24rem;
            }
            p:first-child{
              font-size: 0.3rem;
              min-height: 0.5rem;
            }
          }
          div:nth-child(1){
            float: left;
          }
          div:nth-child(2){
            float: right;
          }
          .send_message{
            width: 1.34rem;
            height: 0.6rem;
            border-radius: 0.1rem;
            line-height: 0.6rem;
            background-color: #5b96fe;
            color: #fff;
            font-size: 0.24rem;
          }
        }
      }
    }
    .task_detail_btn{
      height: 1.8rem;
      padding:0.3rem;
      display: flex;
      justify-content: space-between;
      font-family: SimHei, Microsoft YaHei, 'Avenir', Helvetica, Arial, sans-serif;
      p{
        display: inline-block;
        width: 3.32rem;
        height: 0.88rem;
        border-radius: 0.1rem;
        border: 1px solid #e3e3e3;
        font-size: 0.33rem;
        line-height: 0.88rem;
        text-align: center;
      }
      p:nth-child(2){
        color: #fff;
        background-color: #3c7df0;
      }
    }
  }
</style>
