/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-10 15:23:26
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-10-13 18:12:26
 */
<template>
  <div class="self-card">
    <div class="card-shadow clearfix" style="height: 4.405rem">
      <img :src="cardInfor.card_image" alt="" class="logo fl" v-if="cardInfor.card_image !== ''">
    </div>
    <div class="self-infor">
      <h5>个人信息</h5>
      <p><span>手机： </span><i>{{cardInfor.phone}}</i></p>
      <p><span>座机： </span><i>{{cardInfor.tel}}</i></p>
      <p><span>微信： </span><i>{{cardInfor.weixin}}</i></p>
      <p><span>邮箱： </span><i>{{cardInfor.email}}</i></p>
      <p><span>地址： </span><i>{{cardInfor.address}}</i></p>
    </div>
    <p class="btn">
      <x-button type="primary" class="card_button" @click.native="gotoEdit">编辑名片</x-button>
    </p>
      <p style="height: 0.5rem;"></p>
  </div>
</template>

<script>
import { XButton, AlertModule } from 'vux'
import { cardRead } from '@/api/card'

export default {
  name: 'selfCard',
  components: {
    XButton,
    AlertModule
  },
  data () {
    return {
      cardInfor: {}
    }
  },
  methods: {
    gotoEdit () {
      this.$store.state.user.cardInfor = {
        close: true,
        phone: '',
        tel: '',
        wechat: '',
        email: '',
        company: '',
        address: '',
        goods_case: {
          case: [],
          goods: []
        }
      }
      this.$router.push({
        path: '/editCard'
      })
    },
    getCard () {
      this.$vux.loading.show({
        text: 'Loading'
      })
      cardRead()
        .then(res => {
          if (res.code === 200) {
            this.$vux.loading.hide()// 隐藏
            this.cardInfor = res.data
          } else {
            this.$vux.loading.hide()// 隐藏
            AlertModule.show({
              title: '提示',
              content: res.msg
            })
          }
        })
    }
  },
  mounted () {
    this.getCard()
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.self-card{
  overflow: auto;
  height: 100%;
  -webkit-overflow-scrolling: touch;
  .logo{
    width: 100%;
  }
  .self-infor{
    padding: 0.5rem 0.3rem 0;
    margin-top: 0.5rem;
    height: 6.55rem;
    h5{
      text-align: left;
      font-size: 0.3rem;
      color: #353535;
      font-weight: normal;
      font-family: '微软雅黑',' Microsoft YaHei',serif;
    }
    p{
      width: 100%;
      font-size: 0.32rem;
      color: #717171;
      padding: 0.3rem 0;
      position: relative;
      padding-left: 1.1rem;
      span{
        width: 1.1rem;
        position: absolute;
        top: 0.32rem;
        left: 0;
        font-family: '微软雅黑',' Microsoft YaHei',serif;
        font-size: 0.28rem;
        line-height: 0.3rem;
        color: #999999;
      }
      i{
        width: 100%;
        min-height: 0.4rem;
        display: block;
        font-family: '黑体','SimHei',serif;
        color: #353535;
      }
    }
  }
  .btn{
    line-height: 1.5rem;
    padding-top: 0.45rem;
    background-color: #f8f8f8;
    .weui-btn:after {
      border-radius: 5px !important;
    }
    .weui-btn_primary {
      background-color: #3c7df0;
      height: 0.88rem;
      line-height: 0.88rem;
      border-radius: 5px;
      font-family: '黑体',SimHei, Microsoft YaHei, 'Avenir', Helvetica, Arial, sans-serif;
      font-weight: 500;
    }
    .card_button{
      width: 90%;
    }
  }
}
</style>
