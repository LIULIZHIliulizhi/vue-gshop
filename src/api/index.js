/**
 * Created by 29671 on 2018/11/19.
 * 包含有多个发送ajax 函数的模块
 */
import ajax from './ajax'
const BASE = '/api'
export const reqAddress = (latitude,longitude)=> ajax(BASE+`/position/${latitude},${longitude}`)
export const reqFoodCategory = () => ajax(BASE+'/index_category');
export const reqShops = ({latitude,longitude})=>ajax(BASE+'/shops',{latitude,longitude});
export const reqSendCode = (phone)=>ajax(BASE + '/sendcode',{phone});
export const reqPwdLogin = ({name,pwd,captcha})=>ajax(BASE + 'login_pwd',{name,pwd,captcha},'POST')
export const reqSmsLogin = (phone,code)=>ajax(BASE + 'login_sms',{phone,code},'POST');
export const reqUserInfo = ()=>ajax(BASE +'/userinfo')
export const reqLoginOut = ()=>ajax(BASE + 'logout')
