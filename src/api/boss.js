import request from '@/utils/request'

// Boss雷达-总览
export function bossOverview (listQuery) {
  return request({
    url: 'api/boss/index',
    method: 'GET',
    params: {
      dept: listQuery.dept,
      active: listQuery.active,
      time_type: listQuery.time_type,
      user_type: listQuery.user_type
    }
  })
}

// Boss雷达-总览-总数
export function bossOverviewTotal (listQuery) {
  return request({
    url: 'api/boss/index_data',
    method: 'GET',
    params: {
      dept: listQuery.dept,
      time_type: listQuery.time_type
    }
  })
}

// Boss雷达-总览-客户统计
export function customerStatistics (listQuery) {
  return request({
    url: 'api/boss/index_user',
    method: 'GET',
    params: {
      dept: listQuery.dept,
      type: listQuery.type,
      user_type: listQuery.user_type
    }
  })
}

// Boss雷达-AI分析
export function AIAnalyse (listQuery) {
  return request({
    url: 'api/boss/index',
    method: 'GET',
    params: {
      dept: listQuery.dept,
      active: listQuery.active
    }
  })
}
// Boss雷达-AI分析详情
export function AIAnalyseDetail (listQuery) {
  return request({
    url: 'api/boss/read',
    method: 'GET',
    params: {
      type: listQuery.type,
      date_type: listQuery.date_type
    }
  })
}
// Boss雷达-销售排行
export function salesRanking (listQuery) {
  return request({
    url: 'api/boss/index',
    method: 'get',
    params: {
      dept: listQuery.dept,
      active: listQuery.active,
      user_type: listQuery.user_type,
      interaction: listQuery.interaction,
      probability_type: listQuery.probability_type,
      interaction_time: listQuery.interaction_time
    }
  })
}
