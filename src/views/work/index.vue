<template>
  <div class="work_index">
      <div class="gradient"></div>
      <div class="header">
          <p>昨日关键数据</p>
          <!--<span>（11月07日）</span>-->
          <i @click="open_set">
              <img src="@/assets/icon/w_s.jpg">
          </i>
      </div>
      <scroller height="100%" lock-x ref="scrollerBottom">
          <div class="frame">
              <div class="four">

                  <ul>
                      <li v-for="(val,i) in list" :key="i">
                          <p>{{val.title}}</p>
                          <span>{{val.count}}</span>
                      </li>
                  </ul>
                  <div class="dea_btn">
                      <router-link to="/reportChart">
                          <p>详细数据</p>
                          <x-icon type="ios-arrow-right" class="icon-red" size="20"></x-icon>
                      </router-link>
                  </div>

              </div>

              <div class="body_title">我的应用</div>

              <div class="my_body">
                  <ul>
                      <li>
                          <router-link to="/taskList">
                              <img src="@/assets/icon/w1.jpg">
                              <p>任务列表</p>
                          </router-link>
                      </li>
                      <li>
                          <router-link to="/news">
                              <img src="@/assets/icon/w3.jpg">
                              <p>动态</p>
                          </router-link>
                      </li>
                      <li>
                          <router-link to="/reportChart">
                              <img src="@/assets/icon/w2.jpg">
                              <p>AI报表</p>
                          </router-link>
                      </li>
                      <li>
                        <router-link to="/formList">
                          <img src="@/assets/icon/w4.jpg">
                          <p>客户表单</p>
                        </router-link>
                      </li>

                      <!-- <li>
                          <img src="@/assets/icon/w5.jpg">
                          <p>销售排行</p>
                      </li>
                      <li>
                          <img src="@/assets/icon/w6.jpg">
                          <p>名片日报</p>
                      </li> -->
                  </ul>

              </div>
          </div>



      </scroller>

      <!-- 蒙层 -->
      <div v-transfer-dom>
          <popup v-model="set_isShow">

              <popup-header
                      left-text="取消"
                      right-text="完成"
                      title="设置"
                      :show-bottom-border="false"
                      @on-click-left="choose_cancel"
                      @on-click-right="choose_save"></popup-header>
              <group gutter="0">
                  <div class="work_index_Mongolia">
                      <div class="work_index_click_layer" @click="choose_cancel"></div>
                      <div class="body">

                          <div class="one">
                              <x-switch :title="val.title" v-model="val.select" v-for="(val,i) in tpList" :key="i"></x-switch>
                          </div>

                      </div>
                  </div>


              </group>
          </popup>
      </div>

  </div>
</template>

<script>
import { XSwitch,PopupHeader, Popup,TransferDom ,Group,Scroller} from 'vux'
import { get_list,save} from '@/api/work'
export default {
  name: 'work_index',
    directives: {
        TransferDom
    },
  components: {
      Group,
      PopupHeader,
      Popup,
    XSwitch,
      Scroller
  },
  data () {
    return {
        set_isShow:false,
        tpList:[],
        list:[],

    }
  },
  methods: {
      open_set(){
          this.set_isShow = true
      },
      close_set(){
          this.set_isShow = false
      },
      choose_save(){
          let c_list = [];
          if(this.tpList instanceof Array){
              this.tpList.map((e)=>{
                  if(e.select){
                      c_list.push(e.val)
                  }
              })
          }
          if(c_list.length == 0){
              this.$vux.alert.show({
                  title: '温馨提示',
                  content: '数据类型设置不能为空！',
              })
              return
          }

          const end = c_list.join(',');

          save({
              type:end
          }).then((e)=>{

              if(e.code == 200 && e.msg === '保存成功!'){
                  this.set_isShow = false;
                  this.list_init()
              }
              else{
                  this.$vux.alert.show({
                      title: '温馨提示',
                      content: '保存失败！',
                  })

              }
          }).catch((err)=>{
              this.$vux.alert.show({
                  title: '温馨提示',
                  content: '保存失败！',

              })
          })


      },
      choose_cancel(){
          this.set_isShow = false;
          this.list_init();
      },
      list_init(){
          get_list().then((e)=>{
              if(e.code == 200){
                  if(e.data && e.data.tpList){
                      this.tpList = e.data.tpList;
                  }
                  if(e.data && e.data.list){
                      this.list = e.data.list;
                  }
              }
              else{
                  this.$vux.alert.show({
                      title: '温馨提示',
                      content: '数据返回错误！',
                  })
              }
          }).catch((err)=>{
              this.$vux.alert.show({
                  title: '温馨提示',
                  content: '数据返回错误！',
              })
          })
      }
  },
  watch: {

  },

  mounted () {
    this.list_init();
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.work_index{
    height: 100%;

    overflow-y: auto;
    .frame{
        padding: 0 0.4rem;
        min-height: 10rem;
    }
    .gradient{
        background: -webkit-linear-gradient(#4183ff, #fff);
        background: -moz-linear-gradient(#4183ff, #fff);
        background: linear-gradient(#4183ff, #fff);
        height: 2.5rem;
        width: 100%;
        position:absolute;
        top: 0;
        left: 0;
        z-index: -1;
    }
    .header{
        height:1rem;
        line-height: 1rem;
        overflow: hidden;
        padding: 0 0.4rem;
        p{
            float: left;
            color: #fff;
            font-size: 0.33rem;
            font-family: '黑体';
        }
        span{
            float: left;
            color: #fff;
            font-size: 0.24rem;
            font-family: '黑体';
        }
        i{
            float: right;
            width: 0.8rem;
            line-height: 1rem;
            vertical-align: middle;
            text-align: right;
            img{
                width: 0.4rem;
                height: 0.34rem;
                vertical-align: -0.04rem;
            }
        }
    }
    .four{
        background: #fff;
        width: 100%;
        border-radius: 6px;
        box-shadow:2px 2px 18px 3px #ccc;
        .no_data{
            line-height: 1.5rem;
            text-align: center;
            font-family: '黑体';
            font-size: 0.3rem;
            color: #999;
        }
        ul{
            width: 100%;
            overflow: hidden;
            min-height: 1.5rem;
            li{
                width: 50%;
                float: left;
                text-align:center;
                padding: 0.3rem 0;

                p{
                    font-size: 0.24rem;
                    color: #999999;
                    font-family: '黑体';
                }
                span{
                    display: block;
                    margin-top: 0.16rem;
                    font-size: 0.40rem;
                    color: #333333;
                    font-family: 'Arial';

                }

            }
        }
        .dea_btn{
            height: 0.7rem;
            border-top: 1px #e5e5e5 solid;
            line-height: 0.7rem;
            padding: 0 0.3rem;
            overflow: hidden;
            a{
                display: block;
                width: 100%;
                height: 100%;
            }
            p{
                float: left;
                font-size: 0.24rem;
                color: #3e80f4;
                font-family: '黑体';
            }
            svg{
                float: right;
                margin-top: 0.15rem;
                fill: #999999;
            }
        }
    }
    .body_title{
        font-size: 0.36rem;
        color: #333333;
        font-family: '黑体';
        width: 100%;
        text-align: left;
        margin-top: 0.8rem;
    }
    .my_body{
        ul{
            overflow: hidden;
            li{
                float: left;
                margin-left: 0.4rem;
                margin-top: 0.4rem;
                img{
                   width: 0.97rem;
                   height: 0.97rem;
                }
                p{
                    margin-top: 0.16rem;
                    font-size: 0.26rem;
                    color: #666666;
                    font-family: '黑体';
                    text-align: center;
                }

            }
            li:first-child{
                margin-left: 0;
            }
            li:nth-of-type(6){
                margin-left: 0;
            }
        }

    }


}
.work_index_Mongolia{
    .body{
        width: 100%;
        background: #fff;
        z-index: 999;
        .title{
            height: 0.9rem;
            background: #efefef;
            width: 100%;
            text-align: center;
            line-height:0.9rem;
            font-size: 0.36rem;
            font-family: '黑体';
            color: #353535;
            p{
                line-height:0.9rem;
                font-size: 0.28rem;
                font-family: '黑体';
                float: left;
                width: 1.2rem;
                text-align: center;
                color:#3b63c4;
            }
            i{
                line-height:0.9rem;
                font-size: 0.28rem;
                font-family: '黑体';
                float: right;
                width: 1.2rem;
                text-align: center;
                color:#3b63c4;
            }


        }


    }


}
</style>
