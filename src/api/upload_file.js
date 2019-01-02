import request from '@/utils/request'

export function upload_img (fd) {
    return request({
        url: '/api/Upload/index',
        method: 'post',
        data:fd
    })
}


