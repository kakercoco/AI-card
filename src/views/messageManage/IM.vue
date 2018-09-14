/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-03 10:09:33
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-10 15:13:30
 */
<template>
  <div class="im" id="im">
    <canvas id="myCanvas"></canvas>
    <ul class="chat-list" id="chatList" @click="close_bottom" :class="char_list_top ? 'chat-list_top' : ''">

      <li class="clearfix" v-for="(item,i) in char_list" :key="i">
        <p class="tac">{{item.time}}</p>
        <div :class="item.from === 'me' ? 'right-message' : 'left-message'">
          <img :src="item.fead_src ? item.fead_src : '/static/image/moren.jpg'" alt="">
          <div class="content">

            <tpl :content="item.content" v-if="item.type === 'text'"></tpl>

            <div class="img" v-if="item.type === 'img'">
              <img class="previewer-demo-img" :src="item.content" @click="show(item)">
            </div>

          </div>
          <img src="/static/image/l.gif" class="loading" v-if="item.from === 'me' && item.is_loading">

        </div>
      </li>


    </ul>
    <div class="footer">
      <span @click="slideDownTalk = true">话术库</span>
      <p class="my-textarea">
        <group>
          <x-textarea v-model="value" autosize :rows="1"></x-textarea>
        </group>
      </p>
      <div class="fr">
        <!--<img src="@/assets/icon/face.png" alt="" v-if="!isEmotion" @click="close_bottom">-->
        <img src="@/assets/icon/face.png" alt="" @click="Emotio_open">
        <img src="@/assets/icon/add.png" alt="" v-if="value.length <= 0" @click="pic_open">
        <button v-else class="fr send" @click="formSubmit">发送</button>
      </div>

      <div class="my-emotion" v-if="isEmotion">
        <swiper show-dots dots-position="center" height="100px">
          <swiper-item class="swiper-demo-img">
            <i class="face one_face" v-if="index <= 29" v-for="(item, index) in face_list" :key="index" :class="item.value" @click="select_face(item)"></i>
          </swiper-item>

          <swiper-item class="swiper-demo-img">
            <i class="face one_face" v-if="index >=30 && index <= 59" v-for="(item, index) in face_list" :key="index" :class="item.value" @click="select_face(item)"></i>
          </swiper-item>

          <swiper-item class="swiper-demo-img">
            <i class="face one_face" v-if="index >=60 && index <= 89" v-for="(item, index) in face_list" :key="index" :class="item.value" @click="select_face(item)"></i>
          </swiper-item>

          <swiper-item class="swiper-demo-img">
            <i class="face one_face" v-if="index >=90 && index <= 104" v-for="(item, index) in face_list" :key="index" :class="item.value" @click="select_face(item)"></i>
          </swiper-item>
        </swiper>
      </div>

      <div class="my_picture" v-if="isPicture">

        <div class="file_input_frame">
          <form action="" id="myFrom">
          <input type="file" accept="image/*;capture=camera" class="file_input" name="avatar">
          </form>
          <img src="/static/image/p_icon.jpg">
          <p>照片</p>
        </div>
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


    <div v-transfer-dom>
      <previewer :list="img_list" ref="previewer" :options="options"></previewer>
    </div>
  </div>
</template>

<script>
import { Group, XTextarea, WechatEmotion as Emotion, Swiper, SwiperItem } from 'vux';
import {emojiAnalysis,__emojiObjs} from '@/utils/emoj';
import axios from 'axios';
import {dateFtt} from '@/utils/base';
import tpl from "./tpl";
import { Previewer,TransferDom  } from 'vux';
import UPNG from 'upng-js';
import {upload_img} from '@/api/upload_file';
export default {
  name: 'messageIM',
  components: {
    Group,
    Emotion,
    XTextarea,
    Swiper,
    SwiperItem,
    tpl,
    Previewer
  },
  data () {
    return {
      value:'',
      isEmotion: false,
      slideDownTalk: false,
      list: [],
      face_list:[],
      char_list:[],
      options: {
          getThumbBoundsFn (index) {
              let thumbnail = document.querySelectorAll('.previewer-demo-img')[index];
              let pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
              let rect = thumbnail.getBoundingClientRect();
              return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          }
      },
      img_list:[],
      my_chat_room_id:'',
      isPicture:false,
      c:{},//canvas对象
      img_max_width:50,
      test:'',
      char_list_top:false,//是否抬起

    }
  },
  directives: {
      TransferDom
  },
  watch:{

  },
  methods: {
    pic_open(){
        this.isEmotion = false;
        this.isPicture = true;
        this.char_list_top = true;
        this.$nextTick(()=>{
            this.img_select();
        });
    },
    Emotio_open(){
        this.isEmotion = true;
        this.isPicture = false;
        this.char_list_top = true;
    },
    close_bottom(){
        this.isEmotion = false;
        this.isPicture = false;
        this.char_list_top = false;

    },

    show(item){
        let index = 0;
        const src = item.original;
        for(let i = 0 ; i<this.img_list.length; i++){
          if(src === this.img_list[i].src){
              index = i;
              break;
          }
        }
        this.$refs.previewer.show(index);
    },

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
                this.my_chat_room_id = data.content;
                //this.$store.commit('user/SET_my_chat_room_id',data.content);
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
                else if (chat_data.type === 'img'){
                    chat_data.original = chat_content.original;
                    this.img_list.push({
                        src:chat_content.original
                    })
                }
                this.char_list.push(chat_data);
                this.all_srcollBtoom();
                console.log('收到消息',this.char_list);

            }

            //受到自己发送的消息
            else if(data.cmd === 'SendOver'){
                const id = data.content;
                for (let i = 0; i < this.char_list.length;i++){
                    if (this.char_list[i].id === id){
                        this.char_list[i].is_loading = false;
                        break;
                    }
                }
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
                        this.img_list.push({
                            src:data.original
                        })
                    }
                });
                this.all_srcollBtoom();
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


    formSubmit(){

        if (this.value == ''){
            alert('请输入内容！');
            return;
        }
        if(this.my_chat_room_id == ''){
            alert('聊天发生错误，请重新进入！');
            return;
        }
        const that = this;
        const id = Number(Math.random().toString().substr(3, 10) + Date.now()).toString(36);
        var obj = {};
        obj.type = 'text';
        obj.content = this.value;

        const speaktoDto = {
            "dialogId": this.my_chat_room_id,
            "id": id,
            "content":obj
        };

        const req = {
            "cmd": "SpeakToDialog",
            "content": JSON.stringify(speaktoDto)
        };

        this.$store.state.user.websocketConnection.send(JSON.stringify(req));

        obj.id = id;
        obj.time = dateFtt("yyyy-MM-dd hh:mm:ss", new Date());
        obj.is_loading = true;
        obj.fead_src = this.$store.state.user.info.image ? this.$store.state.user.info.image : '';
        obj.from = 'me';
        obj.content = emojiAnalysis([obj.content]);

        this.char_list.push(obj);

        this.value = '';
        this.frame_Reset();
        this.all_srcollBtoom();

    },

    frame_Reset(){
        this.isEmotion = false;
        this.isPicture = false;
        this.char_list_top = false;
    },

    //聊天内容滚动到底部
    all_srcollBtoom: function() {
        const that = this;
        this.$nextTick(function() {
            this.srcollBtoom();
            const imgs = document.querySelectorAll('.previewer-demo-img');

            for (let i = 0; i < imgs.length; i++) {
                if(!imgs[i].getAttribute('isLoad')){
                    imgs[i].onload = function () {
                        that.srcollBtoom();
                        this.setAttribute('isLoad',true);
                    }
                }

            }
        });
    },

    //滚动到底的计算
    srcollBtoom: function() {
        const ele = document.getElementById('im');
        ele.scrollTop = ele.scrollHeight;
    },

    img_select(){
      var imgType = 'image/png';
      const id = Number(Math.random().toString().substr(3, 10) + Date.now()).toString(36);
      const that = this;
      document.querySelector('.file_input').onchange = function (e) {
          var obj =e.target.files[0];//获取图片对象
          imgType = obj.type;
          if(!obj){
              return;
          }
          if(obj.type != 'image/jpeg' && obj.type != 'image/png'){
              alert('只支持jpg、png!');
              return;
          }
          if(obj.size > 2000000){
              alert('照片大小不能超过2MB');
              that.isEmotion = false;
              that.isPicture = false;
              return;
          }
          const url = URL.createObjectURL(obj);//转成url
          var img = new Image();
          img.src = url;
          img.onload = function (ev) {
              var end_widht = img.width > that.img_max_width ? that.img_max_width : img.width;
              var end_height = img.width > that.img_max_width ? that.img_max_width * img.height / img.width : img.height;
              that.c.drawImage(this,0,0,end_widht,end_height);

              var dta = that.c.getImageData(0,0,end_widht,end_height).data;
              var png = UPNG.encode([dta.buffer], end_widht, end_height, 100);
              const base64 = that.arrayBufferToBase64(png);

              const end_url = `data:image/jpeg;base64,${base64}`;

              //先把缩略图，前端发出去
              var obj = {
                  id,
                  type: 'img',
                  from: 'me',
                  fead_src: that.$store.state.user.image,
                  content: end_url,
                  is_loading: true
                  //original: src
              };
              that.char_list.push(obj);
              that.frame_Reset();
              that.all_srcollBtoom();
              that.uploadFile_p(obj);

              console.log(end_url);

          };

      }
    },

    uploadFile_p(obj){
        const ele = document.querySelector('#myFrom');
        var fd = new FormData(ele);
        let config = {
            headers: {'Content-Type': 'multipart/form-data'}
        };
        upload_img(fd).then(res => {
            if(res.data && res.data.url){
                const img_url = res.data.url;
                let end_obj = { ...obj };
                delete end_obj.from;
                delete end_obj.fead_src;
                delete end_obj.is_loading;
                end_obj.original = img_url;

                //找到本地插进去的那个，把真实路径插入进去
                for (let i = this.char_list.length - 1; i >= 0; i--) {
                    if (this.char_list[i].id === obj.id) {
                        this.char_list[i].original = img_url;
                        break;
                    }
                }

                this.img_list.push({
                    src:img_url
                });

                //图片上传成功，发送聊天
                var speaktoDto = {
                    "dialogId": this.my_chat_room_id,
                    "id": obj.id,
                    "content": end_obj
                };

                var req = {
                    "cmd": "SpeakToDialog",
                    "content": JSON.stringify(speaktoDto)
                };

                this.$store.state.user.websocketConnection.send(JSON.stringify(req));

            }

        })
       // axios.post('/index.php/api/Upload/index', fd, config)


    },

    canvas_init(){
        var canvas = document.querySelector('#myCanvas');
        this.c = canvas.getContext('2d');
    },

    arrayBufferToBase64(buffer ){
        var binary = '';
        var bytes = new Uint8Array( buffer );

        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return window.btoa( binary );
    }

  },

  mounted () {
      this.canvas_init();
      this.chat_watch();
      this.chat_init();
      this.face_list_init();
      this.chat_record();
      //this.img_select();

  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.im{
  background-color: #ebebeb;
  height: 100%;
  overflow: auto;
  padding-bottom:1.5rem;
  #myCanvas{
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
  .chat-list{
    background: #ebebeb;
    transition: transform 0.2s;
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
          .previewer-demo-img{
            width: 1.56rem;
            height: auto;
          }
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
        .loading{
          float: right;
          width: 20px;
          height: 20px;
          margin-right: 10px;
          margin-top: 10px;
        }
        .content{
          background-color: #fff;
          float: right;
          margin-right: 0.3rem;
          max-width: 5rem;
          padding: 0.2rem;
          position: relative;
          margin-top: 0.2rem;
          .previewer-demo-img{
            width: 1.56rem;
            height: auto;
          }
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
  .chat-list_top{
    transform: translateY(-103px);
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
    .my_picture{
      width: 100%;
      clear: both;
      height:100px;
      padding-top:10px;
      padding-bottom:10px;
      .file_input_frame{
        position: relative;
        width: 85px;
        height: 85px;
        text-align:center;
        overflow: hidden;
        .file_input{
          position:absolute;
          width: 100%;
          height:120px;
          top:-30px;
          left: 0;
        }
        img{
          width:50px;
          height:50px;

        }
        p{
          margin-top:5px;
        }
      }
    }
    .my-emotion{
      width: 100%;
      clear: both;
      height:100px;
      padding-top:10px;
      padding-bottom:10px;
      .vux-emotion{
        width: 0.98rem;
        text-align: center;
      }
      .one_face{
        display: inline-block;
        width:29px;
        height:29px;
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
