/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-07 15:05:29
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-28 15:43:16
 */
<template>
  <div class="say-setting">
    <div class="main">
      <h5>欢迎语设置</h5>
      <group>
        <x-textarea v-model="value" show-counter :max="100" autosize placeholder="请输入欢迎语"></x-textarea>
      </group>
      <p class="btn">
        <x-button type="primary" @click.native="set">提交</x-button>
      </p>
      <p class="demo-title">示例图</p>
    </div>
    <div class="demo clearfix">
      <p class="time">8月3日 晚上18:21</p>
      <div>
        <img src="@/assets/img/u112.png" alt="" class="fr avatar">
        <div class="content">
          <p>{{value}}</p>
          <ul>
            <li><img src="@/assets/img/card.png" alt="">进入我的名片</li>
            <li><img src="@/assets/icon/phone.png" alt="">拨打我的电话</li>
            <li><img src="@/assets/icon/wchat.png" alt="">添加我的微信</li>
            <li><img src="@/assets/icon/comment.png" alt="">查看我的动态</li>
            <li><img src="@/assets/icon/network.png" alt="">查看我们的公司官网</li>
          </ul>
        </div>
        <div class="demo-dialog"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Group, XTextarea, XButton } from 'vux'
import { employsetRead, employsetUpdate } from '@/api/calendar'

export default {
  name: 'saySetting',
  components: {
    Group,
    XButton,
    XTextarea
  },
  data () {
    return {
      value: '你好啊，很高兴认识你你好啊，很高兴认识你你好啊，很高兴认识你'
    }
  },
  methods: {
    get () {
      employsetRead()
        .then(res => {
          this.value = res.data.welcome_msg
        })
    },
    set () {
      const data = {
        ac: 'welcome_msg',
        welcome_msg: this.value
      }
      employsetUpdate(data)
        .then(res => {
          this.$router.back(-1)
        })
    }
  },
  mounted () {
    this.get()
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.say-setting{
  overflow: hidden;
  height: 100%;
  .main{
    padding: 0.3rem;
    h5{
      font-size: 0.32rem;
    }
    & /deep/ .weui-cells{
      &::after{
        border: none;
      }
      &::before{
        border: none;
      }
      textarea{
        font-size: 0.3rem;
        color: #717171;
      }
    }
    .demo-title{
      margin-top: 1rem;
      font-size: 0.32rem;
      color: #717171;
    }
    .btn{
      padding: 0 1rem;
      margin-top: 0.5rem;
    }
  }
  .demo{
    padding: 0.3rem;
    background-color: #ebebeb;
    position: relative;
    .demo-dialog{
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.4);
      left: 0;
      top: 0;
    }
    .time{
      text-decoration: underline;
      text-align: center;
      color: #717171;
      font-size: 0.22rem;
      margin-bottom: 0.3rem;
    }
    .avatar{
      width: 0.8rem;
      height: 0.8rem;
    }
    .content{
      background-color: #fff;
      width: 5rem;
      float: right;
      border-radius: 0.1rem;
      padding: 0.2rem;
      margin-right: 0.3rem;
      position: relative;
      &::before{
        content: '';
        width: 0.2rem;
        height: 0.2rem;
        position: absolute;
        right: -0.1rem;
        top: 0.3rem;
        background-color: #fff;
        transform: rotate(45deg)
      }
      &>p{
        font-size: 0.28rem;
        color: #333;
        margin-bottom: 0.4rem;
        word-break:break-all;
      }
      li{
        height: 0.8rem;
        padding: 0.15rem 0.2rem;
        line-height: 0.5rem;
        border-bottom: 1px solid #ddd;
        img{
          float: left;
          height: 100%;
          margin-right: 0.3rem;
        }
      }
    }
  }
}
</style>
