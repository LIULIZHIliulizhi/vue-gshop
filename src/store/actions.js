/**
 * Created by 29671 on 2018/11/19.
 */
import {
  reqAddress,
  reqFoodCategory,
  reqShops
}from '../api'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORY,
  RECEIVE_SHOPS
}from './mutation-types'
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
  }
}
