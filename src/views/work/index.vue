<template>
  <div class="work_index">
      <div class="gradient"></div>

      <div class="header">
        <p>昨日关键数据</p>
        <span>（11月07日）</span>
        <i>
            <img src="@/assets/icon/w_s.jpg">
        </i>
      </div>

      <div class="four">
        <ul>
            <li>
                <p>活跃客户</p>
                <span>222</span>
            </li>
            <li>
                <p>新增客户</p>
                <span>222</span>
            </li>
            <li>
                <p>名片浏览</p>
                <span>222</span>
            </li>
            <li>
                <p>被转发次数</p>
                <span>222</span>
            </li>
        </ul>
        <div class="dea_btn">
            <p>详细数据</p>
            <x-icon type="ios-arrow-right" class="icon-red" size="20"></x-icon>
        </div>

      </div>

      <div class="body_title">我的应用</div>

      <div class="my_body">
          <ul>
              <li>
                  <img src="@/assets/icon/w1.jpg">
                  <p>任务列表</p>
              </li>
              <li>
                  <img src="@/assets/icon/w3.jpg">
                  <p>动态</p>
              </li>
              <li>
                  <img src="@/assets/icon/w4.jpg">
                  <p>客户表单</p>
              </li>
              <!-- <li>
                  <img src="@/assets/icon/w2.jpg">
                  <p>AI报表</p>
              </li>
              <li>
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
</template>

<script>

export default {
  name: 'work_index',
  components: {

  },
  data () {
    return {

    }
  },
  methods: {

  },
  watch: {

  },

  mounted () {

  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.work_index{
    height: 100%;
    padding: 0 0.4rem;
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
            width: 0.6rem;
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
        ul{
            width: 100%;
            overflow: hidden;
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

</style>
