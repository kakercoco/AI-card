<template>
    <div class="editList">
        <p style="height: 0.4rem;"></p>
        <ul>
            <li>
                <router-link to="/editCard">
                    <img src="@/assets/icon/card_edit_03.jpg">
                    <p>名片信息编辑</p>
                    <x-icon type="ios-arrow-right" size="22"></x-icon>
                </router-link>
            </li>
            <li>
                <router-link to="/recommended_product">
                    <img src="@/assets/icon/card_edit_08.jpg" alt="">
                    <p>推荐产品</p>
                    <x-icon type="ios-arrow-right" size="22"></x-icon>
                </router-link>
            </li>
            <li>
                <router-link to="/recommended_case">
                    <img src="@/assets/icon/card_edit_10.jpg" alt="">
                    <p>推荐案例</p>
                    <x-icon type="ios-arrow-right" size="22"></x-icon>
                </router-link>
            </li>
            <li>
                <router-link to="/personal_label">
                    <img src="@/assets/icon/card_edit_06.jpg" alt="">
                    <p>个人标签编辑</p>
                    <x-icon type="ios-arrow-right" size="22"></x-icon>
                </router-link>
            </li>
        </ul>

    </div>
</template>

<script>
    export default {
        name: "edit_list"
    }
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
    .editList{
        height: 100%;
        background:#f8f8f8;
        ul{
            border-top: 1px #e5e5e5 solid;
            li{
                background: #fff;
                overflow: hidden;
                border-bottom: 1px #e5e5e5 solid;
                padding: 0.3rem 0.4rem;
                height: 1.2rem;
                a{
                    display: block;
                    width: 100%;
                    height: 100%;
                }
                img{
                    height: 0.6rem;
                    width: 0.6rem;
                    float: left;
                }
                p{
                    float: left;
                    height: 0.6rem;
                    line-height: 0.6rem;
                    margin-left: 0.3rem;
                    font-family: '黑体';
                    font-size: 0.33rem;
                    color: #353535;
                }
                svg{
                    float: right;
                    fill: #999999;
                    margin-top: 0.08rem;
                }
            }

        }
    }

</style>