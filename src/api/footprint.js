import request from '@/utils/request'

// 初始化获取时间
export function init_list (data) {
    return request({
        url: '/api/Visit/index',
        method: 'get',
        params: data
    })
}


//初始化互动列表
export function init_Interaction (data) {
    return request({
        url: '/api/Visit/index',
        method: 'get',
        params: data
    })
}
