import request from '@/utils/request'

export function get_user_info () {
    return request({
        url: '/api/card/read',
        method: 'post',
    })
}


