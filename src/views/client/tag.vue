/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-10 11:50:00
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-10 20:39:23
 */
<template>
  <div class="client-tag">
    <div class="clearfix" v-for="e in 5" :key="e">
      <h4>客户级别</h4>
      <ul>
        <li v-for="(item, index) in 8" :key="item" :class="{active: index ===0}">潜在客户</li>
      </ul>
    </div>
    <div class="clearfix">
      <h4>其他</h4>
      <ul>
        <li>我的</li>
        <li><x-icon type="ios-plus-empty" class="icon-insert" @click.native="insertTagDialog = true"></x-icon></li>
      </ul>
    </div>
    <p>
      <x-dialog v-model="insertTagDialog" :hide-on-blur="true">
        <div class="insert-dialog">
          <h4>添加自定义标签</h4>
          <group>
            <x-input v-model="value"></x-input>
          </group>
          <p class="btn">
            <button class="btn-cancle" @click="insertTagDialog = false">取消</button>
            <button class="btn-primary">确定</button>
          </p>
        </div>
      </x-dialog>
    </p>
  </div>
</template>

<script>
import { XDialog, XInput, Group } from 'vux'

export default {
  name: 'clientTag',
  components: {
    XDialog,
    Group,
    XInput
  },
  data () {
    return {
      value: '',
      insertTagDialog: false
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.client-tag{
  overflow: auto;
  height: 100%;
  &>div{
    padding: 0.4rem 0.3rem;
    border-bottom: 1px solid #eee;
    h4{
      font-size: 0.3rem;
      padding-left: 0.4rem;
      position: relative;
      &::before{
        content: '';
        width: 0.22rem;
        height: 0.22rem;
        background-color: #72c1ff;
        border-radius: 50%;
        position: absolute;
        top: 0.1rem;
        left: 0;
      }
    }
    li{
      margin-top: 0.4rem;
      height: 0.5rem;
      border-radius: 0.5rem;
      line-height: 0.5rem;
      width: 1.4rem;
      text-align: center;
      background-color: #f4f4f4;
      float: left;
      margin-right: 0.4rem;
      color: #717171;
      &:nth-of-type(4n){
        margin-right: 0;
      }
      &.active{
        background-color: #72c1ff;
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
