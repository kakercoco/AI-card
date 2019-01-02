<template>
    <div class="personal_label">
        <h5 class="pro_title">
            我的标签

        </h5>

        <ul>
            <li v-for="(item, index) in list" :key="index">
                {{item.tag_name}}
                <i type="ios-minus" class="icon-delete yyf_new_jian" @click="removeTag(index,item.id)">-</i>
            </li>
            <li class="add">
                <x-icon type="ios-plus-empty" class="icon-insert" @click.native="openTagDialog" ></x-icon>
            </li>
        </ul>
        <div v-transfer-dom>
            <popup v-model="insertTagDialog">

                <popup-header
                        left-text="取消"
                        right-text="完成"
                        title="添加自定义标签"
                        :show-bottom-border="false"
                        @on-click-left="closeTagDialog"
                        @on-click-right="insertTag"></popup-header>
                <group gutter="0">
                    <div class="my_insert-talk">
                        <group>
                            <x-input placeholder="10个字以内" :max="10" v-model="tagKeyword"></x-input>
                        </group>
                    </div>
                </group>
            </popup>
        </div>

    </div>
    
</template>

<script>
    import {
        cardRead,
        cardTagDelete,
        cardTagInsert,

    } from '@/api/card'

    import {
        Popup,TransferDom,PopupHeader,Group,XInput,
    } from 'vux'

    import {
        err_Tips,
    } from '@/utils/base'
    export default {
        name: "recommended_product",
        data(){
            return{
                list:[],
                insertTagDialog:false,
                tagKeyword: '', // 新增的标签内容
            }
        },
        directives: {
            TransferDom
        },
        components: {
            PopupHeader,
            Popup,
            Group,
            XInput,
        },
        methods:{
            init(){
                this.$store.commit('app/open_global_dialog');
                cardRead().then((res)=>{
                    this.$store.commit('app/close_global_dialog');
                    if(res.code === 200 && res.data && res.data.tag && res.data.tag instanceof Array){
                        this.list = res.data.tag;
                    }
                    else{
                        err_Tips('标签加载出错！',this)
                    }
                }).catch((err)=>{
                    this.$store.commit('app/close_global_dialog');
                    err_Tips('列表加载出错！',this)
                })
            },
            openTagDialog () {
                this.insertTagDialog = true
                this.tagKeyword = ''
            },
            removeTag (index, id) {
                const that = this;
                this.$vux.confirm.show({
                    title: '温馨提示',
                    content: '是否删除该标签?',
                    onConfirm  () {
                        that.$store.commit('app/open_global_dialog');
                        const data = {
                            tag_id: id
                        };
                        cardTagDelete(data).then(res => {
                            that.$store.commit('app/close_global_dialog');
                            if(res.code === 200 && res.msg==='删除成功'){
                                that.list.splice(index, 1);
                            }
                            else{
                                err_Tips('删除失败！',this)
                            }

                        }).catch((err)=>{
                            that.$store.commit('app/close_global_dialog');
                        })

                    },
                })


            },
            closeTagDialog () {
                this.insertTagDialog = false
            },
            insertTag () {
                if (this.tagKeyword !== '') {
                    const data = {
                        tag: this.tagKeyword
                    }
                    this.closeTagDialog()
                    this.$store.commit('app/open_global_dialog');
                    cardTagInsert(data).then(res => {
                        this.$store.commit('app/close_global_dialog');
                        this.list.push({
                            tag_name: this.tagKeyword,
                            id: res.data.card_tag_id
                        })
                    }).catch((err)=>{
                        this.$store.commit('app/close_global_dialog');
                    })
                } else {
                    this.$vux.alert.show({
                        title: '温馨提示',
                        content: '内容不能为空!',
                    })

                }
            },
        },
        mounted(){
            this.init();
        }
    }
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
    .personal_label{

        overflow: hidden;
        h5 {
            font-size: 0.33rem;
            color: #353535;
            font-weight: normal;
            font-family: '黑体';
            padding: 0.2rem 0.3rem;
            background: #fff;
            border-bottom: 1px #e5e5e5 solid;
        }
        ul{
            padding: 0.05rem 0.3rem;
            padding-right: 0;
            overflow: hidden;
            li{

                position: relative;
                background: #ebf1ff;
                color: #3b63c2;
                margin-top: 0.15rem;
                text-align: center;
                float: left;
                margin-right: 0.15rem;
                padding: 0rem 0.25rem;
                font-family: '黑体';
                font-size: 0.28rem;
                height: 0.68rem;
                line-height: 0.68rem;

            }
            .add{
                margin-top: 0.15rem;
                text-align: center;
                background-color: #f4f4f4;
                float: left;
                margin-right: 0.15rem;
                color: #717171;
                padding: 0rem 0.25rem;
                font-family: '\9ED1\4F53';
                font-size: 0.28rem;
                padding-top: 0 !important;
                padding-bottom: 0 !important;
                height: 0.68rem;
                svg{
                    width: 0.5rem;
                    height: 0.5rem;
                    fill: #717171;
                    margin-top: 0.1rem;
                }
            }
        }

    }

</style>