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
        <img src="../../assets/img/u112.png">
      </div>
      <div class="form-title-right">
        <p>Jane简</p>
        <p>提交时间：2018年10月21日 18:30</p>
      </div>
    </div>
    <div class="form-content">
      <ul>
        <li v-for="(item, index) in messageFormData" :index="index">
          <p class="form-left"><span>{{ item.title }}</span> {{ item.content }}</p>
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
      messageFormData: [],
      no_data: false
    }
  },
  methods: {
    objToArray (obj) {
      var arr = []
      for (var i in obj) {
        arr.push(obj[i])
      }
      return arr
    },
    getMessageById () {
      getMessageFormDetail(this.$route.query.id).then(res => {
        if (res.code === 200) {
          if (res.data && res.data.length > 0) {
            this.no_data = false
            const inputNameArr = this.objToArray(JSON.parse(this.$route.query.fields).inputName)
            for (let i = 0; i < res.data.data.length; i++) {
              const arr = []
              const contentArr = this.objToArray(JSON.parse(res.data.data[i].content))
              for (let j = 0; j < contentArr.length; j++) {
                var obj = {
                  title: '',
                  content: ''
                }
                obj.title = inputNameArr[j] + ':'
                var type = typeof contentArr[j]
                if (type !== 'string') {
                  obj.content = '无'
                } else {
                  obj.content = contentArr[j]
                }
                arr.push(obj)
              }
              res.data.data[i].message = arr
            }
            this.messageFormData = res.data.data
          } else {
            this.no_data = true
          }
        } else {
        }
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
    height: 100%;
    padding-left: 0.2rem;
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
      .nodata{
        line-height: 1.5rem;
        text-align: center;
        font-family: '黑体',serif;
        font-size: 0.3rem;
        color: #999;
      }
      ul{
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
            /*display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;*/
          }
        }
      }
    }
  }
</style>
