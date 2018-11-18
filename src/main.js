// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from'./router'
import TopHeader from './components/TopHeader/TopHeader.vue'
Vue.config.productionTip = false


//注册TopHearder全局组件
Vue.directive(TopHeader)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h=>h(App),
  router
})