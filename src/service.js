import axios from 'axios';

const BASEURL = '/api';

function request (url, method = 'get', data = {}){
  let options = {
    url, 
    method,
    baseURL: BASEURL,
    params: method === 'get' ? data : {},
    data: data,
    headers: {
      'token': Cookies.get('token') || undefined,
    }
  };
  return new Promise((resolve, reject) => {
    axios(options).then(resp => {
      if(resp.status == 200) {
        resolve(resp.data);
      }
    }).catch(resp => {
      reject(resp.data)
    })
  })
}

/**
 * 登录
 * @param {*} params 
 */
export function loginRequest (params) {
  return request('/login', 'post', params)
}

/**
 * 查询订单列表
 * @param {*} params 
 */
export function queryOrderList(params) {
  return request('/bill/query', 'post', params);
}

/**
 * 订单详情
 * @param {*} params 
 */
export function queryOrderDetail(params) {
  return request('/bill/detail/query', 'post', params);
}

/**
 * 查询设备状态信息
 * @param {*} params
 */
export function queryDevStatus(params) {
  return request('/devStatus/query', 'post', params);
}