/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-01 14:07:51
 * @Last Modified by: Jessica
 * @Last Modified time: 2018-10-17 20:23:57
 */
<template>
  <div class="see-card" style="height: 100%;">

    <scroller height="100%" lock-x :use-pullup="true" :pullup-config="pullup_config" @on-pullup-loading="loadMore" ref="scrollerBottom">
      <div>
        <div class="title">
          <h5>{{time_slot === '' ? '7日内' : time_slot}}被查看的行为统计</h5>
          <img src="@/assets/img/datapicker.png" alt="" @click="showDateChoose">
        </div>
        <p>共 <span class="blue">{{scroller_config.total}}</span> 次</p>
        <ul class="list">
          <li v-for="(item, index) in list" :key="index" @click="to_details(item)">
            <div class="item-time">
              <p :class="item.time.length < 5 ? 'font1' : 'font2'">{{item.time}}</p>
            </div>
           <div class="item-content">
             <div class="div-left">
               <img :src="item.wx_image ? item.wx_image : '@/assets/img/moren.jpg'">
             </div>
             <div v-html="item.ele" class="div-right">
               <p> {{item.wx_name }}</p>
             </div>
             <x-icon type="ios-arrow-right" size="25" class="icon-right"></x-icon>
           </div>
          </li>
        </ul>
      </div>

    </scroller>

    <x-dialog v-model="datePickerDialog" class="dialog-datepicker" hide-on-blur :dialog-style="{'max-width': '100%', width: '5.8rem'}">
      <h5>选择时间段</h5>
      <group class="start-time">
        <datetime v-model="startTIme" format="YYYY-MM-DD" placeholder="" @on-change="changeStartTime">
          <span slot="title"></span>
          <div slot="title">
            <img src="@/assets/img/datepickerGray.png" alt="" class="fl title-icon">
          </div>
        </datetime>
      </group>
      <p class="time-title">至</p>
      <group class="end-time">
        <datetime v-model="endTime" format="YYYY-MM-DD" placeholder="">
          <span slot="title"></span>
          <div slot="title">
            <img src="@/assets/img/datepickerGray.png" alt="" class="fl title-icon">
          </div>
        </datetime>
      </group>
      <div class="btn">
        <p @click="resetTime">取消</p>
        <p @click="sureTime">确定</p>
      </div>
    </x-dialog>
  </div>
</template>

<script>
import { XDialog, XButton, Group, Cell, Datetime, Scroller } from 'vux'
import { init_list } from '@/api/footprint'
import { formatatTime, config } from '@/utils/base'

export default {
  name: 'callPhone',
  components: {
    XButton,
    XDialog,
    Group,
    Cell,
    Datetime,
    Scroller
  },
  data () {
    return {
      time_slot: this.$route.query.time,
      startTIme: '',
      endTime: '',
      datePickerDialog: false,
      pullup_config: {
        content: '加载中...',
        pullUpHeight: 60,
        height: 40,
        autoRefresh: false,
        downContent: '加载中...',
        upContent: '加载中...',
        loadingContent: '加载中...'
      },
      list: [],
      scroller_config: {
        page: 1,
        pagesize: 10,
        max_page: 0,
        isAjax: true,
        total: 0
      }
    }
  },
  methods: {
    changeStartTime (val) {
      console.log(val)
    },

    showDateChoose () {
      this.datePickerDialog = true
    },
    resetTime () {
      this.datePickerDialog = false
    },
    sureTime () {
      this.datePickerDialog = false
      this.time_slot = `${this.startTIme}到${this.endTime}`
      this.$vux.loading.show({
        text: '加载中...'
      })
      if (this.scroller_config.isAjax) {
        this.$refs.scrollerBottom.disablePullup()
        this.list = []
        this.scroller_config.page = 1
        this.scroller_config.total = 0
        this.scroller_config.max_page = 0
        this.init(this.startTIme, this.endTime, true)
      }
    },

    init (start_time, end_time, isTop) {
      this.scroller_config.isAjax = false
      let data = {
        type: 'typeGroup',
        type_id: this.$route.query.type
      }
      if (start_time !== '7日' && start_time !== undefined) {
        data.start_time = start_time
      }
      if (end_time !== '7日' && end_time !== undefined) {
        data.end_time = end_time
      }
      init_list(data).then(e => {
        this.scroller_config.isAjax = true
        this.$vux.loading.hide()
        if (e.code === 200 && e.data && e.data.rows instanceof Array) {
          let list = e.data.rows
          list.map((val, i) => {
            val.ele = config[val.type] ? val.wx_name + config[val.type] : ''
            val.time = formatatTime(val.create_time, '{y}-{m}-{d} {h}:{i}:{s}')
          })

          this.list = this.list.concat(list)
          this.scroller_config.total = e.data.total
          this.scroller_config.max_page = Math.ceil(e.data.total / 10)
          this.$nextTick(() => {
            this.$refs.scrollerBottom.donePullup() // 上啦完成

            if (isTop) {
              this.$refs.scrollerBottom.reset({ top: 0 })
            } else {
              this.$refs.scrollerBottom.reset()
            }

            if (this.scroller_config.max_page <= 1) {
              this.$refs.scrollerBottom.disablePullup() // 禁止上啦
            } else {
              this.$refs.scrollerBottom.enablePullup() // 恢复上啦
            }
          })
        }
      })
    },

    to_details (item) {
      this.$router.push({
        path: '/client',
        query: {
          uid: item.uid
        }
      })
    },

    loadMore () {
      if (
        this.scroller_config.isAjax &&
        this.scroller_config.page < this.scroller_config.max_page
      ) {
        this.scroller_config.page++
        this.init(this.startTIme, this.endTime, true)
      } else if (this.scroller_config.page >= this.scroller_config.max_page) {
        this.$refs.scrollerBottom.disablePullup() // 禁用上拉
      }
    }
  },
  created () {
    console.log(this.$route.query)
    var arr = this.$route.query.time.split('到')
    this.startTIme = arr[0]
    this.endTime = arr[1]
    console.log(arr)
  },
  mounted () {
    this.init(this.startTIme, this.endTime, true)
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
$color: #717171;
.see-card {
  .font1{
    font-family: '黑体',serif;
  }
  .font2{
    font-family: 'Arial Regular',serif;
  }
  .title {
    position: relative;
    height: 0.8rem;
    padding: 0 0.3rem;
    background-color: #f8f8f8;
    border: none !important;
    h5 {
      text-align: left;
      color: #666666;
      font-size: 0.28rem;
      height: 0.8rem;
      line-height: 0.36rem;
      padding: 0.235rem 0.4rem 0 0.4rem;
      font-family: '黑体',serif;
      font-weight: normal;
    }
    img {
      position: absolute;
      top: 0.22rem;
      right: 0.3rem;
      width: 0.35rem;
      height: 0.37rem;
    }
  }
  p {
    font-size: 0.28rem;
    line-height: 0.36rem;
    color: #666666;
    text-align: center;
    margin-top: 0.3rem;
    position: relative;
    font-family: '黑体',serif;
    font-weight: normal;
  }
  .list {
    li {
      height: 2.2rem;
      padding: 0 0.4rem 0.5rem 0.4rem;
      border-radius: 5px;
      .item-time{
        p{
          text-align: left;
          font-size: 0.33rem;
          color: #353535;
          height: 0.8rem;
          padding-top: 0.15rem;
          line-height: 0.36rem;
        }
      }
      .item-content{
        height: 1.4rem;
        border: 1px solid #f8f8f8;
        border-radius: 0.1rem;
        -moz-box-shadow:0px 1px 4px #A6A6A6; -webkit-box-shadow:0px 1px 4px #A6A6A6; box-shadow:0px 1px 4px #A6A6A6;
        .div-left{
          width: 13%;
          float: left;
          height: 1.4rem;
          img {
            width: 0.8rem;
            height: 0.8rem;
            border-radius: 50%;
            position: relative;
            top: 0.3rem;
            left: 0.35rem;
          }
        }
        .div-right{
          width: 65%;
          float: left;
          height: 1.45rem;
          line-height: 0.42rem;
          margin-left: 0.5rem;
          padding: 0.5rem 0;
          overflow: hidden;
          font-size: 0.28rem;
          color: #353535;
          font-family: '\9ED1\4F53',serif;
          font-weight: normal;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          i {
            color: #3e80f4;
          }
        }
        .icon-right {
          float: right;
          height: 1.4rem;
          fill: #cfcfcf;
        }
      }
    }
  }
}
.dialog-datepicker{
  & /deep/ .weui-cell_access .weui-cell__ft:after {
    display: none;
  }
  & /deep/ .vux-cell-value {
    display: inline-block;
    color: #999;
    width: 1.7rem;
    font-size: 0.1rem;
    position: relative;
    left: -0.9rem;
  }
  .weui-cell {
    border: 1px solid #D9D9D9;
    border-radius: 5px;
    height: 0.8rem;
  }
  .weui-cells:before {
    border-top: none !important;
  }
  .weui-cells:after {
    border-bottom: none !important;
  }
  & /deep/ .weui-cell__ft{
    padding-right: 20px;
    &::after{
      margin-top: -6px;
    }
  }
  h5{
    height: 0.9rem;
    color: #353535;
    font-weight: normal;
    font-size: 0.36rem;
    line-height: 0.9rem;
    font-family: "\9ED1\4F53",serif;
    /*background-color: #efefef;*/
    margin-bottom: 0.5rem;
  }
  .title-icon{
    width: 0.36rem;
    height: 0.36rem;
    position: relative;
    left: 1.3rem;
  }
  .btn{
    height: 1rem;
    border-top: 1px solid #e6e6e6;
    width: 5.8rem;
    p{
      margin: 0;
      font-size: 0.36rem;
      line-height: 0.42rem;
      font-family: '黑体',serif;
      color: #666666;
    }
    p:nth-child(1){
      height: 1rem;
      width: 50%;
      float: left;
      display: inline-block;
      border-right: 1px solid #e6e6e6;
      padding-top: 0.31rem;
    }
    p:nth-child(2){
      height: 1rem;
      display: inline-block;
      width: 50%;
      color: #3c7df0;
      padding-top: 0.31rem;
    }
  }
  .time-title{
    width: 0.7rem;
    height: 0.75rem;
    display: inline-block;
    position: relative;
    top: -0.33rem;
    font-size: 0.3rem;
    line-height: 0.42rem;
    font-family: "\9ED1\4F53",serif;
  }
  .start-time{
    display: inline-block;
    width: 2.25rem;
    height: 1.77rem;
  }
  .end-time{
    width: 2.25rem;
    display: inline-block;
    height: 1.77rem;
  }
}
</style>
