/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-10 15:23:26
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-10 16:12:40
 */
<template>
  <div class="self-card">
    <div class="card-shadow">
      <img src="@/assets/img/selfCard.png" alt="" class="logo">
    </div>
    <div class="self-infor">
      <h5>个人信息</h5>
      <p><span>手机： </span><i>158-9535-5648</i></p>
      <p><span>座机： </span><i>158-9535-5648</i></p>
      <p><span>微信： </span><i>156565212</i></p>
      <p><span>邮箱： </span><i>sdffsdf@qq.com</i></p>
      <p><span>公司： </span><i>加推科技</i></p>
      <p><span>地址： </span><i>上海市虹口区软件科技园创富大厦7F上海市虹口区软件科技园创富大厦7F</i></p>
    </div>
    <p class="btn">
      <x-button type="primary" @click.native="gotoEdit">编辑名片</x-button>
    </p>
  </div>
</template>

<script>
import { XButton } from 'vux'

export default {
  name: 'selfCard',
  components: {
    XButton
  },
  data () {
    return {
    }
  },
  methods: {
    gotoEdit () {
      this.$router.push({
        path: '/editCard'
      })
    }
  },
  mounted () {
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.self-card{
  overflow: auto;
  height: 100%;
  padding: 0.5rem 0.3rem 0;
  .logo{
    width: 100%;
  }
  .self-infor{
    margin-top: 0.5rem;
    h5{
      text-align: center;
      font-size: 0.34rem;
      color: #717171;
      font-weight: normal;
    }
    p{
      width: 100%;
      font-size: 0.32rem;
      color: #717171;
      padding: 0.3rem 0;
      border-bottom: 1px solid #eee;
      position: relative;
      padding-left: 1.1rem;
      span{
        width: 1.1rem;
        position: absolute;
        top: 0.25rem;
        left: 0;
      }
      i{
        width: calc(100% - 1.1rem);
      }
    }
  }
  .btn{
    margin: 1rem 0 0.5rem;
    padding: 0 1rem;
  }
}
</style>
