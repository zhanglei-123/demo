import axios from 'axios';
import router from './router/index';

function request (url, method, params){
  let options = {
    url, 
    method,
    headers: {
      'token': Cookies.get('token') || undefined,
    }
  };
  if(method === 'post' || method === 'put'){
    if(params) {
      options['data'] = JSON.stringify(params);
    }
  } else {
    if(params) {
      options['params'] = params;
    }
  }
  return new Promise((resolve, reject) => {
    axios(options).then(resp => {
      if(resp && resp.status === 401){
        Cookies.remove('token');
        router.push({ name: 'Login' });
      } else {
        resolve(resp.data);
      }
    }).catch(resp => {
      reject(resp)
    })
  })
}

function http(func, data){
  var params = {
    request: data,
    func
  }
  return new Promise((resolve, reject) => {
    request('', '', params).then(data => {
      resolve(data);
    }).catch(reject)
  })
}