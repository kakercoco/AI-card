/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-07 14:25:23
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-17 20:41:36
 */
<template>
  <div class="say-hi">
    <group>
      <cell title="欢迎语开关" >
        <img src="@/assets/nav/hi.png" alt="" slot="icon">
        <inline-x-switch v-model="value" slot="default" :value-map="[0, 1]" @click.native="set"></inline-x-switch>
      </cell>
      <cell title="欢迎语设置" is-link link="/saySetting">
        <img src="@/assets/nav/card.png" alt="" slot="icon">
      </cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell, XSwitch, InlineXSwitch } from 'vux'
import { employsetRead, employsetUpdate } from '@/api/calendar'

export default {
  name: 'sayHi',
  components: {
    Group,
    XSwitch,
    InlineXSwitch,
    Cell
  },
  data () {
    return {
      value: 0
    }
  },
  methods: {
    get () {
      employsetRead()
        .then(res => {
          this.value = res.data.is_welcome
        })
    },
    set () {
      setTimeout(() => {
        const data = {
          ac: 'welcome_msg',
          is_welcome: this.value
        }
        employsetUpdate(data)
          .then(res => {
          })
      }, 0)
    }
  },
  mounted () {
    this.get()
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.say-hi{
  & /deep/ .weui-cells{
    margin-top: 0;
    img{
      width: 0.4rem;
      height: 0.4rem;
      float: left;
      margin-right: 0.2rem;
    }
    .vux-label{
      font-size: 0.32rem;
    }
  }
}
</style>
