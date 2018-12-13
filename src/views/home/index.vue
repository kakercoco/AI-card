/*
 * @Author: kaker.xutianxing
 * @Date: 2018-08-27 18:30:51
 * @Last Modified by: Jessica
 * @Last Modified time: 2018-10-18 11:32:13
 */
<template>
  <div class="index footprint" :class="$store.state.tab.tabIndex ===0 ? 'tab-index-style1': 'tab-index-style2'">
    <div class="index-header">
      <button-tab v-model="$store.state.tab.tabIndex">
        <button-tab-item  @on-item-click="onItemClick(0)">时间</button-tab-item>
        <button-tab-item @on-item-click="onItemClick(1)">行为</button-tab-item>
        <button-tab-item @on-item-click="onItemClick(2)">个人</button-tab-item>
      </button-tab>
    </div>
      <div v-show="$store.state.tab.tabIndex === 0" class="time_frame">
        <scroller
                height="100%"
                lock-x
                :use-pullup="true"
                :pullup-config="pullup_config"
                @on-pullup-loading="timeLoadMore"
                ref="scrollerBottom">
          <ul class="logs-list">
            <!--<li class="index-tilte">
              <p>9:00</p>
            </li>
            <li class="card-daily">
              <p>
                <img src="../../assets/icon/calendar.png">
                <span>名片日报</span>
              </p>
              <p>昨日名片没有访客，今天要加油哦</p>
            </li>-->
            <li class="time-record first" @click="gotoClient(firstTimeRecord)">
              <img :src="firstTimeRecord.wx_image ? firstTimeRecord.wx_image : '@/assets/img/moren.jpg'">
              <div v-html="firstTimeRecord.ele"></div>
              <span>{{firstTimeRecord.time}}</span>
            </li>
            <li class="index-tilte">
              <p>任务小助手</p>
            </li>
            <li class="task-assistant">
              <div class="empty-task" v-if="overdueTask.length === 0">
                <div @click="addTask">
                  <p>今天暂无任务</p>
                  <p><span class="bule" @click="addTask">创建任务</span>有助于管理自已的销售计划</p>
                </div>
                <p class="bule view-task" @click="viewTaskList(1, '')">
                  <span>查看全部任务</span>
                  <x-icon type="ios-arrow-right" class="icon-right" @click="viewTaskList(1, '')"></x-icon>
                </p>
              </div>
              <div class="tasks" v-if="overdueTask.length !== 0">
                <div>
                  <p>你今日有{{overdueTask.length}}个任务待完成</p>
                  <ul class="task_list">
                    <li v-for="(item, index) in overdueTask" :key="index">
                      <div class="task_left" @click="signStar(item)">
                        <img v-if="item.star === 0" src="../../assets/task/unmark.png" class="star_icon" @click="signStar(item)">
                        <img v-if="item.star === 1" src="../../assets/task/mark.png" class="star_icon" @click="signStar(item)">
                      </div>
                      <div class="task_right" @click="taskDetail(item)">
                        <p class="task_title"> {{ item.title }}</p>
                      </div>
                      <p class="finish_tiltle" @click="signFinishTask(item)">完成</p>
                    </li>
                  </ul>
                </div>
                <p class="bule view-task" @click="viewTaskList(0, currentTime)">查看今日任务
                  <x-icon type="ios-arrow-right" class="icon-right" @click="viewTaskList(0, currentTime)"></x-icon>
                </p>
              </div>
            </li>
           <!-- <li class="index-tilte">
              <p>昨天 21:00</p>
            </li>
            <li class="ranking">
              <div class="ranking-header">
                <p>
                  <span class="ranking-number">81</span>
                  <span class="client-number">0</span>
                </p>
                <p>
                  <span class="ranking-title">名次</span>
                  <span class="client-title">当日客户数</span>
                </p>
              </div>
              <div class="ranking-footer">
                <img src="../../assets/icon/calendar.png"/>
                <p>王琨夺得10月31日排行榜冠军</p>
                <x-icon type="ios-arrow-right" class="icon-right"></x-icon>
              </div>
            </li>
            <li class="index-tilte">
              <p>9:00</p>
            </li>
            <li class="card-daily">
              <p>
                <img src="../../assets/icon/calendar.png">
                <span>名片日报</span>
              </p>
              <p>昨日名片没有访客，今天要加油哦</p>
            </li>-->
            <li class="time-record" v-for="(item, index) in time_list" :key="index" @click="gotoClient(item)">
              <img :src="item.wx_image ? item.wx_image : '@/assets/img/moren.jpg'">
              <div v-html="item.ele"></div>
              <span>{{item.time}}</span>
            </li>
          </ul>
        </scroller>
      </div>
      <div v-show="$store.state.tab.tabIndex === 1" class="tab-action">
        <div class="action-card clearfix">
          <p class=" tac">
            <img src="@/assets/img/datapicker.png" class="fr" @click="showDateChoose">
            {{behavior_config.time_slot}}被查看的行为统计
          </p>
          <ul>
            <li @click="gotoCardList({type:3})">
              <div>
                <img src="@/assets/img/product.png" alt="">
              </div>
              <div>
                <h5>查看产品</h5>
                <p>{{behavior_config.product}}</p>
              </div>
            </li>
            <li @click="gotoCardList({type:1})">
              <div>
                <img src="@/assets/img/inter.png" alt="">
              </div>
              <div>
                <h5>查看官网</h5>
                <p>{{behavior_config.web}}</p>
              </div>
            </li>
            <li @click="gotoCardList({type:2})">
              <div>
                <img src="@/assets/img/weixin.png" alt="">
              </div>
              <div>
                <h5>查看案例</h5>
                <p>{{behavior_config.case}}</p>
              </div>
            </li>
            <li @click="gotoCardList({type:0})">
              <div>
                <img src="@/assets/img/card.png" alt="">
              </div>
              <div class="behavior-header-right">
                <h5>查看名片</h5>
                <p>{{behavior_config.card}}</p>
              </div>
            </li>
          </ul>
        </div>
        <ul class="action-list">
          <li
              @click="gotoCallPhoneList(item)"
              v-for="(item, index) in behavior_list" :key="index">
            <img :src="'/ai/static/image/' + item.type +'.png'">
            <div>
              <span>{{item.title}}</span>
              <i>{{item.nums}}</i>
            </div>
          </li>
        </ul>
      </div>
      <div v-show="$store.state.tab.tabIndex === 2" style="height:100%;" class="interaction_frame">
        <scroller
            lock-x
            height="100%"
            :pullup-config="pullup_config"
            @on-pullup-loading="Interaction_loadMore"
            :use-pullup="true"
            ref="scroller">
          <div>
            <div class="Interaction_header">
              <p class="interaction">
                <img src="@/assets/img/datapicker.png" class="fr" @click="showDateChoose">
                {{interactionScroller.time_slot}}内与我的互动统计
              </p>
             <!-- <span>{{interactionScroller.time_slot}}内和我的互动统计</span>
              <img src="@/assets/img/datapicker.png" alt="" class="fr" @click="showDateChoose">-->
            </div>
            <ul class="news-list">
              <div v-for="(item, index) in interaction_list" :key="index" >
                <li>
                  <img :src="item.wx_image ? item.wx_image : '@/assets/img/moren.jpg'" @click="toggleDetail(index)">
                  <span class="list_title" @click="toggleDetail(index)"><i>{{item.wx_name}}</i>在{{interactionScroller.time_slot}}内和你互动了<i>{{item.num}}</i>次</span>
                  <x-icon v-if="item.status" type="ios-arrow-down" size="20" class="icon" @click="toggleDetail(index)"></x-icon>
                  <p v-if="!item.status" class="tar"><x-icon type="ios-arrow-up" size="20" class="icon-up" @click="toggleDetail(index)"></x-icon></p>
                </li>
                <div v-if="!item.status" class="news-list-detail">
                  <div style="height: 0.3rem"></div>
                  <!--<p class="title">
                    <img src="@/assets/img/datapicker.png" alt="" class="fr" style="display: none">
                    <img :src="item.wx_image ? item.wx_image : '@/assets/img/moren.jpg'" class="avatar">
                  </p>-->
                  <!--<p class="tac">{{item.wx_name}}在{{interactionScroller.time_slot}}内和你互动了{{item.num}}次</p>-->
                  <p v-for="(val, i) in item.typeGroup" :key="i" class="graph">
                    <span>{{val.title}}</span>
                    <strong>
                      <i :style="{width: val.percent + 'rem'}"></i>
                      <b>{{val.num}}</b>
                    </strong>

                  </p>
                </div>
              </div>
            </ul>
          </div>

        </scroller>
      </div>
    <x-dialog v-model="datePickerDialog" class="dialog-datepicker" hide-on-blur :dialog-style="{'max-width': '100%', width: '5.8rem'}">
      <h5>选择时间段</h5>
      <group class="start-time">
        <datetime v-model="startTIme" format="YYYY-MM-DD" placeholder="" @on-change="changeStartTime">
          <span slot="title"></span>
          <div slot="title">
            <img src="@/assets/img/datepickerGray.png" alt="" class="fl title-icon">
          </div>
        </datetime>
      </group>
      <p class="time-title">至</p>
      <group class="end-time">
        <datetime v-model="endTime" format="YYYY-MM-DD" placeholder="">
          <span slot="title"></span>
          <div slot="title">
            <img src="@/assets/img/datepickerGray.png" alt="" class="fl title-icon">
          </div>
        </datetime>
      </group>
      <div class="btn">
        <p @click="resetTime">取消</p>
        <p @click="sureTime">确定</p>
      </div>
    </x-dialog>
      <div class="Unread_dialog" v-if="$store.state.app.Unread != 0 && $store.state.tab.tabIndex === 0" @click="Refresh">未读足迹:{{$store.state.app.Unread}}</div>
  </div>
</template>

<script>
import { Tab, TabItem, Scroller, XDialog, XButton, Group, Cell, Datetime, ButtonTab, ButtonTabItem, AlertModule } from 'vux'
import { dateFtt, config } from '@/utils/base'
import { get_user_info } from '@/api/user_info'
import { init_list, init_Interaction } from '@/api/footprint'
import { getTaskList, signStarTask, signCompletedTask } from '@/api/task'

export default {
  name: 'index',
  components: {
    Tab,
    TabItem,
    Scroller,
    XButton,
    XDialog,
    Group,
    Cell,
    Datetime,
    ButtonTab,
    ButtonTabItem,
    AlertModule
  },
  data () {
    return {
      taskLists: [],
      overdueTask: [],
      completedTask: [],
      currentTime: dateFtt('yyyy-MM-dd', new Date()),
      listQuery: {
        start_time: '',
        end_time: '',
        type: 5

      },
      time_list: [],
      firstTimeRecord: {},
      interaction_list: [],
      behavior_list: [],
      tabIndex: 0,
      startTIme: '',
      endTime: '',
      datePickerDialog: false, // 日期选择dialog
      countObj: [],
      loadingConfig: {
        upContent: '上拉加载更多',
        downContent: '释放后加载',
        loadingContent: '加载中...',
        content: '请上拉刷新数据'
      },
      timeScroller: {
        page: 1,
        pagesize: 10,
        max_page: 0,
        isAjax: true,
        total: 0,
        test: true
      },
      interactionScroller: {
        page: 1,
        pagesize: 10,
        max_page: 0,
        isAjax: true,
        total: 0,
        Reset: true,
        time_slot: '7日',
        status_position: 0
      },
      behavior_config: {
        isAjax: true,
        time_slot: '7日',
        card: 0,
        web: 0,
        case: 0,
        product: 0

      },
      pullup_config: {
        content: '加载中...',
        pullUpHeight: 60,
        height: 40,
        autoRefresh: false,
        downContent: '加载中...',
        upContent: '加载中...',
        loadingContent: '加载中...'
      },
      scrollerStatus: {
        pullupStatus: 'default'
      }
    }
  },
  watch: {
      '$store.state.tab.tabIndex' (val) {
      if (val == 1) {
        this.behavior_init()
      }
    }
  },
  methods: {
    signFinishTask (item) {
      let status = 0
      let content = ''
      if (item.status === 0) {
        status = 1 // 完成
        content = '此任务确定完成了吗？'
      } else {
        status = 0 // 取消
        content = '此任务确认取消完成？'
      }
      let this_ = this
      this.$vux.confirm.show({
        title: '提示',
        content: content,
        onCancel () { // 取消
        },
        onConfirm () { // 确定
          signCompletedTask({
            id: item.id,
            status: status
          }).then(res => {
            if (res.code === 200) {
              this_.getTaskLists()
            } else {
              AlertModule.show({
                title: '提示',
                content: res.msg
              })
            }
          })
        }
      })
    },
    taskDetail (item) {
      this.$router.push({
        path: '/taskDetail',
        query: {
          id: item.id
        }
      })
    },
    getTaskLists () {
      getTaskList(this.listQuery).then(res => {
        if (res.code === 200) {
          this.taskLists = res.data
          let completedTask = []
          let overdueTask = []
          if (res.data.length > 0) {
            this.taskLists.forEach(element => {
              if (element.status === 1) { // 完成
                completedTask.push(element)
              } else {
                overdueTask.push(element)
              }
            })
          }
          this.completedTask = completedTask
          this.overdueTask = overdueTask
        } else {
          AlertModule.show({
            title: '提示',
            content: res.msg
          })
        }
      })
    },
    signStar (item) {
      let star = 0
      if (item.star === 0) {
        star = 1
      } else {
        star = 0
      }
      signStarTask({
        id: item.id,
        star: star
      }).then(res => {
        if (res.code === 200) {
          this.getTaskLists()
        } else {
          AlertModule.show({
            title: '提示',
            content: res.msg
          })
        }
      })
    },
    addTask () {
      this.$router.push({
        path: '/addTask'
      })
    },
    viewTaskList (num, time) {
      this.$router.push({
        path: '/taskList',
        query: {
          tabIndex: num,
          time: time
        }
      })
    },
    onItemClick (index) {
      this.$store.commit('tab/index_change_tab',index);
    },

    toggleDetail (index) {
      let status = this.interaction_list[index].status
      this.interaction_list[index].status = !status
      // 点击展开
      if (status) {
        // const ele = document.querySelector('.interaction_frame .xs-container');
        // var transformY = 0;
        // try {
        //     transformY = parseInt(window.getComputedStyle(ele,null).transform.replace('matrix(1, 0, 0, 1, 0,','').replace(')',''));
        // }
        // catch (err){}
        // this.interactionScroller.status_position = transformY;
      }
      // 关上
      else {
        this.$nextTick(() => {
          this.$refs.scroller.reset({top: 0})
        })
      }
    },

    timeLoadMore () {
      if (this.timeScroller.isAjax && this.timeScroller.page < this.timeScroller.max_page) {
        this.timeScroller.page++
        this.get_time_list()
      } else if (this.timeScroller.page >= this.timeScroller.max_page) {
        this.$refs.scrollerBottom.disablePullup() // 禁用上拉
      }
    },

    showDateChoose () {
      this.datePickerDialog = true
    },
    resetTime () {
      this.datePickerDialog = false
    },

    sureTime () {
      if (this.startTIme === '') {
        this.$vux.alert.show({
          title: '提示',
          content: '开始时间不能为空！'
        })
        return
      }
      if (this.endTime === '') {
        this.$vux.alert.show({
          title: '提示',
          content: '结束时间不能为空！'
        })
        return
      }
      this.datePickerDialog = false
      // 如果是互动页面
      if (this.$store.state.tab.tabIndex === 2) {
        this.interactionScroller.time_slot = `${this.startTIme}到${this.endTime}`
        if (this.interactionScroller.isAjax) {
          this.$refs.scroller.disablePullup()
          this.interaction_list = []
          this.interactionScroller.page = 1
          this.interactionScroller.total = 0
          this.interactionScroller.max_page = 0
          this.Interaction_init(this.startTIme, this.endTime, true)
        }
      } else {
        this.behavior_config.time_slot = `${this.startTIme}到${this.endTime}`
        this.$vux.loading.show({
          text: '加载中...'
        })
        if (this.behavior_config.isAjax) {
          // 重置
          this.behavior_init(this.startTIme, this.endTime)
        }
      }
      this.startTIme = ''
      this.endTime = ''
    },

    changeStartTime (val) {
      // this.startTIme = val
    },

    gotoClient (item) {
      this.$router.push({
        path: '/client',
        query: {
          uid: item.uid
        }
      })
    },

    gotoCardList (item) {
      this.$router.push({
        path: '/seeCard',
        query: {
          type: item.type,
          time: this.behavior_config.time_slot
        }
      })
    },

    gotoWebsiteList () {
      this.$router.push({
        path: '/seeWebsite'
      })
    },

    gotoCallPhoneList (item) {
      this.$router.push({
        path: '/callPhone',
        query: {
          type: item.type,
          time: this.behavior_config.time_slot
        }
      })
    },

    // 获取时间列表
    get_time_list (isTop) {
      this.timeScroller.isAjax = false
      init_list({
        type: 'time',
        page: this.timeScroller.page,
        pagesize: this.timeScroller.pagesize
      }).then((e) => {
        this.timeScroller.isAjax = true
        this.$vux.loading.hide()
        if (e.code === 200 && e.data && e.data.rows instanceof Array) {
          let list = e.data.rows
          list.map((val, i) => {
            val.ele = config[val.type] ? val.wx_name + '第' + val.num + '次' + config[val.type] : ''
            val.time = dateFtt('MM-dd hh:mm', new Date(val.create_time * 1000))
          })
          this.time_list = this.time_list.concat(list)
          if (this.time_list.length > 0) {
            this.firstTimeRecord = this.time_list[0]
          }
          this.time_list = this.time_list.splice(1, this.time_list.length)
          this.timeScroller.total = e.data.total
          this.timeScroller.max_page = Math.ceil(e.data.total / 10)
          this.$nextTick(() => {
            this.$refs.scrollerBottom.donePullup()// 上啦完成

            if (isTop) {
              this.$refs.scrollerBottom.reset({top: 0})
            } else {
              this.$refs.scrollerBottom.reset()
            }

            if (this.timeScroller.max_page <= 1 || this.time_list.length === 0) {
              this.$refs.scrollerBottom.disablePullup()// 禁止上啦
            } else {
              this.$refs.scrollerBottom.enablePullup()// 恢复上啦
            }
          })
        } else {
          this.$refs.scrollerBottom.disablePullup()
        }
      }).catch((err) => {
        console.log(err)
        this.$vux.loading.hide()
        this.timeScroller.isAjax = true
        this.$refs.scrollerBottom.disablePullup()
      })
    },

    Interaction_loadMore () {
      if (this.interactionScroller.isAjax && this.interactionScroller.page < this.interactionScroller.max_page) {
        this.interactionScroller.page++
        this.Interaction_init()
      } else if (this.interactionScroller.page >= this.interactionScroller.max_page) {
        this.$refs.scroller.disablePullup() // 禁用上拉
      }
    },

    Refresh () {
      if (this.timeScroller.isAjax) {
        // 重置
        this.$vux.loading.show({
          text: '加载中...'
        })
        this.$store.commit('app/Empty')
        this.timeScroller.test = true
        this.time_list = []
        this.$refs.scrollerBottom.disablePullup()
        this.timeScroller.page = 1
        this.timeScroller.total = 0
        this.timeScroller.max_page = 0
        this.get_time_list(true)
        /* this.$nextTick(()=>{
                this.timeScroller.test = false;
                this.$nextTick(()=>{
                    this.$store.commit('app/Empty');
                    this.timeScroller.test = true;
                    this.time_list = [];
                    this.timeScroller.page = 1;
                    this.timeScroller.total = 0;
                    this.timeScroller.max_page = 0;
                    this.get_time_list();
                })
            }) */
      }
    },

    // 获取互动列表
    Interaction_init (start_time, end_time, isTop) {
      this.interactionScroller.isAjax = false
      init_list({
        type: 'interact',
        page: this.interactionScroller.page,
        pagesize: this.interactionScroller.pagesize,
        start_time,
        end_time
      }).then((e) => {
        // debugger;
        this.interactionScroller.isAjax = true
        this.$vux.loading.hide()
        if (e.code === 200 && e.data && e.data.rows instanceof Array) {
          let list = e.data.rows

          const reg = /<i>\W+<\/i>/g

          list.map((val, i) => {
            if (val.typeGroup && val.typeGroup instanceof Array) {
              val.typeGroup.map((item, index) => {
                if (config[item.type]) {
                  item.title = config[item.type].match(reg) ? config[item.type].match(reg).join('').replace(/<i>/g, '').replace(/<\/i>/g, '') : ''
                } else {
                  item.title = ''
                }
                // item.percent = (item.num / val.num).toFixed(2) * 100 + '%';
                item.percent = parseInt((item.num / val.num) * 170 * 2) / 100
              })
            }
            val.status = true
          })
          console.log('互动', list)
          this.interaction_list = this.interaction_list.concat(list)
          this.interactionScroller.total = e.data.total
          this.interactionScroller.max_page = Math.ceil(e.data.total / 10)
          this.$nextTick(() => {
            this.$refs.scroller.donePullup()// 上啦完成

            if (isTop) {
              this.$refs.scroller.reset({top: 0})
            } else {
              this.$refs.scroller.reset()
            }

            if (this.interactionScroller.max_page <= 1) {
              this.$refs.scroller.disablePullup()// 禁止上啦
            } else {
              this.$refs.scroller.enablePullup()// 恢复上啦
            }
          })
        } else {
          this.$refs.scroller.disablePullup()
        }
      }).catch((err) => {
        console.log(err)
        this.$vux.loading.hide()
        this.interactionScroller.isAjax = true
      })
    },

    // 获取行为列表
    behavior_init (start_time, end_time) {
      this.behavior_config.isAjax = false
      this.$vux.loading.show({
        text: '加载中...'
      })
      init_list({
        type: 'behavior',
        start_time,
        end_time
      }).then((e) => {
        this.behavior_config.isAjax = true
        this.$vux.loading.hide()

        if (e.code === 200 && e.data && e.data instanceof Array) {
          let list = e.data
          let end_list = []
          const reg = /<i>\W+<\/i>/g
          list.map((val, i) => {
            if (val.type === 0) {
              this.behavior_config.card = val.nums
            } else if (val.type === 1) {
              this.behavior_config.web = val.nums
            } else if (val.type === 2) {
              this.behavior_config.case = val.nums
            } else if (val.type === 3) {
              this.behavior_config.product = val.nums
            } else {
              if (config[val.type]) {
                val.title = config[val.type].match(reg) ? config[val.type].match(reg).join('').replace(/<i>/g, '').replace(/<\/i>/g, '') : ''
              } else {
                val.title = ''
              }
              end_list.push(val)
            }
          })

          this.behavior_list = end_list
        }
      }).catch((err) => {
        console.log(err)
        this.$vux.loading.hide()
        this.behavior_config.isAjax = true
      })
    }

  },
  mounted () {
    this.get_time_list()
    this.Interaction_init()
    this.behavior_init()
    this.getTaskLists()
  },
  created () {
    this.listQuery.start_time = this.currentTime
    this.listQuery.end_time = this.currentTime
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
$color:#717171;
.tab-index-style1{
  background-color: #f8f8f8;
 }
.tab-index-style2{
  background-color: #fff;
}
.index{
  overflow: auto;
  height: 100%;
  -webkit-overflow-scrolling: touch;
  .index-header{
    width: 100%;
    position: fixed;
    background-color: #fff;
    z-index: 1;
    padding-bottom: 0.18rem;
    padding-top: 0.24rem;
    & /deep/ .vux-button-group {
      padding: 0 0.4rem;
    }
    & /deep/ .vux-button-group > a.vux-button-group-current {
      color: #FFF;
      background: #3e84ff;
    }
    & /deep/ .vux-button-group > a {
      color: #353535;
      font-size: 16.5px;
      font-family:"黑体",serif;
      background: #e5e5e5;
      height: 0.7rem;
      line-height: 0.7rem;
    }
    & /deep/ .vux-button-group > a.vux-button-tab-item-last:after {
      border-right: none;
      border-top: none;
      border-bottom: none;
      border-left: none;
    }
    & /deep/ .vux-button-group > a.vux-button-tab-item-middle:after {
      border-right: none;
      border-top: none;
      border-bottom: none;
      border-left: none;
    }
    & /deep/ .vux-button-group > a.vux-button-tab-item-first:after {
      border-right: none;
      border-top: none;
      border-bottom: none;
      border-left: none;
    }
  }
  .Unread_dialog{
    position: fixed;
    top:2rem;
    right: 0;
    width: 2.2rem;
    height: 0.6rem;
    z-index: 999;
    background: #fff;
    border-bottom-left-radius: 20px;
    border-top-left-radius: 20px;
    box-shadow: 0 3px 10px #d6e1fb;
    border: 1px #d6e1fb solid;
    line-height: 0.6rem;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .time_frame{
    height:100%;
  }
  .vux-tab-wrap{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
  .time{
    font-size: 0.32rem;
    line-height: 0.5rem;
    color: #717171;
    margin: 0.4rem 0;
  }
  .logs-list{
    padding: 0.8rem 0.4rem 0 0.4rem;
    font-family:"黑体",serif;
    line-height: 0.36rem;
    font-size: 0.28rem;
    .index-tilte{
      height: 1rem;
      p{
        padding-top: 0.38rem;
        height: 0.6rem;
        line-height: 0.36rem;
        font-size: 0.33rem;
      }
    }
    .card-daily{
      background-color: #fff;
      min-height: 1.5rem;
      padding-left: 0.3rem;
      border: 1px solid #efefef;
      border-radius: 0.1rem;
      p:nth-child(1){
        height: 0.76rem;
        padding-top:0.26rem;
        span{
          position: relative;
          top: -0.1rem;
        }
        img{
          height: 0.5rem;
          width: 0.5rem;
        }
      }
      p:nth-child(2){
        height: 0.76rem;
        padding-top: 0.18rem;
      }
    }
    .task-assistant{
      background-color: #fff;
      min-height: 2rem;
      border: 1px solid #efefef;
      border-radius: 0.1rem;
      .view-task{
        padding-left: 0.3rem;
        height: 0.8rem !important;


        border-top: 1px solid #efefef;
        span{
          line-height: 0.8rem;
          font-size: 0.24rem !important;
          float: left;
        }
        .icon-right {
          float: right;
          width: 0.4rem;
          fill: #d2d2d2;
          margin-right: 0.1rem;
          margin-top: 0.16rem;
        }
      }
      .bule{
        color: #3e80f4 !important;
      }
      .empty-task{
        div:nth-child(1){
          padding: 0.68rem 0 0.68rem 0.3rem;
          p{
            text-align: center;
          }
          p:nth-child(1){
            padding-bottom: 0.1rem;
          }
        }
      }
      .tasks{
        // min-height: 3.16rem;
        p{
          padding: 0 0 0 0.3rem;
          font-size: 0.24rem;
          line-height: 0.8rem;
          color: #666666;
          height: 0.8rem;
        }
        .task_list{
          padding: 0.2rem 0 0 0.3rem;
          li{
            height: 0.8rem;
            .selected_icon{
              float: left;
              width: 0.42rem;
              height: 0.48rem;
              position: relative;
              top: 0.16rem;
            }
            .star_icon{
              float: left;
              width: 0.3rem;
              height: 0.3rem;
              position: relative;
              top: 0;
            }
            .task_left{
              width: 8%;
              float: left;
            }
            .finish_tiltle{
              position: relative;
              top: -1.05rem;
              left: 5rem;
              color: #3e80f4;
              font-size: 0.28rem;
              font-family: '黑体',serif;
            }
            .task_right{
              width: 85%;
              height: 100%;
              line-height: 0.5rem;
              overflow: hidden;
              i{
                color: #f69600;
              }
              .task_title{
                color: #353535;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                height: 0.75rem;
                line-height: 0.36rem;
                font-size: 0.28rem;
                padding: 0;
              }
            }
          }
        }
      }
    }
    .ranking{
      border: 1px solid #efefef;
      border-radius: 0.1rem;
      background-color: #fff;
      .ranking-header{
        height: 2.5rem;
        line-height: 2.5rem;
        padding-left: 0.3rem;
        p:nth-child(1){
          height: 0.7rem;
          padding: 0 0.54rem 0 0.3rem;
          font-size: 0.9rem;
          line-height: 0.36rem;
          font-family: 'Arial Regular',serif;
          .ranking-number{
            display: inline-block;
            float: left;
            position: relative;
            top: 0.85rem;
          }
          .client-number{
            display: inline-block;
            float: right;
            position: relative;
            top: 0.85rem;
          }
        }
        p:nth-child(2){
          padding: 0 0.54rem 0 0.3rem;
          .ranking-title{
            display: inline-block;
            float: left;
            height: 0.52rem;
          }
          .client-title{
            display: inline-block;
            float: right;
            height: 0.52rem;
          }
        }
      }
      .ranking-footer{
        border-top: 1px solid #efefef;
        img{
          display: inline-block;
          width: 0.5rem;
          height: 0.5rem;
          position: relative;
          top: 0.15rem;
          left: 0.3rem;
        }
        p{
          display: inline-block;
          height: 1rem;
          line-height: 1rem;
          padding-left: 0.4rem;
        }
        .icon-right {
          position: relative;
          top: -0.85rem;
          left: 4.8rem;
          width: 0.5rem;
          fill: #d2d2d2;
          display: inline-block;
        }
      }
    }
    .time-record{
      height: 1.8rem;
      padding: 0.25rem 0;
      border-bottom: 1px solid #eee;
      background-color: #fff;
      margin-top: 0.25rem;
      img{
        float: left;
        height: 100%;
        width: 1.3rem;
        border-radius: 0.1rem;
      }
      div{
        width: 65%;
        float: left;
        height: 100%;
        line-height: 0.5rem;
        margin-left: 0.2rem;
        padding: 0.1rem 0;
        overflow: hidden;
        i{
          color: #f69600;
        }
      }
      span{
        float: right;
        width: 0.8rem;
        height: 100%;
        color: #717171;
        font-size: 0.22rem;
        padding-top: 0.1rem;
        line-height: 0.4rem;
      }
    }
    .first{
      margin-top: 0.4rem;
    }
  }
}
.tab-action{
  padding: 0.5rem 0.2rem 0 0.16rem;
  background-color: #fff;
  .action-card{
    padding: 0.25rem;
    margin-top: 0.2rem;
    & > p{
      color: #666666;
      height: 0.8rem;
      font-size: 0.24rem;
      line-height: 0.8rem;
      font-family: "\9ED1\4F53",serif;
      text-align: left;
      img{
        width: 0.36rem;
        margin-top: 0.2rem;
      }
    }
    ul{
      margin-top: 0.2rem;
      height: 2.84rem;
      border-radius: 0.1rem;
      -moz-box-shadow:0px 2px 11px #C7C7C7;
      -webkit-box-shadow:0px 2px 11px #C7C7C7;
      box-shadow:0px 2px 11px #C7C7C7;
    }
    li:nth-child(2n+1){
      padding: 0.46rem 0 0 0.76rem;
      width: 45%;
      display: flex;
      align-items: center;
      float: left;
      justify-content: flex-start;
    }
    li{
      padding: 0.46rem 0.76rem 0 0;
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      img{
        width: 0.6rem;
        height: 0.58rem;
      }
      h5{
        padding-left: 0.2rem;
        font-size: 0.24rem;
        line-height: 0.36rem;
        font-family: "黑体",serif;
        color: #999999;
      }
      p{
        padding-left: 0.2rem;
        font-size: 0.4rem;
        line-height: 0.36rem;
        font-family: "黑体",serif;
        color: #3e84ff;
      }
    }
  }
  .action-list{
    li{
      height: 1rem;
      line-height: 1rem;
      padding: 0.18rem 0.21rem 0 0.25rem;
      font-size: 0.3rem;
      font-family: "\9ED1\4F53",serif;
      color: #666666;
      img{
        float: left;
        height: 0.37rem;
        width: 0.37rem;
        margin-right: 0.2rem;
        margin-top: 0.3rem;
      }
      div{
        span{
          float: left;
          height: 100%;
        }
        i{
          float: right;
          height: 100%;
          color: #353535;
        }
        margin-left: 0.8rem;
        height: 1rem;
        border-bottom: 1px solid #e5e5e5;
      }
    }
  }
}
.news-list{
  padding: 0 0.3rem 0.6rem 0.3rem;
  li{
    height: 1.22rem;
    padding: 0.2rem 0;
    line-height: 1rem;
    border-bottom: 1px #e0e0e0 solid;
    img{
      float: left;
      width: 0.82rem;
      height: 0.82rem;
      margin-right: 0.2rem;
      border-radius: 50%;
    }
    span{
      float: left;
      height: 100%;
      font-size: 0.28rem;
      line-height: 0.42rem;
      color: #353535;
      font-family: '黑体',serif;
    }
    .list_title{
      float: left;
      width: 5.4rem;
      line-height: 0.8rem;
      height: 0.8rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      i{
        color:#3c7df0;
      }
    }
    .icon-up{
      float: right;
      height: 100%;
      fill: #3c7df0;
      margin-top: 0.22rem;
    }
    .icon{
      float: right;
      height: 100%;
      fill: #999;
    }
  }
  li:first-child{
    /*border-top: 1px #e0e0e0 solid;*/
  }
  .news-list-detail{
    margin-bottom: 0.3rem;
    border: 1px #f5f5f5 solid;
    border-top: none;
    .avatar{
      display: block;
      margin: 0 auto;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 0.1rem;
    }
    .title{
      position: relative;
      img{
        &:first-child{
          width: 0.35rem;
          position: absolute;
          top: 0.6rem;
          right: 0.2rem;
        }
      }
    }
    p{
      &:nth-of-type(2){
        font-size: 0.22rem;
        color: $color;
      }
      &:last-child{
        height: 0.5rem;
        padding: 0 0.15rem;
      }
      .icon{
        fill: #999;
      }
    }
    .graph{
      height: 0.7rem;
      line-height: 0.7rem;
      padding: 0 0.17rem;
      span{
        float: left;
        width: 1.5rem;
        position: relative;
        text-align: left;
        font-size: 0.24rem;
        line-height: 0.36rem;
        color: #666666;
        font-family: '黑体',serif;
      }
      strong{
        float: left;
        width: 4.2rem;
        height: 0.7rem;
        position: relative;
        top: -0.17rem;
        margin-left: 0.3rem;
        color: #717171;
        i{
          display: inline-block;
          height: 0.2rem;
          border-radius: 0.1rem;
          margin-right: 5px;
          min-width: 1px !important;
        }
      }
      &:nth-child(7n+1){
        i{
          background: linear-gradient(left, #5a55d3, #5a55d3);
          background: -webkit-linear-gradient(left, #5a55d3, #5a55d3);
        }
      }
      &:nth-child(7n+2){
        i{
          background: linear-gradient(left, #3e84ff, #3e84ff);
          background: -webkit-linear-gradient(left, #3e84ff, #3e84ff);
        }
      }
      &:nth-child(7n+3){
        i{
          background: linear-gradient(left, #0eae2c, #0eae2c);
          background: -webkit-linear-gradient(left, #0eae2c, #0eae2c);
        }
      }
      &:nth-child(7n+4){
        i{
          background: linear-gradient(left, #8fc31f, #8fc31f);
          background: -webkit-linear-gradient(left, #8fc31f, #8fc31f);
        }
      }
      &:nth-child(7n+5){
        i{
          background: linear-gradient(left, #00acc1, #00acc1);
          background: -webkit-linear-gradient(left, #00acc1, #00acc1);
        }
      }
      &:nth-child(7n+6){
        i{
          background: linear-gradient(left, #fb9505, #fb9505);
          background: -webkit-linear-gradient(left, #fb9505, #fb9505);
        }
      }
      &:nth-child(7n+7){
        i{
          background: linear-gradient(left, #ff2854, #ff2854);
          background: -webkit-linear-gradient(left, #ff2854, #ff2854);
        }
      }
    }
  }
}
.dialog-datepicker{
  & /deep/ .weui-cell_access .weui-cell__ft:after {
    display: none;
  }
  & /deep/ .vux-cell-value {
    display: inline-block;
    color: #999;
    width: 1.7rem;
    font-size: 0.24rem;
    position: relative;
    left: -0.9rem;
  }
  .weui-cell {
    border: 1px solid #D9D9D9;
    border-radius: 5px;
    height: 0.8rem;
  }
  .weui-cells:before {
    border-top: none !important;
  }
  .weui-cells:after {
    border-bottom: none !important;
  }
  & /deep/ .weui-cell__ft{
    padding-right: 20px;
    &::after{
      margin-top: -6px;
    }
  }
  h5{
    height: 0.9rem;
    color: #353535;
    font-weight: normal;
    font-size: 0.36rem;
    line-height: 0.9rem;
    font-family: "\9ED1\4F53",serif;
    /*background-color: #efefef;*/
    margin-bottom: 0.5rem;
  }
  .title-icon{
    width: 0.36rem;
    height: 0.36rem;
    position: relative;
    left: 1.3rem;
  }
  .btn{
    height: 1rem;
    border-top: 1px solid #e6e6e6;
    width: 5.8rem;
    p{
      margin: 0;
      font-size: 0.36rem;
      line-height: 0.42rem;
      font-family: '黑体',serif;
      color: #666666;
    }
    p:nth-child(1){
      height: 1rem;
      width: 50%;
      float: left;
      display: inline-block;
      border-right: 1px solid #e6e6e6;
      padding-top: 0.31rem;
    }
    p:nth-child(2){
      height: 1rem;
      display: inline-block;
      width: 50%;
      color: #3c7df0;
      padding-top: 0.31rem;
    }
  }
  .time-title{
    width: 0.7rem;
    height: 0.75rem;
    display: inline-block;
    position: relative;
    top: -0.33rem;
    font-size: 0.3rem;
    line-height: 0.42rem;
    font-family: "\9ED1\4F53",serif;
  }
  .start-time{
    display: inline-block;
    width: 2.25rem;
    height: 1.77rem;
  }
  .end-time{
    width: 2.25rem;
    display: inline-block;
    height: 1.77rem;
  }
}
  .Interaction_header{
    padding: 0.94rem 0.15rem 0 0.44rem;
    .interaction{
      color: #666666;
      height: 0.8rem;
      font-size: 0.24rem;
      line-height: 0.8rem;
      font-family: "\9ED1\4F53",serif;
      text-align: left;
      border-bottom: 1px #e0e0e0 solid;
      border-top: 1px #e0e0e0 solid;
      img{
        width: 0.36rem !important;
        height: 0.36rem !important;
        margin-top: 0.2rem;
      }
    }
    span{
      float: left;
      margin-left: 0.3rem;
      color:#666666 ;
      font-size: 0.24rem;
      line-height: 0.36rem;
      font-family:"黑体",serif;

    }
    img{
      width: 0.4rem;
      height: 0.4rem;
      float: right;
      margin-top: 0.2rem;
      margin-right: 0.3rem;
    }
  }
</style>
