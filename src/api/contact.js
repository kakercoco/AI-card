import request from '@/utils/request'

export function customerList (data) {
  return request({
    url: '/api/Customer/index',
    method: 'get',
    params: data
  })
}
