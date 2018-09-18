import request from '@/utils/request'

// 初始化获取列表
export function init_list (data) {
    return request({
        url: '/api/Visit/index',
        method: 'get',
        params: data
    })
}