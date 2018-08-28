/*
 * @Author: kaker.xutianxing
 * @Date: 2018-08-27 18:30:51
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-08-28 17:35:44
 */
<template>
  <div class="index">
    <p @click="gotoProduce">index</p>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
    }
  },
  methods: {
    gotoProduce () {
      this.$router.push({
        path: '/produceList'
      })
    }
  },
  mounted () {
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.home{
  p{
    line-height: 50px;
    font-size: 0.30rem;
  }
}
</style>
