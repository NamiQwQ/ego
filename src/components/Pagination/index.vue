<template>
  <div class="pagination">
    <!-- 
        el-pagination
            :current-page 选中的当前页数
            :page-sizes="[10, 20, 30, 40]" 每页显示个数选择器的选项设置
            :total="400"  total	总条目数	number
            :page-size    每页显示条目个数   10
            layout="total, sizes, prev, pager, next, jumper" 组件布局，子组件名用逗号分隔
                total 总页码  sizes每页多少条数据 

     -->
    <el-pagination
     @current-change="getPagination"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
    props:{
        pageSize:{
            type:Number,
            default:10
        },
        total:{
            type:Number,
            default:100
        }
    },
    data(){
        return {
            currentPage:1
        }
    },
    methods:{
        getPagination(current){
            // console.log(current);
            this.$emit('getPagination',current)
        }
    }
}
</script>

<style lang="less" scoped>
.pagination{
    padding: 10px;
    background: #fff;
    text-align: left;
}
</style>