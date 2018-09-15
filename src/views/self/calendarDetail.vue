/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-06 14:08:03
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-15 18:32:40
 */
<template>
  <div class="calendar-detail">
    <ul>
      <li>
        <img src="@/assets/img/calendar.png" alt="" class="icon">
        <span>日常</span>
      </li>
      <li>
        <span class="title">日程标题：</span>
        <span class="contont">预约签单</span>
      </li>
      <li>
        <span class="title">时间设定：</span>
        <span class="contont">08:00</span>
      </li>
      <li>
        <span class="title">关联客户：</span>
        <p class="client-avatar">
          <img src="@/assets/img/u112.png" alt="">
        </p>
      </li>
      <li>
        <span class="title">备注：</span>
        <span class="contont">不能迟到</span>
      </li>
    </ul>
    <p class="btn tac">
      <button class="btn-cancle">删除</button>
      <button class="btn-primary" @click="gotoEdit">编辑</button>
    </p>
  </div>
</template>

<script>
import { calendarRead } from '@/api/calendar'
export default {
  name: 'calendarDetail',
  data () {
    return {
      id: this.$route.query.id
    }
  },
  methods: {
    gotoEdit () {
      this.$router.push({
        path: '/insertCalendar'
      })
    },
    getCalendarRead () {
      const data = {
        id: this.id
      }
      calendarRead(data)
        .then(res => {

        })
    }
  },
  mounted () {
    this.getCalendarRead()
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.calendar-detail{
  overflow: auto;
  height: 100%;
  li{
    padding: 0.3rem;
    border-bottom: 1px solid #ddd;
    font-size: .32rem;
    color: #717171;
    &:last-child{
      border: none;
    }
    .icon{
      width: 0.4rem;
      float: left;
      margin-right: 0.2rem;
    }
    .client-avatar{
      padding-left: 0.2rem;
      img{
        width: 1.2rem;
        height: 1.2rem;
        margin-right: 0.4rem;
        margin-top: 0.4rem;
      }
    }
  }
  .btn{
    margin-top: 2rem;
  }
}
</style>
