<template>
  <div class="ly-brand">
    <div class="ly-header">
      <div>
        <div>筛选搜索</div>
        <div @click="getBrandKeys()">查询结果</div>
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
        <el-table :data="brandList" border style="width: 100%">
          <el-table-column prop="id" label="编号"></el-table-column>
          <el-table-column prop="name" label="品牌名称"></el-table-column>
          <el-table-column prop="firstLetter" label="品牌首字母"></el-table-column>
          <el-table-column prop="sort" label="排序"></el-table-column>
          <el-table-column prop="showStatus" label="品牌制造商 ">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.showStatus"></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="showStatus" label="是否显示">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.showStatus"></el-switch>
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
      <div class="ly-page">
        <el-pagination background layout="prev, pager, next" :total="100" :current-page="currentPage" @current-change="handleCurrentChange" @size-change="handleSizeChange"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      currentPage: 1,
      brandList: []
    };
  },
  created() {
    this.getBrand();
  },
  methods: {
    getBrand() {
      this.API.getBrand(this.currentPage).then(e => {
        this.brandList = e.data.data.list;
      });
    },
    getBrandKeys(){
      this.API.getBrandKeys(this.currentPage,this.value).then(e=>{
        this.brandList=e.data.data.list;
      })
    },
    handleCurrentChange(val){
      this.currentPage=val;
      this.getBrand();
    },
    handleSizeChange(val){
      this.currentPage=val;
      this.getBrand();
    }
  }
};
</script>

<style lang="less" scoped>
.ly-brand {
  padding: 0 20px;
  > div:first-child{
    border: 1px solid #f1f1f1;
    border-radius: 5px;
    margin: 20px 0;
  }
}
.ly-header {
  padding: 20px;
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