/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-04 09:31:33
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-04 10:16:32
 */
<template>
  <div class="insert-tag">
    <p>
      <span>标签名字</span>
      <input type="text" v-model="value" placeholder="未填写">
    </p>
    <p>
      <span>标签成员</span>
      <a @click="gotoInsertClient">添加成员 <x-icon type="ios-plus-outline" class="insert-icon" size="13"></x-icon></a>
    </p>
    <div class="btn">
      <x-button type="primary">确定</x-button>
    </div>
  </div>
</template>

<script>
import { Group, XInput, XButton } from 'vux'

export default {
  name: 'insertTag',
  components: {
    Group,
    XInput,
    XButton
  },
  data () {
    return {
      value: ''
    }
  },
  methods: {
    gotoInsertClient () {
      this.$router.push({
        path: '/insertClient'
      })
    }
  },
  mounted () {
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.insert-tag{
  &>P{
    border-bottom: 1px solid #eee;
    height: 1rem;
    line-height: 1rem;
    span{
      width: 2.5rem;
      display: inline-block;
      text-align: center;
      font-size: 0.32rem;
      font-weight: bold;
    }
    input{
      height: 0.9rem;
      width: calc(100% - 2.8rem);
      border: none;
      outline: none;
    }
    a{
      color: #5977fe;
      .insert-icon{
        fill: #5977fe;
      }
    }
  }
  .btn{
    padding: 0 1rem;
    margin-top: 1rem;
  }
}
</style>
