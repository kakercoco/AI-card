/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-10 16:09:36
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-10-29 22:43:48
 */
<template>
  <div class="edit-card">
    <card-viewer ref="cardViewer"></card-viewer>
    <div class="new_card_frame">
      <img src="@/assets/img/l.gif" class="my_loading">
      <div class="my-card" id="card" v-show="templateId !== null">
        <img v-if="select_template.type === 'zhendao'" src="@/assets/card/1.png" alt="" class="card-bg">
        <img v-else :src="select_template.background_img" class="card-bg">
        <!--<img v-if="templateId === 24" src="@/assets/card/15.png" alt="" class="card-bg">
        <img v-if="templateId === 25" src="@/assets/card/16.png" alt="" class="card-bg">
        <img v-if="templateId === 26" src="@/assets/card/4.png" alt="" class="card-bg">
        <img v-if="templateId === 27" src="@/assets/card/5.png" alt="" class="card-bg">
        &lt;!&ndash;<img v-if="templateId === 28" src="@/assets/card/8.png" alt="" class="card-bg">&ndash;&gt;
        <img v-if="templateId === 28" src="@/assets/card/6.png" alt="" class="card-bg">
        <img v-if="templateId === 29" src="@/assets/card/7.png" alt="" class="card-bg">-->

        <!--名片展示区域-->
        <div class="card-infor " :class="'card-template-' + (select_template.templateId+1)">
          <p class="mark" v-if="select_template.type === 'zhendao'">{{select_template.subheading}}</p>
          <p class="trueland">
            <img src="@/assets/img/trueland.png" alt="">
            <span v-if="select_template.type === 'zhendao'">{{select_template.company}}</span>
            <span v-else>{{cardInfor.company}}</span>
          </p>
          <p class="bio">
            <img :src="cardInfor.image" alt="" class="avatar">
            <span class="name">{{cardInfor.username}}</span>
            <span class="job">{{cardInfor.job}}</span>
          </p>
          <p class="phone">
            <img :src="select_template.phone_icon">
            {{cardInfor.phone}}
          </p>
          <p class="email">
            <img :src="select_template.email_icon">
            {{cardInfor.email}}
          </p>
          <p class="address">
            <img :src="select_template.address_icon">
            {{cardInfor.address}}
          </p>
          <p class="tip">中国领先的SaaS级智能营销云平台</p>
        </div>
      </div>
    </div>

    <h5>名片样式</h5>
    <!--<scroller ref="scrollerEvent" lock-y :scrollbar-x='false' class="card_small_img" style="margin-top: 0.2rem;">
      <div class="template-list">
        <img src="@/assets/card/1.png" alt="" :class="{active: index === templateId}" v-for="(item, index) in 24" :key="index" @click="changeTemplate(item, index)" v-if="haDate&&other_card_style==1">
        <img :src="item" alt="" :class="{active: index + 24 === templateId}" v-for="(item, index) in companyBgCard" :key="index + 24" @click="changeTemplate(item, index + 24)"  v-if="haDate&&other_card_style==0">
        <span></span>
      </div>
    </scroller>-->
      <!--<div class="card_style_Choice">
          <div class="card_small_img">
              <div class="template-list">
                  <img src="@/assets/card/1.png" alt="" :class="{active: index === templateId}" v-for="(item, index) in 24" :key="index" @click="changeTemplate(item, index)" v-if="haDate&&other_card_style==1">
                  <img :src="item" alt="" :class="{active: index + 24 === templateId}" v-for="(item, index) in companyBgCard" :key="index + 24" @click="changeTemplate(item, index + 24)"  v-if="haDate&&other_card_style==0">
              </div>
          </div>
      </div>-->

    <div class="card_style_Choice">
      <div class="card_small_img">
        <div class="template-list">
          <!--珍岛的模板按钮-->
          <div class="one"
               v-for="(item, index) in template_list"
               :key="index" @click="changeTemplate(item, index)"
               :class="{active: select_template.templateId == item.templateId}"
               v-if="other_card_style === '1' && item.type === 'zhendao'">
            <img src="@/assets/card/1.png">
            <span>{{item.local + item.subheading}}</span>
          </div>

          <!--其他的模板按钮-->
          <div class="one"
               v-for="(item, index) in template_list"
               :key="index" @click="changeTemplate(item, index)"
               :class="{active: select_template.templateId == item.templateId}"
               v-if="other_card_style === '0' && item.type === 'other'">
            <img :src="item.background_img">
          </div>


        </div>
      </div>
    </div>




    <h5>名片头像</h5>
    <div class="card-avatar">
      <form action="" id="myFrom">
        <input type="file" accept="image/*;capture=camera" @change="setImage" name="avatar" id="avatar" />
        <img :src="cardInfor.image">
        <x-icon type="ios-plus-empty" size="50"></x-icon>
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
    <h5 class="have_line">个人信息</h5>
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
        <!--<textarea placeholder="地址" v-model="cardInfor.address"></textarea>-->
        <x-textarea placeholder="地址" v-model="cardInfor.address" autosize :rows="1"></x-textarea>
      </p>
    </div>
    <h5 class="have_line">个人简介</h5>
    <div class="self-bio">
      <group>
        <x-textarea placeholder="请输入文字" v-model="cardInfor.content" autosize ref='selfBio'></x-textarea>
      </group>
    </div>
    <h5 class="pro_title">
        推荐产品
        <span class="fr" @click="gotoProduce">
            产品管理
            <x-icon type="ios-arrow-right" size="14"></x-icon>
        </span>
    </h5>

    <div class="produce-list one_pro">
      <ul>
        <li v-for="(item, index) in cardInfor.goods_case.goods" :key="index">
          <img :src="item.product_img" alt="">
          <span>{{item.product_name}}</span>
        </li>
      </ul>
    </div>

    <h5 class="pro_title">
        推荐案例
        <span class="fr" @click="gotoCase">
            案例管理
            <x-icon type="ios-arrow-right" size="14"></x-icon>
        </span>
    </h5>

    <div class="case-list one_pro">
      <p class="tac" v-if="cardInfor.goods_case.case.lenght <= 0">暂无推荐案例</p>
      <ul>
        <li v-for="(item, index) in cardInfor.goods_case.case" :key="index" class="card-shadow">
          <img :src="item.case_img" alt="">
          <p><span>{{item.case_name}}</span></p>
        </li>
      </ul>
    </div>

    <h5 class="have_line">录制语音</h5>

    <div class="self-audio">
      <p @click="audioDialog = true" class="audio_title">
        <span>请点击录制新的语音</span>
        <x-icon type="ios-plus-outline"></x-icon>
      </p>
      <audio :src="cardInfor.audio" controls="controls" v-if="cardInfor.audio!=''"></audio>
    </div>

    <h5 class="have_line">我的图片</h5>

    <div class="self-img clearfix">
      <p v-for="(item, index) in albumList" :key="index" class="fl" v-if="item != ''">
        <x-icon type="ios-close" class="icon-close" @click="removeAlbum(index)" size="100"></x-icon>
        <img :src="item" alt="">
      </p>
      <span>
        <!-- name="avatar1"-->
        <form action="" id="album">
          <input type="file" accept="image/*;capture=camera" @change="changeFile($event, 'album')" multiple />
        </form>
        <x-icon type="ios-plus-empty" size="50"></x-icon>
      </span>
    </div>

    <h5 class="have_line">添加标签</h5>

    <div class="self-tag clearfix">
      <ul>
        <li v-for="(item, index) in cardInfor.tag" :key="index">{{item.tag_name}}<x-icon type="ios-minus" class="icon-delete" @click.native="removeTag(index,item.id)"></x-icon>
        </li>
        <li class="add">
          <x-icon type="ios-plus-empty" class="icon-insert" @click.native="openTagDialog"></x-icon>
        </li>
      </ul>
    </div>

    <p class="self-btn">
      <x-button type="primary" @click.native="save(true)">保存</x-button>
    </p>
      <div v-transfer-dom>
          <popup v-model="insertTagDialog">

              <popup-header
                      left-text="取消"
                      right-text="完成"
                      title="添加自定义标签"
                      :show-bottom-border="false"
                      @on-click-left="closeTagDialog"
                      @on-click-right="insertTag"></popup-header>
              <group gutter="0">
                  <div class="my_insert-talk">
                      <group>
                          <x-input placeholder="10个字以内" :max="10" v-model="tagKeyword"></x-input>
                      </group>
                  </div>
              </group>
          </popup>
      </div>

    <!--<x-dialog v-model="insertTagDialog" :hide-on-blur="true">
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
    </x-dialog>-->


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
  AlertModule,
    Popup,TransferDom,PopupHeader
} from 'vux'
import html2canvas from 'html2canvas'
import template_list from '@/utils/card_template'
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

import cardViewer from '@/components/cardViewer/index'

export default {
  name: 'editCard',
    directives: {
        TransferDom
    },
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
    VueCropper,
    cardViewer,
      PopupHeader,
      Popup,
  },
  data () {
    return {
        template_list,
      imgSrc: '', // 选择的头像图片路径
      cropImg: '', // 裁剪过后的图片路径base64
      crop: false, // 裁剪头像弹框
      // cardInfor: {
      //   goods_case: {
      //     case: [
      //         {
      //             case_img:'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1676807226,2726748277&fm=173&app=25&f=JPEG?w=640&h=412&s=5EDDA944C6F17D9E2B37D19A0300909B',
      //             case_name:'测试案例一'
      //         },
      //         {
      //             case_img:'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1676807226,2726748277&fm=173&app=25&f=JPEG?w=640&h=412&s=5EDDA944C6F17D9E2B37D19A0300909B',
      //             case_name:'测试案例二'
      //         }
      //     ],
      //     goods: [
      //         {
      //             product_img:'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1676807226,2726748277&fm=173&app=25&f=JPEG?w=640&h=412&s=5EDDA944C6F17D9E2B37D19A0300909B',
      //             product_name:'测试产品一'
      //         },
      //         {
      //             product_img:'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1676807226,2726748277&fm=173&app=25&f=JPEG?w=640&h=412&s=5EDDA944C6F17D9E2B37D19A0300909B',
      //             product_name:'测试产品二'
      //         },
      //     ]
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
        require('@/assets/card/15.png'),
        require('@/assets/card/16.png'),
        require('@/assets/card/4.png'),
        require('@/assets/card/5.png'),
        // require('@/assets/card/8.png'),
        require('@/assets/card/6.png'),
        require('@/assets/card/7.png')
      ],
      recording: false,
      first_listen: 0,
      localId: '', // 录音id
      recordTime: 0,
      showTime: 0,
      // startTime: 0, // 录音开始时间
      // endTime: 0 // 录音结束时间
      select_template:{
          type:'',
          templateId:0,
          subheading:'',//副标题
          company:'',//公司
          background_img:'',//背景图片
          phone_icon:'',//电话图片
          email_icon:'',//邮件图片
          address_icon:'',//地址图片
      }
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
          //this.other_card_style = '1'
          this.haDate = true
          this.$store.state.user.cardInfor = res.data
          this.$store.state.user.cardInfor.close = false
          // this.cardInfor = res.data
          // this.seletedTemplate = require(`@/assets/card/${this.cardInfor.style_id + 1}.png`)
          if (this.cardInfor.album != null) {
            this.albumList = this.cardInfor.album.split(',')
          }
          if (this.cardInfor.image === '') {
            this.cardInfor.image = require('@/assets/card/comm.jpg')
          }
          if (cardImg === undefined || cardImg === '') {
            setTimeout(() => {
              this.save(false)
            }, 2000)
          }
          this.$nextTick(function () {
            this.$refs.selfBio.updateAutosize()
          })
          var el = document.querySelector('.template-list')
          console.log(this)
          if (res.data.is_zhendao === '1') {
            //el.setAttribute('style', 'width: 43.2rem')
            this.selectedClass = `card-template-${this.cardInfor.style_id + 1}`
            this.select_template.templateId = this.cardInfor.style_id;//获取当前选中的模板号
          } else {
            console.log('其他公司')
            //el.setAttribute('style', 'width: 9rem')
            if (this.cardInfor.style_id === 0) {
              this.templateId = 24
              this.selectedClass = `card-template-${this.templateId + 1}`
            } else {
              this.selectedClass = `card-template-${this.cardInfor.style_id + 1}`
              this.templateId = this.cardInfor.style_id
            }
          }
          
          //用style_id 搜索template_list，把那个对象赋值给select_template

			var json ='{"w":500,"h":250,"item":[{"id":"bg","type":"img","round":false,"lock":true,"x":0,"y":0,"w":500,"h":250,"url":"http://img4.imgtn.bdimg.com/it/u=2735571713,1090379801&fm=26&gp=0.jpg","img":{"loadover":true},"visible":true},{"id":"face","type":"img","round":false,"lock":false,"x":10,"y":30,"w":150,"h":150,"url":"/static/img/p1.e765f44.png","img":{"loadover":true},"visible":true},{"id":"name","font":"微软雅黑","visible":true,"type":"txt","lock":false,"x":200,"y":30,"w":200,"h":20,"fs":16,"color":"#00F","txt":"Name","align":"left","space":0},{"id":"career","font":"微软雅黑","visible":true,"type":"txt","lock":false,"x":200,"y":50,"w":200,"h":20,"fs":16,"color":"#00F","txt":"Career","align":"left","space":0},{"id":"companyName","font":"微软雅黑","visible":true,"type":"txt","lock":false,"x":10,"y":10,"w":200,"h":20,"fs":16,"color":"#00F","txt":"companyName","align":"left","space":0},{"id":"address","font":"微软雅黑","visible":true,"type":"txt","lock":false,"x":10,"y":200,"w":200,"h":20,"fs":16,"color":"#00F","txt":"address","align":"left","space":0},{"id":"mail","font":"微软雅黑","visible":true,"type":"txt","lock":false,"x":200,"y":70,"w":200,"h":20,"fs":16,"color":"#00F","txt":"mail","align":"left","space":0},{"id":"phone","font":"微软雅黑","visible":true,"type":"txt","lock":false,"x":200,"y":90,"w":200,"h":20,"fs":16,"color":"#00F","txt":"phone","align":"left","space":0},{"id":"mobile","font":"微软雅黑","visible":true,"type":"txt","lock":false,"x":200,"y":110,"w":200,"h":20,"fs":16,"color":"#00F","txt":"mobile","align":"left","space":0},{"id":"weixin","font":"微软雅黑","visible":true,"type":"txt","lock":false,"x":200,"y":130,"w":200,"h":20,"fs":16,"color":"#00F","txt":"weixin","align":"left","space":0},{"id":1,"type":"img","round":false,"lock":false,"add":true,"txt":"新增图片1","x":341,"y":33,"w":50,"h":50,"url":"https://p2.music.126.net/Te-J_mQiEY6pB-U1jfvJrA==/109951163523347959.jpg?param=50y50","img":{"loadover":true},"visible":true},{"id":2,"font":"微软雅黑","visible":true,"type":"txt","lock":false,"add":true,"x":317,"y":94,"w":200,"h":20,"fs":16,"color":"#00F","txt":"新增文本2","align":"left","space":0}],"itemId":2}';
			this.$refs.cardViewer.loadData(json, this.cardInfor);

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
      //this.seletedTemplate = val
      //this.templateId = index
      //this.cardInfor.style_id = index
      //this.selectedClass = `card-template-${index + 1}`
        this.select_template = val;
        this.cardInfor.style_id = val.templateId;//模板id保存到提交的对象中

    },
    gotoProduce () {
      this.$store.state.user.cardInfor.close = true
      this.$router.push({
        path: '/produce'
      })
    },
    gotoCase () {
      this.$store.state.user.cardInfor.close = true
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
  background: #f8f8f8;
  .new_card_frame{
    padding: 0.3rem;
    position: relative;
    min-height:4.76rem;
    .my_loading{
      position: absolute;
      width: 0.5rem;
      height: 0.5rem;
      left: 3.5rem;
      z-index: 10;
      top: 2.13rem;
    }
    .my-card {
      border-radius: 0.1rem;
      overflow: hidden;
      position: relative;
      z-index:11;
      height: 4.16rem;
      box-shadow: 0px 0px 0.5rem #e0dada;
      .card-bg {
        width: 100%;
        height: 4.16rem;
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
        font-family: '微软雅黑 Regular', '微软雅黑',serif;
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
  }

  h5 {
    font-size: 0.33rem;
    color: #353535;
    font-weight: normal;
    font-family: '黑体';
    padding: 0.2rem 0.3rem;
    background: #fff;
    span {
      color: #5977fe;
      font-size: 0.26rem;
    }
  }
  .template-list {
    background: #fff;
    padding: 0;
    height: 1rem;
    display: flex;
    flex-wrap: nowrap;
    span{
      float: left;
      flex: 0 0 1.4rem;
    }

    .one {
      flex: 0 0 1.6rem;
      width: 1.6rem;
      height: 1rem;
      border-radius: 0.05rem;
      margin-right: 0.2rem;
      float: left;
      border: 1px solid #e3e3e3;
      position: relative;
      img{
        width:100%;
        height: 100%;
      }
      span{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        font-size: 0.24rem;
        line-height: 1rem;
        text-align: center;

      }
      &.active {
        border: 1px solid #5977fe;
      }
    }
  }
  .card-avatar {
    background: #fff;
    position: relative;
    padding: 0 0.3rem;
    padding-bottom: 0.4rem;
    margin-bottom: 0.1rem;
    img {
      width: 2rem;
      height: 2rem;
      border-radius: 0.1rem;
    }
    #myFrom {
      position: relative;
      width: 2rem;
      height: 2rem;
      img{
        position:absolute;
        z-index: 9;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
      }
      input {
        position:absolute;
        z-index: 10;
        top: 0;
        left: 0;
        opacity: 0;
        height: 100%;
        width: 100%;
      }
    }
  }
  .self-message {
    background: #fff;
    padding:0 0.3rem;
    margin-bottom: 0.1rem;
    padding-bottom: 0.3rem;
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
      border-bottom: 1px #e5e5e5 solid;
      overflow: hidden;
      &:last-child{
        border-bottom: 1px #e5e5e5 solid;
      }
      i {
        position: absolute;
        top: 0.25rem;
        left: 0.12rem;
        color: red;
        line-height: 0.5rem;
      }
      span {
        width: 1.2rem;
        float: left;
        font-family: '微软雅黑';
        font-size: 0.28rem;
        color: #999999;
        line-height: 0.5rem;
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
        font-size: 0.28rem;
        color: #353535;
        font-family: '微软雅黑';
      }
    }
    p.address_ {
      textarea {
        margin-top: 0.06rem;
        font-family: '微软雅黑';
        float: left;
        width: calc(100% - 1.5rem);
        border: none;
        outline: none;
        overflow: auto;
        font-size: 0.28rem;
        color: #353535;
        word-wrap: break-word;
      }
    }
  }
  .self-bio {
    padding-bottom: 0.2rem;
    background: #fff;
    margin-bottom: 0.1rem;
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
  }
  .self-audio {
    padding: 0 0.3rem;
    padding-bottom: 0.3rem;
    margin-bottom: 0.1rem;
    .audio_title{
      height: 0.8rem;
      line-height: 0.8rem;
    }
    background: #fff;
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
      width: 100%;
    }
  }
  .self-img {
    padding-left:0.44rem;
    padding-top:0.3rem;
    padding-bottom:0.3rem;
    background: #fff;
    margin-bottom: 0.1rem;
    p {
      position: relative;
      width: 2.1rem;
      height: 2.1rem;
      margin-right: 0.2rem;
      margin-bottom: 0.2rem;
      float: left;


    }
    .icon-close {
      position: absolute;
      top: -0.15rem;
      right: -0.15rem;
      width: 0.4rem;
      height: 0.4rem;
      fill:#333333;
      background: #fff;
      border-radius: 100px;
      border:1px #333333 solid;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius:5px;
    }
    & > span {
      position: relative;
      width: 2.1rem;
      height: 2.1rem;
      float: left;
      background: #f2f2f2;
      border: 1px #cacaca solid;
      border-radius: 3px;
      form{
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 9;
        input{
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      svg{
        position: absolute;
        top: 0.5rem;
        left: 0.5rem;
        fill: #999999;
        z-index: 8;
      }

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
    background: #fff;
    ul{
      overflow: hidden;
    }
    li {
      margin-top: 0.2rem;
      height: 0.5rem;
      border-radius:2px;
      line-height: 0.5rem;
      text-align: center;
      background-color: #ebf1ff;
      float: left;
      margin-right: 0.2rem;
      color: #3a62c4;
      padding: 0 0.35rem;
      position: relative;
      font-family: '黑体';
      font-size: 0.24rem;
      .icon-delete {
        position: absolute;
        top: 0;
        right: -0.1rem;
        fill: #333333;
        width: 0.26rem;
        height: 0.26rem;
      }
    }
  }
  .self-btn {
    margin:0.3rem 0;
    padding: 0 0.4rem;
      button{
          border-radius:3px;
          background: #3c7df0;
          font-family: '黑体';
          font-size: 0.33rem;
          color: #fff;
          height: 0.87rem;
          line-height: 0.87rem;
      }
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
  z-index: 30;
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
