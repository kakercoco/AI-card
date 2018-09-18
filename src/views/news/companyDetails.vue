<template>
    <div class="companyDetails">

        <div class='title'>
            <p>{{title}}</p>
        </div>

        <div class='company'>
            <p>{{create_time}}</p>
        </div>

        <div class='content contentFrame' v-html="content"></div>
    </div>
</template>

<script>
    import { to_companyDetails } from '@/api/dynamic'
    export default {
        name: "companyDetails",
        data () {
            return {
                title: '',
                content: '',
                create_time:''
            }
        },
        methods:{
            init(){
                if(this.$route.query.id){
                    to_companyDetails({
                        id:this.$route.query.id
                    }).then((e)=>{
                        if(e.code == 200 && e.data && e.data.info){
                            this.title = e.data.info.title;
                            this.content = e.data.info.content;
                            this.create_time = e.data.info.create_time;
                        }
                    })
                }

            }

        },
        mounted () {
            this.init();
        }
    }
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
    .companyDetails{
        padding:20px 10px;
        .title{
            width:100%;
            margin-bottom:0.2rem;
            p{
                width:100%;
                line-height:0.5rem;
                font-size:0.38rem;
                color:#000;
                font-weight:bold;
            }
        }
        .company{
            width:100%;
            margin-bottom:0.3rem;
            font-size:14px;
            color:#576b95;

        }
        .contentFrame{
            

        }
    }


</style>
