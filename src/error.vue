/*
* @Author: zhangmengli
* @Date: 2018-10-10 10:20:21
 * @Last Modified by: zhangmengli
 * @Last Modified time: 2018-10-10 10:20:21
*/
<template>
  <div class="error">
    <!--<div class="header">
      <img src="@/assets/icon/bar.png" alt="" class="bar_icon">
      <ul>
        <li>
          <img src="@/assets/icon/fork.png" alt="">
        </li>
        <li>
          <span>名片模板</span>
        </li>
        <li>
          <img src="@/assets/icon/more.png" alt="">
        </li>
      </ul>
    </div>-->
    <div class="error_content">
      <img src="@/assets/icon/error.png" alt="">
      <p style="font-size: 18px;font-weight: bolder;letter-spacing:2px"><span style="font-size: 30px">抱歉！</span>{{msg}}</p>
      <!--<p style="font-size: 16px">将在<span id = "time" style="color: #fe2122;font-weight: bolder;padding-left: 6px;padding-right: 6px">5</span>秒后&nbsp;&nbsp;&nbsp;&nbsp;<x-button mini type="primary" style="font-weight: bolder" @click.native="goToLogin">返回首页</x-button></p>-->
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
  watch: {
  },
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
  .error{
    overflow: auto;
    height: 100%;
    width: 100%;
    -webkit-overflow-scrolling: touch;
    .header{
      height: 64px;
      background-color: #3a63c3;
      .bar_icon{
        margin: 5px 6px 0 6px;
      }
      ul{
        margin: 8px 10px;
        font-size: 20px;
        text-align: center;
        vertical-align: middle;
        color: #fff;
        li{
          display: inline-block;
          float: left;
          list-style: none;
        }
        li:nth-child(1){
          width: 10%;
        }
        li:nth-child(2){
          width: 80%;
        }
        li:nth-child(3){
          width: 10%;
        }
      }
    }
    .error_content{
      margin: 30px 56px 0 75px;
      img{
        margin-left: 50px;
        margin-bottom: 48px;
      }
      p{
        padding-bottom: 39px;
      }
    }
  }
</style>
