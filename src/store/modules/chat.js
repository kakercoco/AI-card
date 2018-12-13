import axios from 'axios'
import {dateFtt, all_srcollBtoom} from '../../utils/base'
import {emojiAnalysis} from '../../utils/emoj'
const chat = {
    namespaced: true,
    state: {
        char_list: [],
        img_list: [],
        my_chat_room_id: ''

    },
    mutations: {
        SET_my_chat_room_id: (state, id) => {
            state.my_chat_room_id = id
        },

        HIDE_loading: (state, id) => {
            for (let i = 0; i < state.char_list.length; i++) {
                if (state.char_list[i].id === id) {
                    state.char_list[i].is_loading = false
                    break
                }
            }
        },
        PUSH_char_list: (state, data) => {
            state.char_list.push(data)
        },

        PUSH_img_list: (state, data) => {
            state.img_list.push(data)
        },

        Clear_char_list: (state, data) => {
            state.char_list = []
        },

        Clear_img_list: (state, data) => {
            state.img_list = []
        }

    },
    actions: {
        GetChat (store, id) {
            const { commit, dispatch, state, rootState } = store
            if (id && rootState.user.websocketConnection != null) {
                const req = {
                    'cmd': 'GetChat',
                    'content': id// 对方的id
                }
                rootState.user.websocketConnection.send(JSON.stringify(req))
                // this.chat_record();
            }
        },

        chat_record (store, {id, vm, wx_name}) {
            const { commit, dispatch, state, rootState } = store
            commit('Clear_char_list')
            commit('Clear_img_list')
            const that = this
            const user = rootState.user.info

            if (!user.message_id) {
                alert('没有聊天对象id，无法获取聊天记录')
                return
            }

            const data = {
                userId: user.message_id, // 当前操作者的id
                aimId: id, // 对方的id
                token: rootState.user.my_chat_token
            }

            vm.$vux.loading.show({
                text: '加载中...'
            })

            axios({
                method: 'POST',
                url: `${rootState.user.chat_domain}/chatapi/getChat`,
                data: JSON.stringify(data)
            }).then((res) => {
                vm.$vux.loading.hide()
                if (res.status === 200 && res.data && res.data.message) {
                    const list = JSON.parse(res.data.message)
                    let others_image = user.image// h5所有者的头像
                    list.map((val, i) => {
                        try {
                            const time = dateFtt('yyyy-MM-dd hh:mm:ss', new Date(val.createtime))
                            let data = JSON.parse(val.content)
                            let obj = {}
                            obj.fead_src = val.speaker == user.message_id ? others_image : ''
                            obj.from = val.speaker == user.message_id ? 'me' : 'others'
                            obj.time = time
                            if (data.type === 'text') {
                                obj.type = 'text'
                                obj.content = emojiAnalysis([data.content])
                                commit('PUSH_char_list', obj)
                            } else if (data.type === 'img') {
                                obj.type = 'img'

                                if (data.content.indexOf('wxfile') > -1 || data.content.indexOf('blob:http') > -1) {
                                    obj.content = data.original
                                } else {
                                    obj.content = data.content
                                }

                                obj.original = data.original
                                commit('PUSH_char_list', obj)
                                commit('PUSH_img_list', {
                                    src: data.original
                                })
                            } else if (data.type === 'shop') {
                                const shop_obj = {
                                    type: 'shop',
                                    p_class: data.p_class,
                                    p_id: data.p_id,
                                    p_image: data.p_image,
                                    p_name: data.p_name,
                                    p_price_sell: data.p_price_sell,
                                    p_title: data.p_title,
                                    content: ''
                                }

                                Object.assign(obj, shop_obj)
                                commit('PUSH_char_list', obj)
                            }
                        } catch (err) {}
                    })
                    all_srcollBtoom(vm)
                }
            }).catch((err) => {
                vm.$vux.loading.hide()
            })
        }

    }
}

export default chat
