
//产品管理
import GoodsManage from '@/views/GoodsManage'
import List from '@/views/GoodsManage/List'
import Category from '@/views/GoodsManage/Category'
//订单管理
import OrderManage from '@/views/OrderManage'
import OrderList from '@/views/OrderManage/List'
import Collect from '@/views/OrderManage/Collect'
import Auditing from '@/views/OrderManage/Auditing'
import AddGoods from '@/views/GoodsManage/List/AddGoods.vue'
//广告管理
import Advert from '@/views/Advert'
import AdvertList from '@/views/Advert/List'

//系统管理
import SystemManage from '@/views/SystemManage'
import department from '@/views/SystemManage/department'
import role from '@/views/SystemManage/role'

export const menuList=[
  { 
    path:'/goods',
    name:'goods',
    component:GoodsManage,
    meta:{
      title:"产品管理"
    },
    redirect:'/goods/list',
    children:[
      {
        path:'list',
        name:'list',
        component:List,
        meta:{
          title:"产品列表"
        },
      },
      {
        path:'category',
        name:'category',
        component:Category,
        meta:{
          title:"产品分类"
        },
      },
      {
        path:'addgoods',
        name:"addgoods",
        component:AddGoods,
        //路由元信息
        meta:{
          isShow:true,
          activeMenu:'list',
          title:"添加商品"
        }
      }
    ]

  },
  { 
    path:'/order',
    name:'order',
    component:OrderManage,
    redirect:'/order/list',
    meta:{
      title:"订单管理"
    },
    children:[
      {
        path:'list',
        name:'orderlist',
        component:OrderList,
        meta:{
          title:"订单列表"
        },
      },
      {
        path:'collect',
        name:'collect',
        component:Collect,
        meta:{
          title:"汇总清单"
        },
      },
      {
        path:'auditing',
        name:'auditing',
        component:Auditing,
        meta:{
          title:"订单审核"
        },
      }
    ]
  },
  { 
    path:'/advert',
    name:'advert',
    component:Advert,
    redirect:'/advert/list',
    meta:{
      title:"广告分类"
    },
    children:[
      {
        path:'list',
        name:'advertlist',
        component:AdvertList,
        meta:{
          title:"广告列表"
        },
      }
    ]

  },
  { 
    path:'/system',
    name:'system',
    component:SystemManage,
    redirect:'/system/role',
    meta:{
      title:"系统管理"
    },
    children:[
      {
        path:'role',
        name:'role',
        component:role,
        meta:{
          title:"角色管理"
        },
      },
      {
        path:'department',
        name:'department',
        component:department,
        meta:{
          title:"部门管理"
        },
      }
    ]

  },
]

