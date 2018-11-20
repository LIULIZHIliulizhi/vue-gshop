/**
 * Created by 29671 on 2018/11/19.
 * 包含有多个发送ajax 函数的模块
 */
import ajax from './ajax'
const BASE = '/api'
export const reqAddress = (latitude,longitude)=> ajax(BASE+`/position/${latitude},${longitude}`)
export const reqFoodCategory = () => ajax(BASE+'/index_category')
export const reqShops = ({latitude,longitude})=>ajax(BASE+'/shops',{latitude,longitude})
