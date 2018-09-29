
const chat = {
    namespaced: true,
    state: {
        char_list:[],
        img_list:[],
        my_chat_room_id:'',

    },
    mutations: {
        SET_my_chat_room_id:(state, id) => {
            state.my_chat_room_id = id
        },

        HIDE_loading:(state, id) => {
            for (let i = 0; i < state.char_list.length;i++){
                if (state.char_list[i].id === id){
                    state.char_list[i].is_loading = false;
                    break;
                }
            }
        },
        PUSH_char_list:(state, data)=>{
            state.char_list.push(data);
        },

        PUSH_img_list:(state, data)=>{
            state.img_list.push(data);
        }

    },
    actions: {

    }
}

export default chat
