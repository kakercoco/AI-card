/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-08 18:18:43
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-08 18:20:13
 */
<template>
  <div class="client-infor">
    <h5>已成为你的客户15天</h5>
    <group>
      <x-input placeholder="未填写" title="客户来源" v-model="inforForm.from" :readonly="true"></x-input>
      <x-input placeholder="未填写" title="姓名备注" v-model="inforForm.clientName"></x-input>
      <x-input placeholder="未填写" title="性别" v-model="inforForm.gender"></x-input>
      <x-input placeholder="未填写" title="邮箱" v-model="inforForm.email"></x-input>
      <x-input placeholder="未填写" title="手机号码" v-model="inforForm.telPhone"></x-input>
      <x-input placeholder="未填写" title="公司名称" v-model="inforForm.companyName"></x-input>
      <x-input placeholder="未填写" title="详细地址" v-model="inforForm.address"></x-input>
      <div class="my-birthday">
        <datetime v-model="inforForm.birthday" >
          <p slot="title" class="my-label">生日时间</p>
        </datetime>
        <p class="update"><check-icon :value.sync="inforForm.updateCalendar"></check-icon>同步到销售日历 </p>
      </div>
      <x-switch title="屏蔽他的消息推送" v-model="inforForm.forbidPush"></x-switch>
      <x-textarea title="备注" v-model="inforForm.notes" autosize></x-textarea>
    </group>
    <p class="btn">
      <x-button type="primary">保存</x-button>
    </p>
  </div>
</template>

<script>
import { XInput, Group, Cell, XTextarea, XButton, XSwitch, Datetime, CheckIcon } from 'vux'

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
    XTextarea
  },
  data () {
    return {
      value: 'asdfasdf',
      inforForm: {
        from: '来自扫码',
        clientName: '',
        gender: '',
        email: '',
        telPhone: '',
        companyName: '',
        address: '',
        birthday: '',
        forbidPush: false,
        updateCalendar: false,
        notes: ''
      }
    }
  },
  methods: {
  },
  mounted () {
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
  }
  .btn{
    margin-top: 1rem;
    padding: 0 1rem;
  }
}
</style>
