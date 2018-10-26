/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-06 16:09:14
 * @Last Modified by: Jessica
 * @Last Modified time: 2018-10-18 11:57:25
 */
<template>
  <div class="talk-detail">
    <div class="clearfix">
      <p>关键词</p>
      <span class="tag" v-for="(item, index) in keyWord" :key="index" v-if="keyWord.length>0">{{item}}</span>
    </div>
    <div>
      <p>编辑话术</p>
      <p>{{infor.content}}</p>
    </div>
    <p class="btn tac">
      <button class="btn-cancle" @click="deleteTalk">删除</button>
      <button class="btn-primary" @click="gotoEdit()">编辑</button>
    </p>
    <x-dialog v-model="delTalk" :hide-on-blur="true">
      <div class="del-dialog">
        <h4>是否删除当前话术？</h4>
        <p class="btn">
          <button class="btn-cancle" @click="delTalk=false">取消</button>
          <button class="btn-primary" @click="sureConform">确定</button>
        </p>
      </div>
    </x-dialog>
  </div>
</template>

<script>
import { talkDelete, talkEdit } from '@/api/talk'
import { XDialog } from 'vux'
export default {
  name: 'talkDetail',
  components: {
    XDialog
  },
  data () {
    return {
      infor: {},
      keyWord: [],
      id: this.$route.query.id,
      delTalk: false
    }
  },
  methods: {
    getDetail (id) {
      const data = {
        id: this.id
      }
      talkEdit(data).then(res => {
        this.infor = res.data
        if (this.infor.keyword !== '') {
          this.keyWord = this.infor.keyword.split(',')
        }
        console.log(this.keyWord)
      })
    },
    gotoEdit () {
      this.$router.push({
        path: '/talkUpdate',
        query: this.$route.query
      })
    },
    deleteTalk () {
      this.delTalk = true
    },
    sureConform () {
      const data = {
        id: this.$route.query.id
      }
      talkDelete(data).then(res => {
        this.delTalk = false
        if (res.code === 200) {
          this.$vux.alert.show({
            title: '提示',
            content: res.msg
          })
          this.$router.push({
            path: '/talkManage'
          })
        } else {
          this.$vux.alert.show({
            title: '提示',
            content: res.msg
          })
        }
      })
    }
  },
  mounted () {
    this.getDetail()
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.talk-detail {
  overflow: auto;
  height: 100%;
  & > div {
    border-bottom: 1px solid #ddd;
    padding: 0.3rem;
    .tag {
      font-size: 0.28rem;
      float: left;
      margin-left: 0.5rem;
      position: relative;
      height: 0.6rem;
      border-radius: 0.6rem;
      border: 1px solid #ddd;
      padding: 0 0.2rem;
      line-height: 0.55rem;
      color: #717171;
    }
    p {
      color: #717171;
      &:first-child {
        font-size: 0.32rem;
        margin-bottom: 0.3rem;
      }
      &:last-child {
        font-size: 0.28rem;
      }
    }
  }
  .del-dialog {
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
  .btn {
    margin-top: 1rem;
  }
}
</style>
