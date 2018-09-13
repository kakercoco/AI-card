/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-03 10:09:33
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-10 15:13:30
 */
<template>
  <div class="im">
    <ul class="chat-list">

      <li class="clearfix" v-for="(item,i) in char_list" :key="i">
        <p class="tac">8月3日  晚上18:21</p>
        <div class="left-message">
          <img src="@/assets/img/u112.png" alt="">
          <div class="content">
            <tpl :content="item.content"></tpl>
          </div>

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
            <i class="face one_face" v-if="index <= 59" v-for="(item, index) in face_list" :key="index" :class="item.value" @click="select_face(item)"></i>
          </swiper-item>
          <swiper-item class="swiper-demo-img">
            <i class="face one_face" v-if="index >=60 && index <= 104" v-for="(item, index) in face_list" :key="index" :class="item.value" @click="select_face(item)"></i>
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
import { Group, XTextarea, WechatEmotion as Emotion, Swiper, SwiperItem } from 'vux';
import {emojiAnalysis,__emojiObjs} from '@/utils/emoj';
import axios from 'axios';
import {dateFtt} from '@/utils/base';
import tpl from "./tpl";
export default {
  name: 'messageIM',
  components: {
    Group,
    Emotion,
    XTextarea,
    Swiper,
    SwiperItem,
      tpl
  },
  data () {
    return {
      value:'',
      isEmotion: false,
      slideDownTalk: false,
      list: [],
      face_list:[],
        char_list:[]

    }
  },
  methods: {
    pushEmotion (val) {
      this.value += `[${val}]`
    },
    chat_init(){
        const req = {
            "cmd": "GetChat",
            "content": this.$route.params.id//对方的id
        };
        this.$store.state.user.websocketConnection.send(JSON.stringify(req));
    },
    chat_watch(){
        this.$store.state.user.websocketConnection.onmessage = (res)=>{
            const data = JSON.parse(res.data);
            var chat_data = {};
            if(data.cmd === 'GetChat' && data.content){
                this.$store.commit('user/SET_my_chat_room_id');
            }
            else if(data.cmd === 'SpeakFromDialog'){
                let obj = JSON.parse(data.content);
                let chat_content = JSON.parse(obj.content);
                chat_data = {
                    time: dateFtt("yyyy-MM-dd hh:mm:ss", new Date(obj.createTime)),
                    type: chat_content.type,
                    content: chat_content.content,
                    fead_src: '',
                    from: 'others',
                };
                //如果是text类型，要重置content类型
                if (chat_data.type === 'text'){
                    chat_data.content = emojiAnalysis([chat_data.content]);
                }
                this.char_list.push(chat_data);

            }









        };
    },

    chat_record(){
        const that = this;
        const user = this.$store.state.user.info;

        if(!user.message_id){
            alert('用户信息获取失败！');
            return;
        }

        const data = {
            userId: user.message_id,//当前操作者的id
            aimId:this.$route.params.id,//对方的id
            token: this.$store.state.user.my_chat_token,
        };


        axios({
            method:"POST",
            url:'http://192.168.40.180:8080/chatapi/getChat',
            data:JSON.stringify(data)
        }).then((res)=>{

            if(res.status === 200 && res.data && res.data.message){
                const list = JSON.parse(res.data.message);
                let others_image = user.image;//h5所有者的头像
                list.map((val,i)=>{
                    const time = dateFtt("yyyy-MM-dd hh:mm:ss", new Date(val.createtime));

                    let data = JSON.parse(val.content);
                    let obj = {};
                    obj.fead_src = val.speaker == user.message_id ? others_image : '';

                    obj.from = val.speaker == user.message_id ? 'me' : 'others';
                    obj.time = time;
                    if(data.type === 'text'){
                        obj.type = 'text';
                        obj.content = emojiAnalysis([data.content]);
                        this.char_list.push(obj);

                    }
                    else if (data.type === 'img'){
                        obj.type = 'img';
                        obj.content = data.content;
                        obj.original = data.original;
                        this.char_list.push(obj);
                    }


                });

                console.log(this.char_list);


            }

        })


    },

    face_list_init(){
        const list_obj = __emojiObjs;
        let list = [];
        let index = 0;
        for (let i in list_obj){
            const obj = {
                id:index,
                title:i,
                value: list_obj[i]
            };
            this.face_list.push(obj);
            index++;
        }
       // this.face_list = list;
        //debugger;

    },

    select_face(e){
        this.value = `${this.value}[${e.title}]`;
    },

    test(){
        const str = '按时打算s[发呆][调皮]12ss312';
        obj.content = emojiAnalysis([str]);
    },





  },

  mounted () {
      this.chat_watch();
      this.chat_init();
      this.face_list_init();
      this.chat_record();

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
        .content{
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
        .content{
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
      .one_face{
        display: inline-block;
        width: 0.58rem;
        height: 0.58rem;
        margin-left: 0.1rem;
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
