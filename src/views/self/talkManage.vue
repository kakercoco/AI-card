/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-06 14:51:27
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-06 16:10:20
 */
<template>
  <div class="talk-manage">
    <h3>选择话术</h3>
    <div>
      <div class="talk-group">
        <a class="active">最近使用</a>
        <a>常用话术</a>
        <a>第一组</a>
        <a>第二组</a>
        <a>第三组</a>
        <a>自定义</a>
      </div>
      <div class="talk-list">
        <p class="tac" @click="gotoInsert">新增话术</p>
        <ul>
          <li v-for="item in 5" :key="item" @click="gotoDetail">
            <p class="title">预约工作</p>
            <p class="content">好好学习，天天向上</p>
            <x-icon type="ios-arrow-right" class="icon-right"></x-icon>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'talkManage',
  data () {
    return {
    }
  },
  methods: {
    gotoInsert () {
      this.$router.push({
        path: '/talkInsert'
      })
    },
    gotoDetail () {
      this.$router.push({
        path: '/talkDetail'
      })
    }
  },
  mounted () {
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.talk-manage{
  height: 100%;
  overflow: hidden;
  h3{
    height: 1rem;
    line-height: 1rem;
    border-bottom: 1px solid #2f80ed;
    text-align: center;
    font-size: 0.36rem;
  }
  &>div{
    height: calc(100% - 1rem);
  }
  .talk-group{
    float: left;
    width: 1.6rem;
    height: 100%;
    overflow: auto;
    padding: 0.2rem;
    border-right: 1px solid #2f80ed;
    a{
      width: 100%;
      display: block;
      height: 0.7rem;
      line-height: 0.7rem;
      text-align: center;
      font-size: 0.28rem;
      color: #2d2d2d;
      &.active{
        text-decoration: underline;
        color: #5977fe;
      }
    }
  }
  .talk-list{
    padding: 0.3rem;
    float: left;
    width: calc(100% - 1.6rem);
    height: 100%;
    overflow: auto;
    &>p{
      color: #5977fe;
      font-size: 0.28rem;
      text-decoration: underline;
    }
    li{
      height: 1.2rem;
      border-bottom: 1px solid #ddd;
      color: #717171;
      padding: 0.2rem 0.3rem;
      position: relative;
      .title{
        font-size: 0.2rem;
        height: 0.35rem;
        overflow: hidden;
      }
      .content{
        font-size: 0.26rem;
        height: 0.35rem;
        overflow: hidden;
      }
      .icon-right{
        position: absolute;
        top: 0.34rem;
        right: 0;
        width: 0.5rem;
        fill: #717171;
      }
    }
  }
}
</style>
