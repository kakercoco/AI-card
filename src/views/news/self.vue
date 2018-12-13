/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-05 09:18:27
 * @Last Modified by: Jessica
 * @Last Modified time: 2018-10-17 21:02:29
 */
<template>
  <div class="self-news">
    <scroller use-pulldown use-pullup lock-x @on-pulldown-loading="pulldown" @on-pullup-loading="loadMore" :pulldown-config="config" :pullup-config="config" :bounce="true" ref="scrollerBottom">
      <div>
        <p class="card-img">
          <img :src="cardInfor.card_image" class="card">
          <img src="@/assets/img/l.gif" class="loading">
        </p>
        <div class="to_QR_code">
          <router-link to="/qrcode">
            <p class="name">{{$store.state.user.info.card_name}}的名片</p>
            <span>
              <img src="@/assets/icon/QR.png">
              <i>名片二维码</i>
              <x-icon type="ios-arrow-forward" size="17"></x-icon>
            </span>
          </router-link>
        </div>
        
        <!--发布动态-->
        <div class="Release_dynamics">
          <p>今天</p>
          <router-link to="/newsPublish">
            <img src="@/assets/icon/123_03.png" alt="">
          </router-link>
        </div>
        
        
        
        <ul>
          <li v-for="(e, index) in dynamicList" :key="index" @click="newsSelf(e)">
            <span class="time">
              <i>{{Global.parseTime(e.create_time,'{d}')}}</i>
              <b>{{Global.parseTime(e.create_time,'{m}月')}}</b>
            </span>
            <div class="img-wrap">
              <img :src="e.cover[0]" alt="" class="img-one" v-if="e.cover[0]">
            </div>
            <p class="content">{{e.title}}</p>
            <p class="num">共{{e.cover ? e.cover.length : 0 }}张</p>
            <p class="comment">
              <span><img src="@/assets/icon/123_09.png" alt="">{{e.comment.total}}</span>
              <span><img src="@/assets/icon/123_07.png" alt="">{{e.praise.total}}</span>
            </p>
          </li>
        </ul>
        <div class="nodata" v-if="no_data">暂无数据!</div>
      </div>
    </scroller>
  </div>
</template>

<script>
import { Scroller } from 'vux'

import { init_list } from '@/api/dynamic'
import { cardRead } from '@/api/card'
export default {
  name: 'newsSelf',
  components: {
    Scroller
  },
  data () {
    return {
      cardInfor: {},
      config: {
        content: '请上拉刷新数据...',
        pullUpHeight: 60,
        height: 40,
        autoRefresh: false,
        downContent: '请下拉刷新数据...',
        upContent: '请上拉刷新数据...',
        loadingContent: '加载中...'
      },
      pageForm: {
        page: 1,
        pagesize: 10,
        type: 2
      },
      dynamicList: [],
      isFlag: false, // 是否已经关闭下拉
      no_data: false
    }
  },
  methods: {
    getCard () {
      cardRead()
        .then(res => {
          this.cardInfor = res.data
        })
    },
    pulldown () {
      this.pageForm.page = 1
      this.no_data = false
      init_list(this.pageForm)
        .then(res => {
          this.dynamicList = res.data.rows
          this.$refs.scrollerBottom.donePulldown()
          if (this.isFlag) {
            this.$refs.scrollerBottom.enablePullup()
          }
          if (res.data.rows.length == 0) {
            this.$refs.scrollerBottom.disablePullup()
            this.no_data = true
          }
        })
    },
    loadMore () {
      console.log('loadMore...')
      this.pageForm.page += 1
      init_list(this.pageForm)
        .then(res => {
          if (res.data.rows.length === 0) {
            this.$refs.scrollerBottom.disablePullup() // 禁用上拉
            this.isFlag = true
            return false
          } else {
            this.dynamicList = this.dynamicList.concat(res.data.rows)
            this.$refs.scrollerBottom.donePullup()
          }
        })
    },
    getDynamicList () {
      init_list(this.pageForm)
        .then(res => {
          if (res.data && res.data.rows instanceof Array) {
            this.dynamicList = res.data.rows
            if (res.data.rows.length == 0) {
              this.$refs.scrollerBottom.disablePullup()
              this.no_data = true
            }
          }
        })
    },
    gotoDetail () {
      this.$router.push({
        path: '/newsDetail'
      })
    },
    newsSelf (item) {
      this.$router.push({
        path: '/newsDetail',
        query: {
          id: item.id
        }
      })
    }
  },
  mounted () {
    this.getDynamicList()
    this.getCard()
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.self-news{
  .card-img{
    padding: 0.3rem;
    min-height:4.76rem;
    position: relative;
    .card{
      width: 100%;
      box-shadow: 0 0 15px #aaa;
      border-radius: 0.1rem;
    }
    .loading{
      position: absolute;
      width:0.5rem;
      height: 0.5rem;
      left:3.5rem;
      top: 2.1rem;
      z-index: -1;
    }
  }
  li{
    position: relative;
    border-bottom: 1px solid #ddd;
    padding: 0.6rem 0 0.2rem 1.4rem;
    margin: 0 0.3rem;
    overflow: hidden;
    .time{
      position: absolute;
      top:0.6rem;
      left: 0;
      width: 1.2rem;
      height: 0.8rem;

      i{
        font-size: 0.58rem;
        color: #353535;
        font-family: '黑体';
        float: left;
        font-weight: bolder;

      }
      b{
        font-size: 0.24rem;
        color: #353535;
        font-family: 'Arial';
        float: left;
        margin-top: 0.24rem;
        margin-left: 0.05rem;

      }
    }
    .img-wrap{
      float: left;
      width: 1.5rem;
      height: 1.5rem;
      overflow: hidden;
      margin-right: 0.18rem;
      border:1px #f5f5f5 solid;
      .img-one{
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
      .img-list{
        width: 48%;
        margin-right: 1px;
        margin-bottom: 1px;
      }
    }
    .content{
      width: 3.8rem;
      float: left;
      font-size: 0.32rem;
      font-family: '黑体';
      line-height: 0.4rem;
      height: 0.8rem;
      color: #353535;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .comment{
      position: absolute;
      width: 2rem;
      height: 0.3rem;
      clear: both;
      right: 0.08rem;
      bottom:0.23rem;
      span{
        float: right;
        margin-left: 0.2rem;
        font-size: 0.28rem;
        font-family: '黑体';
        color: #999999;
      }
      img{
        width: 0.3rem;
        height: 0.3rem;
        float: left;
        margin-right: 0.1rem;
      }
    }
    .num{
      float: left;
      width: 1rem;
      font-size: 0.28rem;
      font-family: '黑体';
      color: #999999;
      overflow: hidden;
      margin-top: 0.36rem;
    }
  }
  .to_QR_code {
    padding: 0.18rem 0;
    height: 0.76rem;
    border-top:1px #e2e2e2 solid;
    border-bottom:1px #e2e2e2 solid;
    overflow: hidden;
    a{
      display: block;
      width: 100%;
      height: 100%;
    }
    .name{
      float: left;
      margin-left:0.4rem;
      font-size: 0.28rem;
      font-family:'微软雅黑';
      color: #666666;
      line-height: 0.4rem;
    }
    span{
      float: right;
      line-height: 0.4rem;
      height: 0.4rem;
      margin-right:0.4rem;
      img{
        float: left;
        width: 0.3rem;
        height: 0.3rem;
        margin-top: 0.02rem;
      }
      i{
        float: left;
        font-size: 0.24rem;
        font-family:'黑体';
        color: #999999;
        margin-left: 0.08rem;
      }
      svg{
        fill:#999999;
        margin-top: 0.01rem;
        margin-left: 0.03rem;
      }
    }

  }
  .Release_dynamics{
    height: 1.5rem;
    margin-top:0.3rem ;
    p{
      width: 1.7rem;
      float: left;
      text-align: center;
      font-size: 0.58rem;
      font-family:'黑体';
      color: #353535;

    }
    img{
      float: left;
      width: 1.5rem;
      height: 1.5rem;
    }

  }
}
</style>
