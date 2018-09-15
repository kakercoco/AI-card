/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-14 14:26:39
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-14 14:31:14
 */
<template>
  <div class="qrcode">
    <img src="@/assets/img/selfCard.png" alt="" class="card">
  </div>
</template>

<script>
export default {
  name: 'qrcode',
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.qrcode{
  overflow: auto;
  height: 100%;
  padding: 0.3rem;
  .card{
    width: 100%;
  }
}
</style>
