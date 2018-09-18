/*
 * @Author: kaker.xutianxing
 * @Date: 2018-08-28 10:46:11
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-09-03 10:23:41
 */
<template>
  <div class="message">
    <!--<div class="card-shadow box-message" @click="gotoMessageManage">-->
      <!--<img src="@/assets/img/message.png" alt="">-->
      <!--<h5>服务消息</h5>-->
      <!--<p>暂无消息提醒</p>-->
    <!--</div>-->
    <ul class="list-message">
      <li class="card-shadow" v-for="(item, index) in messageList" :key="index" @click="gotoIM(item)">
        <badge :text="item.num" class="my-badge" v-if="item.num != 0"></badge>
        <img :src="item.wx_image ? item.wx_image : '/static/image/moren.jpg'" alt="">
        <div>
          <p>
            <span class="name">{{item.wx_name}}</span>
            <span class="time">{{item.time}}</span>
          </p>
          <p v-if="item.last_content.type === 'text'">{{item.last_content.content}}</p>
          <p v-if="item.last_content.type === 'img'">[一张图片，请点开查看详情！]</p>
          <p v-if="item.last_content.type === 'shop'">[一个产品信息，请点开查看详情！]</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { Badge } from 'vux'
import axios from 'axios';
import {get_users,get_list,look} from '@/api/message';
import {dateFtt} from '@/utils/base';
export default {
  name: 'message',
  components: {
    Badge
  },
  data () {
    return {
        messageList:[]
    }
  },
  methods: {
    gotoMessageManage () {
      this.$router.push({
        path: '/messageManage'
      })
    },

    gotoIM (item) {
        const message_id = item.message_id;
        const wx_image = item.wx_image;
        const uid = item.uid;
        if(message_id){
            this.$router.push({
                path:`/messageIM`,
                query: {
                    id: message_id,
                    wx_image
                }
            });
        }
        else{
            alert('缺少message_id！');
        }

        if(uid){
            look({
                uid
            }).then((res)=>{})
        }

    },

    async init(){
        const data = {
            "userId":this.$store.state.user.info.message_id,
            "token": this.$store.state.user.my_chat_token
        };

        let messageIds = [];
        const my_message_id = this.$store.state.user.message_id;

        let chat_data = await axios({
            method:"POST",
            url:`${this.$store.state.user.chat_domain}/chatapi/getChatList`,
            data:JSON.stringify(data)
        });

        if(chat_data.status === 200 && chat_data.data && chat_data.data.message){
            var message_list = JSON.parse(chat_data.data.message);//pkid 就是回话id

            message_list.map((val,i)=>{
                const message_ids = val.code.split('|');
                val.other_message_id = message_ids[0] === my_message_id ? message_ids[1] : message_ids[0];
                messageIds.push(val.other_message_id);
                val.unread = 1;
                val.time = dateFtt("yyyy-MM-dd", new Date(val.createtime));
            });
        }
        else{
            return
        }

        if(messageIds.length == 0){
            return
        }

        const messageIds_str = messageIds.join(',')
        let users = await get_users({
            message_id:messageIds.join(',')
        });

        if(users.code === 200 && users.data && users.data instanceof Array){
            for(let i = 0;i<message_list.length;i++){
                const m_one = message_list[i];
                for(let j = 0;j<users.data.length;j++){
                    if(m_one.other_message_id == users.data[j].message_id){
                        m_one.wx_name = users.data[j].wx_name;
                        m_one.wx_openid = users.data[j].wx_openid;
                        m_one.wx_image = users.data[j].wx_image;
                    }
                }
            }
        }



        console.log(message_list);
        this.messageList = message_list;


    },

    get_message_list(){
        get_list().then((res)=>{
            if(res.code === 200 && res.data && res.data instanceof Array){
                let list = res.data;
                list.map((val,i)=>{
                    val.time = dateFtt("yyyy-MM-dd", new Date(val.update_time*1000));
                    try {
                        val.last_content = val.last ? JSON.parse(val.last) : '';
                    }
                    catch (err){
                        val.last_content = val.last;
                    }

                });
                this.messageList = list;
                console.log('消息',list);
            }
        });
    },

    create_message(data){
        let end_obj = {};
        end_obj.message_id = data.speakerId;
        end_obj.last = data.content;
        end_obj.time = dateFtt("yyyy-MM-dd", new Date(data.createTime));
        end_obj.last_content = {};
        if(data.content_obj.type === 'text'){
            end_obj.last_content.type = 'text';
            end_obj.last_content.content = data.content_obj.content;
        }
        else if(data.content_obj.type === 'img'){
            end_obj.last_content.type = 'img';
            end_obj.last_content.original = data.content_obj.original;
        }
        else if(data.content_obj.type === 'shop'){
            end_obj.last_content.type = 'shop';
            end_obj.last_content.p_id = data.content_obj.p_id;
        }
        return end_obj;
    },

    chat_watch(){
        this.$store.state.user.websocketConnection.onmessage = (res)=>{
            const data = JSON.parse(res.data);
            if(data.cmd === 'SpeakFromDialog' && data.content){
                const chat_obj = JSON.parse(data.content);
                //存在内容
                if(chat_obj.content){
                    chat_obj.content_obj = JSON.parse(chat_obj.content);
                    var end_obj = this.create_message(chat_obj);


                    //判断这个用户是否在列表中，如果再列表中，直接插入消息
                    let isHave = false;
                    for(let i = 0;i<this.messageList.length;i++){
                        if(this.messageList[i].message_id ==  chat_obj.speakerId){
                            isHave = true;
                            //直接插入
                            Object.assign(this.messageList[i],end_obj);
                            this.messageList[i].num++;
                            console.log(this.messageList);
                            break;
                        }
                    }

                    //不存在，做请求
                    if(!isHave){
                        //做请求要信息
                        get_users({
                            message_id:chat_obj.speakerId
                        }).then((ev)=>{
                            if(ev.code === 200 && ev.data && ev.data instanceof Array){
                                const user = ev.data[0];
                                const message = {
                                    is_read:0,
                                    num:1,
                                    message_id:chat_obj.speakerId ? chat_obj.speakerId : user.message_id,
                                    uid:user.id,
                                    wx_image:user.wx_image,
                                    wx_name:user.wx_name
                                };
                                Object.assign(message,end_obj);
                                this.messageList.push(message);
                            }
                        })

                    }

                }

            }

        }
    }

  },
  mounted () {
      this.get_message_list();
      this.chat_watch();
      //this.chat_watch();
  },
    activated(){
        console.log('activated');
    }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
$color: #717171;
.message{
  padding: .5rem 0.3rem;
  height: 100%;
  overflow: auto;
  .box-message{
    height: 1.6rem;
    padding: 0.3rem 0.2rem;
    img{
      float: left;
      width: 1rem;
      margin-right: 0.2rem;
    }
    h5{
      font-size: 0.3rem;
      margin-bottom: 0.2rem;
    }
    p{
      color: $color;
    }
  }
  .list-message{
    .card-shadow{
      height: 1.6rem;
      padding: 0.3rem 0.2rem;
      margin-bottom: 0.5rem;
      position: relative;
      .my-badge{
        position: absolute;
        top: 0.2rem;
        left: 1rem;
        font-size: 0.24rem;
        min-width: 0.32rem;
        height: 0.32rem;
        line-height: 0.32rem;
        border-radius: 0.32rem;
          padding: 0;
      }
      img{
        width: 1rem;
        height: 1rem;
        border-radius: 0.05rem;
        float: left;
      }
      div{
        float: left;
        width: calc(100% - 1rem);
        padding-left: 0.3rem;
        p{
          font-size: 0.24rem;
          &:last-child{
            margin-top: 0.2rem;
            overflow: hidden;
            line-height: 0.3rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        .name{
          font-size: 0.3rem;
        }
        .time{
          float: right;
          margin-top: 0.05rem;
        }
      }
    }
  }
}
</style>
