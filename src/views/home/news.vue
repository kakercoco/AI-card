/*
 * @Author: kaker.xutianxing
 * @Date: 2018-08-28 17:27:30
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-04 16:29:27
 * 动态
 */
<template>
<div class="news">
  <scroller lock-x :use-pulldown="true" :pullup-config="pullup_config" :use-pullup="true"  @on-pullup-loading="loadMore" ref="scrollerBottom" v-model="scrollerStatus">
    <div class="scroller_frame">
      <div class="header">
        <p>jack LU</p>
        <img src="@/assets/img/u112.png" alt="">
        <i><x-icon type="ios-camera"></x-icon></i>
      </div>

      <!--每条-->
      <div class="news-list" v-for="(item,i) in data_list" :key="i">
        <img :src="item.user_image" alt="" class="emotion">
        <div class="title">
          <p><span class="name">{{item.user_name}}</span><span class="tag">{{item.type == 0 ? '公司' : '个人'}}</span><span class="time">1小时前</span></p>
        </div>
        <div class="content clearfix">

          <p>{{item.title}}</p>
          <span v-for="(img_item, img_index) in item.cover" :key="img_index" :class="{'img-one': pic_list.length === 1}" class="img-wrap">
          <img :src="img_item.src" class="previewer-demo-img"  @click="show(index)">
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
                <span v-for="(p_item,i) in item.praise.rows" :key="i">
                  <img :src="p_item.user_image" alt="">
                  <i>{{p_item.user_name}}</i>
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

    </div>
  </scroller>
  <div v-transfer-dom>
    <previewer :list="pic_list" ref="previewer" :options="options" @on-index-change="logIndexChange"></previewer>
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
import { Scroller } from 'vux'
import { init_list } from '@/api/dynamic'
export default {
  name: 'news',
  directives: {
    TransferDom
  },
  components: {
    Previewer,
    Popover,
    XDialog,
    Scroller
  },
  data () {
    return {
      commentDialog: false, // 评论dialog
      pic_list: [],
      options: {
        getThumbBoundsFn (index) {
          // find thumbnail element
          let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
          // get window scroll Y
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          // optionally get horizontal scroll
          // get position of element relative to viewport
          let rect = thumbnail.getBoundingClientRect()
          // w = width
          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        }
      },
      pullup_config: {
          content: '下拉刷新',
          pullUpHeight: 60,
          height: 40,
          autoRefresh: false,
          downContent: '请下拉刷新数据',
          upContent: '请下拉刷新数据',
          loadingContent: '加载中...'
      },
      page:1,
      pagesize:10,
      max_page:0,
      data_list:[],
        test:[1,2,3,4],
      scrollerStatus: {
          pullupStatus: 'default'
      },
    }
  },
  methods: {
    logIndexChange (arg) {
      console.log(arg)
    },
    show (index) {
      this.$refs.previewer.show(index)
    },
    loadMore(){

    },
    get_list(){
        init_list({
            url:'/api/Dynamic/index',
            data:{
                page:this.page,
                pagesize: this.pagesize,
            }
        }).then((e)=>{
            if(e.data && e.data.rows && e.data.rows instanceof Array){
                let list = e.data.rows;
                let max_page = Math.ceil(e.data.total / 10);
                list.map((val,i)=>{
                    let time = val.update_time;
                    //公司动态就一张图片
                    if (typeof val.cover === 'string' && val.cover != ''){
                        const id = Number(Math.random().toString().substr(3, 10) + Date.now()).toString(36);
                        const con = {
                            id,
                            src:val.cover
                        };
                        val.cover = [con];
                        this.pic_list.push(con);
                    }

                    else if(val.cover instanceof Array && val.cover.length > 0){
                        const id = Number(Math.random().toString().substr(3, 10) + Date.now()).toString(36);
                        let arr = [];
                        val.cover.map((data,i)=>{
                            const obj = {
                                id,
                                src:data
                            };
                            this.pic_list.push(obj);
                            arr.push(obj);


                        });
                        val.cover = arr;
                    }

                    //处理时间
                    val.update_time = time.split(' ')[0];

                    //点赞开关
                    val.comment_two = false;
                });

                this.data_list = list;
                this.total = e.data.total;
                this.max_page = Math.ceil(e.data.total / 10);

                this.$nextTick(() => {

                    this.$refs.scrollerBottom.donePullup();
                    this.$refs.scrollerBottom.reset()
                });


                console.log(this.data_list);


                //debugger
            }



        })
    },
  },
  mounted () {
      this.get_list();
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.news{
  height: 100%;
  overflow: auto;
  .scroller_frame{
    padding-bottom:0.3rem;
  }
  .header{
    height: 3rem;
    background: url('~@/assets/img/tabbar.png') no-repeat  top;
    background-size: contain;
    position: relative;
    img{
      position: absolute;
      top: 1rem;
      left: 1rem;
      width: 1.6rem;
      height: 1.6rem;
    }
    p{
      text-align: center;
      font-size: 0.36rem;
      color: #717171;
      position: absolute;
      bottom: 0.5rem;
      width: 100%;
    }
    & > i{
      position: absolute;
      right: 0.3rem;
      bottom: 0.5rem;
      border-radius: 0.7rem;
      height: 0.7rem;
      width: 0.7rem;
      border: 1px solid #5977fe;
      text-align: center;
      line-height: 0.95rem;
      .vux-x-icon{
        width: 0.5rem;
        fill: #5977fe;
        height: 0.5rem;
      }
    }
  }
  .news-list{
    position: relative;
    padding-left: 1.5rem;
    padding-right: 0.3rem;
    margin-top: 0.4rem;
    &>.emotion{
      position: absolute;
      top: 0;
      left: 0.3rem;
      width: 1rem;
      height: 1rem;
      border-radius: 0.1rem;
    }
    .title{
      .name{
        font-size: 0.32rem;
      }
      .tag{
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
      .time{
        font-size: 0.24rem;
        color: #717171;
        float: right;
        text-decoration: underline;
      }
    }
    .content{
      & > p{
        font-size: 0.28rem;
        color: #717171;
        margin: 0.2rem 0;
      }
      .img-wrap{
        width: 33%;
        float: left;
        height: 1.5rem;
        overflow: hidden;
        text-align: center;
        padding-right: 0.05rem;
        padding-bottom: 0.05rem;
        background-color: #fff;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .img-one{
        width: 4rem;
        display: inline-block;
        img{
          width: 100%;
          margin-top: 0.2rem;
        }
      }
    }
    .comment{
      .icon-time{
        margin-top: 0.5rem;
        height: 0.6rem;
        line-height: 0.6rem;
        .comment-icon{
          width: 0.4rem;
          margin-top: 0.1rem;
        }
      }
      .comment-content{
        background-color: #f5f5f5;
        border-radius: 0.1rem;
        padding: 0.15rem;
        margin-top: 0.2rem;
      }
      .comment-zan{
        border-bottom: 1px solid #ddd;
        padding-bottom: 0.1rem;
        .heart{
          width: 0.4rem;
          margin-right: 0.2rem;
        }
        &>span{
          display: inline-block;
          height: 0.5rem;
          img{
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 0.1rem;
          }
          i{
            float: right;
            margin-top: 0.15rem;
            margin-left: 0.1rem;
          }
        }
      }
      li{
        border-bottom: 1px solid #ddd;
        padding: 0.25rem;
        &:last-child{
          border: none;
        }
        img{
          float: left;
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 0.1rem;
          margin-right: 0.2rem;
        }
        span{
          float: left;
          width: 1rem;
          font-size: 0.24rem;
          color: #717171;
          margin-right: 0.2rem;
        }
        p{
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
