/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-08 18:18:43
 * @Last Modified by: Jessica
 * @Last Modified time: 2018-10-17 16:27:39
 */
<template>
  <div class="client-infor">
    <h5>已成为你的客户{{inforForm.day}}天</h5>
    <group>
      <x-input placeholder="未填写" title="客户来源" v-model="inforForm.source" :readonly="true"></x-input>
      <x-input placeholder="未填写" title="姓名备注" v-model="inforForm.name"></x-input>
      <popup-radio title="性别" placeholder="未填写" :options="options" v-model="sex" align-items="left"></popup-radio>
      <x-input placeholder="未填写" title="邮箱" v-model="inforForm.email"></x-input>
      <x-input placeholder="未填写" title="手机号码" v-model="inforForm.phone" type="tel"></x-input>
      <x-input placeholder="未填写" title="公司名称" v-model="inforForm.company"></x-input>
      <x-input placeholder="未填写" title="详细地址" v-model="inforForm.address"></x-input>
      <div class="my-birthday">
        <datetime v-model="inforForm.birthday" @on-confirm='choseBirth' :min-year="1920">
          <p slot="title" class="my-label">生日时间</p>
        </datetime>
        <!--<p class="update"><check-icon :value.sync="is_calendar" @click.native="updateCalendar"></check-icon>同步到销售日历 </p>-->
      </div>
      <x-switch title="屏蔽消息推送" v-model="inforForm.is_shield_employ" :value-map="[0,1]" class="Masking_message"></x-switch>
      <x-textarea
              title="备注"
              v-model="inforForm.desc"
              autosize
              @on-focus="onFocus"
              @on-blur="onBlur"
              style='font-size:0.3rem'></x-textarea>
    </group>
    <p class="my_btn">
      <x-button type="primary" @click.native="save">保存</x-button>
    </p>
  </div>
</template>

<script>
import { XInput, Group, Cell, XTextarea, XButton, XSwitch, Datetime, CheckIcon, PopupRadio } from 'vux'
import { customerEdit, customerUpdate, setBirthdayAdd, birthdayDell } from '@/api/customer'

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
        day: 0
      }
    }
  },
  methods: {
    getCustomerInfor () {
      const data = {
        id: this.id !== undefined && this.id !== '' ? this.id : ''
      }
      if (data.id !== '') {
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

            if (!isNaN(this.inforForm.birthday)) {
              this.inforForm.birthday = ''
            }
          })
      }
    },
    updateCalendar () {
      if (this.inforForm.birthday === '') {
        this.$vux.toast.text('生日不能为空', 'top')
        return false
      }
      const data = {
        id: this.id,
        time: this.inforForm.birthday
      }
      if (this.is_calendar) {
        setBirthdayAdd(data)
      } else {
        birthdayDell(data)
      }
    },
    choseBirth (newVal) {
      console.log(newVal)
      this.is_calendar = false
      this.inforForm.is_calendar = 0
      this.updateCalendar()
    },
    save () {
      this.$store.commit('app/open_global_dialog')
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
          this.$store.commit('app/close_global_dialog')
          this.$router.back(-1)
        }).catch((err) => {
          this.$store.commit('app/close_global_dialog')
        })
    },
    onFocus () {
      var timer = setTimeout(() => {
        document.body.scrollTop = document.body.scrollHeight
        clearTimeout(timer)
      }, 500)
    },
    onBlur () {
      window.scrollTo(0, 0)
    }
  },
  mounted () {
    this.getCustomerInfor()
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.client-infor{
  /*overflow: auto;
  height: 100%;
  padding-bottom: 0.5rem;*/
  -webkit-overflow-scrolling: touch;
  h5{
    text-align: center;
    font-size: 0.26rem;
    color: #717171;
    font-weight: normal;
    margin-top: 0.4rem;
  }
  & /deep/ .weui-cells{
    .weui-label{
      font-size: 0.28rem;
      color: #999999;
      font-weight: normal;
      width: 2rem !important;
      font-family: '黑体';
    }
    .vux-x-textarea{
      .weui-label{
        width: 1rem !important;
      }
    }
    .weui-input{
      color: #353535;
      font-family: '黑体';
      font-size: 0.28rem;
    }
    .my-birthday{
      border-top: 1px solid #eee;
      .my-label{
        color: #717171;
        font-weight: normal;
        font-size: 0.28rem;
        float: left;
        font-family: '黑体';
        width: 2rem;
        color: #999;
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
        float: left;
        margin-top: 0.04rem;
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
        font-size: 0.28rem;
        color: #999;
        font-family: '黑体';
        font-weight: normal;
        width: 2rem !important;
      }
    }
    .weui-cell__ft{
      .vux-cell-placeholder{
        color: #777;
      }
      font-size: 0.28rem;
      .vux-cell-value{
        color: #353535;
        float: left;
        font-family: '黑体';
        font-size: 0.28rem;
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
