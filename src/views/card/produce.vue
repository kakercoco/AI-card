/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-11 17:04:26
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-11 18:16:48
 */
<template>
  <div class="produce">
    <div class="picker">
      <p>
        <popup-picker :data="produceList" v-model="value"  @on-change="onChange" value-text-align="center"></popup-picker>
      </p>
      <p>
        <popup-picker :data="sortList" v-model="value2"   @on-change="onChange" value-text-align="center" :columns="2" show-name></popup-picker>
      </p>
    </div>
    <ul class="produce-list">
      <li v-for="(item, index) in 3" :key="index">
        <div class="left">
          <img src="@/assets/img/u112.png" alt="">
          <p><span v-show="false">推荐</span> <span v-show="true">未推荐</span></p>
        </div>
        <div class="right">
          <h4>产品名称</h4>
          <h5>产品介绍</h5>
          <p>发布日期:2018-12-12 <span v-show="true">推荐</span><span v-show="false">推荐</span></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { PopupPicker } from 'vux'

export default {
  name: 'produce',
  components: {
    PopupPicker
  },
  data () {
    return {
      value: ['全部产品'],
      produceList: [['全部产品', '已推荐产品', '为推荐产品']],
      value2: ['1', ''],
      sortList: [{
        name: '网站建设',
        value: '1',
        parent: 0
      }, {
        name: '网络营销',
        value: '2',
        parent: 0
      }, {
        name: '网络基础',
        value: '3',
        parent: 0
      }, {
        name: '服务器搭建',
        value: '4',
        parent: 0
      }, {
        name: 'T-site建设1',
        value: '1-1',
        parent: '1'
      }, {
        name: 'T-site建设2',
        value: '1-2',
        parent: '1'
      }, {
        name: 'T-site建设3',
        value: '1-3',
        parent: '1'
      }, {
        name: 'T-site建设4',
        value: '1-4',
        parent: '1'
      }, {
        name: 'T-site建设5',
        value: '2-1',
        parent: '2'
      }]
    }
  },
  methods: {
    onChange (val) {
      console.log(val)
    }
  },
  mounted () {
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
    &>p{
      float: left;
      width: 50%;
      height: 100%;
    }
    & /deep/ .vux-cell-box{
      .weui-cell{
        padding: 0;
      }
      .weui-cell__ft{
        &::after{
          display: none;
        }
      }
      .vux-popup-picker-select{
        height: 0.9rem;
        line-height: 0.9rem;
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
        }
        h5{
          color: #717171;
          font-size: 0.28rem;
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
            margin-top: 0.05rem;
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
