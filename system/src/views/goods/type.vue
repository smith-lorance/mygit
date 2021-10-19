<template>
  <div>
    <div class="ly-type">
      <el-table :data="typeList" border style="width: 100%">
        <el-table-column prop="id" label="编号" width="150"></el-table-column>
        <el-table-column prop="name" label="类型名称" width="300"></el-table-column>
        <el-table-column prop="attributeCount" label="属性数量" width="150"></el-table-column>
        <el-table-column prop="paramCount" label="参数数量" width="150"></el-table-column>
        <el-table-column label="设置">
          <template>
            <div class="ly-fit">
              <el-button size="mini">查看下级</el-button>
              <el-button size="mini">转移商品</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <div class="ly-fit">
              <el-button size="mini">编辑</el-button>
              <el-button size="mini" type="danger">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="ly-type-page">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="100"
        :current-page="currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      typeList: [],
      currentPage: 1
    };
  },
  created() {
    this.getType();
  },
  methods: {
    getType() {
      this.API.getType(this.currentPage).then(e => {
        this.typeList=e.data.data.list;
      });
    },
    handleSizeChange(val) {
      this.currentPage = val;
      this.getType();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getType();
    }
  }
};
</script>

<style lang="less" scoped>
.ly-type{
  padding: 0 20px;
}
.ly-type-page{
    margin-top: 20px;
    text-align: center;
}
</style>