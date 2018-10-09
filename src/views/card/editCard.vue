/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-10 16:09:36
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-10-09 09:34:10
 */
<template>
  <div class="edit-card">
    <div class="my-card" id="card">
      <img src="@/assets/card/1.png" alt="" class="card-bg">
      <div class="card-infor " :class="selectedClass">
        <p class="mark" v-if="templateId === 1 || templateId === 4 || templateId === 7 || templateId === 10 || templateId === 13 || templateId === 17 || templateId === 20 || templateId === 23 ">T云商务</p>
        <p class="mark" v-if="templateId === 2 || templateId === 5 || templateId === 8 || templateId === 11 || templateId === 14 || templateId === 18 || templateId === 21 || templateId === 24">T云客服</p>
        <p class="trueland">
          <img src="@/assets/img/trueland.png" alt="" >
          <span v-if="templateId === 0 || templateId === 1 || templateId === 2">珍岛股份·上海</span>
          <span v-if="templateId === 3 || templateId === 4 || templateId === 5">珍岛股份·无锡</span>
          <span v-if="templateId === 6 || templateId === 7 || templateId === 8">珍岛股份·苏州</span>
          <span v-if="templateId === 9 || templateId === 10 || templateId === 11">珍岛股份·宁波</span>
          <span v-if="templateId === 12 || templateId === 13 || templateId === 14">珍岛股份·温州</span>
          <span v-if="templateId === 15 || templateId === 16 || templateId === 17">珍岛股份·深圳</span>
          <span v-if="templateId === 18 || templateId === 19 || templateId === 20">珍岛股份·成都</span>
          <span v-if="templateId === 21 || templateId === 22 || templateId === 23">珍岛股份·杭州</span>
        </p>
        <!-- <p class="company">{{cardInfor.company}}</p> -->
        <p class="bio">
          <img :src="cardInfor.image" alt="" class="avatar">
          <span class="name">{{cardInfor.username}}</span>
          <span class="job">{{cardInfor.job}}</span>
        </p>
        <p class="phone">
          <!-- <img src="@/assets/nav/phone2.png" alt=""> -->
          <img src="@/assets/nav/phone.png" alt="">
          {{cardInfor.phone}}
          </p>
        <p class="email">
          <!-- <img src="@/assets/nav/email2.png" alt="" > -->
          <img src="@/assets/nav/email.png" alt="">
          {{cardInfor.email}}
        </p>
        <p class="address">
          <!-- <img src="@/assets/nav/map2.png" alt="" > -->
          <img src="@/assets/nav/map.png" alt="">
          {{cardInfor.address}}
        </p>
        <p class="tip">中国领先的SaaS级智能营销云平台</p>
      </div>
    </div>
    <h5>名片样式</h5>
    <scroller ref="scrollerEvent" lock-y :scrollbar-x='false' style="margin-top: 0.2rem;">
     <div class="template-list">
        <img src="@/assets/card/1.png" alt="" :class="{active: index === templateId}" v-for="(item, index) in 24" :key="index" @click="changeTemplate(item, index)">
      </div>
    </scroller>
    <h5>名片头像</h5>
    <div class="card-avatar">
      <img :src="cardInfor.image" alt="">
      <form action="" id="myFrom">
        <input type="file" accept="image/*;capture=camera"  @change="changeFile($event, 'avatar')" name="avatar"/>
      </form>
    </div>
    <h5>个人信息</h5>
    <div class="self-message">
      <group>
        <x-input title="手机:" is-type="china-mobile" placeholder="未填写信息" v-model="cardInfor.phone" type="tel" @on-blur="myFocus"></x-input>
        <x-input title="座机:" placeholder="未填写信息" v-model="cardInfor.tel" type="tel" @on-blur="myFocus"></x-input>
        <x-input title="微信:" placeholder="未填写信息" v-model="cardInfor.weixin" @on-blur="myFocus"></x-input>
        <x-input title="邮箱:" is-type="email" placeholder="未填写信息" v-model="cardInfor.email" type="text" @on-blur="myFocus"></x-input>
        <x-input title="地址:" placeholder="未填写信息" v-model="cardInfor.address" @on-blur="myFocus"></x-input>
      </group>
    </div>
    <h5>个人简介</h5>
    <div class="self-bio">
      <group>
        <x-textarea placeholder="请输入文字" v-model="cardInfor.content" autosize @on-blur="myFocus"></x-textarea>
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
    <!-- <h5>录制语音</h5>
    <div class="self-audio">
      <p @click="audioDialog = true">暂无声音录制，请点击录制 <x-icon type="ios-plus-outline"></x-icon></p>
      <audio src="@/assets/audio/audio.ogg" controls="controls"></audio>
    </div> -->
    <h5>我的图片</h5>
    <div class="self-img clearfix">
      <p v-for="(item, index) in albumList" :key="index" class="fl" v-if="item != ''">
        <x-icon type="ios-close" class="icon-close" @click="removeAlbum(index)"></x-icon>
        <img :src="item" alt=""  >
      </p>
      <span>
        <form action="" id="album">
          <input type="file" accept="image/*;capture=camera"  @change="changeFile($event, 'album')" name="avatar"/>
        </form>
        <x-icon type="ios-plus-empty" class="icon-insert"></x-icon>
      </span>
    </div>
    <h5>添加标签</h5>
    <div class="self-tag clearfix">
      <ul>
        <li v-for="(item, index) in cardInfor.tag" :key="index">{{item.tag_name}}<x-icon type="ios-minus" class="icon-delete" @click.native="removeTag(index,item.id)"></x-icon></li>
        <li><x-icon type="ios-plus-empty" class="icon-insert" @click.native="openTagDialog"></x-icon></li>
      </ul>
    </div>
    <p class="self-btn">
      <x-button type="primary" @click.native="save">保存</x-button>
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
        <p>时间不长于01:30s</p>
        <div @touchstart.stop.prevent="touchstart" @touchend.stop.prevent="touchend">
          <x-circle
            :percent="percent"
            :stroke-width="6"
            :trail-width="6"
            :stroke-color="['#36D1DC', '#5B86E5']"
            trail-color="#ececec">
            <span v-if="false">长按录音</span>
            <span style="color:#36D1DC">{{ percent }}%</span>
          </x-circle>
        </div>
      </div>
    </x-dialog>
  </div>
</template>

<script>
import { Scroller, XInput, Group, XButton, Cell, XTextarea, XDialog, XCircle, AlertModule } from 'vux'
import html2canvas from 'html2canvas'
import { updateCard, cardRead, cardTagDelete, cardTagInsert } from '@/api/card'
import { upload_img } from '@/api/upload_file'
import Cookies from 'js-cookie'

export default {
  name: 'editCard',
  components: {
    Scroller, XInput, Group, XButton, Cell, XTextarea, XDialog, XCircle, AlertModule
  },
  data () {
    return {
      cardInfor: {
        phone: '',
        tel: '',
        wechat: '',
        email: '',
        company: '',
        address: '',
        goods_case: {
          case: [],
          goods: []
        }
      },
      albumList: [],
      templateId: 0, // 选中的模板id
      tagKeyword: '', // 新增的标签内容
      insertTagDialog: false,
      audioDialog: false,
      percent: 80,
      seletedTemplate: require('@/assets/card/1.png'),
      selectedClass: 'card-template-1',
      templateCard: [
        require('@/assets/card/1.png'),
        require('@/assets/card/1.png'),
        require('@/assets/card/1.png')
      ]
    }
  },
  methods: {
    closeTagDialog () {
      this.insertTagDialog = false
    },
    openTagDialog () {
      this.insertTagDialog = true
      this.tagKeyword = ''
    },
    insertTag () {
      this.$vux.loading.show({
        text: 'Loading'
      })
      const data = {
        tag: this.tagKeyword
      }
      this.closeTagDialog()
      cardTagInsert(data)
        .then(res => {
          this.$vux.loading.hide()
          this.cardInfor.tag.push({tag_name: this.tagKeyword, id: res.data.card_tag_id})
        })
    },
    removeTag (index, id) {
      const data = {
        tag_id: id
      }
      cardTagDelete(data)
        .then(res => {
          this.cardInfor.tag.splice(index, 1)
        })
    },
    getCard () {
      cardRead()
        .then(res => {
          this.cardInfor = res.data
          // this.seletedTemplate = require(`@/assets/card/${this.cardInfor.style_id + 1}.png`)
          this.selectedClass = `card-template-${this.cardInfor.style_id + 1}`
          this.templateId = this.cardInfor.style_id
          if (this.cardInfor.album != null) {
            this.albumList = this.cardInfor.album.split(',')
          }
          if (this.cardInfor.image === '') {
            this.cardInfor.image = require('@/assets/card/comm.jpg')
          }
          const cardInforCookie = Cookies.get('cardInfor')
          if (cardInforCookie) {
            const data = JSON.parse(cardInforCookie)
            this.cardInfor.phone = data.phone
            this.cardInfor.tel = data.tel
            this.cardInfor.address = data.address
            this.cardInfor.weixin = data.weixin
            this.cardInfor.email = data.email
            Cookies.remove('cardInfor')
          }
        })
    },
    changeFile (e, type) {
      var obj = e.target.files[0]// 获取图片对象
      if (!obj) {
        return
      }
      if (obj.type !== 'image/jpeg' && obj.type !== 'image/png') {
        alert('只支持jpg、png!')
        return
      }
      if (obj.size > 2000000) {
        alert('照片大小不能超过2MB')
        return
      }
      if (type === 'avatar') {
        this.uploadFile_p(obj)
      } else if (type === 'album') {
        this.uploadFileAlbum(obj)
      }
    },
    uploadFile_p (obj) {
      this.$vux.loading.show({
        text: 'Loading'
      })
      const ele = document.querySelector('#myFrom')
      const fd = new FormData(ele)
      upload_img(fd).then(res => {
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
      upload_img(fd).then(res => {
        if (res.data && res.data.url) {
          this.$vux.loading.hide()
          this.albumList.push(res.data.url)
        }
      })
    },
    removeAlbum (index) {
      this.albumList.splice(index, 1)
    },
    touchstart () {
      console.log('start')
      // this.$wechat.startRecord()
    },
    touchend () {
      console.log('end')
      // this.$wechat.stopRecord({
      //   success: function (res) {
      //     var localId = res.localId
      //     console.log(localId, 'url')
      //   },
      //   fail: function (res) {
      //     console.log(JSON.stringify(res))
      //   }
      // })
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
      return new Blob([u8arr], {type: mime})
    },
    switchImg () {
      let dataURL
      const config = {
        logging: false,
        useCORS: true
      }
      html2canvas(document.querySelector('#card'), config).then(canvas => {
        dataURL = canvas.toDataURL('image/png')
        let blob = this.dataURLtoBlob(dataURL)// base64转blob对象，用于上传
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
            updateCard(this.cardInfor)
              .then(res => {
                this.$router.back(-1)
                this.$vux.loading.hide()
              })
          }
        })
      })
    },
    myFocus () {
      const data = {
        phone: this.cardInfor.phone,
        tel: this.cardInfor.tel,
        address: this.cardInfor.address,
        weixin: this.cardInfor.weixin,
        email: this.cardInfor.email
      }
      Cookies.set('cardInfor', JSON.stringify(data))
    },
    save () {
      var phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/
      var mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
      var phone = this.cardInfor.phone
      var email = this.cardInfor.email
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
      this.$vux.loading.show({
        text: 'Loading'
      })
      this.switchImg()
    }

  },
  mounted () {
    this.getCard()
    // this.$wechat.ready(() => {
    //   console.log('ready')
    // })
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.edit-card{
  overflow: auto;
  height: 100%;
  -webkit-overflow-scrolling: touch;
  padding: 0.5rem 0.3rem;
  .my-card{
    border-radius: 0.1rem;
    overflow: hidden;
    position: relative;
    height: 4.5rem;
    box-shadow: 0px 0px 0.5rem #e0dada;
    .card-bg{
      width: 100%;
      height: 4.5rem;
      position: absolute;
      top: 0;
      left: 0;
    }
    .card-infor{
      padding: 0.5rem 0.7rem 0.3rem 0.7rem;
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
    width: 43.2rem;
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
    position: relative;
    img{
      width: 2rem;
      height: 2rem;
      border-radius: 0.1rem;
    }
    #myFrom{
      position: absolute;
      top: 0;
      left: 0;
      width: 2rem;
      height: 2rem;
      input{
        opacity: 0;
        height: 100%;
        width: 100%;
      }
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
    ul{
      overflow: hidden;
      width: 100%;
    }
    li{
      width: 2.1rem;
      margin-right: 0.3rem;
      margin-top: 0.3rem;
      float: left;
      &:nth-of-type(3n){
        margin-right: 0;
      }
      img{
        display: block;
        width: 100%;
        height: 2.25rem;
        border-radius: 0.1rem;
      }
      span{
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
  .case-list{
    &>p{
      font-size: 0.24rem;
      color: #717171;
      clear: both;
    }
    ul{
      overflow: hidden;
      width: 100%;
    }
    li{
      width: 2.2rem;
      margin-top: 0.3rem;
      margin-right: 0.15rem;
      float: left;
      &:nth-of-type(3n){
        margin-right: 0;
      }
      img{
        width: 100%;
        height: 2.25rem;
        border-radius: 0.1rem;
      }
      p{
        text-align: center;
        span{
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
    audio{
      margin-top: 0.3rem;
      width: 100%;
    }
  }
  .self-img{
    p{
      position: relative;
    }
    .icon-close{
      position: absolute;
      top: -0.15rem;
      right: 0;
      width: 0.4rem;
      height: 0.4rem;
      fill: red;
    }
    img{
      width: 2rem;
      height: 2rem;
      margin-right: 0.2rem;
      margin-bottom: 0.2rem;
      float: left;
      border-radius: 0.1rem;
    }
    &>span{
      position: relative;
      width: 2rem;
      height: 2rem;
      float: left;
      .icon-insert{
        width: 2rem;
        height: 2rem;
        fill: #ccc;
        border-radius: 0.1rem;
        border: 1px solid #ccc;
      }
    }
    form{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      input{
        width: 100%;
        height: 100%;
      }
    }
  }
  .self-tag{
    li{
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
      .icon-delete{
        position: absolute;
        top: 0;
        right: 0;
        fill: red;
        width: 0.24rem;
        height: 0.24rem;
      }
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
      button{
        width: 2.4rem;
      }
    }
  }
  .audio-dialog{
    text-align: center;
    color: #717171;
    padding-bottom: 0.5rem;
    h4{
      font-size: 0.3rem;
      margin-top: 0.3rem;
      margin-bottom: 0.3rem;
      font-weight: normal;
    }
    p{
      font-size: 0.22rem;
      margin-bottom: 0.8rem;
    }
    &>div{
      width: 2rem;
      height: 2rem;
      margin: 0 auto;
    }
  }
  & /deep/ .weui-dialog{
    max-width: 6rem;
  }
}
</style>
