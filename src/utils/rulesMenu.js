/* 
定义的筛选路由的方法
   menuList 前端路由
   dyMenuList 后端路由

*/
import { cloneDeep } from 'lodash'
export function rulesMenu(menuList,dyMenuList){
    //前端：[{1,2,3},{2,3,4},{5,6}] 后端：[{1,2},{3,4}]
    //最终筛选符合后端条件的路由-----------
    let menu=[];
    //拷贝一个前端路由
    // const arr = [...menuList];//浅拷贝---不能用
    // const arr = JSON.parse(JSON.stringify(menuList));//深拷贝
    //推荐 loadsh插件--------- 
    // const arr = _.cloneDeep(menuList) //全局引入
    const arr = cloneDeep(menuList)//按需引用
    arr.forEach(one => {
        dyMenuList.forEach(two=>{
            if(one.meta.title === two.name){
                // menu.push(one)
                //注意：判断是否包含children=[]
                if(two.children && two.children.length>0){
                    //继续比较
                   one.children=rulesMenu(one.children,two.children)
                }
                //添加数组
                menu.push(one)
                
            }
        })
    });

    return menu;

}