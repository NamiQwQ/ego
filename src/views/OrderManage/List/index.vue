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
        <el-button class="order-btn" type="warning" size="small" @click="orderCollect">订单汇总</el-button>
        <download-excel 
         style="display:inline-block;margin-left:10px;"
         :data="DetailsForm" 
         :fields="json_fields" 
         :header="title"
         :name="title">
          <el-button class="order-btn" type="warning" size="small" @click="download">导出</el-button>
        </download-excel>
      </div>

      <!-- 4. 表格展示数据 -->
      <div class="list-content">
        <el-table :data="tableData" border style="width: 100%"
          :header-cell-style="{ background: '#fafafa', color: '#333', textAlgin: 'center' }"
          @selection-change="selectChange">
          <el-table-column type="selection" width="55" :selectable="selectFun">
          </el-table-column>
          <el-table-column prop="code" label="订单编号">
            <template slot-scope="scope">
              <span @click="OrderDecs(scope.row)" style="color:blue;cursor: pointer;">{{ scope.row.code }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ordername" label="下单人"></el-table-column>
          <el-table-column prop="company" label="所属单位"></el-table-column>
          <el-table-column prop="phone" label="联系电话"></el-table-column>
          <el-table-column prop="yudingTime" label="预定时间">
            <template slot-scope="scope">
              <span>{{ dayjs(scope.row.yudingTime).format('YYYY-MM-DD') }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="订单总价格"></el-table-column>
          <el-table-column prop="huizongStatus" label="汇总状态">
            <template slot-scope="scope">
              <span v-if="scope.row.huizongStatus == 1">未汇总</span>
              <span v-else>已汇总</span>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 5. 分页 -->
      <Pagination :total="total" :pageSize="pageSize" @getPagination="getPagination"></Pagination>

      <!-- 6. 抽屉显示--订单详情 -->
      <el-drawer title="订单详情" :visible.sync="drawer" :direction="direction" :size="size" :modal="false">
        <orderDesc></orderDesc>
      </el-drawer>

    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { orderList, setChangeStatus } from '@/api/order'
import orderDesc from './orderDesc.vue'
import dayjs from 'dayjs'
import { val } from 'dom7'
export default {
  components: {
    Pagination,
    orderDesc
  },
  data() {
    return {
      DetailsForm:[],//导出的数据容器
      json_fields:{
        // "订单编号":"code",
        //数字处理--
        "订单编号":{
          field:"code",
          callback:value=>{
            return '&nbsp;'+value;
          }
        },
        "下单人":"ordername",
        "所属单位":"company",
        "联系电话":"phone",
        "预定时间":"yudingTime",
        "订单总价格":"price",
        "汇总状态":"huizongStatus"

      },//配置表格标题字段对应文字
      title:"首客生鲜采购订单表格",
      drawer: false,
      size: '',
      direction: 'rtl',
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
    this.getorderList()
  },
  mounted() {
    let width = document.documentElement.clientWidth;
    console.log(width);
    this.size = width - 200 - 10 + 'px';
  },
  methods: {
    dayjs,
    //导出表格=---------------
    download(){
      let arr=[...this.tableData];
      arr.forEach(ele=>{
        ele.yudingTime = dayjs(ele.yudingTime).format('YYYY-MM-DD');
        ele.huizongStatus = ele.huizongStatus==1?'未汇总':"已汇总";
      })
      this.DetailsForm=arr;
    },
    //点击进入订单详情----------------
    OrderDecs(row) {
      this.drawer = true;
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
    //订单汇总-----------------------------------
    /* 
      1. 必须选择表格有选中的行  才可以订单汇总
      2. 判断selectIds是否有数据存储  
      3. 汇总
    */
    orderCollect() {
      if (this.selectIds.length > 1) {
        this.$confirm('温馨提示：确认是否需要提交所选内容', '汇总确认', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
          .then(() => {
            let ids = this.selectIds.join(',')
            this.setOrderChangeStatus(ids)
          })
          .catch(action => {
            this.$message({
              type: 'info',
              message: '放弃提交汇总'
            })
          });
      } else {
        this.$message.error('请选择订单编号至少两个进行订单汇总');
      }

    },
    //禁用选择按钮---已汇总状态值------------
    selectFun(row, index) {
      if (row.huizongStatus == 2) {
        return false;
      } else {
        return true;
      }
    },
    //点击分页---------------------------------------------
    getPagination(page) {
      console.log(page);
      this.getorderList(page);
    },
    //获取订单列表数据接口---------------------------------
    async getorderList(page) {
      let res = await orderList({ page })
      console.log('订单列表-----', res.data);
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
    //订单汇总接口--------------------------
    async setOrderChangeStatus(ids) {
      let res = await setChangeStatus({ ids })
      console.log('订单汇总接口----', res.data);
      if (res.data.status === 200) {
        this.$message({
          message: '恭喜你，汇总订单成功',
          type: 'success'
        });
        //更新视图
        this.getorderList()
      } else {
        this.$message.error('错了哦，汇总订单成功失败');
      }

    }
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