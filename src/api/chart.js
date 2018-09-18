import request from '@/utils/request'

export function getMyNums (data) {
  // 我的报表数据
  return request({
    url: '/api/EmploySet/getMyNums',
    method: 'get',
    params: data
  })
}

export function getMyChart () {
  // 我的报表图表
  return request({
    url: '/api/EmploySet/getMyNumsOne',
    method: 'get'
  })
}
