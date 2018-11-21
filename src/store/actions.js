/**
 * Created by 29671 on 2018/11/19.
 */
import {
  reqAddress,
  reqFoodCategory,
  reqShops,
  reqUserInfo,
  reqLoginOut,
  reqShopGoods,
  reqShopRatings,
  reqShopInfo
}from '../api'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORY,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RESET_USER,
  RECEVICE_SHOPINFO,
  RECEIVE_SHOPRATINGS,
  RECEIVE_SHOPGOODS
}from './mutation-types';
export default {
  async getAddress({commit,state}){
    const {latitude,longitude} = state
    const result = await reqAddress(latitude,longitude)
    if(result.code === 0){
      const address = result.data
      commit(RECEIVE_ADDRESS,{address})
    }
  },
  async getFoodCategory({commit}){
    const result = await reqFoodCategory()
    if(result.code===0){
      const foodCategory = result.data
      commit( RECEIVE_CATEGORY,{categorys:foodCategory})
    }
  },
  async getShops({commit,state}){
    const {latitude,longitude} = state
    const result = await reqShops({latitude,longitude})
    if(result.code===0){
      const shops = result.data
      commit(RECEIVE_SHOPS,{shops})
    }
  },
  saveUser({commit},user){
    commit(RECEIVE_USER,{user})
  },
  async getUserInfo ({commit}) {
    const result = await reqUserInfo()
    if(result.code===0) {
      const user = result.data
      commit(RECEIVE_USER, {user})
    }
  },
  async logout({commit}){
    const result = await  reqLoginOut()
    if(result.code===0){
      commit(RESET_USER)
    }
  },
  async getShopGoods({commit}){
    const result = await reqShopGoods()
    if(result.code===0){
      const goods = result.data
      commit(RECEIVE_SHOPGOODS,{goods})
    }
  },
  async getShopRatings({commit}){
    const result = await reqShopRatings()
    if(result.code===0){
      const ratings = result.data
      commit(RECEIVE_SHOPGOODS,{ratings})
    }
  },
  async getShopInfo({commit}){
    const result = await reqShopInfo()
    if(result.code===0){
      const info = result.data
      commit(RECEIVE_SHOPGOODS,{info})
    }
  }
}
