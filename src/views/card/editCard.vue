/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-10 16:09:36
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-19 14:12:26
 */
<template>
  <div class="edit-card">
    <div class="my-card" id="card">
      <img :src="seletedTemplate" alt="" class="card-bg">
      <div class="card-infor " :class="selectedClass">
        <p class="company">{{cardInfor.company}}</p>
        <p class="bio">
          <img :src="cardInfor.image" alt="" class="avatar">
          <span class="name">{{cardInfor.username}}</span>
          <span class="job">销售总监</span>
        </p>
        <p class="phone"><i class="iconfont icon-dianhua1"></i>{{cardInfor.phone}}</p>
        <p class="address"><i class="iconfont icon-dingwei"></i>{{cardInfor.address}}</p>
      </div>
    </div>
    <h5>名片样式</h5>
    <scroller ref="scrollerEvent" lock-y :scrollbar-x='false' style="margin-top: 0.2rem;">
     <div class="template-list">
        <img :src="item" alt="" :class="{active: index === templateId}" v-for="(item, index) in templateCard" :key="index" @click="changeTemplate(item, index)">
      </div>
    </scroller>
    <h5>名片头像</h5>
    <div class="card-avatar">
      <img :src="cardInfor.image" alt="">
      <form action="" id="myFrom">
        <input type="file" accept="image/*;capture=camera" multiple="multiple" @change="changeFile($event)" name="avatar"/>
      </form>
    </div>
    <h5>个人信息</h5>
    <div class="self-message">
      <group>
        <x-input title="手机:" placeholder="未填写信息" v-model="cardInfor.phone"></x-input>
        <x-input title="座机:" placeholder="未填写信息" v-model="cardInfor.tel"></x-input>
        <x-input title="微信:" placeholder="未填写信息" v-model="cardInfor.weixin"></x-input>
        <x-input title="邮箱:" placeholder="未填写信息" v-model="cardInfor.email"></x-input>
        <x-input title="公司:" placeholder="未填写信息" v-model="cardInfor.company"></x-input>
        <x-input title="地址:" placeholder="未填写信息" v-model="cardInfor.address"></x-input>
      </group>
    </div>
    <h5>个人简介</h5>
    <div class="self-bio">
      <group>
        <x-textarea placeholder="请输入文字" v-model="cardInfor.content" autosize></x-textarea>
      </group>
    </div>
    <h5>推荐产品 <span class="fr" @click="gotoProduce">产品管理</span></h5>
    <div class="produce-list">
      <p class="tac">暂无推荐商品</p>
      <ul>
        <li v-for="(item, index) in 6" :key="index">
          <img src="@/assets/img/u112.png" alt="">
          <span>产品名称</span>
        </li>
      </ul>
    </div>
    <h5>推荐案例 <span class="fr">案例管理</span></h5>
    <div class="case-list">
      <p class="tac">暂无推荐案例</p>
      <ul>
        <li v-for="(item, index) in 6" :key="index" class="card-shadow">
          <img src="@/assets/img/u112.png" alt="">
          <p><span>案例名称</span></p>
        </li>
      </ul>
    </div>
    <h5>录制语音</h5>
    <div class="self-audio">
      <p @click="audioDialog = true">暂无声音录制，请点击录制 <x-icon type="ios-plus-outline"></x-icon></p>
      <audio src="@/assets/audio/audio.ogg" controls="controls"></audio>
    </div>
    <h5>我的图片</h5>
    <div class="self-img clearfix">
      <img src="@/assets/img/u112.png" alt="">
      <span>
        <form action="" id="album">
          <input type="file" accept="image/*;capture=camera" multiple="multiple" @change="albumFile($event)" name="avatar"/>
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
          <x-input v-model="tagKeyword" placeholder="十字以内" :max="10"></x-input>
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
import { Scroller, XInput, Group, XButton, Cell, XTextarea, XDialog, XCircle } from 'vux'
import html2canvas from 'html2canvas'
import { updateCard, cardRead, cardTagDelete, cardTagInsert } from '@/api/card'
import { upload_img } from '@/api/upload_file'

export default {
  name: 'editCard',
  components: {
    Scroller, XInput, Group, XButton, Cell, XTextarea, XDialog, XCircle
  },
  data () {
    return {
      cardInfor: {
        phone: '',
        tel: '',
        wechat: '',
        email: '',
        company: '',
        address: ''
      },
      templateId: 0, // 选中的模板id
      tagKeyword: '', // 新增的标签内容
      insertTagDialog: false,
      audioDialog: false,
      percent: 80,
      seletedTemplate: require('@/assets/card/1.png'),
      selectedClass: 'card-template-1',
      templateCard: [
        require('@/assets/card/1.png'),
        require('@/assets/card/2.png'),
        require('@/assets/card/3.png'),
        require('@/assets/card/4.png'),
        require('@/assets/card/5.png'),
        require('@/assets/card/6.png'),
        require('@/assets/card/7.png'),
        require('@/assets/card/8.png'),
        require('@/assets/card/9.png'),
        require('@/assets/card/10.png')
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
      const data = {
        tag: this.tagKeyword
      }
      cardTagInsert(data)
        .then(res => {
          this.cardInfor.tag.push({tag_name: this.tagKeyword, id: res.data.card_tag_id})
          this.closeTagDialog()
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
          this.seletedTemplate = require(`@/assets/card/${this.cardInfor.style_id + 1}.png`)
          this.selectedClass = `card-template-${this.cardInfor.style_id + 1}`
          this.templateId = this.cardInfor.style_id
        })
    },
    changeFile (e) {
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
      this.uploadFile_p(obj)
    },
    uploadFile_p (obj) {
      const ele = document.querySelector('#myFrom')
      const fd = new FormData(ele)
      upload_img(fd).then(res => {
        if (res.data && res.data.url) {
          this.cardInfor.image = res.data.url
        }
      })
    },
    touchstart () {
      console.log('start')
      this.$wechat.startRecord()
    },
    touchend () {
      console.log('end')
      this.$wechat.stopRecord({
        success: function (res) {
          var localId = res.localId
          console.log(localId, 'url')
        }
      })
    },
    changeTemplate (val, index) {
      this.seletedTemplate = val
      this.templateId = index
      this.cardInfor.style_id = index
      this.selectedClass = `card-template-${index + 1}`
      setTimeout(() => {
        this.switchImg()
      }, 1000)
    },
    gotoProduce () {
      this.$router.push({
        path: '/produce'
      })
    },
    dataURLtoBlob (dataurl) {
      let arr = dataurl.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let bstr = atob(arr[1])
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
          }
        })
      })
    },
    save () {
      delete this.cardInfor.tag
      updateCard(this.cardInfor)
        .then(res => {

        })
    }

  },
  mounted () {
    this.getCard()
    this.$wechat.ready(() => {
      console.log('ready')
    })
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
      display: flex;
      flex-wrap: wrap;
    }
    li{
      width: 2.1rem;
      margin-right: 0.3rem;
      margin-top: 0.3rem;
      &:nth-of-type(3n){
        margin-right: 0;
      }
      img{
        display: block;
        width: 100%;
        height: 2.25rem;
      }
      span{
        display: block;
        text-align: center;
        margin-top: 0.3rem;
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
      display: flex;
      flex-wrap: wrap;
    }
    li{
      width: 2.2rem;
      margin-top: 0.3rem;
      margin-right: 0.15rem;
      &:nth-of-type(3n){
        margin-right: 0;
      }
      img{
        width: 100%;
      }
      p{
        height: 0.8rem;
        text-align: center;
        line-height: 0.8rem;
        span{
          width: 1.5rem;
          height: 0.45rem;
          line-height: 0.45rem;
          display: inline-block;
          background-color: #778dfe;
          color: #fff;
          border-radius: 0.1rem;
          font-size: 0.28rem;
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
    img{
      width: 2rem;
      height: 2rem;
      margin-right: 0.2rem;
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
