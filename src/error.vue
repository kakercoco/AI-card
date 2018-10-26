/*
* @Author: zhangmengli
* @Date: 2018-10-10 10:20:21
 * @Last Modified by: zhangmengli
 * @Last Modified time: 2018-10-10 10:20:21
*/
<template>
  <div class="error">
    <div class="error_content">
      <img src="@/assets/icon/error.png" alt="">
      <p style="font-size: 0.36rem;font-weight: bolder;letter-spacing:2px"><span style="font-size: 0.6rem">抱歉！</span>{{msg}}</p>
    </div>
  </div>
</template>

<script>
import { XButton } from 'vux'
export default {
  name: 'error',
  components: {
    XButton
  },
  data () {
    return {
      msg: '未找到任何页面!'
    }
  },
  watch: {},
  methods: {
    goToLogin () {
      this.$router.push({
        path: '/main/index'
      })
    },
    times () {
      var i = 5
      var timer = setInterval(() => {
        if (i === -1) {
          clearInterval(timer)
        } else {
          document.getElementById('time').innerText = i
          if (i === 0) {
            this.goToLogin()
          }
          --i
        }
      }, 1000)
    }
  },
  mounted () {
    if (this.$route.query.msg !== undefined && this.$route.query.msg !== '') {
      this.msg = this.$route.query.msg
    }
    // this.times()
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.error {
  overflow: auto;
  height: 100%;
  width: 100%;
  -webkit-overflow-scrolling: touch;
  position: relative;
  .error_content {
    // margin: 30px 56px 0 75px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    img {
      margin-left: 0.5rem;
      margin-bottom: 0.816rem;
      width: 5rem;
    }
    p {
      padding-bottom: 0.618rem;
    }
  }
}
</style>
