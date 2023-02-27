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
    router 
    background-color="#112f50" 
    text-color="#fff"
    active-text-color="#ffd04b" 
    class="el-menu-vertical-demo"
     :collapse="isCollapse">
    <el-menu-item>
      <span slot="title">首客生鲜采购系统</span>
    </el-menu-item>

    <el-menu-item index="/">
      <i class="el-icon-menu"></i>
      <span slot="title">系统首页</span>
    </el-menu-item>
    <el-submenu index="/goods">
      <template slot="title">
        <i class="el-icon-s-cooperation
"></i>
        <span slot="title">产品管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/goods/list">产品列表</el-menu-item>
        <el-menu-item index="/goods/category">产品分类</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="/order">
      <template slot="title">
        <i class="el-icon-s-order"></i>
        <span slot="title">订单管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/order/list">订单列表</el-menu-item>
        <el-menu-item index="/order/collect">汇总清单</el-menu-item>
        <el-menu-item index="/order/auditing">订单审核</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="/advert">
      <template slot="title">
        <i class="el-icon-video-camera-solid"></i>
        <span slot="title">广告分类</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/advert/list">广告列表</el-menu-item>
        <el-menu-item index="/advert/list" disabled>分类管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="/system">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">系统管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/system/role">角色管理</el-menu-item>
        <el-menu-item index="/system/department">部门管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>

</template>

<script>
export default {
  props:['isCollapse'],
  methods:{
    activeMenu(){
      let route = this.$route;
      console.log(route);
      let {path,meta} = route;
      if(meta.activeMenu){
        return meta.activeMenu;
      }
      return path;
    }
  }
}
</script>

<style lang="less" scoped> 
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu .is-active{
    background: #1e78bf !important;
    color: #fff !important;
}
</style>