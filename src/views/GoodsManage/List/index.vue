<template>
  <div class="list">
    <!-- 面包屑 -->
    <Breadcrumb></Breadcrumb>
    <!-- 1. 搜索区域 -->
    <!-- el-form
            :inline="true" 开启行内表单 
            :model="formInline"  表单数据 
            size="small"      表单大小
     -->
    <div class="header">
      <div class="search">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
          <el-form-item label="产品名称">
            <el-input v-model="formInline.name" placeholder="产品名称"></el-input>
          </el-form-item>
          <el-form-item label="添加时间">
            <el-date-picker v-model="formInline.time" type="date" placeholder="选择日期">
            </el-date-picker>
            <!-- <el-input v-model="formInline.user" placeholder="添加的时间"></el-input> -->
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch">查询</el-button>
          </el-form-item>
        </el-form>

      </div>
      <div class="add-goods">
        <el-button type="warning" icon="el-icon-plus" size="mini" @click="addGoods">添加商品</el-button>
        <el-button type="danger" size="mini" icon="el-icon-delete" @click="batchDelete">批量删除</el-button>
      </div>
    </div>

    <!-- 2. 表格  -->
    <div class="list-table">
      <el-table :data="tableData" border style="width: 100%;" :header-row-style="{ color: '#333', textAlgin: 'center' }"
        @selection-change="changeTable">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="id" label="商品编号" width="100">
        </el-table-column>
        <el-table-column prop="title" label="商品名称" width="180" show-overflow-tooltip>
          <template slot-scope="scope">
              <span @click="goodsDesc(scope.row)" style="color:blue;cursor: pointer;">{{scope.row.title}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="商品价格" width="100">
        </el-table-column>
        <el-table-column prop="category" label="商品类目" width="100">
        </el-table-column>
        <el-table-column prop="create_time" label="添加时间" width="180" show-overflow-tooltip>
          <!--prop="create_time"  prop获取列字段标识/template  slot-scope="scope"当前作用域下 scope获取当前行的数据信息 -->
           <template slot-scope="scope">
          {{ dayjs(scope.row.create_time).format('YYYY-MM-DD HH:mm:ss') }} 
          </template>
        </el-table-column>
        <el-table-column prop="sellPoint" label="商品卖点" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="descs" label="商品描述" show-overflow-tooltip>
          <template slot-scope="scope">
            {{removeHTMLTag(scope.row.descs)}}
            <!-- <span v-html="scope.row.descs"></span> -->
        </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)"> 编辑
            </el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)">
              删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 3. 分页器 -->
    <Pagination :total="total" :pageSize="pageSize" @getPagination="getPagination"></Pagination>

  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
// import Breadcrumb from '@/components/Breadcrumb'
import dayjs from 'dayjs'
import { mapMutations } from 'vuex'
import {removeHTMLTag} from '@/utils/index'
export default {
  components: {
    Pagination,
    // Breadcrumb
  },
  data() {
    return {
      formInline: {
        name: '',
        time: ''
      },
      tableData: [],
      total: 100,
      pageSize: 1,
      listTotal: [],//搜索查询的所有的数据集合
      searchStatus: false,//查看状态打开了
      ids: [],//存储选中的id号
      currentPage:1,

    }
  },
  created() {
    //获取产品列表数据----------------------------
    this.getGoodsList(1)
  },
  methods: {
    dayjs,
    //导入store仓库
    ...mapMutations('goods', ['changeTitle', 'changeGoods']),
    removeHTMLTag,
    //商品详情页---------------------------------
    goodsDesc(row){
      this.changeTitle('详情')
      this.$router.push('/goods/addgoods')
      this.changeGoods(row);
    },
    //批量删除商品------------------
    batchDelete() {
      //接口 batchDelete
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('批量删除商品---------', this.ids);
        //执行删除操作----------------------------
        let ids = this.ids.join(',');
        console.log('----ids----', ids);
        this.deleteAllGoods(ids)

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });


    },
    //选择表格------------------------
    changeTable(selection) {
      console.log('selection----', selection);
      let arr = [];
      selection.forEach(ele => {
        arr.push(ele.id)
      });
      this.ids = arr;
    },
    //批量删除商品接口-------------------
    async deleteAllGoods(ids) {
      let res = await this.$api.batchDelete({ ids })
      console.log(res.data);
      if(res.data.status===200){
        //更新视图
        this.getGoodsList(this.currentPage)
         this.$message({
            type: 'success',
            message: '删除成功!'
          });
      }else{
        this.$message.error('删除成功');
      }
     
    },
    //添加商品--------------------------------
    addGoods() {
      this.changeTitle('添加')
      this.$router.push('/goods/addgoods')
    },
    //获取点击的页码-------------------------------
    getPagination(page) {
      // console.log('----',page);
      this.currentPage=page;
      if (this.searchStatus) {//点击了查询按钮---搜索数据---再点击分页
        //0-7  8 -15  page=1 2 3 
        console.log(page);
        this.tableData = this.listTotal.slice((page - 1) * 8, page * 8)
        return;
      }
      //默认产品列表的分页功能
      this.getGoodsList(page)

    },
    //获取产品列表数据-------------------------------
    async getGoodsList(page) {
      let res = await this.$api.getGoodsList({ page })
      console.log('获取产品列表数据--------', res.data);
      if (res.data.status === 200) {
        let arr = res.data.data;
        //处理数据格式--------------- 
        // arr.forEach(ele=>{
        //   // console.log(ele);
        //   ele.descs=removeHTMLTag(ele.descs);
        //   ele.create_time = dayjs(ele.create_time).format('YYYY-MM-DD HH:mm:ss')
        // })
        this.tableData =arr;
        //分页数据
        this.total = res.data.total
        this.pageSize = res.data.pageSize
      }
    },
    //搜索查询按钮-------------------------------
    onSearch() {
      console.log(this.formInline.name);
      if (!this.formInline.name) {
        this.$message.error('请输入信息再去搜索');
        return '';
      }
      this.$api.getGoodsSearch({ search: this.formInline.name })
        .then(res => {
          console.log('搜索查询按钮----', res.data);
          //查询--需要判断是否有数据
          if (res.data.status === 200) {
            //获取所有的数据
            this.listTotal = res.data.result;
            //渲染页面的
            if (res.data.result.length > 8) {
              this.tableData = res.data.result.slice(0, 8);
              //修改分页状态
              this.searchStatus = true;
            } else {
              this.tableData = res.data.result
            }
            this.pageSize = 8;
            this.total = res.data.result.length;
          } else {
            this.tableData = [];
            // this.pageSize=8;
            this.total = 0;
          }
        })

    },
    //编辑-------------------------------·····-
    /* 
      1. 点击编辑按钮 获取当前的row这一行的数据信息
      2. 跳转到编辑组件（添加商品组件同一个组件） 数据传递和title 
      3. vuex存储 数据传递和title 
      4. 获取vuex里面的mutations 修改title 和 更新最新的当前行的数据 
    */
    handleEdit(index, row) {
      console.log(index, row);
      this.changeTitle('编辑')
      this.changeGoods(row);
      this.$router.push('/goods/addgoods')
    },
    //删除--------------------------------------
    handleDelete(index, row) {
      console.log(index, row.id);
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //执行删除操作------------------------
        this.deleteGoods(row.id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //删除单个商品接口----------------------
    async deleteGoods(id) {
      let res = await this.$api.deleteGoods({ id })
      console.log('删除单个商品接口---', res.data);
      if (res.data.status === 200) {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        //更新视图-------------------------
        this.getGoodsList(1)
      } else {
        console.log('删除失败');
        this.$message.error('删除失败');
      }

    },


  }
}
</script>

<style lang="less" scoped>
.list {
  padding: 10px;

  .header {
    background: #fff;
    padding: 10px;
    margin-top: 10px;
    .search {
      padding-bottom: 20px;

      .el-form-item {
        margin-bottom: 0;
      }
    }

    .add-goods {
      background: #fff;
      padding: 10px;
      border: 1px solid #eee;
    }
  }


  .list-table {
    margin-top: 20px;

    /deep/ .cell {
      text-align: center;
    }
  }
}
</style>