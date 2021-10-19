<template>
  <div class="home">
    <div class="ly-main">
      <el-container>
        <el-aside width="200px">
          <el-col :span="12">
            <el-menu
              :default-active="activeIndex"
              class="el-menu-vertical-demo"
              router
              @open="handleOpen"
              @close="handleClose"
              background-color="rgb(48, 65, 86)"
              text-color="rgb(191, 203, 217)"
              active-text-color="rgb(64, 158, 255)"
            >
              <el-menu-item index="/index">
                <i class="el-icon-s-home"></i>
                <span slot="title">首页</span>
              </el-menu-item>
              <el-submenu v-for="(item,index) of titleListL" :key="index" :index="item.index">
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span slot="title">{{item.name}}</span>
                </template>
                <el-menu-item v-for="(item,index) of item.submenu" :key="index" :index="item.index">
                  <i :class="item.icon"></i>
                  <span>{{item.name}}</span>
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-aside>
        <el-container>
          <el-header>
            <div class="example-container">
              <el-breadcrumb separator="/">
                <el-breadcrumb-item
                  v-for="(item,index) in breadList"
                  :key="index"
                  :to="{ path: item.path }"
                >{{item.meta.title}}</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
          </el-header>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      isCollapse: true,
      path: "",
      breadList: [],
      activeIndex: "/index",
      titleListL: [
        {
          index: "/goods",
          icon: "el-icon-location",
          name: "商品",
          submenu: [
            {
              index: "/goods/list",
              icon: "el-icon-location",
              name: "商品列表"
            },
            {
              index: "/goods/add",
              icon: "el-icon-location",
              name: "添加商品"
            },
            {
              index: "/goods/class",
              icon: "el-icon-s-home",
              name: "商品分类"
            },
            {
              index: "/goods/type",
              icon: "el-icon-location",
              name: "商品类型"
            },
            {
              index: "/goods/brand",
              icon: "el-icon-location",
              name: "商品品牌"
            }
          ]
        },
        {
          index: "/order",
          icon: "el-icon-location",
          name: "订单",
          submenu: [
            {
              index: "/order/list",
              icon: "el-icon-location",
              name: "订单列表"
            },
            {
              index: "/order/set",
              icon: "el-icon-location",
              name: "订单设置"
            },
            {
              index: "/order/apply",
              icon: "el-icon-location",
              name: "退货申请处理"
            },
            {
              index: "/order/reason",
              icon: "el-icon-location",
              name: "退货原因设置"
            }
          ]
        },
        {
          index: "/power",
          icon: "el-icon-location",
          name: "权限",
          submenu: [
            {
             index: "/power/user",
          icon: "el-icon-location",
          name: "用户列表",
          },
            {
             index: "/power/role",
          icon: "el-icon-location",
          name: "角色列表",
          },
            {
             index: "/power/menu",
          icon: "el-icon-location",
          name: "菜单列表",
          },
            {
             index: "/power/resources",
          icon: "el-icon-location",
          name: "资源列表",
          },
          ]
        }
      ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {}
  },
  created() {
    this.breadList = this.$route.matched;
          this.activeIndex = this.$route.fullPath;
  },
  watch: {
    $route(to, form) {
      this.breadList = to.matched;
      this.activeIndex = this.$route.fullPath;
    }
  }
};
</script>
<style lang="less" scoped>
.home,
.ly-main,
.tac,
.el-col,
.el-menu-vertical-demo {
  height: 100%;
  width: 100%;
}
.el-submenu .el-menu-item {
  min-width: 100%;
}
.el-menu-item:hover {
  background-color: rgba(0, 0, 0, 0.5) !important;
}
.el-submenu .el-submenu__title {
  background-color: rgba(0, 0, 0, 0.5) !important;
}
.el-submenu .el-menu-item {
  background-color: #1f2d3d !important;
}
.el-submenu .el-menu-item:hover {
  background-color: rgba(0, 0, 0, 0.8) !important;
}
.el-container {
  width: 100%;
  height: 100%;
}
.el-header,
.el-breadcrumb {
  width: 100%;
  height: 60px;
  line-height: 60px;
}
.el-header {
  border: 1px solid #eee;
}
.el-breadcrumb__item,
.el-breadcrumb {
  cursor: pointer !important;
}
</style>
