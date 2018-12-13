import request from '@/utils/request'
export function get_list () {
    return request({
        url: '/ai/Dc/workList',
        method: 'get'
    })
}

export function save (data) {

    return request({
        url: '/ai/Dc/saveWorkChoose',
        method: 'post',
        data
    })
}