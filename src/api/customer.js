import request from '@/utils/request'

export function customerRead (data) {
  // （客户详情）资料读取
  return request({
    url: '/ai/Customer/read',
    method: 'get',
    params: data
  })
}

export function customerSetTurnover (data) {
  // （客户详情）成交率设置
  return request({
    url: '/ai/Customer/setTurnover',
    method: 'post',
    data: data
  })
}

export function customerSetTurnoverDate (data) {
  // （客户详情）成交日期设置
  return request({
    url: '/ai/Customer/setTurnoverDate',
    method: 'post',
    data: data
  })
}

export function customerUpdate (data) {
  // （客户详情）资料更新
  return request({
    url: '/ai/Customer/update',
    method: 'post',
    data: data
  })
}

export function customerEdit (data) {
  // （客户详情）资料获取
  return request({
    url: '/ai/Customer/edit',
    method: 'get',
    params: data
  })
}

export function customerTag (data) {
  // （客户详情）客户标签
  return request({
    url: '/ai/Customertag/index',
    method: 'get',
    params: data
  })
}

export function followCreate () {
  // 跟进记录添加（常用术语）
  return request({
    url: '/ai/Follow/create',
    method: 'get'
  })
}

export function followSave (data) {
  // 跟进记录添加（常用术语）
  return request({
    url: '/ai/Follow/save',
    method: 'post',
    data: data
  })
}

export function visitIndex (data) {
  // 指定客户互动
  return request({
    url: '/ai/Visit/index',
    method: 'post',
    params: data
  })
}

export function followIndex (data) {
  // 指定客户跟进记录
  return request({
    url: '/ai/Follow/index',
    method: 'post',
    data
  })
}

export function setBirthdayAdd (data) {
  // 同步客户生日
  return request({
    url: '/ai/Calendar/setBirthdayAdd',
    method: 'post',
    data: data
  })
}

export function birthdayDell (data) {
  // 删除同步客户生日
  return request({
    url: '/ai/Calendar/birthdayDell',
    method: 'post',
    data: data
  })
}
