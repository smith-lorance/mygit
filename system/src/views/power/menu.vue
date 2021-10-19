<template>
  <div>
    <div class="ly-main">
      <div>
        <el-table :data="menuList" border style="width: 100%">
          <el-table-column prop="id" label="编号"></el-table-column>
          <el-table-column prop="title" label="菜单名称"></el-table-column>
          <el-table-column prop="level" label="菜单级数"></el-table-column>
          <el-table-column prop="name" label="前端名称"></el-table-column>
          <el-table-column prop="icon" label="前端图标"></el-table-column>
          <el-table-column prop="parentId" label="是否显示"></el-table-column>
          <el-table-column prop="sort" label="排序"></el-table-column>
          <el-table-column prop="status" label="设置">
            <div>
              <el-button type="text" size="small">查看下级</el-button>
            </div>
          </el-table-column>
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
      menuList: [],
      currentPage: 1
    };
  },
  created() {
    this.getMenu();
  },
  methods: {
    getMenu() {
      this.API.getMenu(this.currentPage).then(e => {
        this.menuList = e.data.data.list;
        console.log(this.menuList);
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getMenu();
    },
    handleSizeChange(val) {
      this.currentPage = val;
      this.getMenu();
    }
  }
};
</script>


<style>
</style>