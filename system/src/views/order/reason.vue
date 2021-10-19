<template>
  <div>
    <div>
      <el-table border :data="reasonList" style="width: 100%;">
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column prop="id" label="编号" width="100"></el-table-column>
        <el-table-column prop="name" label="原因类型"></el-table-column>
        <el-table-column prop="sort" label="排序" width="200"></el-table-column>
        <el-table-column prop="status" label="是否可用" width="200">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="添加时间" width="200"></el-table-column>
        <el-table-column label="操作" width="200">
          <template>
            <div class="ly-fit">
              <el-button size="mini">编辑</el-button>
              <el-button size="mini">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
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
      reasonList: []
    };
  },
  created() {
    this.getReasonList();
  },
  methods: {
    handleSizeChange(val) {
      this.currentPage = val;
      this.getReasonList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getReasonList();
    },
    getReasonList() {
      this.API.getReasonList(this.currentPage).then(e => {
        this.reasonList = e.data.data.list;
      });
    }
  }
};
</script>

<style>
</style>