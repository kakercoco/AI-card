/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-05 17:36:16
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-05 20:37:27
 */
<template>
  <div class="insert-calendar">
    <group >
      <popup-radio :options="options" v-model="option"  value-align="left">
        <p slot="icon">
          <img :src="src" alt="" class="show-icon">
        </p>
        <template slot-scope="props" slot="each-item">
          <p>
            <img src="@/assets/img/calendar.png" class="vux-radio-icon"> {{ props.label }}
          </p>
        </template>
      </popup-radio>
    </group>
  </div>
</template>

<script>
import { Group, PopupRadio } from 'vux'

export default {
  name: 'insertCalendar',
  components: {
    Group,
    PopupRadio
  },
  data () {
    return {
      src: require('@/assets/img/calendar.png'),
      option: '日常',
      options: ['日常', '预约', '会议', '拜访', '生日']
    }
  },
  methods: {
    getUrl (i) {
      return `https://img-blog.csdn.net/20180314112802461?imageView2/5/w/120/h/12${i}`
    }
  },
  mounted () {
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.insert-calendar{
  height: 100%;
  overflow: auto;
  .show-icon{
    margin-right: 0.2rem;
    width: 0.32rem;
  }
  .vux-radio-icon{
    width: 0.32rem;
    height: auto;
  }
}
</style>
