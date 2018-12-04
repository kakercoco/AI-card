/*
 * @Author: zhangmengli
 * @Date: 2018-11-19 10:49:27
 * @Last Modified by: zhangmengli
 * @Last Modified time: 2018-11-19 10:49:27
 */
<template>
  <div class="form">
    <ul>
      <li v-for="(item, index) in formList" :index="index">
        <p class="form-left" >
          <span>{{ item.title }}</span>
        </p>
        <p class="form-right">
          <span>{{ item.num }}</span>
          <x-icon type="ios-arrow-right" class="icon-right"></x-icon>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  Tab,
  TabItem,
  XButton,
  AlertModule
} from 'vux'
export default {
  name: 'formList',
  components: {
    XButton,
    Tab,
    TabItem,
    AlertModule
  },
  data () {
    return {
      formList: [
        {
          title: '预约表单(新表)',
          num: 0
        },
        {
          title: '意向客户表单',
          num: 8
        },
        {
          title: '跟进要签约客户信息',
          num: 30
        },
        {
          title: '活动4S店邀请函',
          num: 2
        }
      ]
    }
  },
  methods: {
  },
  // watch: {
  //   value () {
  //     this.getSearchType()
  //     this.getCalendarList()
  //   }
  // },
  created () {
  },
  computed: {},
  mounted () {
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.form {
  height: 100%;
  padding-left: 0.2rem;
  ul{
    li{
      height: 1rem;
      line-height: 1rem;
      border-bottom: 1px solid #f2f2f2;
      font-family: Microsoft YaHei, 'Avenir', Helvetica, Arial, sans-serif;
      .form-left{
        float: left;
      }
      .form-right{
        float: right;
        padding-right: 0.2rem;
        .icon-right {
          position: relative;
          top: 0.11rem;
          right: 0;
          width: 0.5rem;
          fill: #d2d2d2;
          display: inline-block;
        }
      }
    }
  }
}
</style>
