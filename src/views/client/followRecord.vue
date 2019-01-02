/*
 * @Author: zhangmengli
 * @Date: 2018-12-26 18:18:43
 * @Last Modified by: zhangmengli
 * @Last Modified time: 2018-12-26 18:18:43
 */
<template>
  <div class="time-line">
    <p v-if="followList.length <= 0" class="no_data">没有更多数据</p>
    <scroller lock-x height="-60" use-pullup :pullup-config="config" :bounce="true" ref="loadingMoreFollow" @on-pullup-loading="loadMoreFollow">
      <div>
        <timeline>
          <timeline-item v-for="(item, index) in followList" :key="index">
            <p class="time">{{Global.parseTime(item.create_time, '{y}-{m}-{d}')}}</p>
            <div class="timeline-wrap">
              <!--<p>{{formateType(item.type)}}</p>-->
              <p>{{item.content}}</p>
            </div>
          </timeline-item>
        </timeline>
      </div>
    </scroller>
    <div style="height: 1.5rem;"></div>
    <p class="yyf_new_btn" style="border-top: 1px #e3e3e3 solid">
      <x-button type="primary" @click.native="addFollow">添加跟进</x-button>
    </p>
  </div>
</template>

<script>
import {
  Scroller,
  Timeline,
  TimelineItem,
  XButton
} from 'vux'
import {
  followIndex
} from '@/api/customer'
export default {
  name: 'followRecord',
  components: {
    Scroller,
    Timeline,
    TimelineItem,
    XButton
  },
  data () {
    return {
      id: this.$route.query.id !== undefined && this.$route.query.id !== '' ? this.$route.query.id : '',
      isDisabled: false,
      followList: [], // 跟进列表
      isFlagFollow: false, // 跟进记录上拉是否禁止
      config: {
        content: '加载中...',
        pullUpHeight: 60,
        height: 40,
        autoRefresh: false,
        downContent: '释放后加载',
        upContent: '加载中...',
        loadingContent: '加载中...',
        clsPrefix: 'xs-plugin-pullup-'
      },
      followPage: 1,
      followPagesize: 10
    }
  },
  methods: {
    formateType (type) {
      let str = ''
      if (type === 0) {
        str = '首次沟通'
      } else if (type === 1) {
        str = '电话沟通'
      } else if (type === 2) {
        str = '微信沟通'
      } else if (type === 3) {
        str = '邀约'
      } else if (type === 4) {
        str = '拜访'
      } else if (type === 5) {
        str = '签单'
      } else if (type === 6) {
        str = '收尾款'
      } else if (type === 7) {
        str = '老客户回访'
      }
      return str
    },
    addFollow () {
      this.$router.push({
        path: '/clientFollow',
        query: {
          id: this.id
        }
      })
    },
    getFollowIndex () {
      let data = {
        uid: this.$route.query.id !== undefined ? this.$route.query.id : '',
        page: this.followPage,
        pagesize: this.followPagesize
      }
      followIndex(data).then(res => {
        if (res.data.rows.length === 0) {
          this.$refs.loadingMoreFollow.disablePullup() // 禁用上拉
          this.isFlagFollow = true
          return false
        } else if (res.data.rows.length === res.data.total) {
          this.followList = this.followList.concat(res.data.rows)
          this.$refs.loadingMoreFollow.disablePullup() // 禁用上拉
        } else {
          this.followList = this.followList.concat(res.data.rows)
          this.$refs.loadingMoreFollow.donePullup()
        }
      })
    },
    loadMoreFollow () {
      this.followPage += 1
      const data = {
        uid: this.uid,
        page: this.followPage,
        pagesize: this.followPagesize
      }
      followIndex(data).then(res => {
        if (res.data.rows.length === 0) {
          this.$refs.loadingMoreFollow.disablePullup() // 禁用上拉
          this.isFlagFollow = true
          return false
        } else {
          this.followList = this.followList.concat(res.data.rows)
          this.$refs.loadingMoreFollow.donePullup()
        }
      })
    }
  },
  mounted () {
    this.getFollowIndex()
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
  .time-line {
    -webkit-overflow-scrolling: touch;
    & /deep/ .vux-timeline {
      padding: 0.2rem;
      .vux-timeline-item-content {
        padding: 0 0 0.3rem 0.3rem;
      }
    }
    & /deep/ .vux-timeline-item-tail {
      background-color: #3f82ff;
    }
    & /deep/ .vux-timeline-item-color {
      background-color: #3f82ff;
    }
    .time{
      padding-left: 0.46rem;
      height: 0.8rem;
      font-size: 0.24rem;
      line-height: 0.5rem;
      font-family: 'Arial Regular',serif;
      color: #999999;
      padding-top: 0.3rem;
    }
    .timeline-wrap {
      padding-left: 0.46rem;
      p {
        font-size: 0.28rem;
        line-height: 0.5rem;
        color: #353535;
        font-family: '黑体',serif;
        i{
          color: #3e80f4;
        }
      }
    }
}
</style>
