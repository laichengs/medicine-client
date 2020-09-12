import request from '@/utils/request'

export function getRecords(params) {
  return request({
    url: '/records',
    method: 'get',
    params
  })
}

export function getRefundRecords(params) {
  return request({
    url: '/refund_records',
    method: 'get',
    params
  })
}

export function getMoneyRecords(params) {
  return request({
    url: '/money_records',
    method: 'get',
    params
  })
}

export function getMoney(params) {
  return request({
    url: '/money',
    method: 'get',
    params
  })
}
export function setVisitedDate(params) {
  return request({
    url: '/set_visited',
    params
  })
}
export function updateOrder(params) {
  return request({
    url: '/order',
    params
  })
}
