/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-06 14:51:27
 * @Last Modified by: Jessica
 * @Last Modified time: 2018-09-29 16:25:05
 */
<template>
  <div class="talk-manage">
    <h3>选择话术</h3>
    <div>
      <div class="talk-group">
        <a :class="{select_class: item.id === groupId}" v-for="(item, index) in talkGroupList" :key="index" @click="list_change(item)">{{item.pid != 0 ? '我的话术' : item.label}}</a>
        <!-- <a :class="{active: -1 == groupId}" @click="getMyTalk()">自定义话术</a> -->
      </div>
      <div class="talk-list">
        <!-- v-if="groupId==-1" -->
        <p class="tac" @click="gotoInsert" v-if="add_isShow">
            <x-icon type="ios-plus-empty" size="30"></x-icon>
           <span>新增话术</span>
        </p>
        <ul>
          <li v-for="(item, index) in talk" :key="index" @click="gotoDetail(item.id, item.group_id)">
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
import { err_Tips } from '@/utils/base'
export default {
  name: 'talkManage',
  data () {
    return {
      talkGroupList: [],
      talk: [],
      groupId: 0,
        add_isShow:true
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
    gotoDetail (id, groupId) {
      this.$router.push({
        path: '/talkDetail',
        query: {
          id,
          groupId
        }
      })
    },
    getTalkGroup () {
    this.$store.commit('app/open_global_dialog');
      const data = {
        type: 'verbal'
      }
      talkGroup(data).then(res => {
        if(res.code === 200 && res.data && res.data instanceof Array){
            this.talkGroupList = res.data
            this.groupId = this.talkGroupList[0].id
            this.getTalkList(this.groupId)
        }
        else{
            err_Tips('话术分类加载错误！',this)
        }

      }).catch((err)=>{
          err_Tips('话术分类加载错误！',this)
      })
    },
    getTalkList (id) {
        this.$store.commit('app/open_global_dialog');
        this.talk = [];
      this.groupId = id
      const data = {
        pid: id,
        page: 1,
        pagesize: 1000,
        keyword: ''
      }
      talkList(data).then(res => {
        this.$store.commit('app/close_global_dialog');
        if(res.code === 200 && res.data && res.data.rows && res.data.rows instanceof Array){
            this.talk = res.data.rows;
        }
        else{
            err_Tips('详细加载错误！',this)
        }

      }).catch((err)=>{
          this.$store.commit('app/close_global_dialog');
          err_Tips('详细加载错误！',this)
      })
    },
    getMyTalk () {
      this.groupId = -1
    },
    list_change(item){
        const id = item.id;
        if(item.pid == 0){
            this.add_isShow = false;
        }
        else{
            this.add_isShow = true;
        }
        this.getTalkList(id);
    }
  },
  mounted () {
    this.getTalkGroup()
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.talk-manage {
  height: 100%;
  overflow: hidden;
  h3 {
    height: 1rem;
    line-height: 1rem;
    border-bottom: 1px solid #e1e1e1;
    text-align: center;
    font-size: 0.33rem;
    font-family: '黑体';
    color: #010101;
  }
  & > div {
    height: calc(100% - 1rem);
  }
    .talk-group {
        float: left;
        width: 1.6rem;
        height: 100%;
        overflow: auto;
        padding: 0.2rem 0;
        border-right: 1px solid #e1e1e1;
        a {
            font-family: '黑体';
            width: 100%;
            display: block;
            height: 0.6rem;
            line-height: 0.6rem;
            text-align: center;
            font-size: 0.3rem;
            color: #353535;
            overflow: hidden;
            padding: 0 0.14rem;
            margin-bottom: 0.3rem;
            border-right: 2px transparent solid;
        }
        .select_class {
            border-right: 2px #3c7df0 solid;
        }
    }
  .talk-list {
    padding: 0.3rem;
    float: left;
    width: calc(100% - 1.6rem);
    height: 100%;
    overflow: auto;
    .tac{
        width: 100%;
        height: 0.88rem;
        background: #f6f6f6;
        border: 1px #e1e1e1 solid;
        border-radius: 3px;
        margin-bottom: 0.2rem;
        box-shadow: 2px 2px 10px 2px #e3e3e3;
        line-height: 0.88rem;
        font-family: '黑体';
        font-size: 0.31rem;
        color: #353535;
        text-align: center;

        svg{
            float: left;
            margin-left: 1.6rem;
            margin-top: 0.1rem;
        }
        span{
            float: left;
            margin-left: 0.1rem;
        }
    }
      li {
          border: 1px solid #ebebeb;
          color: #717171;
          padding: 0.18rem;
          background: #fff;
          border-radius: 3px;
          margin-bottom: 0.2rem;
          box-shadow: 2px 2px 10px 2px #e3e3e3;
          position: relative;
          .title {
              font-family: '黑体';
              font-size: 0.33rem;
              height: 0.5rem;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              color: #353535;
              width: 4.2rem;
          }
          .content {
              font-family: '黑体';
              font-size: 0.24rem;
              color: #bdbdbd;
              height: 0.35rem;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              width: 4.2rem;
          }
          svg{
              position: absolute;
              right: 0;
              top: 0.4rem;
              fill: #cfcfcf;
          }

      }
  }
}
</style>
