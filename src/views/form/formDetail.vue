/*
* @Author: zhangmengli
* @Date: 2018-12-12 10:58:27
* @Last Modified by: zhangmengli
* @Last Modified time: 2018-12-12 10:58:27
*/
<template>
  <div class="form">
    <div class="form-title">
      <div class="form-title-left">
        <img :src="messageFormData.image !== undefined && messageFormData.image !== ''  ? messageFormData.image: '../../assets/img/u112.png'">
      </div>
      <div class="form-title-right">
        <p>{{wx_name}}</p>
        <p>{{Global.parseTime(messageFormData.create_time, '{y}-{m}-{d} {h}:{i}:{s}')}}</p>
      </div>
    </div>
    <div class="form-content">
      <ul>
        <li v-for="(item, index) in messageFormData.message" :index="index">
          <p class="form-left" v-if="item.field.indexOf('phone') === -1 || (item.field.indexOf('phone') !== -1 && item.content ==='无')"><span>{{ item.title }}</span> {{ item.content }}</p>
          <div v-if="item.field.indexOf('phone') !== -1 && item.content !=='无'" class="call-phone-content">
            <p class="form-left"><span>{{ item.title }}</span>{{ item.content }}</p>
            <p class="call-phone"><a :href="'tel:'+item.content">拨打</a></p>
          </div>
        </li>
      </ul>
      <div class="nodata" v-if="no_data">暂无数据!</div>
    </div>
  </div>
</template>

<script>
import {
  Tab,
  TabItem,
  XButton,
  AlertModule
} from 'vux'
import { getMessageFormDetail } from '@/api/form'
export default {
  name: 'formDetail',
  components: {
    XButton,
    Tab,
    TabItem,
    AlertModule
  },
  data () {
    return {
      wx_name: this.$route.query.wx_name !== undefined ? this.$route.query.wx_name : '',
      messageFormData: [],
      no_data: false
    }
  },
  methods: {
    formateMessageDate (data) { // 把留言信息格式化
      let arr = []
      if (data.content !== undefined && Object.keys(data.content).length > 0) {
        Object.keys(data.content).forEach(function (key) {
          let title = ''
          let str = ''
          let obj = {
            title: '',
            content: '',
            field: ''
          }
          Object.keys(data.fields).forEach(function (i) {
            if (key === i) {
              title = data.fields[i].replace(/(^\s*)|(\s*$)/g, '')
              return null
            }
          })
          if (title !== '') {
            let flag1 = title.lastIndexOf('：') === -1
            let flag2 = title.lastIndexOf(':') === -1
            if (flag1 && flag2) {
              str = title + '：'
            } else {
              str = title.substr(0, title.length - 1) + '：'
            }
          } else {
            str = '无标题：'
          }
          obj.title = str
          obj.field = key
          var type = typeof data.content[key]
          if (type !== 'string') {
            if (data.content[key][0] !== undefined && data.content[key][0] !== '') {
              obj.content = data.content[key][0]
            } else {
              obj.content = '无'
            }
          } else if (type === 'string' && data.content[key] === '') {
            obj.content = '无'
          } else {
            obj.content = data.content[key]
          }
          if (obj.content !== '') {
            arr.push(obj)
          }
        })
      }
      return arr
    },
    getMessageById () {
      this.$store.commit('app/open_global_dialog')
      getMessageFormDetail(this.$route.query.id).then(res => {
        this.$store.commit('app/close_global_dialog')
        if (res.code === 200 && res.data) {
          this.no_data = false
          let message = this.formateMessageDate(res.data)
          res.data.message = message
          this.messageFormData = res.data
        } else {
          this.no_data = true
        }
      }).catch((e) => {
        this.$store.commit('app/close_global_dialog')
      })
    }
  },
  created () {
  },
  computed: {},
  mounted () {
    this.getMessageById()
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
  .form {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    .form-title{
      height: 1.12rem;
      margin: 0.2rem 0.4rem;
      border-bottom: 1px solid #dfdfdf;
      .form-title-left{
        float: left;
        display: inline-block;
        width: 14%;
        img{
          width: 0.72rem;
          height: 0.72rem;
          border: 1px solid #fbf9fe;
        }
      }
      .form-title-right{
        width: 85%;
        float: right;
        display: inline-block;
        p{
          font-size: 0.34rem;
          line-height: 0.42rem;
          font-family: '黑体',serif;
          color: #353535;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
        p:nth-child(2) {
          font-size: 0.24rem;
          color: #999999;
        }
      }
    }
    .form-content{
      margin: 0 0.4rem;
      .nodata{
        line-height: 1.5rem;
        text-align: center;
        font-family: '黑体',serif;
        font-size: 0.3rem;
        color: #999;
      }
      ul{
        height: calc(100% - 1.12rem);
        li{
          // height: 0.75rem;
          padding-right: 0.4rem;
          p{
            color: #353535;
            font-size: 0.33rem;
            line-height: 0.72rem;
            font-family: '黑体',serif;
            span{
              color: #999999;
            }
          }
          .call-phone-content{
            display: flex;
            justify-content: space-between;
            .call-phone{
              width: 0.8rem;
              text-align: center;
              height: 0.5rem;
              line-height: 0.5rem;
              border: 1px solid #5977fe;
              color: #5977fe;
              font-size: 0.28rem;
              margin-top: 0.1rem;
              -webkit-tap-highlight-color: rgba(0,0,0,0);
            }
          }
        }
      }
    }
  }
</style>
