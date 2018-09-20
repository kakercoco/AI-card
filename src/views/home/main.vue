/*
 * @Author: kaker.xutianxing
 * @Date: 2018-08-28 10:38:59
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-08-29 15:49:23
 */
<template>
  <div class="app-main">
      <!--消息页面加入缓存 include="message"-->
      <!--<keep-alive></keep-alive>-->
      <router-view></router-view>
    <my-footer></my-footer>
  </div>
</template>

<script>
import myFooter from '@/components/footer/index'

export default {
  name: 'mains',
  components: {
    myFooter
  },
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

</style>
