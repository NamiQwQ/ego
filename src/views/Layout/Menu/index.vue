<template>
  <!-- 
    el-menu
        background-color 背景颜色
        text-color       文字颜色
        active-text-color 高亮文字颜色
        default-active   默认打开的选中导航
        router           启动路由模式
        collapse	是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）	boolean	—	false

    el-submenu   下拉导航内容
        index="1"        导航标识  / router 启动路由模式  index路由路径

    el-menu-item-group 导航组合

    el-menu-item  导航的每一项内容 
    
   -->
  <el-menu 
    :default-active="activeMenu()" 
    background-color="#112f50" 
    text-color="#fff"
    active-text-color="#ffd04b" 
    class="el-menu-vertical-demo"
     :collapse="isCollapse">
    <el-menu-item>
      <span slot="title">首客生鲜采购系统</span>
    </el-menu-item>
    <menuList :menulist="dyMenuList"></menuList>
  </el-menu>

</template>

<script>
import { mapState } from 'vuex';
import menuList from './menuList.vue'
export default {
  props:['isCollapse'],
  components:{
    menuList
  },
  computed:{
    ...mapState('menu',['dyMenuList'])
  },
  mounted(){
    // console.log('dyMenuListdyMenuListdyMenuList----',this.dyMenuList);
  },
    methods:{
    activeMenu(){
      let route = this.$route;
      // console.log('activeMenuactiveMenuactiveMenuactiveMenu',route);
      let {name,meta} = route;
      if(meta.activeMenu){
        return meta.activeMenu;
      }
      return name;
    }
  }
}
</script>

<style lang="less" scoped> 
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
/deep/ .is-active{
    background: #1e78bf !important;
    color: #fff !important;
}
</style>