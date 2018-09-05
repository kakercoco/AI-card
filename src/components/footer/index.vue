/*
 * @Author: kaker.xutianxing
 * @Date: 2018-08-28 10:22:54
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-05 14:47:51
 */
<template>
  <div class="my-footer">
    <tabbar >
      <tabbar-item link="/main/index" >
        <img slot="icon" src="@/assets/icon/index.png">
        <img slot="icon-active" src="@/assets/icon/index2.png">
        <span slot="label">足迹</span>
      </tabbar-item>
      <tabbar-item show-dot link="/main/message">
        <img slot="icon" src="@/assets/icon/message.png">
        <img slot="icon-active" src="@/assets/icon/message2.png">
        <span slot="label">消息</span>
      </tabbar-item>
      <tabbar-item link="/main/contact">
        <img slot="icon" src="@/assets/icon/contact.png">
        <img slot="icon-active" src="@/assets/icon/contact2.png">
        <span slot="label">通讯录</span>
      </tabbar-item>
      <tabbar-item link="/main/news">
        <img slot="icon" src="@/assets/icon/news.png">
        <img slot="icon-active" src="@/assets/icon/news2.png">
        <span slot="label">动态</span>
      </tabbar-item>
      <tabbar-item link="/main/self" badge="2">
        <img slot="icon" src="@/assets/icon/self.png">
        <img slot="icon-active" src="@/assets/icon/self2.png">
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
