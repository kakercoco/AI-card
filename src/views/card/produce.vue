/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-11 17:04:26
 * @Last Modified by: Jessica
 * @Last Modified time: 2018-09-29 14:27:11
 */
<template>
  <div class="produce">
    <div class="picker">
      <div class="tab tab-1">
        <span @click="showFirstDialog">{{activeTabFirstName}}</span>
        <div class="tab-wrap" v-show="activeTabFirstStatus" @click="closeDialog">
          <ul>
            <li @click.stop="switchProduce(0, '全部产品')">全部产品 <x-icon type="ios-checkmark-empty" class="icon-checked" v-if="pageForm.opt ===0"></x-icon></li>
            <li @click.stop="switchProduce(1, '已推荐产品')">已推荐产品 <x-icon type="ios-checkmark-empty" class="icon-checked" v-if="pageForm.opt ===1"></x-icon></li>
            <li @click.stop="switchProduce(2, '未推荐产品')">未推荐产品 <x-icon type="ios-checkmark-empty" class="icon-checked" v-if="pageForm.opt ===2"></x-icon></li>
          </ul>
        </div>
      </div>
      <div class="tab tab-2">
        <span @click="showSecondDialog">产品分类</span>
        <div class="tab-wrap" v-show="activeTabSecondStatus" @click="closeDialog">
          <ul>
            <li v-for="(item, index) in tabSecondList" :key="index" @click.stop="selsectedSortId(item)">
              {{item.name}}
              <x-icon type="ios-arrow-right" class="icon-down" v-if="item.child.length > 0 && !item.status"></x-icon>
              <x-icon type="ios-arrow-down" class="icon-down" v-if="item.child.length > 0&& item.status"></x-icon>
              <x-icon type="ios-checkmark-empty" class="icon-checked" v-if="item.child.length <= 0&& item.id === pageForm.type_id"></x-icon>
              <ul v-show="item.status">
                <li v-for="(e, i) in item.child" :key="i" @click.stop="selsectedSortId(e)">
                  {{e.name}}
                  <x-icon type="ios-checkmark-empty" class="icon-checked" v-if="e.id === pageForm.type_id"></x-icon>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <scroller lock-x :bounce="true" use-pullup :pullup-config="config" @on-pullup-loading="loadMore" ref="loadingMore" height="-60">
      <div>
        <ul class="produce-list">
          <li v-for="(item, index) in produceList" :key="index">
            <div class="left">
              <img :src="item.img" alt="">
              <p><span v-show="isRecommend(item.goods_id)">已推荐</span> <span v-show="!isRecommend(item.goods_id)">未推荐</span></p>
            </div>
            <div class="right">
              <h4>{{item.name}}</h4>
              <h5>{{item.summary}}</h5>
              <p>
                发布日期:{{Global.parseTime(item.createtime, '{y}-{m}-{d}')}}
                <span v-show="isRecommend(item.goods_id)" @click="employgoodsDetele(item)">取消</span>
                <span v-show="!isRecommend(item.goods_id)" @click="employgoodsSave(item)">推荐</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </scroller>
  </div>
</template>

<script>
import { PopupPicker, Scroller } from 'vux'
import { employgoodsIndex, employgoodsSave, employgoodsDetele } from '@/api/card'
import axios from 'axios'

export default {
  name: 'produce',
  components: {
    PopupPicker,
    Scroller
  },
  data () {
    return {
      config: {
        content: '请上拉刷新数据...',
        pullUpHeight: 60,
        height: 40,
        autoRefresh: false,
        downContent: '释放后加载',
        upContent: '请上拉刷新数据...',
        loadingContent: '加载中...',
        clsPrefix: 'xs-plugin-pullup-'
      },
      baseUrl: '/index.php',
      activeTabFirstStatus: false,
      activeTabFirstName: '全部产品',
      activeTabSecondStatus: false,
      tabSecondList: [], // 分类列表
      produceList: [], // 产品列表
      recommend: [], // 推荐列表
      pageForm: {
        opt: 0, // 类型 默认1 查看全部 2查看推荐的 3 查看不推荐的
        page: 1,
        rows: 10,
        type_id: null
      },
      isFlag: false, // 是否禁止上拉加载
      proxyTable: {
        '/index.php': {
          target: 'http://jiatui.api.com',
          changeOrigin: true,
          pathRewrite: {
            '^/index.php': '/index.php'
          }
        }
      }
    }
  },
  methods: {
    getProduceTypeList () {
      const data = {
        method: 'xcx.card.gcat_list',
        id: 0
      }
      axios.post(`${this.baseUrl}/api/Scratch/webClient`,
        data, this.proxyTable)
        .then(res => {
          if (res.data.isSuccess) {
            const list = res.data.data
            list.forEach(element => {
              if (element.child.length > 0) {
                element.status = false
              }
            })
            this.tabSecondList = list
          }
        })
    },
    getProduceList () {
      employgoodsIndex(this.pageForm)
        .then(res => {
          this.produceList = res.data.rows
          this.recommend = res.data.recommend.split(',')
        })
    },
    switchProduce (val, name) {
      this.pageForm.opt = val
      this.activeTabFirstStatus = false
      this.activeTabFirstName = name
      this.pageForm.page = 1
      this.getProduceList()
      this.$refs.loadingMore.reset({top: 0})
      if (this.isFlag) {
        this.$refs.loadingMore.enablePullup()
      }
    },
    showFirstDialog () {
      this.activeTabFirstStatus = true
      this.activeTabSecondStatus = false
    },
    showSecondDialog () {
      this.activeTabSecondStatus = true
      this.activeTabFirstStatus = false
    },
    closeDialog () {
      this.activeTabSecondStatus = false
      this.activeTabFirstStatus = false
    },
    selsectedSortId (item) {
      if (item.child.length > 0) {
        item.status = !item.status
      } else {
        this.pageForm.type_id = item.id
        this.pageForm.page = 1
        this.getProduceList()
        this.$refs.loadingMore.reset({top: 0})
        if (this.isFlag) {
          this.$refs.loadingMore.enablePullup()
        }
        this.closeDialog()
      }
    },
    loadMore () {
      this.pageForm.page += 1
      employgoodsIndex(this.pageForm)
        .then(res => {
          if (res.data.length === 0) {
            this.$refs.loadingMore.disablePullup() // 禁用上拉
            this.isFlag = true
          } else {
            this.produceList = this.produceList.concat(res.data.rows)
            this.$refs.loadingMore.donePullup()
          }
        })
    },
    employgoodsSave (item) {
      const data = {
        product_id: item.goods_id,
        product_name: item.name,
        product_img: item.img
      }
      employgoodsSave(data)
        .then(res => {
          this.$vux.toast.text('推荐成功', 'top')
        })
    },
    employgoodsDetele (item) {
      const data = {
        product_id: item.goods_id
      }
      employgoodsDetele(data)
        .then(res => {
          this.$vux.toast.text('取消推荐成功', 'top')
        })
    },
    isRecommend (id) {
      return this.recommend.includes(id)
    }
  },
  mounted () {
    this.getProduceTypeList()
    this.getProduceList()
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.produce{
  overflow: auto;
  height: 100%;
  .picker{
    height: 0.9rem;
    border-bottom: 1px solid #eee;
    .tab{
      width: 50%;
      float: left;
      height: 100%;
      line-height: 0.9rem;
      font-size: 0.34rem;
      &>span{
        width: 100%;
        text-align: center;
        float: left;
      }
    }
    .tab-wrap{
      position: fixed;
      top: 0.9rem;
      left: 0;
      width: 100%;
      height: calc(100% - 0.9rem);
      background-color: rgba(0,0,0,0.5);
      z-index: 2;
      overflow: auto;
    }
    .tab-1{
      ul{
        background-color: #fff;
        li{
          padding: 0 0.2rem;
          border-bottom: 1px solid #eee;
          height: 0.9rem;
          font-size: 0.3rem;
          color: #717171;
          .icon-checked{
            fill: #0fd35d;
            width: 0.6rem;
            height: 0.6rem;
            float: right;
            margin-top: 0.15rem;
          }
        }
      }
    }
    .tab-2{
      .tab-wrap>ul{
        padding-right: 0.2rem;
      }
      ul{
        background-color: #fff;
        li{
          border-bottom: 1px solid #eee;
          font-size: 0.3rem;
          color: #717171;
          min-height: 0.9rem;
          padding-left: 0.2rem;
          .icon-down{
            fill: #999;
            width: 0.6rem;
            height: 0.6rem;
            float: right;
            margin-top: 0.15rem;
          }
          .icon-checked{
            fill: #0fd35d;
            width: 0.6rem;
            height: 0.6rem;
            float: right;
            margin-top: 0.15rem;
          }
        }
      }
    }
  }
  .produce-list{
    li{
      height: 4rem;
      padding: 0.5rem 0.3rem;
      .left{
        width: 3rem;
        height: 3rem;
        float: left;
        position: relative;
        border-radius: 0.1rem;
        overflow: hidden;
        margin-right: 0.2rem;
        img{
          width: 100%;
          height: 100%;
        }
        p{
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: .55rem;
          line-height: 0.55rem;
          text-align: center;
          background-color: rgba(255, 255, 255, 0.5);
          span{
            &:first-child{
              color: #5977fe;
            }
            &:last-child{
              color: #fff;
            }
          }
        }
      }
      .right{
        width: 3.6rem;
        height: 100%;
        float: left;
        position: relative;
        h4{
          color: #5977fe;
          font-size: 0.3rem;
          height: 0.5rem;
          line-height: 0.5rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-top: 0.2rem;
        }
        h5{
          color: #717171;
          font-size: 0.28rem;
          height: 1.2rem;
          overflow : hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        p{
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 0.5rem;
          line-height: 0.5rem;
          color: #717171;
          span{
            float: right;
            width: 0.9rem;
            height: 0.4rem;
            line-height: 0.45rem;
            font-size: 0.22rem;
            text-align: center;
            border-radius: 0.4rem;
            &:first-child{
              background-color: #5977fe;
              color: #fff;
            }
            &:last-child{
              background-color: #d8d8d8;
              color: #333;
            }
          }
        }
      }
    }
  }
}
</style>
