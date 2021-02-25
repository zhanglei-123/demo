import axios from 'axios';

const BASEURL = '/api';

function request (url, data = {}, method = 'post') {
  let options = {
    url: url,
    method: method,
    baseURL: BASEURL,
    params: method === 'get' ? data: {},
    data: data,
    headers: {
      'token': Cookies.get('token') || undefined
    }
  };
  return new Promise((resolve, reject) => {
    axios(options).then(resp => {
      if(resp.status == 200) {
        resolve(resp.data);
      }
    }).catch(resp => {
      reject(resp.data);
    })
  })
}

/**
 * 登录
 * @param {*} params 
 */
export function loginRequest(params) {
  return request('/login', params)
}

/**
 * 查询订单列表
 * @param {*} params beginTime endTime billCode terminalAddr 
 */
export function queryOrderList(params) {
  return request('/bill/query', params);
}

/**
 * 订单详情
 * @param {*} params 
 */
export function queryOrderDetail(params) {
  return request('/bill/detail/query', params);
}

/**
 * 查询设备状态信息
 * @param {*} params ctrlAddr devType gunCode workStatus
 */
export function queryDevStatus(params) {
  return request('/devStatus/query', params);
}

/**
 * 充电控制
 * @param {*} params ctrlAddr devType gunCode operationType
 */
export function ctrlCharge(params) {
  return request('/charge/ctrl', params);
}