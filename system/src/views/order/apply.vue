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
              <el-input v-model="search.code" placeholder="商品名称"></el-input>
            </div>
          </div>
          <div class="ly-search-box">
            <div>订单分类:</div>
            <div class="block">
              <el-select v-model="search.brandValue" placeholder="请选择">
                <el-option
                  v-for="item in brandList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
          <!-- 申请时间 -->
          <div class="ly-search-box">
            <div>申请时间:</div>
            <div class="block">
              <el-date-picker v-model="search.time" type="date" placeholder="选择日期"></el-date-picker>
            </div>
          </div>
          <!-- 操作人员 -->
          <div class="ly-search-box">
            <div>订单编号:</div>
            <div>
              <el-input v-model="search.user" placeholder="商品名称"></el-input>
            </div>
          </div>
          <!-- 处理时间 -->
          <div class="ly-search-box">
            <div>处理时间:</div>
            <div class="block">
              <el-date-picker v-model="search.applyTime" type="date" placeholder="选择日期"></el-date-picker>
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
        <el-table border :data="applyList" style="width: 100%;">
          <el-table-column type="selection" width="60"></el-table-column>
          <el-table-column prop="id" label="服务单号" width="200"></el-table-column>
          <el-table-column prop="createTime" label="申请时间" width="200" ></el-table-column>
          <el-table-column prop="memberUsername" label="用户账号" width="100"></el-table-column>
          <el-table-column prop="productRealPrice" label="退款金额" width="100"></el-table-column>
          <el-table-column prop="status" label="申请状态" width="100">
              <template slot-scope="scope">
              {{scope.row.status===0?'待处理':scope.row.status?'退货中':scope.row.status?'已完成':'已拒绝'}}
              </template>
          </el-table-column>
          <el-table-column prop="totalAmount" label="处理时间" width="200"></el-table-column>
          <el-table-column label="操作" width="200">
            <template>
              <div class="ly-fit">
                <el-button size="mini">查看详情</el-button>
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
      currentPage: 1,
      applyList:[],
      brandList: [
        {
          value: "已拒绝",
          label: "已拒绝"
        },
        {
          value: "已完成",
          label: "已完成"
        },
        {
          value: "退货中",
          label: "退货中"
        },
        {
          value: "待处理",
          label: "待处理"
        },
      ],
      search: {
        brandValue: "",
        code: "",
        user:'',
        time:'',
        applyTime:''
      }
    };
  },
  created() {
      this.getApplyList();
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      this.currentPage = val;
      this.getApplyList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getApplyList();
    },
    getApplyList(){
        this.API.getApplyList(this.currentPage).then(e=>{
            this.applyList=e.data.data.list
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