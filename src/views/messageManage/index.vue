/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-01 18:02:51
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-01 18:43:06
 */
<template>
  <div class="message-manage">
    <ul>
      <li class="clearfix" v-for="(item, index) in 3" :key="index">
        <p class="tac time">2018-08-08 08:10</p>
        <span><img src="@/assets/img/message2.png" alt=""></span>
        <div>
          <p>您8月8日需要回访</p>
          <p><a href="">查看</a><x-icon type="ios-arrow-right" size="25" class="fr icon-right"></x-icon></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'messageManage',
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
.message-manage{
  padding: 0 0.3rem;
  overflow: auto;
  height: 100%;
  li{
    margin-top: 0.5rem;
    .time{
      font-size: 0.24rem;
      color: #717171;
      margin-bottom: 0.4rem;
    }
    span{
      background-color: #5977fe;
      float: left;
      padding: 0.2rem;
      width: 1rem;
      height: 1rem;
      border-radius: 0.1rem;
      margin-right: 0.2rem;
      img{
        width: 100%;
      }
    }
    div{
      position: relative;
      margin-top: 0.2rem;
      width: calc(100% - 1.4rem);
      float: right;
      border: 1px solid #ccc;
      padding: 0 0.2rem;
      p{
        font-size: 0.3rem;
        &:first-child{
          height: 0.7rem;
          line-height: 0.7rem;
          border-bottom: 1px solid #ccc;
          color: #717171;
        }
        &:last-child{
          height: 0.8rem;
          line-height: 0.8rem;
          a{
            color: #5977fe;
          }
          .icon-right{
            height: 100%;
            fill: #aaa;
          }
        }
      }
      &:after{
        content: '';
        width: 0.2rem;
        height: 0.2rem;
        transform: rotate(45deg);
        border: 1px solid #ccc;
        position: absolute;
        top: 0.2rem;
        left: -0.12rem;
        border-top: none;
        border-right: none;
        background-color: #fff;
      }
    }
  }
}
</style>
