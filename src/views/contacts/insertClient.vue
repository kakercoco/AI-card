/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-04 10:17:41
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-04 10:55:39
 */
<template>
  <div class="insert-client">
    <ul>
      <li v-for="(item, index) in 4" :key="index">
        <img src="@/assets/img/u112.png" alt="">
        <span>T-Man</span>
        <check-icon :value.sync="demo1" class="fr"></check-icon>
      </li>
    </ul>
    <div class="btn">
      <x-button type="primary">确定</x-button>
    </div>
  </div>
</template>

<script>
import { CheckIcon, XButton } from 'vux'

export default {
  name: 'insertClient',
  components: {
    CheckIcon, XButton
  },
  data () {
    return {
      demo1: false
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.insert-client{
  li{
    height: 1rem;
    line-height: 0.8rem;
    border-bottom: 1px solid #eee;
    padding: 0.1rem 0.3rem;
    img{
      height: 100%;
      width: 0.8rem;
      float: left;
      margin-right: 0.4rem;
    }
    span{
      float: left;
      height: 100%;
      color: #717171;
    }
  }
  .btn{
    padding: 0 1rem;
    margin-top: 1rem;
  }
}
</style>
