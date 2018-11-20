/**
 * Created by 29671 on 2018/11/19.
 */
import  axios from 'axios'
export default function ajax(url,data={},method= 'GET'){
  return new Promise((resolve,reject)=>{
    let promise// 定义一个变量来存储发送ajax请求返回的响应
    if(method=== 'GET'){
      let queryStr = ''
      Object.keys(data).forEach(key=>{
        const value = data[key]
        queryStr += `${key}=${value}&`
      })
      if(queryStr !== ''){
        queryStr = queryStr.substring(0,queryStr.length-1)
        url += '?'+ queryStr
      }
      promise = axios.get(url)
    }else {
      promise = axios.post(url,data)
    }
    promise
      .then(response=>{
        resolve(response.data)
      })
      .catch(err=>{
        reject(err)
      })
  })
}
