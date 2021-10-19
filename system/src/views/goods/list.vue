<template>
  <div class="ly-list">
    <div class="ly-list-search">
      <div class="ly-search-wrapper">
        <div>
          <div>筛选搜索</div>
          <div>查询结果</div>
        </div>
        <div>
          <!-- 名称 -->
          <div class="ly-search-box">
            <div>商品名称:</div>
            <div>
              <el-input v-model="search.name" placeholder="商品名称"></el-input>
            </div>
          </div>
          <!-- 货号 -->
          <div class="ly-search-box">
            <div>商品货号:</div>
            <div>
              <el-input v-model="search.code" placeholder="商品货号"></el-input>
            </div>
          </div>
          <!-- 分类 -->
          <div class="ly-search-box">
            <div>商品分类:</div>
            <div class="block">
              <el-cascader
                v-model="search.classValue"
                :options="classifyList"
                :props="{ expandTrigger: 'hover',lazyLoad:true}"
              ></el-cascader>
            </div>
          </div>
          <!-- 品牌 -->
          <div class="ly-search-box">
            <div>商品品牌:</div>
            <div class="block">
              <el-select v-model="search.brandValue" placeholder="请选择">
                <el-option
                  v-for="item in brandList"
                  :key="item.name"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
          </div>
          <!-- 上架 -->
          <div class="ly-search-box">
            <div>上架状态:</div>
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
            <div>审核状态:</div>
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
        <el-table border :data="productsList"  style="width: 100%;">
          <el-table-column  type="selection" width="60"></el-table-column>
          <el-table-column prop="productCategoryId" label="编号" width="90px"></el-table-column>
          <el-table-column prop="pic" label="商品图片" width="120px">
            <template slot-scope="scope">
              <el-image :src="scope.row.pic" fit="cover"></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="名称" width="100px"></el-table-column>
          <el-table-column label="价格/货号" width="120px">
            <template slot-scope="scope">
              <p>价格:{{scope.row.price}}</p>
              <p>货号:{{scope.row.productSn}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="标签" width="120px">
            <template slot-scope="scope">
              <div>
                上架:
                <el-switch v-model="scope.row.id"></el-switch>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="sort" label="排序" width="100px"></el-table-column>
          <el-table-column prop="address" label="SKU库存" width="100px"></el-table-column>
          <el-table-column prop="sale" label="销量" width="100px"></el-table-column>
          <el-table-column prop="lowStock" label="审核状态" width="100px">
            <template slot-scope="scope">
              <div>{{scope.row.lowStock===0?'未审核':'已审核'}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template>
              <div class="ly-fit">
                <el-button size="mini">查看</el-button>
                <el-button size="mini">编辑</el-button>
              </div>
              <div class="ly-fit">
                <el-button size="mini">日志</el-button>
                <el-button size="mini" type="danger">删除</el-button>
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
      classifyList: [],
      productsList: [],
      shelfList: [
        {
          value: "上架",
          label: "上架"
        },
        {
          value: "下架",
          label: "下架"
        }
      ],
      examineListL: [
        {
          value: "审核通过",
          label: "审核通过"
        },
        {
          value: "未审核",
          label: "未审核"
        }
      ],
      brandList: [],
      search: {
        brandValue: "",
        examineValue: "",
        shelfValue: "",
        classValue: "",
        name: "",
        code: ""
      }
    };
  },
  created() {
    this.API.getListTitle().then(e => {
      this.classifyList = e.data.data.map((e) => ({
        value:e.id,
        label:e.name,
        children:e.children.map((e)=>({
            value:e.id,
        label:e.name,
        }))
      }));
    });
    this.API.getBrandList().then(e => {
      this.brandList = e.data.data.list;
    });
    this.getProducts();
  },
  methods: {
     headClass() { //表头居中显示
                    return "text-align:center"
                },
    getProducts() {
      this.API.getProductsList(this.currentPage).then(e => {
        this.productsList = e.data.data.list;
      });
    },
    // 分页
    handleSizeChange(val) {
      this.currentPage = val;
      this.getProducts();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getProducts();
    }
  }
};
</script>
<style>
.el-table th,.el-table td{
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
</style>