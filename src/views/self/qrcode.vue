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
          <img src="@/assets/img/l.gif" class="loading" v-if="is_show">
      </div>

  </div>
</template>

<script>
import { getPosterImg } from '@/api/card'
import {
    err_Tips,
} from '@/utils/base'
export default {
  name: 'qrcode',
  data () {
    return {
      img: '',
    is_show:false
    }
  },
  methods: {
    getPosterImg () {
        this.$store.commit('app/open_global_dialog');
      getPosterImg()
        .then(res => {
            this.$store.commit('app/close_global_dialog');
          this.img = res.data.card_poster;
          this.is_show = true
        }).catch((err)=>{
          this.$store.commit('app/close_global_dialog');
      })
    },

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
            z-index: 8;

        }
        .loading{
            width: 0.6rem;
            height: 0.6rem;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin:auto;
            z-index: 7;
        }
    }

}
</style>
