//存储动态路由导航------------
//导入api接口
import { permission } from "@/api/index";
//导入前端定义好的完整路由信息---
import { menuList } from "@/router/menuList";
//导入方法--筛选路由
import { rulesMenu } from "@/utils/rulesMenu";
//导入基本的路由配置layout布局容器
import router, { baseRoutes } from "@/router/index";
import {cloneDeep} from 'lodash'
export default {
  namespaced: true,
  state: {
    dyMenuList: [], //动态导航路由
  },
  getters: {},
  mutations: {
    //设置动态路由
    setMenuList(state, payload) {
      state.dyMenuList = payload;
    },
    //清空动态路由
    deleteMenuList(state) {
      state.dyMenuList = [];
    },
  },
  actions: {
    //定义获取路由的网络请求方法
    getMenuList({ commit, state, rootState }) {
      console.log("rootState", rootState);
      return new Promise((resolve, reject) => {
        permission({
          token: rootState.login.userinfo.token,
        }).then((res) => {
          console.log("----后端返回的动态路由------", res.data.data);
          console.log("----前端定义的完整路由------", menuList);
          //比较前后端路由文件---筛出来符合后端接口的路由配置文件----
          let menus = rulesMenu(menuList, res.data.data);
          console.log("------筛出来符合后端接口的路由配置文件-----", menus);
          console.log("获取基本的路由layout-----", baseRoutes);//[{layout,children:[{home}]}]
          let arr = cloneDeep(baseRoutes)
          //合并路由导航
          let routes = arr[0].children; //获取layout布局里面的children=[ {home组件},]
          //添加动态获取的匹配好的路由 layout=[ path: '/',component: Layout,children:[{home组件}，{产品管理},{订单管理},...]]
          routes.push(...menus);//
          console.log("获取基本的路由layout-----", arr); //baseRoutes=layout=[ path: '/',component: Layout,children:[{home组件}，{产品管理},{订单管理},...]]
          console.log("合并路由导航    -----routes", routes);//[{home组件}，{产品管理},{订单管理},...]]
          
          //存储动态路由--vuex仓库
          commit("setMenuList", routes);//[{home组件}，{产品管理},{订单管理},...]
          console.log("合并路由导航结束   -----routes", routes);
          //路由合并
          /* 
            router.addRoutes 已废弃：使用 router.addRoute() 代替 
              router.addRoutes(routes: Array<RouteConfig>)
              动态添加更多的路由规则。参数必须是一个符合 routes 选项要求的数组
          */
          // router.addRoutes(baseRoutes);
          //添加
          //  router.options.routes.push(baseRoutes)
          //  console.log(router)
          resolve(arr)

        });
      });
    },
  },
};
