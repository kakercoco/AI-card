/*
 * @Author: kaker.xutianxing
 * @Date: 2018-08-27 18:30:51
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-08-30 09:38:31
 */
<template>
  <div class="index">
    <tab :line-width="2" v-model="tabIndex">
      <tab-item @on-item-click="onItemClick">时间</tab-item>
      <tab-item @on-item-click="onItemClick">行为</tab-item>
      <tab-item @on-item-click="onItemClick">互动</tab-item>
    </tab>
    <div v-if="tabIndex === 0">
      <p class="tac time">●&nbsp;&nbsp; 2018/08/05  15:50</p>
      <ul class="logs-list">
        <li v-for="(item, index) in 8" :key="index">
          <img src="@/assets/img/u112.png" alt="">
          <div>
            T-cloud Man <i>拨打</i>了你的<i>手机号码</i>，要保持电话畅通。
          </div>
          <span>15:59</span>
        </li>
      </ul>
    </div>
    <div v-else-if="tabIndex === 1" class="tab-action">
      <div class="action-card card-shadow clearfix">
        <p class=" tac">
          <img src="@/assets/img/datapicker.png" class="fr" alt="">
          7日内被查看的行为统计
        </p>
        <ul>
          <li>
            <img src="@/assets/img/card.png" alt="">
            <a href="">20次</a>
            <h5>查看名片</h5>
          </li>
          <li>
            <img src="@/assets/img/inter.png" alt="">
            <a href="">20次</a>
            <h5>查看官网</h5>
          </li>
          <li>
            <img src="@/assets/img/news.png" alt="">
            <a href="">20次</a>
            <h5>查看动态</h5>
          </li>
          <li>
            <img src="@/assets/img/assign.png" alt="">
            <a href="">20次</a>
            <h5>查看产品</h5>
          </li>
        </ul>
      </div>
      <ul class="action-list">
        <li class="card-shadow">
          <img src="@/assets/icon/phone.png" alt="">
          <span>拨打电话</span>
          <i>10次</i>
        </li>
        <li class="card-shadow">
          <img src="@/assets/icon/service.png" alt="">
          <span>咨询服务</span>
          <i>10次</i>
        </li>
        <li class="card-shadow">
          <img src="@/assets/icon/audio.png" alt="">
          <span>播放语音</span>
          <i>10次</i>
        </li>
      </ul>
    </div>
    <div v-else style="height:100%;">
      <scroller lock-x height="100%" :pullup-config="loadingConfig" @on-pullup-loading="loadMore" :use-pullup="true" ref="scroller" :scroll-bottom-offst="200">
        <ul class="news-list">
          <li class="card-shadow" v-for="(item, index) in bottomCount" :key="index">
            <img src="@/assets/img/u112.png" alt="">
            <span>T-Wan在7日内和你互动了80次</span>
            <x-icon type="ios-arrow-down" size="20" class="icon"></x-icon>
          </li>
        </ul>
    </scroller>
    </div>
  </div>
</template>

<script>
import { Tab, TabItem, Scroller } from 'vux'

export default {
  name: 'index',
  components: {
    Tab,
    TabItem,
    Scroller
  },
  data () {
    return {
      tabIndex: 2,
      bottomCount: 6,
      loadingConfig: {
        upContent: '上拉加载更多',
        downContent: '释放后加载',
        loadingContent: '加载中...',
        content: '请上拉刷新数据'
      }
    }
  },
  methods: {
    onItemClick (index) {
      this.tabIndex = index
    },
    loadMore () {
      this.bottomCount += 10
      this.$nextTick(() => {
        this.$refs.scroller.donePullup()
        this.$refs.scroller.reset()
      })
    }
  },
  mounted () {
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
$color:#717171;
.index{
  overflow: auto;
  height: 100%;
  padding-top: 44px;
  .vux-tab-wrap{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
  .time{
    font-size: 0.32rem;
    line-height: 0.5rem;
    color: #717171;
    margin: 0.4rem 0;
  }
  .logs-list{
    padding: 0 0.2rem;
    li{
      height: 1.8rem;
      padding: 0.25rem 0;
      border-bottom: 1px solid #eee;
      img{
        float: left;
        height: 100%;
        width: 1.3rem;
      }
      div{
        width: 65%;
        float: left;
        height: 100%;
        line-height: 0.5rem;
        margin-left: 0.2rem;
        padding: 0.1rem 0;
        overflow: hidden;
        i{
          color: #f69600;
        }
      }
      span{
        float: right;
        width: 0.8rem;
        height: 100%;
        color: #717171;
        font-size: 0.22rem;
        line-height: .5rem;
      }
    }
  }
}
.tab-action{
  padding: 0 0.2rem;
  .action-card{
    padding: 0.25rem;
    margin-top: 0.6rem;
    & > p{
      font-size: 0.3rem;
      color: $color;
      height: 0.4rem;
      img{
        width: 0.4rem;
      }
    }
    ul{
      margin-top: 0.6rem;
    }
    li{
      width: 25%;
      float: left;
      height: 2rem;
      text-align: center;
      img{
        width: 0.7rem;
      }
      a{
        display: block;
        text-decoration: underline;
        color:$color;
        margin: 0.3rem 0;
        font-size: 0.22rem;
      }
      h5{
        color: #999;
        font-size: 0.26rem;
      }
    }
  }
  .action-list{
    li{
      height: 1.2rem;
      padding: 0.4rem 0.15rem;
      line-height: 0.4rem;
      margin-top: 0.3rem;
      img{
        float: left;
        height: 100%;
        margin-right: 0.2rem;
      }
      span{
        float: left;
        height: 100%;
        font-size: 0.3rem;
      }
      i{
        float: right;
        height: 100%;
        font-size: 0.28rem;
      }
    }
  }
}
.news-list{
  padding: 0.6rem 0.3rem 0;
  li{
    height: 1.4rem;
    padding: 0.2rem 0.15rem;
    line-height: 1rem;
    margin-top: 0.3rem;
    img{
      float: left;
      height: 100%;
      margin-right: 0.2rem;
    }
    span{
      float: left;
      height: 100%;
      font-size: 0.3rem;
    }
    .icon{
      float: right;
      height: 100%;
    }
  }
}
</style>
