/*
 * @Author: kaker.xutianxing
 * @Date: 2018-09-04 09:31:33
 * @Last Modified by: Jessica
 * @Last Modified time: 2018-10-18 11:31:20
 */
<template>
  <div class="insert-tag tag_list">
    <div class="name">
      <span>标签名字</span>
      <input type="text" v-model="tagName" placeholder="未填写" maxlength="10" disabled>
    </div>
    <p class="add_member">
      <a @click="insert">
        <x-icon type="ios-plus-outline" class="insert-icon" size="13"></x-icon>
        添加成员
      </a>
    </p>
    <ul class="customer_list index_list">
      <li v-for="(item, index) in checkedCustomer " :key="index">
        <img :src="item.wx_image" alt="">
        <span>{{item.re_name ? item.re_name : item.wx_name}}</span>
      </li>
    </ul>
    <div class="btn new_btn">
      <x-button type="primary" @click.native="save">确定</x-button>
    </div>

    <!--客户选择-->
    <div v-transfer-dom>
      <popup v-model="clientList">

        <popup-header
                left-text="取消"
                right-text="完成"
                title="选择客户"
                :show-bottom-border="false"
                @on-click-left="clientList=false"
                @on-click-right="chooseCustomer"></popup-header>
        <group gutter="0">
          <div class="insert-client my_insert-client">
            <ul class="customer_list">
              <li v-for="(item, index) in customer" :key="index">
                <img :src="item.wx_image" alt="">
                <span>{{item.re_name ? item.re_name : item.wx_name}}</span>
                <check-icon :value.sync="item.status" class="fr"></check-icon>
              </li>
            </ul>

          </div>

        </group>
      </popup>
    </div>

    <!--<div class="insert-client" v-if="clientList">
      <ul class="customer_list">
        <li v-for="(item, index) in customer" :key="index">
          <img :src="item.wx_image" alt="">
          <span>{{item.wx_name}}</span>
          <check-icon :value.sync="item.status" class="fr"></check-icon>
        </li>
      </ul>
      <div class="btn">
        <x-button type="primary" @click.native="chooseCustomer">确定</x-button>
      </div>
    </div>-->

  </div>
</template>

<script>
import { Group, XInput, XButton, CheckIcon,PopupHeader, Popup,TransferDom} from 'vux'
import { setCookie } from '@/utils/auth'
import {
  customerList,
  getCustomerTagEdit,
  updateCustomerTag
} from '@/api/contact'

export default {
  name: 'insertTag',
    directives: {
        TransferDom
    },
  components: {
      PopupHeader,
      Popup,
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
      checkedId: [] // 编辑厨师的客户列表id,
    }
  },
  methods: {
    getCustomerList () {
      const data = {
        page: 1,
        pagesize: 1000
      }
      customerList(data).then(res => {
        let customerAll = res.data.rows
        for (let i = 0; i < customerAll.length; i++) {
          const element = customerAll[i]
          element.status = false
        }
        this.customer = customerAll
      })
    },

      //打开选择客户的框
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

    //选择客户确定
    chooseCustomer () {
      this.clientList = false
      this.checkedCustomer = []
        this.checkedId = [];
      this.customer.forEach(element => {
        if (element.status) {
          this.checkedCustomer.push(element);
            this.checkedId.push(element.id);//选中的客户变了，就要重新生成一遍选中数组
        }
      })
    },
    customerTagEdit () {
      const data = {
        tag_id: this.tag_id
      }
      getCustomerTagEdit(data).then(res => {
        this.tagName = res.data.tag_name
        this.checkedCustomer = res.data.customer
        this.checkedCustomer.forEach(element => {
          element.uid = element.id
        })
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
      if (id === '') {
        this.checkedCustomer = []
        this.$vux.alert.show({
          title: '提示',
          content: '请选择标签成员'
        })
      } else {
        updateCustomerTag(data).then(res => {
          this.$router.back(-1)
        })
      }
    }
  },
  mounted () {
    setCookie('editTag', 'true')
    this.getCustomerList()
    this.customerTagEdit()
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.insert-tag {
  & > p {
    border-bottom: 1px solid #eee;
    height: 1rem;
    line-height: 1rem;
    span {
      width: 2.5rem;
      display: inline-block;
      text-align: center;
      font-size: 0.32rem;
      font-weight: bold;
    }
    input {
      height: 0.9rem;
      width: calc(100% - 2.8rem);
      border: none;
      outline: none;
      background-color: #fff;
      font-size: 0.3rem;
    }
    a {
      color: #5977fe;
      .insert-icon {
        fill: #5977fe;
      }
    }
  }

  li {
    height: 1.2rem;
    line-height: 0.8rem;
    border-bottom: 1px solid #eee;
    padding: 0.2rem 0;
    img {
      height: 100%;
      width: 0.8rem;
      float: left;
      margin-right: 0.4rem;
      border-radius: 3px;
    }
    span {
      float: left;
      height: 100%;
      color: #717171;
    }
  }
}
.insert-client {
  position: fixed;
  background: #fff;
  top: 0;
  left: 0;
  height: 100%;
  overflow: auto;
  width: 100%;
  li {
    height: 1.2rem;
    line-height: 0.8rem;
    border-bottom: 1px solid #eee;
    padding: 0.2rem 0.3rem;
    img {
      height: 100%;
      width: 0.8rem;
      float: left;
      margin-right: 0.4rem;
    }
    span {
      float: left;
      height: 100%;
      color: #717171;
    }
  }
}
</style>
