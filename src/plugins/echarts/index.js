//封装echarts为vue插件
import Vue from "vue";
import * as echarts from "echarts";
//导入中国的js
// import 'echarts/map/js/china'
import "./map/js/china";
import "./map/js/world";
import country from "./country";

const install = function () {
  Object.defineProperties(Vue.prototype, {
    $myecharts: {
      get() {
        // return echarts//挂载所有的echarts
        //挂载使用的echarts方法
        return {
          //挂载echarts的绘图方法
          line(id, xData, yData) {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById(id));
            // 指定图表的配置项和数据
            var option = {
              grid: {
                //调整网格间距
                left: 0, //grid 组件离容器左侧的距离
                top: 10,
                bottom:20,
                containLabel: true, //grid 区域是否包含坐标轴的刻度标签
              },
              tooltip: {
                //提示框组件
                trigger: "axis", //触发类型
              },
              xAxis: {
                //x轴
                axisLine: {
                  lineStyle:{
                    color:'#999'
                  }
                },
                axisTick:{
                  alignWithLabel:true
                },
                axisLabel:{
                  fontSize:10,
                },
                data: xData,
                // data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
              },
              yAxis: {},
              series: [
                //系列列表。每个系列通过 type 决定自己的图表类型
                {
                  name: "销量",
                  type: "line", //bar 柱状图 line 折线图 pie饼图  map地图
                  data: yData,
                  // data: [5, 20, 36, 10, 10, 20],
                },
              ],
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
          },
          //挂载其他的图表绘制---地图
          //2. 中国地图
          chinaMap(id, data) {
            var myChart = echarts.init(document.getElementById(id));
            var option = {
              tooltip: {
                //悬浮弹框
                enterable: true, //鼠标是否可进入提示框浮层中，默认为false
                padding: 0,
                formatter:
                  '<div style="font-size:10px;line-height:20px;transform: scale(0.8);">{b}<br/>新增确诊{c}<hr/>详情</div>',
                // formatter:function(data){
                //   return data.name+':'+data.value
                // },
                // textStyle:{
                //   fontSize :8,
                //   lineHeight:30
                // }
              },
              visualMap: [
                //映射地图
                {
                  //映射高亮颜色
                  // orient: "horizontal", //如何放置 visualMap 组件，水平（'horizontal'）或者竖直（'vertical'）。
                  type: "piecewise", //piecewise离散  type: 'continuous', // 定义为连续型 visualMap
                  bottom: 0, //visualMap组件位置
                  // textGap: 4,
                  itemGap: 0, //间距
                  itemWidth: 6, //宽度
                  // itemHeight: 10,
                  // padding: 2,
                  textStyle: {
                    //文字配置
                    fontSize: 9,
                  },
                  pieces: [
                    // 配置颜色区间
                    {
                      min: 0,
                      max: 0,
                      color: "#FFFFFF",
                    },
                    {
                      min: 1,
                      max: 9,
                      color: "#FAEBD2",
                    },
                    {
                      min: 10,
                      max: 99,
                      color: "#E9A188",
                    },
                    {
                      min: 100,
                      max: 499,
                      color: "#D56355",
                    },
                    {
                      min: 500,
                      max: 999,
                      color: "#BB3937",
                    },
                    {
                      min: 1000,
                      max: 10000,
                      color: "#772526",
                    },
                    {
                      min: 10000,
                      color: "#480F10",
                    },
                  ],
                },
              ],
              series: [
                {
                  name: "省",
                  type: "map", //地图  bar  line  map
                  map: "china", //中国地图 需要引入地图china.js
                  roam: false, //
                  zoom: 1.2,
                  aspectScale: 0.75, //比例
                  layoutCenter: ["5%", "5%"], //
                  label: {
                    show: true,
                    fontSize: 8,
                  },
                  itemStyle: {
                    areaColor: "rgba(0,255,236,0)",
                    borderColor: "rgba(0,0,0,0.2)",
                  },
                  emphasis: {
                    itemStyle: {
                      // 选中的区域颜色及阴影效果等
                      areaColor: "rgba(255,180,0,0.8)",
                      shadowOffsetX: 0,
                      shadowOffsetY: 0,
                      shadowBlur: 20,
                      borderWidth: 0,
                    },
                  },
                  data,
                  // data: [
                  //     { name: '内蒙古', value: 200 },
                  //     { name: '北京', value: 800 },
                  //     { name: '青海', value: 50 },
                  // ]
                },
              ],
            };
            myChart.setOption(option);
          },
          //3. 世界地图
          worldMap(id, data) {
            var myChart = echarts.init(document.getElementById(id));
            var option = {
              tooltip: {
                //悬浮弹框
                triggerOn: "click", //提示框触发的条件
                enterable: true, //鼠标是否可进入提示框浮层中，默认为false
                formatter(item) {
                  //item=下面serves里面的data里面的每一项 //[{} ] data={} a b c d
                  return item.name + "：确诊人数" + item.value;
                },
              },
              visualMap: [
                {
                  //映射高亮颜色
                  orient: "vertical", //垂直
                  type: "piecewise", //离散
                  bottom: 0,
                  pieces: [
                    // 配置颜色区间
                    {
                      min: 0,
                      max: 0,
                      color: "#FFFFFF",
                    },
                    {
                      min: 1,
                      max: 10000,
                      color: "#FDFDCF",
                    },
                    {
                      min: 10000,
                      max: 100000,
                      color: "#FE9E83",
                    },
                    {
                      min: 100000,
                      max: 500000,
                      color: "#E55A4E",
                    },
                    {
                      min: 500000,
                      // max: 10000,
                      color: "#4F070D",
                    },
                  ],
                },
              ],
              series: [
                {
                  name: "国",
                  type: "map", //地图  bar  line  map
                  map: "world",
                  nameMap: country, //自定义地区的名称映射
                  roam: false,
                  zoom: 1.2,
                  aspectScale: 0.75,
                  top: 40,
                  layoutCenter: ["5%", "5%"],
                  label: {
                    normal: {
                      show: false,
                      textStyle: {
                        fontSize: 8,
                      },
                    },
                  },
                  itemStyle: {
                    normal: {
                      areaColor: "rgba(0,255,236,0)",
                      borderColor: "rgba(0,0,0,0.2)",
                    },
                    emphasis: {
                      // 选中的区域颜色及阴影效果等
                      areaColor: "rgba(255,180,0,0.8)",
                      shadowOffsetX: 0,
                      shadowOffsetY: 0,
                      shadowBlur: 20,
                      borderWidth: 0,
                    },
                  },
                  data,
                },
              ],
            };
            myChart.setOption(option);
          },

        };
      },
    },
  });
};

export default install;
