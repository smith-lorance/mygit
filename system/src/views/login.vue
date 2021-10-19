<template>
  <div class="home">
    <div class="ly-login-from">
      <form action="index.vue">
        <div class="ly-login-title">
          <h1>管理系统登录</h1>
        </div>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="username">
            <el-input v-model.number="ruleForm.username" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="ruleForm.password"
              autocomplete="off"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>

          <el-form-item class="ly-login-btn">
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Home",
  data() {
    // 账号
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      } else {
        callback();
      }
    };
    //  密码
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: "",
        username: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        account: [{ validator: checkAge, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.API.userLogin(this.ruleForm).then(e=>{
                    this.$router.push({ name: "Index"});
                    localStorage.setItem("token", e.data.data.token);
          })
        } else {
          this.$alert("账号或密码不正确", "错误", {
            confirmButtonText: "确定"
            /*  callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          } */
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.home {
  margin: 0;
  padding: 0;
  /* animation: colorswitch 10s linear infinite; */
}
/* @keyframes colorswitch {
  0% {
    background: #0087c9;
  }

  16% {
    background: #ef4a53;
  }

  32% {
    background: #ffb463;
  }

  49% {
    background: #33d5d4;
  }

  65% {
    background: #339c82;
  }

  81% {
    background: rgb(127, 81, 224);
  }

  100% {
    background: rgb(74, 152, 190);
  }
} */
.ly-login-from {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.ly-login-btn{
  text-align: center;
}
.ly-login-title{
  text-align: center;
  color: #fff;
  font-size: 40px;
  margin-bottom: 20px;
}
</style>
