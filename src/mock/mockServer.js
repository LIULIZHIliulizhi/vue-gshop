/**
 * Created by 29671 on 2018/11/21.
 */
import Mock from'mockjs'
import data from'./data.json'// webapck在打包会自动解析成对应的js对象/数组
Mock.mock('/info',{code:0,data:data.info});
Mock.mock('/ratings',{code:0,data:data.ratings});
Mock.mock('/goods',{code:0,data:data.goods});
