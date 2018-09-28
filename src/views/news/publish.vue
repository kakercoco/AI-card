/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-04 16:38:43
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-18 20:28:23
 */
<template>
  <div class="publish">
    <group title="动态内容">
      <x-textarea  v-model="value" placeholder="输入文字" autosize></x-textarea>
    </group>
    <group title="添加图片">
      <p class="upload-imglist clearfix">
        <span v-for="(item,i) in fileList" :key="i" class="fl" style="position:relative;">
          <x-icon type="ios-close-outline" class="vux-close"></x-icon>
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
        alert('内容不能为空！')
        return
      }

      const content = this.fileList.join(',')

      to_release({
        type: 1,
        title: this.value,
        content
      }).then((e) => {
        if (e.code === 200) {
          this.$router.push({
            path: '/main/news'
          })
        }
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
  padding: 0.3rem;
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
      right: 0;
      top: -0.2rem;
      fill: #fff;
      background-color: #999;
      border-radius: 0.5rem;
      width: 0.5rem;
      height: 0.5rem;
    }
    img{
      width: 2rem;
      height: 2rem;
      margin-right: 0.2rem;
      margin-bottom: 0.2rem;
      float: left;
    }
    .upload-btn{
      width: 2rem;
      height: 2rem;
      margin-right: 0.2rem;
      margin-bottom: 0.2rem;
      float: left;
      position: relative;
      border: 1px solid #ddd;
      text-align: center;
      input{
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        opacity: 0;
      }
      .vux-x-icon{
        width: 1.3rem;
        height: 1.3rem;
        margin-top: 0.3rem;
        fill: #aaa;
      }
    }
  }
  .btn{
    padding: 0 0.7rem;
    margin-top: 1rem;
  }
}
</style>
