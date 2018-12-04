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
        <p><span>表单名称:</span>8月15号珍岛4S店开业啦!</p>
        <p><span>客户数量:</span>53</p>
      </li>
    </ul>
    <div class="task_detail_client">
      <p class="client_title">关联客户</p>
      <ul v-for="(item,index) in taskInfo.users" :index="index">
        <li>
          <img :src="item.wx_image">
          <div>
            <p class="send_message">发消息</p>
          </div>
          <div>
            <p>{{ item.wx_name }}</p>
            <p >{{ taskInfo.his_time }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="task_detail_btn">
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
      getTaskDetail(this.id).then(res => {
        if (res.code === 200) {
          this.taskInfo = res.data
          /* AlertModule.show({
              title: '提示',
              content: res.msg
            }) */
          // this.$router.back(-1)
        } else {
          AlertModule.show({
            title: '提示',
            content: res.msg
          })
        }
      })
    }
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
      li{
        padding: 0.36rem 0.32rem;
        height: 1.6rem;
        border-bottom: 1px solid #f3f3f3;
        font-size: 0.33rem;
        font-weight: 500;
        p{
          line-height: 0.5rem;
          font-family: Microsoft YaHei, 'Avenir', Helvetica, Arial, sans-serif;
        }
      }
    }
    .task_detail_client{
      min-height: 2.5rem;
      padding: 0 0.4rem;
      background-color: #fff;
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
          img{
            height: 100%;
            width: 1rem;
            border-radius: 0.1rem;
            float: left;
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
