/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-05 09:18:27
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-05 13:55:16
 */
<template>
  <div class="self-news">
    <ul>
      <li v-for="e in 5" :key="e" @click="gotoDetail">
        <span class="time">08.08</span>
        <div class="img-wrap">
          <img src="@/assets/img/u112.png" alt="" v-for="item in imgList" :key="item" :class="{'img-one':imgList.length ===1,'img-list':imgList.length>1}">
        </div>
        <p class="content">你改变不了环境，但你可以改变自己；你改变不了事实，但你可以改变态度；你改变不了过去，但你可以改变现在；.....</p>
        <p class="comment">
          <span><img src="@/assets/img/comment02.png" alt="">1</span>
          <span><img src="@/assets/img/heart-black.png" alt="">1</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'newsSelf',
  data () {
    return {
      imgList: ['1']
    }
  },
  methods: {
    gotoDetail () {
      this.$router.push({
        path: '/newsDetail'
      })
    }
  },
  mounted () {
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.self-news{
  li{
    position: relative;
    border-bottom: 1px solid #ddd;
    padding: 0.6rem 0 0.2rem 1.2rem;
    margin: 0 0.3rem;
    .time{
      position: absolute;
      top:0.6rem;
      left: 0;
      width: 1rem;
      font-size: 0.34rem;
      color: #717171;
    }
    .img-wrap{
      float: left;
      width: 1.5rem;
      height: 1.5rem;
      overflow: hidden;
      margin-right: 0.2rem;
      .img-one{
        width: 100%;
      }
      .img-list{
        width: 48%;
        margin-right: 1px;
        margin-bottom: 1px;
      }
    }
    .content{
      width: 4rem;
      float: left;
      color: #717171;
    }
    .comment{
      height: 0.5rem;
      clear: both;
      padding-top: 0.2rem;
      span{
        float: right;
        margin-left: 0.2rem;
      }
      img{
        width: 0.4rem;
        float: left;
        margin-right: 0.2rem;
      }
    }
  }
}
</style>
