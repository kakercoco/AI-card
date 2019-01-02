<template>
  <div class="rank-index">
    <div class="new_card_frame">
      <img src="@/assets/img/l.gif" class="my_loading">
      <div class="card-img">
        <img :src="backgroundImag" v-if="backgroundImag !==''">
        <img src="~@/assets/img/r_banner.png" v-if="backgroundImag ===''">
      </div>
    </div>
    <!--<div class="head-portrait clearfix">
      <img :src="myImage !==undefined && myImage !==''? myImage:'~@/assets/img/u112.png'">
    </div>-->
    <div class="rank-data-content">
      <ul class="content" v-for="(item, index) in myRankList" :index="index">
        <li>
          <div>
            <div class="rank-header">
              <img src="~@/assets/icon/calendar_rank.png">
              <span>{{item.day}}</span>
            </div>
            <div class="rank-content clearfix">
              <div class="fl">
                <p class="rank-num">{{item.me && item.me.customercount !==undefined && item.me.customercount !==''? item.me.customercount:0}} </p>
                <p class="rank-title">客户数</p>
              </div>
              <div class="fr">
                <p class="rank-num1"> {{item.me && item.me.rank !==undefined && item.me.rank !==''? item.me.rank:0}} </p>
                <p class="rank-title1">当日排名</p>
              </div>
            </div>
            <div class="rank-footer">
              <div class="rank-footer-left clearfix">
                <img :src="item.first && item.first.image!==undefined && item.first.image !==''? item.first.image : '~@/assets/img/u112.png'" class="client-img">
              </div>
              <div class="rank-footer-right clearfix" @click="clickRank(item.first)">
                <p class="title" @click="clickRank(item.first)">{{item.first.username}}夺得{{ item.day }}排行榜冠军</p>
                <x-icon type="ios-arrow-right" class="icon-right" @click="clickRank(item.first)"></x-icon>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="nodata" v-if="no_data">暂无数据!</div>
    </div>
  </div>
</template>

<script>
import { XSwitch, PopupHeader, Popup, TransferDom, Group, AlertModule } from 'vux'
import { getMyRank } from '@/api/rank'
export default {
  name: 'historyRank',
  directives: {
    TransferDom
  },
  components: {
    Group,
    PopupHeader,
    Popup,
    XSwitch,
    AlertModule
  },
  data () {
    return {
      myRankList: [],
      myImage: '',
      no_data: false,
      backgroundImag: this.$route.query.backgroundImag !== undefined && this.$route.query.backgroundImag !== '' ? this.$route.query.backgroundImag : ''
    }
  },
  methods: {
    getStr (arr, startIndex, endIndex) {
      let str = ''
      for (let i = startIndex; i < endIndex; i++) {
        str = str + arr[i]
      }
      return str
    },
    dataFormate (data, type) {
      let list = []
      if (typeof (data) === 'number') {
        data = data.toString()
        list = data.substr(1, data.length).split('')
      } else {
        list = data.substr(1, data.length).split('')
      }
      let str = ''
      if (list.length > 0) {
        let year = this.getStr(list, 0, 4)
        let mounth = this.getStr(list, 4, 6)
        let day = this.getStr(list, 6, 8)
        if (type === 1) {
          str = year + '-' + mounth + '-' + day
        } else {
          str = year + '年' + mounth + '月' + day + '日'
        }
      }
      return str
    },
    myRank () {
      this.$store.commit('app/open_global_dialog')
      getMyRank().then(res => {
        this.$store.commit('app/close_global_dialog')
        if (res.code === 200) {
          if (res.data) {
            this.no_data = false
            Object.keys(res.data).forEach((key) => {
              if (res.data[key].me && res.data[key].me.image !== undefined && res.data[key].me.image !== '') {
                this.myImage = res.data[key].me.image
              }
              if (key.length > 0) {
                let newDay = this.dataFormate(key, 2)
                res.data[key].day = newDay
              }
            })
            this.myRankList = res.data
          } else {
            this.no_data = true
          }
        }
      }).catch((e) => {
        this.$store.commit('app/close_global_dialog')
      })
    },
    clickRank (item) {
      this.$router.push({
        path: '/diagram',
        query: {
          eid: item.eid
        }
      })
    }
  },
  watch: {
  },

  mounted () {
    this.myRank()
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.rank-index{
  background-color: #f8f8f8;
  -webkit-overflow-scrolling: touch;
  overflow: hidden;
  .new_card_frame{
    padding: 0.3rem;
    position: relative;
    min-height:4.76rem;
    .my_loading{
      position: absolute;
      width: 0.5rem;
      height: 0.5rem;
      left: 3.5rem;
      z-index: 10;
      top: 2.13rem;
    }
    .card-img{
      border-radius: 0.1rem;
      overflow: hidden;
      position: relative;
      height: 4.16rem;
      -webkit-box-shadow: 0px 0px 0.5rem #e0dada;
      box-shadow: 0px 0px 0.5rem #e0dada;
      z-index:11;
      img{
        width: 100%;
        height: 4.16rem;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
  .banner{
    height: 5rem;
  }
  .nodata{
    line-height: 1.5rem;
    text-align: center;
    font-family: '黑体',serif;
    font-size: 0.3rem;
    color: #999;
  }
  .head-portrait{
    width: 1.4rem;
    height: 1.4rem;
    border-radius: 0.1rem;
    background-color: #fff;
    position: absolute;
    top: 3.3rem;
    left: 5.6rem;
    padding-top: 0.05rem;
    padding-left: 0.05rem;
    float: right;
    img{
      width: 1.3rem;
      height: 1.3rem;
      border-radius: 50%;
    }
  }
  .rank-data-content{
    .content{
      background-color: #fff;
      margin: 0.4rem 0.4rem 0.2rem 0.4rem;
      font-family: '黑体',serif;
      .rank-header{
        height: 0.8rem;
        padding: 0.3rem;
        img{
          height: 0.5rem;
          width: 0.5rem;
        }
        span{
          display: inline-block;
          font-size: 0.3rem;
          color: #999999;
          line-height: 0.36rem;
          position: relative;
          top: -0.15rem;
        }
      }
      .rank-content{
        padding: 0.1rem 0.3rem;
        height: 1.6rem;
        width: 100%;
        .rank-title{
          padding: 0.3rem 0.3rem 0 0.3rem;
          font-size: 0.24rem;
          line-height: 0.36rem;
          color: #999999;
          font-family: '黑体',serif;
        }
        .rank-title1{
          padding: 0.3rem 0.3rem 0 0.3rem;
          font-size: 0.24rem;
          line-height: 0.36rem;
          color: #999999;
          font-family: '黑体',serif;
        }
        .rank-num{
          padding: 0.3rem 0.3rem 0 0.3rem;
          font-size: 0.8rem;
          line-height: 0.36rem;
          color: #666666;
          font-family: 'Arial Regular',serif;
        }
        .rank-num1{
          padding: 0.3rem 0.3rem 0 0.3rem;
          font-size: 0.8rem;
          line-height: 0.36rem;
          color: #666666;
          font-family: 'Arial Regular',serif;
        }
      }
      .rank-footer{
        border-top: 1px solid #e5e5e5;
        padding: 0.3rem 0.3rem 0.3rem 0.3rem;
        height: 1rem;
        .rank-footer-left{
          float: left;
          width: 10%;
          .client-img{
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 50%;
            border: 1px solid #fbf9fe;
            position: relative;
            top: -0.08rem;
          }
        }
        .rank-footer-right{
          float: right;
          width: 90%;
          .title{
            color: #353535;
            font-size: 0.28rem;
            line-height: 0.36rem;
            font-family: '\9ED1\4F53',serif;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
          .icon-right {
            position: relative;
            top: -0.43rem;
            left: 5rem;
            width: 0.4rem;
            fill: #d2d2d2;
            display: inline-block;
          }
        }
      }
    }
    .content:last-child{
      margin-bottom: 1rem;
    }
  }
}
</style>
