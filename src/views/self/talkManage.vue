/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-06 14:51:27
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-17 20:57:44
 */
<template>
  <div class="talk-manage">
    <h3>选择话术</h3>
    <div>
      <div class="talk-group">
        <a :class="{active: item.id === groupId}" v-for="(item, index) in talkGroupList" :key="index" @click="getTalkList(item.id)">{{item.label}}</a>
      </div>
      <div class="talk-list">
        <p class="tac" @click="gotoInsert">新增话术</p>
        <ul>
          <li v-for="item in talk" :key="item" @click="gotoDetail(item.id)">
            <p class="title">{{item.keyword}}</p>
            <p class="content">{{item.content}}</p>
            <x-icon type="ios-arrow-right" class="icon-right"></x-icon>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { talkGroup, talkList } from '@/api/talk'
export default {
  name: 'talkManage',
  data () {
    return {
      talkGroupList: [],
      talk: [],
      groupId: 0
    }
  },
  methods: {
    gotoInsert () {
      this.$router.push({
        path: '/talkInsert',
        query: {
          groupId: this.groupId
        }
      })
    },
    gotoDetail (id) {
      this.$router.push({
        path: '/talkDetail',
        query: {
          id
        }
      })
    },
    getTalkGroup () {
      const data = {
        type: 'verbal'
      }
      talkGroup(data)
        .then(res => {
          this.talkGroupList = res.data
          this.groupId = this.talkGroupList[0].id
          this.getTalkList(this.groupId)
        })
    },
    getTalkList (id) {
      this.groupId = id
      const data = {
        pid: id,
        page: 1,
        pagesize: 1000,
        keyword: ''
      }
      talkList(data)
        .then(res => {
          this.talk = res.data.rows
        })
    }
  },
  mounted () {
    this.getTalkGroup()
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.talk-manage{
  height: 100%;
  overflow: hidden;
  h3{
    height: 1rem;
    line-height: 1rem;
    border-bottom: 1px solid #2f80ed;
    text-align: center;
    font-size: 0.36rem;
  }
  &>div{
    height: calc(100% - 1rem);
  }
  .talk-group{
    float: left;
    width: 1.6rem;
    height: 100%;
    overflow: auto;
    padding: 0.2rem;
    border-right: 1px solid #2f80ed;
    a{
      width: 100%;
      display: block;
      height: 0.7rem;
      line-height: 0.7rem;
      text-align: center;
      font-size: 0.28rem;
      color: #2d2d2d;
      overflow: hidden;
      &.active{
        text-decoration: underline;
        color: #5977fe;
      }
    }
  }
  .talk-list{
    padding: 0.3rem;
    float: left;
    width: calc(100% - 1.6rem);
    height: 100%;
    overflow: auto;
    &>p{
      color: #5977fe;
      font-size: 0.28rem;
      text-decoration: underline;
    }
    li{
      height: 1.2rem;
      border-bottom: 1px solid #ddd;
      color: #717171;
      padding: 0.2rem 0.5rem 0.2rem 0.3rem;
      position: relative;
      .title{
        font-size: 0.2rem;
        height: 0.35rem;
        overflow: hidden;
      }
      .content{
        font-size: 0.26rem;
        height: 0.35rem;
        overflow: hidden;
      }
      .icon-right{
        position: absolute;
        top: 0.34rem;
        right: 0;
        width: 0.5rem;
        fill: #717171;
      }
    }
  }
}
</style>
