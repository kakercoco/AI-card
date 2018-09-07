/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-07 09:39:57
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-07 10:22:58
 */
<template>
  <div class="setting">
    <group>
      <cell title="互动窗口" is-link>
        <span slot="icon">as</span>
      </cell>
      <cell title="欢迎语设置" >
        <span slot="icon">as</span>
        <inline-x-switch v-model="value" slot="default"></inline-x-switch>
      </cell>
      <cell title="转发名片" >
        <span slot="icon">as</span>
      </cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell, XSwitch, InlineXSwitch } from 'vux'

export default {
  name: 'setting',
  components: {
    Group,
    XSwitch,
    InlineXSwitch,
    Cell
  },
  data () {
    return {
      value: false
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>

</style>
