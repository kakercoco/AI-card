
const tab = {
    namespaced: true,
    state: {
        tabIndex:0,//天眼页面选择-时间-行为-个人
        active:0,//客户详情页面tab


    },
    mutations: {
        //首页tab切换
        index_change_tab:(state, data) => {
            state.tabIndex = data;
        },
        //客户详情页面tab切换
        client_change_active:(state, data) => {
            state.active = data;
        },

    },
    actions: {

    }
}

export default tab
