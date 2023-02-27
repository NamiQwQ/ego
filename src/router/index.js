import Vue from 'vue'
import VueRouter from 'vue-router'
//点击跳转同一个路径
// 在VueRouter上配置路由跳转，在router中的index.js中加上以下代码，注意加在use之前
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
    return routerPush.call(this, location).catch(err => {})
};



Vue.use(VueRouter)
import Layout from '@/views/Layout'
import Login from '@/views/Login'
import Home from '@/views/Home'





export const baseRoutes=[
  {
    path: '/',
    component: Layout,
    meta:{
      isLogin:true,
      title:"首页"
    },
    children:[
      {
        path:'/',
        name:'home',
        component:Home,
        meta:{
          title:"首页"
        },
      },
      //{},{}
      
    ]
  },
  // {
  //   //404 
  // }
]

export const routes = [
  {
    path:'/login',
    name:'login',
    component:Login
  }
]

const createRouter  =() => new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
/* 
解决：退出登录再登录后 控制台路由命名重复警告问题

发现自己的name并没有重名,那么一般是后台动态路由导致的报错警告。动态路由一般来说是通过后端接口返回拿到数据，然后在路由守卫router.beforeEach 中进行添加。
addRoutes 方法仅仅是帮你注入新的路由，并没有帮你剔除其它路由。

*/

const router = createRouter()
export function resetRouter () {
const newRouter = createRouter()
router.matcher = newRouter.matcher // the relevant part
}



export default router
