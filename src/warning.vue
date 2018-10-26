/*
* @Author: zhangmengli
* @Date: 2018-10-10 10:20:21
 * @Last Modified by: Jessica
 * @Last Modified time: 2018-10-17 17:19:33
*/
<template>
    <div class="warning">
        <div class="warning_content">
            <img src="@/assets/img/warning.png" alt="">
        </div>
    </div>
</template>

<script>
export default {
  name: 'warning',
  data () {
    return {}
  },
  watch: {},
  methods: {},
  mounted () {}
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.warning {
  overflow: auto;
  height: 100%;
  width: 100%;
  .warning_content {
    img {
      width: 7.5rem;
      height: 100%;
    }
  }
}
</style>
