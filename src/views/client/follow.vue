/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-08 17:56:28
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-08 18:20:05
 */
<template>
  <div class="follow">
    <group>
      <popup-radio title="选择跟进常用语" :options="options1" @on-hide="hide" v-model="option1">
      </popup-radio>
    </group>
    <group title="跟进描述">
      <x-textarea placeholder="输入文字" v-model="value" autosize></x-textarea>
    </group>
    <p class="btn">
      <x-button type="primary">确定</x-button>
    </p>
  </div>
</template>

<script>
import { Group, PopupRadio, XTextarea, XButton } from 'vux'

export default {
  name: 'clientFollow',
  components: {
    Group,
    PopupRadio,
    XTextarea,
    XButton
  },
  data () {
    return {
      option1: '',
      value: '',
      options1: ['标记一下，可以有合作意向', 'B', 'C']
    }
  },
  methods: {
    hide () {
      if (this.option1 !== '') {
        this.value = this.option1
      }
    }
  },
  mounted () {
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.follow{
  overflow: auto;
  height: 100%;
  & /deep/ .weui-cells{
    &::before{
      border: none;
    }
    .vux-label{
      font-size: 0.32rem;
      color: #5977fe;
      font-weight: normal;
    }
    .vux-cell-value{
      display: none;
    }
    .weui-textarea{
      font-size: 0.28rem;
      color: #717171;
    }
  }
  .btn{
    margin-top: 1rem;
    padding: 0 1rem;
  }
}
</style>
