/*
 * @Author: zhangmengli
 * @Date: 2018-12-12 10:58:27
 * @Last Modified by: zhangmengli
 * @Last Modified time: 2018-12-12 10:58:27
 */
<template>
  <div class="form">
    <scroller
      height="100%"
      lock-x
      :use-pullup="true"
      :pullup-config="pullup_config"
      @on-pullup-loading="timeLoadMore"
      ref="scrollerBottom">
    <ul>
      <li v-for="(item, index) in formListData" :index="index" @click="clickForm(item)">
        <p class="form-left" >
          <span>{{ item.title }}</span>
        </p>
        <p class="form-right">
          <span>{{ item.num }}</span>
        </p>
        <x-icon type="ios-arrow-right" class="icon-right" @click="clickForm(item)"></x-icon>
      </li>
    </ul>
      <div class="nodata" v-if="no_data">暂无数据!</div>
    </scroller>
  </div>
</template>

<script>
import {
  Tab,
  TabItem,
  XButton,
  AlertModule,
  Scroller
} from 'vux'
import { getFormList } from '@/api/form'
export default {
  name: 'formList',
  components: {
    XButton,
    Tab,
    TabItem,
    AlertModule,
    Scroller
  },
  data () {
    return {
      formListData: [],
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
    formLists (isTop) {
      getFormList({
        page: this.timeScroller.page,
        limit: this.timeScroller.pagesize,
        searchKey: ''
      }).then(res => {
        this.timeScroller.isAjax = true
        this.$vux.loading.hide()
        if (res.code === 200 && res.data && res.data.rows instanceof Array) {
          this.no_data = false
          let list = res.data.rows
          this.formListData = this.formListData.concat(list)
          this.timeScroller.total = res.data.total
          this.timeScroller.max_page = Math.ceil(res.data.total / 10)
          if (this.formListData.length === 0) {
            this.no_data = true
          }
        } else {
          this.$refs.scrollerBottom.disablePullup()
        }
        this.$nextTick(() => {
          this.$refs.scrollerBottom.donePullup()// 上拉完成
          if (isTop) {
            this.$refs.scrollerBottom.reset({top: 0})
          } else {
            this.$refs.scrollerBottom.reset()
          }
          if (this.timeScroller.max_page <= 1 || this.formListData.length === 0) {
            this.$refs.scrollerBottom.disablePullup()// 禁止上拉
          } else {
            this.$refs.scrollerBottom.enablePullup()// 恢复上拉
          }
        })
      })
    },
    clickForm (item) {
      this.$router.push({
        path: '/formData',
        query: {
          id: item.id,
          fields: item.fields
        }
      })
    },
    timeLoadMore () {
      if (this.timeScroller.isAjax && this.timeScroller.page < this.timeScroller.max_page) {
        this.timeScroller.page++
        this.formLists()
      } else if (this.timeScroller.page >= this.timeScroller.max_page) {
        this.$refs.scrollerBottom.disablePullup() // 禁用上拉
      }
    }
  },
  created () {
  },
  mounted () {
    this.formLists()
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.form {
  height: 100%;
  .nodata{
    line-height: 1.5rem;
    text-align: center;
    font-family: '黑体',serif;
    font-size: 0.3rem;
    color: #999;
  }
  ul{
    padding-left: 0.2rem;
    li{
      border-bottom: 1px solid #f2f2f2;
      padding-right: 0.6rem;
      height: 1rem;
      .form-left{
        float: left;
        line-height: 0.5rem;
        font-size: 0.33rem;
        font-family: '\9ED1\4F53', Microsoft YaHei,sans-serif;
        color: #353535;
        padding-top: 0.25rem;
        width: 85%;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      .form-right{
        width: 15%;
        float: right;
        font-size: 0.3rem;
        line-height: 0.5rem;
        color: #999999;
        font-family: 'Arial Regular',sans-serif;
        padding-top: 0.25rem;
        display: inline-block;
        text-align: right;
        padding-right: 0.2rem;
      }
      .icon-right {
        position: relative;
        top: -0.5rem;
        left: 6.5rem;
        width: 0.5rem;
        fill: #d2d2d2;
        display: inline-block;
      }
    }
  }
}
</style>
