/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-11 17:04:26
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-30 14:22:16
 */
<template>
  <div class="produce">
    <div class="picker">
      <div class="tab tab-1">
        <span @click="showFirstDialog">案例推荐</span>
        <div class="tab-wrap" v-show="activeTabFirstStatus" @click="closeDialog">
          <ul>
            <li @click.stop="switchProduce(1, '全部案例')">全部案例 <x-icon type="ios-checkmark-empty" class="icon-checked" v-if="pageForm.opt ===1"></x-icon></li>
            <li @click.stop="switchProduce(2, '已推荐案例')">已推荐案例 <x-icon type="ios-checkmark-empty" class="icon-checked" v-if="pageForm.opt ===2"></x-icon></li>
            <li @click.stop="switchProduce(3, '未推荐案例')">未推荐案例 <x-icon type="ios-checkmark-empty" class="icon-checked" v-if="pageForm.opt ===3"></x-icon></li>
          </ul>
        </div>
      </div>
      <div class="tab tab-2">
        <span @click="showSecondDialog">案例分类</span>
        <div class="tab-wrap" v-show="activeTabSecondStatus" @click="closeDialog">
          <ul>
            <li  @click.stop="selsectedSortId({id:''})">
              全部
              <x-icon type="ios-checkmark-empty" class="icon-checked" v-if="pageForm.type_id === ''"></x-icon>
            </li>
            <li v-for="(item, index) in tabSecondList" :key="index" @click.stop="selsectedSortId(item)">
              {{item.name}}
              <x-icon type="ios-checkmark-empty" class="icon-checked" v-if="item.id === pageForm.type_id"></x-icon>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <scroller lock-x :bounce="true" use-pullup :pullup-config="config" @on-pullup-loading="loadMore" ref="loadingMore" height="-60">
      <div>
        <ul class="produce-list yyf_new_case_pro_one">
          <li v-for="(item, index) in produceList" :key="index">
            <div class="left">
              <img :src="item.img" alt="">
              <p><span v-show="item.status">已推荐</span> <span v-show="!item.status">未推荐</span></p>
            </div>
            <div class="right">
              <h4>{{item.title}}</h4>
              <h5>{{item.summary}}</h5>
              <p>
                {{Global.parseTime(item.createtime, '{m}月{d}日')}}发布
              </p>
              <div class="noe_btn">
                <span v-show="item.status" @click="employcaseDetele(item)" class="can">取消推荐</span>
                <span v-show="!item.status" @click="employcaseSave(item)" class="Recommend">推荐</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </scroller>
  </div>
</template>

<script>
import { PopupPicker, Scroller } from 'vux'
import { employcaseIndex, employcaseSave, employcaseDetele, webClient } from '@/api/card'
export default {
  name: 'case',
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
      activeTabFirstStatus: false,
      activeTabFirstName: '全部案例',
      activeTabSecondStatus: false,
      tabSecondList: [], // 分类列表
      produceList: [], // 产品列表
      recommend: [], // 推荐列表
      pageForm: {
        opt: 1, // 类型 默认1 查看全部 2查看推荐的 3 查看不推荐的
        page: 1,
        rows: 10,
        type_id: null
      },
      isFlag: false // 是否禁止上拉加载
    }
  },
  methods: {
    getProduceTypeList () {
      const data = {
        method: 'xcx.card.ccat_list',
        id: 0,
        type: 3
      }
      webClient(data)
        .then(res => {
          const list = res.data
          list.forEach(element => {
            element.status = false
          })
          this.tabSecondList = list
        })
    },
    getProduceList () {
      employcaseIndex(this.pageForm).then(res => {
        const list = res.data.rows
        this.recommend = res.data.recommend.split(',')
        list.forEach(e => {
          if (this.recommend.includes(e.id)) {
            e.status = true
          } else {
            e.status = false
          }
        })
        this.produceList = list
      })
    },
    switchProduce (val, name) {
      this.pageForm.opt = val
      this.activeTabFirstStatus = false
      this.activeTabFirstName = name
      this.pageForm.page = 1
      this.getProduceList()
      this.$refs.loadingMore.reset({ top: 0 })
      if (this.isFlag) {
        this.$refs.loadingMore.enablePullup()
        this.isFlag = false
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
      this.pageForm.type_id = item.id
      this.pageForm.page = 1
      this.getProduceList()
      this.$refs.loadingMore.reset({ top: 0 })
      if (this.isFlag) {
        this.$refs.loadingMore.enablePullup()
        this.isFlag = false
      }
      this.closeDialog()
    },
    loadMore () {
      this.pageForm.page += 1
      employcaseIndex(this.pageForm).then(res => {
        if (res.data.length === 0) {
          this.$refs.loadingMore.disablePullup() // 禁用上拉
          this.isFlag = true
        } else {
          this.produceList = this.produceList.concat(res.data.rows)
          this.$refs.loadingMore.donePullup()
        }
      })
    },
    employcaseSave (item) {
      const data = {
        case_id: item.id,
        case_name: item.title,
        case_img: item.img
      }
      employcaseSave(data).then(res => {
        this.$vux.toast.text('推荐成功', 'top')
        // this.getProduceList()
        item.status = !item.status
      })
    },
    employcaseDetele (item) {
      const data = {
        case_id: item.id
      }
      employcaseDetele(data)
        .then(res => {
          this.$vux.toast.text('取消推荐成功', 'top')
          // this.getProduceList()
          item.status = !item.status
        })
    }
  },
  mounted () {
    this.getProduceTypeList()
    this.getProduceList()
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.produce {
  overflow: auto;
  height: 100%;
  .picker {
    height: 0.9rem;
    border-bottom: 1px solid #eee;
    .tab {
      width: 50%;
      float: left;
      height: 100%;
      line-height: 0.9rem;
      font-size: 0.34rem;
      & > span {
        width: 100%;
        text-align: center;
        float: left;
        font-size: 0.32rem;
        font-family: '黑体';
      }
    }
    .tab-wrap {
      position: fixed;
      top: 0.9rem;
      left: 0;
      width: 100%;
      height: calc(100% - 0.9rem);
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 2;
      overflow: auto;
    }
    .tab-1 {
      ul {
        background-color: #fff;
        li {
          padding: 0 0.2rem;
          border-bottom: 1px solid #eee;
          height: 0.9rem;
          font-size: 0.3rem;
          color: #717171;
          .icon-checked {
            fill: #0fd35d;
            width: 0.6rem;
            height: 0.6rem;
            float: right;
            margin-top: 0.15rem;
          }
        }
      }
    }
    .tab-2 {
      .tab-wrap > ul {
        padding-right: 0.2rem;
      }
      ul {
        background-color: #fff;
        li {
          border-bottom: 1px solid #eee;
          font-size: 0.3rem;
          color: #717171;
          min-height: 0.9rem;
          padding-left: 0.2rem;
          .icon-down {
            fill: #999;
            width: 0.6rem;
            height: 0.6rem;
            float: right;
            margin-top: 0.15rem;
          }
          .icon-checked {
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
}
</style>
