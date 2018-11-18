/**
 * Created by 29671 on 2018/11/17.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Msite from '../pages/msite/Msite.vue'
import Order from '../pages/order/Order.vue'
import Search from '../pages/search/Search.vue'
import Profile from '../pages/profile/Profile.vue'

Vue.use(VueRouter)
export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/msite',
      component:Msite
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/order',
      component: Order
    },
    {
      path: '/profile',
      component: Profile
    },
    {
      path: '/',
      redirect: '/msite'
    }
  ]
})
