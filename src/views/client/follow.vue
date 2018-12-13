/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-08 17:56:28
 * @Last Modified by: Jessica
 * @Last Modified time: 2018-10-17 16:26:32
 */
<template>
  <div class="follow">
    <group class="header">
      <popup-radio title="选择跟进常用语" :options="options" @on-hide="hide" v-model="option" v-if="Renderer">
      </popup-radio>
    </group>
    <group title="跟进描述" class="body">
      <x-textarea placeholder="输入文字" v-model="value" autosize :rows="4" :max="120"></x-textarea>
    </group>
    <p class="yyf_new_btn" style="background: transparent">
      <x-button type="primary" @click.native="save">确定</x-button>
    </p>
  </div>
</template>

<script>
import { Group, PopupRadio, XTextarea, XButton } from 'vux'
import { followCreate, followSave } from '@/api/customer'

export default {
  name: 'clientFollow',
  components: {
    Group,
    PopupRadio,
    XTextarea,
    XButton
  },
  data () {
    return {
      option: '',
      value: '',
      id: this.$route.query.id,
      options: ['标记一下，可以有合作意向'],
      Renderer: true
    }
  },
  methods: {
    hide () {
      this.value = this.value + this.option
      this.Renderer = false
      this.option = ''
      this.$nextTick(() => {
        this.Renderer = true
      })
    },
    getFollowCreate () {
      followCreate().then(res => {
        this.options = res.data
      })
    },
    save () {
      const data = {
        customer_id: this.id,
        content: this.value
      }
      followSave(data).then(res => {
        this.$router.back(-1)
      })
    }
  },
  mounted () {
    this.getFollowCreate()
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.follow {
  overflow: auto;
  height: 100%;
  -webkit-overflow-scrolling: touch;
    background: #f8f8f8;
  & /deep/ .weui-cells {
    margin-top: 0 !important;
    &::before {
      border: none;
    }
    .vux-label {
      font-size: 0.32rem;
      color: #5977fe;
      font-weight: normal;
    }
    .vux-cell-value {
      display: none;
    }
    .weui-textarea {
      font-size: 0.28rem;
      color: #717171;
    }
  }
    .header{
         background:#f8f8f8;
         .weui-cell{
             background:#f8f8f8;
         }
     }
    .body{
        background: #fff;
        padding-top: 0.24rem;
    }
  .btn {
    margin-top: 1rem;
    padding: 0 1rem;
  }
}
</style>
