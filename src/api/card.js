import request from '@/utils/request'

export function cardRead () {
  // 我的名片详情
  return request({
    url: '/api/card/read',
    method: 'get'
  })
}

export function updateCard (data) {
  // 编辑名片详情
  return request({
    url: '/api/card/update',
    method: 'post',
    data: data
  })
}

export function produceList (data) {
  // 编辑名片详情
  return request({
    url: '/api/Scratch/webClient',
    method: 'post',
    data: data
  })
}
