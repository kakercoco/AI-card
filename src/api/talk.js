import request from '@/utils/request'

export function talkGroup (data) {
  // 话术分组
  return request({
    url: '/api/Category/index',
    method: 'get',
    params: data
  })
}

export function talkList (data) {
  // 话术列表
  return request({
    url: '/api/Verbal/index',
    method: 'get',
    params: data
  })
}

export function talkSave (data) {
  // 新增话术
  return request({
    url: '/api/Verbal/save',
    method: 'post',
    data: data
  })
}

export function talkDelete (data) {
  // 删除话术
  return request({
    url: '/api/Verbal/delete',
    method: 'post',
    data: data
  })
}

export function talkEdit (data) {
  // 编辑话术详情
  return request({
    url: '/api/Verbal/edit',
    method: 'get',
    params: data
  })
}

export function talkUpdate (data) {
  // 编辑话术详情
  return request({
    url: '/api/Verbal/update',
    method: 'post',
    data: data
  })
}
