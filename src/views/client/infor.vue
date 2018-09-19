/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-08 18:18:43
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-19 17:17:44
 */
<template>
  <div class="client-infor">
    <h5>已成为你的客户{{inforForm.day}}天</h5>
    <group>
      <x-input placeholder="未填写" title="客户来源" v-model="inforForm.source" :readonly="true"></x-input>
      <x-input placeholder="未填写" title="姓名备注" v-model="inforForm.name"></x-input>
      <popup-radio title="性别" placeholder="未填写" :options="options" v-model="sex" align-items="left"></popup-radio>
      <x-input placeholder="未填写" title="邮箱" v-model="inforForm.email"></x-input>
      <x-input placeholder="未填写" title="手机号码" v-model="inforForm.phone"></x-input>
      <x-input placeholder="未填写" title="公司名称" v-model="inforForm.company"></x-input>
      <x-input placeholder="未填写" title="详细地址" v-model="inforForm.address"></x-input>
      <div class="my-birthday">
        <datetime v-model="inforForm.birthday" >
          <p slot="title" class="my-label">生日时间</p>
        </datetime>
        <p class="update"><check-icon :value.sync="is_calendar"></check-icon>同步到销售日历 </p>
      </div>
      <x-switch title="屏蔽他的消息推送" v-model="inforForm.is_shield_employ" :value-map="[0,1]"></x-switch>
      <x-textarea title="备注" v-model="inforForm.desc" autosize></x-textarea>
    </group>
    <p class="btn">
      <x-button type="primary" @click.native="save">保存</x-button>
    </p>
  </div>
</template>

<script>
import { XInput, Group, Cell, XTextarea, XButton, XSwitch, Datetime, CheckIcon, PopupRadio } from 'vux'
import { customerEdit, customerUpdate } from '@/api/customer'

export default {
  name: 'clientInfor',
  components: {
    XInput,
    Group,
    Cell,
    XButton,
    XSwitch,
    Datetime,
    CheckIcon,
    PopupRadio,
    XTextarea
  },
  data () {
    return {
      value: 'asdfasdf',
      id: this.$route.query.id,
      is_calendar: true,
      options: ['未知', '男', '女'],
      sex: '',
      inforForm: {
        name: '',
        sex: '',
        email: '',
        phone: '',
        company: '',
        address: '',
        birthday: '',
        is_calendar: '',
        is_shield_employ: '',
        desc: '',
        source: '',
        day: ''
      }
    }
  },
  methods: {
    getCustomerInfor () {
      const data = {
        id: this.id
      }
      customerEdit(data)
        .then(res => {
          this.inforForm = res.data
          if (this.inforForm.is_calendar === 1) {
            this.is_calendar = true
          } else {
            this.is_calendar = false
          }
          if (this.inforForm.sex === 0) {
            this.sex = '未知'
          } else if (this.inforForm.sex === 1) {
            this.sex = '男'
          } else if (this.inforForm.sex === 2) {
            this.sex = '女'
          }
        })
    },
    save () {
      if (this.is_calendar) {
        this.inforForm.is_calendar = 1
      } else {
        this.inforForm.is_calendar = 0
      }
      if (this.sex === '未知') {
        this.inforForm.sex = 0
      } else if (this.sex === '男') {
        this.inforForm.sex = 1
      } else if (this.sex === '女') {
        this.inforForm.sex = 2
      }
      customerUpdate(this.inforForm)
        .then(res => {

        })
    }
  },
  mounted () {
    this.getCustomerInfor()
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.client-infor{
  overflow: auto;
  height: 100%;
  padding-bottom: 0.5rem;
  h5{
    text-align: center;
    font-size: 0.26rem;
    color: #717171;
    font-weight: normal;
    margin-top: 0.4rem;
  }
  & /deep/ .weui-cells{
    .weui-label{
      font-size: 0.3rem;
      color: #717171;
      font-weight: normal;
      width: 3rem !important;
    }
    .weui-input{
      font-size: 0.28rem;
    }
    .my-birthday{
      border-top: 1px solid #eee;
      .my-label{
        width: 1.2rem;
        color: #717171;
        font-weight: normal;
        font-size: 0.3rem;
        float: left;
      }
      .vux-datetime-value{
        font-size: 0.28rem;
        &::after{
          display: none;
        }
      }
      .vux-datetime{
        width: 60%;
        display: inline-block;
      }
      .update{
        float: right;
        width: 40%;
        font-size: 0.26rem;
        color: #717171;
        padding-top: 10px;
      }
    }
    .vux-cell-bd{
      flex: 0;
      .vux-label{
        font-size: 0.3rem;
        color: #717171;
        font-weight: normal;
        width: 3rem !important;
      }
    }
    .weui-cell__ft{
      .vux-cell-placeholder{
        color: #777;
      }
      font-size: 0.28rem;
      .vux-cell-value{
        color: #333;
      }
      &:after{
        display: none;
      }
    }
  }
  .btn{
    margin-top: 1rem;
    padding: 0 1rem;
  }
}
</style>
