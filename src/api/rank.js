import request from '@/utils/request'

export function getRankList (listQuery) {
  let data = {
    day: listQuery.day,
    page: listQuery.page,
    pagesize: listQuery.pagesize
  }
  // 每日排行
  return request({
    url: '/ai/rank',
    method: 'POST',
    data
  })
}

export function getRankDetail (eid) {
  let data = {
    eid: eid
  }
  // 排行详细
  return request({
    url: '/ai/rank/chart',
    method: 'POST',
    data
  })
}

export function getMyRank () {
  // 用户排名
  return request({
    url: '/ai/rank/myrank',
    method: 'get'
  })
}
