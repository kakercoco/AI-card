/*
 * @Author: kaker.xutianxing
 * @Date: 2018-08-28 17:26:07
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-29 14:19:17
 */
<template>
  <div class="contact">
    <router-view></router-view>
    <div style="height: 44px;">
      <search  v-model="customerForm.keyword" auto-fixed  ref="search" @on-change="searchCustomerList"></search>
    </div>
    <tab :line-width="2" v-model="tabIndex">
      <tab-item>所有客户</tab-item>
      <tab-item>客户标签</tab-item>
    </tab>
    <div v-show="tabIndex === 0" class="contact-first">
      <p >客户人数共{{customerTotal}}人
        <span class="fr">
          <!-- <x-icon type="ios-arrow-down" size="20" class="fr ml-20"></x-icon> -->
          <popup-radio :options="options" v-model="option" class="fr"></popup-radio>
        </span>
      </p>
      <scroller lock-x use-pullup  @on-pullup-loading="loadMore" ref="scrollerBottom" :pullup-config="config"  v-model="scrollerStatus" :bounce="true" height="-250" >
        <div class="contact-list-wrap" id="contact-list-wrap">
          <ul>
            <li class="card-shadow" v-for="(item, index) in customerAll " :key="index" @click="gotoClient(item.uid)">
              <img :src="item.wx_image" alt="">
              <div>
                <p>{{item.wx_name}}</p>
                <p>{{item.describe}}</p>
              </div>
              <span>
                <i>跟进时间</i>
                <i>{{item.date}}</i>
              </span>
            </li>
          </ul>
        </div>
      </scroller>
    </div>
    <div v-show="tabIndex === 1" class="contact-tag">
      <ul>
        <li class="card-shadow" v-for="(item, index) in tagList" :key="index">
          <p class="nav" >
            <span>{{item.tag_name}}({{item.count}})</span>
            <x-icon type="ios-arrow-down" size="20" v-if="!item.status" class="fr" style="fill: #717171;" @click.native="showDetail(index)"></x-icon>
            <span class="fr" v-else @click="gotoUpdateTag(item.id)">添加用户 <x-icon type="ios-plus-outline" class="insert-icon" size="13"></x-icon></span>
          </p>
          <div v-if="item.status" class="client-list " v-for="(element, i) in item.customer" :key="i" @click="gotoClient(element.uid)">
            <img :src="element.wx_image" alt="">
            <div>
              <x-icon type="ios-minus" size="14" class="delete-icon" @click.native.stop="deleteCustomerTag(element.tag_id, element.id, index, i)"></x-icon>
              <p>{{element.wx_name}}</p>
              <p>{{element.describe}}</p>
            </div>
            <span>
              <i>跟进时间</i>
              <!-- <i>{{element.date}}</i> -->
            </span>
          </div>
          <p class="tar arrow-up" @click="showDetail(index)" v-if="item.status"><x-icon type="ios-arrow-up" size="20" ></x-icon></p>
        </li>
      </ul>
      <p class="tac insert-tag" @click="gotoInsertTag">添加新标签 <x-icon type="ios-plus-outline" class="insert-icon" size="13"></x-icon></p>
    </div>
  </div>
</template>

<script>
import { Tab, TabItem, Search, PopupRadio, Scroller, LoadMore } from 'vux'
import { customerList, customerTagList, deleteCustomerTag } from '@/api/contact'

export default {
  name: 'contact',
  components: {
    Tab,
    TabItem,
    Search,
    PopupRadio,
    LoadMore,
    Scroller
  },
  data () {
    return {
      value: '',
      tabIndex: 0,
      onFetching: false,
      isFlag: false, // 上拉加载是否停止
      customerForm: {
        page: 1,
        pagesize: 10,
        keyword: '',
        type: 1
      },
      config: {
        content: '请上拉刷新数据',
        pullUpHeight: 60,
        height: 40,
        autoRefresh: false,
        downContent: '请上拉刷新数据',
        upContent: '请上拉刷新数据',
        loadingContent: '加载中...'
      },
      scrollerStatus: {
        pullupStatus: 'default'
      },
      customerAll: [],
      customerTotal: 0,
      option: '成交率',
      options: ['成交率', '最后跟进时间', '转发', '扫码', '工作交接'],
      tagList: []
    }
  },
  methods: {
    getSearchType () {
      if (this.option === '成交率') {
        this.customerForm.type = 1
      } else if (this.option === '最后跟进时间') {
        this.customerForm.type = 2
      } else if (this.option === '工作交接') {
        this.customerForm.type = 3
      } else if (this.option === '扫码') {
        this.customerForm.type = 4
      } else if (this.option === '转发') {
        this.customerForm.type = 5
      }
    },
    getCustomerList () {
      customerList(this.customerForm)
        .then(res => {
          this.customerAll = res.data.rows
          this.customerTotal = res.data.total
        })
    },
    getCustomerTagList () {
      customerTagList()
        .then(res => {
          if (res.data.length <= 0) {
            return false
          }
          const tagList = res.data[0].rows
          tagList.forEach(element => {
            element.status = false
          })
          this.tagList = tagList
        })
    },
    deleteCustomerTag (tagId, uid, index, i) {
      const data = {
        tag_id: tagId,
        uid: uid
      }
      deleteCustomerTag(data)
        .then(res => {
          this.tagList[index].customer.splice(i, 1)
          this.tagList[index].count--
        })
    },
    searchCustomerList () {
      this.getSearchType()
      document.getElementsByClassName('xs-container')[0].style.transform = 'translateX(0px) translateY(0px) translateZ(0px) scale(1, 1)'
      this.onFetching = false
      this.customerForm.page = 1
      this.customerForm.pagesize = 10
      this.customerAll = []
      if (this.isFlag) {
        this.$refs.scrollerBottom.enablePullup()
      }
      this.getCustomerList()
    },
    showDetail (index) {
      this.tagList[index].status = !this.tagList[index].status
    },
    gotoInsertTag () {
      this.$router.push({
        path: '/insertTag'
      })
    },
    gotoUpdateTag (id) {
      this.$router.push({
        path: '/updateTag',
        query: {
          tag_id: id
        }
      })
    },
    gotoClient (uid) {
      this.$router.push({
        path: '/client',
        query: {
          uid
        }
      })
    },
    loadMore () {
      if (this.onFetching) {
        // do nothing
      } else {
        this.onFetching = true
        this.customerForm.page += 1
        customerList(this.customerForm)
          .then(res => {
            if (res.data.rows.length === 0) {
              this.isFlag = true
              this.$refs.scrollerBottom.disablePullup() // 禁用上拉
              return false
            }
            this.customerAll = this.customerAll.concat(res.data.rows)
            this.$nextTick(() => {
              this.$refs.scrollerBottom.donePullup()
              this.$refs.scrollerBottom.reset()
            })
            this.onFetching = false
          })
      }
    }
  },
  watch: {
    option (val) {
      this.searchCustomerList()
    }
  },
  mounted () {
    this.getCustomerList()
    this.getCustomerTagList()
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.contact{
  height: 100%;
  overflow: auto;
  & /deep/ .weui-search-bar__label{
    .weui-icon-search{
      margin-top: 5px;
      & + span{
        margin-top: 5px;
      }
    }
  }
  .contact-first{
    &>p{
      padding: 0.3rem;
      margin: 0.3rem 0;
      font-size: 0.26rem;
      color: #717171;
      .vux-x-icon{
        fill: #717171;
      }
      & /deep/ .weui-cell{
        padding: 0;
        height: 0.4rem;
        .vux-cell-value{
          margin-right: 0.2rem;
        }
        .weui-cell__ft::after{
          // display: none;
          transform: rotate(135deg);
          margin-left: 15px;
          width: 0.16rem;
          height: 0.16rem;
        }
      }
    }
    ul{
      padding: 0 0.3rem;
      li{
        height: 1.5rem;
        padding: 0.25rem;
        img{
          height: 100%;
          width: 1rem;
          border-radius: 0.1rem;
          float: left;
        }
        div{
          float: left;
          height: 100%;
          margin-left: 0.2rem;
          line-height: 0.5rem;
          overflow: hidden;
          p{
            color: #717171;
            &:first-child{
              font-size: 0.3rem;
              min-height: 0.5rem;
            }
          }
        }
        &>span{
          float: right;
          height: 100%;
          text-align: right;
          width: 1.4rem;
          font-size: 0.26rem;
          color: #717171;
          line-height: 0.5rem;
        }
      }
    }
  }
  .contact-tag{
    .insert-icon{
      fill: #5977fe;
    }
    .insert-tag{
      margin-top: 0.5rem;
    }
    ul{
      padding: 0 0.3rem;
      li{
        margin-top: 0.3rem;
        padding: 0.3rem;
        .nav{
          position: relative;
          &::after{
            content: '';
            width: 0.16rem;
            height: 0.16rem;
            border-radius: 0.16rem;
            background-color: #7e65fd;
            position: absolute;
            top: .2rem;
            left: -0.1rem;
          }
          span{
            &:first-child{
              font-weight: bold;
              font-size: 0.34rem;
              margin-left: 0.2rem;
            }
          }
        }
      }
    }
    .client-list{
      height: 1.4rem;
      padding: 0.2rem 0;
      border-bottom: 1px solid #eee;
      position: relative;
      .delete-icon{
        position: absolute;
        top: 0.1rem;
        left: 0.9rem;
        fill: #f47810;
      }
      &:last-of-type{
        border: none;
      }
      img{
        width: 1rem;
        height: 1rem;
        border-radius: 0.05rem;
        float: left;
      }
      div{
        float: left;
        height: 100%;
        margin-left: 0.2rem;
        line-height: 0.5rem;
        max-width: calc(100% - 2.4rem);
        overflow: hidden;
        color: #717171;
        p{
          &:first-child{
            font-size: 0.3rem;
          }
        }
      }
      span{
        float: right;
        height: 100%;
        text-align: right;
        width: 1.2rem;
        font-size: 0.26rem;
        color: #717171;
        line-height: 0.5rem;
      }
    }
    .arrow-up{
      margin-bottom: -0.3rem;
      .vux-x-icon{
        fill: #717171;
      }
    }
  }
}
</style>
