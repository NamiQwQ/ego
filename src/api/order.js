//订单接口
// host:'http://localhost:9898',
import axios from '@/request/request'

//接口列表

//订单列表
export const orderlist='/api/order/list'
//订单汇总
export const changeStatus='/api/order/changeStatus'
//订单详情
export const detail='/api/order/list/detail'
//汇总清单
export const collect='/api/order/collect'
//撤销汇总
export const cancel='/api/order/cancel'




//封装网络请求方法
//订单列表
function orderList(params){
    return axios.get(orderlist,{params})
}
//订单汇总params={ids:1,2,3}
function setChangeStatus(params){
    return axios.get(changeStatus,{params})
}
//订单详情
function getDetail(){
    return axios.get(detail)
}
//汇总清单
function getCollect(params){
    return axios.get(collect,{params})
}
//撤销汇总
function getCancel(params){
    return axios.get(cancel,{params})
}

//导出方法
export {
    orderList,
    setChangeStatus,
    getDetail,
    getCollect,
    getCancel
}