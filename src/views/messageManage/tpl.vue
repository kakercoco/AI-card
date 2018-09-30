<template>
    <div>
        <div v-for="(item,i) in content" :key="i">
            <div class="emojiTpl">
                <span v-for="(citem,ci) in item" :key="ci" v-if="citem.txt != ''" class="text_frame">
                    <i v-if="citem.node == 'text' && citem.txt != ''" class="text">{{citem.txt}}</i>
                    <i v-if="citem.node == 'element' && citem.tag == 'emoji'" :class="[citem.baseClass,citem.txt]"></i>
                </span>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "tpl",
        props:{
            content:{
                type:Array,
                default:[],
            },
        }

    }
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
    .emojiTpl{
        display: block;
        overflow: hidden;
        .text_frame{
            line-height:29px;
            float: left;
            min-height:0.58rem;
            line-height:29px;

            .text{
                font-size:14px;
                line-height:29px;
            }
        }

    }


</style>