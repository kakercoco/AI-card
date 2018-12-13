import request from '@/utils/request'

export function getFormList (listQuery) {
  // 表单列表
  return request({
    url: '/ai/Form/getlist',
    method: 'get',
    params: {
      page: listQuery.page,
      limit: listQuery.limit,
      searchKey: listQuery.searchKey
    }
  })
}

export function getMessageFormList (listQuery) {
  // 留言列表
  return request({
    url: '/ai/Form/msgList',
    method: 'get',
    params: {
      id: listQuery.id,
      page: listQuery.page,
      limit: listQuery.limit
    }
  })
}

export function getMessageFormDetail (id) {
  // 留言表单详情
  return request({
    url: '/ai/Form/getForm?id=' + id,
    method: 'get'
  })
}
