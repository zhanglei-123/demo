<template>
  <div class="login-container">
    <div class="login-content">
      <div class="title">特来电第三方对接辅助工具</div>
      <div class="login-form">
        <div class="sub-title">登录</div>
        <el-form 
          label-width="100px"
          label-position="left" 
          :rules="formRules" 
          :model="form" 
          ref="loginForm">
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="form.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input :type="type" v-model="form.password" placeholder="请输入密码"></el-input>
          </el-form-item>
         <el-checkbox v-model="checked" @change="showPassword">显示密码</el-checkbox>
        </el-form>
        <el-button type="primary" class="login-button" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { loginRequest } from '../service';

export default {
  data() {
    return {
      checked: false, // 显示密码
      type: 'password',  
      form: {
        username: '',
        password: ''
      }, // 登录表单
      formRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: "请输入密码", trigger: 'blur' }]
      } // 表单校验
    }
  },
  methods: {
    showPassword() {
      this.type =  this.checked ? 'text' : 'password'; // 密码显示隐藏
    },
    // 登录
    async login(){
      const valid = this.$refs.loginForm.validate();
      if(valid) {
        const params = {
          username: this.form.username,
          password: this.form.password
        }
        let data = await loginRequest(params);
        if(data.code == 1) {
          this.$message.success('登录成功');
          Cookies.set('token', data.data);
          this.$router.push({ name: 'Index' });
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
}

.login-content {
  border: 1px solid #ccc;
  padding: 20px;
}

.title {
  color: #000;
  font-weight: 100;
  font-size: 20px;
  text-align: center;
}

.login-form {
  width: 400px;
  height: 300px;
  padding: 20px;
}

.sub-title {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  color: #353f42;
}

.login-button {
  width: 100%;
  margin-top: 20px;
}
</style>