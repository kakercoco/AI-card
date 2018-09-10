/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-10 16:09:36
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-10 20:40:41
 */
<template>
  <div class="edit-card">
    <div class="my-card">
      <img src="@/assets/card/1.png" alt="" class="card-bg">
      <div class="card-infor card-template-1">
        <p class="company">上海飞天科技有限公司</p>
        <p class="bio">
          <img src="@/assets/img/u112.png" alt="" class="avatar">
          <span class="name">Top Man</span>
          <span class="job">销售总监</span>
        </p>
        <p class="phone"><i class="iconfont icon-dianhua1"></i> 156-0000-0000</p>
        <p class="address"><i class="iconfont icon-dingwei"></i> 上海市虹口区赤峰路永乐大厦7F</p>
      </div>
    </div>
    <h5>名片样式</h5>
    <scroller ref="scrollerEvent" lock-y :scrollbar-x='false' style="margin-top: 0.2rem;">
     <div class="template-list">
        <img src="@/assets/card/1.png" alt="" class="active">
        <img src="@/assets/card/2.png" alt="">
        <img src="@/assets/card/3.png" alt="">
        <img src="@/assets/card/4.png" alt="">
        <img src="@/assets/card/5.png" alt="">
        <img src="@/assets/card/6.png" alt="">
        <img src="@/assets/card/7.png" alt="">
        <img src="@/assets/card/8.png" alt="">
        <img src="@/assets/card/9.png" alt="">
        <img src="@/assets/card/10.png" alt="">
      </div>
    </scroller>
    <h5>名片头像</h5>
    <div class="card-avatar">
      <img src="@/assets/img/u112.png" alt="">
    </div>
    <h5>个人信息</h5>
    <div class="self-message">
      <group>
        <x-input title="手机:" placeholder="未填写信息" v-model="messageForm.phone"></x-input>
        <x-input title="座机:" placeholder="未填写信息" v-model="messageForm.tel"></x-input>
        <x-input title="微信:" placeholder="未填写信息" v-model="messageForm.wechat"></x-input>
        <x-input title="邮箱:" placeholder="未填写信息" v-model="messageForm.email"></x-input>
        <x-input title="公司:" placeholder="未填写信息" v-model="messageForm.company"></x-input>
        <x-input title="地址:" placeholder="未填写信息" v-model="messageForm.address"></x-input>
      </group>
    </div>
    <h5>个人简介</h5>
    <div class="self-bio">
      <group>
        <x-textarea placeholder="请输入文字" v-model="bio" autosize></x-textarea>
      </group>
    </div>
    <h5>推荐产品 <span class="fr">产品管理</span></h5>
    <div class="produce-list">
      <p class="tac">暂无推荐商品</p>
    </div>
    <h5>推荐案例 <span class="fr">案例管理</span></h5>
    <div class="produce-list">
      <p class="tac">暂无推荐案例</p>
    </div>
    <h5>录制语音</h5>
    <div class="self-audio">
      <p>暂无声音录制，请点击录制 <x-icon type="ios-plus-outline"></x-icon></p>
    </div>
    <h5>我的图片</h5>
    <div class="self-img clearfix">
      <img src="@/assets/img/u112.png" alt="">
    </div>
    <h5>添加标签</h5>
    <div class="self-tag clearfix">
      <ul>
        <li>我的</li>
        <li><x-icon type="ios-plus-empty" class="icon-insert" @click.native="insertTagDialog = true"></x-icon></li>
      </ul>
    </div>
    <p class="self-btn">
      <x-button type="primary">保存</x-button>
    </p>
    <x-dialog v-model="insertTagDialog" :hide-on-blur="true">
      <div class="insert-dialog">
        <h4>添加自定义标签</h4>
        <group>
          <x-input v-model="value"></x-input>
        </group>
        <p class="btn">
          <button class="btn-cancle" @click="insertTagDialog = false">取消</button>
          <button class="btn-primary">确定</button>
        </p>
      </div>
    </x-dialog>
  </div>
</template>

<script>
import { Scroller, XInput, Group, XButton, Cell, XTextarea, XDialog } from 'vux'

export default {
  name: 'editCard',
  components: {
    Scroller, XInput, Group, XButton, Cell, XTextarea, XDialog
  },
  data () {
    return {
      messageForm: {
        phone: '',
        tel: '',
        wechat: '',
        email: '',
        company: '',
        address: ''
      },
      bio: '',
      value: '',
      insertTagDialog: false
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.edit-card{
  overflow: auto;
  height: 100%;
  padding: 0.5rem 0.3rem;
  .my-card{
    border-radius: 0.1rem;
    overflow: hidden;
    position: relative;
    height: 4.5rem;
    .card-bg{
      width: 100%;
      height: 4.5rem;
      position: absolute;
      top: 0;
      left: 0;
    }
    .card-infor{
      padding: 0.3rem;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      font-weight: bold;
    }
  }
  h5{
    font-size: 0.34rem;
    color: #717171;
    height: 1rem;
    line-height: 1.2rem;
    font-weight: normal;
    margin-top: 0.1rem;
    span{
      color: #5977fe;
      font-size: 0.26rem;
    }
  }
  .template-list{
    height: 1rem;
    width: 17.6rem;
    img{
      width: 1.4rem;
      height: 1rem;
      border-radius: 0.05rem;
      margin-left: 0.4rem;
      float: left;
      &:first-child{
        margin-left: 0;
      }
      &.active{
        border: 1px solid #5977fe;
      }
    }
  }
  .card-avatar{
    margin-top: 0.2rem;
    img{
      width: 2rem;
      height: 2rem;
    }
  }
  .self-message{
    & /deep/ .weui-cells{
      .weui-label{
        font-size: 0.32rem;
        color: #717171;
        font-weight: normal;
      }
    }
  }
  .self-bio{
     & /deep/ .weui-cells{
       &::after{
         display: none;
       }
       &::before{
         display: none;
       }
     }
  }
  .produce-list{
    &>p{
      font-size: 0.24rem;
      color: #717171;
      clear: both;
    }
  }
  .self-audio{
    &>p{
      text-align: center;
      font-size: 0.24rem;
      color: #717171;
      .vux-x-icon{
        fill: #5977fe;
        width: 0.3rem;
        height: 0.3rem;
      }
    }
  }
  .self-img{
    img{
      width: 2rem;
      height: 2rem;
      margin-right: 0.2rem;
      float: left;
    }
  }
  .self-tag{
    li{
      margin-top: 0.4rem;
      height: 0.5rem;
      border-radius: 0.5rem;
      line-height: 0.5rem;
      width: 1.4rem;
      text-align: center;
      background-color: #f4f4f4;
      float: left;
      margin-right: 0.4rem;
      color: #717171;
    }
  }
  .self-btn{
    margin: 1rem 0;
    padding: 0 1rem;
  }
  .insert-dialog{
    padding-bottom: 0.3rem;
    h4{
      font-size: 0.3rem;
      color: #717171;
      margin-top: 0.3rem;
      font-weight: normal;
    }
    .btn{
      margin-top: 0.5rem;
    }
  }
}
</style>
