import request from '@/utils/request'

export function addOrEditTask (data) {
  // 新增或编辑任务
  return request({
    url: '/ai/calendar/save',
    method: 'post',
    data: data
  })
}

export function getTaskList (listQuery) {
  // 任务列表
  return request({
    url: '/ai/calendar/getlist',
    method: 'get',
    params: {
      start_time: listQuery.start_time,
      end_time: listQuery.end_time,
      type: listQuery.type
    }
  })
}

export function deleteTask (data) {
  // 删除任务
  return request({
    url: '/ai/calendar/remove',
    method: 'post',
    data: data
  })
}

export function getTaskDetail (id) {
  // 任务详情
  return request({
    url: '/ai/calendar/getInfo?id=' + id,
    method: 'get'
  })
}

export function getCalendarDays (time) {
  // 当月有任务日期数组集合
  return request({
    url: '/ai/Calendar/getCalendarDays?month=' + time,
    method: 'get'
  })
}

export function signCompletedTask (listQuery) {
  // 完成任务
  return request({
    url: '/ai/calendar/finish',
    method: 'get',
    params: {
      id: listQuery.id,
      status: listQuery.status
    }
  })
}

export function signStarTask (listQuery) {
  // 标星任务
  return request({
    url: '/ai/Calendar/star',
    method: 'get',
    params: {
      id: listQuery.id,
      star: listQuery.star
    }
  })
}
