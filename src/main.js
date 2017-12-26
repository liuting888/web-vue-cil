// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.


import Vue from 'vue'

import Flexible from 'lib-flexible'

//http://mint-ui.github.io/docs/#/zh-cn2
import MintUI from 'mint-ui'

import 'mint-ui/lib/style.css'
import {Indicator} from 'mint-ui';

import App from './App'
import router from './router'

import api from "@/services/api"
import utils from "@/services/utils"

//https://www.kancloud.cn/yunye/axios/234845
import axios from 'axios'

Vue.prototype.axios = axios
Vue.prototype.api = api
Vue.prototype.utils = utils

Vue.use(MintUI)
//按需加载mintUI组件
import {InfiniteScroll} from 'mint-ui';
Vue.prototype.MintUI=MintUI
// let num = 0;
Vue.use(InfiniteScroll);
// 添加请求拦截器


axios.defaults.timeout = 10000;
axios.interceptors.request.use(function (config) {

  // 在发送请求之前做些什么
  let head = config.data.head || {}
  config.data.head = {}
  for (let key in head) {
    config.data.head[key] = head[key]
  }
  config.data.head.accessToken = utils.getQueryString('token');

  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
});
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // Indicator.close();
  // 响应数据处理
  if (response.data.head.respCode == '-100') { // 用户token不可用
    window.location.href = "#/login";
  }
  if (response.data.head.respStatus != '00') { // 统一错误信息提示
    MintUI.Toast({
      message: response.data.head.respDesc,
      position: 'bottom',
    });
  }
  return response;
}, function (error) {
  Indicator.close();
  // 响应错误处理
  MintUI.Toast({
    message: '加载失败',
    position: 'center',
  });
  return Promise.reject(error)
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
