/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-04 16:38:43
 * @Last Modified by: Jessica
 * @Last Modified time: 2018-10-18 11:57:29
 */
<template>
  <div class="publish">
    <div class="text">
      <group title="请输入内容">
        <x-textarea  v-model="value" autosize :max="60"></x-textarea>
      </group>
    </div>

    <div class="add_img">
      <group title="添加图片">
        <p class="upload-imglist clearfix">
        <span v-for="(item,i) in fileList" :key="i" class="fl yyf_new_one_img" style="position:relative;">
          <x-icon type="ios-close-outline" class="vux-close" @click.native="del_pic(i)"></x-icon>
          <img :src="item">
        </span>
          <span class="upload-btn">
        <form action="" id="myFrom">
          <input type="file" accept="image/*;capture=camera" @change="changeFile($event)" name="avatar" v-if="isRendering"/>
        </form>
          <x-icon type="ios-plus-empty" size="50"></x-icon>
        </span>
        </p>
      </group>
    </div>


    <div class="btn">
      <x-button type="primary" @click.native="Release">确认</x-button>
    </div>
  </div>
</template>

<script>

import { XTextarea, Group, XButton } from 'vux'
import { upload_img } from '@/api/upload_file'
import { to_release } from '@/api/dynamic'

export default {
  name: 'newsPublish',
  components: {
    XTextarea, Group, XButton
  },
  data () {
    return {
      value: '',
      fileList: [],
      isRendering: true
    }
  },
  methods: {
    del_pic (index) {
      this.fileList.splice(index, 1)
    },
    changeFile (e) {
      var obj = e.target.files[0]// 获取图片对象
      if (!obj) {
        return
      }
      if (obj.type !== 'image/jpeg' && obj.type !== 'image/png') {
        this.$vux.alert.show({
          title: '提示',
          content: '只支持jpg、png!'
        })
        return
      }
      if (obj.size > 2000000) {
        this.$vux.alert.show({
          title: '提示',
          content: '照片大小不能超过2MB'
        })
        return
      }
      this.uploadFile_p(obj)
    },

    uploadFile_p (obj) {
      this.$vux.loading.show({
        text: '请等待'
      })
      const ele = document.querySelector('#myFrom')
      const fd = new FormData(ele)
      upload_img(fd).then(res => {
        if (res.data && res.data.url) {
          this.fileList.push(res.data.url)
          this.isRendering = false
          this.$vux.loading.hide()// 隐藏
          this.$nextTick(() => {
            this.isRendering = true
          })
        }
      })
    },

    Release () {
      if (this.value === '') {
        this.$vux.alert.show({
          title: '提示',
          content: '内容不能为空！'
        })
        return
      }

      if (this.fileList.length === 0) {
        this.$vux.alert.show({
          title: '提示',
          content: '图片不能为空！'
        })
        return
      }

      const content = this.fileList.join(',')

      this.$vux.loading.show({
          text: 'Loading'
      })

      to_release({
        type: 1,
        title: this.value,
        content
      }).then((e) => {
          this.$vux.loading.hide();
        if (e.code === 200) {
            this.$router.back(-1)
          // this.$router.push({
          //   path: '/news'
          // })
        }
        else{
            alert('发送失败')
        }
      }).catch(()=>{
          this.$vux.loading.hide();
          alert('发送失败')
      })
    }
  },
  mounted () {
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.publish{
  overflow: auto;
  height: 100%;
  & /deep/ .weui-cells__title{
    font-size: 0.32rem;
    padding-left: 0;
  }
  & /deep/ .weui-cells{
    &::after{
      border: none;
    }
    &::before{
      border: none;
    }
  }
  .upload-imglist{
    padding-top: 0.2rem;
    .vux-close{
      position: absolute;
      right:-0.1rem;
      top: -0.1rem;
      fill: #fff;
      background-color: #000;
      border-radius: 0.5rem;
      width: 0.35rem;
      height: 0.35rem;
    }
    img{
      width: 2rem;
      height: 2rem;
      margin-right: 0.2rem;
      margin-bottom: 0.2rem;
      float: left;
    }
    .upload-btn{
      width: 1rem;
      height: 1rem;
      margin-right: 0.2rem;
      margin-bottom: 0.2rem;
      float: left;
      position: relative;
      border: 1px solid #cacaca;
      text-align: center;
      background: #f2f2f2;
      input{
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        opacity: 0;
      }
      .vux-x-icon{
        width: 0.6rem;
        height: 0.6rem;
        margin-top: 0.15rem;
        fill: #aaa;
      }
    }
  }
  .btn{
    padding: 0 0.2rem;
    margin-top: 1rem;
  }
}
</style>
