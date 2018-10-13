<template>
  <div id="app">
    <div class="v_console_show" @click="v_console_click"></div>
    <div class="all_dialog" :class="dialog.is_show ? 'all_dialog_show' : ''">
      <div v-if="dialog.is_show">
        <img :src="dialog.wx_image">
        <div v-html="dialog.content" class="content"></div>
        <p class="time">{{dialog.time}}</p>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import { setToken } from '@/utils/auth'
import { get_user_info } from '@/api/user_info'
import { dateFtt, config, all_srcollBtoom } from '@/utils/base'
import { get_users } from '@/api/message'
import { not_online } from '@/api/chart'
import { emojiAnalysis, __emojiObjs } from '@/utils/emoj'
import axios from 'axios';
if (process.env.NODE_ENV === 'development') {
  var my_config = require('../config/index')
}
export default {
  name: 'App',
  data () {
    return {
      dialog: {
        is_show: false,
        timer: null,
        wx_image: '',
        content: '',
        time: '',
        heartbeat: null
      },
        heartbeat:null,
        v_console_num:0
    }
  },
  created () {
    if (process.env.NODE_ENV === 'development') {
      setToken(my_config.dev.token)
    }

  },
  methods: {
    v_console_click(){
        this.v_console_num ++;
        if(this.v_console_num >= 4){
            document.querySelector('#__vconsole').style.display = 'block';
            this.v_console_num = 0;
            alert('1.8');
        }
    },
    get_user_info () {
      get_user_info().then(res => {
        if (res.data) {
          this.$store.commit('user/SET_INFO', res.data)
          this.webSocket_init()
        }
      })
    },

    webSocket_init () {
      console.log('聊天开始连接');
      const Socket_data = new WebSocket(this.$store.state.user.chat_ws)
      this.$store.commit('user/SET_websocket', Socket_data)

      this.$store.state.user.websocketConnection.onopen = () => {
        console.log('聊天连接成功');
        this.webSocket_login();//登陆
        this.webSocket_error();//错误
        this.webSocket_close();//关闭
        this.send_heartbeat();//心跳
      }
    },

    //登录
    webSocket_login () {
      const loginDto = {
        userName: this.$store.state.user.info.message_name, // 用户名
        timestamp: Date.now(),
        platform: 'zhentui',
        role: 1, // 角色
        authority: 1, // 权限
        tcloud: '',
        purpose: 2, // 聊天目的
        token: '', // 后台给我的
        nickName: this.$store.state.user.info.card_name // 名片上的名字
      }

      const req = {
        cmd: 'PlatformLogin',
        content: loginDto
      }
      this.$store.state.user.websocketConnection.send(JSON.stringify(req))
      this.chat_watch()
    },

    GetChat(id){
        if(id && this.$store.state.user.websocketConnection != null){
            const req = {
                "cmd": "GetChat",
                "content": id//对方的id
            };
            this.$store.state.user.websocketConnection.send(JSON.stringify(req));
            this.chat_record();
        }

    },

      //监听
    chat_watch () {
        const that = this;
      this.$store.state.user.websocketConnection.onmessage = res => {
        const data = JSON.parse(res.data)
        // 如果返回是登录信息
        if (data.cmd === 'LoginSuccess' && data.content) {
            const my = JSON.parse(data.content)
            this.$store.commit('user/SET_my_chat_token', my.token)

            console.log('LoginSuccess返回员工message_id：', my.id);
            console.log('card/read返回员工message_id：',this.$store.state.user.info.message_id);
            // 判断员工信息中是否包含message_id
            if (!this.$store.state.user.info.message_id) {
                this.$store.commit('user/SET_my_message_id', my.id)
            }

            //GetChat 和 聊天记录
            //如果在聊天页面，则GetChat，不然就不GetChat
            if(this.$route.path === '/messageIM' && this.$route.query.id){
                this.$store.dispatch('chat/GetChat',this.$route.query.id);
                this.$store.dispatch('chat/chat_record',{
                    id:this.$route.query.id,
                    vm:this,
                });
            }

        } else if (data.cmd === 'GetChat' && data.content) {
          this.$store.commit('chat/SET_my_chat_room_id', data.content)
          console.log('GetChat成功！,房间号：', data.content)
        } else if (
          data.cmd === 'SpeakFromDialog' &&
          this.$route.path != '/messageIM'
        ) {
          this.message_logic(res)
        } else if (
          data.cmd === 'SpeakFromDialog' &&
          this.$route.path === '/messageIM'
        ) {
          this.chat_logic(res)
        } else if (data.cmd === 'SendOver' && data.content) {
          this.$store.commit('chat/HIDE_loading', data.content)
        } else if (data.cmd === 'Trans' && data.content) {
          let user = JSON.parse(data.content)
          this.$store.commit('app/ADD_Unread')
          if (this.dialog.timer === null) {
            this.dialog.wx_image = user.wx_image
            this.dialog.content = config[user.type]
              ? user.wx_name + config[user.type]
              : ''
            this.dialog.is_show = true
            this.dialog.is_ready = false
            this.dialog.time = dateFtt('hh:mm', new Date(user.create_time*1000))
            this.dialog.timer = setTimeout(() => {
              this.dialog.is_show = false
              this.dialog.timer = null
              this.dialog.wx_image = ''
              this.dialog.content = ''
              this.dialog.time = ''
              clearTimeout(this.dialog.timer)
            }, 2000)
          }
        } else if (data.cmd === 'Error') { } else if (data.cmd === 'Offline' && data.content) {
          const message_id = data.content.split(',')[0]
          const content_id = data.content.split(',')[1]
          const list = this.$store.state.chat.char_list
          let content = '收到一条消息，请点开查看详情！'
          for (let i = list.length - 1; i >= 0; i--) {
            if (list[i].id && list[i].id === content_id) {
              if (list[i].type === 'text') {
                content = list[i].copy_content
              } else if (list[i].type === 'img') {
                content = '一张图片，请点开查看详情！'
              } else if (list[i].type === 'shop') {
                content = '一个产品信息，请点开查看详情！'
              }
              break
            }
          }

          not_online({
            message_id,
            text: content,
            time: Date.now(),
            name: this.$store.state.user.info.username
          }).then(e => {})
        }

        //异常断开，需要重新连接
        else if(data.cmd === 'Disconnect'){
            that.again_connect();
        }

        //在其它地方登陆
        else if(data.cmd === 'OtherLogin'){
            console.log('您在其它地方登陆，是否重新连接');
            this.$vux.confirm.show({
                title: '提示',
                content: '您在其它地方登陆，是否重新连接',
                onCancel () {
                    console.log('没有重连');
                },
                onConfirm () {
                    console.log('点击重连');
                    that.again_connect();
                }
            })
        }
      }
    },

    //重新连接
    again_connect(){
        this.$store.state.user.websocketConnection.close();//先关闭
        this.webSocket_init();
    },

    // 消息列表逻辑
    message_logic (res) {
      const data = JSON.parse(res.data)
      if (data.content) {
        const chat_obj = JSON.parse(data.content)
        console.log(chat_obj)
        // 存在内容
        if (chat_obj.content) {
          chat_obj.content_obj = JSON.parse(chat_obj.content)
          var end_obj = this.create_message(chat_obj)

          // 判断这个用户是否在列表中，如果再列表中，直接插入消息
          let isHave = false
          let messageList = this.$store.state.message.messageList
          let end_one = {}
          for (let i = 0; i < messageList.length; i++) {
            if (messageList[i].message_id == chat_obj.speakerId) {
              isHave = true
              // 直接插入
              Object.assign(messageList[i], end_obj)
              messageList[i].num++
              // 删除那个 插入到第一个
              end_one = messageList[i]
              messageList.splice(i, 1)
              break
            }
          }
          // 如果存在，则插入到列表第一个
          if (isHave) {
            this.$store.commit('message/Unshift_messageList', end_one)
          }
          // 不存在，做请求
          else {
            // 做请求要信息
            get_users({
              message_id: chat_obj.speakerId
            }).then(ev => {
              if (ev.code === 200 && ev.data && ev.data instanceof Array) {
                const user = ev.data[0]
                const message = {
                  is_read: 0,
                  num: 1,
                  message_id: chat_obj.speakerId
                    ? chat_obj.speakerId
                    : user.message_id,
                  uid: user.id,
                  wx_image: user.wx_image,
                  wx_name: user.wx_name
                }
                Object.assign(message, end_obj)
                this.$store.commit('message/Unshift_messageList', message)
              }
            })
          }
        }
      }
    },

    create_message (data) {
      let end_obj = {}
      end_obj.message_id = data.speakerId
      end_obj.last = data.content
      end_obj.time = dateFtt('yyyy-MM-dd', new Date(data.createTime))
      end_obj.last_content = {}
      if (data.content_obj.type === 'text') {
        end_obj.last_content.type = 'text'
        end_obj.last_content.content = data.content_obj.content
      } else if (data.content_obj.type === 'img') {
        end_obj.last_content.type = 'img'
        end_obj.last_content.original = data.content_obj.original
      } else if (data.content_obj.type === 'shop') {
        end_obj.last_content.type = 'shop'
        end_obj.last_content.p_id = data.content_obj.p_id
      }
      return end_obj
    },

    create_shop (data) {
        const obj = {
            type: 'shop',
            p_class: data.p_class,
            p_id: data.p_id,
            p_image: data.p_image,
            p_name: data.p_name,
            p_price_sell: data.p_price_sell,
            p_title: '测试',
            content: ''
        }
        return obj
    },

    chat_logic (res) {
      var Customer_id = this.$route.query.id;
      if(!Customer_id){
          alert('聊天对象id不能为空');
      }
      const data = JSON.parse(res.data)
      var chat_data = {}
      let obj = JSON.parse(data.content)
      if(Customer_id == obj.speakerId){
          let chat_content = JSON.parse(obj.content)
          chat_data = {
              time: dateFtt('yyyy-MM-dd hh:mm:ss', new Date(obj.createTime)),
              type: chat_content.type,
              content: chat_content.content,
              fead_src: '',
              from: 'others'
          }
          // 如果是text类型，要重置content类型
          if (chat_data.type === 'text') {
              chat_data.content = emojiAnalysis([chat_data.content])
              console.log(chat_data.content);
          } else if (chat_data.type === 'img') {
              if(chat_data.content.indexOf('wxfile') > -1 || chat_data.content.indexOf('blob:http') > -1){
                  chat_data.content = chat_content.original;
              }
              chat_data.original = chat_content.original
              this.$store.commit('chat/PUSH_img_list', {
                  src: chat_content.original
              })
          } else if (chat_data.type === 'shop') {
              Object.assign(chat_data, this.create_shop(chat_content))
          }
          this.$store.commit('chat/PUSH_char_list', chat_data)
          all_srcollBtoom(this)
      }
    },

    webSocket_error(){
        const that = this;
        this.$store.state.user.websocketConnection.onerror = (e)=>{
            that.again_connect();
        }
    },

    webSocket_close(){
          const that = this;
          this.$store.state.user.websocketConnection.onclose = (e)=>{
              that.webSocket_init();
          }
    },
      //心跳
    send_heartbeat () {
      if(this.heartbeat === null){
          this.heartbeat = setTimeout(()=>{
              const req = {
                  cmd: 'HeartBeat'
              }
              if(this.$store.state.user.websocketConnection != null){
                  this.$store.state.user.websocketConnection.send(JSON.stringify(req));
              }
              console.log('发送心跳')
              clearTimeout(this.heartbeat);//清除这次的定时器
              this.heartbeat = null;//重置开关
              this.send_heartbeat();
          },300000)
      }


    }
  },
  mounted () {
    this.get_user_info()
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  .all_dialog {
    width: 100%;
    height: 1.2rem;
    background: #fff;
    position: fixed;
    top: -1.3rem;
    left: 0;
    transition: all 0.2s;
    z-index: 999;
    box-shadow: 0 3px 10px #d6e1fb;
    .content {
      width: 65%;
      float: left;
      height: 100%;
      line-height: 1.2rem;
      margin-left: 10px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    img {
      float: left;
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 100px;
      margin-left: 10px;
      margin-top: 10px;
    }
    p {
      float: right;
      width: 1.2rem;
      line-height: 1.2rem;
    }
  }
  .all_dialog_show {
    top: 0;
  }
}
</style>
