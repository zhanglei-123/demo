<template>
  <div class="login-container">
    <div class="login-content">
      <div class="left">
        <img src="../assets/images/bg.svg" alt="">
      </div>
      <div class="right">
        <div class="login-form">
          <div class="title">欢迎登录</div>
          <div class="sub-title">特来电第三方接入辅助工具</div>
          <el-form :model="form" :rules="formRules" ref="loginForm">
            <el-form-item prop="username">
              <el-input 
                class="login-input"
                v-model="form.username" 
                placeholder="请输入用户名">
                <img src="../assets/images/user.svg" alt="" slot="prefix">
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                class="login-input" 
                v-model="form.password" 
                placeholder="请输入密码"
                type="password">
                <img src="../assets/images/pwd.svg" alt="" slot="prefix">
              </el-input>
            </el-form-item>
          </el-form>
          <el-button class="login-button" @click="login">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { loginRequest } from '../service';

export default {
  data() {
    return {
      form: {
        username: '', // 用户名
        password: '' // 密码
      }, // 登录表单
      formRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: "请输入密码", trigger: 'blur' }]
      } // 表单校验
    }
  },
  methods: {
    // 登录
    async login(){
      const valid = this.$refs.loginForm.validate();
      if(valid) {
        const params = {
          username: this.form.username, // 用户名
          password: this.form.password // 密码
        }
        let data = await loginRequest(params);
        if(data.code == 1) {
          this.$message.success('登录成功');
          Cookies.set('token', data.data);
          Cookies.set('userName', this.form.username);
          this.$router.push({ name: 'Index'});
        } else {
          this.$message.error('用户名密码错误');
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('../assets/images/bg.png');
}

.login-content {
  width: 800px;
  height: 480px;
  display: flex;
  background: #FFFFFF;
  box-shadow: 0 2px 16px 0 rgba(0,0,0,0.30);
  border-radius: 10px;
}

.left {
  width: 50%;
  height: 100%;
  padding: 181px 0 44px 42px;
  box-sizing: border-box;
}

.right {
  width: 50%;
  height: 100%;
  padding: 72px 54px 57px 54px;
  box-sizing: border-box;
}

.login-form {
  width: 100%;
  height: 100%;
}

.title {
  font-family: PingFang-SC-Bold;
  font-size: 32px;
  color: #4A90E2;
  letter-spacing: 4px;
  line-height: 45px;
}

.sub-title {
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #4A90E2;
  line-height: 22px;
  margin: 5px 0 25px 0;
}

.login-button {
  width: 280px;
  height: 45px;
  background: #4A90E2;
  border-radius: 22.5px;
  font-family: PingFangSC-Semibold;
  font-size: 16px;
  color: #FFFFFF;
  letter-spacing: 4px;
  margin-top: 99px;
}
</style>