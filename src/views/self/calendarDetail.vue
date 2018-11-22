/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-06 14:08:03
 * @Last Modified by: Jessica
 * @Last Modified time: 2018-10-31 16:51:44
 */
<template>
  <div class="calendar-detail">
    <ul>
      <li>
        <img src="@/assets/img/calendar1.png" alt="" class="icon" v-if="infor.type === 0">
        <img src="@/assets/img/calendar2.png" alt="" class="icon" v-if="infor.type === 1">
        <img src="@/assets/img/calendar3.png" alt="" class="icon" v-if="infor.type === 2">
        <img src="@/assets/img/calendar4.png" alt="" class="icon" v-if="infor.type === 3">
        <img src="@/assets/img/calendar5.png" alt="" class="icon" v-if="infor.type === 4">
        <span v-if="infor.type === 0">日常</span>
        <span v-if="infor.type === 1">预约</span>
        <span v-if="infor.type === 2">会议</span>
        <span v-if="infor.type === 3">拜访</span>
        <span v-if="infor.type === 4">生日</span>
      </li>
      <li>
        <span class="title">日程标题：</span>
        <span class="contont">{{infor.title}}</span>
      </li>
      <li>
        <span class="title">时间设定：</span>
        <span class="contont">{{infor.his_time}}</span>
      </li>
      <li>
        <span class="title">关联客户：</span>
        <p class="client-avatar">
          <img :src="item.wx_image" alt="" v-for="(item, index) in infor.add_user_img" :key="index">
        </p>
      </li>
      <li>
        <span class="title">备注：</span>
        <span class="contont">{{infor.reference}}</span>
      </li>
    </ul>
    <p class="btn tac">
      <button class="btn-cancle" @click="deleteCalendar">删除</button>
      <button class="btn-primary" @click="gotoEdit">编辑</button>
    </p>
  </div>
</template>

<script>
import { calendarRead, calendarDelete } from '@/api/calendar'
export default {
  name: 'calendarDetail',
  data () {
    return {
      id: this.$route.query.id,
      date: this.$route.query.date,
      infor: {}
    }
  },
  methods: {
    gotoEdit () {
      this.$router.push({
        path: '/updateCalendar',
        query: {
          id: this.id
        }
      })
    },
    getCalendarRead () {
      const data = {
        id: this.id
      }
      calendarRead(data).then(res => {
        this.infor = res.data
      })
    },
    deleteCalendar () {
      const data = {
        id: this.id
      }
      calendarDelete(data).then(res => {
        this.$router.back(-1)
        // this.$router.replace({
        //   path: '/calendar',
        //   query: {
        //     choseTime: this.date
        //   }
        // })
      })
    }
  },
  mounted () {
    this.getCalendarRead()
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.calendar-detail {
  overflow: auto;
  height: 100%;
  li {
    padding: 0.3rem;
    border-bottom: 1px solid #ddd;
    font-size: 0.32rem;
    color: #717171;
    &:last-child {
      border: none;
    }
    .icon {
      width: 0.4rem;
      float: left;
      margin-right: 0.2rem;
    }
    .client-avatar {
      padding-left: 0.2rem;
      img {
        width: 1.2rem;
        height: 1.2rem;
        margin-right: 0.4rem;
        margin-top: 0.4rem;
        border-radius: 0.1rem;
      }
    }
  }
  .btn {
    margin-top: 2rem;
  }
}
</style>
