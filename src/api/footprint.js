import request from '@/utils/request'

// 初始化获取时间
export function init_list (data) {
    return request({
        url: '/ai/Visit/index',
        method: 'get',
        params: data
    })
}

