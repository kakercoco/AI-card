import request from '@/utils/request'

export function wxConfig () {
  // 企业微信配置
  return request({
    url: '/api/weworkapi/getConfigData',
    method: 'get'
  })
}

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

export function getPosterImg () {
  // 名片海报
  return request({
    url: '/api/employSet/getPosterImg',
    method: 'get'
  })
}

export function cardTagDelete (data) {
  // 删除名片上的标签
  return request({
    url: '/api/card/employ_tag_del',
    method: 'get',
    params: data
  })
}

export function cardTagInsert (data) {
  // 增加名片上的标签
  return request({
    url: '/api/card/set_employ_tag',
    method: 'post',
    data: data
  })
}

export function employgoodsIndex (data) {
  // 产品列表
  return request({
    url: '/api/employgoods/index',
    method: 'get',
    params: data
  })
}
