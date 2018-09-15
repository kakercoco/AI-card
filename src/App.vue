<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>
import {setToken} from '@/utils/auth'
import {get_user_info} from '@/api/user_info'
export default {
  name: 'App',
    created(){
        setToken('hbsvTpWMy%2FUSEHTcf1Q0MQnpAIrLUszJHXVPqa7bctOIheqZCAPR7lwnA7Nmx%2BXWjoBod5AOlOOT5ygjJN78xMNIUj6F2ayw');
    },
    methods:{
        get_user_info(){
            get_user_info().then((res)=>{
                if(res.data){
                    this.$store.commit('user/SET_INFO',res.data);
                    console.log(this.$store.state.user.info);
                    this.webSocket_init();

                }
            })
        },
        webSocket_init(){
            const Socket_data = new WebSocket(this.$store.state.user.chat_ws);

            this.$store.commit('user/SET_websocket',Socket_data);

            this.$store.state.user.websocketConnection.onopen = ()=>{
                this.webSocket_login();
            }
        },
        webSocket_login(){
            const loginDto = {
                "userName":this.$store.state.user.info.message_name,//用户名
                "timestamp": Date.now(),
                "platform": "zhentui",
                "role": 1,//角色
                "authority": 1,//权限
                "tcloud": "",
                "purpose": 2,//聊天目的
                "token": '',//后台给我的
                "nickName":this.$store.state.user.info.card_name,//名片上的名字
            };

            const req = {
                "cmd": "PlatformLogin",
                "content": loginDto
            };

            this.$store.state.user.websocketConnection.send(JSON.stringify(req));
            this.chat_watch();
        },
        chat_watch(){
            this.$store.state.user.websocketConnection.onmessage = (res)=>{
                const data = JSON.parse(res.data);

                //如果返回是登录信息
                if (data.cmd === 'LoginSuccess') {
                    if (data.content) {
                        const my = JSON.parse(data.content);
                        this.$store.commit('user/SET_my_chat_token',my.token);

                        //判断员工信息中是否包含message_id
                        if(!this.$store.state.user.info.message_id){
                            this.$store.commit('user/SET_my_message_id',my.id);
                        }

                        console.log('聊天对象',my)
                    }
                }

            }
        }

    },
    mounted(){
      this.get_user_info();

    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
