<template>
    <div>
        <div v-for="(item,i) in content" :key="i">
            <div class="emojiTpl">
                <span v-for="(citem,ci) in item" :key="ci" v-if="citem.txt != ''" class="text_frame">
                    <pre v-if="citem.node == 'text' && citem.txt != ''" class="text">{{citem.txt}}</pre>
                    <!--<img v-if="citem.node == 'element' && citem.tag == 'emoji'" :class="[citem.baseClass,citem.txt]">-->
                    <i v-if="citem.node == 'element' && citem.tag == 'emoji'" :class="[citem.baseClass,citem.txt]"></i>
                </span>

            </div>
        </div>
    </div>

</template>

<script>
export default {
  name: 'tpl',
  props: {
    content: {
      type: Array,
      default: []
    }
  }

}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
    .emojiTpl{
        display: block;
        overflow: hidden;
        .text_frame{
            line-height:29px;
            /*float: left;*/
            min-height:0.58rem;
            line-height:29px;

            .text{
                font-size:16px;
                line-height:20px;
                word-wrap: break-word;
                word-break: break-all;
                display: inline;
                whitewhite-space:pre-wrap; /* css-3 */
                whitewhite-space:-moz-pre-wrap; /* Mozilla, since 1999 */
                whitewhite-space:-pre-wrap; /* Opera 4-6 */
                whitewhite-space:-o-pre-wrap; /* Opera 7 */
                word-wrap:break-word; /* Internet Explorer 5.5+ */
                white-space: pre-wrap; /* Firefox */
            }
        }

    }

</style>
