/**
 * Created by 29671 on 2018/11/19.
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORY,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_SHOPGOODS,
  RECEIVE_SHOPRATINGS,
  RECEVICE_SHOPINFO
}from './mutation-types'
export default {
  [RECEIVE_ADDRESS](state,{address}){
    state.address = address
  },
  [RECEIVE_CATEGORY](state,{categorys}){
    state.categorys = categorys
  },
  [RECEIVE_SHOPS](state,{shops}){
    state.shops = shops
  },
  [RECEIVE_USER](state,{user}){
    state.user = user
  },
  [RESET_USER](state){
    state.user = {}
  },
  [RECEIVE_SHOPGOODS](state,{goods}){
    state.goods = goods
  },
  [RECEVICE_SHOPINFO](state,{info}){
    state.info = info
  },
  [RECEIVE_SHOPRATINGS](state,{ratings}){
    state.info = ratings
  },
}
