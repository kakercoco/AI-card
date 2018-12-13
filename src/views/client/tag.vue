/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-10 11:50:00
 * @Last Modified by: Jessica
 * @Last Modified time: 2018-10-18 11:32:18
 */
<template>
  <div class="client-tag">
    <div class="clearfix yyf_new_client-tag" v-for="(item, index) in tagList" :key="index"  :class="item.rows && item.rows.length > 0 ? 'class' + item.rows[0].type : ''">
      <h4 class="title">{{item.title}}</h4>
      <ul>
        <li v-for="(e, i) in item.rows" :key="i" :class="{active:e.checked}" @click="swithTag(e.id, e.checked)" class="one">{{e.tag_name}}</li>
      </ul>
    </div>
    <div class="clearfix Other yyf_new_client-tag class1">
      <h4>其他</h4>
      <ul>
        <li v-for="(item, index) in otherTagList" :key="index" :class="{active:item.checked}" @click="swithTag(item.id, item.checked)" class="one">{{item.tag_name}}</li>
        <li class="add_btn"><x-icon type="ios-plus-empty" class="icon-insert" @click.native="openDialog"></x-icon></li>
      </ul>
    </div>

    <div v-transfer-dom>
      <popup v-model="insertTagDialog">

        <popup-header
                left-text="取消"
                right-text="完成"
                title="添加自定义标签"
                :show-bottom-border="false"
                @on-click-left="closeDialog"
                @on-click-right="insert"></popup-header>
        <group gutter="0">
          <div class="my_insert-talk">
            <group>
              <x-input v-model="value" name="tag" :is-type="checkText" placeholder="4个字以内"></x-input>
            </group>
          </div>
        </group>
      </popup>
    </div>



    <!--<p>
      <x-dialog v-model="insertTagDialog" :hide-on-blur="true">
        <div class="insert-dialog">
          <h4>添加自定义标签</h4>
          <group>
            <x-input v-model="value" name="tag" :is-type="checkText" placeholder="4个字以内"></x-input>
          </group>
          <div class="btn">
            <button class="btn-cancle" @click="closeDialog">取消</button>
            <button class="btn-primary" @click="insert">确定</button>
          </div>
        </div>
      </x-dialog>
    </p>-->
  </div>
</template>

<script>
import { XDialog, XInput, Group,Popup,TransferDom,PopupHeader} from 'vux'
import { customerTag } from '@/api/customer'
import { updateCustomerTag, deleteCustomerTag, insertCustomerTag } from '@/api/contact'

export default {
  name: 'clientTag',
    directives: {
        TransferDom
    },
  components: {
    XDialog,
    Group,
    XInput,
      PopupHeader,
      Popup,
  },
  data () {
    return {
      value: '',
      tagList: [],
      otherTagList: [],
      uid: this.$route.query.uid,
      insertTagDialog: false
    }
  },
  methods: {
    checkText: function (value) {
      return {
        valid: value.length <= 4 || value.length === 0,
        msg: '自定义标签长度为1-4'
      }
    },
    getCustomerTag () {
      const data = {
        uid: this.uid
      }
      customerTag(data)
        .then(res => {
          this.tagList = res.data.sys
          this.otherTagList = res.data.other[0]
          console.log(this.otherTagList)
        })
    },
    swithTag (id, status) {
      const data = {
        uid: this.uid,
        tag_id: id
      }
      if (status) {
        deleteCustomerTag(data)
          .then(res => {
            this.getCustomerTag()
          })
      } else {
        updateCustomerTag(data)
          .then(res => {
            this.getCustomerTag()
          })
      }
    },
    insert () {
      const data = {
        uid: this.uid,
        name: this.value
      }
      if (this.value.length > 0 && this.value.length < 5) {
        insertCustomerTag(data)
          .then(res => {
            this.getCustomerTag()
            this.closeDialog()
          })
      } else {
        this.$vux.alert.show({
          title: '提示',
          content: '自定义标签长度为1-4'
        })
      }
    },
    openDialog () {
      this.insertTagDialog = true
      this.value = ''
    },
    closeDialog () {
      this.insertTagDialog = false
    }
  },
  mounted () {
    this.getCustomerTag()
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.client-tag{
  overflow: auto;
  height: 100%;
  -webkit-overflow-scrolling: touch;
  &>div{
    padding: 0.4rem 0.3rem;
    padding-right:0 ;
    border-bottom: 1px solid #eee;
    h4{
      font-size: 0.3rem;
      padding-left: 0.3rem;
      position: relative;
      &::before{
        content: '';
        width: 0.16rem;
        height: 0.16rem;
        background-color: #72c1ff;
        border-radius: 100%;
        position: absolute;
        top: 0.12rem;
        left: 0;
      }
    }
    li{
      margin-top: 0.15rem;
      text-align: center;
      background-color: #f4f4f4;
      float: left;
      margin-right: 0.15rem;
      color: #717171;
      padding: 0.18rem 0.25rem;
      font-family: '黑体';
      font-size: 0.28rem;

      &.active{
        background-color: #3c7df1;
        color: #fff;
      }
      .icon-insert{
        width: 0.5rem;
        height: 0.5rem;
        fill: #717171;
      }
    }
  }
  .insert-dialog{
    padding-bottom: 0.3rem;
    h4{
      font-size: 0.3rem;
      color: #717171;
      margin-top: 0.3rem;
    }
    .btn{
      margin-top: 0.5rem;
    }
  }
}
</style>
