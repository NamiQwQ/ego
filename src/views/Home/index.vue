<template>
  <div class="home">
    <!--1.  顶部区域布局---------- -->
    <div class="header">
      <div class="item">
        <!-- 总销售额 -->
        {{$t('home.totalmoney')}}
        <div class='num'>{{ objCount.payTotal | num }}</div>
        <div class="bottom">今日销售额 :{{ objCount.pay | num }}</div>
      </div>
      <div class="item">
        <!-- 总访问量 -->
        {{$t('home.totalviews')}}
        
        <div class='num'>{{ objCount.viewsTotal | num }}</div>
        <div class="bottom">今日访问量:{{ objCount.views | num }}</div>
      </div>
      <div class="item">总收藏量
        <div class='num'>{{ objCount.collectTotal | num }}</div>
        <div class="bottom">今日收藏:{{ objCount.collect | num }}</div>
      </div>
      <div class="item">总支付量
        <div class='num'>{{ objCount.saleTotal | num }}</div>
        <div class="bottom">今日支付量:{{ objCount.sale | num }}</div>
      </div>
    </div>

    <!--2. 访问数据统计 ----------------->
    <div class="content">
      <div class="time-info" id='box13'>
        <div class="title">月销售额</div>
        <div id="main" style="width: 100%; height: 300px"></div>
      </div>
      <div class="area" id="box1">产品销售比例
        <div id="main2" style="width: 100%; height: 300px"></div>
      </div>
    </div>


    <!-- 3.  -->
    <!-- 最新内容 -->
    <div class="home-footer">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>今日订单</span>
        </div>
        <div class="text item">
          <el-row>
            <el-col :span="8">
              <div class="title">今日订单数</div>
              <div>{{list.curOrderCount}}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">汇总确认订单</div>
             <div>{{list.curCollect}}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">累计金额</div>
             <div>{{list.curMoney}}</div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>本月订单</span>
        </div>
        <div class="text item">
          <el-row>
            <el-col :span="8">
              <div class="title">本月订单数</div>
              <div>{{list.orderCount}}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">汇总确认订单</div>
             <div>{{list.collect}}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">累计金额</div>
             <div>{{list.money}}</div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>快捷入口</span>
        </div>
        <div class="text item">
          <el-button type="primary">产品管理</el-button>
          <el-button>消息管理</el-button>
          <el-button>内容管理</el-button>
        </div>
      </el-card>
    </div>

  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  data() {
    return {
      objCount: {},
      list:{},
    }
  },
  filters: {
    num(val) {
      if (!val) return '';
      return val.toLocaleString();
    }
  },
  mounted() {
    //获取顶部统计数据信息---------------------
    this.getHomeCount();
    //绘制折线图-----------------------
    this.getHomeFormat();
    // this.line();
    //绘制饼图---------------------
    // this.pie();

    //获取订单数据-----------
    this.getHomeOrder();

  },
  methods: {
    //订单数据——----------------
    async getHomeOrder(){
      let res = await this.$api.getHomeOrder()
      console.log('订单数据——-----',res.data);
      this.list = res.data.list;
    },  
    //-获取绘制折线图----------------------------------
    async getHomeFormat() {
      let res = await this.$api.getHomeFormat()
      console.log('-获取绘制折线图--------', res.data.result.data.sale_money);
      let arr = res.data.result.data.sale_money;
      //声明变量存储x轴 y轴数据
      let xData = [], yData = [], yBarData = [], pieData = [];
      arr.forEach(ele => {
        xData.push(ele.name)
        yData.push(ele.total_amount)
        yBarData.push(ele.num)
        //获取对象结构存储饼图数据-----
        let obj = {}
        obj.name = ele.name;
        obj.value = ele.total_amount;
        pieData.push(obj)
      });
      //绘制折线图---动态数据---------------
      this.line(xData, yData, yBarData);

      //绘制饼图--动态数据-------[{name:'',value:''},{}]----
      this.pie(pieData)


    },
    //-获取顶部统计数据信息----------------------------------------
    async getHomeCount() {
      let res = await this.$api.getHomeCount()
      console.log(res.data.data.list);
      this.objCount = res.data.data.list;
    },
    //-----------------------------------------
    line(xData, yData, yBarData) {
      var chartDom = document.getElementById('main');
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        legend: {
          data: ['销售额', '销售量']
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          // boundaryGap: false,
          axisTick: {
            alignWithLabel: true
          },
          // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          data: xData
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: '销售额',
            data: yData,
            // data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
          },
          {
            name: '销售量',
            data: yBarData,
            // data: [80, 32, 91, 34, 190, 130, 120],
            type: 'bar',
            smooth: true
          }
        ]
      };

      option && myChart.setOption(option);

    },
    //饼图--------------------------
    pie(data) {
      var chartDom = document.getElementById('main2');
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        title: {
          // text: 'Referer of a Website',
          // subtext: 'Fake Data',
          // left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '销售额',
            type: 'pie',
            radius: '50%',
            data,
            // data: [
            //   { value: 1048, name: 'Search Engine' },
            //   { value: 735, name: 'Direct' },
            //   { value: 580, name: 'Email' },
            //   { value: 484, name: 'Union Ads' },
            //   { value: 300, name: 'Video Ads' }
            // ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };

      option && myChart.setOption(option);
    }

  }
}
</script>

<style lang="less" scoped>
.home {
  margin: 10px;
}

.header {
  display: flex;
  padding-right: 30px;

  .item {
    flex: 1;
    height: 100px;
    padding: 10px;
    background: #fff;
    border-radius: 10px;
    margin-left: 20px;
    margin-right: 20px;
    font-weight: bold;
    color: #fff;
    // text-align: center;
    position: relative;

    .num {
      font-size: 22px;
      margin: 10px;
      color: #fff;
    }

    .bottom {
      position: absolute;
      border-top: 1px solid rgb(246, 245, 245);
      padding: 10px 20px;
      bottom: 0;
      right: 0;
      left: 0;
      color: #fff;
      font-weight: normal;
    }
  }

  .item:nth-child(1) {
    background-image: linear-gradient(#df887d, #88554d);
  }

  .item:nth-child(2) {
    background-image: linear-gradient(#409eff, #2e556e);
  }

  .item:nth-child(3) {
    background-image: linear-gradient(#b54fa8, #713c7a);
  }

  .item:nth-child(4) {
    background-image: linear-gradient(#1cd2f1, #39717a);
  }
}

// 图表

.content {
  margin: 20px;
  display: flex;
  height: 320px;

  .time-info {
    flex: 2;
    background: #fff;
    margin-right: 20px;
    padding: 10px;
  }

  .area {
    flex: 1;
    background: #fff;
    padding: 10px;
  }
}

//内容

.home-footer {
  display: flex;
  padding-left: 20px;
  margin-bottom: 20px;

  .box-card {
    flex: 1;
    margin-right: 30px;

    span {
      font-weight: 600;
    }
  }
  .item{
    text-align: center;
    font-size: 24px;
    color: #333;
    .el-col{
      border-right: 1px solid #eee;

    }
    .el-col:last-child{
      border-right: none;
    }
    .title{
      margin-bottom: 10px;
      font-size: 14px;
    }
  }
}
</style>