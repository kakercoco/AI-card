/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-04 09:31:33
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-14 16:26:26
 */
<template>
  <div class="insert-tag">
    <p>
      <span>标签名字</span>
      <input type="text" v-model="tagName" placeholder="未填写" maxlength="10" disabled>
    </p>
    <p>
      <span>标签成员</span>
      <a @click="insert">添加成员 <x-icon type="ios-plus-outline" class="insert-icon" size="13"></x-icon></a>
    </p>
    <ul>
      <li  v-for="(item, index) in checkedCustomer " :key="index">
        <img :src="item.wx_image" alt="">
        <span>{{item.wx_name}}</span>
      </li>
    </ul>
    <div class="btn">
      <x-button type="primary" @click.native="save">确定</x-button>
    </div>
    <div class="insert-client" v-if="clientList">
      <ul>
        <li v-for="(item, index) in customer" :key="index">
          <img :src="item.wx_image" alt="">
          <span>{{item.wx_name}}</span>
          <check-icon :value.sync="item.status" class="fr"></check-icon>
        </li>
      </ul>
      <div class="btn">
        <x-button type="primary" @click.native="chooseCustomer">确定</x-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Group, XInput, XButton, CheckIcon } from 'vux'
import { customerList, getCustomerTagEdit, updateCustomerTag } from '@/api/contact'

export default {
  name: 'insertTag',
  components: {
    Group,
    XInput,
    CheckIcon,
    XButton
  },
  data () {
    return {
      tagName: '',
      tag_id: this.$route.query.tag_id, // 编辑的标签id
      clientList: false, // 客户列表是否显示
      checkedCustomer: [], // 选中的客户列表
      customer: [], // 全部的客户列表
      checkedId: [] // 编辑厨师的客户列表id
    }
  },
  methods: {
    getCustomerList () {
      const data = {
        page: 1,
        pagesize: 1000
      }
      customerList(data)
        .then(res => {
          let customerAll = res.data.rows
          for (let i = 0; i < customerAll.length; i++) {
            const element = customerAll[i]
            element.status = false
          }
          this.customer = customerAll
        })
    },
    insert () {
      this.clientList = true
      this.customer.forEach(element => {
        this.checkedId.forEach(e => {
          if (e === element.uid) {
            element.status = true
          }
        })
      })
    },
    chooseCustomer () {
      this.clientList = false
      this.checkedCustomer = []
      this.customer.forEach(element => {
        if (element.status) {
          this.checkedCustomer.push(element)
        }
      })
    },
    customerTagEdit () {
      const data = {
        tag_id: this.tag_id
      }
      getCustomerTagEdit(data)
        .then(res => {
          this.tagName = res.data.tag_name
          this.checkedCustomer = res.data.customer
          this.checkedId = res.data.customer_id
        })
    },
    save () {
      var id = ''
      this.checkedCustomer.forEach(element => {
        id += `${element.uid},`
      })
      const data = {
        uid: id,
        // name: this.tagName,
        tag_id: this.tag_id
      }
      updateCustomerTag(data)
        .then(res => {
          this.$router.push({
            path: '/main/contact'
          })
        })
    }
  },
  mounted () {
    this.getCustomerList()
    this.customerTagEdit()
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
      background-color: #fff;
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
  li{
    height: 1rem;
    line-height: 0.8rem;
    border-bottom: 1px solid #eee;
    padding: 0.1rem 0.3rem;
    img{
      height: 100%;
      width: 0.8rem;
      float: left;
      margin-right: 0.4rem;
    }
    span{
      float: left;
      height: 100%;
      color: #717171;
    }
  }
}
.insert-client{
  position: fixed;
  background: #fff;
  top: 0;
  left: 0;
  height: 100%;
  overflow: auto;
  width: 100%;
  li{
    height: 1rem;
    line-height: 0.8rem;
    border-bottom: 1px solid #eee;
    padding: 0.1rem 0.3rem;
    img{
      height: 100%;
      width: 0.8rem;
      float: left;
      margin-right: 0.4rem;
    }
    span{
      float: left;
      height: 100%;
      color: #717171;
    }
  }
  .btn{
    padding: 0 1rem;
    margin-top: 1rem;
  }
}
</style>
