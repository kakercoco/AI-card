<template>
  <div id="app">
      <div class="all_dialog" :class="dialog.is_show ? 'all_dialog_show' : ''">
          <div v-if="dialog.is_show">
              <img :src="dialog.wx_image">
              <div v-html="dialog.content" class="content"></div>
              <p class="time">{{dialog.time}}</p>
          </div>
      </div>
      <router-view/>
  </div>
</template>

<script>
import {setToken} from '@/utils/auth'
import {get_user_info} from '@/api/user_info'
import {dateFtt, config, all_srcollBtoom} from '@/utils/base'
import {get_users} from '@/api/message'
import {emojiAnalysis, __emojiObjs} from '@/utils/emoj'
export default {
  name: 'App',
  data () {
    return {
      dialog: {
        is_show: false,
        timer: null,
        wx_image: '',
        content: '',
        time: ''
      }

    }
  },
  created () {
    setToken('8vJ0SXqoBpLez2sAD6a38QnpAIrLUszJIfRnrWW5leIfSxSS%2FJCW11wnA7Nmx%2BXW%2F6Tw%2BsF0s6dDfH%2F%2BzbdsEQ%3D%3D')
  },
  methods: {
    get_user_info () {
      get_user_info().then((res) => {
        if (res.data) {
          this.$store.commit('user/SET_INFO', res.data)
          this.webSocket_init()
        }
      })
    },

    webSocket_init () {
      const Socket_data = new WebSocket(this.$store.state.user.chat_ws)
      this.$store.commit('user/SET_websocket', Socket_data)


          this.$store.state.user.websocketConnection.onopen = () => {
        this.webSocket_login()
      }
    },

    webSocket_login () {
      const loginDto = {
        'userName': this.$store.state.user.info.message_name, // 用户名
        'timestamp': Date.now(),
        'platform': 'zhentui',
        'role': 1, // 角色
        'authority': 1, // 权限
        'tcloud': '',
        'purpose': 2, // 聊天目的
        'token': '', // 后台给我的
        'nickName': this.$store.state.user.info.card_name // 名片上的名字
      }

      const req = {
        'cmd': 'PlatformLogin',
        'content': loginDto
      }
      this.$store.state.user.websocketConnection.send(JSON.stringify(req))
      this.chat_watch()
    },

    chat_watch () {
      this.$store.state.user.websocketConnection.onmessage = (res) => {
        const data = JSON.parse(res.data)
        // 如果返回是登录信息
        if (data.cmd === 'LoginSuccess') {
          if (data.content) {
            const my = JSON.parse(data.content)
            this.$store.commit('user/SET_my_chat_token', my.token)

            // 判断员工信息中是否包含message_id
            if (!this.$store.state.user.info.message_id) {
              this.$store.commit('user/SET_my_message_id', my.id)
                        }
          }
        } else if (data.cmd === 'GetChat' && data.content) {
          this.$store.commit('chat/SET_my_chat_room_id', data.content)
                } else if (data.cmd === 'SpeakFromDialog' && this.$route.path === '/main/message') {
          this.message_logic(res)
                } else if (data.cmd === 'SpeakFromDialog' && this.$route.path === '/messageIM') {
          this.chat_logic(res)
                } else if (data.cmd === 'SendOver' && data.content) {
          this.$store.commit('chat/HIDE_loading', data.content)
                } else if (data.cmd === 'Trans' && data.content) {
          let user = JSON.parse(data.content)
                    this.$store.commit('app/ADD_Unread')
                    if (this.dialog.timer === null) {
            this.dialog.wx_image = user.wx_image
                        this.dialog.content = config[user.type] ? user.wx_name + config[user.type] : ''
                        this.dialog.is_show = true
                        this.dialog.is_ready = false
                        this.dialog.time = dateFtt('hh:mm', new Date(user.create_time))
            this.dialog.timer = setTimeout(() => {
              this.dialog.is_show = false
                            this.dialog.timer = null
                            this.dialog.wx_image = ''
                            this.dialog.content = ''
                            this.dialog.time = ''
                            clearTimeout(this.dialog.timer)
                        }, 2000)
          }
        } else if (data.cmd === 'Error') {
          // alert(data.content);
        }
      }
    },

    // 消息列表逻辑
    message_logic (res) {
      const data = JSON.parse(res.data)
            if (data.content) {
        const chat_obj = JSON.parse(data.content)
                console.log(chat_obj)
                //存在内容
                if (chat_obj.content) {
          chat_obj.content_obj = JSON.parse(chat_obj.content)
                    var end_obj = this.create_message(chat_obj)


                    //判断这个用户是否在列表中，如果再列表中，直接插入消息
                    let isHave = false
                    let messageList = this.$store.state.message.messageList
                    for (let i = 0; i < messageList.length; i++) {
            if (messageList[i].message_id == chat_obj.speakerId) {
              isHave = true
                            //直接插入
                            Object.assign(messageList[i], end_obj)
                            messageList[i].num++
                            break;
            }
          }

          // 不存在，做请求
          if (!isHave) {
            // 做请求要信息
            get_users({
              message_id: chat_obj.speakerId
            }).then((ev) => {
              if (ev.code === 200 && ev.data && ev.data instanceof Array) {
                const user = ev.data[0]
                                const message = {
                  is_read: 0,
                  num: 1,
                  message_id: chat_obj.speakerId ? chat_obj.speakerId : user.message_id,
                  uid: user.id,
                  wx_image: user.wx_image,
                  wx_name: user.wx_name
                }
                                Object.assign(message, end_obj)
                                this.$store.commit('message/PUSH_messageList', message)
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

    chat_logic (res) {
      const data = JSON.parse(res.data)
            var chat_data = {}
            let obj = JSON.parse(data.content)
            let chat_content = JSON.parse(obj.content)
            chat_data = {
        time: dateFtt('yyyy-MM-dd hh:mm:ss', new Date(obj.createTime)),
        type: chat_content.type,
        content: chat_content.content,
        fead_src: '',
        from: 'others'
      }
            //如果是text类型，要重置content类型
            if (chat_data.type === 'text') {
        chat_data.content = emojiAnalysis([chat_data.content])
            } else if (chat_data.type === 'img') {
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
    .all_dialog{
        width: 100%;
        height:1.2rem;
        background: #fff;
        position: fixed;
        top:-1.3rem;
        left: 0;
        transition: all 0.2s;
        z-index: 999;
        box-shadow: 0 3px 10px #d6e1fb;
        .content{
            width: 65%;
            float: left;
            height: 100%;
            line-height:1.2rem;
            margin-left:10px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        img{
            float: left;
            width: 0.8rem;
            height: 0.8rem;
            border-radius: 100px;
            margin-left:10px;
            margin-top:10px;
        }
        p{
            float: right;
            width:1.2rem;
            line-height:1.2rem;
        }

    }
    .all_dialog_show{
        top:0;
    }

}
</style>
