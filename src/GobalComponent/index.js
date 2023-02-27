import Vue from 'vue'

//导入echarts 
// import echarts from '@/plugins/echarts'
// Vue.use(echarts)


//注册全局组件
import Breadcrumb from '@/components/Breadcrumb'
Vue.component('Breadcrumb',Breadcrumb)



//导入全局的excel下载
import JsonExcel from 'vue-json-excel'
Vue.component('downloadExcel', JsonExcel)



//其他全局组件 




