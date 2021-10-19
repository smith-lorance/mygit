<template>
  <div>
    <div class="ly-main">
      <div>
        <el-table :data="resourList" border style="width: 100%">
          <el-table-column prop="id" label="编号"></el-table-column>
          <el-table-column prop="name" label="资源名称"></el-table-column>
          <el-table-column prop="url" label="资源路径"></el-table-column>
          <el-table-column  label="描述">无</el-table-column>
          <el-table-column prop="createTime" label="添加时间"></el-table-column>
          <el-table-column label="操作">
            <template>
              <div>
                <el-button type="text" size="small">编辑</el-button>
                <el-button type="text" size="small">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="ly-page">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="100"
          :current-page="currentPage"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      resourList: [],
      currentPage: 1
    };
  },
  created() {
    this.getResour();
  },
  methods: {
    getResour() {
      this.API.getResour(this.currentPage).then(e => {
        this.resourList = e.data.data.list;
        console.log(this.resourList);
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getResour();
    },
    handleSizeChange(val) {
      this.currentPage = val;
      this.getResour();
    }
  }
};
</script>


<style>
</style>