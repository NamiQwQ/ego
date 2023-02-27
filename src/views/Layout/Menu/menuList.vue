<template>
  <div>
    <!-- 
      导航路径：
        [{home},{goods:,children:[{},{},..]},{order,children:[{},{}]}]
      思路：
        1. 遍历获取的导航路由信息 
        2. 渲染的时候需要判断当前的导航路径是否由children 
          有children 长度>0 说明有二级或者多级导航 
          没有children属性  说明一级导航

     -->
    <template v-for="(item, index) in menulist">

      <el-submenu 
        :index="item.name"
        :key="index"
        v-if="(item.children && item.children.length>0)"
      >
        <template slot="title">
          <i class="el-icon-s-cooperation"></i>
          <span slot="title">{{item.meta.title}}</span>
        </template>
        <el-menu-item-group>
          <!-- 渲染二级导航 需要循环遍历  注意：递归组件   -->
          <menuList :menulist="item.children"></menuList>
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item
        :index="item.name"
        :key="(index +100)"
        v-else
        @click="tiao(item.name)"
        v-show="!item.meta.isShow"
      >
        <i class="el-icon-menu"></i>
        <span slot="title">{{item.meta.title}}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name:'menuList',
  props: ['menulist'],
  methods:{
    tiao(name){
      console.log(this.$router);
      this.$router.push({
        name
      })
    }
  },
  mounted() {
    console.log('menulistmenulistmenulist-----', this.menulist);
  }

}
</script>

<style>

</style>