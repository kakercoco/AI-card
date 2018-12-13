/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-06 16:09:14
 * @Last Modified by: Jessica
 * @Last Modified time: 2018-10-18 11:57:25
 */
<template>
  <div class="talk-detail">
    <group title="话术内容"  class='bgColor'>
      <x-textarea  v-model="infor.content" :show-counter="true" autosize placeholder="请输入内容" disabled></x-textarea>
    </group>

    <div class="tag clearfix">
      <p>关键词</p>
      <span v-for="(item, index) in keyWord" :key="index" v-if="keyWord.length>0">{{item}}</span>
    </div>


    <p class="btn tac two_btn">
      <button class="btn-cancle" @click="deleteTalk">删除</button>
      <button class="btn-primary" @click="gotoEdit()">编辑</button>
    </p>

  </div>
</template>

<script>
import { talkDelete, talkEdit } from '@/api/talk'
import { XDialog,XTextarea,Group } from 'vux'
export default {
  name: 'talkDetail',
  components: {
      Group,
    XDialog,
      XTextarea
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
        const that = this;
        this.$vux.confirm.show({
            title: '温馨提示',
            content:'是否删除当前话术？',
            onCancel () {

            },
            onConfirm () {
                that.sureConform()
            }
        })
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
    background: #f8f8f8;
    .tag {
      // color: #717171;
      color: #999999;
      padding: 0.2rem 0.2rem;
      border-bottom: 1px solid #eee;
      padding-right: 0;
      background: #fff;
      p {
        font-size: 0.24rem;
        font-family: '黑体';
        color: #afafaf;
        margin-bottom: 0.2rem;
        margin-left: 0.2rem;
      }
      span {
        font-size: 0.24rem;
        float: left;
        margin-right: 0.2rem;
        position: relative;
        height: 0.6rem;
        border: 1px solid #ddd;
        padding: 0 0.35rem;
        line-height: 0.6rem;
        margin-bottom: 0.2rem;
        color: #3b63c3;
        background: #ebf1ff;
        .icon-delete {
          fill:#303135;
          width: 0.4rem;
          position: absolute;
          top: -0.2rem;
          right: -0.2rem;
        }
      }
      .icon-insert {
        height: 0.6rem;
        border: 1px solid #ddd;
        width: 1.6rem;
        fill: #717171;
        background: #efefef;
      }
    }
    & /deep/ .weui-cells__title {
      font-size: 0.24rem;
      font-family: '黑体';
      color: #afafaf;
    }
    & /deep/ .bgColor .weui-cells {
      &::after {
        border: none;
      }
      &::before {
        border: none;
      }
      .weui-cell__bd {
        border: 1px solid #eee;
        background: #fbfbfb;
        padding: 10px;
        padding-bottom: 0;
      }
      textarea {
        font-size: 0.3rem;
        color: #353535;
        background: #fbfbfb;
      }
    }
    .btn {
      margin-top: 1rem;
      padding: 0 1rem;
    }
  }
  .bgColor{
    padding-bottom: 0.2rem;
    padding-top: 0.2rem;
    border-bottom: 1px #e5e5e5 solid;
    background: #fff;
  }
  .two_btn{
    width:7rem;
    padding: 0 !important;
  margin: 0 auto;
  margin-top: 0.4rem !important;
    button{
      border-radius:3px;
      background: #3c7df0;
      font-family: '黑体';
      font-size: 0.33rem;
      color: #fff;
      height: 0.87rem;
      line-height: 0.87rem;
     width: 3.2rem;
        border:1px #3c7df0 solid;
        &:nth-of-type(1){
            background: #fff;
            color: #353535;
            border:1px #cacaca solid;

        }
    }
  }
</style>
