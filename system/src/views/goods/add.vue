<template>
  <div>
    <div class="ly-add">
      <div>
        <el-steps :active="active" finish-status="success">
          <el-step title="填写商品信息"></el-step>
          <el-step title="填写商品促销"></el-step>
          <el-step title="填写商品属性"></el-step>
          <el-step title="选择商品关联"></el-step>
        </el-steps>
        <div v-if="active===0">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="商品分类" prop="classify">
              <el-cascader
                v-model="ruleForm.classify"
                :options="classifyList"
                :props="{ expandTrigger: 'hover',lazyLoad:true}"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="商品名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>

            <el-form-item label="副标题" prop="subName">
              <el-input v-model="ruleForm.subName"></el-input>
            </el-form-item>

            <el-form-item label="商品品牌" prop="brand">
              <el-select v-model="ruleForm.brand" placeholder="请选择商品品牌">
                <el-option
                  v-for="item in brandList"
                  :key="item.name"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="商品介绍">
              <el-input type="textarea" v-model="ruleForm.info"></el-input>
            </el-form-item>

            <el-form-item label="商品货号">
              <el-input v-model="ruleForm.code"></el-input>
            </el-form-item>

            <el-form-item label="商品售价">
              <el-input v-model="ruleForm.price"></el-input>
            </el-form-item>

            <el-form-item label="市场价">
              <el-input v-model="ruleForm.marketPrice"></el-input>
            </el-form-item>

            <el-form-item label="商品库存">
              <el-input v-model="ruleForm.stock"></el-input>
            </el-form-item>

            <el-form-item label="计量单位">
              <el-input v-model="ruleForm.conpany"></el-input>
            </el-form-item>

            <el-form-item label="商品重量">
              <el-input v-model="ruleForm.weight"></el-input>
            </el-form-item>

            <el-form-item label="排序">
              <el-input v-model="ruleForm.sort"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="active===1">
          <div style="margin: 20px;"></div>
          <el-form label-width="100px">
            <el-form-item label="赠送积分">
              <el-input v-model="ruleForm1.give"></el-input>
            </el-form-item>

            <el-form-item label="赠送成长值">
              <el-input v-model="ruleForm1.growth"></el-input>
            </el-form-item>

            <el-form-item label="积分购买限制">
              <el-input v-model="ruleForm1.buy"></el-input>
            </el-form-item>

            <el-form-item label="预告商品">
              <el-switch v-model="ruleForm1.notice"></el-switch>
            </el-form-item>

            <el-form-item label="商品上架">
              <el-switch v-model="ruleForm1.shelf"></el-switch>
            </el-form-item>

            <el-form-item label="商品推荐">
              新品:
              <el-switch v-model="ruleForm1.news" style="margin:0 10px"></el-switch>
              推荐:
              <el-switch v-model="ruleForm1.recommend" style="margin:0 10px"></el-switch>
            </el-form-item>

            <el-form-item label="服务保障">
              <el-checkbox-group v-model="ruleForm1.type">
                <el-checkbox label="无忧退货" name="type"></el-checkbox>
                <el-checkbox label="款速退款" name="type"></el-checkbox>
                <el-checkbox label="免费包邮" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>

            <el-form-item label="详细页标题">
              <el-input v-model="ruleForm1.name"></el-input>
            </el-form-item>

            <el-form-item label="详细页描述">
              <el-input v-model="ruleForm1.intro"></el-input>
            </el-form-item>

            <el-form-item label="商品关键字">
              <el-input v-model="ruleForm1.key"></el-input>
            </el-form-item>

            <el-form-item label="活动形式">
    <el-input type="textarea" v-model="ruleForm1.info"></el-input>
  </el-form-item>
          </el-form>
        </div>
        <div class="ly-next">
          <el-button style="margin-top: 12px;" @click="prev()" v-if="active!=0">上一步</el-button>
          <el-button style="margin-top: 12px;" @click="next('ruleForm')">下一步</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      classifyList: [],
      brandList: [],
      ruleForm: {
        classify: "",
        name: "",
        sunName: "",
        brand: "",
        code: "",
        price: "",
        marketPrice: "",
        stock: "",
        company: "",
        weight: "",
        sort: ""
      },
      ruleForm1: {
        give: "",
        growth: "",
        buy: "",
        notice: "",
        shelf: "",
        name: "",
        info: "",
        key: "",
        type: [],
        intro:'',
        news:true,
        recommend:true,
      },
      rules: {
        classify: [
          { required: true, message: "请选择商品分类", trigger: "change" }
        ],
        name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        subName: [{ required: true, message: "请输入副标题", trigger: "blur" }],
        brand: [
          { required: true, message: "请选择商品品牌", trigger: "change" }
        ]
      }
    };
  },
  created() {
    this.API.getBrandList().then(e => {
      this.brandList = e.data.data.list;
    });
    this.API.getListTitle().then(e => {
      this.classifyList = e.data.data.map(e => ({
        value: e.id,
        label: e.name,
        children: e.children.map(e => ({
          value: e.id,
          label: e.name
        }))
      }));
    });
  },
  methods: {
    next(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.active++ > 2) this.active = 0;
        } else {
          return false;
        }
      });
    },
    prev() {
      if (this.active != 0) {
        this.active--;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.ly-add {
  padding: 20px 100px 0;
  > div:first-child {
    border: 1px solid #999;
    padding: 20px 100px 0;
    margin: 0 auto;
    > div {
      margin-top: 50px;
    }
    .ly-next {
      text-align: center;
      margin-bottom: 20px;
    }
  }
}
.el-form-item {
  margin-bottom: 15px !important;
}
.el-input__inner {
height: 30px;
line-height: 30px;
}
</style>