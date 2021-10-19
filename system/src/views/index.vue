<template>
  <div>
    <div class="ly-index">
      <div class="ly-index-header">
        <div>
          <p>后台项目</p>
          <p>mall</p>
        </div>
        <div>
          <p>前端项目</p>
          <p>mall-admin-web</p>
        </div>
        <div>
          <p>学习教程</p>
          <p>mall</p>
        </div>
        <div>
          <p>今日订单总数</p>
          <p>200</p>
        </div>
        <div>
          <p>今日销售总额</p>
          <p>200</p>
        </div>
        <div>
          <p>昨日销售总额</p>
          <p>200</p>
        </div>
      </div>
      <div class="ly-pending">
        <div class="ly-padding-title">待处理事务</div>
        <div class="ly-padding-content">
          <div>
            <div>代付款订单</div>
            <div>(10)</div>
          </div>
          <div>
            <div>已完成订单</div>
            <div>(10)</div>
          </div>
          <div>
            <div>待确认收货订单</div>
            <div>(10)</div>
          </div>
          <div>
            <div>待发货订单</div>
            <div>(10)</div>
          </div>
          <div>
            <div>新缺货登记</div>
            <div>(10)</div>
          </div>
          <div>
            <div>待处理退款申请</div>
            <div>(10)</div>
          </div>
          <div>
            <div>已发货订单</div>
            <div>(10)</div>
          </div>
          <div>
            <div>待处理退货订单</div>
            <div>(10)</div>
          </div>
          <div>
            <div>广告位即将到期</div>
            <div>(10)</div>
          </div>
        </div>
      </div>
      <div class="ly-look">
        <div>
          <div class="ly-padding-title">商品总览</div>
          <div class="ly-look-info">
            <div>
              <p>100</p>
              <p>已下架</p>
            </div>
            <div>
              <p>100</p>
              <p>已上架</p>
            </div>
            <div>
              <p>100</p>
              <p>库存紧张</p>
            </div>
            <div>
              <p>100</p>
              <p>全部商品</p>
            </div>
          </div>
        </div>
        <div>
          <div class="ly-padding-title">用户总览</div>
          <div class="ly-look-info">
            <div>
              <p>100</p>
              <p>已下架</p>
            </div>
            <div>
              <p>100</p>
              <p>已上架</p>
            </div>
            <div>
              <p>100</p>
              <p>库存紧张</p>
            </div>
            <div>
              <p>100</p>
              <p>全部商品</p>
            </div>
          </div>
        </div>
      </div>
      <div class="ly-count">
        <div class="ly-padding-title">订单统计</div>
        <div class="ly-count-content">
          <div class="ly-count-left">
            <div>
              <p>本月订单数</p>
              <p>10000</p>
              <p>
                <span>+10%</span>
                <span>同比上月</span>
              </p>
            </div>
            <div>
              <p>本周订单数</p>
              <p>10000</p>
              <p>
                <span>+10%</span>
                <span>同比上周</span>
              </p>
            </div>
            <div>
              <p>本月销售额</p>
              <p>10000</p>
              <p>
                <span>+10%</span>
                <span>同比上月</span>
              </p>
            </div>
            <div>
              <p>本周销售额</p>
              <p>10000</p>
              <p>
                <span>+10%</span>
                <span>同比上周</span>
              </p>
            </div>
          </div>
          <div class="ly-count-fight">
            <div class="block">
              <el-date-picker
                v-model="value2"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </div>
            <div id="main">

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value1: "",
      value2: "",
      token:''
    };
  },
  mounted(){
    this.token = localStorage.getItem("token");
this.echartsInit();
this.API.getIndexInfo().then(e=>{
})
  },
  methods: {
    echartsInit() {
              var myChart = echarts.init(document.getElementById('main'));
var option;
     option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
 
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: [320, 332, 301, 334, 390, 330, 320]
        },
    ]
};

      myChart.setOption(option);
    }
  }
};
</script>

<style lang="less" scoped>
.ly-index {
  padding: 20px 80px 20px;
}
.ly-index-header {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  grid-gap: 20px;
  > div {
    flex: 0 1 32%;
    border: 1px solid #999;
    > p {
      padding: 20px 20px;
      font-size: 18px;
    }
    > p:first-child {
      background-color: #f2f6fc;
    }
    > p:last-child {
      color: #409eff;
    }
  }
}
.ly-pending {
  border: 1px solid #999;
  margin-top: 20px;
}
.ly-padding-title {
  padding: 20px 20px;
  background-color: #f2f6fc;
}
.ly-padding-content {
  padding: 20px 50px 20px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  > div {
    padding: 10px 5px;
    margin-right: 20px;
    opacity: 0.9;
    border-bottom: 1px solid #999;
    flex: 0 1 30%;
    display: flex;
    justify-content: space-between;
    > div:last-child {
      color: #d1304d;
    }
  }
}
.ly-look {
  display: flex;
  margin-top: 20px;
  grid-gap: 2%;
  justify-content: space-between;
  > div {
    flex: 0 0 49%;
    border: 1px solid #999;
  }
}
.ly-look-info {
  padding: 40px 80px;
  display: flex;
  grid-gap: 40px;
  justify-content: center;
  > div {
    text-align: center;
    > p:first-child {
      color: #d1304d;
      font-size: 22px;
      margin-bottom: 10px;
    }
    > p:last-child {
      opacity: 0.9;
    }
  }
}
.ly-count {
  margin-top: 20px;
  border: 1px solid #999;
}
.ly-count-content {
  display: flex;
  > div:first-child {
    flex: 0 0 15%;
    border-right: 1px solid #afafaf;
    padding: 20px;
    > div {
      margin-bottom: 10px;
      p {
        color: #999;
        padding: 5px 0;
        font-size: 14px;
      }
      > p:nth-child(2) {
        font-size: 20px;
      }
    }
  }
  > div:last-child {
    flex: 0 0 85%;
  }
}
.block{
  text-align: right;
  margin: 10px 10px 10px 0;
}
#main{
  height: 400px;
  width: auto;
}
</style>