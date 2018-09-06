/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-05 17:36:16
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-06 14:06:42
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
            <img src="@/assets/img/calendar.png" class="vux-radio-icon"> {{ props.label }}
          </p>
        </template>
      </popup-radio>
    </group>
    <group>
      <x-textarea title="日程标题:" v-model="value" :show-counter="true" :max="20" :rows="1"></x-textarea>
    </group>
    <group>
      <datetime title="时间设定："  v-model="minuteListValue" format="HH:mm" :minute-list="['00', '15', '30', '45']"  ></datetime>
    </group>
    <div class="insert-client clearfix">
      <p>添加客户：</p>
      <span>
        <img src="@/assets/img/u112.png" alt="">
        <x-icon type="ios-minus" class="delete-icon"></x-icon>
      </span>
      <span class="btn" @click="isInsert = true">
        <x-icon type="ios-plus-empty"></x-icon>
      </span>
    </div>
    <group>
      <x-textarea title="备注：" v-model="notes" placeholder="请输入内容" autosize></x-textarea>
    </group>
    <p class="insert-btn">
      <x-button type="primary">确定</x-button>
    </p>
    <div class="client-wrap" v-if="isInsert">
      <p style="height: 1rem;"><search v-model="value"  ref="search"></search></p>
      <group >
        <popup-radio  :options="recordOptions" v-model="selectdRecord"></popup-radio>
      </group>
      <ul>
        <li v-for="item in 5" :key="item">
          <check-icon :value.sync="checked" class="fl"></check-icon>
          <img src="@/assets/img/u112.png" alt="">
          <span class="name">Top Man</span>
          <span class="time">2018-12-12</span>
        </li>
      </ul>
      <p class="clinet-btn">
        <x-button type="primary" @click.native="isInsert = false">确定</x-button>
      </p>
    </div>
  </div>
</template>

<script>
import { Group, PopupRadio, XInput, XTextarea, Datetime, XButton, Search, CheckIcon } from 'vux'

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
      value: '',
      notes: '',
      minuteListValue: '',
      checked: false,
      isInsert: false, // 是否是增加客户
      src: require('@/assets/img/calendar.png'),
      option: '日常',
      options: ['日常', '预约', '会议', '拜访', '生日'],
      selectdRecord: '最后跟进时间',
      recordOptions: ['最后跟进时间', '最后活动时间', 'AI成交率']
    }
  },
  methods: {
    getUrl (i) {
      return `https://img-blog.csdn.net/20180314112802461?imageView2/5/w/120/h/12${i}`
    }
  },
  mounted () {
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.insert-calendar{
  padding: 0.3rem 0;
  height: 100%;
  overflow: auto;
  position: relative;
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
    position: absolute;
    bottom:0;
    left: 0;
    width: 100%;
    padding: 0.35rem 1rem;
    border-top: 1px solid #eee;
  }
}
</style>
