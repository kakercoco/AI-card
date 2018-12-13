/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-07 15:05:29
 * @Last Modified by: Jessica
 * @Last Modified time: 2018-10-13 17:59:04
 */
<template>
  <div class="say-setting">
    <div class="main first_cen">
      <group>
        <x-textarea v-model="value" show-counter :max="100" autosize placeholder="请输入欢迎语"></x-textarea>
      </group>
      <p class="btn new_btn">
        <x-button type="primary" @click.native="set">提交</x-button>
      </p>
      <p class="demo-title">效果图</p>
    </div>
    <div class="demo clearfix yyf_demo_list">
      <p class="time">8月3日 晚上18:21</p>
      <div>
        <img src="@/assets/img/u112.png" alt="" class="fr avatar">
        <div class="content">
          <p>{{value}}</p>
          <span class="new_title">通过我的名片你还可以：</span>
          <ul class="set_top">
            <li>

              <span><img src="@/assets/icon/liao_ren.png" alt=""></span>进入我的名片
            </li>
            <li><span><img src="@/assets/icon/liao_diannao.png" alt=""></span>查看我们公司官网</li>
            <li><span><img src="@/assets/icon/liao_dong.png" alt=""></span>查看我们公司产品</li>
            <li><span><img src="@/assets/icon/liao_quan.png" alt=""></span>查看我的动态</li>
          </ul>
          <ul class="new_list">
            <li>
              <span>拨打我的电话</span>
              <img src="@/assets/icon/33_03.png" alt="">
            </li>
            <li>
              <span>添加我的微信</span>
              <img src="@/assets/icon/33_06.png" alt="">
            </li>
            <li>
              <span>请TA联系我</span>
              <img src="@/assets/icon/33_08.png" alt="">
            </li>
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
    background-color: #ebebeb;
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
        color: #353535;
        font-family: '黑体';
      }
    }
    .demo-title{
      margin-top: 0rem;
      font-size: 0.3rem;
      color: #717171;
      background: #fff;
      height: 0.8rem;
      line-height: 0.8rem;
      padding-left: 0.3rem;
      font-family: '黑体';
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
      height: 500px;
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
        margin-bottom: 0.2rem;
        word-break:break-all;
      }
      li{
        height: 0.8rem;
        padding: 0.15rem 0.2rem;
        line-height: 0.5rem;
        border-bottom: 1px solid #ddd;
        img{
          height: 100%;
        }
      }
    }
  }
}
</style>
