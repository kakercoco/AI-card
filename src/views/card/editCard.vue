/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-10 16:09:36
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-10-27 14:54:27
 */
<template>
  <div class="edit-card">
    <div class="my-card" id="card">
      <img v-if="templateId !== 24 && templateId !== 25 && templateId !== 26 && templateId !== 27 && templateId !== 28" src="@/assets/card/1.png" alt="" class="card-bg">
      <img v-if="templateId === 24" src="@/assets/card/4.png" alt="" class="card-bg">
      <img v-if="templateId === 25" src="@/assets/card/5.png" alt="" class="card-bg">
      <img v-if="templateId === 26" src="@/assets/card/6.png" alt="" class="card-bg">
      <img v-if="templateId === 27" src="@/assets/card/7.png" alt="" class="card-bg">
      <img v-if="templateId === 28" src="@/assets/card/8.png" alt="" class="card-bg">
      <div class="card-infor " :class="selectedClass">
        <p class="mark" v-if="templateId === 1 || templateId === 4 || templateId === 7 || templateId === 10 || templateId === 13 || templateId === 17 || templateId === 20 || templateId === 23 ">T云商务</p>
        <p class="mark" v-if="templateId === 2 || templateId === 5 || templateId === 8 || templateId === 11 || templateId === 14 || templateId === 18 || templateId === 21">T云客服</p>
        <p class="trueland">
          <img src="@/assets/img/trueland.png" alt="">
          <span v-if="templateId === 0 || templateId === 1 || templateId === 2">珍岛股份·上海</span>
          <span v-if="templateId === 3 || templateId === 4 || templateId === 5">珍岛股份·无锡</span>
          <span v-if="templateId === 6 || templateId === 7 || templateId === 8">珍岛股份·苏州</span>
          <span v-if="templateId === 9 || templateId === 10 || templateId === 11">珍岛股份·宁波</span>
          <span v-if="templateId === 12 || templateId === 13 || templateId === 14">珍岛股份·温州</span>
          <span v-if="templateId === 15 || templateId === 16 || templateId === 17">珍岛股份·深圳</span>
          <span v-if="templateId === 18 || templateId === 19 || templateId === 20">珍岛股份·成都</span>
          <span v-if="templateId === 21 || templateId === 22 || templateId === 23">珍岛股份·杭州</span>
          <span v-if="templateId === 24 || templateId === 25 || templateId === 26|| templateId === 27 || templateId === 28 || templateId === 29">{{cardInfor.company}}</span>
        </p>
        <!-- <p class="company">{{cardInfor.company}}</p> -->
        <p class="bio">
          <img :src="cardInfor.image" alt="" class="avatar">
          <span class="name">{{cardInfor.username}}</span>
          <span class="job">{{cardInfor.job}}</span>
        </p>
        <p class="phone">
          <!-- 白色 -->
          <img v-if="templateId === 26 " src="@/assets/nav/phone2.png" alt="">
          <!-- 黄色 -->
          <img v-else-if="templateId === 24 || templateId === 25" src="@/assets/nav/cellphone1.png" alt="">
          <!-- 黑色 -->
          <img v-else src="@/assets/nav/phone.png" alt="">
          {{cardInfor.phone}}
        </p>
        <p class="email">
          <!-- 白色 -->
          <img v-if="templateId === 26 " src="@/assets/nav/email2.png" alt="" >
          <!-- 黑色 -->
          <img v-else src="@/assets/nav/email.png" alt="">
          {{cardInfor.email}}
        </p>
        <p class="address">
          <!-- 白色 -->
          <img v-if="templateId === 26" src="@/assets/nav/map2.png" alt="" >
          <!-- 黄色 -->
          <img v-else-if="templateId === 24 || templateId === 25" src="@/assets/nav/address1.png" alt="">
          <!-- 黑色 -->
          <img v-else src="@/assets/nav/map.png" alt="">
          {{cardInfor.address}}
        </p>
        <p class="tip">中国领先的SaaS级智能营销云平台</p>
      </div>
    </div>
    <h5>名片样式</h5>
    <scroller ref="scrollerEvent" lock-y :scrollbar-x='false' style="margin-top: 0.2rem;">
      <div class="template-list">
        <img src="@/assets/card/1.png" alt="" :class="{active: index === templateId}" v-for="(item, index) in 24" :key="index" @click="changeTemplate(item, index)" v-if="haDate&&other_card_style==1">
        <img :src="item" alt="" :class="{active: index + 24 === templateId}" v-for="(item, index) in companyBgCard" :key="index + 24" @click="changeTemplate(item, index + 24)"  v-if="haDate&&other_card_style==0">
      </div>
    </scroller>
    <h5>名片头像</h5>
    <div class="card-avatar">
      <img :src="cardInfor.image" alt="">
      <form action="" id="myFrom">
        <input type="file" accept="image/*;capture=camera" @change="setImage" name="avatar" id="avatar" />
      </form>
      <div class="cropWrap" v-show="crop">
        <div style="width: 100%; height:300px; border: 1px solid gray; display: inline-block;">
          <vue-cropper ref='cropper' :guides="true" :view-mode="2" drag-mode="crop" :aspectRatio="1" :auto-crop-area="0.5" :min-container-width="250" :min-container-height="180" :background="true" :rotatable="true" :src="imgSrc" alt="Source Image" :img-style="{ 'width': '100%', 'height': '300px' }">
          </vue-cropper>
        </div>
        <p class="crop-btn tac">
          <button @click="cropImage" v-if="imgSrc != ''">裁剪</button>
          <button @click="rotate" v-if="imgSrc != ''">旋转</button>
          <button @click="closeCrop" v-if="imgSrc != ''">取消</button>
        </p>
      </div>
    </div>
    <h5>个人信息</h5>
    <div class="self-message">
      <p>
        <i>*</i>
        <span>手机：</span>
        <input type="text" placeholder="手机号" v-model="cardInfor.phone">
      </p>
      <p>
        <span>座机：</span>
        <input type="text" placeholder="座机号" v-model="cardInfor.tel">
      </p>
      <p>
        <span>微信：</span>
        <input type="text" placeholder="微信号" v-model="cardInfor.weixin">
      </p>
      <p>
        <i>*</i>
        <span>邮箱：</span>
        <input type="text" placeholder="邮箱" v-model="cardInfor.email">
      </p>
      <p class="address_">
        <i>*</i>
        <span>地址：</span>
        <textarea placeholder="地址" v-model="cardInfor.address"></textarea>
      </p>
    </div>
    <h5>个人简介</h5>
    <div class="self-bio">
      <group>
        <x-textarea placeholder="请输入文字" v-model="cardInfor.content" autosize ref='selfBio'></x-textarea>
      </group>
    </div>
    <h5>推荐产品 <span class="fr" @click="gotoProduce">产品管理</span></h5>
    <div class="produce-list">
      <!-- <p class="tac" v-if="cardInfor.goods_case.goods.length <= 0">暂无推荐商品</p> -->
      <ul>
        <li v-for="(item, index) in cardInfor.goods_case.goods" :key="index">
          <img :src="item.product_img" alt="">
          <span>{{item.product_name}}</span>
        </li>
      </ul>
    </div>
    <h5>推荐案例 <span class="fr" @click="gotoCase">案例管理</span></h5>
    <div class="case-list">
      <p class="tac" v-if="cardInfor.goods_case.case.lenght <= 0">暂无推荐案例</p>
      <ul>
        <li v-for="(item, index) in cardInfor.goods_case.case" :key="index" class="card-shadow">
          <img :src="item.case_img" alt="">
          <p><span>{{item.case_name}}</span></p>
        </li>
      </ul>
    </div>
    <h5>录制语音</h5>
    <div class="self-audio">
      <p @click="audioDialog = true">请点击录制新的语音 <x-icon type="ios-plus-outline"></x-icon>
      </p>
      <audio :src="cardInfor.audio" controls="controls" v-if="cardInfor.audio!=''"></audio>
    </div>
    <h5>我的图片</h5>
    <div class="self-img clearfix">
      <p v-for="(item, index) in albumList" :key="index" class="fl" v-if="item != ''">
        <x-icon type="ios-close" class="icon-close" @click="removeAlbum(index)"></x-icon>
        <img :src="item" alt="">
      </p>
      <span>
        <!-- name="avatar1"-->
        <form action="" id="album">
          <input type="file" accept="image/*;capture=camera" @change="changeFile($event, 'album')" multiple />
        </form>
        <x-icon type="ios-plus-empty" class="icon-insert"></x-icon>
      </span>
    </div>
    <h5>添加标签</h5>
    <div class="self-tag clearfix">
      <ul>
        <li v-for="(item, index) in cardInfor.tag" :key="index">{{item.tag_name}}<x-icon type="ios-minus" class="icon-delete" @click.native="removeTag(index,item.id)"></x-icon>
        </li>
        <li>
          <x-icon type="ios-plus-empty" class="icon-insert" @click.native="openTagDialog"></x-icon>
        </li>
      </ul>
    </div>
    <p class="self-btn">
      <x-button type="primary" @click.native="save(true)">保存</x-button>
    </p>

    <x-dialog v-model="insertTagDialog" :hide-on-blur="true">
      <div class="insert-dialog">
        <h4>添加自定义标签</h4>
        <group>
          <x-input v-model="tagKeyword" placeholder="10字以内" :max="10"></x-input>
        </group>
        <p class="btn">
          <button class="btn-cancle" @click="closeTagDialog">取消</button>
          <button class="btn-primary" @click="insertTag">确定</button>
        </p>
      </div>
    </x-dialog>
    <x-dialog v-model="audioDialog" :hide-on-blur="true">
      <div class="audio-dialog">
        <h4>录制语音</h4>
        <p>时间不长于01:00s</p>
        <div @touchstart.stop.prevent="touchstart" @touchend.stop.prevent="touchend">
          <x-circle :percent="percent" :stroke-width="6" :trail-width="6" :stroke-color="['#36D1DC', '#5B86E5']" trail-color="#ececec">
            <span v-if="false">长按录音</span>
            <span style="color:#36D1DC">{{ percent}}%</span>
          </x-circle>
        </div>
      </div>
      <!-- 播放未上传的录音 -->
    </x-dialog>
    <x-dialog v-model="showAudio" :hide-on-blur="false">
      <div class="insert-dialog">
        <h4>播放录制语音</h4>
        <div style='display: flex;align-items: center;justify-content: center;padding-top: 0.5rem;' @click="openAudio">
          <img :src="cardInfor.image" alt="" style='width: 1rem;height: 1rem;border-radius: 0.1rem;'>
          <img :src="show_audio" alt="" style='width: 3.2rem;'>
          <!-- <span>{{endTime - startTime}}"</span> -->
          <span>{{showTime}}"</span>
        </div>
        <p class="btn">
          <button class="btn-cancle" @click="resetAudio">重录</button>
          <button class="btn-primary" @click="uploadAudio">上传</button>
        </p>
      </div>
    </x-dialog>
  </div>
</template>

<script>
import {
  Scroller,
  XInput,
  Group,
  XButton,
  Cell,
  XTextarea,
  XDialog,
  XCircle,
  AlertModule
} from 'vux'
import html2canvas from 'html2canvas'
import {
  updateCard,
  cardRead,
  cardTagDelete,
  cardTagInsert,
  uploadMedia
} from '@/api/card'
import { upload_img } from '@/api/upload_file'
import VueCropper from 'vue-cropperjs'
import { setInterval } from 'timers'

export default {
  name: 'editCard',
  components: {
    Scroller,
    XInput,
    Group,
    XButton,
    Cell,
    XTextarea,
    XDialog,
    XCircle,
    AlertModule,
    VueCropper
  },
  data () {
    return {
      imgSrc: '', // 选择的头像图片路径
      cropImg: '', // 裁剪过后的图片路径base64
      crop: false, // 裁剪头像弹框
      // cardInfor: {
      //   phone: '',
      //   tel: '',
      //   wechat: '',
      //   email: '',
      //   company: '',
      //   address: '',
      //   goods_case: {
      //     case: [],
      //     goods: []
      //   }
      // },
      haDate: false,
      other_card_style: 0,
      t_width: 10,
      albumList: [],
      templateId: null, // 选中的模板id
      tagKeyword: '', // 新增的标签内容
      insertTagDialog: false,
      audioDialog: false,
      showAudio: false,
      percent: 0,
      seletedTemplate: require('@/assets/card/1.png'),
      selectedClass: 'card-template-1',
      show_audio: require('@/assets/card/show_audio.png'),
      templateCard: [
        require('@/assets/card/1.png'),
        require('@/assets/card/1.png'),
        require('@/assets/card/1.png')
      ],
      companyBgCard: [
        require('@/assets/card/4.png'),
        require('@/assets/card/5.png'),
        require('@/assets/card/6.png'),
        require('@/assets/card/7.png'),
        require('@/assets/card/8.png')
      ],
      recording: false,
      first_listen: 0,
      localId: '', // 录音id
      recordTime: 0,
      showTime: 0
      // startTime: 0, // 录音开始时间
      // endTime: 0 // 录音结束时间
    }
  },
  methods: {
    setImage (e) {
      this.crop = true
      const file = e.target.files[0]
      if (!file.type.includes('image/')) {
        alert('Please select an image file')
        return
      }
      if (typeof FileReader === 'function') {
        const reader = new FileReader()
        reader.onload = event => {
          this.imgSrc = event.target.result
          // rebuild cropperjs with the updated source
          this.$refs.cropper.replace(event.target.result)
        }
        reader.readAsDataURL(file)
      } else {
        alert('Sorry, FileReader API not supported')
      }
    },
    cropImage () {
      this.$vux.loading.show({
        text: 'Loading'
      })
      var img = this.$refs.cropper.getData()
      var rate = 100 / img.width
      this.$refs.cropper.scale(rate, rate)
      // get image data for post processing, e.g. upload or setting image src
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL()
      let blob = this.dataURLtoBlob(this.cropImg) // base64转blob对象，用于上传
      // var size = blob.size
      // if (size > 131584) {
      //   alert('上传头像小于1MB！')

      // }
      // 创建FormData对象
      let fd = new FormData()
      let filename = 'card.png'
      fd.append('avatar', blob, filename)
      upload_img(fd).then(res => {
        if (res.data && res.data.url) {
          this.cardInfor.image = res.data.url
          this.crop = false
          this.$vux.loading.hide()
        }
      })
    },
    rotate () {
      // guess what this does :)
      this.$refs.cropper.rotate(90)
    },
    closeCrop () {
      this.crop = false
      document.querySelector('#avatar').value = ''
    },
    closeTagDialog () {
      this.insertTagDialog = false
    },
    openTagDialog () {
      this.insertTagDialog = true
      this.tagKeyword = ''
    },
    insertTag () {
      console.log(this.tagKeyword)
      if (this.tagKeyword !== '') {
        this.$vux.loading.show({
          text: 'Loading'
        })
        const data = {
          tag: this.tagKeyword
        }
        this.closeTagDialog()
        cardTagInsert(data).then(res => {
          this.$vux.loading.hide()
          this.cardInfor.tag.push({
            tag_name: this.tagKeyword,
            id: res.data.card_tag_id
          })
        })
      } else {
        AlertModule.show({
          title: '提示',
          content: '标签不能为空！'
        })
      }
    },
    removeTag (index, id) {
      const data = {
        tag_id: id
      }
      cardTagDelete(data).then(res => {
        this.cardInfor.tag.splice(index, 1)
      })
    },
    getCard () {
      if (this.$store.state.user.cardInfor.close) {
        cardRead().then(res => {
          const cardImg = res.data.card_image
          this.other_card_style = res.data.is_zhendao
          this.haDate = true
          this.$store.state.user.cardInfor = res.data
          this.$store.state.user.cardInfor.close = false
          // this.cardInfor = res.data
          // this.seletedTemplate = require(`@/assets/card/${this.cardInfor.style_id + 1}.png`)
          this.selectedClass = `card-template-${this.cardInfor.style_id + 1}`
          this.templateId = this.cardInfor.style_id
          if (this.cardInfor.album != null) {
            this.albumList = this.cardInfor.album.split(',')
          }
          if (this.cardInfor.image === '') {
            this.cardInfor.image = require('@/assets/card/comm.jpg')
          }
          if (cardImg === undefined || cardImg === '') {
            this.save(false)
          }
          this.$nextTick(function () {
            this.$refs.selfBio.updateAutosize()
          })
          var el = document.querySelector('.template-list')
          if (res.data.is_zhendao === '1') {
            el.setAttribute('style', 'width: 43.2rem')
          } else {
            console.log('其他公司')
            el.setAttribute('style', 'width: 9rem')
            if (this.templateId === 0) {
              this.templateId = 24
              this.selectedClass = `card-template-${this.templateId + 1}`
            }
          }
        })
      }
    },
    changeFile (e, type) {
      var files = e.target.files // 获取图片对象
      if (type === 'avatar') {
        this.uploadFile_p(files[0])
      } else if (type === 'album') {
        this.uploadFileAlbum(files)
      }
    },
    uploadFile_p (obj) {
      this.$vux.loading.show({
        text: 'Loading'
      })
      const ele = document.querySelector('#myFrom')
      const fd = new FormData(ele)
      upload_img(fd, false).then(res => {
        if (res.data && res.data.url) {
          this.$vux.loading.hide()
          this.cardInfor.image = res.data.url
        }
      })
    },
    uploadFileAlbum (obj) {
      this.$vux.loading.show({
        text: 'Loading'
      })
      const ele = document.querySelector('#album')
      const fd = new FormData(ele)

      for (var i = 0; i < obj.length; i++) {
        fd.append('avatar' + i, obj[i])
        if (!obj[i]) {
          return
        }
        if (obj[i].type !== 'image/jpeg' && obj[i].type !== 'image/png') {
          AlertModule.show({
            title: '提示',
            content: '只支持jpg、png!'
          })
          this.$vux.loading.hide()
          return
        }
        if (obj[i].size > 2000000) {
          AlertModule.show({
            title: '提示',
            content: '照片大小不能超过2MB'
          })
          this.$vux.loading.hide()
          return
        }
      }
      upload_img(fd).then(res => {
        if (res.data && res.data.url) {
          this.$vux.loading.hide()
          const imgList = res.data.url.split(',')
          for (var i = 0; i < imgList.length; i++) {
            this.albumList.push(imgList[i])
          }
        }
      })
    },
    removeAlbum (index) {
      this.albumList.splice(index, 1)
    },
    touchstart () {
      console.log(localStorage.rainAllowRecord)
      if (
        !localStorage.rainAllowRecord ||
        localStorage.rainAllowRecord !== 'true'
      ) {
        let that = this
        this.$wechat.startRecord({
          success: function () {
            localStorage.rainAllowRecord = 'true'
            that.$wechat.stopRecord()
          },
          cancel: function () {
            AlertModule.show({
              title: '提示',
              content: '用户拒绝授权录音'
            })
          }
        })
      } else {
        console.log('start')
        event.preventDefault()
        let that = this
        this.$wechat.startRecord({
          success: function () {
            that.first_listen = 0
            // that.startTime = parseInt(new Date().getTime() / 1000)
            that.recording = true
            that.recordTime = 0
            that.$wechat.onVoiceRecordEnd({
              // 录音时间超过一分钟没有停止的时候会执行 complete 回调
              complete: function (res) {
                console.log(res)
                AlertModule.show({
                  title: '提示',
                  content: '最多只能录制60s'
                })
                that.audioDialog = false
                that.showAudio = true
                that.percent = 100
                that.showTime = 60
                that.localId = res.localId
                that.recording = false
                that.audiotime = ''
                // that.endTime = that.startTime + 60
              }
            })
          },
          cancel: function () {
            AlertModule.show({
              title: '提示',
              content: '用户拒绝授权录音'
            })
            return false
          }
        })
      }
    },
    touchend () {
      console.log('end')
      this.recording = false
      this.endTime = parseInt(new Date().getTime() / 1000)
      // 录音时间
      // var luyintime = this.endTime - this.startTime
      if (this.recordTime < 2000) {
        // this.endTime = 0
        // this.startTime = 0
        this.$wechat.stopRecord({})
        // clearTimeout(this.audiotime)
        this.audiotime = ''
        this.recordTime = 0
        this.percent = 0
        AlertModule.show({
          title: '提示',
          content: '录音时间不能少于2秒'
        })

        return false
        // 小于2s，不录音
      } else {
        this.audioDialog = false
        this.showAudio = true
        let that = this
        this.$wechat.stopRecord({
          success: function (res) {
            console.log(res)
            that.localId = res.localId
            that.audiotime = ''
          },
          fail: function (res) {
            console.log(JSON.stringify(res))
          }
        })
      }
    },
    openAudio () {
      console.log('播放语音')
      console.log(this.first_listen)
      if (this.first_listen === 0) {
        this.$wechat.playVoice({
          localId: this.localId // 需要播放的音频的本地ID，由stopRecord接口获得
        })
        this.first_listen = 1
      } else {
        this.$wechat.stopVoice({
          localId: this.localId // 需要停止的音频的本地ID，由stopRecord接口获得
        })
        this.first_listen = 0
      }
    },
    resetAudio () {
      if (this.first_listen === 1) {
        this.$wechat.stopVoice({
          localId: this.localId // 需要停止的音频的本地ID，由stopRecord接口获得
        })
        this.first_listen = 0
      }
      this.audioDialog = true
      this.showAudio = false
      this.recordTime = 0
      this.percent = 0
    },
    uploadAudio () {
      console.log('调用上传接口')
      if (this.first_listen === 1) {
        this.$wechat.stopVoice({
          localId: this.localId // 需要停止的音频的本地ID，由stopRecord接口获得
        })
        this.first_listen = 0
      }
      var that = this
      this.$wechat.uploadVoice({
        localId: that.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
        isShowProgressTips: 0, // 默认为1，显示进度提示
        success: function (res) {
          console.log('上传' + res.serverId)
          var serverId = res.serverId // 返回音频的服务器端ID
          console.log(serverId)
          that.localId = ''
          that.$vux.loading.show({
            text: 'Loading'
          })
          uploadMedia(serverId).then(res => {
            console.log(res)
            that.$vux.loading.hide()
            if (res.code === 200) {
              that.cardInfor.audio = res.data.url
              AlertModule.show({
                title: '提示',
                content: '上传成功!'
              })
              that.audioDialog = false
              that.showAudio = false
              that.recordTime = 0
              that.percent = 0
              // that.recording = true
            } else {
              AlertModule.show({
                title: '提示',
                content: res.data.msg
              })
            }
          })
        }
      })
    },
    changeTemplate (val, index) {
      this.seletedTemplate = val
      this.templateId = index
      this.cardInfor.style_id = index
      this.selectedClass = `card-template-${index + 1}`
    },
    gotoProduce () {
      this.$router.push({
        path: '/produce'
      })
    },
    gotoCase () {
      this.$router.push({
        path: '/case'
      })
    },
    dataURLtoBlob (dataurl) {
      let arr = dataurl.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let bstr = atob(arr[1].replace(/\s/g, ''))
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new Blob([u8arr], { type: mime })
    },
    switchImg (isJump) {
      let dataURL
      const config = {
        logging: false,
        useCORS: true
      }
      html2canvas(document.querySelector('#card'), config).then(canvas => {
        dataURL = canvas.toDataURL('image/png')
        let blob = this.dataURLtoBlob(dataURL) // base64转blob对象，用于上传
        // var size = blob.size
        // if (size > 131584) {
        //   alert('上传头像小于1MB！')
        // }
        // 创建FormData对象
        let fd = new FormData()
        let filename = 'card.png'
        fd.append('avatar', blob, filename)
        upload_img(fd).then(res => {
          if (res.data && res.data.url) {
            this.cardInfor.card_image = res.data.url
            delete this.cardInfor.tag
            this.cardInfor.album = this.albumList.join(',')
            updateCard(this.cardInfor).then(res => {
              if (isJump) {
                this.$router.back(-1)
              }
              this.$vux.loading.hide()
            })
          }
        })
      })
    },
    save (isJump) {
      if (isJump) {
        var phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/
        var mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
        var telReg = /^\d{3}-\d{8}|\d{4}-\d{7}$/
        var tel1Reg = /^\d{3}\d{8}|\d{4}\d{7}$/
        var phone = this.cardInfor.phone
        var email = this.cardInfor.email
        var tel = this.cardInfor.tel
        if (!phoneReg.test(phone)) {
          AlertModule.show({
            title: '提示',
            content: '请输入有效的手机号码！'
          })
          return false
        }
        if (!mailReg.test(email)) {
          AlertModule.show({
            title: '提示',
            content: '请输入有效的邮箱！'
          })
          return false
        }
        if (this.cardInfor.address === '') {
          AlertModule.show({
            title: '提示',
            content: '请输入地址！'
          })
          return false
        }
        if (tel !== '') {
          console.log(!telReg.test(tel))
          console.log(!tel1Reg.test(tel))
          if (!telReg.test(tel) && !tel1Reg.test(tel)) {
            AlertModule.show({
              title: '提示',
              content: '请输入有效的座机号！'
            })
            return false
          }
        }
        this.$vux.loading.show({
          text: 'Loading'
        })
        this.switchImg(isJump)
      } else {
        this.switchImg(isJump)
      }
    }
  },
  computed: {
    cardInfor: {
      get () {
        return this.$store.state.user.cardInfor
      },
      set () {}
    }
  },
  mounted () {
    this.getCard()
    var that = this
    this.$wechat.ready(() => {
      console.log('ready')
      that.$wechat.onVoicePlayEnd({
        success: function (res) {
          that.first_listen = 0
        }
      })
    })
    this.audiotime = setInterval(function () {
      if (that.recording) {
        that.recordTime += 100
        that.showTime = parseInt(that.recordTime / 1000)
        that.percent = parseInt(that.recordTime / 600)
      }
    }, 100)
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.edit-card {
  overflow: auto;
  height: 100%;
  -webkit-overflow-scrolling: touch;
  padding: 0.5rem 0.3rem;
  .my-card {
    border-radius: 0.1rem;
    overflow: hidden;
    position: relative;
    height: 4.9rem;
    box-shadow: 0px 0px 0.5rem #e0dada;
    .card-bg {
      width: 100%;
      height: 4.9rem;
      position: absolute;
      top: 0;
      left: 0;
    }
    .card-infor {
      padding: 0.5rem 0.7rem 0.3rem 0.7rem;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      font-weight: bold;
      .phone {
        height: 0.32rem;
      }
      .email {
        height: 0.32rem;
      }
      .address {
        height: 0.75rem; //调整高度,从0.72到0.75
        overflow: hidden;
      }
    }
  }
  h5 {
    font-size: 0.34rem;
    color: #717171;
    height: 1rem;
    line-height: 1.2rem;
    font-weight: normal;
    margin-top: 0.1rem;
    span {
      color: #5977fe;
      font-size: 0.26rem;
    }
  }
  .template-list {
    height: 1rem;
    width: 52.2rem;
    img {
      width: 1.4rem;
      height: 1rem;
      border-radius: 0.05rem;
      margin-left: 0.4rem;
      float: left;
      border: 1px solid #e3e3e3;
      &:first-child {
        margin-left: 0;
      }
      &.active {
        border: 1px solid #5977fe;
      }
    }
  }
  .card-avatar {
    margin-top: 0.2rem;
    position: relative;
    img {
      width: 2rem;
      height: 2rem;
      border-radius: 0.1rem;
    }
    #myFrom {
      position: absolute;
      top: 0;
      left: 0;
      width: 2rem;
      height: 2rem;
      input {
        opacity: 0;
        height: 100%;
        width: 100%;
      }
    }
  }
  .self-message {
    & /deep/ .weui-cells {
      &::after {
        display: none;
      }
      &::before {
        display: none;
      }
      .weui-label {
        font-size: 0.32rem;
        color: #717171;
        font-weight: normal;
      }
    }
    p {
      position: relative;
      // height: 0.9rem;
      min-height: 0.9rem;
      padding: 0.2rem 0.3rem;
      i {
        position: absolute;
        top: 0.25rem;
        left: 0.12rem;
        color: red;
      }
      span {
        font-size: 0.32rem;
        color: #717171;
        width: 1.5rem;
        float: left;
      }
      .vux-x-textarea.weui-cell {
        height: 50px;
        float: left;
        border: none;
        outline: none;
        width: calc(100% - 1.5rem);
        font-size: 0.34rem;
        color: #777;
        overflow: hidden;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        word-wrap: break-word;
      }
      input {
        float: left;
        width: calc(100% - 1.5rem);
        height: 0.5rem;
        border: none;
        outline: none;
        font-size: 0.34rem;
        color: #777;
      }
    }
    p.address_ {
      textarea {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        float: left;
        width: calc(100% - 1.5rem);
        border: none;
        outline: none;
        height: 0.94rem;
        overflow: auto;
        font-size: 0.34rem;
        color: #777;
        word-wrap: break-word;
      }
    }
  }
  .self-bio {
    & /deep/ .weui-cells {
      .weui-cell {
        padding: 0 15px;
        textarea {
          color: #777;
          font-family: 'Avenir', Helvetica, Arial, sans-serif;
        }
      }
      &::after {
        display: none;
      }
      &::before {
        display: none;
      }
    }
  }
  .produce-list {
    & > p {
      font-size: 0.24rem;
      color: #717171;
      clear: both;
    }
    ul {
      overflow: hidden;
      width: 100%;
    }
    li {
      width: 2.1rem;
      margin-right: 0.3rem;
      margin-top: 0.3rem;
      float: left;
      &:nth-of-type(3n) {
        margin-right: 0;
      }
      img {
        display: block;
        width: 100%;
        height: 2.25rem;
        border-radius: 0.1rem;
      }
      span {
        display: block;
        text-align: center;
        margin-top: 0.3rem;
        height: 0.4rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .case-list {
    & > p {
      font-size: 0.24rem;
      color: #717171;
      clear: both;
    }
    ul {
      overflow: hidden;
      width: 100%;
    }
    li {
      width: 2.2rem;
      margin-top: 0.3rem;
      margin-right: 0.15rem;
      float: left;
      &:nth-of-type(3n) {
        margin-right: 0;
      }
      img {
        width: 100%;
        height: 2.25rem;
        border-radius: 0.1rem;
      }
      p {
        text-align: center;
        span {
          width: 1.5rem;
          height: 0.45rem;
          line-height: 0.45rem;
          display: inline-block;
          border-radius: 0.1rem;
          font-size: 0.28rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
  .self-audio {
    & > p {
      text-align: center;
      font-size: 0.24rem;
      color: #717171;
      .vux-x-icon {
        fill: #5977fe;
        width: 0.3rem;
        height: 0.3rem;
      }
    }
    audio {
      margin-top: 0.3rem;
      width: 100%;
    }
  }
  .self-img {
    p {
      position: relative;
    }
    .icon-close {
      position: absolute;
      top: -0.15rem;
      right: 0;
      width: 0.4rem;
      height: 0.4rem;
      fill: red;
    }
    img {
      width: 2rem;
      height: 2rem;
      margin-right: 0.2rem;
      margin-bottom: 0.2rem;
      float: left;
      border-radius: 0.1rem;
    }
    & > span {
      position: relative;
      width: 2rem;
      height: 2rem;
      float: left;
      .icon-insert {
        width: 2rem;
        height: 2rem;
        fill: #ccc;
        border-radius: 0.1rem;
        border: 1px solid #ccc;
      }
    }
    form {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      input {
        width: 100%;
        height: 100%;
      }
    }
  }
  .self-tag {
    li {
      margin-top: 0.4rem;
      height: 0.5rem;
      border-radius: 0.5rem;
      line-height: 0.5rem;
      text-align: center;
      background-color: #f4f4f4;
      float: left;
      margin-right: 0.4rem;
      color: #717171;
      padding: 0 0.3rem;
      position: relative;
      .icon-delete {
        position: absolute;
        top: 0;
        right: 0;
        fill: red;
        width: 0.24rem;
        height: 0.24rem;
      }
    }
  }
  .self-btn {
    margin: 1rem 0;
    padding: 0 1rem;
  }
  .insert-dialog {
    padding-bottom: 0.3rem;
    h4 {
      font-size: 0.3rem;
      color: #717171;
      margin-top: 0.3rem;
      font-weight: normal;
    }
    .btn {
      margin-top: 0.5rem;
      button {
        width: 2.4rem;
      }
    }
  }
  .audio-dialog {
    text-align: center;
    color: #717171;
    padding-bottom: 0.5rem;
    h4 {
      font-size: 0.3rem;
      margin-top: 0.3rem;
      margin-bottom: 0.3rem;
      font-weight: normal;
    }
    p {
      font-size: 0.22rem;
      margin-bottom: 0.5rem;
    }
    & > div {
      width: 3rem;
      height: 3rem;
      margin: 0 auto;
    }
  }
  & /deep/ .weui-dialog {
    max-width: 6rem;
  }
}
.cropWrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  z-index: 3;
  .crop-btn {
    button {
      background-color: #5977fe;
      width: 120px;
      height: 40px;
      border-radius: 40px;
      border: none;
      color: #fff;
      outline: none;
      margin-top: 30px;
    }
  }
}
</style>
