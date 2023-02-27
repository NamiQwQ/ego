## 项目介绍

1. 介绍  
   生鲜后台管理系统界面

2. 前端工作范围：

   1. pc 前端界面 （消费者用户）
   2. 移动端
   3. 小程序
   4. PC 后端界面 （商家用户 收费的---权限）

3. 项目制作
   1. 一般情况下 进入企业（项目已经搭建完毕 不会从零搭建 git 仓库拉取代码）
   2. 开发对应的模块功能
   3. 开发过程中-- 产品原型（墨刀等） 和 需求文档（world 文档等）
   4. 前后端交互 （接口联调） -- 接口连接网址 /postman 接口

## 项目搭建

1. 开启后端导入数据库操作
2. 搭建项目
   vue 全家桶技术

### 项目安装依赖

1. vue create vue-purhase
2. npm i axios -S
3. npm i querystring -S
4. npm i echarts -S
5. vue add element

### 后端服务

1. 技术：nodejs+mysql +mock
2. npm i express -S
3. npm i cors -S
4. npm i mockjs -S /npm install mockjs
5. npm i mysql -S

## 项目初始化

1. 删除无用的组件
2. css 初始化
3. iconfont 图标
4. axios 请求二次封装

## 项目搭建路由配置

1. layout 布局
2. login 登录

## 日期处理格式

1. moment.js
2. dayjs

   1. 安装
      npm install dayjs --save
   2. 导入模块
      import dayjs from 'dayjs'

   3. 使用 dayjs
      ```js
      dayjs().format(); // 2020-09-08T13:42:32+08:00
      dayjs().format("YYYY-MM-DD"); // 2020-09-08
      dayjs().format("YYYY-MM-DD HH:mm:ss"); // 2020-09-08 13:47:12
      dayjs(1318781876406).format("YYYY-MM-DD HH:mm:ss"); // 2011-10-17 00:17:56
      ```

## echarts 图表工具

1. 安装
   npm i echarts -S
2. 使用 echarts
   1. 全局 main.js 引入 所有组件使用
   2. 开发成 vue 插件使用 Vue.use(xx)
   3. 组件内直接使用

## 富文本编译器

1. 百度编译
2. wangEditor

   1. 介绍
      wangEditor 开源 Web 富文本编辑器,开箱即用,配置简单
   2. 网址
      https://www.wangeditor.com/

3. 安装

   ```js
        yarn add @wangeditor/editorc
        或者 npm install @wangeditor/editor --save

        yarn add @wangeditor/editor-for-vue
        或者 npm install @wangeditor/editor-for-vue --save
   ```

4. 模板使用

   ```vue
   <template>
     <div style="border: 1px solid #ccc;">
       <Toolbar
         style="border-bottom: 1px solid #ccc"
         :editor="editor"
         :defaultConfig="toolbarConfig"
         :mode="mode"
       />
       <Editor
         style="height: 500px; overflow-y: hidden;"
         v-model="html"
         :defaultConfig="editorConfig"
         :mode="mode"
         @onCreated="onCreated"
       />
     </div>
   </template>
   ```

5. script 使用

   ```js
       <script>
           import Vue from 'vue'
           import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

           export default Vue.extend({
               components: { Editor, Toolbar },
               data() {
                   return {
                       editor: null,
                       html: '<p>hello</p>',
                       toolbarConfig: { },
                       editorConfig: { placeholder: '请输入内容...' },
                       mode: 'default', // or 'simple'
                   }
               },
               methods: {
                   onCreated(editor) {
                       this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
                   },
               },
               mounted() {
                   // 模拟 ajax 请求，异步渲染编辑器
                   setTimeout(() => {
                       this.html = '<p>模拟 Ajax 异步设置内容 HTML</p>'
                   }, 1500)
               },
               beforeDestroy() {
                   const editor = this.editor
                   if (editor == null) return
                   editor.destroy() // 组件销毁时，及时销毁编辑器
               }
           })
           </script>
   ```

6. 修改配置

7. 常用方法

## vuex 数据持久化

1. 安装
   vuex-persistedstate

2. vuex 做插件使用

   ```js
   import createPersistedstate from "vuex-persistedstate";
   export default new Vuex.Store({
     modules: {
       goods,
     },
     plugins: [
       createPersistedstate({
         key: "goods",
         paths: ["goods"],
       }),
     ],
   });
   ```

## Normalize.css
1. 介绍
   Normalize.css 只是一个很小的CSS文件，但它在默认的HTML元素样式上提供了跨浏览器的高度一致性。相比于传统的CSS reset，Normalize.css是一种现代的、为HTML5准备的优质替代方案

2. 我们创造normalize.css有下面这几个目的：
   保护有用的浏览器默认样式而不是完全去掉它们
   一般化的样式：为大部分HTML元素提供
   修复浏览器自身的bug并保证各浏览器的一致性
   优化CSS可用性：用一些小技巧
   解释代码：用注释和详细的文档来
   Normalize.css支持包括手机浏览器在内的超多浏览器，同时对HTML5元素、排版、列表、嵌入的内容、表单和表格都进行了一般化。尽管这个项目基于一般化的原则，但我们还是在合适的地方使用了更实用的默认值。


3. 安装
   cnpm i normalize.css -S 

   
## 导出excel 
1. 安装模块
   npm install vue-json-excel -S 

2. 配置使用
   ```js 
      import JsonExcel from 'vue-json-excel'
      Vue.component('downloadExcel', JsonExcel)
   ```
3. 使用
   ```vue
       <download-excel 
         style="display:inline-block;margin-left:10px;"
         :data="DetailsForm" 
         :fields="json_fields" 
         :header="title"
         :name="title">
          <el-button class="order-btn" type="warning" size="small" @click="download">导出</el-button>
        </download-excel>
   ```

## vue-pdf 
1. 安装
   参考网址： https://github.com/FranckFreiburger/vue-pdf
   gitee网址：https://gitee.com/huojiefuren/vue-pdf 

   npm install --save vue-pdf

2. 使用
   ```vue
      <template>
         <pdf src="./static/relativity.pdf"></pdf>
      </template>

      <script>
         import pdf from 'vue-pdf'

         export default {
         components: {
            pdf
         }
      }
       </script>

   ```

3. 打印


## vue-i18n (国际化)
1. 安装
   npm install vue-i18n@8.x -S 

2. 使用配置语言
   



## 用户权限
1. 功能：根据用户登录身份不同 看到的左侧导航目录不同
2. 登录后 获取用户权限 
3. 路由权限显示
   前端路由（完整的路由）:[{1,2,3},{1,2},{3,4}]
   后端路由（部门的路由）:[{1,2},{3,4}]




## lodash.js 
1. 安装
   npm i --save lodash -S

2. 使用
   ```js
      全局使用
      import _ from lodash
      按需使用
      import { 要使用的函数 } from lodash
   ```


## 项目打包
1. 打包模式
   1. 自动化部署项目 

   2. 手动打包
      npm run build 

2. 开发环境
   研发环境-本地环境（development）
   测试环境(test)
   生产环境-线上环境（production）


3. 配置环境变量




