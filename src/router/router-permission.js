import router from './index'
import store from '@/store'
import { resetRouter } from  './index.js'
//导航全局前置守卫
router.beforeEach((to,from,next)=>{
    console.log('导航全局前置守卫---to----',to);
    //判断是否需要登录
    if(to.matched.length && !to.matched.some(item => item.meta.isLogin)){//不需要登录
        next()
    }else{//需要登录
        //判断是否需要登录 1. 判断是否已经登录了  2. 根据token 
        let token=store.state.login.userinfo.token;
        if(token){
            //判断是否有导航存储 vuex仓库里面  有进入 没有导航--获取动态导航
            if(store.state.menu.dyMenuList.length !=0){//有导航
                next()
            }else{
                //没有导航---获取导航
                store.dispatch('menu/getMenuList')
                .then(baseRoutes=>{
                    console.log('0000000000000000000000-',router);
                    resetRouter() // 重置路由
                    // router.addRoutes(baseRoutes);
                    baseRoutes.forEach(ele=>{
                        router.addRoute(ele)
                    })
                    console.log('11111111111111111');
                    // router.options.routes=baseRoutes;
                    // console.log('router------------',router);
                    // console.log('tototototo------------',to);
                    //调用next
                    //next({...to,replace:true}) 中断当前导航 执行新的导航
                    next({...to,replace:true});
                })
            }
          
        }else{
            next('/login')
        }
    }
})