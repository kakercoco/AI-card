/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-14 14:26:39
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-19 16:03:31
 */
<template>
  <div class="qrcode">
    <img :src="img" alt="" class="card">
  </div>
</template>

<script>
import { getPosterImg } from '@/api/card'
export default {
  name: 'qrcode',
  data () {
    return {
      img: ''
    }
  },
  methods: {
    getPosterImg () {
      getPosterImg()
        .then(res => {
          this.img = res.data.card_poster
        })
    }
  },
  mounted () {
    this.getPosterImg()
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
