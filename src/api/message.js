import request from '@/utils/request'

export function get_users (data) {
    return request({
        url: '/ai/user/getInfoUser',
        method: 'post',
        data
    })
}

//获取消息列表
export function get_list () {
    return request({
        url: '/ai/Customerchat/index',
        method: 'get',
    })
}

//已读
export function look (data) {
    return request({
        url: '/ai/Customerchat/read',
        method: 'get',
        params:data
    })
}