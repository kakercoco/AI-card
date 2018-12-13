/*
* @Author: zhangmengli
* @Date: 2018-12-12 15:00:27
* @Last Modified by: zhangmengli
* @Last Modified time: 2018-12-12 15:00:27
*/
<template>
  <div class="form-data">
    <div class="form-data-tilte">
      <p><span>表单名称:</span>8月15号珍岛4S店开业啦!</p>
      <p><span>客户数量:</span>53</p>
    </div>
    <div class="form-data-content">
      <p class="title">已提交{{ timeScroller.total }}份表单</p>
      <scroller
        height="100%"
        lock-x
        :use-pullup="true"
        :pullup-config="pullup_config"
        @on-pullup-loading="timeLoadMore"
        ref="scrollerBottom">
          <ul class="content" v-for="(item, index) in formDatas" :index="index">
            <li @click="clickClienForm(item)">
              <p class="content-left">
                <img :src="item.wx_image!== '' && item.wx_image !==undefined ? item.wx_image: '../../assets/img/u112.png'">
              </p>
              <div class="content-right">
                <p>{{item.wx_name}}</p>
                <p>{{item.create_time}}</p>
              </div>
              <x-icon type="ios-arrow-right" class="icon-right" @click="clickClienForm(item)"></x-icon>
            </li>
          </ul>
         <div class="nodata" v-if="no_data">暂无数据!</div>
      </scroller>
    </div>
  </div>
</template>

<script>
import {
  AlertModule,
  Scroller
} from 'vux'
import { getMessageFormList } from '@/api/form'
export default {
  name: 'formData',
  components: {
    AlertModule,
    Scroller
  },
  data () {
    return {
      formDatas: [],
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
      no_data: false
    }
  },
  methods: {
    clickClienForm (item) {
      this.$router.push({
        path: '/formDetail',
        query: {
          id: item.msgId,
          fields: this.$route.query.fields
        }
      })
    },
    messageFormList (isTop) {
      getMessageFormList({
        id: this.$route.query.id,
        page: this.timeScroller.page,
        limit: this.timeScroller.pagesize
      }).then(res => {
        /* this.timeScroller.isAjax = true
        this.$vux.loading.hide()
        if (res.code === 200 && res.data && res.data.list instanceof Array) {
          this.no_data = false
          let list = res.data.list
          this.formDatas = this.formDatas.concat(list)
          this.timeScroller.total = res.data.total
          this.timeScroller.max_page = Math.ceil(res.data.total / 10)
        } else {
          this.$refs.scrollerBottom.disablePullup()
        }
        this.$nextTick(() => {
          debugger
          this.$refs.scrollerBottom.donePullup()// 上拉完成
          if (isTop) {
            this.$refs.scrollerBottom.reset({top: 0})
          } else {
            this.$refs.scrollerBottom.reset()
          }
          if (this.timeScroller.max_page <= 1 || this.formDatas.length === 0) {
            this.no_data = true
            this.$refs.scrollerBottom.disablePullup()// 禁止上拉
          } else {
            this.$refs.scrollerBottom.enablePullup()// 恢复上拉
          }
        }) */
      })
    },
    timeLoadMore () {
      if (this.timeScroller.isAjax && this.timeScroller.page < this.timeScroller.max_page) {
        this.timeScroller.page++
        this.messageFormList()
      } else if (this.timeScroller.page >= this.timeScroller.max_page) {
        this.$refs.scrollerBottom.disablePullup() // 禁用上拉
      }
    }
  },
  watch: {
  },
  mounted () {
    this.messageFormList()
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
  .form-data {
    height: 100%;
    overflow: auto;
    position: relative;
    -webkit-overflow-scrolling: touch;
    .form-data-tilte{
      height: 1.6rem;
      font-size: 0.33rem;
      line-height: 0.48rem;
      color: #353535;
      font-family: '黑体',serif;
      padding: 0.32rem 0.4rem;
      border-bottom: 0.1rem solid #f8f8f8;
    }
    .form-data-content{
      .nodata{
        line-height: 1.5rem;
        text-align: center;
        font-family: '黑体',serif;
        font-size: 0.3rem;
        color: #999;
      }
      .title{
        height: 0.8rem;
        font-size: 0.28rem;
        line-height: 0.48rem;
        font-family: '\9ED1\4F53',serif;
        color: #999999;
        padding-top: 0.15rem;
        padding-left: 0.4rem;
      }
      .content{
        li{
          height: 1.12rem;
          margin: 0.2rem 0.4rem;
          border-bottom: 1px solid #dfdfdf;
          .content-left{
            float: left;
            display: inline-block;
            width: 14%;
            img{
              width: 0.72rem;
              height: 0.72rem;
              border: 1px solid #fbf9fe;
            }
          }
          .content-right{
            width: 85%;
            float: right;
            display: inline-block;
            p{
              font-size: 0.34rem;
              line-height: 0.42rem;
              font-family: '黑体',serif;
              color: #353535;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
            p:nth-child(2) {
              font-size: 0.24rem;
              color: #999999;
            }
          }
          .icon-right {
            position: relative;
            top: -0.65rem;
            left: 6.5rem;
            width: 0.5rem;
            fill: #d2d2d2;
            display: inline-block;
          }
        }
      }
    }
  }
</style>
