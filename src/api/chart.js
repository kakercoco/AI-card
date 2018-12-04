import request from '@/utils/request'

export function getMyNums (data) {
  // 我的报表数据
  return request({
    url: '/ai/EmploySet/getMyNums',
    method: 'get',
    params: data
  })
}

export function getMyChart () {
  // 我的报表图表
  return request({
    url: '/ai/EmploySet/getMyNumsOne',
    method: 'get'
  })
}

//不在线
export function not_online (data) {
    // 我的报表图表
    return request({
        url: '/ai/Weworkapi/setWechatMessage',
        method: 'post',
        data:data
    })
}

//每条推送
export function one_chat (data) {
    return request({
        url: '/ai/Customerchat/save',
        method: 'post',
        data:data
    })
}



