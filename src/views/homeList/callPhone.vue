/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-01 14:07:51
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-01 15:37:00
 */
<template>
  <div class="see-card" style="height: 100%;">

    <scroller
            height="100%"
            lock-x
            :use-pullup="true"
            :pullup-config="pullup_config"
            @on-pullup-loading="loadMore"
            ref="scrollerBottom">
      <div>
        <div class="title">
          <h5>{{time_slot === '' ? '7日内' : time_slot}}被查看的行为统计</h5>
          <img src="@/assets/img/datapicker.png" alt="" @click="showDateChoose">
          <p>共 {{scroller_config.total}} 次</p>
        </div>
        <ul class="list">
          <li v-for="(item, index) in list" :key="index" @click="to_details(item)">
            <p>{{item.time}}</p>
            <img :src="item.wx_image ? item.wx_image : '@/assets/img/moren.jpg'">
            <div v-html="item.ele"></div>
            <x-icon type="ios-arrow-right" size="25" class="icon-right"></x-icon>
          </li>
        </ul>
      </div>

    </scroller>

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
  </div>
</template>

<script>
import { XDialog, XButton, Group, Cell, Datetime,Scroller } from 'vux'
import {init_list} from '@/api/footprint'
import {dateFtt,config} from '@/utils/base';

export default {
  name: 'callPhone',
  components: {
    XButton,
    XDialog,
    Group,
    Cell,
    Datetime,
    Scroller
  },
  data () {
    return {
      time_slot:'',
      startTIme: '',
      endTime: '',
      datePickerDialog: false,
      pullup_config: {
          content: '加载中...',
          pullUpHeight: 60,
          height: 40,
          autoRefresh: false,
          downContent: '加载中...',
          upContent: '加载中...',
          loadingContent: '加载中...'
      },
      list:[],
      scroller_config:{
          page:1,
          pagesize:10,
          max_page:0,
          isAjax:true,
          total:0,
      },
    }
  },
  methods: {
    changeStartTime () {
    },

    showDateChoose () {
      this.datePickerDialog = true
    },

    sureTime () {
      this.datePickerDialog = false;
      this.time_slot = `${this.startTIme}到${this.endTime}`;
      this.$vux.loading.show({
          text: '加载中...'
      });
      if(this.scroller_config.isAjax){
          this.$refs.scrollerBottom.disablePullup();
          this.list = [];
          this.scroller_config.page = 1;
          this.scroller_config.total = 0;
          this.scroller_config.max_page = 0;
          this.init(this.startTIme,this.endTime,true);
      }

    },

    init(start_time,end_time,isTop){
        this.scroller_config.isAjax = false;
        init_list({
            type:'typeGroup',
            type_id:this.$route.query.type,
            start_time,
            end_time
        }).then((e)=>{
            this.scroller_config.isAjax = true;
            this.$vux.loading.hide();
            if(e.code === 200 && e.data && e.data.rows instanceof Array){
                let list = e.data.rows;
                list.map((val,i)=>{
                    val.ele = config[val.type] ? val.wx_name + config[val.type] : '';
                    val.time = dateFtt("yyyy-MM-dd hh:mm:ss", new Date(val.create_time*1000));
                });

                this.list = this.list.concat(list);
                this.scroller_config.total = e.data.total;
                this.scroller_config.max_page = Math.ceil(e.data.total / 10);
                this.$nextTick(() => {
                    this.$refs.scrollerBottom.donePullup();//上啦完成

                    if(isTop){
                        this.$refs.scrollerBottom.reset({top:0});
                    }
                    else{
                        this.$refs.scrollerBottom.reset();
                    }

                    if(this.scroller_config.max_page <= 1){
                        this.$refs.scrollerBottom.disablePullup();//禁止上啦
                    }
                    else{
                        this.$refs.scrollerBottom.enablePullup();//恢复上啦
                    }

                });


            }
        })
    },

    to_details(item){
        this.$router.push({
            path: '/client',
            query:{
                uid:item.uid
            }
        })
    },

    loadMore(){
        if (this.scroller_config.isAjax && this.scroller_config.page < this.scroller_config.max_page) {
            this.scroller_config.page ++;
            this.init();
        }
        else if(this.scroller_config.page >= this.scroller_config.max_page){
            this.$refs.scrollerBottom.disablePullup() // 禁用上拉
        }

    }
  },
  mounted () {
      this.init();
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
$color: #717171;
.see-card{
  .title{
    position: relative;
    height: 2.2rem;
    padding: 0.5rem 0.3rem;
    h5{
      text-align: center;
      color: $color;
      font-size: 0.28rem;
      font-weight: normal;
    }
    img{
      position: absolute;
      top: 0.5rem;
      right: 0.3rem;
      width: 0.35rem;
    }
    p{
      font-size: 0.4rem;
      color: #f79700;
      text-align: center;
      margin-top: 0.3rem;
    }
  }
  .list{
    li{
      height: 2.5rem;
      padding: 0.2rem 0.3rem;
      padding-bottom: 0.5rem;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      border-radius: 5px;
      p{
        text-align: center;
        font-size: 0.22rem;
        color: $color;
        margin-bottom: 0.2rem;
      }
      img{
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 0.1rem;
        float: left;
      }
      div{
        width: 65%;
        float: left;
        height: 1.2rem;
        line-height: 0.5rem;
        margin-left: 0.2rem;
        padding: 0.1rem 0;
        overflow: hidden;
        font-size: 0.28rem;
        i{
          color: #f79700;
        }
      }
      .icon-right{
        float: right;
        height: 1.2rem;
        fill: #717171;
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
</style>
