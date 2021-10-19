<template>
  <div class="ly-list">
    <div class="ly-list-search">
      <div class="ly-search-wrapper">
        <div>
          <div>筛选搜索</div>
          <div>查询结果</div>
        </div>
        <div>
          <!-- 编号 -->
          <div class="ly-search-box">
            <div>订单编号:</div>
            <div>
              <el-input v-model="search.name" placeholder="商品名称"></el-input>
            </div>
          </div>
          <!-- 收货人 -->
          <div class="ly-search-box">
            <div>收货人:</div>
            <div>
              <el-input v-model="search.code" placeholder="商品货号"></el-input>
            </div>
          </div>
          <!-- 提交时间 -->
          <div class="ly-search-box">
            <div>提交时间:</div>
            <div class="block">
              <el-date-picker v-model="search.time" type="date" placeholder="选择日期"></el-date-picker>
            </div>
          </div>
          <!-- 订单状态 -->
          <div class="ly-search-box">
            <div>订单状态:</div>
            <div class="block">
              <el-select v-model="search.brandValue" placeholder="请选择">
                <el-option
                  v-for="item in brandList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
          </div>
          <!-- 上架 -->
          <div class="ly-search-box">
            <div>订单分类:</div>
            <div class="block">
              <el-select v-model="search.shelfValue" placeholder="请选择">
                <el-option
                  v-for="item in shelfList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
          <!-- 审核 -->
          <div class="ly-search-box">
            <div>订单来源:</div>
            <div class="block">
              <el-select v-model="search.examineValue" placeholder="请选择">
                <el-option
                  v-for="item in examineListL"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ly-list-adddata">
      <div>数据列表</div>
    </div>
    <div class="ly-list-data">
      <div class="ly-list-table">
        <el-table border :data="orderList" style="width: 100%;">
          <el-table-column type="selection" width="60"></el-table-column>
          <el-table-column prop="id" label="编号" width="60"></el-table-column>
          <el-table-column prop="orderSn" label="订单编号" width="200" ></el-table-column>
          <el-table-column prop="createTime" label="提交时间" width="200" >
          </el-table-column>
          <el-table-column prop="memberUsername" label="用户账号" width="100"></el-table-column>
          <el-table-column prop="totalAmount" label="订单金额" width="100"></el-table-column>
          <el-table-column prop="payType" label="支付方式" width="100">
               <template slot-scope="scope">
                  {{scope.row.payType===0?'未支付':scope.row.payType===1?'支付宝':'微信'}}
            </template>
          </el-table-column>
          <el-table-column prop="sourceType" label="订单来源" width="100">
              <template slot-scope="scope">
                  {{scope.row.sourceType===1?'APP订单':'PC订单'}}
              </template>
          </el-table-column>
          <el-table-column prop="status" label="订单状态"  width="100">
              <template slot-scope="scope">
                  {{scope.row.status===4?'已关闭':scope.row.status===1?'待发货':scope.row.status===2?'已发货':scope.row.status===3?'已完成':'代付款'}}
              </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template>
              <div class="ly-fit">
                <el-button size="mini">查看订单</el-button>
                <el-button size="mini"  type="danger">删除订单</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="ly-page">
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :total="100"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: [],
      currentPage: 1,
      orderList:[],
      shelfList: [
        {
          value: "正常订单",
          label: "正常订单"
        },
        {
          value: "秒杀订单",
          label: "秒杀订单"
        }
      ],
      examineListL: [
        {
          value: "PC订单",
          label: "PC订单"
        },
        {
          value: "APP订单",
          label: "APP订单"
        }
      ],
      brandList: [
        {
          value: "代付款",
          label: "代付款"
        },
        {
          value: "代发货",
          label: "代发货"
        },
        {
          value: "已发货",
          label: "已发货"
        },
        {
          value: "已完成",
          label: "已完成"
        },
        {
          value: "已关闭",
          label: "已关闭"
        }
      ],
      search: {
        brandValue: "",
        examineValue: "",
        shelfValue: "",
        name: "",
        time: "",
        code: ""
      }
    };
  },
  created() {
      this.getOrderList();
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      this.currentPage = val;
      this.getOrderList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getOrderList();
    },
    getOrderList(){
        this.API.getOrderList(this.currentPage).then(e=>{
            this.orderList=e.data.data.list
        })
    },
    
  }
};
</script>
<style>
.el-table th,
.el-table td {
  text-align: center !important;
  vertical-align: middle !important;
}
</style>
<style lang="less" scoped>
.ly-list {
  padding: 0 20px;
  > div {
    border: 1px solid #f1f1f1;
    margin-bottom: 20px;
  }
}
.el-input__inner {
  height: 30px;
  line-height: 30px;
}
.el-input--suffix .el-input__inner {
  padding-right: 0;
}
.ly-search-wrapper {
  padding: 20px 40px;
  > div:first-child {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    > div:last-child {
      padding: 10px 20px;
      background-color: #409eff;
      color: #fff;
      border-radius: 5px;
    }
  }
  > div:nth-child(2) {
    padding: 0 20px;
    display: flex;
    flex-wrap: wrap;
    grid-gap: 20px;
    > div {
      flex: 0 0 30%;
    }
  }
}
.ly-search-box {
  display: flex;
  grid-gap: 20px;
  align-items: center;
  > div:first-child {
    font-size: 15px;
    color: #666;
  }
}
.ly-list-adddata {
  padding: 20px 20px;
  text-align: center;
}
.ly-fit {
  padding: 10px 0;
}
.ly-page {
  text-align: center;
  margin: 20px 0;
}
.el-table{
    overflow-y: hidden;
}
</style>