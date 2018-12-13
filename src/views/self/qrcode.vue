/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-14 14:26:39
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-10-09 17:29:21
 */
<template>
  <div class="qrcode">
      <div class="img_frame">
          <img :src="img" alt="" class="card">
      </div>

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
  background-color: #eaeaea;

    .img_frame{
        width: 100%;
        height: 100%;
        position: relative;

        .card{
            width: 100%;
            border-radius: 0.1rem;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin:auto;
            box-shadow: 3px 3px 10px 3px #e3e3e3;

        }
    }

}
</style>
