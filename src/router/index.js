/**
 * Created by 29671 on 2018/11/17.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Msite from '../pages/msite/Msite.vue'
import Order from '../pages/order/Order.vue'
import Search from '../pages/search/Search.vue'
import Profile from '../pages/profile/Profile.vue'
import Login from '../pages/Login/Login.vue'
import Shop from  '../pages/shop/Shop.vue'
import ShopGoods from '../pages/shop/ShopGoods/ShopGoods.vue'
import ShopInfo from '../pages/shop/ShopInfo/ShopInfo.vue'
import ShopRatings from '../pages/shop/ShopRatings/ShopRatings.vue'
Vue.use(VueRouter)
export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/msite',
      component:Msite,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        showFooter: true
      }
    },
    { path: '/login',
       component: Login
    },
    {
      path: '/shop',
      component:Shop,
      children:[
        {
          path:'/shop/goods',
          component:ShopGoods
        },
        {
          path:'/shop/info',
          component:ShopInfo
        },
        {
          path:'/shop/ratings',
          component:ShopRatings
        },
        {
          path:'',
          redirect:'/shop/goods'
        }
      ]
    },
    {
      path: '/',
      redirect: '/msite',
      meta: {
        showFooter: true
      },
    }
  ]
})
