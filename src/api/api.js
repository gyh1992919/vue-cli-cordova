/**
 * Created by Administrator on 2018/5/11.
 */

import Vue from 'vue'
import Axios from 'axios'
import VueRouter from '../router'

const host = process.env.NODE_ENV === 'production' ? '' : 'https://coupon.test.mihutime.com/'

Axios.defaults.baseURL = host
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

Axios.interceptors.response.use(response => {
  return response;
}, err => {
  if(err.response.status === 401) {
    VueRouter.push('/login')
  }
  return Promise.reject(err);
})

Vue.prototype.$http = Axios
