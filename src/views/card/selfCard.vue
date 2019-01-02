/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-10 15:23:26
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-10-13 18:12:26
 */
<template>
  <div class="self-card edit-card ">
    <div class="card-shadow clearfix one">
      <img :src="cardInfor.card_image" alt="" class="logo fl" v-if="cardInfor.card_image !== ''">
    </div>
      <h5 class="have_line">个人信息</h5>
    <div class="self-infor one">

      <p><span>手机： </span><i>{{cardInfor.phone}}</i></p>
      <p><span>座机： </span><i>{{cardInfor.tel}}</i></p>
      <p><span>微信： </span><i>{{cardInfor.weixin}}</i></p>
      <p><span>邮箱： </span><i>{{cardInfor.email}}</i></p>
      <p><span>地址： </span><i>{{cardInfor.address}}</i></p>
    </div>
      <h5 class="have_line">个人简介</h5>
      <div class="self-bio new_textarea">
          {{cardInfor.content}}
      </div>

      <h5 class="have_line">我的图片</h5>

      <div class="self-img clearfix">
          <p v-for="(item, index) in albumList" :key="index" class="fl" v-if="item != ''">
              <img :src="item" alt="">
          </p>
      </div>

      <h5 class="have_line">推荐产品</h5>

      <div class="produce-list one_pro">
          <ul>
              <li v-for="(item, index) in pro_list" :key="index">
                  <img :src="item.product_img" alt="">
                  <span>{{item.product_name}}</span>
              </li>
          </ul>
      </div>

      <h5 class="have_line">推荐案例</h5>

      <div class="produce-list one_pro">
          <ul>
              <li v-for="(item, index) in case_list" :key="index">
                  <img :src="item.case_img" alt="">
                  <span>{{item.case_name}}</span>
              </li>
          </ul>
      </div>

      <h5 class="have_line">我的标签</h5>

      <div class="my_label">
          <ul>
              <li v-for="(item, index) in tag" :key="index">
                  {{item.tag_name}}
              </li>
          </ul>
      </div>


    <p class="yyf_new_btn new_btn">
      <x-button type="primary" class="card_button" @click.native="gotoEdit">编辑名片</x-button>
    </p>
      <p style="height:1.6rem;"></p>
  </div>
</template>

<script>
import { XButton, AlertModule,XTextarea,Group } from 'vux'
import { cardRead } from '@/api/card'

export default {
  name: 'selfCard',
  components: {
    XButton,
    AlertModule,
      XTextarea,
      Group
  },
  data () {
    return {
      cardInfor: {},
        albumList:[],
        pro_list:[],
        case_list:[],
        tag:[]
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
        path: '/editList'
      })
    },
    getCard () {
    this.$store.commit('app/open_global_dialog');
      cardRead()
        .then(res => {
        this.$store.commit('app/close_global_dialog');
          if (res.code === 200) {
            this.$vux.loading.hide()// 隐藏
            this.cardInfor = res.data
              if (this.cardInfor.album != null) {
                  this.albumList = this.cardInfor.album.split(',')
              }

              //推荐产品
              if(res.data && res.data.goods_case && res.data.goods_case.goods && res.data.goods_case.goods instanceof Array){
                  this.pro_list = res.data.goods_case.goods;
              }

              //推荐案例
              if(res.data && res.data.goods_case && res.data.goods_case.case && res.data.goods_case.case instanceof Array){
                  this.case_list = res.data.goods_case.case;
              }

              //个人标签
              if(res.data && res.data.tag && res.data.tag instanceof Array){
                this.tag = res.data.tag;
              }

          } else {
            this.$vux.loading.hide()// 隐藏
            AlertModule.show({
              title: '提示',
              content: res.msg
            })
          }
        }).catch((err)=>{
          this.$store.commit('app/close_global_dialog');
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
    background:#f8f8f8;
    .new_btn{
        border-top: 1px #f5f5f5 solid;
    }
  .logo{
    width: 100%;
  }
    h5{
        font-size: 0.33rem;
        color: #353535;
        font-weight: normal;
        font-family: '\9ED1\4F53';
        padding: 0.2rem 0.3rem;
        background: #fff;
    }
    .card-shadow{
        padding: 0.3rem !important;
        min-height: 4.76rem;
        background:#f8f8f8 !important;
        border: none !important;
    }
    .self-bio {
        padding: 0.2rem 0.3rem;
        background: #fff;
        margin-bottom: 0.1rem;
        font-family: '黑体';
        color: #353535;
        font-size: 0.32rem;
        line-height: 0.45rem;
    }
    .self-img {
        padding-left:0.44rem;
        padding-top:0.3rem;
        padding-bottom:0.3rem;
        background: #fff;
        margin-bottom: 0.1rem;
        p {
            position: relative;
            width: 2.1rem;
            height: 2.1rem;
            margin-right: 0.2rem;
            margin-bottom: 0.2rem;
            float: left;


        }
        .icon-close {
            position: absolute;
            top: -0.15rem;
            right: -0.15rem;
            width: 0.4rem;
            height: 0.4rem;
            fill:#333333;
            background: #fff;
            border-radius: 100px;
            border:1px #333333 solid;
        }
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius:5px;
        }
        & > span {
            position: relative;
            width: 2.1rem;
            height: 2.1rem;
            float: left;
            background: #f2f2f2;
            border: 1px #cacaca solid;
            border-radius: 3px;
            form{
                position: absolute;
                width: 100%;
                height: 100%;
                z-index: 9;
                input{
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
            svg{
                position: absolute;
                top: 0.5rem;
                left: 0.5rem;
                fill: #999999;
                z-index: 8;
            }

            .icon-insert {
                width: 2rem;
                height: 2rem;
                fill: #ccc;
                border-radius: 0.1rem;
                border: 1px solid #ccc;
            }
        }
        form {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            input {
                width: 100%;
                height: 100%;
            }
        }
    }
    .produce-list {
        & > p {
            font-size: 0.24rem;
            color: #717171;
            clear: both;
        }
        ul {
            overflow: hidden;
            width: 100%;
        }
    }
    .my_label{
        background: #fff;
        padding-bottom: 0.14rem;
        ul{
            padding: 0.05rem 0.3rem;
            padding-right: 0;
            overflow: hidden;
            li{

                position: relative;
                background: #ebf1ff;
                color: #3b63c2;
                margin-top: 0.15rem;
                text-align: center;
                float: left;
                margin-right: 0.15rem;
                padding: 0rem 0.25rem;
                font-family: '黑体';
                font-size: 0.28rem;
                height: 0.68rem;
                line-height: 0.68rem;

            }
            .add{
                margin-top: 0.15rem;
                text-align: center;
                background-color: #f4f4f4;
                float: left;
                margin-right: 0.15rem;
                color: #717171;
                padding: 0rem 0.25rem;
                font-family: '\9ED1\4F53';
                font-size: 0.28rem;
                padding-top: 0 !important;
                padding-bottom: 0 !important;
                height: 0.68rem;
                svg{
                    width: 0.5rem;
                    height: 0.5rem;
                    fill: #717171;
                    margin-top: 0.1rem;
                }
            }
        }
    }
  .one{
    padding: 0 0.3rem;
    margin-bottom: 0.1rem;
      background: #fff;

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
