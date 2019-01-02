/*
 * @Author: kaker.xutianxing
 * @Date: 2018-08-28 10:22:54
 * @Last Modified by: Jessica
 * @Last Modified time: 2018-10-17 19:00:57
 */
<template>
  <div class="my-footer">
    <tabbar>
      <tabbar-item link="/main/index" :selected="$route.path === '/main/index'">
        <img slot="icon" src="@/assets/icon/none_icon_08.png">
        <img slot="icon-active" src="@/assets/icon/select_icon_08.png">
        <span slot="label">天眼</span>
      </tabbar-item>
      <tabbar-item :badge="num != '0' ? num : ''" link="/main/message" :selected="$route.path === '/main/message'">
        <img slot="icon" src="@/assets/icon/none_icon_14.png">
        <img slot="icon-active" src="@/assets/icon/select_icon_14.png">
        <span slot="label">消息</span>
      </tabbar-item>
      <tabbar-item link="/main/contact" :selected="$route.path === '/main/contact'">
        <img slot="icon" src="@/assets/icon/none_icon_03.png">
        <img slot="icon-active" src="@/assets/icon/select_icon_03.png">
        <span slot="label">通讯录</span>
      </tabbar-item>

      <tabbar-item link="/main/work" :selected="$route.path === '/main/work'">
        <img slot="icon" src="@/assets/icon/none_icon_11.png">
        <img slot="icon-active" src="@/assets/icon/select_icon_11.png">
        <span slot="label">工作</span>
      </tabbar-item>

      <tabbar-item link="/main/self" :selected="$route.path === '/main/self'">
        <img slot="icon" src="@/assets/icon/none_icon_05.png">
        <img slot="icon-active" src="@/assets/icon/select_icon_05.png">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'
import { get_list, look } from '@/api/message'
import { dateFtt } from '@/utils/base'
export default {
  name: 'myFooter',
  components: {
    Tabbar,
    TabbarItem
  },
  data () {
    return {
      red: '#fff000',
      num: '0'
    }
  },
  methods: {
    get_message_list () {

      get_list()
        .then(res => {
          this.$vux.loading.hide()
          if (res.code === 200 && res.data && res.data instanceof Array) {
            let list = res.data
            list.map((val, i) => {
              val.time = dateFtt('yyyy-MM-dd', new Date(val.update_time * 1000))
              try {
                val.last_content = val.last ? JSON.parse(val.last) : ''
              } catch (err) {
                val.last_content = val.last
              }
            })
            this.$store.commit('message/SET_messageList', list)
          }
        })
        .catch(err => {
          this.$vux.loading.hide()
        })
    }
  },
  watch: {
    '$store.state.message.messageList': {
      handler: function (val, oldVal) {
        let num = 0
        val.map((data, i) => {
          num = num + data.num
        })

        this.num = num.toString()
      },

      deep: true
    }
  },
  // computed: {
  //   num () {
  //     const list = this.$store.state.message.messageList
  //     let i = 0
  //     list.forEach(e => {
  //       i += e.num
  //     })
  //     return i.toString()
  //   }
  // },
  mounted () {
    this.get_message_list()
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.weui-tabbar__item {
  padding: 0.14rem 0 0.09rem 0;
  & /deep/.weui-tabbar__icon {

    height: 0.5rem;

  }

  & /deep/.weui-tabbar__label {
    padding-top: 0.14rem;
    font-size: 0.26rem !important;
    line-height: 1 !important;
  }
}
</style>
