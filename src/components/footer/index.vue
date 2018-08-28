/*
 * @Author: kaker.xutianxing
 * @Date: 2018-08-28 10:22:54
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-08-28 17:28:36
 */
<template>
  <div class="my-footer">
    <tabbar >
      <tabbar-item link="/main/index" selected>
        <i slot="icon">**</i>
        <i slot="icon-active">##</i>
        <span slot="label">足迹</span>
      </tabbar-item>
      <tabbar-item show-dot link="/main/message">
        <img slot="icon" src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80">
        <span slot="label">消息</span>
      </tabbar-item>
      <tabbar-item link="/main/contact">
        <img slot="icon" src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80">
        <span slot="label">通讯录</span>
      </tabbar-item>
      <tabbar-item link="/main/news">
        <img slot="icon" src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80">
        <span slot="label">动态</span>
      </tabbar-item>
      <tabbar-item link="/main/self" badge="2">
        <img slot="icon" src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'
export default {
  name: 'myFooter',
  components: {
    Tabbar,
    TabbarItem
  },
  data () {
    return {
      red: '#fff000'
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
