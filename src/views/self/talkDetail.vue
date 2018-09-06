/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-06 16:09:14
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-06 16:18:16
 */
<template>
  <div class="talk-detail">
    <div class="clearfix">
      <p>关键词</p>
      <span class="tag">预约工作</span>
    </div>
    <div>
      <p>编辑话术</p>
      <p>努力学习，善待自己，诚心待人</p>
    </div>
    <p class="btn tac">
      <button class="btn-cancle">删除</button>
      <button class="btn-primary" @click="gotoEdit">编辑</button>
    </p>
  </div>
</template>

<script>
export default {
  name: 'talkDetail',
  data () {
    return {
    }
  },
  methods: {
    gotoEdit () {
      this.$router.push({
        path: '/talkInsert'
      })
    }
  },
  mounted () {
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.talk-detail{
  overflow: auto;
  height: 100%;
  &>div{
    border-bottom: 1px solid #ddd;
    padding: 0.3rem;
    .tag{
      font-size: 0.28rem;
      float: left;
      margin-left: 0.5rem;
      position: relative;
      height: 0.6rem;
      border-radius: 0.6rem;
      border: 1px solid #ddd;
      padding: 0 0.2rem;
      line-height: 0.55rem;
      color: #717171;
    }
    p{
      color: #717171;
      &:first-child{
        font-size: 0.32rem;
        margin-bottom: 0.3rem;
      }
      &:last-child{
        font-size: 0.28rem;
      }
    }
  }
  .btn{
    margin-top: 1rem;
  }
}
</style>
