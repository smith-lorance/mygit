<template>
  <div class="ly-set">
    <div class="ly-main">
        <div>
      <div>
        <div>秒杀订单超过:</div>
        <div>
          <el-input v-model="form.normalOrderOvertime" placeholder="请输入内容"></el-input>
        </div>
        <div>分</div>
        <div>未收货订单自动完成</div>
      </div>
      <div>
        <div>正常订单超过:</div>
        <div>
          <el-input v-model="form.confirmOvertime" placeholder="请输入内容"></el-input>
        </div>
        <div>分</div>
        <div>未收货订单自动完成</div>
      </div>
      <div>
        <div>发货超过:</div>
        <div>
          <el-input v-model="form.flashOrderOvertime" placeholder="请输入内容"></el-input>
        </div>
        <div>天</div>
        <div>未收货，订单自动完成</div>
      </div>
      <div>
        <div>秒杀订单超过:</div>
        <div>
          <el-input v-model="form.commentOvertime" placeholder="请输入内容"></el-input>
        </div>
        <div>天</div>

        <div>未收货订单自动完成</div>
      </div>
      <div>
        <div>订单完成超过:</div>
        <div>
          <el-input v-model="form.flashOrderOvertime" placeholder="请输入内容"></el-input>
        </div>
        <div>天</div>
        <div>自动五星好评</div>
      </div>
      </div>
                        <div class="ly-btn">提交</div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        flashOrderOvertime: 7,
        finishOvertime: 7,
        confirmOvertime: 120,
        normalOrderOvertime: 60,
        commentOvertime: 15
      }
    };
  }
};
</script>

<style lang="less" scoped>
.ly-main {
  margin-top: 20px;
  padding: 40px 100px;
  border: 1px solid #f1f1f1;
  margin: 0 auto;
  >div:first-child {
   
    >div {
         display: flex;
    align-items: center;
    grid-gap: 20px;
    margin: 20px 0;
    >div:first-child{
 width: 150px;
      text-align: right;
    }
     
    }
  }
}
.ly-btn {
  background-color: #409eff;
  border-radius: 5px;
  padding: 5px 20px;
  width: 100px;
  text-align: center;
  color: #fff;
  margin-left: 180px;
  cursor: pointer;
}
</style>