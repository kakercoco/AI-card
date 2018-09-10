/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-03 10:09:33
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-10 15:13:30
 */
<template>
  <div class="im">
    <ul class="chat-list">
      <li class="clearfix">
        <p class="tac">8月3日  晚上18:21</p>
        <div class="left-message">
          <img src="@/assets/img/u112.png" alt="">
          <p>嗯，好的</p>
        </div>
      </li>
      <li class="clearfix">
        <p class="tac">8月3日  晚上18:21</p>
        <div class="right-message">
          <img src="@/assets/img/u112.png" alt="">
          <p>嗯，好的</p>
        </div>
      </li>
      <li class="clearfix">
        <p class="tac">8月3日  晚上18:21</p>
        <div class="right-message">
          <img src="@/assets/img/u112.png" alt="">
          <p>你好，我是飞升科技的默默生，欢迎进入我的名片，有什么我可以你的忙？可以在这跟我实时沟通。</p>
        </div>
      </li>
      <li class="clearfix">
        <p class="tac">8月3日  晚上18:21</p>
        <div class="left-message">
          <img src="@/assets/img/u112.png" alt="">
          <p>明日可约个时间商谈业务进展明日可约个时间商谈业务进展明日可约个时间商谈业务进展明日可约个时间商谈业务进展明日可约个时间商谈业务进展</p>
        </div>
      </li>
    </ul>
    <div class="footer">
      <span @click="slideDownTalk = true">话术库</span>
      <p class="my-textarea">
        <group>
          <x-textarea v-model="value" autosize :rows="1" @on-focus="isEmotion = false"></x-textarea>
        </group>
      </p>
      <div class="fr">
        <img src="@/assets/icon/face.png" alt="" v-if="!isEmotion" @click="isEmotion = !isEmotion">
        <img src="@/assets/icon/face.png" alt="" v-if="isEmotion" @click="isEmotion = !isEmotion">
        <img src="@/assets/icon/add.png" alt="" v-if="value.length <= 0">
        <button v-else class="fr send">发送</button>
      </div>
      <div class="my-emotion" v-if="isEmotion">
        <swiper show-dots dots-position="center">
          <swiper-item class="swiper-demo-img">
            <emotion is-gif v-for="(item, index) in list" :key="item" v-if="index < 35" @click.native="pushEmotion(item)">{{item}}</emotion>
          </swiper-item>
          <swiper-item class="swiper-demo-img">
            <emotion is-gif v-for="(item, index) in list" :key="item" v-if="index>=35 && index<70">{{item}}</emotion>
          </swiper-item>
          <swiper-item class="swiper-demo-img">
            <emotion is-gif v-for="(item, index) in list" :key="item" v-if="index>=70">{{item, index}}</emotion>
          </swiper-item>
        </swiper>
      </div>
    </div>
    <div class="talk-list" v-if="slideDownTalk">
      <h4>选择话术</h4>
      <div class="talk-group">
        <a class="active">最近使用</a>
        <a>常用话术</a>
        <a>常用话术</a>
        <a>常用话术</a>
        <a>第一组</a>
        <a>第二组</a>
      </div>
      <div class="talk-infor">
        <ul>
          <li @click="slideDownTalk = false">
            <p class="title">预约工作</p>
            <p class="content">好好学习，天天向上</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Group, XTextarea, WechatEmotion as Emotion, Swiper, SwiperItem } from 'vux'
export default {
  name: 'messageIM',
  components: {
    Group,
    Emotion,
    XTextarea,
    Swiper,
    SwiperItem
  },
  data () {
    return {
      value: '',
      isEmotion: false,
      slideDownTalk: false,
      list: ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘', '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手', '激动', '街舞', '献吻', '左太极', '右太极']
    }
  },
  methods: {
    pushEmotion (val) {
      this.value += `[${val}]`
    }
  },
  mounted () {
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.im{
  background-color: #f5f5f5;
  height: 100%;
  overflow: auto;
  padding-bottom: 300px;
  .chat-list{
    li{
      padding: 0.6rem 0.3rem 0;
      &>p{
        font-size: 0.26rem;
        color: #717171;
        margin-bottom: 0.3rem;
        text-decoration: underline;
      }
      .left-message{
        img{
          float: left;
          width: 0.9rem;
          height: 0.9rem;
        }
        p{
          background-color: #fff;
          float: left;
          margin-left: 0.3rem;
          max-width: 5rem;
          padding: 0.2rem;
          position: relative;
          margin-top: 0.2rem;
          &:after{
            content: '';
            background-color:#fff;
            position: absolute;
            top: 0.2rem;
            left: -0.12rem;
            width: 0.2rem;
            height: 0.2rem;
            transform: rotate(45deg)
          }
        }
      }
      .right-message{
        img{
          float: right;
          width: 0.9rem;
          height: 0.9rem;
        }
        p{
          background-color: #fff;
          float: right;
          margin-right: 0.3rem;
          max-width: 5rem;
          padding: 0.2rem;
          position: relative;
          margin-top: 0.2rem;
          &:after{
            content: '';
            background-color:#fff;
            position: absolute;
            top: 0.2rem;
            right: -0.12rem;
            width: 0.2rem;
            height: 0.2rem;
            transform: rotate(45deg)
          }
        }
      }
    }
  }
  .footer{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    padding: 0.15rem 0.3rem;
    span{
      float: left;
      border: 1px solid #5977fe;
      border-radius: 5px;
      height: 38px;
      line-height: 38px;
      width: 60px;
      text-align: center;
      color: #5977fe;
      font-size: 15px;
    }
    img{
      width: 30px;
      height: 30px;
      margin-top: 3px;
      &:last-child{
        margin-left: 10px;
      }
    }
    .send{
      height: 38px;
      background-color: #5977fe;
      color: #fff;
      border: none;
      padding: 0 10px;
      border-radius: 5px;
      margin-left: 10px;
    }
    .my-textarea{
      float: left;
      width: calc(100% - 170px);
      margin-left: 10px;
      border: 1px solid #5977fe;
      border-radius: 5px;
      font-size: 18px;
      overflow: hidden;
      & /deep/ .weui-cells{
        margin-top: 0;
        .weui-cell{
          padding: 6px 15px;
        }
        .weui-textarea{
          max-height: 100px;
        }
      }
    }
    .my-emotion{
      width: 100%;
      clear: both;
      height: 200px;
      padding-top: 20px;
      .vux-emotion{
        width: 0.98rem;
        text-align: center;
      }
    }
  }
  .talk-list{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 70%;
    background-color: #fff;
    h4{
      height: 1rem;
      line-height: 1rem;
      border-bottom: 1px solid #2f80ed;
      text-align: center;
      font-size: 0.36rem;
    }
    .talk-group{
      float: left;
      width: 1.6rem;
      height: 100%;
      overflow: auto;
      padding: 0.2rem;
      border-right: 1px solid #2f80ed;
      a{
        width: 100%;
        display: block;
        height: 0.7rem;
        line-height: 0.7rem;
        text-align: center;
        font-size: 0.28rem;
        color: #2d2d2d;
      }
      .active{
        text-decoration: underline;
        color: #5977fe;
      }
    }
    .talk-infor{
      padding: 0.3rem;
      float: left;
      width: calc(100% - 1.6rem);
      height: 100%;
      overflow: auto;
      li{
        height: 1.2rem;
        border-bottom: 1px solid #ddd;
        color: #717171;
        padding: 0.2rem 0.3rem;
        .title{
          font-size: 0.2rem;
          height: 0.35rem;
          overflow: hidden;
        }
        .content{
          font-size: 0.26rem;
          height: 0.35rem;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
