/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-07 14:25:23
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-07 15:01:37
 */
<template>
  <div class="say-hi">
    <group>
      <cell title="欢迎语开关" >
        <img src="@/assets/nav/hi.png" alt="" slot="icon">
        <inline-x-switch v-model="value" slot="default"></inline-x-switch>
      </cell>
      <cell title="欢迎语设置" is-link link="/saySetting">
        <img src="@/assets/nav/card.png" alt="" slot="icon">
      </cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell, XSwitch, InlineXSwitch } from 'vux'
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
      value: ''
    }
  },
  methods: {
  },
  mounted () {
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
