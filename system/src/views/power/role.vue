<template>
  <div>
    <div class="ly-header">
      <div>
        <div>筛选搜索</div>
        <div>查询结果</div>
      </div>
      <div>
        <div>输入搜素:</div>
        <div>
          <el-input v-model="value" placeholder="请输入品牌名称/关键字" size="small"></el-input>
        </div>
      </div>
    </div>
    <div class="ly-main">
      <div>
        <el-table :data="roleList" border style="width: 100%">
          <el-table-column prop="id" label="编号"></el-table-column>
          <el-table-column prop="name" label="角色"></el-table-column>
          <el-table-column prop="description" label="描述"></el-table-column>
          <el-table-column prop="adminCount" label="用户数"></el-table-column>
          <el-table-column prop="createTime" label="添加时间"></el-table-column>
          <el-table-column prop="status" label="是否启用"></el-table-column>
          <el-table-column label="操作">
            <template>
              <div>
                <el-button type="text" size="small">分配菜单</el-button>
                <el-button type="text" size="small">分配资源</el-button>
              </div>
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
      roleList: [],
      currentPage: 1
    };
  },
  created() {
    this.getRole();
  },
  methods: {
    getRole() {
      this.API.getRole(this.currentPage).then(e => {
        this.roleList = e.data.data.list;
        console.log(this.roleList);
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getRole();
    },
    handleSizeChange(val) {
      this.currentPage = val;
      this.getRole();
    }
  }
};
</script>

<style lang="less" scoped>
.ly-header {
  padding: 20px;
  border: 1px solid #f1f1f1;
  > div:first-child {
    display: flex;
    justify-content: space-between;
    > div:last-child {
      padding: 10px 20px;
      border-radius: 5px;
      background-color: #409eff;
      color: #fff;
    }
  }
  > div:last-child {
    padding: 0 40px;
    display: flex;
    align-items: center;
    > div {
      margin-right: 10px;
    }
  }
}
</style>