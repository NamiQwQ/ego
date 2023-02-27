<template>
  <div class="order">
    <Breadcrumb></Breadcrumb>
    <div class="list">


      <!-- 2. 列表展示 -->
      <div class='header'>
        <el-row :gutter="20">
          <el-col :span="14">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
              <el-form-item label="订单编号" label-width="100px">
                <el-input v-model="formInline.user" placeholder="输入品牌名称"></el-input>
              </el-form-item>
              <el-form-item label="预定时间" label-width="100px">
                <el-col :span="11">
                  <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1"
                    style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">至</el-col>
                <el-col :span="11">
                  <el-time-picker placeholder="选择时间" v-model="formInline.date2" style="width: 100%;"></el-time-picker>
                </el-col>
              </el-form-item>
              <el-form-item label="下单人" label-width="100px">
                <el-input v-model="formInline.user" placeholder="输入"></el-input>
              </el-form-item>
              <el-form-item label="所属单位" label-width="100px">
                <el-input v-model="formInline.user" placeholder="输入"></el-input>
              </el-form-item>
              <el-form-item label="汇总状态" label-width="100px">
                <el-select v-model="formInline.region" placeholder="全部">
                  <el-option label="全部" value="shanghai"></el-option>
                  <el-option label="未汇总" value="shanghai"></el-option>
                  <el-option label="已汇总" value="beijing"></el-option>
                </el-select>
              </el-form-item>

            </el-form>
          </el-col>
          <el-col :span="10">
            <el-button type="primary">查询</el-button>
          </el-col>
        </el-row>


      </div>

      <!-- 3. 订单列表按钮 -->
      <div class="header-btn">
        <el-button class="order-btn" type="warning" size="small">导出</el-button>
      </div>

      <!-- 4. 表格展示数据 -->
      <div class="list-content">
        <el-table :data="tableData" border style="width: 100%"
          :header-cell-style="{ background: '#fafafa', color: '#333', textAlgin: 'center' }"
          @selection-change="selectChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="orderNum" label="汇总单编号">
            <template slot-scope="scope">
              <span @click="OrderDecs(scope.row)" style="color:blue;cursor: pointer;">{{ scope.row.orderNum }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="operator" label="汇总人"></el-table-column>
          <el-table-column prop="phone" label="联系电话"></el-table-column>
          <el-table-column prop="time" label="汇总时间">
            <template slot-scope="scope">
              <span>{{ dayjs(scope.row.time).format('YYYY-MM-DD') }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="totalPrice" label="汇总单总价格"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" @click="closeCollect(scope.row)">撤销汇总</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 5. 分页 -->
      <Pagination :total="total" :pageSize="pageSize" @getPagination="getPagination"></Pagination>

    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getCollect, getCancel } from '@/api/order'
import dayjs from 'dayjs'
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      selectIds: [],//选择的ids
      tableData: [],
      total: 10,
      pageSize: 1,
      formInline: {
        user: '',
        region: ''
      }
    }
  },
  created() {
    this.getCollectList()
  },
  methods: {
    dayjs,
    //撤销汇总-----------------------------
    closeCollect(row) {
      this.$confirm('是否撤销该汇总订单, 是否继续?', '撤销汇总提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        getCancel({
          id: row.id
        }).then(res => {
          console.log('撤销汇总-----', res.data);
          if(res.data.status==200){
            //更新视图
            this.getCollectList()
              this.$message({
                type: 'success',
                message: '撤销汇总成功!'
              });
          }
        })
      
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    //点击进入订单详情----------------
    OrderDecs(row) {
      console.log('点击进入订单详情---');
    },
    //选择table-----------------------
    selectChange(selection) {
      let arr = []
      selection.forEach(ele => {
        arr.push(ele.id)
      });
      this.selectIds = arr;
      console.log('选择table----ids', this.selectIds);
    },

    //点击分页---------------------------------------------
    getPagination(page) {
      console.log(page);
      this.getorderList(page);
    },
    //获取汇总清单列表数据接口---------------------------------
    async getCollectList(page) {
      let res = await getCollect({ page })
      console.log('汇总清单列表数据-----', res.data);
      if (res.data.status === 200) {
        this.tableData = res.data.data;
        //页码
        this.pageSize = res.data.pageSize;
        this.total = res.data.total;
      } else {
        console.log('请求失败');
        this.tableData = []
        this.pageSize = 0;
        this.total = 1;
      }
    },
  }
}
</script>

<style lang="less" scoped>
.order {
  margin: 10px;
}

.list {
  background: #fff;
  padding: 20px;
  margin-top: 10px;
}

.header {
  margin-top: 20px;

  .el-form--inline .el-form-item {
    margin-right: 20px;
  }
}

.header-btn {
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid #eee;
  padding: 10px;

  .el-button {
    background: orange;
    border: none;
    width: 100px;
    font-weight: bold;
  }
}

.list-content {
  margin-top: 30px;
}
</style>