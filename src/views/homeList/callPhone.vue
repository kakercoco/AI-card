/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-01 14:07:51
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-01 15:37:00
 */
<template>
  <div class="see-card">
    <div class="title">
      <h5>7日内被查看的行为统计</h5>
      <img src="@/assets/img/datapicker.png" alt="" @click="showDateChoose">
      <p>共3次</p>
    </div>
    <ul class="list">
      <li v-for="(item, index) in 5" :key="index">
        <p>2018-08-05 15:40</p>
        <img src="@/assets/img/u112.png" alt="">
        <div>T-cloud Man <i>拨打</i>了你的<i>电话</i>，有可能对你比较感兴趣。</div>
        <x-icon type="ios-arrow-right" size="25" class="icon-right"></x-icon>
      </li>
    </ul>
    <x-dialog v-model="datePickerDialog" class="dialog-datepicker" hide-on-blur :dialog-style="{'max-width': '100%', width: '100%'}">
      <h5>选择时间段</h5>
      <group>
        <datetime v-model="startTIme" format="YYYY-MM-DD" placeholder="请选择开始时间" @on-change="changeStartTime">
          <span slot="title"></span>
          <div slot="title">
            <img src="@/assets/img/datepickerGray.png" alt="" class="fl title-icon">
            <span>开始</span>
          </div>
        </datetime>
      </group>
      <group>
        <datetime v-model="endTime" format="YYYY-MM-DD" placeholder="请选择结束时间">
          <span slot="title"></span>
          <div slot="title">
            <img src="@/assets/img/datepickerGray.png" alt="" class="fl title-icon">
            <span>结束</span>
          </div>
        </datetime>
      </group>
      <p class="btn">
        <x-button type="primary" @click.native="sureTime">确定</x-button>
      </p>
    </x-dialog>
  </div>
</template>

<script>
import { XDialog, XButton, Group, Cell, Datetime } from 'vux'

export default {
  name: 'callPhone',
  components: {
    XButton,
    XDialog,
    Group,
    Cell,
    Datetime
  },
  data () {
    return {
      startTIme: '',
      endTime: '',
      datePickerDialog: false // 日期选择dialog
    }
  },
  methods: {
    changeStartTime () {
    },
    showDateChoose () {
      this.datePickerDialog = true
    },
    sureTime () {
      this.datePickerDialog = false
    }
  },
  mounted () {
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
$color: #717171;
.see-card{
  .title{
    position: relative;
    height: 2.2rem;
    padding: 0.5rem 0.3rem;
    h5{
      text-align: center;
      color: $color;
      font-size: 0.28rem;
      font-weight: normal;
    }
    img{
      position: absolute;
      top: 0.5rem;
      right: 0.3rem;
      width: 0.35rem;
    }
    p{
      font-size: 0.4rem;
      color: #f79700;
      text-align: center;
      margin-top: 0.3rem;
    }
  }
  .list{
    li{
      height: 2.5rem;
      padding: 0.2rem 0.3rem;
      padding-bottom: 0.5rem;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      border-radius: 5px;
      p{
        text-align: center;
        font-size: 0.22rem;
        color: $color;
        margin-bottom: 0.2rem;
      }
      img{
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 0.1rem;
        float: left;
      }
      div{
        width: 65%;
        float: left;
        height: 1.2rem;
        line-height: 0.5rem;
        margin-left: 0.2rem;
        padding: 0.1rem 0;
        overflow: hidden;
        font-size: 0.28rem;
        i{
          color: #f79700;
        }
      }
      .icon-right{
        float: right;
        height: 1.2rem;
        fill: #717171;
      }
    }
  }
}
.dialog-datepicker{
  h5{
    height: 0.9rem;
    line-height: 0.9rem;
    font-size: 0.32rem;
    color: $color;
  }
  .title-icon{
    width: 0.4rem;
    margin-right: 0.2rem;
  }
  .btn{
    padding: 1rem;
  }
}
</style>
