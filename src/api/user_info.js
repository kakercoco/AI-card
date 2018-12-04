import request from '@/utils/request'

export function get_user_info () {
    return request({
        url: '/ai/card/read',
        method: 'post',
    })
}


