
<template>
  <div class="insert-talk">

    <group title="编写话术"  class='bgColor'>
      <x-textarea  v-model="content" :show-counter="true" :max="200" autosize placeholder="请输入内容"></x-textarea>
    </group>

    <div class="tag clearfix">
      <p>添加关键词</p>
      <span v-for="(item, index) in tagList" :key="index">{{item}}<x-icon type="ios-minus" class="icon-delete" @click.native="deleteTag(index)"></x-icon></span>
      <x-icon type="ios-plus-empty" class="icon-insert fl" @click.native="openDialog"></x-icon>
    </div>



    <p class="yyf_new_btn">
      <x-button type="primary" @click.native="save">保存</x-button>
    </p>
    <div v-transfer-dom>
      <popup v-model="tagDialog">

        <popup-header
                left-text="取消"
                right-text="完成"
                title="关键词"
                :show-bottom-border="false"
                @on-click-left="closeDialog"
                @on-click-right="insertTag"></popup-header>
        <group gutter="0">
          <div class="my_insert-talk">
            <group>
              <x-input placeholder="10个字以内" :max="10" v-model="tag"></x-input>
            </group>
          </div>

        </group>
      </popup>
    </div>

  </div>
</template>

<script>
import { Group, XTextarea, XButton, XDialog, XInput, Popup,TransferDom,PopupHeader } from 'vux'
import { talkUpdate, talkEdit } from '@/api/talk'

export default {
  name: 'talkInsert',
  directives: {
      TransferDom
  },
  components: {
    Group,
    XTextarea,
    XDialog,
    XInput,
    XButton,
      PopupHeader,
      Popup,
  },
  data () {
    return {
      content: '',
      tagList: [],
      tag: '',
      infor: {},
      tagDialog: false,
      id: this.$route.query.id,
      groupId: this.$route.query.groupId
    }
  },
  methods: {
    getDetail (id) {
      const data = {
        id: this.id
      }
      talkEdit(data)
        .then(res => {
          this.tagList = res.data.keyword.split(',')
          this.content = res.data.content
        })
    },
    save () {
      if (this.content === '') {
        this.$vux.toast.text('话术内容不能为空', 'top')
        return false
      }
      if (this.tagList.length <= 0) {
        this.$vux.toast.text('关键词不能为空', 'top')
        return false
      }
      const data = {
        group_id: this.groupId,
        id: this.id,
        content: this.content,
        keyword: this.tagList.join(',')
      }
      talkUpdate(data)
        .then(res => {
          this.$router.back(-1)
        })
    },
    openDialog () {
      this.tagDialog = true
      this.tag = ''
    },
    closeDialog () {
      this.tagDialog = false
    },
    insertTag () {
      if (this.tag === '') {
        this.$vux.toast.text('关键词内容不能为空', 'top')
        return false
      }
      this.tagList.push(this.tag)
      this.closeDialog()
    },
    deleteTag (index) {
      this.tagList.splice(index, 1)
    }
  },
  mounted () {
    this.getDetail()
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
  .insert-talk {
    overflow: auto;
    height: 100%;
    background: #f8f8f8;
    .tag {
      // color: #717171;
      color: #999999;
      padding: 0.2rem 0.2rem;
      border-bottom: 1px solid #eee;
      padding-right: 0;
      background: #fff;
      p {
        font-size: 0.24rem;
        font-family: '黑体';
        color: #afafaf;
        margin-bottom: 0.2rem;
        margin-left: 0.2rem;
      }
      span {
        font-size: 0.24rem;
        float: left;
        margin-right: 0.2rem;
        position: relative;
        height: 0.6rem;
        border: 1px solid #ddd;
        padding: 0 0.35rem;
        line-height: 0.6rem;
        margin-bottom: 0.2rem;
        color: #3b63c3;
        background: #ebf1ff;
        .icon-delete {
          fill:#303135;
          width: 0.4rem;
          position: absolute;
          top: -0.2rem;
          right: -0.2rem;
        }
      }
      .icon-insert {
        height: 0.6rem;
        border: 1px solid #ddd;
        width: 1.6rem;
        fill: #717171;
        background: #efefef;
      }
    }
    & /deep/ .weui-cells__title {
      font-size: 0.24rem;
      font-family: '黑体';
      color: #afafaf;
    }
    & /deep/ .bgColor .weui-cells {
      &::after {
        border: none;
      }
      &::before {
        border: none;
      }
      .weui-cell__bd {
        border: 1px solid #eee;
        background: #fbfbfb;
        padding: 10px;
        padding-bottom: 0;
      }
      textarea {
        font-size: 0.3rem;
        color: #353535;
        background: #fbfbfb;
      }
    }
    .btn {
      margin-top: 1rem;
      padding: 0 1rem;
    }
  }
  .dialog-tag {
    padding: 0.3rem;
    h5 {
      font-size: 0.32rem;
      color: #717171;
      margin-bottom: 0.3rem;
    }
    p {
      margin-top: 0.3rem;
      button {
        margin-right: 0.2rem;
        height: 0.6rem;
        width: 1.8rem;
        border-radius: 0.6rem;
        border: none;
        outline: none;
        font-size: 0.32rem;
        &:first-child {
          background: #fff;
          border: 1px solid #ddd;
          color: #717171;
        }
        &:last-child {
          background: #5977fe;
          color: #fff;
        }
      }
    }
    & /deep/ .weui-cells__title {
      font-size: 0.32rem;
    }
    & /deep/ .weui-cells {
      &::after {
        border: none;
      }
      &::before {
        border: none;
      }
      .weui-cell__bd {
        background: #fbfbfb;
        padding: 10px 0;
      }
      input {
        font-size: 0.3rem;
        color: #717171;
      }
    }
  }
  .bgColor{
    padding-bottom: 0.2rem;
    padding-top: 0.2rem;
    border-bottom: 1px #e5e5e5 solid;
    background: #fff;
  }
</style>
