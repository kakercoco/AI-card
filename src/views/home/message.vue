/*
 * @Author: kaker.xutianxing
 * @Date: 2018-08-28 10:46:11
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-03 10:23:41
 */
<template>
  <div class="message">
    <div class="card-shadow box-message" @click="gotoMessageManage">
      <img src="@/assets/img/message.png" alt="">
      <h5>服务消息</h5>
      <p>暂无消息提醒</p>
    </div>
    <ul class="list-message">
      <li class="card-shadow" v-for="(item, index) in 3" :key="index" @click="gotoIM">
        <badge text="8" class="my-badge"></badge>
        <img src="@/assets/img/u112.png" alt="">
        <div>
          <p>
            <span class="name">Kaker</span>
            <span class="time">2018-09-01</span>
          </p>
          <p><span style="margin-right:0.2rem;">[一条]</span>明日可约个时间商谈业务进展</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { Badge } from 'vux'

export default {
  name: 'message',
  components: {
    Badge
  },
  data () {
    return {
        test:1
    }
  },
  methods: {
    gotoMessageManage () {
      this.$router.push({
        path: '/messageManage'
      })
    },
    gotoIM () {

      this.$router.push({
          path: `/messageIM/3`,
      })
    }
  },
  mounted () {

  },
    activated(){
        console.log('activated');
    }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
$color: #717171;
.message{
  padding: .5rem 0.3rem;
  height: 100%;
  overflow: auto;
  .box-message{
    height: 1.6rem;
    padding: 0.3rem 0.2rem;
    img{
      float: left;
      width: 1rem;
      margin-right: 0.2rem;
    }
    h5{
      font-size: 0.3rem;
      margin-bottom: 0.2rem;
    }
    p{
      color: $color;
    }
  }
  .list-message{
    li{
      height: 1.6rem;
      padding: 0.3rem 0.2rem;
      margin-top: 0.5rem;
      position: relative;
      .my-badge{
        position: absolute;
        top: 0.2rem;
        left: 1rem;
        font-size: 0.24rem;
        width: 0.32rem;
        height: 0.32rem;
        line-height: 0.32rem;
        border-radius: 0.32rem;
      }
      img{
        width: 1rem;
        height: 1rem;
        border-radius: 0.05rem;
        float: left;
      }
      div{
        float: left;
        width: calc(100% - 1rem);
        padding-left: 0.3rem;
        p{
          font-size: 0.24rem;
          &:last-child{
            margin-top: 0.2rem;
            overflow: hidden;
          }
        }
        .name{
          font-size: 0.3rem;
        }
        .time{
          float: right;
          margin-top: 0.05rem;
        }
      }
    }
  }
}
</style>
