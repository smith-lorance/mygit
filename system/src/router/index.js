import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/login.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    redirect: '/index',
    component: () => import('../views/Home.vue'),
    meta: { title: '首页' },
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('../views/index.vue'),
        meta: { title: '首页' }
      },
      {
        path: '/goods',
        name: 'goods',
        redirect: '/goods/list',
        component: () => import('../views/goods/goods.vue'),
        meta: { title: '商品' },
        children: [
          {
            path: '/goods/list',
            name: 'GoodsList',
            component: () => import('../views/goods/list.vue'),
            meta: { title: '商品列表' }
          },
          {
            path: '/goods/add',
            name: 'GoodsAdd',
            component: () => import('../views/goods/add.vue'),
            meta: { title: '商品添加' }
          },
          {
            path: '/goods/class',
            name: 'GoodsClass',
            component: () => import('../views/goods/class.vue'),
            meta: { title: '商品分类' }
          },
          {
            path: '/goods/type',
            name: 'GoodType',
            component: () => import('../views/goods/type.vue'),
            meta: { title: '商品类型' }
          },
          {
            path: '/goods/brand',
            name: 'GoodBrand',
            component: () => import('../views/goods/brand.vue'),
            meta: { title: '商品品牌' }
          },
        ]
      },
      // 订单设置
      {
        path: '/order',
        name: 'Order',
        component: () => import('../views/order/order.vue'),
        meta: { title: '订单' },
        children: [
          {
            path: '/order/list',
            name: 'List',
            component: () => import('../views/order/list.vue'),
            meta: { title: '订单列表' },
          },
          {
            path: '/order/set',
            name: 'Set',
            component: () => import('../views/order/set.vue'),
            meta: { title: '订单设置' }
          },
          {
            path: '/order/apply',
            name: 'apply',
            component: () => import('../views/order/apply.vue'),
            meta: { title: '退货申请处理' }
          },
          {
            path: '/order/reason',
            name: 'Reason',
            component: () => import('../views/order/reason.vue'),
            meta: { title: '退货原因设置' }
          },
        ]
      },
      // 营销
      // 权限
      {
        path: '/power',
        name: 'Power',
        component: () => import('../views/power/power.vue'),
        meta: { title: '权限' },
        children:[
          {
          path: '/power/user',
          name: 'user',
          component: () => import('../views/power/user.vue'),
          meta: { title: '用户列表' },
        },
          {
          path: '/power/role',
          name: 'role',
          component: () => import('../views/power/role.vue'),
          meta: { title: '角色列表' },
        },
          {
          path: '/power/menu',
          name: 'menu',
          component: () => import('../views/power/menu.vue'),
          meta: { title: '菜单列表' },
        },
          {
          path: '/power/resources',
          name: 'resources',
          component: () => import('../views/power/resources.vue'),
          meta: { title: '资源列表' },
        },
        ]
      },
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
