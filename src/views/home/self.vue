/*
 * @Author: kaker.xutianxing
 * @Date: 2018-08-28 17:27:30
 * @Last Modified by: Jessica
 * @Last Modified time: 2018-10-17 16:32:21
 */
<template>
  <div class="self">
    <scroller height="100%" lock-x ref="scrollerBottom">
      <div>
        <div class="header-bg">
          <div class="gradient"></div>
          <div class="self-card">
            <div class="frame_top">
              <img :src="cardInfor.image" alt="" @click="gotoCard">
              <div class="infor" @click="gotoCard">
                <p class="name">{{cardInfor.username}}</p>
                <p class="phone">{{cardInfor.job}} {{cardInfor.phone}}</p>
                <p class="address">{{cardInfor.address}}</p>
              </div>
              <x-icon type="ios-arrow-forward" size="20" @click="gotoCard"></x-icon>
            </div>

            <div class="card" @click="gotoQrcode">
              <img src="@/assets/icon/my_03.png" alt="" class="card-icon">
              <span>扫码名片</span>
              <img src="@/assets/icon/my_06.png" alt="" class="code-icon">
            </div>
          </div>
        </div>
        <div>
          <group>
            <cell is-link link="/newsSelf">
              <img src="@/assets/icon/my_11.png" alt="" slot="icon" class="title-icon">
              <span slot="title" class="nav-title">我的动态</span>
            </cell>
            <cell is-link link="/talkManage">
              <img src="@/assets/icon/my_14.png" alt="" slot="icon" class="title-icon">
              <span slot="title" class="nav-title">话术管理</span>
            </cell>
            <cell is-link link="/setting">
              <img src="@/assets/icon/my_16.png" alt="" slot="icon" class="title-icon">
              <span slot="title" class="nav-title">设置</span>
            </cell>
            <!--<cell is-link link="/calendar">
              <img src="@/assets/nav/calendar.png" alt="" slot="icon" class="title-icon">
              <span slot="title" class="nav-title">销售日历</span>
            </cell>-->
            <!--<cell is-link link="/reportChart">
              <img src="@/assets/nav/report.png" alt="" slot="icon" class="title-icon">
              <span slot="title" class="nav-title">我的报表</span>
            </cell>-->

            <!-- <p style="margin-top: 0.5rem"></p> -->

            <!-- <cell is-link>
              <img src="@/assets/nav/step.png" alt="" slot="icon" class="title-icon">
              <span slot="title" class="nav-title">使用教程</span>
            </cell> -->
          </group>
        </div>
      </div>

    </scroller>
  </div>
</template>

<script>
import { Group, Cell,Scroller } from 'vux'
import { cardRead } from '@/api/card'

export default {
  name: 'self',
  components: {
    Group,
    Cell,
      Scroller
  },
  data () {
    return {
      cardInfor: {}
    }
  },
  methods: {
    getCard () {
      cardRead().then(res => {
        this.cardInfor = res.data
        if (this.cardInfor.image === '') {
          this.cardInfor.image = require('@/assets/card/comm.jpg')
        }
      })
    },
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
    this.getCard()
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.self {
  .gradient{
    background: -webkit-gradient(linear, left top, left bottom, from(#4183ff), to(#fff));
    background: linear-gradient(#4183ff, #fff);
    height: 3rem;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index:1;
  }
  height: 100%;
  overflow: auto;
  background: #f8f8f8;
  -webkit-overflow-scrolling: touch;
  .header-bg {
     background: #fff;
    position: relative;
    padding: 0.5rem 0;
  }
  .self-card {
    width: 6.7rem;
    margin: 0 auto;
    background: #fff;
    border-radius: 0.25rem;
    box-shadow: 2px 2px 15px 2px #ccc;
    position: relative;
    z-index: 2;
    .frame_top{
      position: relative;
      padding: 0.3rem;
      & > img {
        float: left;
        width: 1.4rem;
        height: 1.4rem;
        border-radius: 0.1rem;
        margin-bottom: 0.3rem;
      }
      .infor {
        float: left;
        width: calc(100% - 1.7rem);
        margin-left: 0.2rem;
        overflow: hidden;
        .name{
          font-size: 0.33rem;
          font-family: '黑体';
          color: #353535;
          margin-bottom: 0.2rem;
        }
        .phone{
          font-size: 0.28rem;
          font-family: '黑体';
          color: #999999;
          margin-bottom: 0.1rem;
        }
        .address{
          font-size: 0.28rem;
          font-family: '黑体';
          color: #999999;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          width: 4rem;
        }
      }
      svg{
        fill:#999999;
        position: absolute;
        right: 0.2rem;
        top:0.9rem;

      }
    }

    .card {
      border-top: 1px solid #e2e2e2;
      line-height: 0.3rem;
      padding: 0.28rem;
      clear: both;
      .card-icon {
        float: left;
        width: 0.43rem;
        margin-right: 0.2rem;
      }
      span {
        color: #666666;
        font-size: 0.28rem;
        font-family: '黑体';
        line-height: 0.3rem;
      }
      .code-icon {
        float: right;
        width: 0.28rem;
      }
    }
  }
  .title-icon {
    width: 0.55rem;
    float: left;
    margin-right: 0.4rem;
  }
  .nav-title {
    font-size: 0.33rem;
    color: #353535;
    font-family: '黑体';
    font-weight: normal;
  }
  & /deep/ .weui-cells {
    margin-top: 0;
    &::before {
      border: none;
    }
    .weui-cell__ft {
      &::after {
        width: 0.2rem;
        height: 0.2rem;
      }
    }
  }
}
</style>
