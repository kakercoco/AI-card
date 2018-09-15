import request from '@/utils/request'

export function calendarSave (data) {
  // 新建日程
  return request({
    url: '/api/calendar/save',
    method: 'post',
    data: data
  })
}

export function calendarList (data) {
  // 日程列表
  return request({
    url: '/api/calendar/index',
    method: 'get',
    params: data
  })
}

export function calendarType () {
  // 日程列表类型
  return request({
    url: '/api/calendar/getType',
    method: 'get'
  })
}

export function calendarRead (data) {
  // 日程详情
  return request({
    url: '/api/calendar/read',
    method: 'get',
    params: data
  })
}
