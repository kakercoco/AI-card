/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-07 11:31:27
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-17 21:03:56
 */
<template>
  <div class="chat-window">
    <h4>窗口示意图</h4>
    <div class="chat">
      <div>
        <p>
          <span v-for="(item, index) in tagList" :key="item" >{{item}} <x-icon type="ios-close-empty" @click.native="removeTag(index, item)"></x-icon></span>
        </p>
      </div>
    </div>
    <div class="action clearfix">
      <p>添加窗口标签</p>
      <span v-for="(item, index) in UnTagList" :key="item" @click="insertTag(index, item)">{{item}}</span>
    </div>
  </div>
</template>

<script>
import { employsetRead, employsetUpdate, employsetDelete } from '@/api/calendar'

export default {
  name: 'chatwindow',
  data () {
    return {
      tagList: [],
      UnTagList: ['添加微信', '保存名片海报', '拨打电话']
    }
  },
  methods: {
    insertTag (index, item) {
      this.UnTagList.splice(index, 1)
      this.tagList.push(item)
      const data = {
        ac: 'tags',
        tags: item
      }
      employsetUpdate(data)
        .then(res => {
        })
    },
    removeTag (index, item) {
      this.tagList.splice(index, 1)
      this.UnTagList.push(item)
      const data = {
        ac: 'tags',
        tags: item
      }
      employsetDelete(data)
        .then(res => {
        })
    },
    get () {
      employsetRead()
        .then(res => {
          this.tagList = res.data.tags
          this.UnTagList = res.data.tags_1
        })
    },
    set () {
    }
  },
  mounted () {
    this.get()
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.chat-window{
  overflow: auto;
  height: 100%;
  h4{
    height: 0.9rem;
    line-height: 0.9rem;
    padding: 0 0.3rem;
  }
  .chat{
    height: 7rem;
    background: url('~@/assets/img/chatBg.png') no-repeat;
    background-size: contain;
    div{
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      position: relative;
      p{
        position: absolute;
        bottom: 1rem;
        left: 0;
        width: 100%;
        height: 0.8rem;
        padding: 0.2rem 0.3rem;
        span{
          padding: 0 0.1rem;
          height: 0.5rem;
          border-radius: 0.5rem;
          border: 1px solid #5977fe;
          background-color: #fff;
          line-height: 0.5rem;
          float: left;
          margin-right: 0.2rem;
          font-size: .28rem;
          color: #717171;
          .vux-x-icon{
            float: right;
            fill: #717171;
          }
        }
      }
    }
  }
  .action{
    padding: 0.3rem;
    p{
      height: 0.5rem;
      line-height: 0.5rem;
      font-size: 0.3rem;
      margin-bottom: 0.2rem;
    }
    span{
      padding: 0 0.1rem;
      height: 0.5rem;
      border-radius: 0.5rem;
      border: 1px solid #5977fe;
      line-height: 0.5rem;
      float: left;
      margin-right: 0.2rem;
      font-size: .28rem;
      color: #717171;
    }
  }
}
</style>
