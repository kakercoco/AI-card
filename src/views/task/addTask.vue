/*
* @Author: zhangmengli
* @Date: 2018-11-21 14:00:16
* @Last Modified by: zhangmengli
* @Last Modified time: 2018-11-21 14:00:16
*/
<template>
  <div class="insert-calendar">
    <group>
      <x-textarea title="任务标题" v-model="taskInfo.title" :show-counter="true" :max="10" :rows="2" class="line-flex"></x-textarea>
    </group>
    <group>
      <datetime :start-date="currentTime" title="任务时间" v-model="taskInfo.his_time" format="YYYY-MM-DD HH:mm" style="height: 1.3rem;font-family: SimHei, Microsoft YaHei, 'Avenir', Helvetica, Arial, sans-serif;" required></datetime>
    </group>
    <group>
      <x-textarea title="备注" v-model="taskInfo.reference" placeholder="" :show-counter="true" :max="100" :height="150"></x-textarea>
    </group>
    <div class="insert-client clearfix">
      <p>添加客户：</p>
      <span v-for="(item, index) in customerCheckList" :key="index">
        <img :src="item.wx_image" alt="">
        <x-icon type="ios-minus" class="delete-icon" @click="deleteCustomer(index,item.id)"></x-icon>
      </span>
      <span class="btn" @click="openChooseCustomer">
        <x-icon type="ios-plus-empty"></x-icon>
      </span>
    </div>
    <div style="height: 1.5rem;"></div>
    <p class="yyf_new_btn" style="border-top: 1px #e3e3e3 solid">
      <x-button type="primary" @click.native="save" :disabled="isDisabled" :class="isDisabled ? 'button_2' : 'button_1' ">保存</x-button>
    </p>
    <!--<p class="insert-btn">
      <x-button type="primary" @click.native="save" :disabled="isDisabled" :class="isDisabled ? 'button_2' : 'button_1' ">保存</x-button>
      &lt;!&ndash;<x-button type="primary" @click.native="save" class="button_2">保存</x-button>&ndash;&gt;
    </p>-->

    <div v-transfer-dom>
      <popup v-model="isInsert">

        <popup-header
                left-text="取消"
                right-text="完成"
                title="选择客户"
                :show-bottom-border="false"
                @on-click-left="cancelSelected"
                @on-click-right="chooseCustomer"></popup-header>
        <group gutter="0">
          <div class="client-wrap">
            <!--<div class="client-header">
              <p @click="cancelSelected">取消</p>
              <p>选择客户</p>
              <p @click="chooseCustomer">完成</p>
            </div>-->
            <p class="client-search">
              <search v-model="customerForm.keyword" ref="search" @on-change="getCustomerList" style="position: static;"></search>
            </p>
            <ul>
              <li v-for="(item, index) in customer" :key="index">
                <check-icon :value.sync="item.status" class="fl"></check-icon>
                <img :src="item.wx_image" alt="">
                <span class="name">{{item.re_name ? item.re_name : item.wx_name}}</span>
                <!--<span class="time">{{item.date}}</span>-->
              </li>
            </ul>
            <div class="nodata" v-if="no_data">暂无数据!</div>
          </div>

        </group>
      </popup>
    </div>

  </div>
</template>

<script>
import {
  Group,
  PopupRadio,
  XInput,
  XTextarea,
  Datetime,
  XButton,
  Search,
  CheckIcon,
  AlertModule, PopupHeader, Popup, TransferDom
} from 'vux'
import { customerList } from '@/api/contact'
import { addOrEditTask, getTaskDetail } from '@/api/task'
import { parseTime } from '@/utils/base'

export default {
  name: 'addTask',
  directives: {
    TransferDom
  },
  components: {
    Group,
    PopupRadio,
    XInput,
    XTextarea,
    XButton,
    Search,
    CheckIcon,
    Datetime,
    AlertModule,
    PopupHeader,
    Popup
  },
  data () {
    return {
      isDisabled: false,
      currentMinutes: parseInt(`${new Date().getMinutes()}`),
      minList: [],
      currentHour: parseInt(`${new Date().getHours()}`),
      currentTime: `${new Date().getFullYear()}-${
        new Date().getMonth() + 1 < 10
          ? `0${new Date().getMonth() + 1}`
          : new Date().getMonth() + 1
      }-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()}`,
      month: this.$route.query.month,
      calendarType: 0,
      customer: [], // 所有客户列表
      customerCheckList: [], // 选中的客户列表
      customerForm: {
        page: 1,
        pagesize: 1000,
        keyword: '',
        type: 1
      },
      taskInfo: {
        title: '',
        his_time: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1 < 10
            ? `0${new Date().getMonth() + 1}`
            : new Date().getMonth() + 1
        }-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()}`,
        reference: ''
      },
      searchKey: '', // 搜索用户的关键词
      checked: false,
      isInsert: false, // 是否是增加客户
      src: require('@/assets/img/calendar1.png'),
      options: [],
      no_data: false,
      id: this.$route.query.id
    }
  },
  computed: {},
  methods: {
    /*    clickTime () {
      this.$nextTick(function () {
        this.getMinutes()
      })
    }, */
    getMinutes () {
      let minList = []
      for (let i = this.currentMinutes; i < 61; i++) {
        minList.push(i.toString())
      }
      this.minList = minList
    },
    openChooseCustomer () {
      this.isInsert = true
    },
    getTaskInfo () {
      getTaskDetail(this.id).then(res => {
        if (res.code === 200) {
          this.taskInfo = res.data
          this.taskInfo.his_time = parseTime(res.data.his_time, '{y}-{m}-{d} {h}:{i}')
          this.customerCheckList = res.data.users
          this.customer.forEach(element => {
            if (this.customerCheckList !== undefined && this.customerCheckList.length > 0) {
              this.customerCheckList.forEach(e => {
                if (e.id === element.id) {
                  element.status = true
                }
              })
            }
          })
        } else {
          AlertModule.show({
            title: '提示',
            content: res.msg
          })
        }
      })
    },
    cancelSelected () { // 取消选择
      this.isInsert = false
      /* this.customer.forEach(e => {
        if (e.status) {
          e.status = false
        }
      }) */
    },
    save () {
      this.$store.commit('app/open_global_dialog')
      let userIdList = []
      let userIds = ''
      this.customerCheckList.forEach(element => {
        userIdList.push(`${element.id}`)
      })
      if (userIdList.length > 0) {
        userIds = userIdList.join(',')
      }
      this.taskInfo.add_user = userIds
      let data = {
        id: this.id === undefined ? '' : this.id,
        title: this.taskInfo.title.replace(/(^\s*)|(\s*$)/g, ''),
        type: 5,
        time: this.taskInfo.his_time,
        add_user: userIds,
        reference: this.taskInfo.reference
      }
      if (data.title === '') {
        AlertModule.show({
          title: '提示',
          content: '标题不能为空'
        })
        this.$store.commit('app/close_global_dialog')
        return
      }
      if (data.time === '' || data.time === 0) {
        AlertModule.show({
          title: '提示',
          content: '时间不能为空'
        })
        this.$store.commit('app/close_global_dialog')
        return
      }
      // 新增或编辑任务
      addOrEditTask(data).then(res => {
        this.$store.commit('app/close_global_dialog')
        if (res.code === 200) {
          this.isDisabled = false
          this.$router.back(-1)
        } else {
          this.isDisabled = false
          AlertModule.show({
            title: '提示',
            content: res.msg
          })
        }
      }).catch((err) => {
        this.$store.commit('app/close_global_dialog')
      })
    },
    getCustomerList () { //  获取客户列表
      this.no_data = false
      customerList(this.customerForm).then(res => {
        if (res.data && res.data.rows && res.data.rows instanceof Array) {
          let customerAll = res.data.rows
          if (customerAll.length === 0) {
            this.no_data = true
          } else {
            for (let i = 0; i < customerAll.length; i++) {
              const element = customerAll[i]
              element.status = false
              for (let j = 0; j < this.customerCheckList.length; j++) {
                const e = this.customerCheckList[j]
                if (e.id === element.id) {
                  element.status = true
                  break
                } else {
                  element.status = false
                }
              }
            }
          }

          this.customer = customerAll
        }
      })
    },
    chooseCustomer () { // 选择客户
      this.isInsert = false
      this.customer.forEach(e => {
        // e 代表选中的那个
        if (e.status) {
          let isHave = true // 默认为外边数组已存在

          this.customerCheckList.forEach(element => {
            if (e.id === element.id) {
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
            if (e.id === element.id) {
              isHaves = true
            }
          })

          if (isHaves) {
            const index = this.customerCheckList.findIndex(item => {
              return e.id === item.id
            })
            this.customerCheckList.splice(index, 1)
          }
        }
      })
    },
    deleteCustomer (index, id) {
      console.log(id)
      this.customer.forEach(element => {
        console.log(element)
        if (id === element.id) {
          element.status = false
        }
      })
      console.log(this.customer)
      this.customerCheckList.splice(index, 1)
    }
  },
  watch: {
  },
  mounted () {
    this.getMinutes()
    this.getCustomerList() // 获取客户列表
    if (this.id !== undefined && this.id !== '') {
      this.getTaskInfo()
    }
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
  .insert-calendar {
    // background-color: #f8f8f8;
    padding: 0.3rem 0;
    padding-top: 0;
    height: 100%;
    overflow: auto;
    position: relative;
    -webkit-overflow-scrolling: touch;
    .show-icon {
      margin-right: 0.2rem;
      width: 0.32rem;
    }
    & /deep/ .vux-check-icon > .weui-icon-success:before, .vux-check-icon > .weui-icon-success-circle:before {
      color: #3c7df0;
    }
    .line-flex {
      align-items: center;
      & /deep/ .weui-cell__bd {
        display: inline-flex !important;
        align-items: center !important;
        textarea {
          font-size: 0.33rem;
          color: #5e5e5e;
          padding-top: 23px;
          font-family: SimHei, Microsoft YaHei, 'Avenir', Helvetica, Arial, sans-serif;
        }
      }
    }
    .insert-client {
      // border-bottom: 1px solid #E2E2E2;
      padding: 10px 15px;
      background-color: #fff;
      p {
        font-size: 0.33rem;
        color: #717171;
        margin-bottom: 0.2rem;
        font-family: SimHei, Microsoft YaHei, 'Avenir', Helvetica, Arial, sans-serif;
      }
      span {
        float: left;
        width: 1.2rem;
        height: 1.2rem;
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
        text-align: center;
        position: relative;
        &.btn {
          background-color: #e2e2e2;
          border-radius: 0.1rem;
        }
        .delete-icon {
          position: absolute;
          top: -0.15rem;
          right: -0.15rem;
          fill: red;
          width: 0.3rem;
          height: 0.3rem;
        }
        .vux-x-icon-ios-plus-empty {
          width: 1rem;
          height: 1rem;
          fill: #fff;
          margin-top: 0.1rem;
        }
        img {
          width: 100%;
          height: 100%;
          border-radius: 0.1rem;
        }
      }
    }
    & /deep/ .weui-cell__bd{
      .weui-textarea {
        display: block;
        border: 0;
        resize: none;
        width: 100%;
        line-height: inherit;
        outline: 0;
        color: #5e5e5e !important;
        font-size: 0.33rem !important;
        font-family: SimHei, Microsoft YaHei, 'Avenir', Helvetica, Arial, sans-serif;
      }
    }
    & /deep/ .weui-cells {
      margin-top: 0;
      &::before {
        border: none;
      }
      .vux-datetime {
        p {
          font-size: 0.33rem;
          color: #717171;
        }
        .vux-cell-value {
          color: #5e5e5e;
          font-size: 0.33rem;
          padding-left: 0.25rem;
        }
      }
      textarea {
        font-size: 0.28rem;
        color: #555;
      }
      .vux-datetime-value {
        font-size: 0.28rem;
        padding-left: 0.1rem;
      }
      .weui-label {
        font-size: 0.33rem;
        color: #717171;
        margin-top: -2px;
        font-family: SimHei, Microsoft YaHei, 'Avenir', Helvetica, Arial, sans-serif;
        font-weight: 100;
      }
      .weui-cell__ft {
        text-align: left;
      }
      .weui-cell__ft:after {
        border-width: 0 2px 2px 0;
        width: 0.15rem;
        height: 0.15rem;
        margin-top: -0.15rem;
      }
    }
    .weui-btn:after {
      border-radius: 5px !important;
    }
    .weui-btn_primary {
      background-color: #3c7df0;
      height: 0.88rem;
      line-height: 0.88rem;
      border-radius: 5px;
      font-family: SimHei, Microsoft YaHei, 'Avenir', Helvetica, Arial, sans-serif;
    }
    .insert-btn {
      margin-top: 0.32rem;
      padding: 0 0.3rem;
      .button_2{
        background-color: #e0e0e0;
      }
    }
  }
  .vux-radio-icon {
    width: 0.32rem;
    height: auto;
  }
  .client-wrap {
    background-color: #fff;
    height:10rem;
    overflow: auto;
    width: 100%;
    padding-bottom: 1.5rem;
    font-family: SimHei, Microsoft YaHei, 'Avenir', Helvetica, Arial, sans-serif;
/*    .client-search{
      height: 1rem;
      .vux-search-fixed {
        position: fixed;
        left: 0;
        top: 3.4rem !important;
        z-index: 5;
        background: #ffffff;
        -webkit-backdrop-filter: blur(5px);
        backdrop-filter: blur(5px);
      }
      & /deep/ .weui-search-bar__label span{
        display: inline-block;
        font-size: 14px;
        vertical-align: middle;
        font-family: SimHei, Microsoft YaHei, 'Avenir', Helvetica, Arial, sans-serif !important;
      }
    }*/
    & /deep/ .vux-search-mask {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      z-index: 5;
      border: 1px solid #f0f0f0;
      // background-color: #fff;
      height: 0.7rem;
    }
    & /deep/ .weui-search-bar__label {
      background-color: #fff !important;
      height: 0.7rem;
      line-height: 0.55rem;
    }
    .client-header{
      height: 0.86rem;
      background-color: #efefef;
      display: flex;
      justify-content: space-around;
      line-height: 0.86rem;
      border-bottom: 1px solid #f0f0f0;
      p{
        display: inline-block;
        font-size: 0.28rem;
        color: #4e6fc7;
      }
      p:nth-child(2){
        color: #353535;
        font-size: 0.33rem;
      }
    }
    & /deep/ .vux-search-box {
      height: 1rem;
      .weui-search-bar {
        &::before {
          border: none;
        }
        &::after {
          border: none;
        }
        background-color: #fff;
        color: #717171;
      }
      .weui-search-bar__label {
        background-color: #f3f3f3;
        .weui-icon-search {
          margin-top: 0.05rem;
          & + span {
            margin-top: 0.05rem;
            color: #999;
            font-family: 'Avenir', Helvetica, Arial, sans-serif;
            font-weight: normal;
          }
        }
      }
      .weui-search-bar__form:after {
        background-color: #f3f3f3;
      }
    }
    & /deep/ .weui-cells {
      &::before {
        border: none;
      }
      &::after {
        border: none;
      }
      .weui-cell__ft:after {
        margin-top: -0.15rem;
      }
      .vux-cell-value {
        margin-right: 0.2rem;
        font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
        Microsoft YaHei, Arial, sans-serif;
        color: #333;
        font-size: 0.28rem;
      }
    }
    li {
      height: 1.2rem;
      padding: 0.15rem 0.3rem;
      border-bottom: 1px solid #eee;
      line-height: 0.9rem;
      img {
        width: 0.9rem;
        height: 0.9rem;
        float: left;
        margin: 0 0.4rem;
      }
      .name {
        font-size: 0.32rem;
        color: #717171;
        height: 100%;
        float: left;
        max-width: 4.4rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .time {
        float: right;
        height: 100%;
        font-size: 0.28rem;
        color: #717171;
      }
    }
    .clinet-btn {
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 0.35rem 1rem;
      // border-top: 1px solid #eee;
      position: fixed;
    }
  }
</style>
