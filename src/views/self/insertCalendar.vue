/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-05 17:36:16
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-29 10:43:22
 */
<template>
  <div class="insert-calendar">
    <group >
      <popup-radio :options="options" v-model="option"  value-align="left">
        <p slot="icon">
          <img :src="src" alt="" class="show-icon">
        </p>
        <template slot-scope="props" slot="each-item">
          <p>
            <img :src="getUrl(props.index)" class="vux-radio-icon"> {{ props.label }}
          </p>
        </template>
      </popup-radio>
    </group>
    <group>
      <x-textarea title="日程标题:" v-model="title" :show-counter="true" :max="10" :rows="1"></x-textarea>
    </group>
    <group>
      <datetime title="时间设定："  v-model="time" format="HH:mm" ></datetime>
    </group>
    <div class="insert-client clearfix">
      <p>添加客户：</p>
      <span v-for="(item, index) in customerCheckList" :key="index">
        <img :src="item.wx_image" alt="">
        <x-icon type="ios-minus" class="delete-icon" @click="deleteCustomer(index)"></x-icon>
      </span>
      <span class="btn" @click="isInsert = true">
        <x-icon type="ios-plus-empty"></x-icon>
      </span>
    </div>
    <group>
      <x-textarea title="备注：" v-model="notes" placeholder="请输入内容" autosize></x-textarea>
    </group>
    <p class="insert-btn">
      <x-button type="primary" @click.native="save">确定</x-button>
    </p>
    <div class="client-wrap" v-if="isInsert">
      <p style="height: 1rem;"><search v-model="customerForm.keyword"  ref="search" @on-change="getCustomerList"></search></p>
      <group >
        <popup-radio  :options="recordOptions" v-model="selectdRecord"></popup-radio>
      </group>
      <ul>
        <li v-for="(item, index) in customer" :key="index">
          <check-icon :value.sync="item.status" class="fl"></check-icon>
          <img :src="item.wx_image" alt="">
          <span class="name">{{item.wx_name}}</span>
          <span class="time">{{item.date}}</span>
        </li>
      </ul>
      <p class="clinet-btn">
        <x-button type="primary" @click.native="chooseCustomer">确定</x-button>
      </p>
    </div>
  </div>
</template>

<script>
import { Group, PopupRadio, XInput, XTextarea, Datetime, XButton, Search, CheckIcon } from 'vux'
import { calendarSave, calendarType } from '@/api/calendar'
import { customerList } from '@/api/contact'

export default {
  name: 'insertCalendar',
  components: {
    Group,
    PopupRadio,
    XInput,
    XTextarea,
    XButton,
    Search,
    CheckIcon,
    Datetime
  },
  data () {
    return {
      date: this.$route.query.date,
      title: '',
      notes: '',
      time: '',
      calendarType: 0,
      customer: [], // 所有客户列表
      customerCheckList: [], // 选中的客户列表
      customerForm: {
        page: 1,
        pagesize: 1000,
        keyword: '',
        type: 1
      },
      searchKey: '', // 搜索用户的关键词
      checked: false,
      isInsert: false, // 是否是增加客户
      src: require('@/assets/img/calendar1.png'),
      option: '日常',
      options: [],
      selectdRecord: '最后跟进时间',
      recordOptions: ['成交率', '最后跟进时间', '工作交接', '扫码', '转发']
    }
  },
  methods: {
    getUrl (i) {
      return `https://zhentuityun.71360.com/static/calendar/calendar${i + 1}.png`
    },
    getCalendarTypeList () {
      calendarType()
        .then(res => {
          this.options = res.data
        })
    },
    getCalendarType () {
      if (this.option === '日常') {
        this.calendarType = 0
        this.src = require('@/assets/img/calendar1.png')
      } else if (this.option === '预约') {
        this.calendarType = 1
        this.src = require('@/assets/img/calendar2.png')
      } else if (this.option === '会议') {
        this.src = require('@/assets/img/calendar3.png')
        this.calendarType = 2
      } else if (this.option === '拜访') {
        this.src = require('@/assets/img/calendar4.png')
        this.calendarType = 3
      } else if (this.option === '生日') {
        this.src = require('@/assets/img/calendar5.png')
        this.calendarType = 4
      }
    },
    getSearchType () {
      if (this.selectdRecord === '成交率') {
        this.customerForm.type = 1
      } else if (this.selectdRecord === '最后跟进时间') {
        this.customerForm.type = 2
      } else if (this.selectdRecord === '工作交接') {
        this.customerForm.type = 3
      } else if (this.selectdRecord === '扫码') {
        this.customerForm.type = 4
      } else if (this.selectdRecord === '转发') {
        this.customerForm.type = 5
      }
    },
    getCustomerList () {
      customerList(this.customerForm)
        .then(res => {
          let customerAll = res.data.rows
          for (let i = 0; i < customerAll.length; i++) {
            const element = customerAll[i]
            element.status = false
            for (let j = 0; j < this.customerCheckList.length; j++) {
              const e = this.customerCheckList[j]
              if (e.uid === element.uid) {
                element.status = true
                break
              } else {
                element.status = false
              }
            }
          }
          this.customer = customerAll
        })
    },
    chooseCustomer () {
      this.isInsert = false
      this.customer.forEach(e => {
        // e 代表选中的那个
        if (e.status) {
          let isHave = true // 默认为外边数组已存在

          this.customerCheckList.forEach(element => {
            if (e.uid === element.uid) {
              isHave = false
            }
          })

          if (isHave) {
            // 添加
            this.customerCheckList.push(JSON.parse(JSON.stringify(e)))
          }
        } else {
          let isHaves = false

          this.customerCheckList.forEach(element => {
            if (e.uid === element.uid) {
              isHaves = true
            }
          })

          if (isHaves) {
            const index = this.customerCheckList.findIndex(item => {
              return e.uid === item.uid
            })
            this.customerCheckList.splice(index, 1)
          }
        }
      })
    },
    deleteCustomer (index) {
      this.customerCheckList.splice(index, 1)
    },
    save () {
      var uid = ''
      this.customer.forEach(element => {
        if (element.status) {
          uid += `${element.uid},`
        }
      })
      const data = {
        title: this.title,
        time: `${this.date} ${this.time}`,
        add_user: uid,
        reference: this.notes,
        type: this.calendarType
      }
      calendarSave(data)
        .then(res => {
          this.$router.push({
            path: '/calendar'
          })
        })
    }
  },
  watch: {
    selectdRecord () {
      this.getSearchType()
      this.getCustomerList()
    },
    option () {
      this.getCalendarType()
    }
  },
  mounted () {
    this.getCustomerList()
    this.getCalendarTypeList()
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.insert-calendar{
  padding: 0.3rem 0;
  padding-top: 0;
  height: 100%;
  overflow: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
  .show-icon{
    margin-right: 0.2rem;
    width: 0.32rem;
  }
  .insert-client{
    padding: 10px 15px;
    p{
      font-size: 0.32rem;
      color: #717171;
      margin-bottom: 0.2rem;
    }
    span{
      float: left;
      width: 1.2rem;
      height: 1.2rem;
      margin-right: 0.5rem;
      margin-bottom: 0.5rem;
      text-align: center;
      position: relative;
      &.btn{
        background-color: #e2e2e2;
        border-radius: 0.1rem;
      }
      .delete-icon{
        position: absolute;
        top: -0.15rem;
        right: -0.15rem;
        fill: red;
        width: 0.3rem;
        height: 0.3rem;
      }
      .vux-x-icon-ios-plus-empty{
        width: 1rem;
        height: 1rem;
        fill: #fff;
        margin-top: 0.1rem;
      }
      img{
        width: 100%;
        height: 100%;
        border-radius: 0.1rem;
      }
    }
  }
  & /deep/ .weui-cells{
    margin-top: 0;
    &::before{
      border: none;
    }
    .vux-datetime{
      p{
        font-size: 0.32rem;
        color: #717171;
      }
    }
    textarea{
      font-size: 0.28rem;
      color: #555;
    }
    .vux-datetime-value{
      font-size: 0.28rem;
      padding-left: 0.1rem;
    }
    .weui-label{
      font-size: 0.32rem;
      color: #717171;
      font-weight: normal;
      margin-top: -2px;
    }
    .weui-cell__ft{
      text-align: left;
    }
    .weui-cell__ft:after{
      border-width: 0 2px 2px 0;
      width: 0.15rem;
      height: 0.15rem;
    }
  }
  .insert-btn{
    margin-top: 1rem;
    padding: 0 1rem;
  }
}
.vux-radio-icon{
  width: 0.32rem;
  height: auto;
}
.client-wrap{
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fff;
  height: 100%;
  overflow: auto;
  width: 100%;
  padding-bottom: 1.5rem;
  & /deep/ .vux-search-box{
    height: 1rem;
    .weui-search-bar{
      &::before{
        border: none;
      }
      &::after{
        border: none;
      }
      background-color: #fff;
      color: #717171;
    }
    .weui-search-bar__label{
      background-color: #f3f3f3;
      .weui-icon-search{
        margin-top: 0.05rem;
        & + span{
          margin-top: 0.05rem;
        }
      }
    }
    .weui-search-bar__form:after{
      background-color: #f3f3f3;
    }
  }
  & /deep/ .weui-cells {
    &::before{
      border: none;
    }
    &::after{
      border: none;
    }
    .weui-cell__ft:after{
      margin-top: -0.15rem;
    }
    .vux-cell-value{
      margin-right: 0.2rem;
    }
  }
  li{
    height: 1.2rem;
    padding: 0.15rem 0.3rem;
    border-bottom: 1px solid #eee;
    line-height: 0.9rem;
    img{
      width: 0.9rem;
      height: 0.9rem;
      float: left;
      margin: 0 0.4rem;
    }
    .name{
      font-size: 0.32rem;
      color: #717171;
      height: 100%;
      float: left;
    }
    .time{
      float: right;
      height: 100%;
      font-size: 0.28rem;
      color: #717171;
    }
  }
  .clinet-btn{
    bottom:0;
    left: 0;
    width: 100%;
    padding: 0.35rem 1rem;
    border-top: 1px solid #eee;
  }
}
</style>
