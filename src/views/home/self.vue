/*
 * @Author: kaker.xutianxing
 * @Date: 2018-08-28 17:27:30
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-14 14:30:03
 */
<template>
  <div class="self">
    <div class="header-bg">
      <div class="self-card" >
        <img src="@/assets/img/u112.png" alt="" @click="gotoCard">
        <div class="infor" @click="gotoCard">
          <p>Top Man</p>
          <p>销售总监 158xxxxxxxx</p>
          <p>上海珍岛集团虹口区xx号</p>
        </div>
        <div class="card" @click="gotoQrcode">
          <img src="@/assets/img/card2.png" alt="" class="card-icon">
          <span>扫码名片</span>
          <img src="@/assets/img/code.png" alt="" class="code-icon">
        </div>
      </div>
    </div>
    <div>
      <group>
        <cell is-link link="/newsSelf">
          <img src="@/assets/nav/news.png" alt="" slot="icon" class="title-icon">
          <span slot="title" class="nav-title">我的动态</span>
        </cell>
        <cell is-link link="/calendar">
          <img src="@/assets/nav/calendar.png" alt="" slot="icon" class="title-icon">
          <span slot="title" class="nav-title">销售日历</span>
        </cell>
        <cell is-link link="/reportChart">
          <img src="@/assets/nav/report.png" alt="" slot="icon" class="title-icon">
          <span slot="title" class="nav-title">我的报表</span>
        </cell>
        <cell is-link link="/talkManage">
          <img src="@/assets/nav/manage.png" alt="" slot="icon" class="title-icon">
          <span slot="title" class="nav-title">话术管理</span>
        </cell>
      </group>
      <p style="margin-top: 0.5rem"></p>
      <group>
        <cell is-link>
          <img src="@/assets/nav/step.png" alt="" slot="icon" class="title-icon">
          <span slot="title" class="nav-title">使用教程</span>
        </cell>
        <cell is-link link="/setting">
          <img src="@/assets/nav/setting.png" alt="" slot="icon" class="title-icon">
          <span slot="title" class="nav-title">设置</span>
        </cell>
      </group>
    </div>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'

export default {
  name: 'self',
  components: {
    Group,
    Cell
  },
  data () {
    return {
    }
  },
  methods: {
    gotoCard () {
      this.$router.push({
        path: '/selfCard'
      })
    },
    gotoQrcode () {
      this.$router.push({
        path: '/qrcode'
      })
    }
  },
  mounted () {
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.self{
  height: 100%;
  overflow: auto;
  .header-bg{
    background: url('~@/assets/img/tabbar.png') no-repeat top;
    background-size: contain;
    position: relative;
    padding: 0.5rem 0;
  }
  .self-card{
    padding: 0.4rem;
    width: 6.5rem;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 0.1rem;
    box-shadow: 0 0 2px #aaa;
    &>img{
      float: left;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: .1rem;
      margin-bottom: 0.3rem;
    }
    .infor{
      float: left;
      width: calc(100% - 1.7rem);
      margin-left: 0.2rem;
      p{
        font-size: 0.28rem;
        color: #717171;
        &:first-child{
          font-size: 0.34rem;
          margin-bottom: 0.2rem;
        }
      }
    }
    .card{
      border-top: 1px solid #ddd;
      height: 0.9rem;
      line-height: 0.65rem;
      padding-top: 0.25rem;
      clear: both;
      .card-icon{
        float: left;
        width: 0.85rem;
        margin-right: 0.2rem;
      }
      span{
        color: #717171;
        font-size: 0.32rem;
      }
      .code-icon{
        float: right;
        width: 0.35rem;
        margin-top: 0.15rem;
      }
    }
  }
  .title-icon{
    width: 0.55rem;
    float: left;
    margin-right: 0.4rem;
  }
  .nav-title{
    font-size: 0.32rem;
    color: #717171;
    font-weight: normal;
  }
  & /deep/ .weui-cells{
    margin-top: 0;
    &::before{
      border: none;
    }
    .weui-cell__ft{
      &::after{
        width: 0.2rem;
        height: 0.2rem;
      }
    }
  }
}
</style>
