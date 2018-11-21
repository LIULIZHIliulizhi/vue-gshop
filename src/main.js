// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {Button} from 'mint-ui'
import App from './App.vue'
import router from'./router'
import store from './store'
import TopHeader from './components/TopHeader/TopHeader.vue'
import './mock/mockServer'//mock 数据只要运行一次就可以 访问 模拟的接口地址 ，拦截发送的ajax请求 返回mock库模拟的数据

Vue.config.productionTip = false

//注册TopHearder全局组件
Vue.component('TopHeader',TopHeader)
Vue.component(Button.name, Button)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h=>h(App),
  router,
  store
})
