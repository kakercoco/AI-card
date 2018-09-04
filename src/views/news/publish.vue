/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-04 16:38:43
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-04 20:12:17
 */
<template>
  <div class="publish">
    <group title="动态内容">
      <x-textarea  v-model="value" placeholder="输入文字" autosize></x-textarea>
    </group>
    <group title="添加图片">
      <p class="upload-imglist clearfix">
        <span v-for="item in fileList" :key="item" class="fl" style="position:relative;">
          <x-icon type="ios-close-outline" class="vux-close"></x-icon>
          <img :src="item" alt="">
        </span>
        <span class="upload-btn">
          <input type="file"  multiple="multiple" @change="changeFile($event)" />
          <x-icon type="ios-plus-empty" size="50"></x-icon>
        </span>
      </p>
    </group>
    <div class="btn">
      <x-button type="primary">确认</x-button>
    </div>
  </div>
</template>

<script>

import { XTextarea, Group, XButton } from 'vux'

export default {
  name: 'newsPublish',
  components: {
    XTextarea, Group, XButton
  },
  data () {
    return {
      value: '',
      fileList: []
    }
  },
  methods: {
    changeFile ($event) {
      var objUrl = this.getObjectURL($event.target.files[0]) // 获取文件信息
      if (objUrl) {
        this.fileList.push(objUrl)
      }
    },
    getObjectURL (file) {
      var url = null
      if (window.createObjectURL !== undefined) { // basic
        url = window.createObjectURL(file)
      } else if (window.URL !== undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file)
      } else if (window.webkitURL !== undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file)
      }
      return url
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
