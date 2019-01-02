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
        <li v-for="(e, i) in item.rows" :key="i" :class="{active:e.checked}" @click="swithTag(e,item.rows,'sys')" class="one">{{e.tag_name}}</li>
      </ul>
    </div>
    <div class="clearfix Other yyf_new_client-tag class1">
      <h4>
        其他
        <span class="other_edit" @click="isEdit = !isEdit">编辑</span>
      </h4>
      <ul>
        <li v-for="(item, index) in otherTagList" :key="index" :class="{active:item.checked}" @click="swithTag(item,otherTagList)" class="one custom_one">
          {{item.tag_name}}
          <i class="yyf_new_jian" @click.stop="delete_Label(item,index)" v-if="isEdit">-</i>
          <!--<x-icon type="ios-minus" size="30" @click.stop="delete_Label(item,index)"></x-icon>-->
        </li>
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
import { err_Tips } from '@/utils/base'
import { updateCustomerTag, deleteCustomerTag, insertCustomerTag ,del_label } from '@/api/contact'


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
      insertTagDialog: false,
      isEdit:false,
      tag_isChange:true
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
      this.$store.commit('app/open_global_dialog');
      const data = {
        uid: this.uid
      }
      customerTag(data)
        .then(res => {
          this.$store.commit('app/close_global_dialog');
            this.tagList = res.data.sys
          this.otherTagList = res.data.other[0]
        }).catch((err)=>{
          this.$store.commit('app/close_global_dialog');
      })
    },
    swithTag (item,arr,type) {
      if(!this.tag_isChange) return;
      this.tag_isChange = false;//关闭开关
      const id = item.id;
      const status = item.checked;
      let list = arr

      const data = {
        uid: this.uid,
        tag_id: id
      }

      if (status) {
        item.checked = false;//前端先改变效果
        deleteCustomerTag(data).then(res => {
            this.tag_isChange = true;//请求结束，打开开关
            //如果请求失败，则重新加载列表
            if(res.msg != '删除成功'){
                err_Tips('取消失败！',this);
                this.getCustomerTag()
            }

          }).catch((err)=>{
            this.tag_isChange = true;//请求结束，打开开关
                err_Tips('取消失败！',this);
                this.getCustomerTag()
          })
      } else {
          //系统标签，先清除所有选中
          if(type === 'sys'){
              list.map((val)=>{
                  if(val.checked){
                      val.checked = false
                  }
              })
          }

        item.checked = true;
        updateCustomerTag(data)
          .then(res => {
              this.tag_isChange = true;//请求结束，打开开关
              if(res.msg != '修改成功!'){
                  err_Tips('选择失败！',this);
                  this.getCustomerTag()
              }
          }).catch((err)=>{
            this.tag_isChange = true;//请求结束，打开开关
            err_Tips('选择失败！',this);
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
    },
    delete_Label(item,index){
        const id = item.id;
        const that = this;
        if(id){
            this.$vux.confirm.show({
                title: '温馨提示',
                content: '是否删除该标签?',
                onConfirm  () {
                    that.$store.commit('app/open_global_dialog');
                    del_label({id}).then((res)=>{
                        that.$store.commit('app/close_global_dialog');
                        if(res.code === 200 && res.msg === '删除成功'){
                            that.otherTagList.splice(index,1)
                        }
                        else{
                            err_Tips('删除失败',that)
                        }
                    }).catch((err)=>{
                        that.$store.commit('app/close_global_dialog');
                        err_Tips('删除失败',that)
                    })
                },
            })

        }
        else{
            err_Tips('缺少id，不允许删除！',that)
        }


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
