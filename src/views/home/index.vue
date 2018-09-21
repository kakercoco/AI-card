/*
 * @Author: kaker.xutianxing
 * @Date: 2018-08-27 18:30:51
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-07 16:27:28
 */
<template>
  <div class="index footprint">
    <tab :line-width="2" v-model="tabIndex">
      <tab-item @on-item-click="onItemClick">时间</tab-item>
      <tab-item @on-item-click="onItemClick">行为</tab-item>
      <tab-item @on-item-click="onItemClick">互动</tab-item>
    </tab>
      <div v-show="tabIndex === 0" class="time_frame">
        <!--<p class="tac time">●&nbsp;&nbsp; 2018/08/05  15:50</p>-->
        <scroller
                height="100%"
                lock-x
                :use-pullup="true"
                :pullup-config="pullup_config"
                @on-pullup-loading="timeLoadMore"
                ref="scrollerBottom">
          <ul class="logs-list">
            <li v-for="(item, index) in time_list" :key="index" @click="gotoClient(item)">
              <img :src="item.wx_image ? item.wx_image : '/static/image/moren.jpg'">
              <div v-html="item.ele"></div>
              <span>{{item.time}}</span>
            </li>
          </ul>
        </scroller>
      </div>
      <div v-show="tabIndex === 1" class="tab-action">
        <div class="action-card card-shadow clearfix">
          <p class=" tac">
            <img src="@/assets/img/datapicker.png" class="fr" @click="showDateChoose">
            {{behavior_config.time_slot}}被查看的行为统计
          </p>
          <ul>
            <li @click="gotoCardList()">
              <img src="@/assets/img/card.png" alt="">
              <a href="">{{behavior_config.card}}次</a>
              <h5>查看名片</h5>
            </li>
            <li @click="gotoWebsiteList()">
              <img src="@/assets/img/inter.png" alt="">
              <a href="">{{behavior_config.web}}次</a>
              <h5>查看官网</h5>
            </li>
            <li>
              <img src="@/assets/img/news.png" alt="">
              <a href="">{{behavior_config.case}}次</a>
              <h5>查看案例</h5>
            </li>
            <li>
              <img src="@/assets/img/assign.png" alt="">
              <a href="">{{behavior_config.product}}次</a>
              <h5>查看产品</h5>
            </li>
          </ul>
        </div>
        <ul class="action-list">
          <li
              class="card-shadow"
              @click="gotoCallPhoneList(item)"
              v-for="(item, index) in behavior_list" :key="index">
            <img :src="'/static/image/' + item.type +'.png'">
            <span>{{item.title}}</span>
            <i>{{item.nums}}次</i>
          </li>
        </ul>
      </div>
      <div v-show="tabIndex === 2" style="height:100%;" class="interaction_frame">
        <scroller
            lock-x
            height="100%"
            :pullup-config="pullup_config"
            @on-pullup-loading="Interaction_loadMore"
            :use-pullup="true"
            ref="scroller">
          <div>
            <div class="Interaction_header">
              <span>{{interactionScroller.time_slot}}内和我的互动统计</span>
              <img src="@/assets/img/datapicker.png" alt="" class="fr" @click="showDateChoose">
            </div>
            <ul class="news-list">
              <div class="card-shadow" v-for="(item, index) in interaction_list" :key="index" >
                <li v-if="item.status" @click="toggleDetail(index)">
                  <img :src="item.wx_image ? item.wx_image : '/static/image/moren.jpg'">
                  <span class="list_title">{{item.wx_name}}在{{interactionScroller.time_slot}}内和你互动了{{item.num}}次</span>
                  <x-icon type="ios-arrow-down" size="20" class="icon"></x-icon>
                </li>
                <div v-else class="news-list-detail">
                  <p class="title">
                    <img src="@/assets/img/datapicker.png" alt="" class="fr" style="display: none">
                    <img :src="item.wx_image ? item.wx_image : '/static/image/moren.jpg'" class="avatar">
                  </p>
                  <p class="tac">{{item.wx_name}}在{{interactionScroller.time_slot}}内和你互动了{{item.num}}次</p>
                  <p v-for="(val, i) in item.typeGroup" :key="i" class="graph">
                    <span>{{val.title}}</span>
                    <strong>
                      <i :style="{width: val.percent + 'rem'}"></i>
                      <b>{{val.num}}</b>
                    </strong>


                  </p>
                  <p class="tar" @click="toggleDetail(index)"><x-icon type="ios-arrow-up" size="20" class="icon" ></x-icon></p>
                </div>
              </div>
            </ul>
          </div>

        </scroller>
      </div>
      <x-dialog v-model="datePickerDialog" class="dialog-datepicker" hide-on-blur :dialog-style="{'max-width': '100%', width: '100%'}">
        <h5>选择时间段</h5>
        <group>
          <datetime v-model="startTIme" format="YYYY-MM-DD" placeholder="请选择开始时间" @on-change="changeStartTime">
            <span slot="title"></span>
            <div slot="title">
              <img src="@/assets/img/datepickerGray.png" alt="" class="fl title-icon">
              <span>开始</span>
            </div>
          </datetime>
        </group>
        <group>
          <datetime v-model="endTime" format="YYYY-MM-DD" placeholder="请选择结束时间">
            <span slot="title"></span>
            <div slot="title">
              <img src="@/assets/img/datepickerGray.png" alt="" class="fl title-icon">
              <span>结束</span>
            </div>
          </datetime>
        </group>
        <p class="btn">
          <x-button type="primary" @click.native="sureTime">确定</x-button>
        </p>
      </x-dialog>
      <div class="Unread_dialog" v-if="$store.state.app.Unread != 0 && tabIndex === 0" @click="Refresh">未读消息:{{$store.state.app.Unread}}</div>
  </div>
</template>


<script>
import { Tab, TabItem, Scroller, XDialog, XButton, Group, Cell, Datetime } from 'vux'
import {dateFtt,config} from '@/utils/base';
import {get_user_info} from '@/api/user_info'
import {init_list,init_Interaction} from '@/api/footprint'

export default {
  name: 'index',
  components: {
    Tab,
    TabItem,
    Scroller,
    XButton,
    XDialog,
    Group,
    Cell,
    Datetime
  },
  data () {
    return {
      time_list:[],
      interaction_list:[],
      behavior_list:[],
      tabIndex: 0,
      startTIme: '',
      endTime: '',
      datePickerDialog: false, // 日期选择dialog
      countObj: [],
      loadingConfig: {
        upContent: '上拉加载更多',
        downContent: '释放后加载',
        loadingContent: '加载中...',
        content: '请上拉刷新数据'
      },
      timeScroller:{
          page:1,
          pagesize:10,
          max_page:0,
          isAjax:true,
          total:0,
          test:true
      },
      interactionScroller:{
          page:1,
          pagesize:10,
          max_page:0,
          isAjax:true,
          total:0,
          Reset:true,
          time_slot:'7日',
          status_position:0
      },
      behavior_config:{
          isAjax:true,
          time_slot:'7日',
          card:0,
          web:0,
          case:0,
          product:0,

      },
      pullup_config: {
          content: '加载中...',
          pullUpHeight: 60,
          height: 40,
          autoRefresh: false,
          downContent: '加载中...',
          upContent: '加载中...',
          loadingContent: '加载中...'
      },
      scrollerStatus: {
          pullupStatus: 'default'
      },
    }
  },
  methods: {
    onItemClick (index) {
      this.tabIndex = index
    },

    toggleDetail (index) {
        let status = this.interaction_list[index].status;
        this.interaction_list[index].status = !status;
        //点击展开
        if(status){
          // const ele = document.querySelector('.interaction_frame .xs-container');
          // var transformY = 0;
          // try {
          //     transformY = parseInt(window.getComputedStyle(ele,null).transform.replace('matrix(1, 0, 0, 1, 0,','').replace(')',''));
          // }
          // catch (err){}
          // this.interactionScroller.status_position = transformY;
        }
        //关上
        else{
            this.$nextTick(() => {
                this.$refs.scroller.reset({top:0});
            });
        }





    },

    timeLoadMore () {
        if (this.timeScroller.isAjax && this.timeScroller.page < this.timeScroller.max_page) {
            this.timeScroller.page ++;
            this.get_time_list();
        }
        else if(this.timeScroller.page >= this.timeScroller.max_page){
            this.$refs.scrollerBottom.disablePullup() // 禁用上拉
        }
    },

    showDateChoose () {
      this.datePickerDialog = true
    },

    sureTime () {
      this.datePickerDialog = false;

      //如果是互动页面
      if(this.tabIndex === 2){
          this.interactionScroller.time_slot = `${this.startTIme}到${this.endTime}`;
          if (this.interactionScroller.isAjax){
              this.$refs.scroller.disablePullup();
              this.interaction_list = [];
              this.interactionScroller.page = 1;
              this.interactionScroller.total = 0;
              this.interactionScroller.max_page = 0;
              this.Interaction_init(this.startTIme,this.endTime,true);
          }
      }
      else{
          this.behavior_config.time_slot = `${this.startTIme}到${this.endTime}`;
          this.$vux.loading.show({
              text: '加载中...'
          });
          if (this.behavior_config.isAjax){
              //重置
              this.behavior_init(this.startTIme,this.endTime);

          }

      }
      this.startTIme = '';
      this.endTime = '';

    },

    changeStartTime (val) {
      // this.startTIme = val
    },

    gotoClient (item) {
      this.$router.push({
        path: '/client',
        query:{
            uid:item.uid
        }
      })
    },

    gotoCardList () {
      this.$router.push({
        path: '/seeCard'
      })
    },

    gotoWebsiteList () {
      this.$router.push({
        path: '/seeWebsite'
      })
    },

    gotoCallPhoneList (item) {
      this.$router.push({
        path: '/callPhone',
        query:{
          type:item.type
        }
      })
    },

    //获取时间列表
    get_time_list(isTop){
        this.timeScroller.isAjax = false;
        init_list({
            type:'time',
            page:this.timeScroller.page,
            pagesize: this.timeScroller.pagesize,
        }).then((e)=>{
            this.timeScroller.isAjax = true;
            this.$vux.loading.hide();
            if(e.code === 200 && e.data && e.data.rows instanceof Array){
                let list = e.data.rows;
                list.map((val,i)=>{
                    val.ele = config[val.type] ? val.wx_name + config[val.type] : '';
                    val.time = dateFtt("MM-dd hh:mm", new Date(val.create_time));
                });
                this.time_list = this.time_list.concat(list);
                this.timeScroller.total = e.data.total;
                this.timeScroller.max_page = Math.ceil(e.data.total / 10);
                this.$nextTick(() => {
                    this.$refs.scrollerBottom.donePullup();//上啦完成

                    if(isTop){
                        this.$refs.scrollerBottom.reset({top:0});
                    }
                    else{
                        this.$refs.scrollerBottom.reset();
                    }

                    if(this.timeScroller.max_page <= 1){
                        this.$refs.scrollerBottom.disablePullup();//禁止上啦
                    }
                    else{
                        this.$refs.scrollerBottom.enablePullup();//恢复上啦
                    }

                });
            }
        }).catch((err)=>{
            console.log(err);
            this.$vux.loading.hide();
            this.timeScroller.isAjax = true;
        })
    },

    Interaction_loadMore(){
        if (this.interactionScroller.isAjax && this.interactionScroller.page < this.interactionScroller.max_page) {
            this.interactionScroller.page ++;
            this.Interaction_init();
        }
        else if(this.interactionScroller.page >= this.interactionScroller.max_page){
            this.$refs.scroller.disablePullup() // 禁用上拉
        }
    },

    Refresh(){
        if (this.timeScroller.isAjax){
            //重置
            this.$vux.loading.show({
                text: '加载中...'
            });
            this.$store.commit('app/Empty');
            this.timeScroller.test = true;
            this.time_list = [];
            this.$refs.scrollerBottom.disablePullup();
            this.timeScroller.page = 1;
            this.timeScroller.total = 0;
            this.timeScroller.max_page = 0;
            this.get_time_list(true);
            /*this.$nextTick(()=>{
                this.timeScroller.test = false;
                this.$nextTick(()=>{
                    this.$store.commit('app/Empty');
                    this.timeScroller.test = true;
                    this.time_list = [];
                    this.timeScroller.page = 1;
                    this.timeScroller.total = 0;
                    this.timeScroller.max_page = 0;
                    this.get_time_list();
                })
            })*/

        }
    },

    //获取互动列表
    Interaction_init(start_time,end_time,isTop){
          this.interactionScroller.isAjax = false;
          init_list({
              type:'interact',
              page:this.interactionScroller.page,
              pagesize: this.interactionScroller.pagesize,
              start_time,
              end_time
          }).then((e)=>{
              //debugger;
              this.interactionScroller.isAjax = true;
              this.$vux.loading.hide();
              if(e.code === 200 && e.data && e.data.rows instanceof Array){
                  let list = e.data.rows;

                  const reg = /<i>\W+<\/i>/g;

                  list.map((val,i)=>{
                      if(val.typeGroup && val.typeGroup instanceof Array){
                          val.typeGroup.map((item,index)=>{
                              if(config[item.type]){
                                  item.title = config[item.type].match(reg) ? config[item.type].match(reg).join('').replace(/<i>/g,'').replace(/<\/i>/g,'') : '';
                              }
                              else{
                                  item.title = '';
                              }
                              //item.percent = (item.num / val.num).toFixed(2) * 100 + '%';
                              item.percent = parseInt((item.num / val.num) * 170 * 2)/100;
                          })
                      }
                      val.status = true;
                  });
                  console.log('互动',list);
                  this.interaction_list = this.interaction_list.concat(list);
                  this.interactionScroller.total = e.data.total;
                  this.interactionScroller.max_page = Math.ceil(e.data.total / 10);
                  this.$nextTick(() => {
                      this.$refs.scroller.donePullup();//上啦完成

                      if(isTop){
                          this.$refs.scroller.reset({top:0});
                      }
                      else{
                          this.$refs.scroller.reset();
                      }

                      if(this.interactionScroller.max_page <= 1){
                          this.$refs.scroller.disablePullup();//禁止上啦
                      }
                      else{
                          this.$refs.scroller.enablePullup();//恢复上啦
                      }
                  });
              }
          }).catch((err)=>{
              console.log(err);
              this.$vux.loading.hide();
              this.interactionScroller.isAjax = true;
          })
    },

    //获取行为列表
    behavior_init(start_time,end_time){
        this.behavior_config.isAjax = false;
        this.$vux.loading.show({
            text: '加载中...'
        });
        init_list({
            type:'behavior',
            start_time,
            end_time
        }).then((e)=>{
            this.behavior_config.isAjax = true;
            this.$vux.loading.hide();

            if(e.code === 200 && e.data && e.data instanceof Array){
                let list = e.data;
                let end_list = [];
                const reg = /<i>\W+<\/i>/g;
                list.map((val,i)=>{
                    if(val.type === 0){
                        this.behavior_config.card = val.nums;
                    }
                    else if(val.type === 1){
                        this.behavior_config.web = val.nums;
                    }
                    else if(val.type === 2){
                        this.behavior_config.case = val.nums;
                    }
                    else if(val.type === 3){
                        this.behavior_config.product = val.nums;
                    }
                    else{
                        if(config[val.type]){
                            val.title = config[val.type].match(reg) ? config[val.type].match(reg).join('').replace(/<i>/g,'').replace(/<\/i>/g,'') : '';
                        }
                        else{
                            val.title = '';
                        }
                        end_list.push(val);
                    }
                });

                this.behavior_list = end_list;

            }
        }).catch((err)=>{
            console.log(err);
            this.$vux.loading.hide();
            this.behavior_config.isAjax = true;
        })

    }

  },
  mounted () {
      this.get_time_list();
      this.Interaction_init();
      this.behavior_init();
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
$color:#717171;
.index{
  overflow: auto;
  height: 100%;
  padding-top: 44px;
  .Unread_dialog{
    position: fixed;
    top:2rem;
    right: 0;
    width: 2.2rem;
    height: 0.6rem;
    z-index: 999;
    background: #fff;
    border-bottom-left-radius: 20px;
    border-top-left-radius: 20px;
    box-shadow: 0 3px 10px #d6e1fb;
    border: 1px #d6e1fb solid;
    line-height: 0.6rem;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .time_frame{
    height:100%;
  }
  .vux-tab-wrap{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
  .time{
    font-size: 0.32rem;
    line-height: 0.5rem;
    color: #717171;
    margin: 0.4rem 0;
  }
  .logs-list{
    padding: 0 0.2rem;
    li{
      height: 1.8rem;
      padding: 0.25rem 0;
      border-bottom: 1px solid #eee;
      img{
        float: left;
        height: 100%;
        width: 1.3rem;
      }
      div{
        width: 65%;
        float: left;
        height: 100%;
        line-height: 0.5rem;
        margin-left: 0.2rem;
        padding: 0.1rem 0;
        overflow: hidden;
        i{
          color: #f69600;
        }
      }
      span{
        float: right;
        width: 0.8rem;
        height: 100%;
        color: #717171;
        font-size: 0.22rem;
        line-height: .5rem;
      }
    }
  }
}
.tab-action{
  padding: 0 0.2rem;
  .action-card{
    padding: 0.25rem;
    margin-top: 0.6rem;
    & > p{
      font-size: 0.3rem;
      color: $color;
      height: 0.4rem;
      img{
        width: 0.4rem;
      }
    }
    ul{
      margin-top: 0.6rem;
    }
    li{
      width: 25%;
      float: left;
      height: 2rem;
      text-align: center;
      img{
        width: 0.7rem;
      }
      a{
        display: block;
        text-decoration: underline;
        color:$color;
        margin: 0.3rem 0;
        font-size: 0.22rem;
      }
      h5{
        color: #999;
        font-size: 0.26rem;
      }
    }
  }
  .action-list{
    li{
      height: 1.2rem;
      padding: 0.4rem 0.15rem;
      line-height: 0.4rem;
      margin-top: 0.3rem;
      img{
        float: left;
        height: 100%;
        margin-right: 0.2rem;
      }
      span{
        float: left;
        height: 100%;
        font-size: 0.3rem;
      }
      i{
        float: right;
        height: 100%;
        font-size: 0.28rem;
      }
    }
  }
}
.news-list{
  padding: 0.6rem 0.3rem 0;
  padding-top: 0;
  li{
    height: 1.4rem;
    padding: 0.2rem 0.15rem;
    line-height: 1rem;
    margin-top: 0rem;
    img{
      float: left;
      height: 100%;
      margin-right: 0.2rem;
    }
    span{
      float: left;
      height: 100%;
      font-size: 0.3rem;
    }
    .list_title{
      float: left;
      width: 4.8rem;
      height: 1rem;
      padding: 0.1rem 0;
      line-height: 0.4rem;
    }
    .icon{
      float: right;
      height: 100%;
      fill: #999;
    }
  }
  .news-list-detail{
    margin-top: 0.3rem;
    .avatar{
      display: block;
      margin: 0 auto;
      width: 1.5rem;
      height: 1.5rem;
    }
    .title{
      position: relative;
      img{
        &:first-child{
          width: 0.35rem;
          position: absolute;
          top: 0.6rem;
          right: 0.2rem;
        }
      }
    }
    p{
      &:nth-of-type(2){
        margin: 0.4rem 0;
        font-size: 0.22rem;
        color: $color;
      }
      &:last-child{
        height: 1rem;
        padding: 0 0.15rem;
      }
      .icon{
        fill: #999;
      }
    }
    .graph{
      height: 0.7rem;
      line-height: 0.7rem;
      padding: 0 0.17rem;
      span{
        float: left;
        width: 1.9rem;
        position: relative;
        text-align: right;
        /*&::after{*/
          /*content: '';*/
          /*width: 0.1rem;*/
          /*height: 0.1rem;*/
          /*border-radius: 50%;*/
          /*position: absolute;*/
          /*top: 0.1rem;*/
          /*left: 0;*/
        /*}*/
      }
      strong{
        float:left;
        width:4.2rem;
        height: 0.7rem;
        margin-left: 0.3rem;
      }
      i{
        display: inline-block;
        height: 0.2rem;
        border-radius: 0.1rem;
        margin-right: 5px;
        min-width: 1px !important;

      }
      &:nth-child(3){
        span::after{
          background-color: #ff0000;
        }
      }
      &:nth-child(4){
        span::after{
          background-color: #653ffe;
        }
      }
      &:nth-child(5){
        span::after{
          background-color: #73a6fb;
        }
      }
      &:nth-child(5n){
        i{
          background: linear-gradient(left, #c781f9, #0fba40);
        }
      }
      &:nth-child(5n+1){
        i{
          background: linear-gradient(left, #cc00ff, #5747fe);
        }
      }
      &:nth-child(5n+2){
        i{
          background: linear-gradient(left, #cd01fd, #fd5b66);
        }
      }
      &:nth-child(5n+3){
        i{
          background: linear-gradient(left, #cc00ff, #b1181a);
        }
      }
      &:nth-child(5n+4){
        i{
          background: linear-gradient(left, #cc00ff, #5747fe);
        }
      }
      &:nth-child(5n+5){
        span::after{
        i{
          background: linear-gradient(left, #cc00ff, #6eaffb);
        }
      }
      &:nth-child(5n+6){
        i{
          background: linear-gradient(left, #cd01fd, #fd5b66);
        }
      }
      &:nth-child(5n+7){
        i{
          background: linear-gradient(left, #c781f9, #0fba40);
        }
      }
    }
  }
}

}
.dialog-datepicker{
  h5{
    height: 0.9rem;
    line-height: 0.9rem;
    font-size: 0.32rem;
    color: $color;
  }
  .title-icon{
    width: 0.4rem;
    margin-right: 0.2rem;
  }
  .btn{
    padding: 1rem;
  }
}
  .Interaction_header{
    height: 0.8rem;
    span{
      float: left;
      margin-left: 0.3rem;
      line-height: 0.8rem;
      color:#999 ;

    }
    img{
      width: 0.4rem;
      height: 0.4rem;
      float: right;
      margin-top: 0.2rem;
      margin-right: 0.3rem;
    }
  }
</style>
