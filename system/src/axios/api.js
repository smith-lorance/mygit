import {get, post,put} from "./axios";
let ip='http://admin-api.macrozheng.com/';
export const API  = {
    // 登录接口
    userLogin(data){
        return post(`${ip}admin/login`,data)
    },
    // 获取信息
    getIndexInfo(){
        return get(`${ip}admin/info`)
    },
    // 获取list搜索名称
    getListTitle(){
        return get(`${ip}productCategory/list/withChildren`)
    },
    // 获取List品牌
    getBrandList(){
        return get(`${ip}brand/list?pageNum=1&pageSize=100`)
    },
    // 获取产品列表
    getProductsList(pageNum){
        return get(`${ip}product/list?pageNum=${pageNum}&pageSize=5`)
    },
    // 获取商品分类
    getClassify(){
        return get(`${ip}productCategory/list/0?pageNum=1&pageSize=5`)
    },
    // 获取商品类型
    getType(pageNum){
        return get(`${ip}productAttribute/category/list?pageNum=${pageNum}&pageSize=5`)
    },
    // 获取品牌列表
    getBrand(pageNum){
        return get(`${ip}brand/list?pageNum=${pageNum}&pageSize=5`)
    },
    // 搜索品牌
    getBrandKeys(pageNum,keys){
        return get(`${ip}brand/list?keyword=${keys}&pageNum=${pageNum}&pageSize=5`)
    },
    // 订单列表
    getOrderList(pageNum){
        return get(`${ip}order/list?pageNum=${pageNum}&pageSize=10`)
    },
    // 订单处理
    getApplyList(pageNum){
        return get(`${ip}returnApply/list?pageNum=${pageNum}&pageSize=10`)
    },
    // 订单退货原因
    getReasonList(pageNum){
        return get(`${ip}returnReason/list?pageNum=${pageNum}&pageSize=5`)
    },
        // 用户列表
    getUser(pageNum){
        return get(`${ip}admin/list?pageNum=${pageNum}&pageSize=10`)
    },
    // 角色列表
    getRole(pageNum){
        return get(`${ip}role/list?pageNum=${pageNum}&pageSize=5`)
    },
    // 菜单
    getMenu(pageNum){
        return get(`${ip}menu/list/0?pageNum=${pageNum}&pageSize=5`)
    },
    getResour(pageNum){
        return get(`${ip}resource/list?pageNum=${pageNum}&pageSize=10`)
    },
   }