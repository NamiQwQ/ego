<template>
    <el-dialog title="查看合同内容" :visible="dialogVisible" width="70%" @close="close">
        <!-- 
        属性：
            src='' pdf路径地址
            page  显示第几页
            $event 获取当前的pdf文件事件对象  
            @num-pages="pageCount = $event"     总页码
			@page-loaded="currentPage = $event" 当前页码
        -->
        <!-- 1. 展示pdf文件  -->
        <!-- <p>{{ currentPage }}/{{ pageCount }}</p> -->
        <!-- <pdf src="/sxt.pdf"   @num-pages="pageCount = $event" @page-loaded="currentPage = $event"></pdf> -->
        <!-- 2. 展示所有pdf -->
        <!-- <pdf v-for="i in numPages" :key="i" :src="src" :page="i" style="display: inline-block; width: 25%"></pdf> -->
        <!-- 3. 结合分页展示pdf -->
        <!-- <p>{{currentPage}} /{{numPages}}</p> -->
        <Pagination :pageSize="1" :total="numPages" @getPagination="getPagination"></Pagination>
        <el-button @click="print">打印合同</el-button>
        <br/><br/>
        <pdf ref="mypdf" :src="src" :page="currentPage"></pdf>

        
    </el-dialog>

</template>

<script>
import pdf from 'vue-pdf'
import Pagination from '@/components/Pagination'
var loadingTask = pdf.createLoadingTask('/sxt.pdf');
export default {
    props: ['dialogVisible'],
    components: {
        pdf,
        Pagination
    },
    data() {
        return {
            src:loadingTask,
            pageCount: 0,//总页码数
            currentPage: 1,//当前页码
            numPages:''
            // dialogVisible:false
        }
    },
    mounted() {
        this.src.promise.then(pdf => {
            this.numPages = pdf.numPages;
        });
    },
    methods: {
        //打印合同-------------
        print(){
            this.$refs.mypdf.print();
        },
        //分页-------------
        getPagination(num){
            this.currentPage = num;
        },
        //关闭
        close() {
            console.log('关闭弹框');
            //通知父组件修改变量--传递给子组件--- 
            this.$emit('changeDialog')
        }
    }
}
</script>

<style>

</style>