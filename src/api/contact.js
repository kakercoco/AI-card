import request from '@/utils/request'

export function customerList (data) {
  // 客户列表
  return request({
    url: '/api/Customer/index',
    method: 'get',
    params: data
  })
}

export function customerTagList () {
  // 客户标签列表
  return request({
    url: '/api/Customertag/tagList',
    method: 'get'
  })
}

export function insertCustomerTag (data) {
  // 新增客户标签
  return request({
    url: '/api/Customertag/save',
    method: 'post',
    data: data
  })
}
