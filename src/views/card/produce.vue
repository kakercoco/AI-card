/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-11 17:04:26
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-20 20:49:11
 */
<template>
  <div class="produce">
    <div class="picker">
      <div class="tab tab-1">
        <span>全部产品</span>
        <div class="tab-wrap">
          <ul>
            <li>全部产品 <x-icon type="ios-checkmark-empty" class="icon-checked"></x-icon></li>
            <li>已推荐产品 <x-icon type="ios-checkmark-empty" class="icon-checked"></x-icon></li>
            <li>未推荐产品 <x-icon type="ios-checkmark-empty" class="icon-checked"></x-icon></li>
          </ul>
        </div>
      </div>
      <div class="tab">
        <span>产品分类</span>
      </div>
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
// import { produceList } from '@/api/card'
import axios from 'axios'

export default {
  name: 'produce',
  components: {
    PopupPicker
  },
  data () {
    return {
      baseUrl: '/index.php'
    }
  },
  methods: {
    getProduceList () {
      const data = {
        method: 'xcx.card.gcat_list',
        id: 0
      }
      axios.post(`${this.baseUrl}/api/Scratch/webClient`,
        data, {
          proxyTable: {
            '/index.php': {
              target: 'http://jiatui.api.com',
              changeOrigin: true,
              pathRewrite: {
                '^/index.php': '/index.php'
              }
            }
          }
        })
        .then(res => {
          console.log(res.data.data)
        })
    }
  },
  mounted () {
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
    }
    .tab-1{
      ul{
        background-color: #fff;
        li{
          height: 0.9rem;
          .icon-checked{
            fill: #0fd35d;
            width: 0.3rem;
            height: 0.3rem;
            float: right;
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
