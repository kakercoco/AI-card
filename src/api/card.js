import request from '@/utils/request'

export function wxConfig (url) {
  const data = {
    url: url
  }
  // 企业微信配置
  return request({
    url: '/ai/weworkapi/getConfigData',
    method: 'post',
    data
  })
}

export function cardRead () {
  // 我的名片详情
  return request({
    url: '/ai/card/read',
    method: 'get'
  })
}

export function updateCard (data) {
  // 编辑名片详情
  return request({
    url: '/ai/card/update',
    method: 'post',
    data: data
  })
}

export function produceList (data) {
  // 编辑名片详情
  return request({
    url: '/ai/Scratch/webClient',
    method: 'post',
    data: data
  })
}

export function getPosterImg () {
  // 名片海报
  return request({
    url: '/ai/employSet/getPosterImg',
    method: 'get'
  })
}

export function cardTagDelete (data) {
  // 删除名片上的标签
  return request({
    url: '/ai/card/employ_tag_del',
    method: 'post',
    data: data
  })
}

export function cardTagInsert (data) {
  // 增加名片上的标签
  return request({
    url: '/ai/card/set_employ_tag',
    method: 'post',
    data: data
  })
}

export function employgoodsIndex (data) {
  // 产品列表
  return request({
    url: '/ai/employgoods/index',
    method: 'get',
    params: data
  })
}

export function employgoodsSave (data) {
  // 推荐产品
  return request({
    url: '/ai/employgoods/save',
    method: 'post',
    data: data
  })
}

export function employgoodsDetele (data) {
  // 取消推荐产品
  return request({
    url: '/ai/employgoods/delete',
    method: 'post',
    data: data
  })
}

export function employcaseIndex (data) {
  // 案例列表
  return request({
    url: '/ai/employcase/index',
    method: 'get',
    params: data
  })
}

export function employcaseSave (data) {
  // 推荐案例
  return request({
    url: '/ai/employcase/save',
    method: 'post',
    data: data
  })
}

export function employcaseDetele (data) {
  // 取消推荐案例
  return request({
    url: '/ai/employcase/delete',
    method: 'post',
    data: data
  })
}

export function webClient (data) {
  // 产品分类
  return request({
    url: '/ai/Scratch/webClient',
    method: 'post',
    data: data
  })
}
// 上传录音
export function uploadMedia (data) {
  // 推荐产品
  return request({
    url: '/ai/upload/uploadAudio?media_id=' + data,
    method: 'get'
  })
}
