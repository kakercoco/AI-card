<template>
  <div class="rank-index">
    <div class="card-img-frame">
      <img src="@/assets/img/l.gif" class="my_loading">
      <div class="card-img">
        <img :src="backgroundImag" v-if="backgroundImag !==''">
        <img src="~@/assets/img/r_banner.png" v-if="backgroundImag ===''">
      </div>
    </div>
    <scroller
      height="-60"
      lock-x
      :use-pullup="true"
      :pullup-config="pullup_config"
      @on-pullup-loading="timeLoadMore"
      ref="scrollerBottom"
    style="z-index: 12">
      <div class="rank-content">
        <div class="banner">
        </div>
        <div class="content2 clearfix" @click="clickRank(myRank)">
          <div class="content-left">
            <img :src="myRank.image !== undefined && myRank.image !== '' ? myRank.image : '~@/assets/img/u112.png'" class="client-img">
          </div>
          <div class="content-right clearfix">
            <div class="fl">
              <p class="client-title"> {{ myRank.username }} </p>
              <!--<img src="~@/assets/img/my-icon.png" class="my-icon">-->
              <p class="client-position">第{{myRank.rank !== undefined && myRank.rank !== null ? myRank.rank : 0 }}名</p>
            </div>
            <div class="fr">
              <p class="client-num2"> {{myRank.customercount !== undefined && myRank.customercount !== null ? myRank.customercount : 0}} </p>
              <p class="client-num-title">当日客户数</p>
            </div>
          </div>
        </div>
        <div class="form-data-content">
          <ul class="content">
            <li class="clearfix" v-for="(item, index) in rankListData" :index="index" @click="clickRank(item)">
              <p class="content-left-num">{{index+1}}</p>
              <div class="content-left">
                <img :src="item.image !== undefined && item.image !== '' ? item.image : '~@/assets/img/u112.png'" class="client-img">
              </div>
              <div class="content-right clearfix">
                <div class="fl">
                  <p class="client-title"> {{ item.username }}</p>
                  <!--<img src="~@/assets/img/my-icon.png" class="my-icon" v-if="index === 0">-->
                  <p class="client-position">{{item.job}}</p>
                </div>
                <div class="fr">
                  <p class="client-num" :style="index ===0 || index === 1 || index === 2 ? 'color:#ff8814': '#3c7df0'"> {{item.customercount !== undefined && item.customercount !== null ? item.customercount : 0}} </p>
                </div>
              </div>
            </li>
          </ul>
          <div class="nodata" v-if="no_data">暂无数据!</div>
        </div>
      </div>
    </scroller>
    <div class="mask" v-if="show" @click="show = !show">
      <div class="dialog">
        <div class="tilte">排行榜说明</div>
        <div class="content">
          <p>1.当日客户数是指当日名片小程序的访客数</p>
          <!--<p>2.被boss点赞会展示专属勋章</p>-->
          <p>2.排行榜按照当日客户数进行排名，第一名可以占领排行榜封面</p>
        </div>
        <div class="dialog-footer">确定</div>
      </div>
    </div>
    <p class="footer">
      <span class="history-rank" @click="openHistoryRank">历史排行榜</span>
      <span class="rule-desc" @click="openRuleDesc">规则说明</span>
    </p>
  </div>
</template>

<script>
import { XSwitch, PopupHeader, Popup, TransferDom, Group, AlertModule, Scroller } from 'vux'
import { getRankList } from '@/api/rank'
export default {
  name: 'salesRanking',
  directives: {
    TransferDom
  },
  components: {
    Group,
    PopupHeader,
    Popup,
    XSwitch,
    AlertModule,
    Scroller
  },
  data () {
    return {
      backgroundImag: '',
      pullup_config: {
        content: '加载中...',
        pullUpHeight: 60,
        height: 40,
        autoRefresh: false,
        downContent: '加载中...',
        upContent: '加载中...',
        loadingContent: '加载中...'
      },
      timeScroller: {
        page: 1,
        pagesize: 10,
        max_page: 0,
        isAjax: true,
        total: 0,
        test: true
      },
      pgNo: 1,
      pgSize: 5,
      total: 0,
      show: false,
      myRank: {},
      rankListData: [],
      no_data: false

    }
  },
  methods: {
    clickRank (item) {
      this.$router.push({
        path: '/diagram',
        query: {
          eid: item.eid
        }
      })
    },
    timeLoadMore () {
      if (this.timeScroller.isAjax && this.timeScroller.page < this.timeScroller.max_page) {
        this.timeScroller.page++
        this.rankList(false)
      } else if (this.timeScroller.page >= this.timeScroller.max_page) {
        this.$refs.scrollerBottom.disablePullup() // 禁用上拉
      }
    },
    rankList (isTop) {
      this.$store.commit('app/open_global_dialog')
      let data = {
        day: '',
        page: this.timeScroller.page,
        pagesize: this.timeScroller.pagesize
      }
      getRankList(data).then(res => {
        this.$store.commit('app/close_global_dialog')
        if (res.code === 200) {
          if (res.data.covers) {
            this.backgroundImag = res.data.covers
          } else {
            this.backgroundImag = ''
          }
          if (res.data.my) {
            this.myRank = res.data.my
          }
          let list = res.data.rows
          if (res.data.total === 0) {
            this.no_data = true
          } else {
            this.rankListData = this.rankListData.concat(list)
            this.timeScroller.total = res.data.total
            this.timeScroller.max_page = Math.ceil(res.data.total / 10)
          }
        } else {
          this.no_data = true
          this.$refs.scrollerBottom.disablePullup()
        }
        this.$nextTick(() => {
          this.$refs.scrollerBottom.donePullup()// 上拉完成
          if (isTop) {
            this.$refs.scrollerBottom.reset({top: 0})
          } else {
            this.$refs.scrollerBottom.reset()
          }
          if (this.timeScroller.max_page <= 1 || this.rankListData.length === 0) {
            this.$refs.scrollerBottom.disablePullup()// 禁止上拉
          } else {
            this.$refs.scrollerBottom.enablePullup()// 恢复上拉
          }
        })
      }).catch((e) => {
        this.$store.commit('app/close_global_dialog')
      })
    },
    openRuleDesc () {
      this.show = true
    },
    openHistoryRank () {
      this.$router.push({
        path: '/historyRank',
        query: {
          backgroundImag: this.backgroundImag
        }
      })
    }
  },
  watch: {
  },
  created () {
  },
  mounted () {
    this.rankList()
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.rank-index{
  -webkit-overflow-scrolling: touch;
  background-color: #c9c9c9;
  .card-img-frame{
    padding: 0.3rem;
    position: absolute;
    min-height:4.76rem;
    width: 100%;
    .my_loading{
      position: absolute;
      width: 0.5rem;
      height: 0.5rem;
      left: 3.5rem;
      z-index: 10;
      top: 2.13rem;
    }
    .card-img{
      border-radius: 0.1rem;
      overflow: hidden;
      position: relative;
      height: 4.16rem;
      -webkit-box-shadow: 0px 0px 0.5rem #e0dada;
      box-shadow: 0px 0px 0.5rem #e0dada;
      z-index:11;
      img{
        width: 100%;
        height: 4.16rem;
        position: relative;
        top: 0;
        left: 0;
      }
    }
  }
  background:url('~@/assets/img/back_img.png') repeat;
  // background:url('~@/assets/img/r_banner.png') no-repeat center 0;
  // background-size: contain;
  .rank-content{
    width: 100%;
    .banner{
      height: 4.7rem;
      opacity: 0.01;
      // opacity: 0.01
    }
    .content2{
      height: 1.5rem;
      background-color: #fff;
      padding-right: 0.4rem;
      padding-left: 0.4rem;
      .client-num-title{
        color: #999999;
        font-size: 0.24rem;
        line-height: 0.5rem;
        position: relative;
        top: -1rem;
      }
      .content-left-num{
        float: left;
        display: inline-block;
        width: 6%;
        height: 0.8rem;
        line-height: 0.8rem;
        padding-top: 0.1rem;
      }
      .content-left{
        padding-top: 0.4rem;
        height: 1.5rem;
        float: left;
        display: inline-block;
        width: 14%;
        .client-img{
          width: 0.85rem;
          height: 0.85rem;
          border-radius: 50%;
          border: 1px solid #fbf9fe;
          position: relative;
          top: -0.1rem;
        }
      }
      .content-right{
        padding-top: 0.3rem;
        height: 1.5rem;
        width: 79%;
        float: right;
        display: inline-block;
        .my-icon{
          width: 0.25rem;
          height: 0.38rem;
          display: inline-block;
          position: absolute;
          top: 5.4rem;
          left: 2.8rem;
        }
        .client-tilte{
          font-size: 0.33rem;
          line-height: 0.5rem;
          color: #353535;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          padding-top: 0.02rem;
        }
        .client-position {
          font-size: 0.3rem;
          line-height: 0.5rem;
          color: #999999;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          padding-top: 0.02rem;
        }
        .client-num2{
          color: #3c7df0;
          font-size: 0.6rem;
          line-height: 1.33rem;
          text-align: right;
          padding-top: 0.2rem;
          position: relative;
          top: -0.6rem;
        }
      }
      border-bottom: 0.1rem solid #f8f8f8;
    }
    .form-data-content{
      -webkit-overflow-scrolling: touch;
      .nodata{
        text-align: center;
        font-family: '黑体',serif;
        font-size: 0.3rem;
        color: #999;
        background-color: #fff;
      }
      .content{
        font-family: '黑体',serif;
        font-size: 0.36rem;
        color: #353535;
        border-bottom: none;
        li{
          background-color: #fff;
          height: 1.5rem;
          // margin: 0.5rem 0 0 0;
          padding-top: 0.3rem;
          border-bottom: 1px solid #e5e5e5;
          padding-left: 0.4rem;
          padding-right: 0.4rem;
          .content-left-num{
            float: left;
            display: inline-block;
            width: 6%;
            height: 0.8rem;
            line-height: 0.8rem;
            padding-top: 0.1rem;
          }
          .content-left{
            float: left;
            display: inline-block;
            width: 14%;
            padding-top: 0.1rem;
            .client-img{
              width: 0.85rem;
              height: 0.85rem;
              border-radius: 50%;
              border: 1px solid #fbf9fe;
            }
          }
          .content-right{
            width: 79%;
            float: right;
            display: inline-block;
            .client-tilte{
              font-size: 0.33rem;
              line-height: 0.5rem;
              color: #353535;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              padding-top: 0.02rem;
            }
            .client-position {
              font-size: 0.3rem;
              line-height: 0.5rem;
              color: #999999;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              padding-top: 0.02rem;
            }
            .client-num{
              color: #3c7df0;
              font-size: 0.6rem;
              line-height: 1.33rem;
              text-align: right;
              position: relative;
              top: -0.2rem;
            }
          }
        }
      }
    }
  }
  .footer{
    position: fixed;
    z-index: 10;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 0.1rem 0 0.1rem 0.4rem;
    background: #fff;
    font-family: '黑体',serif;
    .history-rank{
      padding-top: 0.2rem;
      display: inline-block;
      font-size: 0.33rem;
      line-height: 0.5rem;
      color: #ffffff;
      background-color: #3c7df0;
      width: 5.2rem;
      height: 0.88rem;
      text-align: center;
      border-radius: 0.1rem;
    }
    .rule-desc{
      width: 1.5rem;
      display: inline-block;
      padding-top: 0.2rem;
      font-size: 0.28rem;
      line-height: 0.5rem;
      color: #3c7df0;
      height: 0.87rem;
      text-align: center;
    }
  }
  .mask{
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    .dialog{
      position: fixed;
      display: table;
      z-index: 5000;
      width: 100%;
      max-width: 300px;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      background-color: #efefef;
      text-align: center;
      overflow: hidden;
      font-family: '黑体',serif;
      height: 3.8rem;
      border-radius: 0.2rem;
      .tilte{
        font-size: 0.33rem;
        color: #353535;
        text-align: center;
        height: 1.05rem;
        line-height: 1.05rem;
      }
      .content{
        padding:0.15rem 0.3rem;
        font-size: 0.28rem;
        line-height: 0.42rem;
        color: #666666;
        text-align: left;
        height: 1.8rem;
        border-bottom: 1px solid #dfdfdf;
      }
      .dialog-footer{
        height: 0.88rem;
        text-align: center;
        line-height: 0.88rem;
        font-size: 0.33rem;
        color: #3c7df0;
      }
    }
  }
}
</style>
