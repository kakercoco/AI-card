import request from '@/utils/request'

// 初始化获取列表
export function init_list (data) {
  return request({
    url: '/ai/Dynamic/index',
    method: 'get',
    params: data
  })
}

// 点赞
export function click_good (data) {
  return request({
    url: '/ai/dynamic/praise',
    method: 'get',
    params: data
  })
}

export function to_comment (data) {
  return request({
    url: '/ai/comment/save',
    method: 'post',
    data: data
  })
}

// 发布
export function to_release (data) {
  return request({
    url: '/ai/dynamic/save',
    method: 'post',
    data: data
  })
}

//公司详情
export function to_companyDetails (data) {
    return request({
        url: '/ai/Dynamic/read',
        method: 'get',
        params: data
    })
}

//动态详情
export function dynamic_details (data) {
    return request({
        url: '/ai/Dynamic/read',
        method: 'get',
        params: data
    })
}

//删除评论
export function del_comment (data) {
    return request({
        url: '/ai/Comment/delete',
        method: 'post',
        data: data
    })
}

//删除动态
export function del_dynamic (data) {
    return request({
        url: '/ai/dynamic/delete',
        method: 'post',
        data: data
    })
}