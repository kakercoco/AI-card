/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-05 10:43:56
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-27 15:48:31
 */
<template>
  <div class="news-Detail">
    <div class="news-list">
      <img src="@/assets/img/u112.png" alt="" class="emotion">
      <div class="title">
        <p>
          <span class="name">Top-W</span>
          <span class="tag">公司</span>
          <span class="time">1小时前</span>
        </p>
      </div>
      <div class="content clearfix">
        <p>生命诚可贵，生活价更高</p>
        <span v-for="(item, index) in list" :key="index" :class="{'img-one': list.length === 1}" class="img-wrap">
          <img :src="item.src" class="previewer-demo-img" @click="show(index)">
        </span>
      </div>
      <div class="comment ">
        <div class="icon-time">
          <popover placement="left">
            <div slot="content" class="popover-content">
              <span><img src="@/assets/img/heart.png" alt="">点赞</span>
              <span @click="commentDialog = true"><img src="@/assets/img/comment2.png" alt="">评论</span>
            </div>
            <img src="@/assets/img/comment.png" alt="" class="fr comment-icon">
          </popover>
          <span>2018-09-04</span>
        </div>
        <div class="comment-content">
          <p class="comment-zan">
            <img src="@/assets/img/heart-blue.png" alt="" class="heart">
            <span>
              <img src="@/assets/img/u112.png" alt="">
              <i>Top Man,</i>
            </span>
            <span>
              <img src="@/assets/img/u112.png" alt="">
              <i>Top Man,</i>
            </span>
          </p>
          <ul>
            <li class="clearfix">
              <img src="@/assets/img/u112.png" alt="" class="fl">
              <span class="name">Top Man:</span>
              <p>生活中使我们不快乐的往往是一些芝麻小事，就像我们可以轻易躲开一头大象，却躲不开一只苍蝇。</p>
            </li>
            <li class="clearfix">
              <img src="@/assets/img/u112.png" alt="" class="fl">
              <span class="name">Top Man:</span>
              <p>生活中使我们不快乐的往往是一些芝麻小事</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-transfer-dom class="dialog">
      <x-dialog :show.sync="commentDialog"  hide-on-blur>
        <p class="dialog-comment clearfix">
          <input type="text">
          <button>发送</button>
          <img src="@/assets/icon/face.png" alt="">
        </p>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import { Previewer, TransferDom, Popover, XDialog } from 'vux'

export default {
  name: 'newsDetail',
  directives: {
    TransferDom
  },
  components: {
    Previewer,
    Popover,
    XDialog
  },
  data () {
    return {
      commentDialog: false,
      list: [
        {
          msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
          src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
          w: 800,
          h: 400
        },
        {
          msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
          src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
          w: 1200,
          h: 900
        }, {
          msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwwcynw2j20p00b4js9.jpg',
          src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwwcynw2j20p00b4js9.jpg'
        }
      ]
    }
  },
  methods: {},
  mounted () {}
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.news-Detail{
  height: 100%;
  overflow: auto;
  .news-list {
    position: relative;
    padding-left: 1.5rem;
    padding-right: 0.3rem;
    margin-top: 0.4rem;
    & > .emotion {
      position: absolute;
      top: 0;
      left: 0.3rem;
      width: 1rem;
      height: 1rem;
      border-radius: 0.1rem;
    }
    .title {
      .name {
        font-size: 0.32rem;
      }
      .tag {
        border: 1px solid #5977fe;
        color: #5977fe;
        font-size: 0.22rem;
        height: 0.35rem;
        line-height: 0.36rem;
        border-radius: 0.35rem;
        padding: 0 0.2rem;
        display: inline-block;
        margin-left: 0.5rem;
      }
      .time {
        font-size: 0.24rem;
        color: #717171;
        float: right;
        text-decoration: underline;
      }
    }
    .content {
      & > p {
        font-size: 0.28rem;
        color: #717171;
        margin: 0.2rem 0;
      }
      .img-wrap {
        width: 33%;
        float: left;
        height: 1.5rem;
        overflow: hidden;
        text-align: center;
        padding-right: 0.05rem;
        padding-bottom: 0.05rem;
        background-color: #fff;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .img-one {
        width: 4rem;
        display: inline-block;
        img {
          width: 100%;
          margin-top: 0.2rem;
        }
      }
    }
    .comment {
      .icon-time {
        margin-top: 0.5rem;
        height: 0.6rem;
        line-height: 0.6rem;
        .comment-icon {
          width: 0.4rem;
          margin-top: 0.1rem;
        }
      }
      .comment-content {
        background-color: #f5f5f5;
        border-radius: 0.1rem;
        padding: 0.15rem;
        margin-top: 0.2rem;
      }
      .comment-zan {
        border-bottom: 1px solid #ddd;
        padding-bottom: 0.1rem;
        .heart {
          width: 0.4rem;
          margin-right: 0.2rem;
        }
        & > span {
          display: inline-block;
          height: 0.5rem;
          img {
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 0.1rem;
          }
          i {
            float: right;
            margin-top: 0.15rem;
            margin-left: 0.1rem;
          }
        }
      }
      li {
        border-bottom: 1px solid #ddd;
        padding: 0.25rem;
        &:last-child {
          border: none;
        }
        img {
          float: left;
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 0.1rem;
          margin-right: 0.2rem;
        }
        span {
          float: left;
          width: 1rem;
          font-size: 0.24rem;
          color: #717171;
          margin-right: 0.2rem;
        }
        p {
          float: left;
          width: calc(100% - 2rem);
          font-size: 0.22rem;
          color: #717171;
        }
      }
    }
  }
}
.popover-content{
  padding: 0.15rem 0;
  height: 0.75rem;
  span{
    float: left;
    width: 1.6rem;
    padding-left: 0.3rem;
    &:first-child{
      border-right: 1px solid #fff;
      margin-top: 1px;
    }
  }
  img{
    width: 0.4rem;
    float: left;
    margin-right: 0.1rem;
  }
}
.dialog-comment{
  padding: 0.2rem;
  input{
    outline: none;
    border: none;
    height: 0.6rem;
    float: left;
    width: calc(100% - 1.6rem);
    border-bottom: 1px solid #ddd;
  }
  img{
    width: 0.4rem;
    height: 0.4rem;
    float: right;
    margin-top: 0.1rem;
    margin-right: 0.2rem;
  }
  button{
    float: right;
    outline: none;
    border: none;
    height: 0.6rem;
    background-color: #fff;
    border: 1px solid #5977fe;
    width: 0.8rem;
    border-radius: 0.1rem;
    color: #717171;
  }
}
.dialog{
  & /deep/ .weui-dialog{
    width: 100%;
    max-width: 100%;
  }
}
</style>
