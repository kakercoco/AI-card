/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-03 10:09:33
 * @Last Modified by: Jessica
 * @Last Modified time: 2018-10-18 11:35:12
 */
<template>
  <!--<div style="height: 100%;"></div>-->
  <div class="im" id="im">
    <div class="myback"></div>
    <canvas id="myCanvas"></canvas>
    <ul class="chat-list" id="chatList" @click="close_bottom">

      <li class="clearfix" v-for="(item,i) in $store.state.chat.char_list" :key="i" :data-index="i" :class="'my_type_' + item.type">
        <p class="tac">{{item.time}}</p>
        <div :class="item.from === 'me' ? 'right-message' : 'left-message'">
          <img :src="item.fead_src ? item.fead_src : '@/assets/img/moren.jpg'" v-if="item.from === 'me'">
          <img :src="wx_image ? wx_image : '@/assets/img/moren.jpg'" v-if="item.from === 'others'">
          <div class="content">

            <tpl :content="item.content" v-if="item.type === 'text'"></tpl>

            <!--图片-->
            <div class="img" v-if="item.type === 'img'">
              <img class="previewer-demo-img" :src="item.content" @click="show(item)">
            </div>

            <!--商品-->
            <div class='shop' v-if="item.type ==='shop'">
              <p class='title'>来自：{{item.p_title}}</p>
              <div class='introduce'>
                <img :src='item.p_image ? item.p_image : "@/assets/img/moren.jpg"'>
                <span class="name">{{item.p_name}}</span>
                <!--<span v-if="item.p_class === 'product_details'" class="p_price_sell">售价:￥{{item.p_price_sell}}</span>-->
              </div>
            </div>

          </div>
          <img src="@/assets/img/l.gif" class="loading" v-if="item.from === 'me' && item.is_loading">

        </div>
      </li>

    </ul>
    <div class="footer chat_foot">
      <span @click="open_seech" class="Speech_storehouse">话术库</span>
      <p class="my-textarea">
        <group>
          <x-textarea
                v-if="textarea_Rendering"
                ref="textarea"
                v-model="value"
                autosize :rows="1"
                @on-change="content_change"
                @on-blur="onBlur"
                @on-focus="onFocus"></x-textarea>
        </group>
      </p>
      <div class="fr two_btn">
        <!--<img src="@/assets/icon/face.png" alt="" v-if="!isEmotion" @click="close_bottom">-->
        <img src="@/assets/icon/xiao.png" alt="" @click="Emotio_open">
        <img src="@/assets/icon/jia.png" alt="" v-if="value.length <= 0" @click="pic_open">
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

          <img src="@/assets/img/back_btn.png">
          <p>照片</p>
        </div>
      </div>
    </div>

    <!--<div class="layer" v-if="slideDownTalk" @click="slideDownTalk = false"></div>-->

    <popup v-model="slideDownTalk">

      <popup-header
              title="选择话术"
              :show-bottom-border="false"></popup-header>
      <group gutter="0">
        <div class="talk-list">
          <div class="talk-group">
            <a class="active" :class="Speech.select_class_id == '' ? 'select_class' : ''" @click="speech_list_init">最近使用</a>
            <a v-for="(item,i) in Speech.class_list" :key="i" :class="Speech.select_class_id == item.id ? 'select_class' : ''" @click="sele_class(item,i)">{{item.label}}</a>
            <a></a>
          </div>
          <div class="talk-infor">
            <div class="loading" v-if="Speech.is_loading">
              <img src="@/assets/img/l.gif">
            </div>
            <ul>
              <li @click="select_Speech(item)" v-for="(item,i) in Speech.child_list" :key="i">
                <p class="title">{{item.content}}</p>
                <p class="content">{{item.keyword}}</p>
              </li>
            </ul>
          </div>

        </div>

      </group>
    </popup>

    <div v-transfer-dom>
      <previewer :list="$store.state.chat.img_list" ref="previewer" :options="options"></previewer>
    </div>
  </div>

</template>

<script>
import {
  Group,
  XTextarea,
  WechatEmotion as Emotion,
  Swiper,
  SwiperItem,
    PopupHeader, Popup,
} from 'vux'
import { emojiAnalysis, __emojiObjs } from '@/utils/emoj'
import axios from 'axios'
import { dateFtt, all_srcollBtoom, mydebounce } from '@/utils/base'
import tpl from './tpl'
import { Previewer, TransferDom } from 'vux'
import UPNG from 'upng-js'
import { upload_img } from '@/api/upload_file'
import { talkGroup, talkList } from '@/api/talk'
import { one_chat } from '@/api/chart'
export default {
  name: 'messageIM',
  components: {
    Group,
    Emotion,
    XTextarea,
    Swiper,
    SwiperItem,
    tpl,
    Previewer,
      PopupHeader,
      Popup,
  },
  data () {
    return {
      value: '',
      isEmotion: false,
      slideDownTalk: false,
      list: [],
      face_list: [],
      options: {
        getThumbBoundsFn (index) {
          let thumbnail = document.querySelectorAll('.previewer-demo-img')[
            index
          ]
          let pageYScroll =
            window.pageYOffset || document.documentElement.scrollTop
          let rect = thumbnail.getBoundingClientRect()
          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width }
        }
      },
      isPicture: false,
      c: {}, // canvas对象
      img_max_width: 200,
      test: '',
      char_list_top: false, // 是否抬起
      Speech: {
        class_list: [],
        child_list: [],
        select_class_id: '',
        is_loading: false
      },
      wx_image: '',
      mydebounce: null,
      textarea_Rendering: true
    }
  },
  directives: {
    TransferDom
  },
  watch: {
    value () {
      if (this.mydebounce != null) {
        this.mydebounce()
      }
    }
  },
  methods: {
    pic_open () {
      this.isEmotion = false
      this.isPicture = true
      this.char_list_top = true
      this.$nextTick(() => {
        this.img_select()
      })
    },

    Emotio_open () {
      this.isEmotion = true
      this.isPicture = false
      this.char_list_top = true
    },

    close_bottom () {
      this.isEmotion = false
      this.isPicture = false
      this.char_list_top = false
    },

    show (item) {
      let index = 0
      const src = item.original
      for (let i = 0; i < this.$store.state.chat.img_list.length; i++) {
        if (src === this.$store.state.chat.img_list[i].src) {
          index = i
          break
        }
      }
      this.$refs.previewer.show(index)
    },

    pushEmotion (val) {
      this.value += `[${val}]`
    },

    face_list_init () {
      const list_obj = __emojiObjs
      let list = []
      let index = 0
      for (let i in list_obj) {
        const obj = {
          id: index,
          title: i,
          value: list_obj[i]
        }
        this.face_list.push(obj)
        index++
      }
      // this.face_list = list;
      // debugger;
    },

    select_face (e) {
      this.value = `${this.value}[${e.title}]`
      this.$nextTick(() => {
        this.$refs.textarea.updateAutosize()
        this.textarea_to_bottom()
      })
    },

    // 重新渲染
    textarea_again_Rendering (fn) {
      this.textarea_Rendering = false
      this.$nextTick(() => {
        this.textarea_Rendering = true
        this.$nextTick(() => {
          var timer = setTimeout(() => {
            const ele = document.querySelector('.weui-cell__bd')
            if (ele) {
              ele.scrollTop = ele.scrollHeight
            }
            clearTimeout(timer)
          }, 300)
        })
      })
    },

    formSubmit () {
      if (this.value === '') {
        this.$vux.alert.show({
          title: '提示',
          content: '请输入内容！'
        })
        return
      }
      if (this.$store.state.chat.my_chat_room_id == '') {
        this.$vux.alert.show({
          title: '提示',
          content: '聊天发生错误，请重新进入！'
        })
        this.$router.replace({path: '/main/message'})
        return
      }
      const that = this
      const id = Number(
        Math.random()
          .toString()
          .substr(3, 10) + Date.now()
      ).toString(36)
      var obj = {}

      const c = this.value.replace(/\s+/g, '').replace(/[\r\n]/g, '')
      if (c === '') {
        this.$vux.alert.show({
          title: '提示',
          content: '发送内容不能为空！'
        })
        return
      }

      obj.type = 'text'
      obj.content = this.value

      const speaktoDto = {
        dialogId: this.$store.state.chat.my_chat_room_id,
        id: id,
        content: obj
      }

      const req = {
        cmd: 'SpeakToDialog',
        content: JSON.stringify(speaktoDto)
      }

      if (this.$store.state.user.websocketConnection != null) {
        this.$store.state.user.websocketConnection.send(JSON.stringify(req))
      } else {
        console.log('发送失败,websocketConnection为null')
        this.$vux.alert.show({
          title: '提示',
          content: '发送失败！'
        })
        return
      }

      obj.id = id
      obj.time = dateFtt('yyyy-MM-dd hh:mm:ss', new Date())
      obj.is_loading = true
      obj.fead_src = this.$store.state.user.info.image
        ? this.$store.state.user.info.image
        : ''
      obj.from = 'me'
      obj.copy_content = obj.content
      obj.content = emojiAnalysis([obj.content])

      this.$store.commit('chat/PUSH_char_list', obj)

      this.to_php({
        type: 'text',
        content: this.value
      })

      this.value = ''
      this.frame_Reset()
      all_srcollBtoom(this)
      this.$nextTick(() => {
        this.$refs.textarea.updateAutosize()
      })

      // debugger
    },
    to_php (data) {
      const uid = this.$route.query.uid
      one_chat({
        uid,
        content: JSON.stringify(data)
      })
    },

    frame_Reset () {
      this.isEmotion = false
      this.isPicture = false
      this.char_list_top = false
    },

    img_select () {
      var imgType = 'image/png'
      const id = Number(
        Math.random()
          .toString()
          .substr(3, 10) + Date.now()
      ).toString(36)
      const that = this
        const canvas = document.querySelector('#myCanvas')
      document.querySelector('.file_input').onchange = function (e) {
        var obj = e.target.files[0] // 获取图片对象
        imgType = obj.type
        if (!obj) {
          return
        }
        if (obj.type != 'image/jpeg' && obj.type != 'image/png') {
          this.$vux.alert.show({
            title: '提示',
            content: '只支持jpg、png!'
          })
          return
        }
        if (obj.size > 2000000) {
          this.$vux.alert.show({
            title: '提示',
            content: '照片大小不能超过2MB!'
          })
          that.isEmotion = false
          that.isPicture = false
          return
        }
        const url = URL.createObjectURL(obj) // 转成url
        var img = new Image()
        img.src = url
        img.onload = function (ev) {
          var end_widht =
            img.width > that.img_max_width ? that.img_max_width : img.width
          var end_height =
            img.width > that.img_max_width
              ? (that.img_max_width * img.height) / img.width
              : img.height
            canvas.width = end_widht;
            canvas.height = end_height;
          that.c.drawImage(this, 0, 0, end_widht, end_height)

            var end_url = canvas.toDataURL('image/jpeg');
            console.log(end_url);
            /*var dta = that.c.getImageData(0, 0, end_widht, end_height).data
            var end_url = ''
            try {
              var png = UPNG.encode([dta.buffer], end_widht, end_height,100)
              var base64 = that.arrayBufferToBase64(png)
              end_url = `data:image/jpeg;base64,${base64}`
                console.log(base64);
            } catch (err) {
              end_url = url
            }*/

          // 先把缩略图，前端发出去
          var obj = {
            id,
            type: 'img',
            from: 'me',
            fead_src: that.$store.state.user.info.image,
            content: end_url,
            is_loading: true,
            time: dateFtt('yyyy-MM-dd hh:mm:ss', new Date())
            // original: src
          }

          that.$store.commit('chat/PUSH_char_list', obj)
          that.frame_Reset()
          all_srcollBtoom(that)
          that.uploadFile_p(obj)
        }
      }
    },

    uploadFile_p (obj) {
      const ele = document.querySelector('#myFrom')
      var fd = new FormData(ele)
      let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      upload_img(fd).then(res => {
        if (res.data && res.data.url) {
          const img_url = res.data.url
          let end_obj = { ...obj }
          delete end_obj.from
          delete end_obj.fead_src
          delete end_obj.is_loading
          end_obj.original = img_url

          // 找到本地插进去的那个，把真实路径插入进去
          for (
            let i = this.$store.state.chat.char_list.length - 1;
            i >= 0;
            i--
          ) {
            if (this.$store.state.chat.char_list[i].id === obj.id) {
              this.$store.state.chat.char_list[i].original = img_url
              break
            }
          }

          this.$store.commit('chat/PUSH_img_list', {
            src: img_url
          })
          // this.$store.state.chat.img_list.push({
          //     src:img_url
          // });

          // 图片上传成功，发送聊天
          var speaktoDto = {
            dialogId: this.$store.state.chat.my_chat_room_id,
            id: obj.id,
            content: end_obj
          }

          var req = {
            cmd: 'SpeakToDialog',
            content: JSON.stringify(speaktoDto)
          }

          if (this.$store.state.user.websocketConnection != null) {
            this.$store.state.user.websocketConnection.send(JSON.stringify(req))
            this.to_php({
              type: 'img',
              content: this.value
            })
          } else {
            console.log('发送失败,websocketConnection为null')
            this.$vux.alert.show({
              title: '提示',
              content: '发送失败!'
            })
            return
          }
        }
        if (res.code !== 200) {
          this.$vux.alert.show({
            title: '提示',
            content: '图片上传失败!'
          })
        }
      })
      // axios.post('/index.php/api/Upload/index', fd, config)
    },

    canvas_init () {
      var canvas = document.querySelector('#myCanvas')
      this.c = canvas.getContext('2d')
    },

    arrayBufferToBase64 (buffer) {
      var binary = ''
      var bytes = new Uint8Array(buffer)

      var len = bytes.byteLength
      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i])
      }
      return window.btoa(binary)
    },

    get_class_list () {
      talkGroup({
        type: 'verbal'
      }).then(e => {
        if (e.code === 200 && e.data && e.data instanceof Array) {
          this.Speech.class_list = e.data
          // this.get_Speech_list(e.data[0].id);
        }
      })
    },

    sele_class (item) {
      const id = item.id
      if (id) {
        this.Speech.select_class_id = id
        this.get_Speech_list(id)
      }
    },

    get_Speech_list (id) {
      this.Speech.child_list = []
      this.Speech.is_loading = true
      talkList({
        pid: id,
        page: 1,
        pagesize: 100000
      })
        .then(e => {
          if (e.code === 200 && e.data && e.data.rows instanceof Array) {
            this.Speech.child_list = e.data.rows
          }
          this.Speech.is_loading = false
        })
        .catch(() => {
          this.Speech.is_loading = false
        })
    },

    speech_list_init () {
      const list = localStorage.getItem('speech_list')
      this.Speech.select_class_id = ''
      if (list) {
        this.Speech.child_list = JSON.parse(list)
      } else {
        this.Speech.child_list = []
      }
    },

    select_Speech (item) {
      // 先取出
      const list_str = localStorage.getItem('speech_list')
      let list = []
      if (list_str) {
        list = JSON.parse(list_str)
      }

      let isHave = false

      for (let i = 0; i < list.length; i++) {
        if (list[i].content === item.content) {
          isHave = true
          break
        }
      }

      // 已存在则不插入,不重新设置
      if (!isHave) {
        list.push(item)
        localStorage.setItem('speech_list', JSON.stringify(list))
      }

      this.slideDownTalk = false
      this.value = this.value + item.content
      this.$nextTick(() => {
        this.$refs.textarea.updateAutosize()
        this.textarea_to_bottom()
      })
    },

    // textarea滚动到底
    textarea_to_bottom () {
      const ele = document.getElementsByClassName('weui-cell__bd')[0]
      if (ele) {
        ele.scrollTop = ele.scrollHeight
      }
    },

    open_seech () {
      this.slideDownTalk = true
      this.speech_list_init()
    },

    onFocus () {
      var timer = setTimeout(() => {
        document.body.scrollTop = document.body.scrollHeight
        this.onChange()
        clearTimeout(timer)
      }, 300)
    },

    onChange () {
      if (document.querySelector('.chat_foot')) {
        var height = document.querySelector('.chat_foot').clientHeight
        var screen_height =
              document.documentElement.clientHeight || document.body.clientHeight
        document.querySelector('#im').style.height = screen_height - height + 'px'
        const ele = document.getElementById('im')
        if (ele) {
          ele.scrollTop = ele.scrollHeight
        }
      }
    },

    onBlur () {
      var timer = setTimeout(() => {
        window.scrollTo(0, 0)
        this.onChange()
        clearTimeout(timer)
      }, 700)
    },

    // 初始化防抖函数
    mydebounce_init () {
      this.mydebounce = mydebounce(() => {
        this.onChange()
      }, 700)
    },

    content_change (val) {
      // this.value = val;
    },

    onresize () {
      const that = this

      window.onresize = function () {
        if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
          setTimeout(function () {
            var top = document.activeElement.getBoundingClientRect().top
            console.log(top)
            window.scrollTo(0, top)
            that.onChange()
          }, 0)
        }
      }
    }
  },
  created () {
    // this.chat_init();
  },

  mounted () {
    this.canvas_init()
    this.face_list_init()
    this.get_class_list()
    this.speech_list_init() // 话术列表初始化
    this.wx_image = this.$route.query.wx_image
    this.mydebounce_init() // 初始化防抖函数
    this.$nextTick(() => {
      all_srcollBtoom(this)
    })

    var ua = navigator.userAgent
    var isAndroid = /android/i.test(ua)
    if (isAndroid) {
      this.onresize()
    }

    // this.img_select();
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.im {
  background-color: #f4f4f4;
  overflow: auto;
  height: calc(100% - 1.06rem);
  padding-bottom: 0.4rem;
  .myback {
    position: fixed;
    top: 0;
    left: 0;
    background: #f4f4f4;
    z-index: -1;
    width: 100%;
    height: 100%;
  }
  #myCanvas {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
  .chat-list {
    background: #f4f2f2;
    transition: transform 0.2s;
    li {
      padding: 0.6rem 0.3rem 0;
      & > p {
        font-size: 0.26rem;
        color: rgba(113,113,113,.6);
        margin-bottom: 0.3rem;
        text-decoration: underline;
      }
      .left-message {
        img {
          float: left;
          width: 0.84rem;
          height: 0.84rem;
        }
        .content {
          background-color: #fff;
          float: left;
          margin-left: 0.3rem;
          max-width: 5rem;
          padding: 0.1rem 0.2rem;
          position: relative;
          margin-top: 0.01rem;
          border: 1px solid #dedede;
          border-radius: 5px;
          .previewer-demo-img {
            width: 2rem;
            height: auto;
          }
          &:after {
            content: '';
            background-color: #fff;
            position: absolute;
            top: 0.2rem;
            left: -0.1rem;
            width: 0.16rem;
            height: 0.16rem;
            transform: rotate(45deg);
            border: 1px solid #dedede;
            border-right-color: #fff;
            border-top-color: #fff;
          }
        }
        .shop {
          .title {
            display: block;
            width: 3.3rem;
            height: 0.55rem;
            border-bottom: 1px #ccc solid;
            font-size: 0.32rem;
            line-height: 0.55rem;
            color: #333;
            overflow:hidden;
            white-space:nowrap;
            text-overflow:ellipsis;
          }
          .introduce {
            overflow: hidden;
            width: 3.3rem;
            padding-top: 0.15rem;
            img {
              float: left;
              width: 0.95rem;
              height: 0.95rem;
              border-radius: 5px;
              margin-right: 0.2rem;
            }
            .name {
              float: left;
              width: 2.1rem;
              height: 0.44rem;
              line-height: 0.44rem;
              color: #333;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              font-size: 15px;
            }
            .p_price_sell {
              float: left;
              width: 2.1rem;
              height: 0.44rem;
              line-height: 0.44rem;
              color: #ff6969;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              font-size: 15px;
            }
          }
        }
      }
      .right-message {
        img {
          float: right;
          width: 0.84rem;
          height: 0.84rem;
        }
        .loading {
          float: right;
          width: 20px;
          height: 20px;
          margin-right: 10px;
          margin-top: 10px;
        }
        .content {
          background-color: #4f8fff;
          float: right;
          margin-right: 0.3rem;
          max-width: 5rem;
          padding: 0.1rem 0.2rem;
          position: relative;
          // margin-top: 0.2rem;
          margin-top: 0.01rem;
          // border: 1px solid #dedede;
          border-radius: 5px;
          color: #fff;
          .previewer-demo-img {
            width: 2rem;
            height: auto;
          }
          &:after {
            content: '';
            background-color: #4f8fff;
            position: absolute;
            top: 0.2rem;
            right: -0.08rem;
            width: 0.16rem;
            height: 0.16rem;
            transform: rotate(45deg);
            // border: 1px solid #dedede;
            // border-left-color: #fff;
            // border-bottom-color: #fff;
          }
        }
      }
    }
  }
  .chat-list_top {
    transform: translateY(-103px);
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #f7f8fa;
    padding: 0.15rem 0;
    border-top:1px #dfe0e2 solid;
    span {
      float: left;
      border: 1px solid #3e84ff;
      border-radius: 5px;
      height: 38px;
      line-height: 38px;
      width: 60px;
      text-align: center;
      font-size: 0.3rem;
      font-family: '黑体';
      color: #3e84ff;
    }
    img {
      width: 30px;
      height: 30px;
      margin-top: 3px;
      &:last-child {
        margin-left: 0.2rem;
      }
    }
    .send {
      height: 38px;
      background-color: #5977fe;
      color: #fff;
      border: none;
      padding: 0 10px;
      border-radius: 5px;
      margin-left: 10px;
    }
    .my-textarea {
      float: left;
      width: calc(100% - 170px);
      margin-left:0.1rem;
      border: 1px solid #dadada;
      border-radius: 5px;
      font-size: 18px;
      overflow: hidden;
      & /deep/ .weui-cells {
        margin-top: 0;
        .weui-cell {
          padding: 6px 15px;
        }
        .weui-cell__bd {
          max-height: 100px;
          overflow-y: auto !important;
        }
        .weui-textarea {
        }
      }
    }
    .my_picture {
      width: 100%;
      clear: both;
      height: 100px;
      padding-top: 10px;
      padding-bottom: 10px;
      .file_input_frame {
        position: relative;
        width: 85px;
        height: 85px;
        text-align: center;
        overflow: hidden;

        .file_input {
          position: absolute;
          width: 100%;
          height: 120px;
          top: -30px;
          left: 0;
        }
        img {
          width: 40px;
          height: 34px;
          margin-top: 13px;
        }
        p {
          margin-top: 5px;
        }
      }
    }
    .my-emotion {
      width: 100%;
      clear: both;
      height: 100px;
      padding-top: 10px;
      padding-bottom: 10px;
      .vux-emotion {
        width: 0.98rem;
        text-align: center;
      }
      .one_face {
        display: inline-block;
        width: 29px;
        height: 29px;
        margin-left: 0.1rem;
      }
    }
  }
  .layer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 98;
    background: rgba(0, 0, 0, 0.4);
  }
  .talk-list {

    background-color: #fff;
    height: 9.34rem;

    h4 {
      height: 1rem;
      line-height: 1rem;
      border-bottom: 1px solid #e1e1e1;
      text-align: center;
      font-size: 0.36rem;
      font-family: '黑体';
      color: #000000;
      font-weight: normal;
    }
    .talk-group {
      float: left;
      width: 1.6rem;
      height: 100%;
      overflow: auto;
      padding: 0.2rem 0;
      border-right: 1px solid #e1e1e1;
      a {
        font-family: '黑体';
        width: 100%;
        display: block;
        height: 0.6rem;
        line-height: 0.6rem;
        text-align: center;
        font-size: 0.3rem;
        color: #353535;
        overflow: hidden;
        padding: 0 0.14rem;
        margin-bottom: 0.3rem;
        border-right: 2px transparent solid;
      }
      .select_class {
        border-right: 2px #3c7df0 solid;
      }
    }
    .talk-infor {
      padding: 0.2rem;
      float: left;
      width: calc(100% - 1.6rem);
      height: 100%;
      overflow: auto;
      position: relative;
      .loading {
        position: absolute;
        width: 100%;
        height: 30px;
        top: 50px;
        text-align: center;
        z-index: -1;
        img {
          width: 25px;
          height: 25px;
        }
      }
      li {
        border: 1px solid #ebebeb;
        color: #717171;
        padding: 0.18rem;
        background: #fff;
        border-radius: 3px;
        margin-bottom: 0.2rem;
        box-shadow: 2px 2px 10px 2px #e3e3e3;
        .title {
          font-family: '黑体';
          font-size: 0.33rem;
          height: 0.5rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: #353535;
        }
        .content {
          font-family: '黑体';
          font-size: 0.24rem;
          color: #bdbdbd;
          height: 0.35rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
  .Speech_storehouse{
    margin-left: 0.1rem;
  }
  .my_type_img .content{
    padding: 0rem !important;
    border-radius:2px;
    overflow: hidden;
    background: transparent !important;
    .img{

    }
  }
  .my_type_img .content:after{
    display: none !important;
  }
}
</style>
