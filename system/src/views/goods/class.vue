<template>
  <div class="ly-class">
    <div class="ly-class-content">
      <el-table :data="classifyList" border style="width: 100%">
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="name" label="分类名称"></el-table-column>
        <el-table-column  label="级别">一级</el-table-column>
        <el-table-column prop="productCount" label="商品数量"></el-table-column>
        <el-table-column prop="productUnit" label="数量单位 "></el-table-column>
        <el-table-column  label="导航栏">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.navStatus"></el-switch>
          </template>
        </el-table-column>

        <el-table-column label="是否显示">
             <template slot-scope="scope">
            <el-switch v-model="scope.row.showStatus"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序"></el-table-column>
        <el-table-column label="设置" width="200">
          <template>
            <div class="ly-fit">
              <el-button size="mini">查看下级</el-button>
              <el-button size="mini">转移商品</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template>
            <div class="ly-fit">
              <el-button size="mini">编辑</el-button>
              <el-button size="mini" type="danger">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      classifyList: [],
    };
  },
  created() {
    this.API.getClassify().then(e => {
      this.classifyList = e.data.data.list;
    });
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
.ly-class {
  padding: 20px;
}
</style>