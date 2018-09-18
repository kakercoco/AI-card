/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-05 09:18:27
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-18 16:20:21
 */
<template>
  <div class="self-news">
    <scroller use-pulldown use-pullup lock-x @on-pulldown-loading="pulldown" @on-pullup-loading="loadMore" :pulldown-config="config" :pullup-config="config" :bounce="true" ref="scrollerBottom">
      <div>
        <ul>
          <li v-for="(e, index) in dynamicList" :key="index" @click="gotoDetail">
            <span class="time">{{Global.parseTime(e.create_time,'{h}:{i}')}}</span>
            <div class="img-wrap">
              <img :src="e.user_image" alt="" v-for="item in e.cover" :key="item" :class="{'img-one':e.cover.length ===1,'img-list':e.cover.length>1}">
            </div>
            <p class="content">{{e.title}}</p>
            <p class="comment">
              <span><img src="@/assets/img/comment02.png" alt="">{{e.comment.total}}</span>
              <span><img src="@/assets/img/heart-black.png" alt="">{{e.praise.total}}</span>
            </p>
          </li>
        </ul>
      </div>
    </scroller>
  </div>
</template>

<script>
import { Scroller } from 'vux'

import { init_list } from '@/api/dynamic'
export default {
  name: 'newsSelf',
  components: {
    Scroller
  },
  data () {
    return {
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
      isFlag: false // 是否已经关闭下拉
    }
  },
  methods: {
    pulldown () {
      this.pageForm.page = 1
      init_list(this.pageForm)
        .then(res => {
          this.dynamicList = res.data.rows
          this.$refs.scrollerBottom.donePulldown()
          if (this.isFlag) {
            this.$refs.scrollerBottom.enablePullup()
          }
        })
    },
    loadMore () {
      console.log('loadMore...')
      this.pageForm.page +=1
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
          this.dynamicList = res.data.rows
        })
    },
    gotoDetail () {
      this.$router.push({
        path: '/newsDetail'
      })
    }
  },
  mounted () {
    this.getDynamicList()
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.self-news{
  li{
    position: relative;
    border-bottom: 1px solid #ddd;
    padding: 0.6rem 0 0.2rem 1.2rem;
    margin: 0 0.3rem;
    .time{
      position: absolute;
      top:0.6rem;
      left: 0;
      width: 1rem;
      font-size: 0.34rem;
      color: #717171;
    }
    .img-wrap{
      float: left;
      width: 1.5rem;
      height: 1.5rem;
      overflow: hidden;
      margin-right: 0.2rem;
      .img-one{
        width: 100%;
      }
      .img-list{
        width: 48%;
        margin-right: 1px;
        margin-bottom: 1px;
      }
    }
    .content{
      width: 4rem;
      float: left;
      color: #717171;
    }
    .comment{
      height: 0.5rem;
      clear: both;
      padding-top: 0.2rem;
      span{
        float: right;
        margin-left: 0.2rem;
      }
      img{
        width: 0.4rem;
        float: left;
        margin-right: 0.2rem;
      }
    }
  }
}
</style>
