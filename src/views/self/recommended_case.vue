<template>
    <div class="recommended_product edit-card">
        <h5 class="pro_title">
            推荐案例
            <span class="fr" @click="gotoProduce">
            案例管理
            <x-icon type="ios-arrow-right" size="14"></x-icon>
        </span>
        </h5>
        <scroller ref="scrollerBottom" :bounce="true" height="-45" lock-x>
        <div class="produce-list one_pro">
            <ul>
                <li v-for="(item, index) in list" :key="index">
                    <img :src="item.case_img" alt="">
                    <span>{{item.case_name}}</span>
                </li>
            </ul>
        </div>
        </scroller>

    </div>
    
</template>

<script>
    import {
        cardRead,
    } from '@/api/card'

    import {
        Scroller,
    } from 'vux'

    import {
        err_Tips,
    } from '@/utils/base'
    export default {
        name: "recommended_product",
        data(){
            return{
                list:[]
            }
        },
        components: {
            Scroller,
        },
        methods:{
            gotoProduce () {
                this.$router.push({
                    path: '/case'
                })
            },

            init(){
                this.$store.commit('app/open_global_dialog');
                cardRead().then((res)=>{
                    this.$store.commit('app/close_global_dialog');
                    if(res.code === 200 && res.data && res.data.goods_case && res.data.goods_case.case && res.data.goods_case.case instanceof Array){
                        this.list = res.data.goods_case.case;
                    }
                    else{
                        err_Tips('列表加载出错！',this)
                    }
                }).catch((err)=>{
                    this.$store.commit('app/close_global_dialog');
                    err_Tips('列表加载出错！',this)
                })
            }
        },
        mounted(){
            this.init();
        }
    }
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
    h5 {
        font-size: 0.33rem;
        color: #353535;
        font-weight: normal;
        font-family: '黑体';
        padding: 0.2rem 0.3rem;
        background: #fff;
        border-bottom: 1px #e5e5e5 solid;
        span {
            color: #5977fe;
            font-size: 0.26rem;
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

</style>