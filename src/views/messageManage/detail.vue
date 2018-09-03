/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-03 09:28:57
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-03 10:08:22
 */
<template>
  <div class="message-detail">
    <p class="title">
      <img src="@/assets/img/calendar.png" alt="">
      <span>日常</span>
    </p>
    <ul>
      <li>
        <span>日程标题：</span>
        <i>预约签单</i>
      </li>
      <li>
        <span>时间设定：</span>
        <i>08:00</i>
      </li>
      <li class="clearfix">
        <span style="display:block;margin-bottom: 0.3rem">添加客户：</span>
        <p>
          <img src="@/assets/img/u112.png" alt="">
          <span>T-Man</span>
        </p>
      </li>
    </ul>
    <p class="tac btn">
      <button class="btn-cancle">删除</button>
      <button class="btn-primary">编辑</button>
    </p>
  </div>
</template>

<script>
export default {
  name: 'messageDetail',
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.message-detail{
  height: 100%;
  overflow: auto;
  .title{
    height: 1rem;
    line-height: 1rem;
    padding: 0 0.3rem;
    img{
      width: 0.35rem;
      float: left;
      margin-right: 0.2rem;
      margin-top: 0.3rem;
    }
    span{
      font-size: 0.32rem;
    }
  }
  li{
    border-bottom: 1px solid #ccc;
    padding: 0.3rem;
    font-size: 0.32rem;
    &>p{
      height: 1.2rem;
      line-height: 1.2rem;
      float: left;
      margin-left: 0.3rem;
      img{
        height: 1.2rem;
        width: 1.2rem;
        float: left;
      }
      span{
        float: left;
        margin-left: 0.2rem;
      }
    }
  }
  .btn{
    margin-top: 1.4rem;
  }
}
</style>
